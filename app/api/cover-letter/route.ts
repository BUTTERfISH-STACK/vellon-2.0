import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { client_id, job_id } = await request.json();

    if (!client_id || !job_id) {
      return NextResponse.json({
        error: 'client_id and job_id are required'
      }, { status: 400 });
    }

    // Get client and job data
    const client = await prisma.client.findUnique({
      where: { id: client_id }
    });

    const job = await prisma.job.findUnique({
      where: { id: job_id }
    });

    if (!client) {
      return NextResponse.json({
        error: 'Client not found'
      }, { status: 404 });
    }

    if (!job) {
      return NextResponse.json({
        error: 'Job not found'
      }, { status: 404 });
    }

    // Generate cover letter using OpenAI
    const prompt = `
You are Vellon, the world's first AI-powered Done-for-You Job Application Sprint Platform.

Write a professional, tailored cover letter for this job application.

Job Details:
- Title: ${job.title}
- Company: ${job.company}
- Location: ${job.location}
- Notes: ${job.notes || 'No additional notes'}

Candidate Information:
- Name: ${client.name}
- Target Roles: ${client.desiredTitles.join(', ')}
- Industry: ${client.industry}
- Experience: ${client.yearsExperience} years
- Skills: ${client.skills.join(', ')}
- CV Summary: ${client.cvText ? client.cvText.substring(0, 500) : 'CV not available'}

Requirements:
- Professional and recruiter-ready
- Highlight key achievements from CV
- Tailor to the specific job and company
- Keep it concise (250-350 words)
- Include specific examples where possible
- End with a strong call to action
- Do NOT fabricate information

Format as a proper business letter with:
- Candidate's contact information
- Date
- Employer's contact information (use generic if not available)
- Salutation
- Body paragraphs
- Closing
    `;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a professional cover letter writer for Vellon platform. Write compelling, tailored cover letters.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 800,
      temperature: 0.7,
    });

    const coverLetterText = completion.choices[0]?.message?.content?.trim();

    if (!coverLetterText) {
      return NextResponse.json({
        error: 'Failed to generate cover letter'
      }, { status: 500 });
    }

    const response = {
      cover_letter_text: coverLetterText
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Cover Letter Generation API error:', error);
    return NextResponse.json({
      error: 'Internal server error during cover letter generation'
    }, { status: 500 });
  }
}