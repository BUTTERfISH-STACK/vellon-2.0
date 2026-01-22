'use client'

import { useState } from 'react'
import Layout from '@/components/Layout'

interface JobMatch {
  job_title: string
  company: string
  location: string
  match_percentage: number
  missing_skills: string[]
  apply_link: string
}

export default function JobMatchPage() {
  const [cvContent, setCvContent] = useState('')
  const [skills, setSkills] = useState('')
  const [experience, setExperience] = useState('')
  const [preferences, setPreferences] = useState({
    industry: '',
    location: '',
    salary: ''
  })
  const [jobs, setJobs] = useState<JobMatch[]>([])
  const [loading, setLoading] = useState(false)

  const findJobs = async () => {
    if (!cvContent) {
      alert('Please provide your CV content')
      return
    }

    setLoading(true)
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

      const data = await response.json()
      setJobs(data)
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to find matching jobs')
    }
    setLoading(false)
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Job Match Engine</h1>

          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-xl font-semibold mb-4">Find Your Perfect Job Match</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CV Content
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
                    Skills (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="JavaScript, React, Node.js"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience
                  </label>
                  <input
                    type="text"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="3"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry
                  </label>
                  <input
                    type="text"
                    value={preferences.industry}
                    onChange={(e) => setPreferences({...preferences, industry: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="Technology"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={preferences.location}
                    onChange={(e) => setPreferences({...preferences, location: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="Johannesburg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Salary Range
                  </label>
                  <input
                    type="text"
                    value={preferences.salary}
                    onChange={(e) => setPreferences({...preferences, salary: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="R500k - R800k"
                  />
                </div>
              </div>
              <button
                onClick={findJobs}
                disabled={loading}
                className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? 'Finding Jobs...' : 'Find Matching Jobs'}
              </button>
            </div>
          </div>

          {jobs.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Job Matches ({jobs.length})</h2>
              <div className="space-y-4">
                {jobs.map((job, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{job.job_title}</h3>
                        <p className="text-gray-600">{job.company} • {job.location}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">{job.match_percentage}%</div>
                        <div className="text-sm text-gray-500">Match</div>
                      </div>
                    </div>

                    {job.missing_skills.length > 0 && (
                      <div className="mb-3">
                        <p className="text-sm text-gray-700 mb-1">Missing Skills:</p>
                        <div className="flex flex-wrap gap-2">
                          {job.missing_skills.map((skill, i) => (
                            <span key={i} className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
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
                      className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
                    >
                      Apply Now
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}