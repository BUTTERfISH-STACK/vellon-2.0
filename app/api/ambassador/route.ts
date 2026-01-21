import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

function generateReferralCode(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let code = ''
  const length = Math.floor(Math.random() * 3) + 6 // 6-8 chars
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Check if ambassador already exists
    const existingAmbassador = await prisma.ambassador.findUnique({
      where: { email }
    })

    if (existingAmbassador) {
      return NextResponse.json({ error: 'Already an ambassador' }, { status: 400 })
    }

    // Generate unique referral code
    let referralCode: string
    let attempts = 0
    do {
      referralCode = generateReferralCode()
      attempts++
      if (attempts > 10) {
        return NextResponse.json({ error: 'Failed to generate unique code' }, { status: 500 })
      }
    } while (await prisma.ambassador.findUnique({ where: { referral_code: referralCode } }))

    // Create ambassador
    await prisma.ambassador.create({
      data: {
        email,
        referral_code: referralCode
      }
    })

    const domain = process.env.NEXT_PUBLIC_DOMAIN || 'https://yourdomain.co'
    return NextResponse.json({
      referralLink: `${domain}?ref=${referralCode}`,
      referralCode
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}