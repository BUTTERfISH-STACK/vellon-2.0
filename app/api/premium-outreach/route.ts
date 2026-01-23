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

    // Get client and top 15 jobs
    const client = await prisma.client.findUnique({
      where: { id: client_id },
      include: {
        jobs: {
          orderBy: { matchScore: 'desc' },
          take: 15
        }
      }
    });

    if (!client) {
      return NextResponse.json({
        error: 'Client not found'
      }, { status: 404 });
    }

    if (!client.jobs || client.jobs.length === 0) {
      return NextResponse.json({
        error: 'No jobs found for this client'
      }, { status: 400 });
    }

    // Check if OpenAI is available
    if (!openai) {
      return NextResponse.json({
        error: 'AI service not configured'
      }, { status: 500 });
    }

    // Generate outreach messages for top jobs
    const outreachMessages = [];

    for (const job of client.jobs) {
      const prompt = `
You are Vellon, the world's first AI-powered Done-for-You Job Application Sprint Platform.

Write a personalized, professional outreach message for direct employer contact.

Context:
- Job: ${job.title} at ${job.company}
- Location: ${job.location}
- Candidate: ${client.name}
- Experience: ${client.yearsExperience} years
- Skills: ${client.skills.join(', ')}
- Industry: ${client.industry}
- Key Achievement: [Based on CV, highlight one major accomplishment]

Requirements:
- Professional and highly engaging
- Concise (100-150 words)
- Highlight candidate's key achievements
- Show genuine interest in the company/role
- Include a clear call-to-action
- Position the candidate as a valuable asset
- Reference specific skills relevant to the role

Format as an email message with subject line, greeting, body, and professional closing.
      `;

      const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'Write compelling, professional outreach messages for premium job seekers.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 300,
        temperature: 0.7,
      });

      const outreachMessage = completion.choices[0]?.message?.content?.trim();

      if (outreachMessage) {
        outreachMessages.push({
          job_title: job.title,
          company: job.company,
          outreach_message: outreachMessage
        });
      }
    }

    return NextResponse.json(outreachMessages);

  } catch (error) {
    console.error('Premium Outreach API error:', error);
    return NextResponse.json({
      error: 'Internal server error during premium outreach generation'
    }, { status: 500 });
  }
}