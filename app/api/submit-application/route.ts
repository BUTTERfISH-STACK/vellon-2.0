import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Database not available - Prisma removed
    return NextResponse.json({
      error: 'Database service not available'
    }, { status: 503 });
  } catch (error) {
    console.error('Submit Application API error:', error);
    return NextResponse.json({
      error: 'Internal server error during application submission'
    }, { status: 500 });
  }
}