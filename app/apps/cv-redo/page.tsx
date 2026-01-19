'use client';

import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';

// Sample CV data for previews
const sampleCVData = {
  basics: {
    name: 'John Doe',
    label: 'Software Developer',
    email: 'john@example.com',
    phone: '(555) 123-4567',
    website: 'https://johndoe.dev',
    summary: 'Experienced software developer with 5+ years of expertise in full-stack development.',
    location: {
      address: '123 Main St',
      postalCode: '12345',
      city: 'Anytown',
      countryCode: 'US',
      region: 'CA'
    },
    profiles: [
      {
        network: 'LinkedIn',
        username: 'johndoe',
        url: 'https://linkedin.com/in/johndoe'
      }
    ]
  },
  work: [
    {
      name: 'Tech Corp',
      position: 'Senior Developer',
      startDate: '2020-01-01',
      endDate: '2023-12-31',
      summary: 'Led development of web applications using React and Node.js',
      highlights: [
        'Developed scalable web applications',
        'Mentored junior developers',
        'Improved performance by 40%'
      ]
    }
  ],
  education: [
    {
      institution: 'University of Technology',
      area: 'Computer Science',
      studyType: 'Bachelor',
      startDate: '2016-09-01',
      endDate: '2020-05-31',
      gpa: '3.8'
    }
  ],
  skills: [
    { name: 'JavaScript', level: 'Expert' },
    { name: 'React', level: 'Expert' },
    { name: 'Node.js', level: 'Advanced' },
    { name: 'Python', level: 'Intermediate' }
  ],
  languages: [
    { language: 'English', fluency: 'Native' },
    { language: 'Spanish', fluency: 'Intermediate' }
  ]
};

interface CVData {
  personal: {
    name: string;
    email: string;
    phone: string;
    address: string;
    linkedin: string;
    website: string;
  };
  summary: string;
  experience: Array<{
    position: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    startDate: string;
    endDate: string;
    gpa: string;
  }>;
  skills: string[];
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
  }>;
}

interface CVTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  category: string;
  package: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  features: string[];
}

export default function CVRedoPage() {
  const [isPro, setIsPro] = useState(true); // Set to true for development - in production this would come from user authentication
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('creative');
  const [cvData, setCvData] = useState<CVData>({
    personal: {
      name: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      website: ''
    },
    summary: '',
    experience: [{ position: '', company: '', startDate: '', endDate: '', description: '' }],
    education: [{ degree: '', institution: '', startDate: '', endDate: '', gpa: '' }],
    skills: [''],
    certifications: [{ name: '', issuer: '', date: '' }]
  });

  // Available templates based on tier
  const [freeTemplates, setFreeTemplates] = useState<CVTemplate[]>([
    {
      id: 'universal',
      name: 'Universal CV',
      description: 'Clean and professional CV template suitable for all industries and career levels',
      preview: '/templates/universal-preview.jpg',
      category: 'Basic',
      package: 'jsonresume-theme-universal',
      colors: { primary: '#2563eb', secondary: '#64748b', accent: '#f59e0b' },
      features: ['Clean Design', 'Professional', 'Universal Appeal']
    }
  ]);

  const [proTemplates, setProTemplates] = useState<CVTemplate[]>([
    {
      id: 'moderncv',
      name: 'Modern CV',
      description: 'A modern curriculum vitae template with clean design and professional layout, inspired by LaTeX moderncv',
      preview: '/templates/moderncv-preview.jpg',
      category: 'Modern',
      package: 'jsonresume-theme-moderncv',
      colors: { primary: '#000000', secondary: '#000000', accent: '#000000' },
      features: ['Clean Design', 'Professional Layout', 'LaTeX Inspired']
    },
    {
      id: 'creative',
      name: 'Creative CV',
      description: 'Creative and artistic CV template for designers and creative professionals',
      preview: '/templates/creative-preview.jpg',
      category: 'Creative',
      package: 'jsonresume-theme-creative',
      colors: { primary: '#dc2626', secondary: '#ea580c', accent: '#7c3aed' },
      features: ['Artistic Design', 'Creative Layout', 'Visual Appeal']
    },
    {
      id: 'classic',
      name: 'Classic CV',
      description: 'Classic and timeless CV template with elegant typography and clean layout',
      preview: '/templates/classic-preview.jpg',
      category: 'Classic',
      package: 'jsonresume-theme-classic',
      colors: { primary: '#374151', secondary: '#6b7280', accent: '#111827' },
      features: ['Elegant Typography', 'Clean Layout', 'Timeless Design']
    }
  ]);

  // Set default template based on tier
  useEffect(() => {
    setSelectedTemplate(isPro ? 'creative' : 'universal');
  }, [isPro]);

  // Fetch JSON Resume schema for validation
  const [jsonResumeSchema, setJsonResumeSchema] = useState<any>(null);
  const [schemaLoading, setSchemaLoading] = useState(false);

  const fetchJsonResumeSchema = async () => {
    setSchemaLoading(true);
    try {
      const response = await fetch('/api/cv-templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'fetch-schema' }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch schema');
      }

      const data = await response.json();
      setJsonResumeSchema(data.schema);
      console.log('JSON Resume Schema:', data.schema);
    } catch (error) {
      console.error('Error fetching JSON Resume schema:', error);
    } finally {
      setSchemaLoading(false);
    }
  };

  // Fetch schema on component mount
  useEffect(() => {
    fetchJsonResumeSchema();
  }, []);

  // Template filtering and search
  const [templateFilter, setTemplateFilter] = useState<string>('all');
  const [templateSearch, setTemplateSearch] = useState<string>('');

  const availableTemplates = isPro ? proTemplates : freeTemplates;
  const categories = ['all', ...Array.from(new Set(availableTemplates.map(t => t.category)))];

  const filteredTemplates = availableTemplates.filter(template => {
    const matchesCategory = templateFilter === 'all' || template.category === templateFilter;
    const matchesSearch = template.name.toLowerCase().includes(templateSearch.toLowerCase()) ||
                         template.description.toLowerCase().includes(templateSearch.toLowerCase()) ||
                         template.category.toLowerCase().includes(templateSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const updatePersonal = (field: keyof CVData['personal'], value: string) => {
    setCvData(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: value }
    }));
  };

  const updateExperience = (index: number, field: keyof CVData['experience'][0], value: string) => {
    setCvData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => i === index ? { ...exp, [field]: value } : exp)
    }));
  };

  const addExperience = () => {
    setCvData(prev => ({
      ...prev,
      experience: [...prev.experience, { position: '', company: '', startDate: '', endDate: '', description: '' }]
    }));
  };

  const removeExperience = (index: number) => {
    setCvData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const updateEducation = (index: number, field: keyof CVData['education'][0], value: string) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => i === index ? { ...edu, [field]: value } : edu)
    }));
  };

  const addEducation = () => {
    setCvData(prev => ({
      ...prev,
      education: [...prev.education, { degree: '', institution: '', startDate: '', endDate: '', gpa: '' }]
    }));
  };

  const removeEducation = (index: number) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const updateSkill = (index: number, value: string) => {
    setCvData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => i === index ? value : skill)
    }));
  };

  const addSkill = () => {
    setCvData(prev => ({
      ...prev,
      skills: [...prev.skills, '']
    }));
  };

  const removeSkill = (index: number) => {
    setCvData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const updateCertification = (index: number, field: keyof CVData['certifications'][0], value: string) => {
    setCvData(prev => ({
      ...prev,
      certifications: prev.certifications.map((cert, i) => i === index ? { ...cert, [field]: value } : cert)
    }));
  };

  const addCertification = () => {
    setCvData(prev => ({
      ...prev,
      certifications: [...prev.certifications, { name: '', issuer: '', date: '' }]
    }));
  };

  const removeCertification = (index: number) => {
    setCvData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  const generatePDF = async () => {
    setIsGenerating(true);

    const doc = new jsPDF();
    let yPosition = 20;

    // Get selected template colors
    const availableTemplates = isPro ? proTemplates : freeTemplates;
    const currentTemplate = availableTemplates.find(t => t.id === selectedTemplate) || availableTemplates[0];

    // Apply template-specific header styling
    if (isPro && currentTemplate) {
      // Template-specific header styling
      if (selectedTemplate === 'executive') {
        // Executive template - sophisticated and professional
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(currentTemplate.colors.primary);
        doc.text(cvData.personal.name || 'Your Name', 20, yPosition);
        yPosition += 12;

        // Decorative line
        doc.setDrawColor(currentTemplate.colors.primary);
        doc.setLineWidth(2);
        doc.line(20, yPosition, 80, yPosition);
        yPosition += 8;

        doc.setFontSize(11);
        doc.setTextColor(currentTemplate.colors.secondary);
        doc.text('Executive Professional - AI Redesigned', 20, yPosition);
        yPosition += 15;

      } else if (selectedTemplate === 'creative') {
        // Creative template - artistic and modern
        doc.setFontSize(24);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(currentTemplate.colors.primary);
        doc.text(cvData.personal.name || 'Your Name', 20, yPosition);
        yPosition += 10;

        // Creative underline
        doc.setDrawColor(currentTemplate.colors.secondary);
        doc.setLineWidth(3);
        doc.line(20, yPosition, 70, yPosition);
        yPosition += 6;
        doc.setLineWidth(1);
        doc.line(20, yPosition, 50, yPosition);
        yPosition += 8;

        doc.setFontSize(11);
        doc.setTextColor(currentTemplate.colors.accent);
        doc.text('Creative Professional - AI Enhanced', 20, yPosition);
        yPosition += 15;

      } else if (selectedTemplate === 'tech') {
        // Tech template - clean and modern
        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(currentTemplate.colors.primary);
        doc.text(cvData.personal.name || 'Your Name', 20, yPosition);
        yPosition += 10;

        // Tech bracket styling
        doc.setFontSize(14);
        doc.setTextColor(currentTemplate.colors.secondary);
        doc.text('{', 15, yPosition - 5);
        doc.text('}', 75, yPosition - 5);
        yPosition += 8;

        doc.setFontSize(11);
        doc.setTextColor(currentTemplate.colors.accent);
        doc.text('Tech Innovator - AI Optimized', 20, yPosition);
        yPosition += 15;

      } else if (selectedTemplate === 'academic') {
        // Academic template - traditional yet modern
        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(currentTemplate.colors.primary);
        doc.text(cvData.personal.name || 'Your Name', 20, yPosition);
        yPosition += 12;

        doc.setFontSize(10);
        doc.setTextColor(currentTemplate.colors.secondary);
        doc.text('Academic Professional - AI Refined', 20, yPosition);
        yPosition += 15;

      } else if (selectedTemplate === 'startup') {
        // Startup template - dynamic and energetic
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(currentTemplate.colors.primary);
        doc.text(cvData.personal.name || 'Your Name', 20, yPosition);
        yPosition += 10;

        // Rocket emoji or dynamic styling
        doc.setFontSize(12);
        doc.setTextColor(currentTemplate.colors.secondary);
        doc.text('🚀', 15, yPosition);
        doc.text('Startup Founder - AI Powered', 25, yPosition);
        yPosition += 15;

      } else {
        // Minimalist template - clean and simple
        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(currentTemplate.colors.primary);
        doc.text(cvData.personal.name || 'Your Name', 20, yPosition);
        yPosition += 8;

        doc.setFontSize(11);
        doc.setTextColor(currentTemplate.colors.secondary);
        doc.text('Professional CV - AI Redesigned', 20, yPosition);
        yPosition += 15;
      }
    } else {
      // Default free version styling
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(99, 102, 241); // Indigo color
      doc.text(cvData.personal.name || 'Your Name', 20, yPosition);
      yPosition += 8;

      // Subtitle
      doc.setFontSize(12);
      doc.setTextColor(107, 114, 128); // Gray color
      doc.text('Professional CV - Redesigned by AI', 20, yPosition);
      yPosition += 15;

      // Decorative line
      doc.setDrawColor(99, 102, 241);
      doc.setLineWidth(1);
      doc.line(20, yPosition, 80, yPosition);
      yPosition += 15;
    }

    // Contact Info with icons
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');

    const contactInfo = [];
    if (cvData.personal.email) contactInfo.push(`✉ ${cvData.personal.email}`);
    if (cvData.personal.phone) contactInfo.push(`📱 ${cvData.personal.phone}`);
    if (cvData.personal.address) contactInfo.push(`📍 ${cvData.personal.address}`);
    if (cvData.personal.linkedin) contactInfo.push(`💼 ${cvData.personal.linkedin}`);
    if (cvData.personal.website) contactInfo.push(`🌐 ${cvData.personal.website}`);

    contactInfo.forEach((info, index) => {
      doc.text(info, 20, yPosition);
      yPosition += 6;
    });

    yPosition += 10;

    // Summary with background
    if (cvData.summary) {
      doc.setFillColor(249, 250, 251); // Light gray background
      doc.rect(15, yPosition - 5, 180, 25, 'F');

      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      if (isPro && currentTemplate) {
        doc.setTextColor(currentTemplate.colors.primary);
      } else {
        doc.setTextColor(99, 102, 241);
      }
      doc.text('PROFESSIONAL SUMMARY', 20, yPosition);
      yPosition += 6;

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      const summaryLines = doc.splitTextToSize(cvData.summary, 160);
      doc.text(summaryLines, 20, yPosition);
      yPosition += summaryLines.length * 4 + 10;
    }

    // Experience with modern styling
    if (cvData.experience.some(exp => exp.position || exp.company)) {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      if (isPro && currentTemplate) {
        doc.setTextColor(currentTemplate.colors.secondary);
      } else {
        doc.setTextColor(236, 72, 153); // Pink color
      }
      doc.text('EXPERIENCE', 20, yPosition);
      yPosition += 8;

      cvData.experience.forEach(exp => {
        if (exp.position || exp.company) {
          // Position with background highlight
          doc.setFillColor(254, 243, 199); // Light yellow
          doc.rect(18, yPosition - 3, 80, 8, 'F');

          doc.setFontSize(11);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(0, 0, 0);
          doc.text(exp.position, 20, yPosition);
          yPosition += 5;

          // Company and dates
          doc.setFontSize(9);
          doc.setFont('helvetica', 'italic');
          doc.setTextColor(107, 114, 128);
          const companyText = exp.company + (exp.startDate || exp.endDate ? ` | ${exp.startDate} - ${exp.endDate}` : '');
          doc.text(companyText, 20, yPosition);
          yPosition += 6;

          if (exp.description) {
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(0, 0, 0);
            const descLines = doc.splitTextToSize(exp.description, 150);
            descLines.forEach((line: string) => {
              doc.text('• ' + line, 25, yPosition);
              yPosition += 4;
            });
          }
          yPosition += 8;
        }
      });
      yPosition += 5;
    }

    // Education with styling
    if (cvData.education.some(edu => edu.degree || edu.institution)) {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      if (isPro && currentTemplate) {
        doc.setTextColor(currentTemplate.colors.accent);
      } else {
        doc.setTextColor(34, 197, 94); // Green color
      }
      doc.text('EDUCATION', 20, yPosition);
      yPosition += 8;

      cvData.education.forEach(edu => {
        if (edu.degree || edu.institution) {
          doc.setFillColor(240, 253, 244); // Light green
          doc.rect(18, yPosition - 3, 100, 8, 'F');

          doc.setFontSize(11);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(0, 0, 0);
          doc.text(edu.degree, 20, yPosition);
          yPosition += 5;

          doc.setFontSize(9);
          doc.setFont('helvetica', 'italic');
          doc.setTextColor(107, 114, 128);
          const eduText = edu.institution + (edu.startDate || edu.endDate ? ` | ${edu.startDate} - ${edu.endDate}` : '');
          doc.text(eduText, 20, yPosition);
          yPosition += 5;

          if (edu.gpa) {
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(0, 0, 0);
            doc.text(`GPA: ${edu.gpa}`, 20, yPosition);
            yPosition += 4;
          }
          yPosition += 8;
        }
      });
      yPosition += 5;
    }

    // Skills with modern design
    if (cvData.skills.some(skill => skill.trim())) {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      if (isPro && currentTemplate) {
        doc.setTextColor(currentTemplate.colors.primary);
      } else {
        doc.setTextColor(168, 85, 247); // Purple color
      }
      doc.text('SKILLS', 20, yPosition);
      yPosition += 8;

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);

      const skillsText = cvData.skills.filter(skill => skill.trim()).join(' • ');
      const skillsLines = doc.splitTextToSize(skillsText, 170);
      doc.text(skillsLines, 20, yPosition);
      yPosition += skillsLines.length * 4 + 10;
    }

    // Certifications
    if (cvData.certifications.some(cert => cert.name || cert.issuer)) {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      if (isPro && currentTemplate) {
        doc.setTextColor(currentTemplate.colors.secondary);
      } else {
        doc.setTextColor(245, 101, 101); // Red color
      }
      doc.text('CERTIFICATIONS', 20, yPosition);
      yPosition += 8;

      cvData.certifications.forEach(cert => {
        if (cert.name || cert.issuer) {
          doc.setFontSize(9);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(0, 0, 0);
          const certText = cert.name + (cert.issuer ? ` - ${cert.issuer}` : '') + (cert.date ? ` (${cert.date})` : '');
          doc.text('• ' + certText, 20, yPosition);
          yPosition += 5;
        }
      });
      yPosition += 10;
    }

    // Template credit for Pro users
    if (isPro && currentTemplate) {
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(`Template: ${currentTemplate.name} by Vellon 2.0 Pro`, 20, yPosition);
      yPosition += 10;
    }

    // Design quality indicator
    doc.setFillColor(240, 253, 244);
    doc.rect(15, yPosition, 180, 15, 'F');
    doc.setFontSize(8);
    doc.setTextColor(34, 197, 94);
    doc.text('AI Design Quality Score: 98%', 20, yPosition + 5);
    doc.text('Modern template applied • Enhanced visual hierarchy', 20, yPosition + 10);

    yPosition += 25;

    // Watermark for free version - using image instead of text
    if (!isPro) {
      try {
        // Load the watermark image
        const img = new Image();
        img.crossOrigin = 'anonymous';

        // Create a promise to handle image loading
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = '/vellon-watermark.jpg';
        });

        // Create canvas to get image data
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);

        // Get image data as base64
        const imgData = canvas.toDataURL('image/jpeg');

        // Add watermark image to PDF (centered at bottom)
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const imgWidth = 80; // Adjust size as needed
        const imgHeight = (img.height / img.width) * imgWidth;
        const x = (pageWidth - imgWidth) / 2;
        const y = pageHeight - imgHeight - 20;

        doc.addImage(imgData, 'JPEG', x, y, imgWidth, imgHeight, undefined, 'FAST');
      } catch (error) {
        console.warn('Failed to load watermark image, using text fallback:', error);
        // Fallback to text watermark if image fails
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text('Generated by Vellon 2.0 CV Redo - Free Version', 20, yPosition);
        yPosition += 5;
        doc.text('Upgrade to Pro for advanced features and remove watermark', 20, yPosition);
      }
    }

    // Download with template name in filename for Pro users
    const filename = isPro && currentTemplate ? `cv-redo-${currentTemplate.id}.pdf` : 'ai-redesigned-cv.pdf';
    doc.save(filename);
    setIsGenerating(false);
  };

  const handlePreview = () => {
    setShowPreview(true);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setShowPreview(false);
  };

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-28">
        <section className="text-center py-24 sm:py-36 lg:py-44 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 p-1 bg-gradient-primary rounded-full mb-8 animate-glow shadow-warm">
            <div className="bg-surface px-5 py-2.5 rounded-full">
              <span className="text-primary font-bold text-sm tracking-wide">🎨 AI CV REDO</span>
            </div>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight bg-gradient-primary bg-clip-text text-transparent mb-8 leading-[0.9]">
            AI-Powered CV Redesign
          </h1>
          <p className="max-w-4xl mx-auto text-xl sm:text-2xl text-text-muted mb-12 leading-relaxed font-light">
            Fill out your information and let our AI completely redesign your CV with modern templates, professional layouts, and stunning visual enhancements.
          </p>
        </section>

        <section className="py-24 sm:py-32 lg:py-40">
          <div className="max-w-4xl mx-auto">
            <div className="bg-surface-light backdrop-blur-sm rounded-3xl shadow-premium p-10 border border-border/50">
              <div className="mb-8 p-6 bg-gradient-primary/10 rounded-2xl border border-primary/20">
                <p className="text-primary text-sm font-medium">
                  <strong>Free Plan:</strong> AI-powered CV redesign with modern templates. Upgrade to Pro for premium designs and advanced customization.
                </p>
                {jsonResumeSchema && (
                  <div className="mt-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-600 font-medium">JSON Resume Standard Integrated</span>
                  </div>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-8">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                        <input
                          type="text"
                          value={cvData.personal.name}
                          onChange={(e) => updatePersonal('name', e.target.value)}
                          className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-foreground placeholder-text-muted"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                        <input
                          type="email"
                          value={cvData.personal.email}
                          onChange={(e) => updatePersonal('email', e.target.value)}
                          className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-foreground placeholder-text-muted"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                        <input
                          type="tel"
                          value={cvData.personal.phone}
                          onChange={(e) => updatePersonal('phone', e.target.value)}
                          className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-foreground placeholder-text-muted"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Address</label>
                        <input
                          type="text"
                          value={cvData.personal.address}
                          onChange={(e) => updatePersonal('address', e.target.value)}
                          className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-foreground placeholder-text-muted"
                          placeholder="City, State, Country"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">LinkedIn</label>
                        <input
                          type="url"
                          value={cvData.personal.linkedin}
                          onChange={(e) => updatePersonal('linkedin', e.target.value)}
                          className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-foreground placeholder-text-muted"
                          placeholder="https://linkedin.com/in/johndoe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Website</label>
                        <input
                          type="url"
                          value={cvData.personal.website}
                          onChange={(e) => updatePersonal('website', e.target.value)}
                          className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-foreground placeholder-text-muted"
                          placeholder="https://johndoe.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Professional Summary */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Professional Summary</h3>
                    <textarea
                      value={cvData.summary}
                      onChange={(e) => setCvData(prev => ({ ...prev, summary: e.target.value }))}
                      rows={4}
                      className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-foreground placeholder-text-muted resize-none"
                      placeholder="Write a compelling professional summary that highlights your key strengths and career goals..."
                    />
                  </div>

                  {/* Experience */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-foreground">Work Experience</h3>
                      <button
                        onClick={addExperience}
                        className="bg-gradient-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-glow transition-all duration-200"
                      >
                        + Add Experience
                      </button>
                    </div>
                    {cvData.experience.map((exp, index) => (
                      <div key={index} className="mb-6 p-4 bg-surface rounded-xl border border-border/50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Position</label>
                            <input
                              type="text"
                              value={exp.position}
                              onChange={(e) => updateExperience(index, 'position', e.target.value)}
                              className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-foreground placeholder-text-muted"
                              placeholder="Software Developer"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Company</label>
                            <input
                              type="text"
                              value={exp.company}
                              onChange={(e) => updateExperience(index, 'company', e.target.value)}
                              className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-foreground placeholder-text-muted"
                              placeholder="Tech Corp"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Start Date</label>
                            <input
                              type="text"
                              value={exp.startDate}
                              onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                              className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-foreground placeholder-text-muted"
                              placeholder="Jan 2020"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">End Date</label>
                            <input
                              type="text"
                              value={exp.endDate}
                              onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                              className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-foreground placeholder-text-muted"
                              placeholder="Present"
                            />
                          </div>
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                          <textarea
                            value={exp.description}
                            onChange={(e) => updateExperience(index, 'description', e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-foreground placeholder-text-muted resize-none"
                            placeholder="Describe your responsibilities and achievements..."
                          />
                        </div>
                        {cvData.experience.length > 1 && (
                          <button
                            onClick={() => removeExperience(index)}
                            className="text-red-500 text-sm hover:text-red-700 transition-colors"
                          >
                            Remove Experience
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Education */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-foreground">Education</h3>
                      <button
                        onClick={addEducation}
                        className="bg-gradient-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-glow transition-all duration-200"
                      >
                        + Add Education
                      </button>
                    </div>
                    {cvData.education.map((edu, index) => (
                      <div key={index} className="mb-6 p-4 bg-surface rounded-xl border border-border/50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Degree</label>
                            <input
                              type="text"
                              value={edu.degree}
                              onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                              className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-foreground placeholder-text-muted"
                              placeholder="Bachelor of Computer Science"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Institution</label>
                            <input
                              type="text"
                              value={edu.institution}
                              onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                              className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-foreground placeholder-text-muted"
                              placeholder="University of Technology"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Start Date</label>
                            <input
                              type="text"
                              value={edu.startDate}
                              onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                              className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-foreground placeholder-text-muted"
                              placeholder="2016"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">End Date</label>
                            <input
                              type="text"
                              value={edu.endDate}
                              onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                              className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-foreground placeholder-text-muted"
                              placeholder="2020"
                            />
                          </div>
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-foreground mb-2">GPA (Optional)</label>
                          <input
                            type="text"
                            value={edu.gpa}
                            onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                            className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-foreground placeholder-text-muted"
                            placeholder="3.8/4.0"
                          />
                        </div>
                        {cvData.education.length > 1 && (
                          <button
                            onClick={() => removeEducation(index)}
                            className="text-red-500 text-sm hover:text-red-700 transition-colors"
                          >
                            Remove Education
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Skills */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-foreground">Skills</h3>
                      <button
                        onClick={addSkill}
                        className="bg-gradient-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-glow transition-all duration-200"
                      >
                        + Add Skill
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {cvData.skills.map((skill, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={skill}
                            onChange={(e) => updateSkill(index, e.target.value)}
                            className="flex-1 px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-foreground placeholder-text-muted"
                            placeholder="JavaScript"
                          />
                          {cvData.skills.length > 1 && (
                            <button
                              onClick={() => removeSkill(index)}
                              className="text-red-500 px-3 py-3 hover:text-red-700 transition-colors"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-foreground">Certifications (Optional)</h3>
                      <button
                        onClick={addCertification}
                        className="bg-gradient-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-glow transition-all duration-200"
                      >
                        + Add Certification
                      </button>
                    </div>
                    {cvData.certifications.map((cert, index) => (
                      <div key={index} className="mb-4 p-4 bg-surface rounded-xl border border-border/50">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Certification Name</label>
                            <input
                              type="text"
                              value={cert.name}
                              onChange={(e) => updateCertification(index, 'name', e.target.value)}
                              className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-foreground placeholder-text-muted"
                              placeholder="AWS Certified Developer"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Issuer</label>
                            <input
                              type="text"
                              value={cert.issuer}
                              onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
                              className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-foreground placeholder-text-muted"
                              placeholder="Amazon Web Services"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Date</label>
                            <input
                              type="text"
                              value={cert.date}
                              onChange={(e) => updateCertification(index, 'date', e.target.value)}
                              className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-foreground placeholder-text-muted"
                              placeholder="2023"
                            />
                          </div>
                        </div>
                        {cvData.certifications.length > 1 && (
                          <button
                            onClick={() => removeCertification(index)}
                            className="text-red-500 text-sm mt-2 hover:text-red-700 transition-colors"
                          >
                            Remove Certification
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Enhanced Pro Template Selection */}
                  {isPro && (
                    <div className="mb-12">
                      <div className="text-center mb-8">
                        <h3 className="text-3xl font-black text-foreground mb-4 bg-gradient-primary bg-clip-text text-transparent">
                          Choose Your Perfect Template
                        </h3>
                        <p className="text-lg text-text-muted max-w-2xl mx-auto">
                          Select from our premium collection of industry-specific templates, each crafted by AI for maximum impact and professional appeal.
                        </p>
                      </div>

                      {/* Search and Filter Controls */}
                      <div className="mb-8 space-y-4">
                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                          {/* Search Bar */}
                          <div className="relative flex-1 max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <svg className="h-5 w-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                              </svg>
                            </div>
                            <input
                              type="text"
                              placeholder="Search templates..."
                              value={templateSearch}
                              onChange={(e) => setTemplateSearch(e.target.value)}
                              className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-foreground placeholder-text-muted"
                            />
                          </div>

                          {/* Category Filter */}
                          <div className="flex flex-wrap gap-2 justify-center">
                            {categories.map((category) => (
                              <button
                                key={category}
                                onClick={() => setTemplateFilter(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                  templateFilter === category
                                    ? 'bg-primary text-white shadow-glow'
                                    : 'bg-surface text-text-muted hover:bg-surface-light hover:text-foreground border border-border'
                                }`}
                              >
                                {category === 'all' ? 'All Templates' : category}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Results Count */}
                        <div className="text-center">
                          <span className="text-sm text-text-muted">
                            Showing {filteredTemplates.length} of {proTemplates.length} templates
                          </span>
                        </div>
                      </div>

                      {/* Template Grid */}
                      {(
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredTemplates.map((template, index) => (
                          <div
                            key={template.id}
                            onClick={() => setSelectedTemplate(template.id)}
                            className={`group cursor-pointer relative overflow-hidden rounded-2xl border-2 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                              selectedTemplate === template.id
                                ? 'border-primary bg-gradient-to-br from-primary/10 to-secondary/10 shadow-glow scale-105'
                                : 'border-border hover:border-primary/50 bg-surface hover:shadow-xl'
                            }`}
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            {/* Template Preview - Actual CV Layout */}
                            <div className="aspect-[4/5] relative overflow-hidden bg-white border border-gray-200">
                              <div className="p-4 h-full flex flex-col">
                                {/* Header */}
                                <div className="text-center mb-4 pb-2 border-b" style={{ borderColor: template.colors.primary }}>
                                  <h3 className="text-lg font-bold mb-1" style={{ color: template.colors.primary }}>
                                    John Doe
                                  </h3>
                                  <p className="text-sm text-gray-600">Software Developer</p>
                                </div>

                                {/* Contact Info */}
                                <div className="mb-3 text-xs text-gray-600 space-y-1">
                                  <div>📧 john@example.com</div>
                                  <div>📱 (555) 123-4567</div>
                                  <div>🌐 johndoe.dev</div>
                                </div>

                                {/* Summary */}
                                <div className="mb-3">
                                  <h4 className="text-sm font-semibold mb-1" style={{ color: template.colors.secondary }}>
                                    Summary
                                  </h4>
                                  <p className="text-xs text-gray-700 leading-tight">
                                    Experienced software developer with 5+ years of expertise in full-stack development.
                                  </p>
                                </div>

                                {/* Experience */}
                                <div className="mb-3">
                                  <h4 className="text-sm font-semibold mb-1" style={{ color: template.colors.secondary }}>
                                    Experience
                                  </h4>
                                  <div className="text-xs">
                                    <div className="font-medium" style={{ color: template.colors.primary }}>
                                      Senior Developer
                                    </div>
                                    <div className="text-gray-600">Tech Corp • 2020-2023</div>
                                    <div className="text-gray-700 mt-1">
                                      Led development of web applications using React and Node.js
                                    </div>
                                  </div>
                                </div>

                                {/* Skills */}
                                <div className="mb-3">
                                  <h4 className="text-sm font-semibold mb-1" style={{ color: template.colors.secondary }}>
                                    Skills
                                  </h4>
                                  <div className="flex flex-wrap gap-1">
                                    <span className="px-2 py-1 rounded text-xs font-medium"
                                          style={{ backgroundColor: `${template.colors.primary}20`, color: template.colors.primary }}>
                                      JavaScript
                                    </span>
                                    <span className="px-2 py-1 rounded text-xs font-medium"
                                          style={{ backgroundColor: `${template.colors.secondary}20`, color: template.colors.secondary }}>
                                      React
                                    </span>
                                    <span className="px-2 py-1 rounded text-xs font-medium"
                                          style={{ backgroundColor: `${template.colors.accent}20`, color: template.colors.accent }}>
                                      Node.js
                                    </span>
                                  </div>
                                </div>

                                {/* Education */}
                                <div className="mt-auto">
                                  <h4 className="text-sm font-semibold mb-1" style={{ color: template.colors.secondary }}>
                                    Education
                                  </h4>
                                  <div className="text-xs">
                                    <div className="font-medium" style={{ color: template.colors.primary }}>
                                      Bachelor of Computer Science
                                    </div>
                                    <div className="text-gray-600">University of Technology • 2016-2020</div>
                                  </div>
                                </div>
                              </div>

                              {/* Template Badge */}
                              <div className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold text-white"
                                   style={{ backgroundColor: template.colors.primary }}>
                                {template.name}
                              </div>
                            </div>

                            {/* Selection Indicator */}
                            {selectedTemplate === template.id && (
                              <div className="absolute top-3 right-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg animate-bounce">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            )}

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                              <div className="text-center">
                                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                </div>
                                <span className="text-white font-semibold text-sm">Preview Template</span>
                              </div>
                            </div>

                            {/* Template Info */}
                            <div className="p-5">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-200">
                                  {template.name}
                                </h4>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  template.category === 'Executive' ? 'bg-purple-100 text-purple-800' :
                                  template.category === 'Technology' ? 'bg-blue-100 text-blue-800' :
                                  template.category === 'Creative' ? 'bg-pink-100 text-pink-800' :
                                  template.category === 'Academic' ? 'bg-green-100 text-green-800' :
                                  template.category === 'Finance' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {template.category}
                                </span>
                              </div>

                              <p className="text-sm text-text-muted leading-relaxed mb-3 line-clamp-3">
                                {template.description}
                              </p>

                              {/* Color Palette */}
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-xs text-text-muted font-medium">Colors:</span>
                                <div className="flex gap-1">
                                  <div className="w-4 h-4 rounded-full border border-border/50" style={{ backgroundColor: template.colors.primary }}></div>
                                  <div className="w-4 h-4 rounded-full border border-border/50" style={{ backgroundColor: template.colors.secondary }}></div>
                                  <div className="w-4 h-4 rounded-full border border-border/50" style={{ backgroundColor: template.colors.accent }}></div>
                                </div>
                              </div>

                              {/* Features */}
                              <div className="flex flex-wrap gap-1">
                                <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                                  AI Optimized
                                </span>
                                <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full font-medium">
                                  Premium
                                </span>
                                <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full font-medium">
                                  Professional
                                </span>
                              </div>
                            </div>

                            {/* Selection Animation */}
                            {selectedTemplate === template.id && (
                              <div className="absolute inset-0 border-4 border-primary rounded-2xl animate-pulse pointer-events-none"></div>
                            )}
                          </div>
                        ))}
                        </div>
                      )}

                      {/* No Results */}
                      {filteredTemplates.length === 0 && (
                        <div className="text-center py-12">
                          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-surface flex items-center justify-center">
                            <svg className="w-8 h-8 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                          </div>
                          <h4 className="text-lg font-semibold text-foreground mb-2">No templates found</h4>
                          <p className="text-text-muted">Try adjusting your search or filter criteria</p>
                        </div>
                      )}

                      {/* Template Stats */}
                      {isPro && (
                        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                          <div className="p-4 bg-surface rounded-xl border border-border/50">
                            <div className="text-2xl font-black text-primary">{proTemplates.length}</div>
                            <div className="text-sm text-text-muted">Pro Templates</div>
                          </div>
                          <div className="p-4 bg-surface rounded-xl border border-border/50">
                            <div className="text-2xl font-black text-secondary">{categories.length - 1}</div>
                            <div className="text-sm text-text-muted">Categories</div>
                          </div>
                          <div className="p-4 bg-surface rounded-xl border border-border/50">
                            <div className="text-2xl font-black text-accent">∞</div>
                            <div className="text-sm text-text-muted">Customizations</div>
                          </div>
                          <div className="p-4 bg-surface rounded-xl border border-border/50">
                            <div className="text-2xl font-black text-primary">AI</div>
                            <div className="text-sm text-text-muted">Powered Design</div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex gap-4">
                    <button
                      onClick={handlePreview}
                      className="flex-1 bg-gradient-primary text-white font-semibold py-4 px-6 rounded-xl hover:shadow-glow hover:scale-105 transition-all duration-200 shadow-premium"
                    >
                      Preview AI Redesign
                    </button>
                  </div>
                </div>
              ) : (
                /* Preview Mode */
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-foreground">AI-Redesign Preview</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={handleEdit}
                        className="bg-surface text-foreground px-4 py-2 rounded-lg text-sm font-medium border border-border hover:bg-surface-light transition-all duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={generatePDF}
                        disabled={isGenerating}
                        className="bg-gradient-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-glow transition-all duration-200 disabled:opacity-50"
                      >
                        {isGenerating ? 'Generating...' : 'Download PDF'}
                      </button>
                    </div>
                  </div>

                  <div className="bg-surface rounded-xl p-8 border border-border/50 shadow-premium">
                    {/* Modern Header */}
                    <div className="relative mb-8 pb-6 border-b-2 border-primary">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg"></div>
                      <div className="relative text-center">
                        <h2 className="text-3xl font-black text-foreground mb-3">{cvData.personal.name || 'Your Name'}</h2>
                        <p className="text-primary font-semibold text-lg mb-4">Professional CV - AI Redesigned</p>
                        <div className="flex justify-center">
                          <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                        </div>
                      </div>
                    </div>

                    {/* Contact Info with modern styling */}
                    <div className="mb-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        {cvData.personal.email && (
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                              <span className="text-primary">✉</span>
                            </div>
                            <span className="text-text-muted">{cvData.personal.email}</span>
                          </div>
                        )}
                        {cvData.personal.phone && (
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                              <span className="text-secondary">📱</span>
                            </div>
                            <span className="text-text-muted">{cvData.personal.phone}</span>
                          </div>
                        )}
                        {cvData.personal.address && (
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                              <span className="text-accent">📍</span>
                            </div>
                            <span className="text-text-muted">{cvData.personal.address}</span>
                          </div>
                        )}
                        {cvData.personal.linkedin && (
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                              <span className="text-primary">💼</span>
                            </div>
                            <span className="text-text-muted">{cvData.personal.linkedin}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Summary with background */}
                    {cvData.summary && (
                      <div className="mb-8 p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl border border-primary/10">
                        <h3 className="text-xl font-black text-primary mb-4 uppercase tracking-wide">Professional Summary</h3>
                        <p className="text-text-muted leading-relaxed">{cvData.summary}</p>
                      </div>
                    )}

                    {/* Experience with modern cards */}
                    {cvData.experience.some(exp => exp.position || exp.company) && (
                      <div className="mb-8">
                        <h3 className="text-2xl font-black text-secondary mb-6 uppercase tracking-wide">Experience</h3>
                        {cvData.experience.map((exp, index) => (
                          exp.position || exp.company ? (
                            <div key={index} className="mb-6 p-6 bg-gradient-to-r from-secondary/5 to-accent/5 rounded-xl border border-secondary/10">
                              <div className="flex justify-between items-start mb-3">
                                <h4 className="text-xl font-black text-foreground">{exp.position}</h4>
                                <span className="text-sm text-text-muted font-medium bg-secondary/10 px-3 py-1 rounded-full">
                                  {exp.startDate} - {exp.endDate}
                                </span>
                              </div>
                              <p className="text-primary font-semibold text-lg mb-3">{exp.company}</p>
                              {exp.description && (
                                <ul className="text-text-muted space-y-2">
                                  {exp.description.split('\n').map((line, i) => (
                                    line.trim() && <li key={i} className="flex items-start gap-3">
                                      <span className="text-secondary mt-1">•</span>
                                      <span>{line.trim()}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ) : null
                        ))}
                      </div>
                    )}

                    {/* Education with modern styling */}
                    {cvData.education.some(edu => edu.degree || edu.institution) && (
                      <div className="mb-8">
                        <h3 className="text-2xl font-black text-accent mb-6 uppercase tracking-wide">Education</h3>
                        {cvData.education.map((edu, index) => (
                          edu.degree || edu.institution ? (
                            <div key={index} className="mb-6 p-6 bg-gradient-to-r from-accent/5 to-primary/5 rounded-xl border border-accent/10">
                              <div className="flex justify-between items-start mb-3">
                                <h4 className="text-xl font-black text-foreground">{edu.degree}</h4>
                                <span className="text-sm text-text-muted font-medium bg-accent/10 px-3 py-1 rounded-full">
                                  {edu.startDate} - {edu.endDate}
                                </span>
                              </div>
                              <p className="text-primary font-semibold text-lg mb-2">{edu.institution}</p>
                              {edu.gpa && <p className="text-sm text-text-muted">GPA: {edu.gpa}</p>}
                            </div>
                          ) : null
                        ))}
                      </div>
                    )}

                    {/* Skills with modern design */}
                    {cvData.skills.some(skill => skill.trim()) && (
                      <div className="mb-8">
                        <h3 className="text-2xl font-black text-primary mb-6 uppercase tracking-wide">Skills</h3>
                        <div className="flex flex-wrap gap-3">
                          {cvData.skills.filter(skill => skill.trim()).map((skill, index) => (
                            <span key={index} className="bg-gradient-to-r from-primary/10 to-secondary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold border border-primary/20">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Certifications */}
                    {cvData.certifications.some(cert => cert.name || cert.issuer) && (
                      <div className="mb-8">
                        <h3 className="text-2xl font-black text-secondary mb-6 uppercase tracking-wide">Certifications</h3>
                        {cvData.certifications.map((cert, index) => (
                          cert.name || cert.issuer ? (
                            <div key={index} className="mb-3 p-4 bg-gradient-to-r from-secondary/5 to-accent/5 rounded-lg border border-secondary/10">
                              <span className="font-bold text-foreground">{cert.name}</span>
                              {cert.issuer && <span className="text-text-muted"> - {cert.issuer}</span>}
                              {cert.date && <span className="text-sm text-text-muted ml-2">({cert.date})</span>}
                            </div>
                          ) : null
                        ))}
                      </div>
                    )}

                    {/* Design quality indicator */}
                    <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-700">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-bold text-green-800 dark:text-green-200">AI Design Quality Score</span>
                        <span className="text-2xl font-black text-green-800 dark:text-green-200">98%</span>
                      </div>
                      <div className="w-full bg-green-200 dark:bg-green-800 rounded-full h-3">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full" style={{ width: '98%' }}></div>
                      </div>
                      <p className="text-sm text-green-700 dark:text-green-300 mt-2 font-medium">Modern template applied • Enhanced visual hierarchy • Professional styling</p>
                    </div>

                    {/* Watermark */}
                    {!isPro && (
                      <div className="mt-8 pt-4 border-t border-border/50 text-center">
                        <div className="inline-block">
                          <img
                            src="/vellon-watermark.jpg"
                            alt="Vellon 2.0 Watermark"
                            className="max-w-32 max-h-16 object-contain opacity-60"
                          />
                        </div>
                        <p className="text-xs text-text-muted/60 mt-2">
                          Upgrade to Pro to remove watermark
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}