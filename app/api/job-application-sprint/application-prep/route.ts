import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Database not available - Prisma removed
    return NextResponse.json({
      error: 'Database service not available'
    }, { status: 503 });
  } catch (error) {
    console.error('Application Prep API error:', error);
    return NextResponse.json({
      error: 'Internal server error during application preparation'
    }, { status: 500 });
  }
}