'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function ReferralTracker() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const ref = searchParams.get('ref')
    if (ref) {
      // Store in localStorage
      localStorage.setItem('referralCode', ref)

      // Store in cookie (30 days)
      const expires = new Date()
      expires.setTime(expires.getTime() + 30 * 24 * 60 * 60 * 1000)
      document.cookie = `referralCode=${ref};expires=${expires.toUTCString()};path=/`

      // Optionally, track the click
      // fetch('/api/track-click', { method: 'POST', body: JSON.stringify({ referralCode: ref, ipAddress: 'client-side' }) })
    }
  }, [searchParams])

  return null
}