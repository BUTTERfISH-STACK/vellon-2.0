import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { application_id, status, notes } = await request.json();

    if (!application_id) {
      return NextResponse.json({
        error: 'application_id is required'
      }, { status: 400 });
    }

    // Get application
    const application = await prisma.application.findUnique({
      where: { id: application_id },
      include: { job: true, client: true }
    });

    if (!application) {
      return NextResponse.json({
        error: 'Application not found'
      }, { status: 404 });
    }

    // Create or update submission
    const submission = await prisma.submission.upsert({
      where: { applicationId: application_id },
      update: {
        status: status || 'submitted',
        notes: notes || '',
        submittedAt: status === 'submitted' ? new Date() : undefined
      },
      create: {
        applicationId: application_id,
        status: status || 'submitted',
        notes: notes || '',
        submittedAt: status === 'submitted' ? new Date() : undefined
      }
    });

    // If all applications are submitted, update client status
    const totalApplications = await prisma.application.count({
      where: { clientId: application.clientId }
    });

    const submittedApplications = await prisma.application.count({
      where: {
        clientId: application.clientId,
        submission: {
          status: 'submitted'
        }
      }
    });

    if (submittedApplications === totalApplications) {
      await prisma.client.update({
        where: { id: application.clientId },
        data: { status: 'completed' }
      });
    }

    return NextResponse.json({
      success: true,
      submission_id: submission.id,
      status: submission.status
    });

  } catch (error) {
    console.error('Submit Application API error:', error);
    return NextResponse.json({
      error: 'Internal server error during submission'
    }, { status: 500 });
  }
}