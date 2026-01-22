'use client'

import { useState } from 'react'
import Layout from '@/components/Layout'
import AdBanner from '@/components/AdBanner'

interface RoadmapItem {
  year: number
  target_role: string
  skills_to_learn: string[]
  projects: string[]
  certifications?: string[]
  resources?: string[]
  completed?: boolean
  priority?: 'high' | 'medium' | 'low'
}

export default function CareerPlannerPage() {
  const [cvContent, setCvContent] = useState('')
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [currentSkills, setCurrentSkills] = useState('')
  const [targetRole, setTargetRole] = useState('')
  const [industry, setIndustry] = useState('')
  const [timeframe, setTimeframe] = useState('5')
  const [roadmap, setRoadmap] = useState<RoadmapItem[]>([])
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [savedRoadmaps, setSavedRoadmaps] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<'create' | 'saved'>('create')
  const [skillGaps, setSkillGaps] = useState<{skill: string, gap: number, priority: string}[]>([])

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}

    if (!cvContent.trim() && !cvFile) {
      newErrors.cvContent = 'CV content or file is required'
    }

    if (!targetRole.trim()) {
      newErrors.targetRole = 'Target role is required'
    }

    if (!industry.trim()) {
      newErrors.industry = 'Industry is required'
    }

    if (!timeframe || isNaN(Number(timeframe)) || Number(timeframe) < 1 || Number(timeframe) > 10) {
      newErrors.timeframe = 'Please enter a valid timeframe (1-10 years)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleFileUpload = async (file: File) => {
    if (file.type !== 'application/pdf' && !file.name.endsWith('.docx') && !file.name.endsWith('.txt')) {
      setErrors({ cvFile: 'Please upload a PDF, DOCX, or TXT file' })
      return
    }

    setCvFile(file)
    setErrors({})

    // Extract text from file (basic implementation)
    const text = await file.text()
    setCvContent(text)
  }

  const generateRoadmap = async () => {
    if (!validateForm()) {
      return
    }

    setLoading(true)
    setErrors({})
    try {
      const response = await fetch('/api/career-planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cvContent,
          currentSkills: currentSkills.split(',').map(s => s.trim()),
          targetRole,
          industry,
          timeframe: Number(timeframe)
        })
      })

      if (!response.ok) {
        throw new Error('Failed to generate roadmap')
      }

      const data = await response.json()
      setRoadmap(data.roadmap || data)
      setSkillGaps(data.skillGaps || [])
    } catch (error) {
      console.error('Error:', error)
      setErrors({ general: 'Failed to generate career roadmap. Please try again.' })
    }
    setLoading(false)
  }

  const toggleMilestone = (yearIndex: number) => {
    const updatedRoadmap = [...roadmap]
    updatedRoadmap[yearIndex].completed = !updatedRoadmap[yearIndex].completed
    setRoadmap(updatedRoadmap)
  }

  const saveRoadmap = () => {
    const roadmapName = `Roadmap-${new Date().toISOString().split('T')[0]}`
    const savedData = {
      name: roadmapName,
      roadmap,
      skillGaps,
      createdAt: new Date().toISOString()
    }
    localStorage.setItem(`roadmap-${Date.now()}`, JSON.stringify(savedData))
    setSavedRoadmaps(prev => [...prev, roadmapName])
    alert('Roadmap saved successfully!')
  }

  const exportRoadmap = async (format: 'pdf' | 'json') => {
    if (format === 'json') {
      const dataStr = JSON.stringify({ roadmap, skillGaps }, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'career-roadmap.json'
      link.click()
      URL.revokeObjectURL(url)
    } else {
      // PDF export (existing functionality)
      try {
        const response = await fetch('/api/generate-pdf', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'roadmap', roadmap, skillGaps, isPro: false })
        })

        if (response.ok) {
          const blob = await response.blob()
          const url = window.URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = 'career-roadmap.pdf'
          a.click()
          window.URL.revokeObjectURL(url)
        } else {
          alert('Failed to generate PDF')
        }
      } catch (error) {
        console.error('Error:', error)
        alert('Failed to generate PDF')
      }
    }
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-4 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              🚀 Career Trajectory Planner
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Chart your path to success with AI-powered career planning and personalized roadmaps
            </p>
          </div>

          {/* Top Banner Ad */}
          <div className="mb-6 sm:mb-8 flex justify-center px-4 sm:px-0">
            <AdBanner
              slot="5566778899"
              format="horizontal"
              className="max-w-4xl w-full"
            />
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8 px-4">
            <div className="bg-white rounded-xl p-1 shadow-lg border w-full max-w-md">
              <button
                onClick={() => setActiveTab('create')}
                className={`px-3 sm:px-6 py-3 rounded-lg font-medium transition-all text-sm sm:text-base flex-1 ${
                  activeTab === 'create'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                📝 Create
              </button>
              <button
                onClick={() => setActiveTab('saved')}
                className={`px-3 sm:px-6 py-3 rounded-lg font-medium transition-all text-sm sm:text-base flex-1 ${
                  activeTab === 'saved'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                💾 Saved ({savedRoadmaps.length})
              </button>
            </div>
          </div>

          {activeTab === 'create' && (
            <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl border border-gray-100 mb-6 sm:mb-8 mx-4 sm:mx-0">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <span className="text-purple-600">🎯</span>
                Build Your Career Roadmap
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <span className="text-blue-600">📄</span>
                    CV Content *
                  </label>
                  <div className="space-y-3">
                    <textarea
                      value={cvContent}
                      onChange={(e) => setCvContent(e.target.value)}
                      className={`w-full h-32 p-4 border-2 rounded-xl transition-colors ${
                        errors.cvContent ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                      }`}
                      placeholder="Paste your CV content here..."
                    />
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                      <span className="text-sm text-gray-500">or upload file:</span>
                      <input
                        type="file"
                        accept=".pdf,.docx,.txt"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                        className="text-sm file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                      />
                      {cvFile && <span className="text-sm text-green-600 flex items-center gap-1">✓ {cvFile.name}</span>}
                    </div>
                  </div>
                  {errors.cvContent && <p className="text-red-500 text-sm mt-2 flex items-center gap-1">⚠️ {errors.cvContent}</p>}
                  {errors.cvFile && <p className="text-red-500 text-sm mt-2 flex items-center gap-1">⚠️ {errors.cvFile}</p>}
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                      <span className="text-green-600">🛠️</span>
                      Current Skills
                    </label>
                    <input
                      type="text"
                      value={currentSkills}
                      onChange={(e) => setCurrentSkills(e.target.value)}
                      className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors"
                      placeholder="JavaScript, React, Communication"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                        <span className="text-purple-600">🎯</span>
                        Target Role *
                      </label>
                      <input
                        type="text"
                        value={targetRole}
                        onChange={(e) => setTargetRole(e.target.value)}
                        className={`w-full p-4 border-2 rounded-xl transition-colors ${
                          errors.targetRole ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
                        }`}
                        placeholder="Senior Software Engineer"
                      />
                      {errors.targetRole && <p className="text-red-500 text-sm mt-2 flex items-center gap-1">⚠️ {errors.targetRole}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                        <span className="text-indigo-600">🏢</span>
                        Industry *
                      </label>
                      <input
                        type="text"
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className={`w-full p-4 border-2 rounded-xl transition-colors ${
                          errors.industry ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
                        }`}
                        placeholder="Technology, Finance, Healthcare"
                      />
                      {errors.industry && <p className="text-red-500 text-sm mt-2 flex items-center gap-1">⚠️ {errors.industry}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                      <span className="text-orange-600">⏰</span>
                      Timeframe (years) *
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={timeframe}
                      onChange={(e) => setTimeframe(e.target.value)}
                      className={`w-full max-w-xs p-4 border-2 rounded-xl transition-colors ${
                        errors.timeframe ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'
                      }`}
                      placeholder="5"
                    />
                    {errors.timeframe && <p className="text-red-500 text-sm mt-2 flex items-center gap-1">⚠️ {errors.timeframe}</p>}
                  </div>
                </div>

                {errors.general && <p className="text-red-500 text-sm bg-red-50 p-4 rounded-xl border border-red-200 flex items-center gap-2">⚠️ {errors.general}</p>}

                <button
                  onClick={generateRoadmap}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                  {loading && <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>}
                  {loading ? '🔄 Generating Roadmap...' : '🚀 Generate Career Roadmap'}
                </button>
              </div>
            </div>
          )}

          {/* Middle Banner Ad */}
          <div className="mb-6 sm:mb-8 flex justify-center px-4 sm:px-0">
            <AdBanner
              slot="6677889900"
              format="rectangle"
              className="max-w-md w-full"
            />
          </div>

          {activeTab === 'saved' && (
            <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl border border-gray-100 mx-4 sm:mx-0">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <span className="text-blue-600">💾</span>
                Saved Roadmaps
              </h2>
              {savedRoadmaps.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No saved roadmaps yet. Create your first roadmap!</p>
              ) : (
                <div className="space-y-4">
                  {savedRoadmaps.map((name, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{name}</span>
                        <button className="text-blue-600 hover:text-blue-800">Load</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {roadmap.length > 0 && (
            <div className="space-y-8">
              {/* Skill Gap Analysis */}
              {skillGaps.length > 0 && (
                <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl border border-gray-100 mx-4 sm:mx-0">
                  <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                    <span className="text-red-600">📊</span>
                    Skill Gap Analysis
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {skillGaps.map((gap, index) => (
                      <div key={index} className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-xl border border-red-200">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-semibold text-gray-900 text-sm sm:text-base pr-2">{gap.skill}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                            gap.priority === 'high' ? 'bg-red-100 text-red-800' :
                            gap.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {gap.priority}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                          <div
                            className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${gap.gap}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-600 font-medium">{gap.gap}% gap to fill</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Career Roadmap */}
              <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl border border-gray-100 mx-4 sm:mx-0">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                  <h2 className="text-xl sm:text-2xl font-semibold flex items-center gap-3">
                    <span className="text-purple-600">🗺️</span>
                    Your {timeframe}-Year Career Roadmap
                  </h2>
                  <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
                    <button
                      onClick={saveRoadmap}
                      className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 text-sm sm:text-base flex-1 sm:flex-none justify-center"
                    >
                      💾 Save
                    </button>
                    <button
                      onClick={() => exportRoadmap('json')}
                      className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm sm:text-base flex-1 sm:flex-none justify-center"
                    >
                      📄 JSON
                    </button>
                    <button
                      onClick={() => exportRoadmap('pdf')}
                      className="bg-purple-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 text-sm sm:text-base flex-1 sm:flex-none justify-center"
                    >
                      📕 PDF
                    </button>
                  </div>
                </div>

                <div className="relative">
                  {/* Timeline line - hidden on mobile, visible on larger screens */}
                  <div className="hidden sm:block absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 via-blue-400 to-green-400 rounded-full"></div>

                  <div className="space-y-8 sm:space-y-12">
                    {roadmap.map((item, index) => (
                      <div key={index} className="relative flex flex-col sm:flex-row items-start sm:items-start">
                        {/* Timeline dot - centered on mobile, left-aligned on larger screens */}
                        <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-white mx-auto sm:mx-0 mb-4 sm:mb-0 ${
                          item.completed ? 'bg-green-500' : 'bg-purple-600'
                        }`}>
                          {item.completed ? '✓' : item.year}
                        </div>

                        <div className="w-full sm:ml-8 flex-1">
                          <div className={`p-4 sm:p-6 rounded-2xl shadow-lg border-2 transition-all duration-300 ${
                            item.completed
                              ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300'
                              : 'bg-gradient-to-r from-white to-gray-50 border-gray-200 hover:border-purple-300'
                          }`}>
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                              <div className="flex-1">
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                                  Year {item.year}: {item.target_role}
                                </h3>
                                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-600">
                                  <span className="flex items-center gap-1">
                                    <span className="text-blue-600">🎯</span>
                                    Target Position
                                  </span>
                                  {item.completed && (
                                    <span className="flex items-center gap-1 text-green-600">
                                      <span>✅</span>
                                      Completed
                                    </span>
                                  )}
                                </div>
                              </div>
                              <button
                                onClick={() => toggleMilestone(index)}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base w-full sm:w-auto ${
                                  item.completed
                                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                    : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                                }`}
                              >
                                {item.completed ? 'Mark Incomplete' : 'Mark Complete'}
                              </button>
                            </div>

                            <div className="space-y-6">
                              <div>
                                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                  <span className="text-green-600">🛠️</span>
                                  Skills to Learn ({item.skills_to_learn.length})
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {item.skills_to_learn.map((skill, i) => (
                                    <span key={i} className="bg-green-100 text-green-800 px-3 py-2 rounded-lg text-sm font-medium border border-green-200">
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                  <span className="text-blue-600">💼</span>
                                  Suggested Projects ({item.projects.length})
                                </h4>
                                <ul className="space-y-2">
                                  {item.projects.map((project, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                      <span className="text-blue-500 mt-1">•</span>
                                      <span>{project}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {item.certifications && item.certifications.length > 0 && (
                                <div>
                                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                    <span className="text-purple-600">🏆</span>
                                    Certifications ({item.certifications.length})
                                  </h4>
                                  <div className="flex flex-wrap gap-2">
                                    {item.certifications.map((cert, i) => (
                                      <span key={i} className="bg-purple-100 text-purple-800 px-3 py-2 rounded-lg text-sm font-medium border border-purple-200">
                                        {cert}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {item.resources && item.resources.length > 0 && (
                                <div>
                                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                    <span className="text-orange-600">📚</span>
                                    Free Learning Resources ({item.resources.length})
                                  </h4>
                                  <div className="space-y-2">
                                    {item.resources.slice(0, 3).map((resource, i) => (
                                      <a
                                        key={i}
                                        href={resource}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block text-sm text-blue-600 hover:text-blue-800 underline break-all"
                                      >
                                        {resource}
                                      </a>
                                    ))}
                                    {item.resources.length > 3 && (
                                      <p className="text-sm text-gray-500">
                                        +{item.resources.length - 3} more resources available
                                      </p>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Career Insights */}
                <div className="mt-8 p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                  <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
                    <span className="text-blue-600">💡</span>
                    Career Insights & Recommendations
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                        <span>💪</span>
                        Key Strengths
                      </h4>
                      <p className="text-sm text-gray-600">
                        Focus on leveraging your existing skills while building new competencies in high-demand areas.
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                        <span>🎯</span>
                        Next Steps
                      </h4>
                      <p className="text-sm text-gray-600">
                        Start with foundational skills and gradually progress to advanced topics in your target role.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Banner Ad */}
                <div className="mt-8 flex justify-center px-4 sm:px-0">
                  <AdBanner
                    slot="7788990011"
                    format="horizontal"
                    className="max-w-4xl w-full"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}