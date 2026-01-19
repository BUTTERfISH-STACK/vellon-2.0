'use client';

import { useEffect, useState } from 'react';

interface Template {
  id: string;
  name: string;
  preview: string;
}

export default function CVTemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/cv-templates')
      .then(res => res.json())
      .then((data: Template[]) => {
        setTemplates(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching templates:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading templates...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-28">
        <section className="text-center py-24 sm:py-36 lg:py-44 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 p-1 bg-gradient-primary rounded-full mb-8 animate-glow shadow-warm">
            <div className="bg-surface px-5 py-2.5 rounded-full">
              <span className="text-primary font-bold text-sm tracking-wide">📄 CV TEMPLATES</span>
            </div>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight bg-gradient-primary bg-clip-text text-transparent mb-8 leading-[0.9]">
            Choose Your<br />
            <span className="text-foreground/90">Perfect Template</span>
          </h1>
          <p className="max-w-4xl mx-auto text-xl sm:text-2xl text-text-muted mb-12 leading-relaxed font-light">
            Browse our collection of professional CV templates. Select one to generate your personalized resume.
          </p>
        </section>

        <section className="py-24 sm:py-32 lg:py-40">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {templates.map((template) => (
              <div
                key={template.id}
                className="group bg-surface-light backdrop-blur-sm rounded-3xl shadow-premium p-6 hover:shadow-glow hover:scale-[1.02] transition-all duration-500 border border-border/50 animate-fade-in-up cursor-pointer"
                onClick={async () => {
                  // Dummy resume data for testing
                  const dummyData = {
                    basics: {
                      name: 'John Doe',
                      label: 'Software Developer',
                      email: 'john@example.com',
                      phone: '123-456-7890',
                      summary: 'Experienced developer'
                    },
                    work: [],
                    education: [],
                    skills: []
                  };

                  try {
                    const response = await fetch('/api/generate-pdf', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        data: dummyData,
                        templateId: template.id,
                        isPro: false
                      })
                    });

                    if (response.ok) {
                      const blob = await response.blob();
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `cv-${template.id}.pdf`;
                      a.click();
                      URL.revokeObjectURL(url);
                    } else {
                      alert('Failed to generate PDF');
                    }
                  } catch (error) {
                    console.error('Error:', error);
                    alert('Error generating PDF');
                  }
                }}
              >
                <div className="aspect-[3/4] mb-4 overflow-hidden rounded-2xl">
                  <img
                    src={template.preview}
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-bold text-foreground text-center group-hover:text-primary transition-colors">
                  {template.name}
                </h3>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}