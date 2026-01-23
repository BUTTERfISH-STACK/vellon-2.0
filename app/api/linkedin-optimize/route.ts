import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import OpenAI from 'openai';

const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null;

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

    // Check if OpenAI is available
    if (!openai) {
      return NextResponse.json({
        error: 'AI service not configured'
      }, { status: 500 });
    }

    // Generate LinkedIn headline
    const headlinePrompt = `
You are Vellon, the world's first AI-powered Done-for-You Job Application Sprint Platform.

Create an optimized LinkedIn headline (max 220 characters) for this professional.

Candidate Information:
- Name: ${client.name}
- Target Roles: ${client.desiredTitles.join(', ')}
- Industry: ${client.industry}
- Experience: ${client.yearsExperience} years
- Skills: ${client.skills.join(', ')}
- Work Preference: ${client.workPreference}

Requirements:
- Include target job titles
- Add relevant keywords for LinkedIn search
- Keep it professional and engaging
- Include location or work preference if relevant
- Make it compelling and searchable

Return only the headline text, no quotes or explanations.
    `;

    const headlineCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Create optimized LinkedIn headlines.' },
        { role: 'user', content: headlinePrompt }
      ],
      max_tokens: 100,
      temperature: 0.7,
    });

    const linkedinHeadline = headlineCompletion.choices[0]?.message?.content?.trim();

    // Generate LinkedIn summary
    const summaryPrompt = `
You are Vellon, the world's first AI-powered Done-for-You Job Application Sprint Platform.

Write an optimized LinkedIn summary (max 2000 characters) for this professional.

Candidate Information:
- Name: ${client.name}
- Target Roles: ${client.desiredTitles.join(', ')}
- Industry: ${client.industry}
- Experience: ${client.yearsExperience} years
- Skills: ${client.skills.join(', ')}
- Work Preference: ${client.workPreference}
- CV Summary: ${client.cvText ? client.cvText.substring(0, 800) : 'CV not available'}

Requirements:
- Professional and engaging tone
- Include relevant keywords for searchability
- Highlight key achievements and expertise
- Mention career goals and target roles
- Keep it concise but comprehensive
- Use first person perspective
- End with a call to connect or collaborate

Format with proper paragraphs and line breaks for readability.
    `;

    const summaryCompletion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'Write compelling LinkedIn summaries.' },
        { role: 'user', content: summaryPrompt }
      ],
      max_tokens: 600,
      temperature: 0.7,
    });

    const linkedinSummary = summaryCompletion.choices[0]?.message?.content?.trim();

    if (!linkedinHeadline || !linkedinSummary) {
      return NextResponse.json({
        error: 'Failed to generate LinkedIn optimization'
      }, { status: 500 });
    }

    const response = {
      linkedin_headline: linkedinHeadline,
      linkedin_summary: linkedinSummary
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('LinkedIn Optimization API error:', error);
    return NextResponse.json({
      error: 'Internal server error during LinkedIn optimization'
    }, { status: 500 });
  }
}