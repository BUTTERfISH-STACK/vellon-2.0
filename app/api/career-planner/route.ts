import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null;

interface RoadmapItem {
  year: number;
  target_role: string;
  skills_to_learn: string[];
  projects: string[];
  certifications?: string[];
  resources?: string[];
}

export async function POST(request: NextRequest) {
  try {
    const { cvContent, currentSkills, targetRole, industry } = await request.json();

    const roadmap = await generateCareerRoadmap(cvContent, currentSkills, targetRole, industry);

    return NextResponse.json(roadmap);

  } catch (error) {
    console.error('Career Planner Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function generateCareerRoadmap(
  cvContent: string,
  currentSkills: string[],
  targetRole: string,
  industry: string
): Promise<RoadmapItem[]> {
  if (!openai) {
    // Return mock roadmap if no API key
    return [
      {
        year: 1,
        target_role: "Junior " + targetRole,
        skills_to_learn: ["Advanced " + currentSkills[0], "Project Management", "Communication"],
        projects: ["Build a personal portfolio project", "Contribute to open source"],
        certifications: ["Google IT Support", "AWS Cloud Practitioner"],
        resources: ["https://www.coursera.org", "https://ocw.mit.edu"]
      },
      {
        year: 3,
        target_role: targetRole,
        skills_to_learn: ["Leadership", "Advanced Technical Skills", "Business Analysis"],
        projects: ["Lead a team project", "Mentor junior developers"],
        certifications: ["PMP Certification", "Industry-specific cert"],
        resources: ["https://www.edx.org", "https://www.khanacademy.org"]
      },
      {
        year: 5,
        target_role: "Senior " + targetRole,
        skills_to_learn: ["Strategic Planning", "Team Management", "Innovation"],
        projects: ["Start a company initiative", "Speak at conferences"],
        certifications: ["MBA", "Executive Leadership"],
        resources: ["https://www.coursera.org", "https://www.linkedin.com/learning"]
      }
    ];
  }

  const prompt = `
Based on the following CV content, current skills, and target career aspiration, generate a detailed 5-year career roadmap.

CV Content: ${cvContent.substring(0, 1000)}
Current Skills: ${currentSkills.join(', ')}
Target Role: ${targetRole}
Industry: ${industry}

Generate a JSON array with roadmap items for years 1, 3, and 5. Each item should include:
- year: number
- target_role: string (progressive roles)
- skills_to_learn: array of skills to acquire
- projects: array of suggested projects or experiences
- certifications: array of recommended certifications
- resources: array of free learning resources (prefer Coursera, MIT OCW, Khan Academy, etc.)

Focus on realistic progression and actionable steps.
Return only valid JSON.
`;

  const response = await (openai as any).chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });

  const roadmap = JSON.parse(response.choices[0].message.content || '[]');
  return roadmap;
}