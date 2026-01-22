'use client'

import { useState } from 'react'
import Layout from '@/components/Layout'

interface RoadmapItem {
  year: number
  target_role: string
  skills_to_learn: string[]
  projects: string[]
  certifications?: string[]
  resources?: string[]
}

export default function CareerPlannerPage() {
  const [cvContent, setCvContent] = useState('')
  const [currentSkills, setCurrentSkills] = useState('')
  const [targetRole, setTargetRole] = useState('')
  const [industry, setIndustry] = useState('')
  const [roadmap, setRoadmap] = useState<RoadmapItem[]>([])
  const [loading, setLoading] = useState(false)

  const generateRoadmap = async () => {
    if (!cvContent || !targetRole || !industry) {
      alert('Please fill in all required fields')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/career-planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cvContent,
          currentSkills: currentSkills.split(',').map(s => s.trim()),
          targetRole,
          industry
        })
      })

      const data = await response.json()
      setRoadmap(data)
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to generate career roadmap')
    }
    setLoading(false)
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Career Trajectory Planner</h1>

          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-xl font-semibold mb-4">Plan Your Career Path</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CV Content *
                </label>
                <textarea
                  value={cvContent}
                  onChange={(e) => setCvContent(e.target.value)}
                  className="w-full h-32 p-3 border border-gray-300 rounded-md"
                  placeholder="Paste your CV content here..."
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Skills (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={currentSkills}
                    onChange={(e) => setCurrentSkills(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="JavaScript, React, Communication"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Role *
                  </label>
                  <input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="Senior Software Engineer"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry *
                </label>
                <input
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  placeholder="Technology, Finance, Healthcare"
                />
              </div>
              <button
                onClick={generateRoadmap}
                disabled={loading}
                className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 disabled:opacity-50"
              >
                {loading ? 'Generating Roadmap...' : 'Generate Career Roadmap'}
              </button>
            </div>
          </div>

          {roadmap.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-6">Your 5-Year Career Roadmap</h2>
              <div className="space-y-8">
                {roadmap.map((item, index) => (
                  <div key={index} className="relative">
                    {/* Timeline line */}
                    {index < roadmap.length - 1 && (
                      <div className="absolute left-6 top-16 w-0.5 h-32 bg-gray-300"></div>
                    )}

                    <div className="flex items-start">
                      {/* Timeline dot */}
                      <div className="flex-shrink-0 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {item.year}
                      </div>

                      <div className="ml-6 flex-1">
                        <div className="bg-gray-50 p-6 rounded-lg">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Year {item.year}: {item.target_role}
                          </h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-medium text-gray-700 mb-2">Skills to Learn:</h4>
                              <ul className="list-disc list-inside space-y-1">
                                {item.skills_to_learn.map((skill, i) => (
                                  <li key={i} className="text-sm text-gray-600">{skill}</li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="font-medium text-gray-700 mb-2">Suggested Projects:</h4>
                              <ul className="list-disc list-inside space-y-1">
                                {item.projects.map((project, i) => (
                                  <li key={i} className="text-sm text-gray-600">{project}</li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {item.certifications && item.certifications.length > 0 && (
                            <div className="mt-4">
                              <h4 className="font-medium text-gray-700 mb-2">Certifications:</h4>
                              <div className="flex flex-wrap gap-2">
                                {item.certifications.map((cert, i) => (
                                  <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                    {cert}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {item.resources && item.resources.length > 0 && (
                            <div className="mt-4">
                              <h4 className="font-medium text-gray-700 mb-2">Free Learning Resources:</h4>
                              <div className="space-y-1">
                                {item.resources.map((resource, i) => (
                                  <li key={i} className="text-sm text-blue-600 hover:text-blue-800">
                                    <a href={resource} target="_blank" rel="noopener noreferrer">
                                      {resource}
                                    </a>
                                  </li>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={async () => {
                    try {
                      const response = await fetch('/api/generate-pdf', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ type: 'roadmap', roadmap, isPro: false })
                      });

                      if (response.ok) {
                        const blob = await response.blob();
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'career-roadmap.pdf';
                        a.click();
                        window.URL.revokeObjectURL(url);
                      } else {
                        alert('Failed to generate PDF');
                      }
                    } catch (error) {
                      console.error('Error:', error);
                      alert('Failed to generate PDF');
                    }
                  }}
                  className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700"
                >
                  Export Roadmap as PDF
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}