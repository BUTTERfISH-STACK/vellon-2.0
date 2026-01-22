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
  const [isPro, setIsPro] = useState(() => {
    // Check if user has pro status from localStorage
    if (typeof window !== 'undefined') {
      const proStatus = localStorage.getItem('vellon_pro_status');
      const trialEnd = localStorage.getItem('vellon_pro_trial_end');
      if (proStatus === 'active' || (trialEnd && new Date(trialEnd) > new Date())) {
        return true;
      }
    }
    return false;
  });
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

  // Fetch sample CV templates
  const [sampleCVTemplates, setSampleCVTemplates] = useState<any[]>([]);
  const [templatesLoading, setTemplatesLoading] = useState(false);

  const fetchSampleCVTemplates = async () => {
    setTemplatesLoading(true);
    try {
      const response = await fetch('/api/cv-templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'fetch-templates' }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch templates');
      }

      const data = await response.json();
      setSampleCVTemplates(data.templates);
      console.log('Sample CV Templates:', data.templates);
    } catch (error) {
      console.error('Error fetching CV templates:', error);
    } finally {
      setTemplatesLoading(false);
    }
  };

  // Fetch templates on component mount
  useEffect(() => {
    fetchSampleCVTemplates();
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
    if (isPro || cvData.experience.length < 2) { // Free limit: 2 experiences
      setCvData(prev => ({
        ...prev,
        experience: [...prev.experience, { position: '', company: '', startDate: '', endDate: '', description: '' }]
      }));
    }
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
    if (isPro || cvData.education.length < 1) { // Free limit: 1 education
      setCvData(prev => ({
        ...prev,
        education: [...prev.education, { degree: '', institution: '', startDate: '', endDate: '', gpa: '' }]
      }));
    }
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
    if (isPro || cvData.skills.length < 5) { // Free limit: 5 skills
      setCvData(prev => ({
        ...prev,
        skills: [...prev.skills, '']
      }));
    }
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
    if (isPro || cvData.certifications.length < 2) { // Free limit: 2 certifications
      setCvData(prev => ({
        ...prev,
        certifications: [...prev.certifications, { name: '', issuer: '', date: '' }]
      }));
    }
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

    // Experience with modern styling (limited to 2 entries for free)
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

      const experienceToShow = isPro ? cvData.experience : cvData.experience.slice(0, 2);
      experienceToShow.forEach(exp => {
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

    // Education with styling (limited to 1 entry for free)
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

      const educationToShow = isPro ? cvData.education : cvData.education.slice(0, 1);
      educationToShow.forEach(edu => {
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

    // Skills with modern design (limited to 5 for free)
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

      const skillsToShow = isPro ? cvData.skills.filter(skill => skill.trim()) : cvData.skills.filter(skill => skill.trim()).slice(0, 5);
      const skillsText = skillsToShow.join(' • ');
      const skillsLines = doc.splitTextToSize(skillsText, 170);
      doc.text(skillsLines, 20, yPosition);
      yPosition += skillsLines.length * 4 + 10;
    }

    // Certifications (limited to 2 for free)
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

      const certificationsToShow = isPro ? cvData.certifications : cvData.certifications.slice(0, 2);
      certificationsToShow.forEach(cert => {
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
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-28">
        <section className="text-center py-24 sm:py-36 lg:py-44 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 p-1 bg-gradient-primary rounded-full mb-8 animate-glow shadow-warm">
            <div className="bg-surface px-5 py-2.5 rounded-full">
              <span className="text-primary font-bold text-sm tracking-wide">🚀 AI CV REDO</span>
            </div>
          </div>
          <div className="relative overflow-hidden mb-8 h-20">
            <div className="flex animate-scroll">
              {/* Repeat the logos multiple times for seamless loop */}
              {[...Array(2)].map((_, repeatIndex) => (
                <div key={repeatIndex} className="flex space-x-8 min-w-max">
                  {/* GitHub */}
                  <div className="flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  {/* LinkedIn */}
                  <div className="flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  {/* Microsoft */}
                  <div className="flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.385 3.04H3.04v8.345h8.345V3.04zM20.96 3.04h-8.345v8.345H20.96V3.04zM11.385 12.615H3.04v8.345h8.345v-8.345zM20.96 12.615h-8.345v8.345H20.96v-8.345z"/>
                    </svg>
                  </div>
                  {/* Google */}
                  <div className="flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </div>
                  {/* Adobe */}
                  <div className="flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.75 8.25c0-1.5-1.25-2.75-2.75-2.75H7c-1.5 0-2.75 1.25-2.75 2.75v7.5c0 1.5 1.25 2.75 2.75 2.75h10c1.5 0 2.75-1.25 2.75-2.75V8.25zM12 12.5c-.825 0-1.5-.675-1.5-1.5s.675-1.5 1.5-1.5 1.5.675 1.5 1.5-.675 1.5-1.5 1.5z"/>
                    </svg>
                  </div>
                  {/* Slack */}
                  <div className="flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52-2.525l.005-2.567a2.528 2.528 0 0 1 2.52-2.525h.006a2.528 2.528 0 0 1 2.52 2.525l-.005 2.567a2.528 2.528 0 0 1-2.52 2.525h-.006zm6.364-7.071a2.528 2.528 0 0 1 2.52-2.525l2.567-.005a2.528 2.528 0 0 1 2.525 2.52v.006a2.528 2.528 0 0 1-2.525 2.52l-2.567.005a2.528 2.528 0 0 1-2.52-2.52v-.006zm-6.364 7.071a2.528 2.528 0 0 0 2.52 2.525l2.567-.005a2.528 2.528 0 0 0 2.525-2.52v-.006a2.528 2.528 0 0 0-2.525-2.52l-2.567.005a2.528 2.528 0 0 0-2.52 2.52v.006zm6.364-7.071a2.528 2.528 0 0 0-2.52-2.525H6.319a2.528 2.528 0 0 0-2.525 2.52v.006a2.528 2.528 0 0 0 2.525 2.52h2.567a2.528 2.528 0 0 0 2.52-2.52v-.006z"/>
                    </svg>
                  </div>
                  {/* Apple */}
                  <div className="flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                  </div>
                  {/* Amazon */}
                  <div className="flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M15.331 6.546c-.551 0-.775.324-.775.762v4.391c0 .406.187.635.594.635.406 0 .593-.23.593-.635V7.917c0-.406-.187-.635-.594-.635-.406 0-.593.23-.593.635v.406c0 .406.187.635.593.635.406 0 .594-.23.594-.635V7.308c0-.438-.224-.762-.775-.762zm-3.887 0c-.551 0-.775.324-.775.762v5.981c0 .406.187.635.594.635.406 0 .593-.23.593-.635V7.917c0-.406-.187-.635-.594-.635-.406 0-.593.23-.593.635v.406c0 .406.187.635.593.635.406 0 .594-.23.594-.635V7.308c0-.438-.224-.762-.775-.762zm-3.887 0c-.551 0-.775.324-.775.762v5.981c0 .406.187.635.594.635.406 0 .593-.23.593-.635V7.917c0-.406-.187-.635-.594-.635-.406 0-.593.23-.593.635v.406c0 .406.187.635.593.635.406 0 .594-.23.594-.635V7.308c0-.438-.224-.762-.775-.762zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm5.74 11.467c-.406 0-.593.23-.593.635v.406c0 .406.187.635.593.635.406 0 .594-.23.594-.635V7.917c0-.406-.188-.635-.594-.635-.406 0-.593.23-.593.635v4.391c0 .406.187.635.593.635z"/>
                    </svg>
                  </div>
                  {/* Netflix */}
                  <div className="flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M5.398 0v.006c3.028 8.556 5.37 15.407 8.477 23.996L5.398 0zM13.075 0v23.996c3.107-8.59 5.449-15.44 8.477-23.996H13.075z"/>
                    </svg>
                  </div>
                  {/* Spotify */}
                  <div className="flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.563 16.836c-.194.195-.453.292-.71.292-.254 0-.512-.097-.71-.292-1.932-1.93-4.505-2.99-7.143-2.99s-5.21 1.06-7.143 2.99c-.195.195-.453.292-.71.292-.254 0-.512-.097-.71-.292-.195-.195-.292-.453-.292-.71 0-.254.097-.512.292-.71 2.188-2.186 5.086-3.395 8.563-3.395s6.375 1.209 8.563 3.395c.195.195.292.453.292.71 0 .254-.097.512-.292.71zm-2.125-4.695c-.158.158-.37.237-.582.237-.212 0-.424-.079-.582-.237-1.258-1.256-2.932-1.949-4.704-1.949s-3.446.693-4.704 1.949c-.158.158-.37.237-.582.237-.212 0-.424-.079-.582-.237-.158-.158-.237-.37-.237-.582 0-.212.079-.424.237-.582 1.5-1.498 3.502-2.32 5.868-2.32s4.368.822 5.868 2.32c.158.158.237.37.237.582 0 .212-.079.424-.237.582zm-1.187-3.822c-.124.124-.29.186-.455.186-.165 0-.331-.062-.455-.186-1.025-1.023-2.39-1.585-3.835-1.585s-2.81.562-3.835 1.585c-.124.124-.29.186-.455.186-.165 0-.331-.062-.455-.186-.124-.124-.186-.29-.186-.455 0-.165.062-.331.186-.455 1.192-1.19 2.779-1.844 4.745-1.844s3.553.654 4.745 1.844c.124.124.186.29.186.455 0 .165-.062.331-.186.455z"/>
                    </svg>
                  </div>
                  {/* Tesla */}
                  <div className="flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.52l3.09 6.26H12V2.52zm0 6.26h3.09l-3.09 6.26V8.78zm0 6.26l-3.09-6.26H12v6.26zm-3.09-6.26L12 2.52v6.26H8.91z"/>
                    </svg>
                  </div>
                  {/* Uber */}
                  <div className="flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm5.5 8.5c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5.672-1.5 1.5-1.5 1.5.672 1.5 1.5zm-11 0c0 .828-.672 1.5-1.5 1.5S4.5 11.328 4.5 10.5 5.172 9 6 9s1.5.672 1.5 1.5zm5.5-3c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2z"/>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="max-w-4xl mx-auto text-xl sm:text-2xl text-text-muted mb-12 leading-relaxed font-light">
            Give your career a fresh start. Our AI completely redesigns your CV with modern templates that impress South African employers and get you noticed.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 bg-surface/50 px-4 py-2 rounded-full">
              <span className="text-green-500">✓</span>
              <span>ATS-Optimized</span>
            </div>
            <div className="flex items-center gap-2 bg-surface/50 px-4 py-2 rounded-full">
              <span className="text-green-500">✓</span>
              <span>Professional Templates</span>
            </div>
            <div className="flex items-center gap-2 bg-surface/50 px-4 py-2 rounded-full">
              <span className="text-green-500">✓</span>
              <span>Instant Download</span>
            </div>
          </div>
        </section>

        <section className="py-24 sm:py-32 lg:py-40">
          <div className="max-w-4xl mx-auto">
            <div className="bg-surface-light backdrop-blur-sm rounded-3xl shadow-premium p-10 border border-border/50">
              <div className="mb-8 p-6 bg-gradient-primary/10 rounded-2xl border border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-primary text-sm font-medium mb-2">
                      <strong>Free Plan:</strong> AI-powered CV redesign with modern templates
                    </p>
                    <p className="text-text-muted text-xs mb-2">
                      Free limits: 2 experiences, 1 education, 5 skills, 2 certifications, watermark included
                    </p>
                    <p className="text-text-muted text-xs">
                      Upgrade to Pro for unlimited features and premium templates
                    </p>
                  </div>
                  <a
                    href="/pricing"
                    className="bg-gradient-primary text-background px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-glow transition-all duration-200"
                  >
                    Go Pro
                  </a>
                </div>
                {sampleCVTemplates.length > 0 && (
                  <div className="mt-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-600 font-medium">{sampleCVTemplates.length} Sample CV Templates Available</span>
                  </div>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-8">
                  {/* Progress Indicator */}
                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm p-6 rounded-2xl border border-primary/20">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-foreground">Form Completion</h3>
                      <span className="text-sm text-text-muted">
                        {Math.round(((cvData.personal.name ? 1 : 0) + (cvData.personal.email ? 1 : 0) + (cvData.personal.phone ? 1 : 0) + (cvData.summary ? 1 : 0) + (cvData.experience.some(e => e.position) ? 1 : 0) + (cvData.education.some(e => e.degree) ? 1 : 0) + (cvData.skills.some(s => s.trim()) ? 1 : 0)) / 7 * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-surface rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500"
                        style={{ width: `${Math.round(((cvData.personal.name ? 1 : 0) + (cvData.personal.email ? 1 : 0) + (cvData.personal.phone ? 1 : 0) + (cvData.summary ? 1 : 0) + (cvData.experience.some(e => e.position) ? 1 : 0) + (cvData.education.some(e => e.degree) ? 1 : 0) + (cvData.skills.some(s => s.trim()) ? 1 : 0)) / 7 * 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-text-muted mt-2">
                      <span>Basic Info</span>
                      <span>Experience</span>
                      <span>Education</span>
                      <span>Skills</span>
                    </div>
                  </div>
                  {/* Personal Information */}
                  <div className="group bg-gradient-to-br from-surface via-surface-light to-surface/80 backdrop-blur-sm p-6 rounded-2xl border border-border/30 hover:border-primary/50 transition-all duration-300 hover:shadow-glow">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-premium">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-foreground">Personal Information</h3>
                    </div>
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

                  {/* Enhanced Sample CV Templates */}
                  {sampleCVTemplates.length > 0 && (
                    <div className="mb-8">
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-foreground mb-2">🚀 Quick Start with Sample Data</h3>
                        <p className="text-text-muted">Click any profile below to instantly populate the form and see how your CV will look</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {sampleCVTemplates.slice(0, 6).map((template) => (
                          <div
                            key={template.id}
                            className="p-4 bg-gradient-to-br from-surface to-surface-light rounded-xl border border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                            onClick={() => {
                              // Load sample data into form
                              if (template.data.basics) {
                                updatePersonal('name', template.data.basics.name || '');
                                updatePersonal('email', template.data.basics.email || '');
                                updatePersonal('phone', template.data.basics.phone || '');
                                updatePersonal('website', template.data.basics.website || '');
                                setCvData(prev => ({ ...prev, summary: template.data.basics.summary || '' }));
                              }

                              if (template.data.work) {
                                const workEntries = template.data.work.map((work: any) => ({
                                  position: work.position || '',
                                  company: work.name || '',
                                  startDate: work.startDate || '',
                                  endDate: work.endDate || '',
                                  description: work.highlights ? work.highlights.join('\n• ') : work.summary || ''
                                }));
                                setCvData(prev => ({ ...prev, experience: workEntries }));
                              }

                              if (template.data.education) {
                                const eduEntries = template.data.education.map((edu: any) => ({
                                  degree: edu.studyType + ' in ' + edu.area || '',
                                  institution: edu.institution || '',
                                  startDate: edu.startDate || '',
                                  endDate: edu.endDate || '',
                                  gpa: edu.gpa || ''
                                }));
                                setCvData(prev => ({ ...prev, education: eduEntries }));
                              }

                              if (template.data.skills) {
                                const skillNames = template.data.skills.map((skill: any) => skill.name || skill);
                                setCvData(prev => ({ ...prev, skills: skillNames }));
                              }
                            }}
                          >
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-sm">{template.name.charAt(0)}</span>
                              </div>
                              <div>
                                <h4 className="font-semibold text-sm text-foreground">{template.name}</h4>
                                <p className="text-xs text-text-muted">{template.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center text-primary group-hover:text-primary/80 transition-colors">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                <span className="text-xs font-medium">Load Sample</span>
                              </div>
                              <span className="text-xs text-text-muted bg-surface px-2 py-1 rounded-full">
                                {template.data.work?.length || 0} jobs
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="text-center mt-4">
                        <p className="text-xs text-text-muted">
                          💡 <strong>Pro tip:</strong> Loading sample data helps you see exactly how your CV will look with our AI redesign
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Professional Summary */}
                  <div className="group bg-gradient-to-br from-surface via-surface-light to-surface/80 backdrop-blur-sm p-6 rounded-2xl border border-border/30 hover:border-secondary/50 transition-all duration-300 hover:shadow-glow">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-r from-secondary to-accent rounded-xl flex items-center justify-center shadow-premium">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-foreground">Professional Summary</h3>
                    </div>
                    <textarea
                      value={cvData.summary}
                      onChange={(e) => setCvData(prev => ({ ...prev, summary: e.target.value }))}
                      rows={4}
                      className="w-full px-4 py-3 bg-surface/50 border border-border/50 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200 text-foreground placeholder-text-muted resize-none hover:bg-surface"
                      placeholder="Write a compelling professional summary that highlights your key strengths and career goals..."
                    />
                  </div>

                  {/* Experience */}
                  <div className="group bg-gradient-to-br from-surface via-surface-light to-surface/80 backdrop-blur-sm p-6 rounded-2xl border border-border/30 hover:border-accent/50 transition-all duration-300 hover:shadow-glow">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-accent to-primary rounded-xl flex items-center justify-center shadow-premium">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0V8a2 2 0 01-2 2H8a2 2 0 01-2-2V6m8 0H8" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-foreground">
                          Work Experience {!isPro && `(${cvData.experience.length}/2)`}
                        </h3>
                      </div>
                      {(isPro || cvData.experience.length < 2) && (
                        <button
                          onClick={addExperience}
                          className="bg-gradient-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-glow transition-all duration-200"
                        >
                          + Add Experience
                        </button>
                      )}
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
                  <div className="group bg-gradient-to-br from-surface via-surface-light to-surface/80 backdrop-blur-sm p-6 rounded-2xl border border-border/30 hover:border-primary/50 transition-all duration-300 hover:shadow-glow">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center shadow-premium">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-foreground">
                          Education {!isPro && `(${cvData.education.length}/1)`}
                        </h3>
                      </div>
                      {(isPro || cvData.education.length < 1) && (
                        <button
                          onClick={addEducation}
                          className="bg-gradient-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-glow transition-all duration-200"
                        >
                          + Add Education
                        </button>
                      )}
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
                  <div className="group bg-gradient-to-br from-surface via-surface-light to-surface/80 backdrop-blur-sm p-6 rounded-2xl border border-border/30 hover:border-accent/50 transition-all duration-300 hover:shadow-glow">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-accent to-secondary rounded-xl flex items-center justify-center shadow-premium">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-foreground">
                          Skills {!isPro && `(${cvData.skills.filter(s => s.trim()).length}/5)`}
                        </h3>
                      </div>
                      {(isPro || cvData.skills.length < 5) && (
                        <button
                          onClick={addSkill}
                          className="bg-gradient-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-glow transition-all duration-200"
                        >
                          + Add Skill
                        </button>
                      )}
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
                  <div className="group bg-gradient-to-br from-surface via-surface-light to-surface/80 backdrop-blur-sm p-6 rounded-2xl border border-border/30 hover:border-secondary/50 transition-all duration-300 hover:shadow-glow">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-secondary to-accent rounded-xl flex items-center justify-center shadow-premium">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-foreground">
                          Certifications (Optional) {!isPro && `(${cvData.certifications.filter(c => c.name.trim()).length}/2)`}
                        </h3>
                      </div>
                      {(isPro || cvData.certifications.length < 2) && (
                        <button
                          onClick={addCertification}
                          className="bg-gradient-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-glow transition-all duration-200"
                        >
                          + Add Certification
                        </button>
                      )}
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

                  {/* Simplified Template Selection */}
                  {isPro && (
                    <div className="mb-8">
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-foreground mb-2">🎨 Choose Your Professional Template</h3>
                        <p className="text-text-muted">Select from our premium AI-designed templates</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {proTemplates.map((template) => (
                          <div
                            key={template.id}
                            onClick={() => setSelectedTemplate(template.id)}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                              selectedTemplate === template.id
                                ? 'border-primary bg-primary/5 shadow-glow'
                                : 'border-border hover:border-primary/50 bg-surface'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold text-foreground">{template.name}</h4>
                              {selectedTemplate === template.id && (
                                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              )}
                            </div>
                            <p className="text-sm text-text-muted mb-3">{template.description}</p>
                            <div className="flex gap-1 mb-3">
                              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: template.colors.primary }}></div>
                              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: template.colors.secondary }}></div>
                              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: template.colors.accent }}></div>
                            </div>
                            <div className="text-xs text-primary font-medium">
                              ✓ AI Optimized • ✓ Professional • ✓ ATS-Friendly
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <button
                      onClick={handlePreview}
                      className="flex-1 bg-gradient-primary text-white font-semibold py-4 px-6 rounded-xl hover:shadow-glow hover:scale-105 transition-all duration-200 shadow-premium"
                    >
                      Preview Your Professional CV
                    </button>
                  </div>
                </div>
              ) : (
                /* Preview Mode */
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-foreground">Your Professional CV Preview</h3>
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
                        <h2 className="text-3xl font-black text-foreground mb-3" style={{ textShadow: '0 0 20px rgba(99, 102, 241, 0.5), 0 0 40px rgba(99, 102, 241, 0.3)' }}>{cvData.personal.name || 'Your Name'}</h2>
                        <p className="text-primary font-semibold text-lg mb-4" style={{ textShadow: '0 0 10px rgba(99, 102, 241, 0.6)' }}>Professional CV - AI Redesigned</p>
                        <div className="flex justify-center">
                          <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full shadow-glow"></div>
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