import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { action } = await request.json();
    
    if (action === 'fetch-templates') {
      // Read the templates.json file
      const templatesPath = path.join(process.cwd(), 'templates.json');
      const templatesData = readFileSync(templatesPath, 'utf-8');
      const templates = JSON.parse(templatesData);
      
      return NextResponse.json({ templates }, { status: 200 });
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error in cv-templates API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch templates' },
      { status: 500 }
    );
  }
}