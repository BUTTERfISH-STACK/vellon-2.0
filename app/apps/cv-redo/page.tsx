'use client';

import { useState } from 'react';
import jsPDF from 'jspdf';

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

export default function CVRedoPage() {
  const [isPro, setIsPro] = useState(false); // In a real app, this would come from user authentication
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
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

    // Header with modern design
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
      doc.setTextColor(99, 102, 241);
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
      doc.setTextColor(236, 72, 153); // Pink color
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
      doc.setTextColor(34, 197, 94); // Green color
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
      doc.setTextColor(168, 85, 247); // Purple color
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
      doc.setTextColor(245, 101, 101); // Red color
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

    // Design quality indicator
    doc.setFillColor(240, 253, 244);
    doc.rect(15, yPosition, 180, 15, 'F');
    doc.setFontSize(8);
    doc.setTextColor(34, 197, 94);
    doc.text('Design Quality Score: 98%', 20, yPosition + 5);
    doc.text('AI-Redesign Applied', 20, yPosition + 10);

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

    // Download
    doc.save('ai-redesigned-cv.pdf');
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