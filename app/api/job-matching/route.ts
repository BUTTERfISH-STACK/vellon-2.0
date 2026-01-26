import { NextRequest, NextResponse } from 'next/server';

// Mock job data - in production, this would come from job board APIs
const mockJobs = [
  { title: 'Senior Software Engineer', company: 'TechCorp', location: 'San Francisco, CA', platform: 'LinkedIn', link: 'https://linkedin.com/jobs/123' },
  { title: 'Full Stack Developer', company: 'StartupXYZ', location: 'New York, NY', platform: 'Indeed', link: 'https://indeed.com/jobs/456' },
  { title: 'UX/UI Designer', company: 'DesignStudio', location: 'London, UK', platform: 'Glassdoor', link: 'https://glassdoor.com/jobs/789' },
  { title: 'Product Manager', company: 'InnovateCo', location: 'Toronto, Canada', platform: 'LinkedIn', link: 'https://linkedin.com/jobs/101' },
  { title: 'Data Scientist', company: 'DataTech', location: 'Seattle, WA', platform: 'Indeed', link: 'https://indeed.com/jobs/202' },
  { title: 'DevOps Engineer', company: 'CloudSys', location: 'Austin, TX', platform: 'LinkedIn', link: 'https://linkedin.com/jobs/303' },
  { title: 'Marketing Manager', company: 'BrandBoost', location: 'Chicago, IL', platform: 'Glassdoor', link: 'https://glassdoor.com/jobs/404' },
  { title: 'Frontend Developer', company: 'WebWorks', location: 'Remote', platform: 'Remote.co', link: 'https://remote.co/jobs/505' },
  { title: 'Backend Engineer', company: 'ServerPro', location: 'Boston, MA', platform: 'Indeed', link: 'https://indeed.com/jobs/606' },
  { title: 'UI Designer', company: 'CreativeLab', location: 'Los Angeles, CA', platform: 'LinkedIn', link: 'https://linkedin.com/jobs/707' },
];

function calculateMatchScore(job: any, client: any): number {
  let score = 50; // Base score

  // Title match
  const titleMatch = client.desiredTitles.some((title: string) =>
    job.title.toLowerCase().includes(title.toLowerCase()) ||
    title.toLowerCase().includes(job.title.toLowerCase())
  );
  if (titleMatch) score += 20;

  // Skills match
  const skillsMatch = client.skills.some((skill: string) =>
    job.title.toLowerCase().includes(skill.toLowerCase()) ||
    job.company.toLowerCase().includes(skill.toLowerCase())
  );
  if (skillsMatch) score += 15;

  // Location match
  const locationMatch = client.countriesToApply.some((country: string) =>
    job.location.toLowerCase().includes(country.toLowerCase())
  ) || job.location.toLowerCase().includes('remote');
  if (locationMatch) score += 10;

  // Work preference
  if (client.workPreference === 'remote' && job.location.toLowerCase().includes('remote')) {
    score += 5;
  }

  // Random variation
  score += Math.floor(Math.random() * 10) - 5;

  return Math.min(100, Math.max(0, score));
}

export async function POST(request: NextRequest) {
  try {
    const { client_id } = await request.json();

    if (!client_id) {
      return NextResponse.json({
        error: 'client_id is required'
      }, { status: 400 });
    }

    // Database not available - return mock jobs
    const numJobs = Math.floor(Math.random() * 70) + 30; // 30-100
    const selectedJobs = [];

    for (let i = 0; i < numJobs; i++) {
      const jobTemplate = mockJobs[Math.floor(Math.random() * mockJobs.length)];
      const job = {
        ...jobTemplate,
        title: jobTemplate.title + (Math.random() > 0.7 ? ' (Senior)' : ''),
        company: jobTemplate.company + (Math.random() > 0.8 ? ' Inc.' : ''),
        location: Math.random() > 0.6 ? jobTemplate.location : 'Remote'
      };

      const matchScore = Math.floor(Math.random() * 50) + 50; // 50-100
      const notes = [];

      if (job.location.toLowerCase().includes('remote')) notes.push('Remote work available');
      if (job.title.includes('Senior')) notes.push('Senior level position');
      if (matchScore > 80) notes.push('High match - strong candidate fit');

      selectedJobs.push({
        job_title: job.title,
        company: job.company,
        location: job.location,
        platform: job.platform,
        link: job.link,
        match_score: matchScore,
        notes: notes.join(', ')
      });
    }

    // Sort by match score descending
    selectedJobs.sort((a, b) => b.match_score - a.match_score);

    return NextResponse.json(selectedJobs);

  } catch (error) {
    console.error('Job Matching API error:', error);
    return NextResponse.json({
      error: 'Internal server error during job matching'
    }, { status: 500 });
  }
}