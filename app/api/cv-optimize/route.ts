import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { client_id } = await request.json();

    if (!client_id) {
      return NextResponse.json({
        error: 'client_id is required'
      }, { status: 400 });
    }

    // Get client data
    const client = await prisma.client.findUnique({
      where: { id: client_id }
    });

    if (!client) {
      return NextResponse.json({
        error: 'Client not found'
      }, { status: 404 });
    }

    if (!client.cvText) {
      return NextResponse.json({
        error: 'Client CV text not found'
      }, { status: 400 });
    }

    // Generate optimized CV using OpenAI
    const prompt = `
You are Vellon, the world's first AI-powered Done-for-You Job Application Sprint Platform.

Rewrite this CV to be ATS-friendly and optimized for the target roles: ${client.desiredTitles.join(', ')}.

Requirements:
- Include quantified achievements where possible
- Use keywords from the target roles
- Maintain professional formatting
- Do NOT fabricate information
- Keep the same factual information but present it better
- Focus on achievements and impact
- Use action verbs

Original CV:
${client.cvText}

Output the optimized CV text in a clean, professional format.
    `;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a professional CV optimization expert for Vellon platform.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 2000,
      temperature: 0.7,
    });

    const optimizedCvText = completion.choices[0]?.message?.content?.trim();

    if (!optimizedCvText) {
      return NextResponse.json({
        error: 'Failed to generate optimized CV'
      }, { status: 500 });
    }

    // Extract ATS keywords
    const keywordsPrompt = `
Extract the top 20 ATS-friendly keywords from this optimized CV. Focus on:
- Technical skills
- Soft skills
- Industry terms
- Job-specific keywords
- Certifications
- Tools and technologies

Optimized CV:
${optimizedCvText}

Return as a JSON array of strings.
    `;

    const keywordsCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Extract ATS keywords as JSON array.' },
        { role: 'user', content: keywordsPrompt }
      ],
      max_tokens: 500,
      temperature: 0.3,
    });

    let atsKeywords: string[] = [];
    try {
      const keywordsText = keywordsCompletion.choices[0]?.message?.content?.trim();
      if (keywordsText) {
        atsKeywords = JSON.parse(keywordsText);
      }
    } catch (e) {
      // Fallback: extract keywords manually
      atsKeywords = client.skills.slice(0, 10);
    }

    // Generate role summary
    const summaryPrompt = `
Create a 2-3 sentence professional summary for this candidate based on their optimized CV and target roles: ${client.desiredTitles.join(', ')}.

Make it compelling and recruiter-focused.
    `;

    const summaryCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'user', content: summaryPrompt }
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    const roleSummary = summaryCompletion.choices[0]?.message?.content?.trim() || 'Professional summary not available';

    // Update client status
    await prisma.client.update({
      where: { id: client_id },
      data: { status: 'cv_optimized' }
    });

    const response = {
      optimized_cv_text: optimizedCvText,
      ats_keywords: atsKeywords,
      role_summary: roleSummary
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('CV Optimization API error:', error);
    return NextResponse.json({
      error: 'Internal server error during CV optimization'
    }, { status: 500 });
  }
}