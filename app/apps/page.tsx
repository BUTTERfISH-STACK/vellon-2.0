import Link from 'next/link'
import Layout from '@/components/Layout'

export default function AppsPage() {
  const tools = [
    {
      title: 'CV Optimizer',
      description: 'Optimize your CV with AI-powered suggestions and professional formatting',
      href: '/apps/cv-optimizer-free',
      icon: '📄',
      color: 'bg-blue-500'
    },
    {
      title: 'CV Redo',
      description: 'Completely redesign your CV with modern templates and layouts',
      href: '/apps/cv-redo',
      icon: '🎨',
      color: 'bg-green-500'
    },
    {
      title: 'CV Templates',
      description: 'Browse and select from professional CV templates',
      href: '/apps/cv-templates',
      icon: '📋',
      color: 'bg-purple-500'
    },
    {
      title: 'Interview Simulator',
      description: 'Practice interviews with AI-generated questions and feedback',
      href: '/apps/interview-simulator',
      icon: '🎤',
      color: 'bg-red-500'
    },
    {
      title: 'Job Match Engine',
      description: 'Find jobs that match your skills and career goals',
      href: '/apps/job-match',
      icon: '🎯',
      color: 'bg-yellow-500'
    },
    {
      title: 'Career Planner',
      description: 'Plan your 5-year career trajectory with personalized roadmaps',
      href: '/apps/career-planner',
      icon: '🗺️',
      color: 'bg-indigo-500'
    }
  ]

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Vellon Career Tools</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive AI-powered tools to accelerate your career growth and job search success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <Link key={index} href={tool.href}>
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 cursor-pointer group hover:scale-105">
                  <div className={`w-16 h-16 ${tool.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-2xl">{tool.icon}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{tool.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{tool.description}</p>
                  <div className="mt-4 flex items-center text-blue-600 font-medium">
                    Get Started
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Career?</h2>
              <p className="text-xl mb-6 opacity-90">
                Start with our free CV optimizer and unlock the full potential of your career journey
              </p>
              <Link
                href="/apps/cv-optimizer-free"
                className="inline-flex items-center bg-white text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition-colors duration-300"
              >
                Start Optimizing
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}