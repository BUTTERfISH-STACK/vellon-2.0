'use client'

import { useState } from 'react'
import Layout from '@/components/Layout'

interface Question {
  text: string
  type: 'behavioral' | 'technical' | 'situational'
}

interface Feedback {
  question_index: number
  scores: {
    clarity: number
    confidence: number
    relevance: number
    completeness: number
  }
  suggestions: string[]
}

export default function InterviewSimulatorPage() {
  const [cvContent, setCvContent] = useState('')
  const [targetRole, setTargetRole] = useState('')
  const [industry, setIndustry] = useState('')
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<string[]>([])
  const [feedback, setFeedback] = useState<Feedback[]>([])
  const [overallScore, setOverallScore] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<'input' | 'questions' | 'feedback'>('input')

  const generateQuestions = async () => {
    if (!cvContent || !targetRole || !industry) {
      alert('Please fill in all fields')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/interview-simulator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cvContent, targetRole, industry })
      })

      const data = await response.json()
      if (data.questions) {
        setQuestions(data.questions.map((q: string, i: number) => ({
          text: q,
          type: i < 5 ? 'behavioral' : i < 10 ? 'technical' : 'situational'
        })))
        setAnswers(new Array(data.questions.length).fill(''))
        setStep('questions')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to generate questions')
    }
    setLoading(false)
  }

  const submitAnswers = async () => {
    if (answers.some(a => !a.trim())) {
      alert('Please answer all questions')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/interview-simulator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cvContent, targetRole, industry, answers })
      })

      const data = await response.json()
      if (data.feedback) {
        setFeedback(data.feedback)
        setOverallScore(data.overall_score)
        setStep('feedback')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to evaluate answers')
    }
    setLoading(false)
  }

  const reset = () => {
    setStep('input')
    setQuestions([])
    setAnswers([])
    setFeedback([])
    setOverallScore(null)
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">AI Interview Simulator</h1>

          {step === 'input' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Setup Your Interview</h2>
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
                      Target Role
                    </label>
                    <input
                      type="text"
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md"
                      placeholder="e.g., Software Engineer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Industry
                    </label>
                    <input
                      type="text"
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md"
                      placeholder="e.g., Technology"
                    />
                  </div>
                </div>
                <button
                  onClick={generateQuestions}
                  disabled={loading}
                  className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Generating...' : 'Generate Interview Questions'}
                </button>
              </div>
            </div>
          )}

          {step === 'questions' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Answer the Questions</h2>
              <div className="space-y-6">
                {questions.map((question, index) => (
                  <div key={index} className="border-b pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 text-xs rounded ${
                        question.type === 'behavioral' ? 'bg-blue-100 text-blue-800' :
                        question.type === 'technical' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {question.type}
                      </span>
                      <span className="font-medium">Question {index + 1}</span>
                    </div>
                    <p className="mb-3 text-gray-700">{question.text}</p>
                    <textarea
                      value={answers[index]}
                      onChange={(e) => {
                        const newAnswers = [...answers]
                        newAnswers[index] = e.target.value
                        setAnswers(newAnswers)
                      }}
                      className="w-full h-24 p-3 border border-gray-300 rounded-md"
                      placeholder="Your answer..."
                    />
                  </div>
                ))}
                <div className="flex gap-4">
                  <button
                    onClick={submitAnswers}
                    disabled={loading}
                    className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 disabled:opacity-50"
                  >
                    {loading ? 'Evaluating...' : 'Submit Answers'}
                  </button>
                  <button
                    onClick={reset}
                    className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700"
                  >
                    Start Over
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 'feedback' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Overall Performance</h2>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{overallScore}/100</div>
                  <p className="text-gray-600">Overall Interview Score</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Detailed Feedback</h2>
                <div className="space-y-4">
                  {feedback.map((item, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">Question {item.question_index + 1}</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{item.scores.clarity}</div>
                          <div className="text-sm text-gray-600">Clarity</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">{item.scores.confidence}</div>
                          <div className="text-sm text-gray-600">Confidence</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">{item.scores.relevance}</div>
                          <div className="text-sm text-gray-600">Relevance</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-600">{item.scores.completeness}</div>
                          <div className="text-sm text-gray-600">Completeness</div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Suggestions:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {item.suggestions.map((suggestion, i) => (
                            <li key={i} className="text-sm text-gray-700">{suggestion}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={reset}
                  className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
                >
                  Practice Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}