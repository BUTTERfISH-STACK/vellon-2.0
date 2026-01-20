'use client'

import { useState } from 'react'

export default function AmbassadorPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ referralLink?: string; referralCode?: string; error?: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    try {
      const res = await fetch('/api/ambassador', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await res.json()

      if (res.ok) {
        setResult(data)
      } else {
        setResult({ error: data.error })
      }
    } catch (error) {
      setResult({ error: 'Something went wrong' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Become an Ambassador
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Earn R35 every time someone upgrades their CV.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Become Ambassador'}
            </button>
          </div>
        </form>
        {result && (
          <div className="mt-8">
            {result.error ? (
              <p className="text-red-600 text-center">{result.error}</p>
            ) : (
              <div className="text-center">
                <p className="text-green-600 mb-4">Success! Your referral link:</p>
                <p className="text-sm text-gray-600 break-all">{result.referralLink}</p>
                <p className="text-xs text-gray-500 mt-2">Share this link to start earning!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}