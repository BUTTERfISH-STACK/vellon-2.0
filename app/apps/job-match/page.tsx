'use client'

import { useState } from 'react'
import Layout from '@/components/Layout'
import AdBanner from '@/components/AdBanner'

interface JobMatch {
  job_title: string
  company: string
  location: string
  match_percentage: number
  missing_skills: string[]
  apply_link: string
  source: string
  posted_date?: string
  salary?: string
}

export default function JobMatchPage() {
  const [cvContent, setCvContent] = useState('')
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [skills, setSkills] = useState('')
  const [experience, setExperience] = useState('')
  const [preferences, setPreferences] = useState({
    industry: '',
    location: '',
    salary: ''
  })
  const [jobs, setJobs] = useState<JobMatch[]>([])
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [sortBy, setSortBy] = useState<'match' | 'company' | 'location'>('match')
  const [filterLocation, setFilterLocation] = useState('')
  const [favorites, setFavorites] = useState<Set<number>>(new Set())
  const [currentPage, setCurrentPage] = useState(1)
  const jobsPerPage = 5

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}

    if (!cvContent.trim() && !cvFile) {
      newErrors.cvContent = 'CV content or file is required'
    }

    if (!skills.trim()) {
      newErrors.skills = 'Skills are required'
    }

    if (!experience.trim()) {
      newErrors.experience = 'Years of experience is required'
    } else if (isNaN(Number(experience)) || Number(experience) < 0) {
      newErrors.experience = 'Please enter a valid number of years'
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

    // Extract text from file (basic implementation - in real app, you'd use a proper library)
    const text = await file.text()
    setCvContent(text)
  }

  const findJobs = async () => {
    if (!validateForm()) {
      return
    }

    setLoading(true)
    setErrors({})
    try {
      const response = await fetch('/api/job-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cvContent,
          skills: skills.split(',').map(s => s.trim()),
          experience,
          jobPreferences: preferences
        })
      })

      if (!response.ok) {
        throw new Error('Failed to fetch jobs')
      }

      const data = await response.json()
      setJobs(data)
      setCurrentPage(1) // Reset to first page when new results arrive
    } catch (error) {
      console.error('Error:', error)
      setErrors({ general: 'Failed to find matching jobs. Please try again.' })
    }
    setLoading(false)
  }

  const toggleFavorite = (index: number) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(index)) {
      newFavorites.delete(index)
    } else {
      newFavorites.add(index)
    }
    setFavorites(newFavorites)
  }

  const sortedAndFilteredJobs = jobs
    .filter(job => !filterLocation || job.location.toLowerCase().includes(filterLocation.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case 'match':
          return b.match_percentage - a.match_percentage
        case 'company':
          return a.company.localeCompare(b.company)
        case 'location':
          return a.location.localeCompare(b.location)
        default:
          return 0
      }
    })

  const totalPages = Math.ceil(sortedAndFilteredJobs.length / jobsPerPage)
  const startIndex = (currentPage - 1) * jobsPerPage
  const paginatedJobs = sortedAndFilteredJobs.slice(startIndex, startIndex + jobsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">🎯 Job Match Engine</h1>
            <p className="text-lg text-gray-600">Find your perfect job match using AI-powered analysis</p>
          </div>

          {/* Top Banner Ad */}
          <div className="mb-8 flex justify-center">
            <AdBanner
              slot="1234567890"
              format="horizontal"
              className="max-w-4xl w-full"
            />
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg mb-8 border border-gray-100">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <span className="text-blue-600">🔍</span>
              Find Your Perfect Job Match
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <span className="text-blue-600">📄</span>
                  CV Content *
                </label>
                <div className="space-y-3">
                  <textarea
                    value={cvContent}
                    onChange={(e) => setCvContent(e.target.value)}
                    className={`w-full h-32 p-4 border-2 rounded-lg transition-colors ${errors.cvContent ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'}`}
                    placeholder="Paste your CV content here..."
                  />
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-500">or upload file:</span>
                    <input
                      type="file"
                      accept=".pdf,.docx,.txt"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                      className="text-sm file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                    />
                    {cvFile && <span className="text-sm text-green-600 flex items-center gap-1">✓ {cvFile.name}</span>}
                  </div>
                </div>
                {errors.cvContent && <p className="text-red-500 text-sm mt-2 flex items-center gap-1">⚠️ {errors.cvContent}</p>}
                {errors.cvFile && <p className="text-red-500 text-sm mt-2 flex items-center gap-1">⚠️ {errors.cvFile}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <span className="text-green-600">🛠️</span>
                    Skills (comma-separated) *
                  </label>
                  <input
                    type="text"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    className={`w-full p-3 border-2 rounded-lg transition-colors ${errors.skills ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200'}`}
                    placeholder="JavaScript, React, Node.js"
                  />
                  {errors.skills && <p className="text-red-500 text-sm mt-2 flex items-center gap-1">⚠️ {errors.skills}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <span className="text-purple-600">📅</span>
                    Years of Experience *
                  </label>
                  <input
                    type="text"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className={`w-full p-3 border-2 rounded-lg transition-colors ${errors.experience ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'}`}
                    placeholder="3"
                  />
                  {errors.experience && <p className="text-red-500 text-sm mt-2 flex items-center gap-1">⚠️ {errors.experience}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <span className="text-indigo-600">🏢</span>
                    Industry
                  </label>
                  <input
                    type="text"
                    value={preferences.industry}
                    onChange={(e) => setPreferences({...preferences, industry: e.target.value})}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
                    placeholder="Technology"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <span className="text-orange-600">📍</span>
                    Location
                  </label>
                  <input
                    type="text"
                    value={preferences.location}
                    onChange={(e) => setPreferences({...preferences, location: e.target.value})}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors"
                    placeholder="Johannesburg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <span className="text-yellow-600">💰</span>
                    Salary Range
                  </label>
                  <input
                    type="text"
                    value={preferences.salary}
                    onChange={(e) => setPreferences({...preferences, salary: e.target.value})}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-colors"
                    placeholder="R500k - R800k"
                  />
                </div>
              </div>
              {errors.general && <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-200 flex items-center gap-2">⚠️ {errors.general}</p>}
              <button
                onClick={findJobs}
                disabled={loading}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-lg hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                {loading && <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>}
                {loading ? '🔍 Finding Jobs...' : '🚀 Find Matching Jobs'}
              </button>
            </div>
          </div>

          {/* Middle Banner Ad */}
          <div className="mb-8 flex justify-center">
            <AdBanner
              slot="0987654321"
              format="rectangle"
              className="max-w-md w-full"
            />
          </div>

          {jobs.length > 0 && (
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <span className="text-green-600">💼</span>
                  Job Matches ({sortedAndFilteredJobs.length})
                </h2>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                      <span className="text-blue-600">🔄</span>
                      Sort by:
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as 'match' | 'company' | 'location')}
                      className="border-2 border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                    >
                      <option value="match">Match %</option>
                      <option value="company">Company</option>
                      <option value="location">Location</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                      <span className="text-orange-600">🏷️</span>
                      Filter location:
                    </label>
                    <input
                      type="text"
                      value={filterLocation}
                      onChange={(e) => setFilterLocation(e.target.value)}
                      placeholder="e.g. Johannesburg"
                      className="border-2 border-gray-300 rounded-lg px-3 py-2 text-sm w-40 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                {paginatedJobs.map((job, index) => (
                  <div key={index} className="border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-blue-300 transition-all duration-300 bg-gradient-to-r from-white to-gray-50">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{job.job_title}</h3>
                          <button
                            onClick={() => toggleFavorite(index)}
                            className={`text-2xl transition-colors duration-200 ${favorites.has(index) ? 'text-red-500 hover:text-red-600' : 'text-gray-300 hover:text-red-400'}`}
                            title={favorites.has(index) ? 'Remove from favorites' : 'Add to favorites'}
                          >
                            {favorites.has(index) ? '❤️' : '🤍'}
                          </button>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-gray-600 mb-2">
                          <span className="flex items-center gap-1">
                            <span className="text-blue-600">🏢</span>
                            {job.company}
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="text-orange-600">📍</span>
                            {job.location}
                          </span>
                          {job.salary && (
                            <span className="flex items-center gap-1 text-green-600 font-medium">
                              <span>💰</span>
                              {job.salary}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className={`px-2 py-1 rounded-full font-medium ${
                            job.source === 'Adzuna' ? 'bg-blue-100 text-blue-800' :
                            job.source === 'JSearch' ? 'bg-purple-100 text-purple-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {job.source}
                          </span>
                          {job.posted_date && (
                            <span className="flex items-center gap-1">
                              <span>📅</span>
                              {new Date(job.posted_date).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-green-600 mb-1">{job.match_percentage}%</div>
                        <div className="text-sm text-gray-500 font-medium">Match Score</div>
                      </div>
                    </div>

                    {job.missing_skills.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-700 mb-2 flex items-center gap-1">
                          <span className="text-yellow-600">⚠️</span>
                          Skills to develop:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {job.missing_skills.map((skill, i) => (
                            <span key={i} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium border border-yellow-200">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <a
                      href={job.apply_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                    >
                      <span>🚀</span>
                      Apply Now
                    </a>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    ← Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 border-2 rounded-lg transition-colors ${
                        currentPage === page
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next →
                  </button>
                </div>
              )}

              {/* Bottom Banner Ad */}
              <div className="mt-8 flex justify-center">
                <AdBanner
                  slot="1122334455"
                  format="horizontal"
                  className="max-w-4xl w-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}