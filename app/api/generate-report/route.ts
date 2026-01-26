import { NextRequest, NextResponse } from 'next/server';
import jsPDF from 'jspdf';

export async function POST(request: NextRequest) {
  try {
    // Database not available - Prisma removed
    return NextResponse.json({
      error: 'Database service not available'
    }, { status: 503 });
  } catch (error) {
    console.error('Generate Report API error:', error);
    return NextResponse.json({
      error: 'Internal server error during report generation'
    }, { status: 500 });
  }
}