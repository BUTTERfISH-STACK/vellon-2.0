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

// New endpoint to fetch JSON Resume templates
export async function POST(request: Request) {
  try {
    const { action } = await request.json();

    if (action === 'fetch-templates') {
      // Fetch sample CV templates from JSON Resume examples
      const templates = [
        {
          id: 'sample-developer',
          name: 'Software Developer',
          description: 'Sample CV for a software developer role',
          data: {
            basics: {
              name: 'John Doe',
              label: 'Software Developer',
              email: 'john.doe@example.com',
              phone: '(555) 123-4567',
              website: 'https://johndoe.dev',
              summary: 'Experienced software developer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies.',
              location: {
                address: '123 Main St',
                postalCode: '12345',
                city: 'San Francisco',
                countryCode: 'US',
                region: 'CA'
              },
              profiles: [
                {
                  network: 'LinkedIn',
                  username: 'johndoe',
                  url: 'https://linkedin.com/in/johndoe'
                },
                {
                  network: 'GitHub',
                  username: 'johndoe',
                  url: 'https://github.com/johndoe'
                }
              ]
            },
            work: [
              {
                name: 'Tech Corp',
                position: 'Senior Software Developer',
                startDate: '2020-01-01',
                endDate: '2023-12-31',
                summary: 'Led development of scalable web applications',
                highlights: [
                  'Developed and maintained 10+ production applications',
                  'Mentored 3 junior developers',
                  'Improved application performance by 40%'
                ]
              },
              {
                name: 'Startup Inc',
                position: 'Full Stack Developer',
                startDate: '2018-06-01',
                endDate: '2019-12-31',
                summary: 'Built MVP for a fintech startup',
                highlights: [
                  'Developed React-based frontend',
                  'Implemented RESTful APIs with Node.js',
                  'Integrated payment processing systems'
                ]
              }
            ],
            education: [
              {
                institution: 'University of Technology',
                area: 'Computer Science',
                studyType: 'Bachelor of Science',
                startDate: '2014-09-01',
                endDate: '2018-05-31',
                gpa: '3.8'
              }
            ],
            skills: [
              { name: 'JavaScript', level: 'Expert' },
              { name: 'React', level: 'Expert' },
              { name: 'Node.js', level: 'Advanced' },
              { name: 'Python', level: 'Intermediate' },
              { name: 'AWS', level: 'Advanced' }
            ],
            languages: [
              { language: 'English', fluency: 'Native' },
              { language: 'Spanish', fluency: 'Intermediate' }
            ],
            projects: [
              {
                name: 'E-commerce Platform',
                description: 'Full-stack e-commerce solution',
                highlights: [
                  'Built with React and Node.js',
                  'Integrated Stripe payments',
                  'Deployed on AWS'
                ],
                keywords: ['React', 'Node.js', 'MongoDB', 'Stripe'],
                startDate: '2022-01-01',
                endDate: '2022-06-01',
                url: 'https://github.com/johndoe/ecommerce'
              }
            ]
          }
        },
        {
          id: 'sample-designer',
          name: 'UX Designer',
          description: 'Sample CV for a UX designer role',
          data: {
            basics: {
              name: 'Jane Smith',
              label: 'UX Designer',
              email: 'jane.smith@example.com',
              phone: '(555) 987-6543',
              website: 'https://janesmith.design',
              summary: 'Creative UX designer with 4+ years of experience creating user-centered digital experiences. Passionate about accessibility and user research.',
              location: {
                address: '456 Design St',
                postalCode: '67890',
                city: 'New York',
                countryCode: 'US',
                region: 'NY'
              },
              profiles: [
                {
                  network: 'LinkedIn',
                  username: 'janesmith',
                  url: 'https://linkedin.com/in/janesmith'
                },
                {
                  network: 'Dribbble',
                  username: 'janesmith',
                  url: 'https://dribbble.com/janesmith'
                }
              ]
            },
            work: [
              {
                name: 'Design Agency',
                position: 'Senior UX Designer',
                startDate: '2021-03-01',
                summary: 'Led UX design for client projects',
                highlights: [
                  'Conducted user research and usability testing',
                  'Created wireframes and prototypes in Figma',
                  'Collaborated with development teams'
                ]
              }
            ],
            education: [
              {
                institution: 'Art Institute',
                area: 'Graphic Design',
                studyType: 'Bachelor of Fine Arts',
                startDate: '2016-09-01',
                endDate: '2020-05-31'
              }
            ],
            skills: [
              { name: 'Figma', level: 'Expert' },
              { name: 'Sketch', level: 'Advanced' },
              { name: 'Adobe Creative Suite', level: 'Expert' },
              { name: 'User Research', level: 'Advanced' },
              { name: 'Prototyping', level: 'Expert' }
            ],
            languages: [
              { language: 'English', fluency: 'Native' },
              { language: 'French', fluency: 'Conversational' }
            ]
          }
        },
        {
          id: 'sample-manager',
          name: 'Project Manager',
          description: 'Sample CV for a project manager role',
          data: {
            basics: {
              name: 'Mike Johnson',
              label: 'Project Manager',
              email: 'mike.johnson@example.com',
              phone: '(555) 555-0123',
              website: 'https://mikejohnson.pm',
              summary: 'Results-driven project manager with 6+ years of experience leading cross-functional teams and delivering complex projects on time and within budget.',
              location: {
                address: '789 Business Ave',
                postalCode: '54321',
                city: 'Chicago',
                countryCode: 'US',
                region: 'IL'
              },
              profiles: [
                {
                  network: 'LinkedIn',
                  username: 'mikejohnson',
                  url: 'https://linkedin.com/in/mikejohnson'
                }
              ]
            },
            work: [
              {
                name: 'Global Corp',
                position: 'Senior Project Manager',
                startDate: '2019-01-01',
                summary: 'Managed enterprise software implementation projects',
                highlights: [
                  'Led $2M+ project portfolio',
                  'Managed teams of 15+ members',
                  'Achieved 95% on-time delivery rate'
                ]
              }
            ],
            education: [
              {
                institution: 'Business University',
                area: 'Business Administration',
                studyType: 'Master of Business Administration',
                startDate: '2015-09-01',
                endDate: '2017-05-31'
              }
            ],
            skills: [
              { name: 'Project Management', level: 'Expert' },
              { name: 'Agile/Scrum', level: 'Expert' },
              { name: 'Risk Management', level: 'Advanced' },
              { name: 'Stakeholder Management', level: 'Expert' },
              { name: 'Budget Management', level: 'Advanced' }
            ],
            certifications: [
              {
                name: 'PMP Certification',
                issuer: 'Project Management Institute',
                date: '2018-06-01'
              }
            ]
          }
        }
      ];

      return NextResponse.json({
        success: true,
        templates,
        message: 'CV templates fetched successfully'
      });
    }

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
    console.error('Error fetching CV data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch CV data' },
      { status: 500 }
    );
  }
}