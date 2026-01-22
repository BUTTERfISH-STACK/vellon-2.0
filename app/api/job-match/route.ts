import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

interface JobListing {
  job_title: string;
  company: string;
  location: string;
  match_percentage: number;
  missing_skills: string[];
  apply_link: string;
  description: string;
}

export async function POST(request: NextRequest) {
  try {
    const { cvContent, skills, experience, jobPreferences } = await request.json();

    // Extract skills and experience from CV
    const userSkills = extractSkills(cvContent, skills);
    const userExperience = extractExperience(cvContent, experience);

    // Get job listings (mock for now, in production scrape real sites)
    const jobListings = await getJobListings(jobPreferences);

    // Match jobs
    const matchedJobs = matchJobs(userSkills, userExperience, jobListings);

    // Sort by match percentage
    matchedJobs.sort((a, b) => b.match_percentage - a.match_percentage);

    return NextResponse.json(matchedJobs.slice(0, 20)); // Top 20

  } catch (error) {
    console.error('Job Match Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function extractSkills(cvContent: string, providedSkills: string[]): string[] {
  const skills = new Set(providedSkills || []);

  // Extract from CV text
  const skillKeywords = [
    'javascript', 'python', 'react', 'node.js', 'sql', 'aws', 'docker',
    'agile', 'scrum', 'leadership', 'communication', 'project management'
  ];

  const lowerCv = cvContent.toLowerCase();
  skillKeywords.forEach(skill => {
    if (lowerCv.includes(skill)) {
      skills.add(skill.charAt(0).toUpperCase() + skill.slice(1));
    }
  });

  return Array.from(skills);
}

function extractExperience(cvContent: string, providedExperience: string): number {
  if (providedExperience) {
    const match = providedExperience.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }

  // Estimate from CV length and keywords
  const seniorKeywords = ['senior', 'lead', 'principal', 'manager', 'director'];
  const lowerCv = cvContent.toLowerCase();
  const hasSenior = seniorKeywords.some(k => lowerCv.includes(k));

  if (cvContent.length > 5000 || hasSenior) return 5;
  if (cvContent.length > 3000) return 3;
  return 1;
}

async function getJobListings(preferences: { industry?: string; location?: string; salary?: string }): Promise<JobListing[]> {
  // Mock job listings for demonstration
  // In production, scrape from Indeed, LinkedIn, etc.
  const mockJobs: JobListing[] = [
    {
      job_title: 'Software Engineer',
      company: 'Tech Corp',
      location: 'Johannesburg, South Africa',
      match_percentage: 0, // Will be calculated
      missing_skills: [],
      apply_link: 'https://example.com/job1',
      description: 'Looking for a software engineer with JavaScript, React, and Node.js experience.'
    },
    {
      job_title: 'Data Analyst',
      company: 'Data Insights Ltd',
      location: 'Cape Town, South Africa',
      match_percentage: 0,
      missing_skills: [],
      apply_link: 'https://example.com/job2',
      description: 'Data analyst role requiring SQL, Python, and Tableau skills.'
    },
    {
      job_title: 'Project Manager',
      company: 'Agile Solutions',
      location: 'Remote',
      match_percentage: 0,
      missing_skills: [],
      apply_link: 'https://example.com/job3',
      description: 'Project manager with Agile and Scrum experience needed.'
    },
    // Add more mock jobs...
  ];

  // Filter by preferences
  return mockJobs.filter(job => {
    if (preferences.location && !job.location.toLowerCase().includes(preferences.location.toLowerCase())) {
      return false;
    }
    if (preferences.industry && !job.description.toLowerCase().includes(preferences.industry.toLowerCase())) {
      return false;
    }
    return true;
  });
}

function matchJobs(userSkills: string[], userExperience: number, jobs: JobListing[]): JobListing[] {
  return jobs.map(job => {
    const jobSkills = extractSkillsFromDescription(job.description);
    const matchedSkills = userSkills.filter(skill =>
      jobSkills.some(jobSkill => jobSkill.toLowerCase().includes(skill.toLowerCase()))
    );

    const matchPercentage = Math.min(100, (matchedSkills.length / jobSkills.length) * 100 + (userExperience * 5));

    const missingSkills = jobSkills.filter(skill =>
      !userSkills.some(userSkill => userSkill.toLowerCase().includes(skill.toLowerCase()))
    );

    return {
      ...job,
      match_percentage: Math.round(matchPercentage),
      missing_skills: missingSkills
    };
  });
}

function extractSkillsFromDescription(description: string): string[] {
  const skills: string[] = [];
  const skillPatterns = [
    /javascript|python|react|node\.js|sql|aws|docker/gi,
    /agile|scrum|leadership|communication/gi,
    /project management|data analysis|tableau/gi
  ];

  skillPatterns.forEach(pattern => {
    const matches = description.match(pattern);
    if (matches) {
      skills.push(...matches);
    }
  });

  return [...new Set(skills)]; // Remove duplicates
}