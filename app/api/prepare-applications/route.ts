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

    // Get client and their jobs
    const client = await prisma.client.findUnique({
      where: { id: client_id },
      include: { jobs: true }
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

    // Prepare applications for each job
    const applications = [];

    // Check if OpenAI is available
    if (!openai) {
      return NextResponse.json({
        error: 'AI service not configured'
      }, { status: 500 });
    }

    for (const job of client.jobs.slice(0, 10)) { // Limit to top 10 for demo
      // Generate cover letter
      const coverLetterPrompt = `
Write a concise cover letter (150-200 words) for this job application.

Job: ${job.title} at ${job.company}
Location: ${job.location}

Candidate: ${client.name}
Experience: ${client.yearsExperience} years
Skills: ${client.skills.join(', ')}
Target Roles: ${client.desiredTitles.join(', ')}

Make it professional, highlight relevant experience, and show enthusiasm for the role.
      `;

      const coverLetterCompletion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: coverLetterPrompt }],
        max_tokens: 300,
        temperature: 0.7,
      });

      const coverLetter = coverLetterCompletion.choices[0]?.message?.content?.trim() || 'Cover letter generation failed';

      // Generate screening answers (mock common questions)
      const screeningQuestions = [
        'Why are you interested in this position?',
        'What is your experience with [relevant skill]?',
        'What is your salary expectation?',
        'When can you start?',
        'Do you have experience working remotely?'
      ];

      const screeningAnswers: { [key: string]: string } = {};

      for (const question of screeningQuestions) {
        const answerPrompt = `
Answer this screening question professionally and concisely (1-2 sentences):

Question: ${question}

Context:
- Job: ${job.title} at ${job.company}
- Your experience: ${client.yearsExperience} years
- Your skills: ${client.skills.join(', ')}
- Work preference: ${client.workPreference}
        `;

        const answerCompletion = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: answerPrompt }],
          max_tokens: 100,
          temperature: 0.6,
        });

        const answer = answerCompletion.choices[0]?.message?.content?.trim() || 'Please provide your answer';
        screeningAnswers[question] = answer;
      }

      // Generate recruiter pitch
      const pitchPrompt = `
Write a compelling 30-second recruiter pitch for this candidate.

Job: ${job.title} at ${job.company}
Candidate: ${client.name}
Experience: ${client.yearsExperience} years in ${client.industry}
Key Skills: ${client.skills.slice(0, 3).join(', ')}
Work Preference: ${client.workPreference}

Make it engaging, highlight top achievements, and create urgency for an interview.
      `;

      const pitchCompletion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: pitchPrompt }],
        max_tokens: 150,
        temperature: 0.7,
      });

      const recruiterPitch = pitchCompletion.choices[0]?.message?.content?.trim() || 'Recruiter pitch generation failed';

      // Identify manual input flags
      const manualInputFlags = [];
      if (screeningAnswers['What is your salary expectation?'].includes('provide your answer')) {
        manualInputFlags.push('salary_expectation');
      }
      if (screeningAnswers['When can you start?'].includes('provide your answer')) {
        manualInputFlags.push('availability');
      }
      if (client.cvText && client.cvText.length < 100) {
        manualInputFlags.push('portfolio_links');
      }

      // Create application in database
      const application = await prisma.application.create({
        data: {
          jobId: job.id,
          coverLetter: coverLetter,
          recruiterPitch: recruiterPitch,
          screeningAnswers: screeningAnswers,
          clientId: client_id
        }
      });

      applications.push({
        job_title: job.title,
        company: job.company,
        application_content: {
          cover_letter: coverLetter,
          screening_answers: screeningAnswers,
          recruiter_pitch: recruiterPitch
        },
        manual_input_flags: manualInputFlags,
        application_id: application.id
      });
    }

    // Update client status
    await prisma.client.update({
      where: { id: client_id },
      data: { status: 'applications_prepared' }
    });

    return NextResponse.json(applications);

  } catch (error) {
    console.error('Application Preparation API error:', error);
    return NextResponse.json({
      error: 'Internal server error during application preparation'
    }, { status: 500 });
  }
}