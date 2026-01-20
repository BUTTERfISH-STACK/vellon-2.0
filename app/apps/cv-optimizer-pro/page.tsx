'use client';

import { useState, useEffect } from 'react';
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

export default function CVOptimizerProPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [selectedBackground, setSelectedBackground] = useState<string | null>(null);
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

  const slides = ['creative', 'modern'] as const;

  const proBackgrounds = [
    '/Minimalist CV Resume.png',
    '/white simple student cv resume.png',
    '/blue Minimalist modern CV resume.png',
    '/Minimalist Modern Professional CV Resume.png'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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

    // Add background for pro users
    if (selectedBackground) {
      try {
        const img = new Image();
        img.src = selectedBackground;
        await new Promise((resolve) => {
          img.onload = resolve;
        });
        doc.addImage(img, 'PNG', 0, 0, 210, 297); // A4 size in mm
      } catch (error) {
        console.warn('Failed to add background:', error);
      }
    }

    // Pro version styling
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text(cvData.personal.name || 'Your Name', 20, yPosition);
    yPosition += 10;

    // Contact Info
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    if (cvData.personal.email) {
      doc.text(`Email: ${cvData.personal.email}`, 20, yPosition);
      yPosition += 6;
    }
    if (cvData.personal.phone) {
      doc.text(`Phone: ${cvData.personal.phone}`, 20, yPosition);
      yPosition += 6;
    }
    if (cvData.personal.address) {
      doc.text(`Address: ${cvData.personal.address}`, 20, yPosition);
      yPosition += 6;
    }
    if (cvData.personal.linkedin) {
      doc.text(`LinkedIn: ${cvData.personal.linkedin}`, 20, yPosition);
      yPosition += 6;
    }
    if (cvData.personal.website) {
      doc.text(`Website: ${cvData.personal.website}`, 20, yPosition);
      yPosition += 6;
    }

    yPosition += 10;

    // Summary
    if (cvData.summary) {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('PROFESSIONAL SUMMARY', 20, yPosition);
      yPosition += 8;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      const summaryLines = doc.splitTextToSize(cvData.summary, 170);
      doc.text(summaryLines, 20, yPosition);
      yPosition += summaryLines.length * 5 + 10;
    }

    // Experience (unlimited for pro)
    if (cvData.experience.some(exp => exp.position || exp.company)) {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('EXPERIENCE', 20, yPosition);
      yPosition += 8;

      cvData.experience.forEach(exp => {
        if (exp.position || exp.company) {
          doc.setFontSize(12);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(0, 0, 0);
          doc.text(exp.position, 20, yPosition);
          yPosition += 6;
          doc.setFontSize(10);
          doc.setFont('helvetica', 'italic');
          const companyText = exp.company + (exp.startDate || exp.endDate ? ` | ${exp.startDate} - ${exp.endDate}` : '');
          doc.text(companyText, 20, yPosition);
          yPosition += 6;
          if (exp.description) {
            doc.setFont('helvetica', 'normal');
            const descLines = doc.splitTextToSize(exp.description, 160);
            descLines.forEach((line: string) => {
              doc.text('• ' + line, 25, yPosition);
              yPosition += 5;
            });
          }
          yPosition += 5;
        }
      });
      yPosition += 5;
    }

    // Education (unlimited for pro)
    if (cvData.education.some(edu => edu.degree || edu.institution)) {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('EDUCATION', 20, yPosition);
      yPosition += 8;

      cvData.education.forEach(edu => {
        if (edu.degree || edu.institution) {
          doc.setFontSize(12);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(0, 0, 0);
          doc.text(edu.degree, 20, yPosition);
          yPosition += 6;
          doc.setFontSize(10);
          doc.setFont('helvetica', 'italic');
          const eduText = edu.institution + (edu.startDate || edu.endDate ? ` | ${edu.startDate} - ${edu.endDate}` : '');
          doc.text(eduText, 20, yPosition);
          yPosition += 6;
          if (edu.gpa) {
            doc.setFont('helvetica', 'normal');
            doc.text(`GPA: ${edu.gpa}`, 20, yPosition);
            yPosition += 5;
          }
          yPosition += 5;
        }
      });
      yPosition += 5;
    }

    // Skills (unlimited for pro)
    if (cvData.skills.some(skill => skill.trim())) {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('SKILLS', 20, yPosition);
      yPosition += 8;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      const skillsText = cvData.skills.filter(skill => skill.trim()).join(', ');
      const skillsLines = doc.splitTextToSize(skillsText, 170);
      doc.text(skillsLines, 20, yPosition);
      yPosition += skillsLines.length * 5 + 10;
    }

    // Certifications (unlimited for pro)
    if (cvData.certifications.some(cert => cert.name || cert.issuer)) {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('CERTIFICATIONS', 20, yPosition);
      yPosition += 8;

      cvData.certifications.forEach(cert => {
        if (cert.name || cert.issuer) {
          doc.setFontSize(10);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(0, 0, 0);
          const certText = cert.name + (cert.issuer ? ` - ${cert.issuer}` : '') + (cert.date ? ` (${cert.date})` : '');
          doc.text('• ' + certText, 20, yPosition);
          yPosition += 6;
        }
      });
      yPosition += 10;
    }

    // No watermark for pro version

    const filename = 'professional-cv.pdf';
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <section className="text-center py-24 sm:py-40 animate-fade-in-up">
          <div className="inline-block p-2 bg-gradient-primary/20 rounded-full mb-8 shadow-premium">
            <div className="bg-gradient-elegant px-8 py-4 rounded-full border border-accent/30">
              <h2 className="text-accent font-bold text-xl tracking-wide">Your career deserves the best presentation</h2>
            </div>
          </div>
          <p className="max-w-4xl mx-auto text-2xl text-text-muted mb-12 leading-relaxed font-light">
            Create a professional CV that gets you noticed by South African employers. ATS-optimized and designed for career success.
          </p>

          {/* CV Mockup Slideshow */}
          <div className="max-w-5xl mx-auto mb-16">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-elegant border border-border/50 shadow-premium">
              <div className="aspect-[3/4] relative bg-gradient-to-br from-surface to-surface-light rounded-2xl overflow-hidden">
                <img
                  src="/ATS Friendly Modern CV Resume.png"
                  alt="Creative CV Design"
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                    currentSlide === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                />
                <img
                  src="/Minimalist Modern Professional CV Resume.png"
                  alt="Modern CV Design"
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                    currentSlide === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                />
              </div>
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide ? 'bg-accent shadow-glow' : 'bg-border/50 hover:bg-accent/70'
                    }`}
                  />
                ))}
              </div>
              <div className="absolute top-6 right-6 bg-gradient-primary/20 backdrop-blur-sm text-accent px-4 py-2 rounded-full text-sm font-semibold border border-accent/30">
                {currentSlide === 0 ? 'Creative Professional' : 'Modern Executive'} Template
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-elegant backdrop-blur-sm rounded-3xl shadow-premium p-8 border border-border/30">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gradient-gold mb-4">Professional CV Builder</h2>
                <p className="text-text-muted text-lg">Build your career with a CV that gets results. Start free and upgrade when you're ready to land your dream job.</p>
                <div className="mt-4 p-4 bg-accent/10 rounded-xl border border-accent/20">
                  <p className="text-accent font-medium">Professional CV Builder • AI-powered optimization • ATS-friendly results</p>
                </div>
              </div>

              {isEditing ? (
                <div className="space-y-8">
                  {/* Background Selection - Pro Only */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">CV Background (Pro Feature)</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {proBackgrounds.map((bg, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedBackground(bg)}
                          className={`relative rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                            selectedBackground === bg ? 'border-accent shadow-glow' : 'border-border hover:border-accent/70'
                          }`}
                        >
                          <img
                            src={bg}
                            alt={`Background ${index + 1}`}
                            className="w-full h-20 object-cover"
                          />
                          {selectedBackground === bg && (
                            <div className="absolute inset-0 bg-accent/20 flex items-center justify-center">
                              <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </button>
                      ))}
                      <button
                        onClick={() => setSelectedBackground(null)}
                        className={`rounded-xl p-4 border-2 transition-all duration-200 ${
                          selectedBackground === null ? 'border-accent shadow-glow' : 'border-border hover:border-accent/70'
                        }`}
                      >
                        <div className="text-center">
                          <svg className="w-8 h-8 mx-auto text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          <span className="block text-sm mt-2 font-medium text-foreground">No Background</span>
                        </div>
                      </button>
                    </div>
                  </div>

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
                          className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 text-foreground placeholder-text-muted"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                        <input
                          type="email"
                          value={cvData.personal.email}
                          onChange={(e) => updatePersonal('email', e.target.value)}
                          className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 text-foreground placeholder-text-muted"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                        <input
                          type="tel"
                          value={cvData.personal.phone}
                          onChange={(e) => updatePersonal('phone', e.target.value)}
                          className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 text-foreground placeholder-text-muted"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Address</label>
                        <input
                          type="text"
                          value={cvData.personal.address}
                          onChange={(e) => updatePersonal('address', e.target.value)}
                          className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 text-foreground placeholder-text-muted"
                          placeholder="City, State, Country"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">LinkedIn</label>
                        <input
                          type="url"
                          value={cvData.personal.linkedin}
                          onChange={(e) => updatePersonal('linkedin', e.target.value)}
                          className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 text-foreground placeholder-text-muted"
                          placeholder="https://linkedin.com/in/johndoe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Website</label>
                        <input
                          type="url"
                          value={cvData.personal.website}
                          onChange={(e) => updatePersonal('website', e.target.value)}
                          className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 text-foreground placeholder-text-muted"
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
                      className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 text-foreground placeholder-text-muted resize-none"
                      placeholder="Write a compelling professional summary highlighting your key strengths and career goals..."
                    />
                  </div>

                  {/* Experience */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-foreground">Work Experience (Unlimited)</h3>
                      <button
                        onClick={addExperience}
                        className="bg-gradient-primary text-background px-4 py-2 rounded-lg text-sm font-medium hover:shadow-glow transition-all duration-200"
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
                              className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 text-foreground placeholder-text-muted"
                              placeholder="Software Developer"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Company</label>
                            <input
                              type="text"
                              value={exp.company}
                              onChange={(e) => updateExperience(index, 'company', e.target.value)}
                              className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 text-foreground placeholder-text-muted"
                              placeholder="Tech Corp"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Start Date</label>
                            <input
                              type="text"
                              value={exp.startDate}
                              onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                              className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 text-foreground placeholder-text-muted"
                              placeholder="Jan 2020"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">End Date</label>
                            <input
                              type="text"
                              value={exp.endDate}
                              onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                              className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 text-foreground placeholder-text-muted"
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
                            className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 text-foreground placeholder-text-muted resize-none"
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
                      <h3 className="text-lg font-semibold text-foreground">Education (Unlimited)</h3>
                      <button
                        onClick={addEducation}
                        className="bg-gradient-primary text-background px-4 py-2 rounded-lg text-sm font-medium hover:shadow-glow transition-all duration-200"
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
                              className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 text-foreground placeholder-text-muted"
                              placeholder="Bachelor of Computer Science"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Institution</label>
                            <input
                              type="text"
                              value={edu.institution}
                              onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                              className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 text-foreground placeholder-text-muted"
                              placeholder="University of Technology"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Start Date</label>
                            <input
                              type="text"
                              value={edu.startDate}
                              onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                              className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 text-foreground placeholder-text-muted"
                              placeholder="2016"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">End Date</label>
                            <input
                              type="text"
                              value={edu.endDate}
                              onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                              className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 text-foreground placeholder-text-muted"
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
                            className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 text-foreground placeholder-text-muted"
                            placeholder="3.8/4.0"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Skills */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-foreground">Skills (Unlimited)</h3>
                      <button
                        onClick={addSkill}
                        className="bg-gradient-primary text-background px-4 py-2 rounded-lg text-sm font-medium hover:shadow-glow transition-all duration-200"
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
                            className="flex-1 px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 text-foreground placeholder-text-muted"
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
                      <h3 className="text-lg font-semibold text-foreground">Certifications (Unlimited)</h3>
                      <button
                        onClick={addCertification}
                        className="bg-gradient-primary text-background px-4 py-2 rounded-lg text-sm font-medium hover:shadow-glow transition-all duration-200"
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
                              className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 text-foreground placeholder-text-muted"
                              placeholder="AWS Certified Developer"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Issuer</label>
                            <input
                              type="text"
                              value={cert.issuer}
                              onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
                              className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 text-foreground placeholder-text-muted"
                              placeholder="Amazon Web Services"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Date</label>
                            <input
                              type="text"
                              value={cert.date}
                              onChange={(e) => updateCertification(index, 'date', e.target.value)}
                              className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 text-foreground placeholder-text-muted"
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
                      className="flex-1 bg-gradient-primary text-background font-semibold py-4 px-6 rounded-xl hover:shadow-glow hover:scale-105 transition-all duration-200 shadow-premium"
                    >
                      Preview CV
                    </button>
                  </div>
                </div>
              ) : (
                /* Preview Mode */
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-foreground">CV Preview</h3>
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
                        className="bg-gradient-primary text-background px-4 py-2 rounded-lg text-sm font-medium hover:shadow-glow transition-all duration-200 disabled:opacity-50"
                      >
                        {isGenerating ? 'Generating...' : 'Download PDF'}
                      </button>
                    </div>
                  </div>

                  <div className="bg-surface rounded-xl p-8 border border-border/50 shadow-premium relative">
                    {/* Background Image for Preview */}
                    {selectedBackground && (
                      <div className="absolute inset-0 -z-10 opacity-20">
                        <img
                          src={selectedBackground}
                          alt="Selected Background"
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>
                    )}
                    {/* Header */}
                    <div className="text-center mb-6 pb-4 border-b-2 border-accent relative">
                      <h2 className="text-2xl font-bold text-foreground mb-2">{cvData.personal.name || 'Your Name'}</h2>
                      <div className="text-sm text-text-muted space-y-1">
                        {cvData.personal.email && <p>📧 {cvData.personal.email}</p>}
                        {cvData.personal.phone && <p>📱 {cvData.personal.phone}</p>}
                        {cvData.personal.address && <p>📍 {cvData.personal.address}</p>}
                        {cvData.personal.linkedin && <p>💼 {cvData.personal.linkedin}</p>}
                        {cvData.personal.website && <p>🌐 {cvData.personal.website}</p>}
                      </div>
                    </div>

                    {/* Summary */}
                    {cvData.summary && (
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-accent mb-3 uppercase tracking-wide">Professional Summary</h3>
                        <p className="text-text-muted leading-relaxed">{cvData.summary}</p>
                      </div>
                    )}

                    {/* Experience */}
                    {cvData.experience.some(exp => exp.position || exp.company) && (
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-secondary mb-3 uppercase tracking-wide">Experience</h3>
                        {cvData.experience.map((exp, index) => (
                          exp.position || exp.company ? (
                            <div key={index} className="mb-4">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-semibold text-foreground">{exp.position}</h4>
                                <span className="text-sm text-text-muted">
                                  {exp.startDate} - {exp.endDate}
                                </span>
                              </div>
                              <p className="text-accent font-medium mb-2">{exp.company}</p>
                              {exp.description && (
                                <ul className="text-text-muted text-sm space-y-1">
                                  {exp.description.split('\n').map((line, i) => (
                                    line.trim() && <li key={i} className="flex items-start gap-2">
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

                    {/* Education */}
                    {cvData.education.some(edu => edu.degree || edu.institution) && (
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-accent mb-3 uppercase tracking-wide">Education</h3>
                        {cvData.education.map((edu, index) => (
                          edu.degree || edu.institution ? (
                            <div key={index} className="mb-4">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-semibold text-foreground">{edu.degree}</h4>
                                <span className="text-sm text-text-muted">
                                  {edu.startDate} - {edu.endDate}
                                </span>
                              </div>
                              <p className="text-primary font-medium mb-1">{edu.institution}</p>
                              {edu.gpa && <p className="text-sm text-text-muted">GPA: {edu.gpa}</p>}
                            </div>
                          ) : null
                        ))}
                      </div>
                    )}

                    {/* Skills */}
                    {cvData.skills.some(skill => skill.trim()) && (
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-primary mb-3 uppercase tracking-wide">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          {cvData.skills.filter(skill => skill.trim()).map((skill, index) => (
                            <span key={index} className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm border border-accent/20">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Certifications */}
                    {cvData.certifications.some(cert => cert.name || cert.issuer) && (
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-secondary mb-3 uppercase tracking-wide">Certifications</h3>
                        {cvData.certifications.map((cert, index) => (
                          cert.name || cert.issuer ? (
                            <div key={index} className="mb-2">
                              <span className="font-medium text-foreground">{cert.name}</span>
                              {cert.issuer && <span className="text-text-muted"> - {cert.issuer}</span>}
                              {cert.date && <span className="text-sm text-text-muted ml-2">({cert.date})</span>}
                            </div>
                          ) : null
                        ))}
                      </div>
                    )}

                    {/* No watermark for pro version */}
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