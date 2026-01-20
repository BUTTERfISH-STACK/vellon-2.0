'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CheckoutPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Pre-fill email if logged in, but for now, leave empty
  }, [])

  const handlePayment = async () => {
    if (!email) {
      alert('Please enter your email')
      return
    }

    setLoading(true)

    // Get referral code from localStorage or cookie
    const referralCode = localStorage.getItem('referralCode') || getCookie('referralCode')

    try {
      const res = await fetch('/api/payment/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, referralCode })
      })

      const data = await res.json()

      if (res.ok) {
        // Redirect to Yoco checkout
        window.location.href = data.checkoutUrl
      } else {
        alert(data.error || 'Failed to initiate payment')
      }
    } catch (error) {
      alert('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(';').shift()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="text-center text-2xl font-bold text-gray-900">
            Upgrade Your CV
          </h2>
          <p className="mt-2 text-center text-gray-600">
            One-time payment. No subscription.
          </p>
          <p className="mt-4 text-center text-3xl font-bold text-indigo-600">
            R119.99
          </p>
        </div>
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Upgrade CV — R119.99 (Once-off)'}
          </button>
        </div>
      </div>
    </div>
  )
}