'use client';

import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';

// CV Mockup Component
const CVMockup = ({ type }: { type: 'modern' | 'classic' | 'creative' }) => {
  const mockups = {
    modern: (
      <div className="bg-gradient-to-br from-white to-blue-50 text-gray-900 p-6 h-full flex flex-col relative">
        {/* Vellon Stamp */}
        <div className="absolute top-4 right-4 opacity-40 drop-shadow-sm">
          <img src="/vellon-stamp.png" alt="Vellon" className="w-16 h-16 object-contain" />
        </div>

        <div className="text-center mb-6 pb-4 border-b-2 border-accent">
          <h2 className="text-xl font-bold mb-2">Sarah Nkosi</h2>
          <p className="text-sm text-gray-600">Senior Data Scientist</p>
          <div className="text-xs text-gray-500 mt-2 space-y-1">
            <p>Johannesburg, South Africa | sarah.nkosi@email.com</p>
            <p>+27 82 123 4567 | linkedin.com/in/sarahnkosi | github.com/snkosi</p>
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <div>
            <h3 className="font-semibold text-accent mb-3 text-sm uppercase tracking-wide">Professional Summary</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Experienced data scientist with 5+ years in machine learning and predictive analytics.
              Proven track record of developing ML solutions that drive business value and operational efficiency.
              Expertise in Python, R, and cloud platforms.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-accent mb-3 text-sm uppercase tracking-wide">Professional Experience</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-gray-900">Senior Data Scientist</span>
                  <span className="text-sm text-gray-600">2021-Present</span>
                </div>
                <p className="text-sm text-accent font-medium mb-2">Santam Insurance, Johannesburg</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Developed machine learning models reducing claims processing time by 40%</li>
                  <li>• Led cross-functional team of 5 data scientists on predictive analytics initiatives</li>
                  <li>• Implemented automated reporting systems saving 15 hours/week in manual reporting</li>
                  <li>• Built customer risk profiling models improving underwriting accuracy by 25%</li>
                  <li>• Collaborated with actuarial team to enhance pricing models using advanced statistics</li>
                </ul>
              </div>
              <div>
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-gray-900">Data Analyst</span>
                  <span className="text-sm text-gray-600">2019-2021</span>
                </div>
                <p className="text-sm text-accent font-medium mb-2">FNB Banking Group, Johannesburg</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Built customer segmentation models using Python and SQL for targeted marketing</li>
                  <li>• Created executive dashboards using Tableau and Power BI for C-suite reporting</li>
                  <li>• Conducted A/B testing analysis improving digital campaign ROI by 35%</li>
                  <li>• Developed ETL pipelines for real-time data processing</li>
                </ul>
              </div>
              <div>
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-gray-900">Junior Data Analyst</span>
                  <span className="text-sm text-gray-600">2017-2019</span>
                </div>
                <p className="text-sm text-accent font-medium mb-2">Discovery Health, Johannesburg</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Performed statistical analysis on healthcare claims data</li>
                  <li>• Created automated reports using R and Excel for business stakeholders</li>
                  <li>• Assisted in developing predictive models for customer retention</li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-accent mb-3 text-sm uppercase tracking-wide">Technical Skills</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="font-medium text-sm text-gray-900">Programming:</span>
                <p className="text-sm text-gray-700">Python, R, SQL, SAS</p>
              </div>
              <div>
                <span className="font-medium text-sm text-gray-900">ML/AI:</span>
                <p className="text-sm text-gray-700">TensorFlow, scikit-learn, PyTorch</p>
              </div>
              <div>
                <span className="font-medium text-sm text-gray-900">Visualization:</span>
                <p className="text-sm text-gray-700">Tableau, Power BI, matplotlib</p>
              </div>
              <div>
                <span className="font-medium text-sm text-gray-900">Cloud:</span>
                <p className="text-sm text-gray-700">AWS, Azure, Google Cloud</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-accent mb-3 text-sm uppercase tracking-wide">Education & Certifications</h3>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-900">MSc Data Science</span>
                  <span className="text-sm text-gray-600">2017-2019</span>
                </div>
                <p className="text-sm text-gray-600">University of Cape Town</p>
                <p className="text-xs text-gray-500">Distinction | Thesis: "Machine Learning Applications in Insurance Risk Assessment"</p>
              </div>
              <div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-900">BSc Statistics & Computer Science</span>
                  <span className="text-sm text-gray-600">2013-2016</span>
                </div>
                <p className="text-sm text-gray-600">University of the Witwatersrand</p>
              </div>
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-900">Certifications:</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• AWS Certified Machine Learning - Specialty (2023)</li>
                  <li>• Google Cloud Professional Data Engineer (2022)</li>
                  <li>• SAS Certified Advanced Analytics Professional (2021)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    classic: (
      <div className="bg-gradient-to-br from-white to-gray-50 text-gray-900 p-6 h-full flex flex-col relative">
        {/* Vellon Stamp */}
        <div className="absolute top-4 right-4 opacity-40 drop-shadow-sm">
          <img src="/vellon-stamp.png" alt="Vellon" className="w-16 h-16 object-contain" />
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Thabo Mthembu</h2>
          <div className="text-sm text-gray-600 space-y-1">
            <p>Senior Project Manager | Johannesburg, South Africa</p>
            <p>thabo.mthembu@outlook.com | +27 71 987 6543</p>
            <p>linkedin.com/in/thabomthembu | pmp-certified-pm</p>
          </div>
        </div>
        <div className="flex-1 space-y-5">
          <div>
            <h3 className="font-bold text-lg mb-3 border-b-2 border-gray-300 pb-1">PROFESSIONAL SUMMARY</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Accomplished project manager with 8+ years of experience leading large-scale infrastructure and technology projects
              in the telecommunications and energy sectors. Proven expertise in Agile methodologies, stakeholder management,
              and delivering complex projects on time and within budget. PMP certified with a track record of managing
              multi-million rand projects across Southern Africa.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3 border-b-2 border-gray-300 pb-1">PROFESSIONAL EXPERIENCE</h3>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between font-bold text-gray-900">
                  <span>Senior Project Manager</span>
                  <span className="text-sm">2020-Present</span>
                </div>
                <p className="text-sm italic mb-2 font-medium">MTN Group, Johannesburg</p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Led R250M+ telecommunications infrastructure deployment across 3 African countries</li>
                  <li>• Managed cross-functional teams of 25+ members including engineering, procurement, and operations</li>
                  <li>• Implemented Agile/Scrum methodologies reducing project delivery time by 30%</li>
                  <li>• Achieved 98% on-time project completion rate and 15% cost savings through vendor negotiations</li>
                  <li>• Directed stakeholder engagement with C-suite executives and government regulators</li>
                  <li>• Developed comprehensive risk management frameworks and contingency plans</li>
                </ul>
              </div>
              <div>
                <div className="flex justify-between font-bold text-gray-900">
                  <span>Project Manager</span>
                  <span className="text-sm">2017-2020</span>
                </div>
                <p className="text-sm italic mb-2 font-medium">Eskom Holdings, Pretoria</p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Coordinated R50M+ maintenance and upgrade projects for national power distribution network</li>
                  <li>• Managed vendor relationships and contracts for specialized electrical equipment procurement</li>
                  <li>• Developed comprehensive project documentation and compliance reporting</li>
                  <li>• Implemented safety protocols resulting in zero lost-time incidents on managed projects</li>
                  <li>• Led change management initiatives for technology upgrades across multiple sites</li>
                </ul>
              </div>
              <div>
                <div className="flex justify-between font-bold text-gray-900">
                  <span>Project Coordinator</span>
                  <span className="text-sm">2014-2017</span>
                </div>
                <p className="text-sm italic mb-2 font-medium">Transnet SOC Ltd, Johannesburg</p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Supported project managers on R100M+ rail infrastructure modernization projects</li>
                  <li>• Coordinated between engineering teams, contractors, and regulatory bodies</li>
                  <li>• Managed project documentation, schedules, and budget tracking</li>
                  <li>• Assisted in procurement processes and vendor performance evaluation</li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3 border-b-2 border-gray-300 pb-1">EDUCATION</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between font-semibold">
                  <span>Master of Business Administration (MBA)</span>
                  <span className="text-sm">2015-2017</span>
                </div>
                <p className="text-sm italic">University of Johannesburg</p>
                <p className="text-xs text-gray-500">Specialization: Project Management | Graduated Cum Laude</p>
              </div>
              <div>
                <div className="flex justify-between font-semibold">
                  <span>Bachelor of Engineering (Electrical)</span>
                  <span className="text-sm">2011-2015</span>
                </div>
                <p className="text-sm italic">University of Pretoria</p>
                <p className="text-xs text-gray-500">Dean's List | Engineering Council of South Africa Accredited</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3 border-b-2 border-gray-300 pb-1">CERTIFICATIONS & SKILLS</h3>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <p className="text-sm font-semibold text-gray-900">Project Management Certifications:</p>
                <ul className="text-sm space-y-1 ml-2">
                  <li>• Project Management Professional (PMP) - PMI (2021)</li>
                  <li>• PRINCE2 Practitioner - AXELOS (2022)</li>
                  <li>• Scrum Master Certification - Scrum Alliance (2019)</li>
                  <li>• Microsoft Project Expert Certification (2018)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Technical Skills:</p>
                <p className="text-sm">MS Project, Primavera P6, JIRA, SAP, AutoCAD, Risk Management Software</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Soft Skills:</p>
                <p className="text-sm">Stakeholder Management, Risk Assessment, Budget Control, Team Leadership, Negotiation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    creative: (
      <div className="bg-gradient-to-br from-accent/5 to-accent/10 text-gray-900 p-6 h-full flex flex-col relative">
        {/* Vellon Stamp */}
        <div className="absolute top-4 right-4 opacity-40 drop-shadow-sm">
          <img src="/vellon-stamp.png" alt="Vellon" className="w-16 h-16 object-contain" />
        </div>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-accent rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">LM</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">Lerato Molefe</h2>
          <p className="text-accent font-semibold text-lg">Senior UX/UI Designer & Front-end Developer</p>
          <div className="text-xs text-gray-600 mt-3 space-y-1">
            <p>Cape Town, South Africa | lerato.molefe@gmail.com</p>
            <p>+27 84 567 8901 | behance.net/leratomolefe | linkedin.com/in/leratomolefe</p>
          </div>
        </div>
        <div className="flex-1 space-y-5">
          <div>
            <h3 className="font-bold text-accent mb-4 flex items-center gap-2 text-lg">
              <span className="w-3 h-3 bg-accent rounded-full"></span>
              PROFESSIONAL SUMMARY
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed bg-white/40 p-4 rounded-lg border border-white/30">
              Innovative UX/UI designer with 6+ years of experience creating user-centered digital experiences.
              Passionate about solving complex problems through design thinking and cutting-edge technology.
              Expertise in full-stack design development with a focus on accessibility and inclusive design.
              Proven track record of increasing user engagement and business metrics through strategic design interventions.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-accent mb-4 flex items-center gap-2 text-lg">
              <span className="w-3 h-3 bg-accent rounded-full"></span>
              PROFESSIONAL EXPERIENCE
            </h3>
            <div className="space-y-4">
              <div className="bg-white/70 p-5 rounded-xl border border-white/50 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="font-bold text-lg text-gray-900">Senior UX/UI Designer</span>
                    <p className="text-accent font-semibold">Takealot Group (e-commerce leader)</p>
                  </div>
                  <span className="text-xs text-gray-600 bg-accent/10 px-3 py-1 rounded-full font-medium">2022-Present</span>
                </div>
                <ul className="text-sm space-y-2 text-gray-700">
                  <li>• Led complete redesign of e-commerce platform resulting in 35% increase in conversion rates</li>
                  <li>• Established comprehensive design system serving 50+ products and 200+ designers</li>
                  <li>• Conducted extensive user research with 500+ participants across South Africa</li>
                  <li>• Implemented accessibility standards (WCAG 2.1 AA) across all digital touchpoints</li>
                  <li>• Mentored junior designers and established UX best practices company-wide</li>
                  <li>• Collaborated with product and engineering teams using Agile methodologies</li>
                </ul>
              </div>
              <div className="bg-white/70 p-5 rounded-xl border border-white/50 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="font-bold text-lg text-gray-900">UX Designer & Developer</span>
                    <p className="text-accent font-semibold">Jumo (World Bank Group)</p>
                  </div>
                  <span className="text-xs text-gray-600 bg-accent/10 px-3 py-1 rounded-full font-medium">2019-2022</span>
                </div>
                <ul className="text-sm space-y-2 text-gray-700">
                  <li>• Designed financial inclusion products for underserved markets across Africa</li>
                  <li>• Created mobile-first solutions optimized for low-connectivity environments</li>
                  <li>• Developed interactive prototypes using Framer and Principle</li>
                  <li>• Conducted field research in rural communities to inform product design</li>
                  <li>• Built responsive web applications using React and TypeScript</li>
                  <li>• Presented design concepts to World Bank executives and government stakeholders</li>
                </ul>
              </div>
              <div className="bg-white/70 p-5 rounded-xl border border-white/50 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="font-bold text-lg text-gray-900">Digital Designer</span>
                    <p className="text-accent font-semibold">Virgin Active South Africa</p>
                  </div>
                  <span className="text-xs text-gray-600 bg-accent/10 px-3 py-1 rounded-full font-medium">2017-2019</span>
                </div>
                <ul className="text-sm space-y-2 text-gray-700">
                  <li>• Redesigned mobile app interface increasing user retention by 40%</li>
                  <li>• Created marketing collateral and digital campaigns for fitness brand</li>
                  <li>• Developed interactive touch-screen experiences for gym locations</li>
                  <li>• Collaborated with marketing team on customer journey optimization</li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-accent mb-4 flex items-center gap-2 text-lg">
              <span className="w-3 h-3 bg-accent rounded-full"></span>
              SKILLS & EXPERTISE
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/70 px-4 py-3 rounded-lg border border-white/50">
                <span className="font-semibold text-sm text-gray-900 block mb-1">Design Tools</span>
                <p className="text-sm text-gray-700">Figma, Sketch, Adobe Creative Suite, InVision</p>
              </div>
              <div className="bg-white/70 px-4 py-3 rounded-lg border border-white/50">
                <span className="font-semibold text-sm text-gray-900 block mb-1">Development</span>
                <p className="text-sm text-gray-700">React, TypeScript, HTML/CSS, JavaScript</p>
              </div>
              <div className="bg-white/70 px-4 py-3 rounded-lg border border-white/50">
                <span className="font-semibold text-sm text-gray-900 block mb-1">Prototyping</span>
                <p className="text-sm text-gray-700">Framer, Principle, After Effects</p>
              </div>
              <div className="bg-white/70 px-4 py-3 rounded-lg border border-white/50">
                <span className="font-semibold text-sm text-gray-900 block mb-1">Research</span>
                <p className="text-sm text-gray-700">User Testing, Analytics, A/B Testing</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-accent mb-4 flex items-center gap-2 text-lg">
              <span className="w-3 h-3 bg-accent rounded-full"></span>
              EDUCATION & ACHIEVEMENTS
            </h3>
            <div className="space-y-3">
              <div className="bg-white/70 p-4 rounded-lg border border-white/50">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-gray-900">Bachelor of Design (Digital)</span>
                  <span className="text-sm text-gray-600 bg-accent/10 px-2 py-1 rounded">2015-2018</span>
                </div>
                <p className="text-sm text-accent font-medium">Cape Peninsula University of Technology</p>
                <p className="text-xs text-gray-600 mt-1">First Class Honours | Best Graduate Project Award</p>
              </div>
              <div className="bg-white/70 p-4 rounded-lg border border-white/50">
                <p className="text-sm font-semibold text-gray-900 mb-2">Certifications & Awards</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Google UX Design Professional Certificate (2023)</li>
                  <li>• Adobe Certified Expert - XD (2022)</li>
                  <li>• AIGA Design Competition Winner (2021)</li>
                  <li>• South African Design Excellence Award (2020)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  };

  return mockups[type];
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
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export default function CVOptimizerPage() {
  const [isPro, setIsPro] = useState(true); // In a real app, this would come from user authentication
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('universal');
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = ['creative', 'modern'] as const;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
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
      colors: { primary: '#2563eb', secondary: '#64748b', accent: '#f59e0b' }
    }
  ]);

  const [proTemplates, setProTemplates] = useState<CVTemplate[]>([
    {
      id: 'moderncv',
      name: 'Modern CV',
      description: 'A modern curriculum vitae template with clean design and professional layout, inspired by LaTeX moderncv',
      preview: '/templates/moderncv-preview.jpg',
      category: 'Modern',
      colors: { primary: '#000000', secondary: '#000000', accent: '#000000' }
    },
    {
      id: 'creative',
      name: 'Creative CV',
      description: 'Creative and artistic CV template for designers and creative professionals',
      preview: '/templates/creative-preview.jpg',
      category: 'Creative',
      colors: { primary: '#dc2626', secondary: '#ea580c', accent: '#7c3aed' }
    },
    {
      id: 'classic',
      name: 'Classic CV',
      description: 'Classic and timeless CV template with elegant typography and clean layout',
      preview: '/templates/classic-preview.jpg',
      category: 'Classic',
      colors: { primary: '#374151', secondary: '#6b7280', accent: '#111827' }
    }
  ]);

  // Set default template based on tier
  useEffect(() => {
    setSelectedTemplate(isPro ? 'creative' : 'universal');
  }, [isPro]);

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

    // Add subtle background color based on template
    if (selectedTemplate === 'creative') {
      // Light blue background for creative template
      doc.setFillColor(248, 250, 252); // Very light blue-gray
      doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F');
    } else if (selectedTemplate === 'moderncv') {
      // Very subtle blue tint for modern template
      doc.setFillColor(249, 250, 251); // Extremely light blue
      doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F');
    } else if (selectedTemplate === 'classic') {
      // Subtle gray background for classic template
      doc.setFillColor(250, 250, 250); // Very light gray
      doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F');
    }

    // Apply template-specific styling
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
        doc.text('Executive Professional', 20, yPosition);
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
        doc.text('Ph.D. • Academic Professional', 20, yPosition);
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
        doc.text('Innovator & Entrepreneur', 25, yPosition);
        yPosition += 15;

      } else {
        // Minimalist template - clean and simple
        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(currentTemplate.colors.primary);
        doc.text(cvData.personal.name || 'Your Name', 20, yPosition);
        yPosition += 15;
      }
    } else {
      // Default free version styling
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text(cvData.personal.name || 'Your Name', 20, yPosition);
      yPosition += 10;
    }

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
      if (isPro && currentTemplate) {
        doc.setTextColor(currentTemplate.colors.primary);
      }
      doc.text('PROFESSIONAL SUMMARY', 20, yPosition);
      yPosition += 8;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      const summaryLines = doc.splitTextToSize(cvData.summary, 170);
      doc.text(summaryLines, 20, yPosition);
      yPosition += summaryLines.length * 5 + 10;
    }

    // Experience
    if (cvData.experience.some(exp => exp.position || exp.company)) {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      if (isPro && currentTemplate) {
        doc.setTextColor(currentTemplate.colors.secondary);
      }
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

    // Education
    if (cvData.education.some(edu => edu.degree || edu.institution)) {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      if (isPro && currentTemplate) {
        doc.setTextColor(currentTemplate.colors.accent);
      }
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

    // Skills
    if (cvData.skills.some(skill => skill.trim())) {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      if (isPro && currentTemplate) {
        doc.setTextColor(currentTemplate.colors.primary);
      }
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

    // Certifications
    if (cvData.certifications.some(cert => cert.name || cert.issuer)) {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      if (isPro && currentTemplate) {
        doc.setTextColor(currentTemplate.colors.secondary);
      }
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

    // Template credit for Pro users
    if (isPro && currentTemplate) {
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(`Template: ${currentTemplate.name} by Vellon 2.0 Pro`, 20, yPosition);
      yPosition += 10;
    }

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
        doc.text('Generated by Vellon 2.0 CV Optimizer - Free Version', 20, yPosition);
        yPosition += 5;
        doc.text('Upgrade to Pro for advanced features and remove watermark', 20, yPosition);
      }
    }

    // Download with template name in filename for Pro users
    const filename = isPro && currentTemplate ? `cv-${currentTemplate.id}.pdf` : 'professional-cv.pdf';
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
        <section className="text-center py-20 sm:py-32 animate-fade-in-up">
          <div className="inline-block p-1 bg-gradient-primary rounded-full mb-6 animate-glow">
            <div className="bg-surface px-4 py-2 rounded-full">
              <span className="text-primary font-medium text-sm">📄 CV Generator</span>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-primary bg-clip-text text-transparent mb-6">
            CV Optimizer
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-text-muted mb-8 leading-relaxed">
            Create a professional, ATS-ready CV with our intuitive form builder.
          </p>

          {/* CV Mockup Slideshow */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative overflow-hidden rounded-2xl bg-surface border border-border shadow-lg">
              <div className="aspect-[3/4] relative bg-white rounded-lg overflow-hidden">
                <img
                  src="/cv-creative.png"
                  alt="Creative CV Design"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                    currentSlide === 0 ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                <img
                  src="/cv-modern.png"
                  alt="Modern CV Design"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                    currentSlide === 1 ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentSlide ? 'bg-accent' : 'bg-border hover:bg-accent/50'
                    }`}
                  />
                ))}
              </div>
              <div className="absolute top-4 right-4 bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-medium">
                {currentSlide === 0 ? 'Creative Pro' : 'Modern Pro'} Template
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="bg-surface-light backdrop-blur-sm rounded-2xl shadow-premium p-8 border border-border/50">
              <div className="mb-6 p-4 bg-gradient-primary/10 rounded-xl border border-primary/20">
                <p className="text-primary text-sm font-medium">
                  <strong>Free Plan:</strong> Create professional CVs with watermark. Upgrade to Pro for unlimited generation and premium features.
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
                      placeholder="Write a compelling professional summary highlighting your key strengths and career goals..."
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

                  {/* Template Selection */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      {isPro ? 'Choose Your Pro Template' : 'Universal CV Template'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {(isPro ? proTemplates : freeTemplates).map((template) => (
                        <div
                          key={template.id}
                          onClick={() => setSelectedTemplate(template.id)}
                          className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 ${
                            selectedTemplate === template.id
                              ? 'border-primary bg-primary/5 shadow-glow'
                              : 'border-border hover:border-primary/50 hover:shadow-md'
                          }`}
                        >
                          <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-3 flex items-center justify-center">
                            <div className="text-center text-gray-500">
                              <div className="w-8 h-8 mx-auto mb-2 rounded" style={{ backgroundColor: template.colors.primary }}></div>
                              <span className="text-xs font-medium">{template.name}</span>
                            </div>
                          </div>
                          <h4 className="font-semibold text-sm mb-1">{template.name}</h4>
                          <p className="text-xs text-text-muted mb-2">{template.category}</p>
                          <p className="text-xs text-text-muted leading-tight">{template.description}</p>
                          {selectedTemplate === template.id && (
                            <div className="mt-2 flex items-center text-primary">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-xs font-medium">Selected</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    {!isPro && (
                      <div className="mt-4 p-4 bg-gradient-primary/10 rounded-xl border border-primary/20">
                        <p className="text-primary text-sm font-medium">
                          <strong>Upgrade to Pro:</strong> Unlock 3 premium templates (Modern, Creative, Classic) with advanced customization options.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={handlePreview}
                      className="flex-1 bg-gradient-primary text-white font-semibold py-4 px-6 rounded-xl hover:shadow-glow hover:scale-105 transition-all duration-200 shadow-premium"
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
                        className="bg-gradient-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-glow transition-all duration-200 disabled:opacity-50"
                      >
                        {isGenerating ? 'Generating...' : 'Download PDF'}
                      </button>
                    </div>
                  </div>

                  <div className="bg-surface rounded-xl p-8 border border-border/50 shadow-premium">
                    {/* Header */}
                    <div className="text-center mb-6 pb-4 border-b-2 border-primary">
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
                        <h3 className="text-lg font-semibold text-primary mb-3 uppercase tracking-wide">Professional Summary</h3>
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
                              <p className="text-primary font-medium mb-2">{exp.company}</p>
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
                            <span key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm border border-primary/20">
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