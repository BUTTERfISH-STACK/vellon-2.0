'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'

interface Question {
  text: string
  type: 'behavioral' | 'technical' | 'situational'
  tips: string[]
  example: string
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
  strengths: string[]
}

const questionTips = {
  behavioral: [
    "Use the STAR method: Situation, Task, Action, Result",
    "Focus on specific examples from your past experience",
    "Quantify your achievements with numbers when possible",
    "Show how you learned and grew from the experience"
  ],
  technical: [
    "Be specific about technologies and tools you've used",
    "Explain your thought process, not just the final answer",
    "Admit what you don't know and show willingness to learn",
    "Demonstrate problem-solving approach"
  ],
  situational: [
    "Think about how you'd handle hypothetical scenarios",
    "Show your decision-making process",
    "Consider company values and culture fit",
    "Balance honesty with positive outlook"
  ]
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
  const [step, setStep] = useState<'intro' | 'setup' | 'practice' | 'questions' | 'feedback'>('intro')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [showTips, setShowTips] = useState(false)
  const [timeLeft, setTimeLeft] = useState(180) // 3 minutes per question
  const [isRecording, setIsRecording] = useState(false)

  // Timer effect for questions
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (step === 'questions' && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [step, timeLeft])

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
          type: i < 5 ? 'behavioral' : i < 10 ? 'technical' : 'situational',
          tips: questionTips[i < 5 ? 'behavioral' : i < 10 ? 'technical' : 'situational'],
          example: `Example answer for ${i < 5 ? 'behavioral' : i < 10 ? 'technical' : 'situational'} questions...`
        })))
        setAnswers(new Array(data.questions.length).fill(''))
        setStep('practice')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to generate questions')
    }
    setLoading(false)
  }

  const startInterview = () => {
    setStep('questions')
    setCurrentQuestionIndex(0)
    setTimeLeft(180)
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setTimeLeft(180)
      setShowTips(false)
    } else {
      submitAnswers()
    }
  }

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setTimeLeft(180)
      setShowTips(false)
    }
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
    setStep('intro')
    setQuestions([])
    setAnswers([])
    setFeedback([])
    setOverallScore(null)
    setCurrentQuestionIndex(0)
    setShowTips(false)
    setTimeLeft(180)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <Layout>
      {/* Custom Header */}
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

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Intro Section */}
        {step === 'intro' && (
          <section className="py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="mb-12">
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  🎤 AI-Powered Interview Practice
                </div>
                <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                  Master Your
                  <span className="block text-blue-600">Interview Skills</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Practice with realistic interview questions, get detailed AI feedback, and improve your performance with personalized coaching tips.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Realistic Questions</h3>
                  <p className="text-gray-600">Behavioral, technical, and situational questions tailored to your role</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Detailed Feedback</h3>
                  <p className="text-gray-600">AI analysis of clarity, confidence, relevance, and completeness</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Practice Mode</h3>
                  <p className="text-gray-600">Step-by-step guidance with tips and examples for each question type</p>
                </div>
              </div>

              <button
                onClick={() => setStep('setup')}
                className="bg-gradient-primary text-white font-bold py-4 px-8 rounded-xl hover:shadow-glow transition-all duration-300 shadow-premium transform hover:scale-105 text-lg"
              >
                Start Interview Practice
              </button>
            </div>
          </section>
        )}

        {/* Setup Section */}
        {step === 'setup' && (
          <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Let's Get You Ready! 🎯</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Tell us a bit about yourself so we can create the perfect interview practice session
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Setup Card */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Interview Target 🎯</h3>
                      <p className="text-gray-600">This helps us generate relevant, industry-specific questions</p>
                    </div>

                    <div className="space-y-6">
                      {/* Target Role */}
                      <div>
                        <label className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-3">
                          <span className="text-2xl">💼</span>
                          What role are you preparing for?
                        </label>
                        <input
                          type="text"
                          value={targetRole}
                          onChange={(e) => setTargetRole(e.target.value)}
                          className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg"
                          placeholder="e.g., Software Engineer, Product Manager, Data Analyst..."
                        />
                        <p className="text-sm text-gray-500 mt-2">Be as specific as possible for better questions</p>
                      </div>

                      {/* Industry */}
                      <div>
                        <label className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-3">
                          <span className="text-2xl">🏢</span>
                          Which industry?
                        </label>
                        <input
                          type="text"
                          value={industry}
                          onChange={(e) => setIndustry(e.target.value)}
                          className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg"
                          placeholder="e.g., Technology, Finance, Healthcare, Marketing..."
                        />
                        <p className="text-sm text-gray-500 mt-2">This tailors questions to your field</p>
                      </div>

                      {/* CV Content - Optional */}
                      <div>
                        <label className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-3">
                          <span className="text-2xl">📄</span>
                          Your CV/Resume <span className="text-sm font-normal text-gray-500">(Optional)</span>
                        </label>
                        <textarea
                          value={cvContent}
                          onChange={(e) => setCvContent(e.target.value)}
                          className="w-full h-32 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none text-lg"
                          placeholder="Paste your CV content here for even more personalized questions... (optional)"
                        />
                        <p className="text-sm text-gray-500 mt-2">Adding your CV helps us create questions based on your actual experience</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Tips Sidebar */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                    <h4 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">💡</span>
                      Pro Tips
                    </h4>
                    <ul className="space-y-3 text-blue-800">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span className="text-sm">Be specific about your target role for better questions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span className="text-sm">CV content helps personalize questions to your experience</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span className="text-sm">You'll get 15 questions: 5 behavioral, 5 technical, 5 situational</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span className="text-sm">Each question has a 3-minute timer</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                    <h4 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">🎯</span>
                      What to Expect
                    </h4>
                    <div className="space-y-3 text-green-800">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                        <span className="text-sm">Review questions with tips</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                        <span className="text-sm">Answer with timer pressure</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                        <span className="text-sm">Get AI-powered feedback</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <button
                  onClick={() => setStep('intro')}
                  className="px-8 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-all duration-300"
                >
                  ← Back
                </button>
                <button
                  onClick={generateQuestions}
                  disabled={loading || !targetRole.trim() || !industry.trim()}
                  className="px-8 py-3 bg-gradient-primary text-white font-bold rounded-xl hover:shadow-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <span>🚀</span>
                      Start Practice
                    </>
                  )}
                </button>
              </div>

              {/* Validation Messages */}
              {(!targetRole.trim() || !industry.trim()) && (
                <div className="mt-4 text-center">
                  <p className="text-red-600 text-sm">
                    Please fill in your target role and industry to continue
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Practice Mode */}
        {step === 'practice' && (
          <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Practice Mode</h2>
                <p className="text-xl text-gray-600">Review your questions and get familiar with the format before starting</p>
              </div>

              <div className="space-y-6">
                {questions.map((question, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`px-3 py-1 text-sm rounded-full font-medium ${
                        question.type === 'behavioral' ? 'bg-blue-100 text-blue-800' :
                        question.type === 'technical' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {question.type}
                      </span>
                      <span className="text-lg font-semibold text-gray-900">Question {index + 1}</span>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed mb-4">{question.text}</p>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">💡 Tips for answering:</h4>
                      <ul className="space-y-1">
                        {question.tips.slice(0, 2).map((tip, i) => (
                          <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <button
                  onClick={startInterview}
                  className="bg-gradient-primary text-white font-bold py-4 px-8 rounded-xl hover:shadow-glow transition-all duration-300 shadow-premium transform hover:scale-105 text-lg"
                >
                  Start Interview Practice
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Questions Section */}
        {step === 'questions' && questions.length > 0 && (
          <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-900">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </span>
                  <span className={`text-lg font-mono ${timeLeft < 30 ? 'text-red-600' : 'text-gray-600'}`}>
                    {formatTime(timeLeft)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-primary h-3 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Current Question */}
              <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className={`px-4 py-2 text-sm rounded-full font-medium ${
                    questions[currentQuestionIndex].type === 'behavioral' ? 'bg-blue-100 text-blue-800' :
                    questions[currentQuestionIndex].type === 'technical' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {questions[currentQuestionIndex].type} Question
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-6 leading-relaxed">
                  {questions[currentQuestionIndex].text}
                </h3>

                <textarea
                  value={answers[currentQuestionIndex]}
                  onChange={(e) => {
                    const newAnswers = [...answers]
                    newAnswers[currentQuestionIndex] = e.target.value
                    setAnswers(newAnswers)
                  }}
                  className="w-full h-40 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none text-lg"
                  placeholder="Type your answer here..."
                />

                {/* Tips Toggle */}
                <div className="mt-6">
                  <button
                    onClick={() => setShowTips(!showTips)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <span>{showTips ? '▼' : '▶'}</span>
                    {showTips ? 'Hide' : 'Show'} Tips for Answering
                  </button>

                  {showTips && (
                    <div className="mt-4 bg-blue-50 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-3">💡 Tips for {questions[currentQuestionIndex].type} questions:</h4>
                      <ul className="space-y-2">
                        {questions[currentQuestionIndex].tips.map((tip, i) => (
                          <li key={i} className="text-blue-800 flex items-start gap-2">
                            <span className="text-blue-600 mt-1">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <button
                  onClick={prevQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="flex items-center gap-2 bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Previous
                </button>

                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-2">Question {currentQuestionIndex + 1} of {questions.length}</div>
                  <div className="flex gap-2">
                    {questions.map((_, index) => (
                      <div
                        key={index}
                        className={`w-3 h-3 rounded-full ${
                          index === currentQuestionIndex ? 'bg-blue-600' :
                          answers[index]?.trim() ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={nextQuestion}
                  disabled={!answers[currentQuestionIndex]?.trim()}
                  className="flex items-center gap-2 bg-gradient-primary text-white font-semibold py-3 px-6 rounded-xl hover:shadow-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentQuestionIndex === questions.length - 1 ? 'Submit Answers' : 'Next'} →
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Feedback Section */}
        {step === 'feedback' && (
          <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Overall Score */}
              <div className="text-center mb-12">
                <div className="inline-block bg-white rounded-2xl shadow-xl p-8">
                  <div className="text-6xl mb-4">🎉</div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Interview Complete!</h2>
                  <div className="text-6xl font-black text-blue-600 mb-2">{overallScore}/100</div>
                  <p className="text-xl text-gray-600">Your Overall Interview Score</p>
                </div>
              </div>

              {/* Detailed Feedback */}
              <div className="space-y-8">
                {feedback.map((item, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`px-3 py-1 text-sm rounded-full font-medium ${
                        questions[item.question_index]?.type === 'behavioral' ? 'bg-blue-100 text-blue-800' :
                        questions[item.question_index]?.type === 'technical' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {questions[item.question_index]?.type}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900">Question {item.question_index + 1}</h3>
                    </div>

                    <p className="text-gray-700 mb-6 italic">"{questions[item.question_index]?.text}"</p>

                    {/* Scores */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                      <div className="text-center">
                        <div className={`text-3xl font-bold mb-2 ${
                          item.scores.clarity >= 7 ? 'text-green-600' :
                          item.scores.clarity >= 4 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {item.scores.clarity}/10
                        </div>
                        <div className="text-sm text-gray-600 font-medium">Clarity</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-3xl font-bold mb-2 ${
                          item.scores.confidence >= 7 ? 'text-green-600' :
                          item.scores.confidence >= 4 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {item.scores.confidence}/10
                        </div>
                        <div className="text-sm text-gray-600 font-medium">Confidence</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-3xl font-bold mb-2 ${
                          item.scores.relevance >= 7 ? 'text-green-600' :
                          item.scores.relevance >= 4 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {item.scores.relevance}/10
                        </div>
                        <div className="text-sm text-gray-600 font-medium">Relevance</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-3xl font-bold mb-2 ${
                          item.scores.completeness >= 7 ? 'text-green-600' :
                          item.scores.completeness >= 4 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {item.scores.completeness}/10
                        </div>
                        <div className="text-sm text-gray-600 font-medium">Completeness</div>
                      </div>
                    </div>

                    {/* Suggestions */}
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-3">💡 Improvement Suggestions:</h4>
                      <ul className="space-y-2">
                        {item.suggestions.map((suggestion, i) => (
                          <li key={i} className="text-blue-800 flex items-start gap-2">
                            <span className="text-blue-600 mt-1">•</span>
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="text-center mt-12">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={reset}
                    className="bg-gradient-primary text-white font-bold py-4 px-8 rounded-xl hover:shadow-glow transition-all duration-300 shadow-premium"
                  >
                    Practice Again
                  </button>
                  <Link
                    href="/apps"
                    className="bg-gray-200 text-gray-700 font-bold py-4 px-8 rounded-xl hover:bg-gray-300 transition-all duration-300"
                  >
                    Back to Tools
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </Layout>
  )
}