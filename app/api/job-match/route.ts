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
  source: string;
  posted_date?: string;
  salary?: string;
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

// Cache for job listings to reduce API calls
let jobCache: { data: JobListing[]; timestamp: number } | null = null;
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

async function getJobListings(preferences: { industry?: string; location?: string; salary?: string }): Promise<JobListing[]> {
  // Check cache first
  if (jobCache && Date.now() - jobCache.timestamp < CACHE_DURATION) {
    return filterJobsByPreferences(jobCache.data, preferences);
  }

  const allJobs: JobListing[] = [];

  try {
    // Try Adzuna API first (South African jobs)
    const adzunaJobs = await fetchAdzunaJobs(preferences);
    allJobs.push(...adzunaJobs);
  } catch (error) {
    console.error('Adzuna API error:', error);
  }

  try {
    // Try JSearch API as fallback
    const jsearchJobs = await fetchJSearchJobs(preferences);
    allJobs.push(...jsearchJobs);
  } catch (error) {
    console.error('JSearch API error:', error);
  }

  // If no jobs from APIs, use fallback mock data
  if (allJobs.length === 0) {
    console.log('Using fallback mock data');
    allJobs.push(...getFallbackJobs());
  }

  // Remove duplicates and cache
  const uniqueJobs = removeDuplicateJobs(allJobs);
  jobCache = { data: uniqueJobs, timestamp: Date.now() };

  return filterJobsByPreferences(uniqueJobs, preferences);
}

async function fetchAdzunaJobs(preferences: { industry?: string; location?: string; salary?: string }): Promise<JobListing[]> {
  const ADZUNA_APP_ID = process.env.ADZUNA_APP_ID;
  const ADZUNA_APP_KEY = process.env.ADZUNA_APP_KEY;

  if (!ADZUNA_APP_ID || !ADZUNA_APP_KEY) {
    throw new Error('Adzuna API credentials not configured');
  }

  const country = 'za'; // South Africa
  const location = preferences.location || 'south africa';
  const what = preferences.industry || 'technology';

  const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_APP_KEY}&what=${encodeURIComponent(what)}&where=${encodeURIComponent(location)}&results_per_page=20`;

  const response = await axios.get(url);
  const jobs: JobListing[] = [];

  if (response.data.results) {
    response.data.results.forEach((job: any) => {
      jobs.push({
        job_title: job.title,
        company: job.company?.display_name || 'Company not specified',
        location: job.location?.display_name || 'Location not specified',
        match_percentage: 0,
        missing_skills: [],
        apply_link: job.redirect_url,
        description: job.description,
        source: 'Adzuna',
        posted_date: job.created,
        salary: job.salary_min ? `R${job.salary_min} - R${job.salary_max || 'TBD'}` : undefined
      });
    });
  }

  return jobs;
}

async function fetchJSearchJobs(preferences: { industry?: string; location?: string; salary?: string }): Promise<JobListing[]> {
  const JSEARCH_API_KEY = process.env.JSEARCH_API_KEY;

  if (!JSEARCH_API_KEY) {
    throw new Error('JSearch API key not configured');
  }

  const query = preferences.industry || 'software engineer';
  const location = preferences.location || 'South Africa';

  const url = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(query)}%20in%20${encodeURIComponent(location)}&page=1&num_pages=1`;

  const response = await axios.get(url, {
    headers: {
      'X-RapidAPI-Key': JSEARCH_API_KEY,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    }
  });

  const jobs: JobListing[] = [];

  if (response.data.data) {
    response.data.data.forEach((job: any) => {
      if (job.job_country === 'ZA' || job.job_city?.toLowerCase().includes('south africa')) {
        jobs.push({
          job_title: job.job_title,
          company: job.employer_name || 'Company not specified',
          location: job.job_city || job.job_country || 'South Africa',
          match_percentage: 0,
          missing_skills: [],
          apply_link: job.job_apply_link || job.job_google_link,
          description: job.job_description || job.job_highlights?.join(' ') || 'No description available',
          source: 'JSearch',
          posted_date: job.job_posted_at_datetime_utc,
          salary: job.job_salary || undefined
        });
      }
    });
  }

  return jobs;
}

function getFallbackJobs(): JobListing[] {
  return [
    {
      job_title: 'Software Engineer',
      company: 'Tech Corp',
      location: 'Johannesburg, South Africa',
      match_percentage: 0,
      missing_skills: [],
      apply_link: 'https://example.com/job1',
      description: 'Looking for a software engineer with JavaScript, React, and Node.js experience.',
      source: 'Demo Data'
    },
    {
      job_title: 'Data Analyst',
      company: 'Data Insights Ltd',
      location: 'Cape Town, South Africa',
      match_percentage: 0,
      missing_skills: [],
      apply_link: 'https://example.com/job2',
      description: 'Data analyst role requiring SQL, Python, and Tableau skills.',
      source: 'Demo Data'
    },
    {
      job_title: 'Project Manager',
      company: 'Agile Solutions',
      location: 'Remote',
      match_percentage: 0,
      missing_skills: [],
      apply_link: 'https://example.com/job3',
      description: 'Project manager with Agile and Scrum experience needed.',
      source: 'Demo Data'
    }
  ];
}

function removeDuplicateJobs(jobs: JobListing[]): JobListing[] {
  const seen = new Set<string>();
  return jobs.filter(job => {
    const key = `${job.job_title}-${job.company}-${job.location}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function filterJobsByPreferences(jobs: JobListing[], preferences: { industry?: string; location?: string; salary?: string }): JobListing[] {
  return jobs.filter(job => {
    if (preferences.location && !job.location.toLowerCase().includes(preferences.location.toLowerCase())) {
      return false;
    }
    if (preferences.industry && !job.description.toLowerCase().includes(preferences.industry.toLowerCase()) &&
        !job.job_title.toLowerCase().includes(preferences.industry.toLowerCase())) {
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