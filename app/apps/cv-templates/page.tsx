'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Layout from '@/components/Layout'

interface Template {
  id: string
  name: string
  description: string
  preview: string
  category: string
  package: string
  colors: {
    primary: string
    secondary: string
    accent: string
  }
  features: string[]
  data: any
}

export default function CVTemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load templates from JSON file
    fetch('/templates.json')
      .then(res => res.json())
      .then(data => {
        setTemplates(data.templates)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error loading templates:', error)
        setLoading(false)
      })
  }, [])

  const categories = ['All', ...Array.from(new Set(templates.map(t => t.category)))]

  const filteredTemplates = selectedCategory === 'All'
    ? templates
    : templates.filter(template => template.category === selectedCategory)

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
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
                  href="/apps"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium"
                >
                  ← Back to Tools
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

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                Professional CV Templates
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
                Choose from our curated collection of ATS-friendly CV templates designed for different industries and career levels
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category} ({category === 'All' ? templates.length : templates.filter(t => t.category === category).length})
              </button>
            ))}
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((template) => (
              <div key={template.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                {/* Template Preview */}
                <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <div className="text-6xl mb-4">📄</div>
                      <div className="text-sm font-medium">{template.name}</div>
                      <div className="text-xs opacity-75">{template.category}</div>
                    </div>
                  </div>
                  {/* Template badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700">
                    {template.category}
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{template.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{template.description}</p>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {template.features.map((feature, i) => (
                        <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Color Palette */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Color Scheme:</h4>
                    <div className="flex gap-2">
                      <div
                        className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: template.colors.primary }}
                        title="Primary"
                      ></div>
                      <div
                        className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: template.colors.secondary }}
                        title="Secondary"
                      ></div>
                      <div
                        className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: template.colors.accent }}
                        title="Accent"
                      ></div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        // In a real app, this would navigate to template customization
                        alert(`Template "${template.name}" selected! This would open the CV builder with this template.`)
                      }}
                      className="flex-1 bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Use Template
                    </button>
                    <button
                      onClick={() => {
                        // Preview functionality
                        alert(`Preview for "${template.name}" - In a real app, this would show a modal with the template preview.`)
                      }}
                      className="px-4 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300"
                    >
                      Preview
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No templates found</h3>
              <p className="text-gray-600">Try selecting a different category.</p>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to Create Your Professional CV?</h2>
              <p className="text-xl mb-6 opacity-90">
                Start with our free CV optimizer and customize with any of these professional templates
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/apps/cv-optimizer-free"
                  className="bg-white text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg"
                >
                  Start Building Free
                </Link>
                <Link
                  href="/pricing"
                  className="border-2 border-white text-white font-bold py-3 px-8 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300"
                >
                  View Premium Plans
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  )
}