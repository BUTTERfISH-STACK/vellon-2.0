import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { client_data, tier = 'basic' } = await request.json();

    if (!client_data) {
      return NextResponse.json({
        error: 'client_data is required'
      }, { status: 400 });
    }

    // Step 1: Client Intake
    console.log('Step 1: Client Intake');
    const intakeResponse = await fetch(`${process.env.NEXTAUTH_URL}/api/intake`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(client_data)
    });

    if (!intakeResponse.ok) {
      const error = await intakeResponse.json();
      return NextResponse.json({ error: `Intake failed: ${error.error}` }, { status: 400 });
    }

    const intakeResult = await intakeResponse.json();
    const clientId = intakeResult.client_id;

    // Step 2: CV Optimization
    console.log('Step 2: CV Optimization');
    const cvResponse = await fetch(`${process.env.NEXTAUTH_URL}/api/cv-optimize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id: clientId })
    });

    if (!cvResponse.ok) {
      const error = await cvResponse.json();
      return NextResponse.json({ error: `CV optimization failed: ${error.error}` }, { status: 500 });
    }

    const cvResult = await cvResponse.json();

    // Step 3: LinkedIn Optimization
    console.log('Step 3: LinkedIn Optimization');
    const linkedinResponse = await fetch(`${process.env.NEXTAUTH_URL}/api/linkedin-optimize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id: clientId })
    });

    if (!linkedinResponse.ok) {
      const error = await linkedinResponse.json();
      return NextResponse.json({ error: `LinkedIn optimization failed: ${error.error}` }, { status: 500 });
    }

    const linkedinResult = await linkedinResponse.json();

    // Step 4: Job Matching
    console.log('Step 4: Job Matching');
    const jobResponse = await fetch(`${process.env.NEXTAUTH_URL}/api/job-matching`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id: clientId })
    });

    if (!jobResponse.ok) {
      const error = await jobResponse.json();
      return NextResponse.json({ error: `Job matching failed: ${error.error}` }, { status: 500 });
    }

    const jobResults = await jobResponse.json();

    // Step 5: Application Preparation
    console.log('Step 5: Application Preparation');
    const appResponse = await fetch(`${process.env.NEXTAUTH_URL}/api/prepare-applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id: clientId })
    });

    if (!appResponse.ok) {
      const error = await appResponse.json();
      return NextResponse.json({ error: `Application preparation failed: ${error.error}` }, { status: 500 });
    }

    const appResults = await appResponse.json();

    // Step 6: Premium Outreach (if premium tier)
    let outreachResults = null;
    if (tier === 'premium' || tier === 'enterprise') {
      console.log('Step 6: Premium Outreach');
      const outreachResponse = await fetch(`${process.env.NEXTAUTH_URL}/api/premium-outreach`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ client_id: clientId })
      });

      if (outreachResponse.ok) {
        outreachResults = await outreachResponse.json();
      }
    }

    // Compile final response
    const workflowResult = {
      client_id: clientId,
      status: 'workflow_completed',
      completed_modules: [
        'client_intake',
        'cv_optimization',
        'linkedin_optimization',
        'job_matching',
        'application_preparation'
      ],
      results: {
        intake: intakeResult,
        cv_optimization: cvResult,
        linkedin_optimization: linkedinResult,
        job_matching: {
          total_jobs: jobResults.length,
          top_matches: jobResults.slice(0, 10)
        },
        application_preparation: {
          total_applications: appResults.length,
          applications: appResults
        },
        premium_outreach: outreachResults ? {
          total_messages: outreachResults.length,
          messages: outreachResults
        } : null
      },
      next_steps: [
        'Human operators will submit applications manually',
        'Monitor application status in dashboard',
        'Follow up on submitted applications after 1-2 weeks',
        'Update LinkedIn profile with optimized content',
        'Prepare for interviews'
      ],
      tier: tier,
      estimated_completion: tier === 'basic' ? '3-5 business days' : '1-2 business days'
    };

    // Update client status to completed
    await prisma.client.update({
      where: { id: clientId },
      data: { status: 'workflow_completed' }
    });

    return NextResponse.json(workflowResult);

  } catch (error) {
    console.error('Full Workflow API error:', error);
    return NextResponse.json({
      error: 'Internal server error during workflow execution'
    }, { status: 500 });
  }
}