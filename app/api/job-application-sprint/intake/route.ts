import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function extractTextFromFile(buffer: Buffer, fileType: string, fileName: string): Promise<string> {
  // For demo purposes, return mock content based on filename
  const mockContent = `
John Doe
UX/UI Designer

Professional Summary:
Creative UX/UI designer with 4+ years of experience crafting intuitive user experiences.
Specialized in user-centered design, prototyping, and design systems.

Experience:
Senior UX Designer at Design Studio (2021-Present)
- Designed user interfaces for web and mobile applications
- Conducted user research and usability testing
- Created design systems and style guides

Skills:
- Figma, Adobe XD, Sketch
- User Research, Prototyping
- Design Systems, Wireframing
- HTML, CSS, JavaScript

Education:
Bachelor of Fine Arts in Graphic Design
Design University, 2019
  `;

  return mockContent;
}

function validateCVCompleteness(text: string) {
  const issues = [];
  const lowerText = text.toLowerCase();

  if (!lowerText.includes('experience') && !lowerText.includes('work history')) {
    issues.push('Missing work experience section');
  }

  if (!lowerText.includes('education') && !lowerText.includes('qualification')) {
    issues.push('Missing education section');
  }

  if (!lowerText.includes('skills') && !lowerText.includes('competencies')) {
    issues.push('Missing skills section');
  }

  if (text.split(/\s+/).length < 200) {
    issues.push('CV appears too short (less than 200 words)');
  }

  // Check for metrics
  const hasMetrics = /\d+%|\d+ years|\$\d+|\d+ projects|\d+ team/i.test(text);
  if (!hasMetrics) {
    issues.push('Limited quantifiable achievements or metrics');
  }

  return issues;
}

function flagRisks(text: string) {
  const risks = [];
  const lowerText = text.toLowerCase();

  // Employment gaps
  if (lowerText.includes('gap') || lowerText.includes('unemployed')) {
    risks.push('Potential employment gaps detected');
  }

  // Unclear titles
  const titlePatterns = /job title|position|role/i;
  if (!titlePatterns.test(text)) {
    risks.push('Unclear job titles or roles');
  }

  // Short CV
  if (text.length < 1000) {
    risks.push('CV is very brief, may lack detail');
  }

  return risks;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const location = formData.get('location') as string;
    const desiredTitles = JSON.parse(formData.get('desiredTitles') as string) as string[];
    const industry = formData.get('industry') as string;
    const workPreference = formData.get('workPreference') as string;
    const yearsExperience = parseInt(formData.get('yearsExperience') as string);
    const skills = JSON.parse(formData.get('skills') as string) as string[];
    const linkedinUrl = formData.get('linkedinUrl') as string || null;
    const countriesToApply = JSON.parse(formData.get('countriesToApply') as string) as string[];
    const consent = formData.get('consent') === 'true';
    const cvFile = formData.get('cv') as File;

    if (!name || !email || !cvFile) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Extract CV text
    const bytes = await cvFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const cvText = await extractTextFromFile(buffer, cvFile.type, cvFile.name);

    // Validate completeness
    const completenessIssues = validateCVCompleteness(cvText);
    const risks = flagRisks(cvText);

    // Create client
    const client = await prisma.client.create({
      data: {
        name,
        email,
        location,
        desiredTitles,
        industry,
        workPreference,
        yearsExperience,
        skills,
        cvText,
        linkedinUrl,
        countriesToApply,
        consent,
      },
    });

    // Optimization strategy
    const optimizationStrategy = [
      'Focus on incorporating more quantifiable achievements',
      'Ensure ATS-friendly keywords are prominent',
      'Tailor CV for the primary desired role',
      'Highlight relevant skills and experience',
    ];

    return NextResponse.json({
      success: true,
      clientId: client.id,
      intakeSummary: {
        name,
        email,
        desiredTitles,
        industry,
        yearsExperience,
        skillsCount: skills.length,
        cvWordCount: cvText.split(/\s+/).length,
      },
      riskNotes: risks,
      optimizationStrategy,
      completenessIssues,
    });

  } catch (error) {
    console.error('Intake error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}