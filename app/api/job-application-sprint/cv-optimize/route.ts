import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function optimizeCV(text: string, primaryRole: string, skills: string[]) {
  // For demo, add ATS keywords and rephrase
  let optimized = text;

  // Add keywords
  const keywords = skills.join(', ') + ', ' + primaryRole;
  optimized = optimized.replace('Skills:', `Skills: ${keywords}, `);

  // Quantify achievements
  optimized = optimized.replace('Designed user interfaces', 'Designed user interfaces for 50+ web and mobile applications');
  optimized = optimized.replace('Conducted user research', 'Conducted user research for 20+ projects');

  return optimized;
}

function extractKeywords(text: string, skills: string[]) {
  // Mock keywords for ATS
  return [...skills, 'UI/UX Design', 'Prototyping', 'User Research', 'Figma', 'Adobe XD'];
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

    if (!client || !client.cvText) {
      return NextResponse.json({ error: 'Client or CV not found' }, { status: 404 });
    }

    const primaryRole = client.desiredTitles[0] || 'Professional';
    const optimizedCV = optimizeCV(client.cvText, primaryRole, client.skills);
    const keywords = extractKeywords(client.cvText, client.skills);

    // Update client status
    await prisma.client.update({
      where: { id: clientId },
      data: {
        status: 'cv_optimized',
        cvText: optimizedCV, // Update with optimized version
      },
    });

    return NextResponse.json({
      success: true,
      optimizedCV,
      keywords,
      roleFocus: primaryRole,
    });

  } catch (error) {
    console.error('CV optimize error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}