'use client'

import { useState } from 'react'

export default function AmbassadorStatusPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<{
    referral_code: string
    total_earned: number
    total_sales: number
    referral_link: string
  } | null>(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setData(null)

    try {
      const res = await fetch(`/api/ambassador/status?email=${encodeURIComponent(email)}`)
      const result = await res.json()

      if (res.ok) {
        setData(result)
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Ambassador Status
          </h2>
        </div>
        {!data ? (
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
                placeholder="Enter your email"
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
                {loading ? 'Loading...' : 'Check Status'}
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-8 space-y-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Your Ambassador Stats</h3>
              <div className="space-y-2">
                <p><strong>Earnings:</strong> R{(data.total_earned / 100).toFixed(2)}</p>
                <p><strong>Total Sales:</strong> {data.total_sales}</p>
                <p><strong>Referral Link:</strong></p>
                <p className="text-sm text-gray-600 break-all">{data.referral_link}</p>
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Payout Rules</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Minimum payout: R300</li>
                <li>• Payouts: Manual EFT</li>
                <li>• Frequency: Monthly</li>
                <li>• Self-referrals blocked</li>
              </ul>
            </div>
            <button
              onClick={() => setData(null)}
              className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Check Another Email
            </button>
          </div>
        )}
        {error && (
          <p className="text-red-600 text-center">{error}</p>
        )}
      </div>
    </div>
  )
}