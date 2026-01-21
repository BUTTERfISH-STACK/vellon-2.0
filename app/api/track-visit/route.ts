import { NextRequest, NextResponse } from 'next/server'
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

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Track visit error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}