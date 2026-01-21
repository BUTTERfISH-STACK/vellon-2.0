'use client'

import { useState } from 'react'

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    setLoading(true)

    try {
      const res = await fetch('/api/payment/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="text-center text-2xl font-bold text-gray-900">
            Upgrade Your CV with Vellon
          </h2>
          <p className="mt-2 text-center text-gray-600">
            Vellon is the only and best CV service in South Africa. One-time payment. No subscription.
          </p>
          <p className="mt-4 text-center text-3xl font-bold text-indigo-600">
            R119.99
          </p>
        </div>
        <div className="space-y-4">
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