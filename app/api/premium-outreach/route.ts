import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Database not available - Prisma removed
    return NextResponse.json({
      error: 'Database service not available'
    }, { status: 503 });
  } catch (error) {
    console.error('Premium Outreach API error:', error);
    return NextResponse.json({
      error: 'Internal server error during premium outreach'
    }, { status: 500 });
  }
}