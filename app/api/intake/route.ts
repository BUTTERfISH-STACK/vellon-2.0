import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'email', 'location', 'target_roles', 'industry', 'experience_years', 'skills', 'cv_text', 'linkedin', 'countries', 'consent', 'work_preference'];
    const missingFields = requiredFields.filter(field => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json({
        error: `Missing required fields: ${missingFields.join(', ')}`,
        validation_notes: `Missing: ${missingFields.join(', ')}`
      }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({
        error: 'Invalid email format',
        validation_notes: 'Invalid email format'
      }, { status: 400 });
    }

    // Validate arrays
    if (!Array.isArray(body.target_roles) || body.target_roles.length === 0) {
      return NextResponse.json({
        error: 'target_roles must be a non-empty array',
        validation_notes: 'target_roles must be a non-empty array'
      }, { status: 400 });
    }

    if (!Array.isArray(body.skills) || body.skills.length === 0) {
      return NextResponse.json({
        error: 'skills must be a non-empty array',
        validation_notes: 'skills must be a non-empty array'
      }, { status: 400 });
    }

    if (!Array.isArray(body.countries) || body.countries.length === 0) {
      return NextResponse.json({
        error: 'countries must be a non-empty array',
        validation_notes: 'countries must be a non-empty array'
      }, { status: 400 });
    }

    // Validate consent
    if (typeof body.consent !== 'boolean' || !body.consent) {
      return NextResponse.json({
        error: 'Consent must be true',
        validation_notes: 'Consent must be true'
      }, { status: 400 });
    }

    // Validate experience_years
    if (typeof body.experience_years !== 'number' || body.experience_years < 0) {
      return NextResponse.json({
        error: 'experience_years must be a non-negative number',
        validation_notes: 'experience_years must be a non-negative number'
      }, { status: 400 });
    }

    // Validate work_preference
    const validWorkPreferences = ['remote', 'hybrid', 'on-site'];
    if (!validWorkPreferences.includes(body.work_preference)) {
      return NextResponse.json({
        error: 'work_preference must be one of: remote, hybrid, on-site',
        validation_notes: 'work_preference must be one of: remote, hybrid, on-site'
      }, { status: 400 });
    }

    // Database not available - Prisma removed
    // Mock client creation
    const mockClientId = `mock-${Date.now()}`;

    // Generate recruiter-friendly summary
    const summary = `
Client: ${body.name}
Email: ${body.email}
Location: ${body.location}
Target Roles: ${body.target_roles.join(', ')}
Industry: ${body.industry}
Work Preference: ${body.work_preference}
Experience: ${body.experience_years} years
Skills: ${body.skills.join(', ')}
Countries: ${body.countries.join(', ')}
LinkedIn: ${body.linkedin || 'Not provided'}
Consent: ${body.consent ? 'Given' : 'Not given'}
    `.trim();

    const response = {
      name: body.name,
      email: body.email,
      location: body.location,
      target_roles: body.target_roles,
      industry: body.industry,
      work_preference: body.work_preference,
      experience_years: body.experience_years,
      skills: body.skills,
      cv_text: body.cv_text,
      linkedin: body.linkedin,
      countries: body.countries,
      consent: body.consent,
      validation_notes: 'All fields validated successfully',
      client_id: mockClientId,
      summary: summary
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Intake API error:', error);
    return NextResponse.json({
      error: 'Internal server error',
      validation_notes: 'Server error during intake'
    }, { status: 500 });
  }
}