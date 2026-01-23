import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function mockJobs(client: any) {
  const jobs = [
    {
      title: 'Senior UX Designer',
      company: 'TechCorp',
      location: 'Remote',
      platform: 'LinkedIn',
      applicationLink: 'https://linkedin.com/jobs/123',
      matchScore: 95,
      notes: 'Remote, full-time',
    },
    {
      title: 'UI/UX Designer',
      company: 'DesignStudio',
      location: 'New York',
      platform: 'Indeed',
      applicationLink: 'https://indeed.com/jobs/456',
      matchScore: 88,
      notes: 'Hybrid, visa sponsorship',
    },
    {
      title: 'Product Designer',
      company: 'StartupXYZ',
      location: 'San Francisco',
      platform: 'Wellfound',
      applicationLink: 'https://wellfound.com/jobs/789',
      matchScore: 82,
      notes: 'Remote, equity package',
    },
    // Add more mock jobs to reach 30-50
  ];

  // Generate 35 mock jobs
  const mockJobsList = [];
  for (let i = 0; i < 35; i++) {
    mockJobsList.push({
      title: `${client.desiredTitles[0] || 'Designer'} ${i + 1}`,
      company: `Company${i + 1}`,
      location: i % 2 === 0 ? 'Remote' : 'New York',
      platform: ['LinkedIn', 'Indeed', 'Google Jobs'][i % 3],
      applicationLink: `https://example.com/job${i + 1}`,
      matchScore: Math.floor(70 + Math.random() * 30),
      notes: i % 3 === 0 ? 'Remote' : i % 3 === 1 ? 'Hybrid' : 'On-site',
    });
  }

  return mockJobsList;
}

function scoreRelevance(job: any, client: any) {
  // Simple scoring based on title match
  const titleMatch = job.title.toLowerCase().includes(client.desiredTitles[0]?.toLowerCase()) ? 20 : 0;
  const skillMatch = client.skills.some((skill: string) => job.title.toLowerCase().includes(skill.toLowerCase())) ? 15 : 0;
  const locationMatch = client.workPreference === 'remote' && job.location === 'Remote' ? 10 : 0;
  return Math.min(100, titleMatch + skillMatch + locationMatch + Math.floor(Math.random() * 55));
}

export async function POST(request: NextRequest) {
  try {
    const { clientId } = await request.json();

    if (!clientId) {
      return NextResponse.json({ error: 'Client ID required' }, { status: 400 });
    }

    const client = await prisma.client.findUnique({
      where: { id: clientId },
    });

    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    // Mock job sourcing
    const sourcedJobs = mockJobs(client);

    // Filter and score
    const approvedJobs = sourcedJobs
      .filter(job => job.matchScore > 60) // Exclude low matches
      .slice(0, 40); // Limit to 40

    // Create Job records
    const jobs = await Promise.all(
      approvedJobs.map(job =>
        prisma.job.create({
          data: {
            ...job,
            clientId,
          },
        })
      )
    );

    // Update client status
    await prisma.client.update({
      where: { id: clientId },
      data: { status: 'jobs_sourced' },
    });

    return NextResponse.json({
      success: true,
      jobs: jobs.map(job => ({
        id: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        platform: job.platform,
        applicationLink: job.applicationLink,
        matchScore: job.matchScore,
        notes: job.notes,
      })),
    });

  } catch (error) {
    console.error('Job sourcing error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}