import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function generateCoverLetter(client: any, job: any) {
  return `Dear Hiring Manager,

I am excited to apply for the ${job.title} position at ${job.company}. With ${client.yearsExperience} years of experience in ${client.industry}, I am confident in my ability to contribute to your team.

In my previous roles, I have successfully designed user interfaces for multiple projects, conducted thorough user research, and created design systems that improved user experience. My skills in ${client.skills.join(', ')} align perfectly with the requirements of this role.

I am particularly drawn to ${job.company} because of your commitment to innovation and user-centered design. I would welcome the opportunity to discuss how my background and skills can benefit your team.

Thank you for considering my application.

Best regards,
${client.name}
`;
}

function generateRecruiterPitch(client: any, job: any) {
  return `Experienced ${client.desiredTitles[0]} with ${client.yearsExperience} years in ${client.industry}. Skilled in ${client.skills.slice(0, 3).join(', ')}. Seeking ${job.title} role at ${job.company}.`;
}

function generateScreeningAnswers(client: any) {
  return {
    yearsExperience: `${client.yearsExperience} years`,
    noticePeriod: '2 weeks',
    workAuthorization: 'Authorized to work in the country',
    salaryRange: '$80,000 - $100,000',
  };
}

export async function POST(request: NextRequest) {
  try {
    const { clientId } = await request.json();

    if (!clientId) {
      return NextResponse.json({ error: 'Client ID required' }, { status: 400 });
    }

    const client = await prisma.client.findUnique({
      where: { id: clientId },
      include: { jobs: true },
    });

    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    // Generate applications for each job
    const applications = await Promise.all(
      client.jobs.map(async (job) => {
        const coverLetter = generateCoverLetter(client, job);
        const recruiterPitch = generateRecruiterPitch(client, job);
        const screeningAnswers = generateScreeningAnswers(client);

        return await prisma.application.create({
          data: {
            jobId: job.id,
            coverLetter,
            recruiterPitch,
            screeningAnswers,
            clientId,
          },
        });
      })
    );

    // Update client status
    await prisma.client.update({
      where: { id: clientId },
      data: { status: 'applications_prepared' },
    });

    return NextResponse.json({
      success: true,
      applications: applications.map(app => ({
        id: app.id,
        jobId: app.jobId,
        coverLetter: app.coverLetter,
        recruiterPitch: app.recruiterPitch,
        screeningAnswers: app.screeningAnswers,
      })),
    });

  } catch (error) {
    console.error('Application prep error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}