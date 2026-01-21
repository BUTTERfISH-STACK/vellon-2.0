import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const { referral_code } = await request.json()

    if (!referral_code) {
      return NextResponse.json({ error: 'Missing referral_code' }, { status: 400 })
    }

    // Get IP address
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown'

    // Hash the IP
    const ip_hash = crypto.createHash('sha256').update(ip).digest('hex')

    // Check if ambassador exists
    const ambassador = await prisma.ambassador.findUnique({
      where: { referral_code }
    })

    if (!ambassador) {
      return NextResponse.json({ error: 'Invalid referral code' }, { status: 400 })
    }

    // Rate limit: check recent visits from same IP hash
    const recentVisits = await prisma.referralVisit.findMany({
      where: {
        referral_code,
        ip_hash,
        created_at: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // last 24 hours
        }
      }
    })

    if (recentVisits.length >= 5) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })
    }

    // Record the visit
    await prisma.referralVisit.create({
      data: {
        referral_code,
        ip_hash
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Track visit error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}