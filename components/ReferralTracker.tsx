'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function ReferralTracker() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const ref = searchParams.get('ref')
    if (ref) {
      // Store in cookie (30 days)
      const expires = new Date()
      expires.setTime(expires.getTime() + 30 * 24 * 60 * 60 * 1000)
      document.cookie = `vellon_ref=${ref};expires=${expires.toUTCString()};path=/`

      // Track the visit
      fetch('/api/track-visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ referral_code: ref })
      }).catch(console.error)
    }
  }, [searchParams])

  return null
}