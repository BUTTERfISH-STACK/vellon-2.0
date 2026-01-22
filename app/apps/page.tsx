'use client'

import Link from 'next/link'
import { useState } from 'react'
import Layout from '@/components/Layout'

export default function AppsPage() {
  const [activeTab, setActiveTab] = useState('all')

  const tools = [
    {
      id: 'cv-optimizer',
      title: 'CV Optimizer',
      description: 'AI-powered CV optimization with ATS-friendly keywords and professional formatting',
      longDescription: 'Transform your CV with intelligent analysis, keyword optimization for ATS systems, and professional formatting that gets noticed by recruiters.',
      href: '/apps/cv-optimizer-free',
      icon: '📄',
      color: 'bg-blue-500',
      category: 'cv',
      features: ['ATS Optimization', 'Keyword Analysis', 'Professional Formatting', 'Instant Results'],
      popular: true
    },
    {
      id: 'cv-redo',
      title: 'CV Redo',
      description: 'Complete CV redesign with modern templates and layouts',
      longDescription: 'Give your CV a fresh, modern look with professionally designed templates that showcase your skills and experience effectively.',
      href: '/apps/cv-redo',
      icon: '🎨',
      color: 'bg-green-500',
      category: 'cv',
      features: ['Modern Templates', 'Custom Layouts', 'Visual Enhancement', 'PDF Export']
    },
    {
      id: 'cv-templates',
      title: 'CV Templates',
      description: 'Browse and select from professional CV templates',
      longDescription: 'Choose from a curated collection of ATS-friendly CV templates designed by professionals for various industries.',
      href: '/apps/cv-templates',
      icon: '📋',
      color: 'bg-purple-500',
      category: 'cv',
      features: ['Industry-Specific', 'ATS-Friendly', 'Customizable', 'Multiple Formats']
    },
    {
      id: 'interview-simulator',
      title: 'Interview Simulator',
      description: 'Practice interviews with AI-generated questions and detailed feedback',
      longDescription: 'Prepare for your next interview with realistic questions, comprehensive feedback, and actionable improvement suggestions.',
      href: '/apps/interview-simulator',
      icon: '🎤',
      color: 'bg-red-500',
      category: 'interview',
      features: ['Realistic Questions', 'Detailed Feedback', 'Score Analysis', 'Practice Mode'],
      new: true
    },
    {
      id: 'job-match',
      title: 'Job Match Engine',
      description: 'Find jobs that perfectly match your skills and career goals',
      longDescription: 'Discover job opportunities that align with your experience, identify skill gaps, and get personalized recommendations.',
      href: '/apps/job-match',
      icon: '🎯',
      color: 'bg-yellow-500',
      category: 'job',
      features: ['Skill Matching', 'Gap Analysis', 'Personalized Recommendations', 'Apply Links'],
      new: true
    },
    {
      id: 'career-planner',
      title: 'Career Planner',
      description: 'Plan your 5-year career trajectory with personalized roadmaps',
      longDescription: 'Get a comprehensive career roadmap with skill development plans, project suggestions, and growth milestones.',
      href: '/apps/career-planner',
      icon: '🗺️',
      color: 'bg-indigo-500',
      category: 'career',
      features: ['5-Year Roadmap', 'Skill Planning', 'Project Suggestions', 'PDF Export'],
      new: true
    }
  ]

  const categories = [
    { id: 'all', name: 'All Tools', count: tools.length },
    { id: 'cv', name: 'CV Tools', count: tools.filter(t => t.category === 'cv').length },
    { id: 'interview', name: 'Interview Prep', count: tools.filter(t => t.category === 'interview').length },
    { id: 'job', name: 'Job Search', count: tools.filter(t => t.category === 'job').length },
    { id: 'career', name: 'Career Planning', count: tools.filter(t => t.category === 'career').length }
  ]

  const filteredTools = activeTab === 'all' ? tools : tools.filter(tool => tool.category === activeTab)

  const workflow = [
    { step: 1, title: 'Optimize Your CV', tool: 'CV Optimizer', description: 'Start with a professionally optimized CV' },
    { step: 2, title: 'Practice Interviews', tool: 'Interview Simulator', description: 'Build confidence with AI-powered practice' },
    { step: 3, title: 'Find Perfect Jobs', tool: 'Job Match Engine', description: 'Discover opportunities that match your profile' },
    { step: 4, title: 'Plan Your Future', tool: 'Career Planner', description: 'Create a roadmap for long-term success' }
  ]

  return (
    <Layout>
      {/* Custom Header for Apps Page */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/" className="group flex items-center gap-3 transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-premium group-hover:shadow-glow transition-all duration-300">
                  <img src="/new-logo.png" alt="Vellon Logo" className="w-7 h-7 object-contain" />
                </div>
                <span className="text-2xl font-bold text-gradient-gold tracking-tight">Vellon</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium"
              >
                ← Back to Home
              </Link>
              <Link
                href="/apps/cv-optimizer-free"
                className="bg-gradient-primary text-white font-bold py-2 px-6 rounded-xl hover:shadow-glow transition-all duration-300 shadow-premium"
              >
                Start Free
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-4xl mx-auto leading-relaxed">
                From CV optimization to career planning — everything you need to accelerate your professional growth
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="#tools"
                  className="bg-white text-blue-600 font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Explore Tools
                </Link>
                <Link
                  href="/apps/cv-optimizer-free"
                  className="border-2 border-white text-white font-bold py-4 px-8 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300"
                >
                  Start Free
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="p-6">
                <div className="text-4xl font-black text-blue-600 mb-2">10K+</div>
                <div className="text-gray-600 font-medium">CVs Optimized</div>
              </div>
              <div className="p-6">
                <div className="text-4xl font-black text-green-600 mb-2">95%</div>
                <div className="text-gray-600 font-medium">Success Rate</div>
              </div>
              <div className="p-6">
                <div className="text-4xl font-black text-purple-600 mb-2">24/7</div>
                <div className="text-gray-600 font-medium">AI Support</div>
              </div>
              <div className="p-6">
                <div className="text-4xl font-black text-yellow-600 mb-2">6</div>
                <div className="text-gray-600 font-medium">Career Tools</div>
              </div>
            </div>
          </div>
        </section>

        {/* Workflow Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-gray-900 mb-4">Your Career Journey</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Follow our proven 4-step process to transform your career prospects
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {workflow.map((item, index) => (
                <div key={index} className="relative">
                  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="text-sm font-medium text-blue-600">{item.tool}</div>
                  </div>
                  {index < workflow.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section id="tools" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-gray-900 mb-4">Professional Tools</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose from our comprehensive suite of AI-powered career development tools
              </p>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeTab === category.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTools.map((tool) => (
                <div key={tool.id} className="group">
                  <Link href={tool.href}>
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 cursor-pointer border border-gray-100 hover:border-blue-200 relative overflow-hidden">
                      {/* Popular/New Badges */}
                      {tool.popular && (
                        <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
                          MOST POPULAR
                        </div>
                      )}
                      {tool.new && (
                        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          NEW
                        </div>
                      )}

                      <div className={`w-20 h-20 ${tool.color} rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <span className="text-3xl">{tool.icon}</span>
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {tool.title}
                      </h3>

                      <p className="text-gray-600 leading-relaxed mb-4">
                        {tool.description}
                      </p>

                      {/* Features */}
                      <div className="mb-6">
                        <div className="flex flex-wrap gap-2">
                          {tool.features.map((feature, i) => (
                            <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-blue-600 font-semibold group-hover:text-blue-700">
                          Get Started →
                        </span>
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gradient-to-r from-gray-900 to-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black mb-4">Success Stories</h2>
              <p className="text-xl opacity-90">See how our tools have transformed careers</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-2xl">👨‍💼</div>
                  <div className="ml-4">
                    <div className="font-bold">John D.</div>
                    <div className="text-yellow-300 text-sm">Software Engineer</div>
                  </div>
                </div>
                <p className="text-gray-200 italic">
                  "The CV optimizer helped me land interviews at top tech companies. The interview simulator gave me the confidence I needed."
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-2xl">👩‍💼</div>
                  <div className="ml-4">
                    <div className="font-bold">Sarah M.</div>
                    <div className="text-green-300 text-sm">Marketing Manager</div>
                  </div>
                </div>
                <p className="text-gray-200 italic">
                  "The job match engine found me opportunities I never would have discovered. My career trajectory planner keeps me focused on growth."
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center text-2xl">👨‍🎓</div>
                  <div className="ml-4">
                    <div className="font-bold">Mike R.</div>
                    <div className="text-purple-300 text-sm">Recent Graduate</div>
                  </div>
                </div>
                <p className="text-gray-200 italic">
                  "As a new graduate, these tools gave me a professional edge. I got my dream job offer within 2 months!"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-gray-900 mb-4">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Are these tools really free?</h3>
                <p className="text-gray-600">Yes! Our CV optimizer is completely free. Premium features are available for advanced users who want unlimited access and additional templates.</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-2">How accurate is the AI analysis?</h3>
                <p className="text-gray-600">Our AI is trained on thousands of successful CVs and job descriptions. While it's highly accurate, we always recommend human review for final touches.</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Can I use these tools on mobile?</h3>
                <p className="text-gray-600">Absolutely! All our tools are fully responsive and work perfectly on mobile devices, tablets, and desktops.</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-2">How long does it take to get results?</h3>
                <p className="text-gray-600">Most tools provide instant results. CV optimization takes seconds, interview practice is immediate, and job matching happens in real-time.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to Transform Your Career?</h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
              Join thousands of professionals who have accelerated their career growth with Vellon
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/apps/cv-optimizer-free"
                className="bg-white text-blue-600 font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Start Your Journey Free
              </Link>
              <Link
                href="/pricing"
                className="border-2 border-white text-white font-bold py-4 px-8 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                View Premium Plans
              </Link>
            </div>
            <p className="text-sm mt-6 opacity-75">
              No credit card required • Cancel anytime • 30-day money-back guarantee
            </p>
          </div>
        </section>
      </div>
    </Layout>
  )
}