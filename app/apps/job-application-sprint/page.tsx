'use client'

import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'

type Client = {
  id: string
  status: string
  name: string
  email: string
  desiredTitles: string[]
  skills: string[]
  cvText: string
}

type Job = {
  id: string
  title: string
  company: string
  location: string
  platform: string
  applicationLink: string
  matchScore: number
  notes: string
}

type Application = {
  id: string
  jobId: string
  coverLetter: string
  recruiterPitch: string
  screeningAnswers: any
}

export default function JobApplicationSprintPage() {
  const [client, setClient] = useState<Client | null>(null)
  const [jobs, setJobs] = useState<Job[]>([])
  const [applications, setApplications] = useState<Application[]>([])
  const [currentPhase, setCurrentPhase] = useState('intake')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Intake form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    desiredTitles: [] as string[],
    industry: '',
    workPreference: '',
    yearsExperience: '',
    skills: [] as string[],
    linkedinUrl: '',
    countriesToApply: [] as string[],
    consent: false,
    cv: null as File | null,
  })

  const phases = [
    { id: 'intake', name: 'Client Intake', completed: !!client },
    { id: 'cv_optimize', name: 'CV Optimization', completed: client?.status === 'cv_optimized' || client?.status === 'jobs_sourced' || client?.status === 'applications_prepared' || client?.status === 'completed' },
    { id: 'job_sourcing', name: 'Job Sourcing', completed: client?.status === 'jobs_sourced' || client?.status === 'applications_prepared' || client?.status === 'completed' },
    { id: 'application_prep', name: 'Application Prep', completed: client?.status === 'applications_prepared' || client?.status === 'completed' },
    { id: 'submission', name: 'Human Submission', completed: client?.status === 'completed' },
  ]

  useEffect(() => {
    if (client) {
      setCurrentPhase(client.status)
    }
  }, [client])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData(prev => ({ ...prev, cv: file }))
  }

  const handleArrayChange = (name: string, value: string) => {
    const array = value.split(',').map(s => s.trim()).filter(s => s)
    setFormData(prev => ({ ...prev, [name]: array }))
  }

  const handleIntakeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const submitData = new FormData()
    submitData.append('name', formData.name)
    submitData.append('email', formData.email)
    submitData.append('location', formData.location)
    submitData.append('desiredTitles', JSON.stringify(formData.desiredTitles))
    submitData.append('industry', formData.industry)
    submitData.append('workPreference', formData.workPreference)
    submitData.append('yearsExperience', formData.yearsExperience)
    submitData.append('skills', JSON.stringify(formData.skills))
    submitData.append('linkedinUrl', formData.linkedinUrl)
    submitData.append('countriesToApply', JSON.stringify(formData.countriesToApply))
    submitData.append('consent', formData.consent.toString())
    if (formData.cv) {
      submitData.append('cv', formData.cv)
    }

    try {
      const response = await fetch('/api/job-application-sprint/intake', {
        method: 'POST',
        body: submitData,
      })

      const data = await response.json()
      if (data.success) {
        setClient({ 
          id: data.clientId, 
          status: 'intake', 
          name: formData.name,
          email: formData.email,
          desiredTitles: formData.desiredTitles,
          skills: formData.skills,
          cvText: data.cvText || ''
        })
        setCurrentPhase('cv_optimize')
      } else {
        setError(data.error || 'Submission failed')
      }
    } catch (err) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  const handlePhaseAction = async (phase: string) => {
    if (!client) return

    setLoading(true)
    setError('')

    let endpoint = ''
    if (phase === 'cv_optimize') endpoint = '/api/job-application-sprint/cv-optimize'
    else if (phase === 'job_sourcing') endpoint = '/api/job-application-sprint/job-sourcing'
    else if (phase === 'application_prep') endpoint = '/api/job-application-sprint/application-prep'

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId: client.id }),
      })

      const data = await response.json()
      if (data.success) {
        if (phase === 'cv_optimize') {
          setClient(prev => prev ? { ...prev, status: 'cv_optimized', cvText: data.optimizedCV } : null)
          setCurrentPhase('job_sourcing')
        } else if (phase === 'job_sourcing') {
          setJobs(data.jobs)
          setClient(prev => prev ? { ...prev, status: 'jobs_sourced' } : null)
          setCurrentPhase('application_prep')
        } else if (phase === 'application_prep') {
          setApplications(data.applications)
          setClient(prev => prev ? { ...prev, status: 'applications_prepared' } : null)
          setCurrentPhase('submission')
        }
      } else {
        setError(data.error || 'Action failed')
      }
    } catch (err) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black text-gray-900 mb-4">Job Application Sprint</h1>
            <p className="text-xl text-gray-600">End-to-end job application assistance</p>
          </div>

          {/* Phase Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              {phases.map((phase, index) => (
                <div key={phase.id} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    phase.completed ? 'bg-green-500 text-white' : currentPhase === phase.id ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                  <span className={`ml-2 text-sm ${phase.completed ? 'text-green-600' : currentPhase === phase.id ? 'text-blue-600' : 'text-gray-500'}`}>
                    {phase.name}
                  </span>
                  {index < phases.length - 1 && <div className="w-12 h-1 bg-gray-300 mx-4"></div>}
                </div>
              ))}
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {currentPhase === 'intake' && !client && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Phase 1: Client Intake & Validation</h2>
              <form onSubmit={handleIntakeSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location (City, Country)</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Desired Job Titles (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.desiredTitles.join(', ')}
                    onChange={(e) => handleArrayChange('desiredTitles', e.target.value)}
                    placeholder="e.g. Software Engineer, Full Stack Developer"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                    <input
                      type="text"
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Work Preference</label>
                    <select
                      name="workPreference"
                      value={formData.workPreference}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select...</option>
                      <option value="remote">Remote</option>
                      <option value="hybrid">Hybrid</option>
                      <option value="on-site">On-site</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
                    <input
                      type="number"
                      name="yearsExperience"
                      value={formData.yearsExperience}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Skills (comma-separated)</label>
                    <input
                      type="text"
                      value={formData.skills.join(', ')}
                      onChange={(e) => handleArrayChange('skills', e.target.value)}
                      placeholder="e.g. JavaScript, React, Node.js"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn URL (optional)</label>
                  <input
                    type="url"
                    name="linkedinUrl"
                    value={formData.linkedinUrl}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Countries to Apply In (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.countriesToApply.join(', ')}
                    onChange={(e) => handleArrayChange('countriesToApply', e.target.value)}
                    placeholder="e.g. USA, Canada, UK"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload CV (PDF or DOCX)</label>
                  <input
                    type="file"
                    accept=".pdf,.docx"
                    onChange={handleFileChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.consent}
                      onChange={(e) => setFormData(prev => ({ ...prev, consent: e.target.checked }))}
                      required
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">I consent to the processing of my data for job application assistance</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Start Job Application Sprint'}
                </button>
              </form>
            </div>
          )}

          {client && currentPhase === 'cv_optimize' && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Phase 2: CV Optimization</h2>
              <p className="mb-4">Your CV has been optimized for ATS systems and your target role.</p>
              <button
                onClick={() => handlePhaseAction('cv_optimize')}
                disabled={loading}
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Optimizing...' : 'Optimize CV'}
              </button>
            </div>
          )}

          {client && currentPhase === 'job_sourcing' && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Phase 3: Job Sourcing</h2>
              <p className="mb-4">Sourcing 30-50 relevant jobs from approved platforms.</p>
              <button
                onClick={() => handlePhaseAction('job_sourcing')}
                disabled={loading}
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Sourcing Jobs...' : 'Source Jobs'}
              </button>
            </div>
          )}

          {client && currentPhase === 'application_prep' && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Phase 4: Application Preparation</h2>
              <p className="mb-4">Preparing custom cover letters and answers for each job.</p>
              <button
                onClick={() => handlePhaseAction('application_prep')}
                disabled={loading}
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Preparing Applications...' : 'Prepare Applications'}
              </button>
            </div>
          )}

          {client && currentPhase === 'submission' && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Phase 5: Human Submission Support</h2>
              <p className="mb-4">Ready for human submission. Jobs and applications prepared.</p>
              <div className="space-y-4">
                {applications.map((app, index) => {
                  const job = jobs.find(j => j.id === app.jobId)
                  return (
                    <div key={app.id} className="border border-gray-200 rounded p-4">
                      <h3 className="font-bold">{job?.title} at {job?.company}</h3>
                      <p>Match Score: {job?.matchScore}%</p>
                      <a href={job?.applicationLink} target="_blank" className="text-blue-600 underline">Apply Link</a>
                      <details className="mt-2">
                        <summary className="cursor-pointer">View Application Materials</summary>
                        <div className="mt-2 space-y-2">
                          <div>
                            <strong>Cover Letter:</strong>
                            <pre className="whitespace-pre-wrap text-sm bg-gray-100 p-2 rounded">{app.coverLetter}</pre>
                          </div>
                          <div>
                            <strong>Recruiter Pitch:</strong>
                            <p className="text-sm bg-gray-100 p-2 rounded">{app.recruiterPitch}</p>
                          </div>
                          <div>
                            <strong>Screening Answers:</strong>
                            <ul className="text-sm bg-gray-100 p-2 rounded">
                              {Object.entries(app.screeningAnswers).map(([key, value]) => (
                                <li key={key}>{key}: {value as string}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </details>
                      <button className="mt-2 bg-green-600 text-white py-1 px-3 rounded text-sm">Mark as Submitted</button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}