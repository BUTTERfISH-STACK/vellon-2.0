import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Read templates from JSON file
    const templatesPath = path.join(process.cwd(), 'templates.json');
    const templatesData = fs.readFileSync(templatesPath, 'utf8');
    const templates = JSON.parse(templatesData);

    return NextResponse.json(templates);
  } catch (error) {
    console.error('Error loading templates:', error);
    return NextResponse.json(
      { error: 'Failed to load templates' },
      { status: 500 }
    );
  }
}

// New endpoint to fetch JSON Resume schema
export async function POST(request: Request) {
  try {
    const { action } = await request.json();

    if (action === 'fetch-schema') {
      // Fetch JSON Resume schema from GitHub
      const response = await fetch('https://raw.githubusercontent.com/jsonresume/resume-schema/master/schemas/default.json');

      if (!response.ok) {
        throw new Error(`Failed to fetch schema: ${response.status}`);
      }

      const schema = await response.json();

      return NextResponse.json({
        success: true,
        schema,
        message: 'JSON Resume schema fetched successfully'
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error fetching JSON Resume schema:', error);
    return NextResponse.json(
      { error: 'Failed to fetch JSON Resume schema' },
      { status: 500 }
    );
  }
}