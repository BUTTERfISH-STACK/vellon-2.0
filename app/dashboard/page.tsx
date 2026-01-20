'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

interface DashboardData {
  referralLink: string
  totalClicks: number
  paidConversions: number
  totalEarnings: number
  payoutEligible: boolean
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/dashboard')
        .then(res => res.json())
        .then(setData)
        .catch(console.error)
        .finally(() => setLoading(false))
    } else if (status === 'unauthenticated') {
      setLoading(false)
    }
  }, [status])

  if (status === 'loading' || loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!session) {
    return <div className="min-h-screen flex items-center justify-center">Please sign in</div>
  }

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center">Not an ambassador</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Vellon Ambassador Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Total Clicks</h3>
            <p className="text-2xl font-bold text-blue-600">{data.totalClicks}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Paid Conversions</h3>
            <p className="text-2xl font-bold text-green-600">{data.paidConversions}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Total Earnings</h3>
            <p className="text-2xl font-bold text-purple-600">R{data.totalEarnings}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Payout Eligible</h3>
            <p className={`text-2xl font-bold ${data.payoutEligible ? 'text-green-600' : 'text-red-600'}`}>
              {data.payoutEligible ? 'Yes' : 'No'}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Referral Link</h3>
          <p className="text-sm text-gray-600 break-all">{data.referralLink}</p>
          <button
            onClick={() => navigator.clipboard.writeText(data.referralLink)}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Copy Link
          </button>
        </div>
      </div>
    </div>
  )
}