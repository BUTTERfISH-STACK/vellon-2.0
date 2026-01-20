import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { randomBytes } from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
      include: { ambassador: true }
    })

    if (existingUser?.ambassador) {
      return NextResponse.json({ error: 'Already an ambassador' }, { status: 400 })
    }

    let userId: string

    if (!existingUser) {
      // Create user
      const newUser = await prisma.user.create({
        data: {
          email,
          role: 'AMBASSADOR'
        }
      })
      userId = newUser.id
    } else {
      // Update role if not already ambassador
      if (existingUser.role !== 'AMBASSADOR') {
        await prisma.user.update({
          where: { id: existingUser.id },
          data: { role: 'AMBASSADOR' }
        })
      }
      userId = existingUser.id
    }

    // Generate unique referral code
    const referralCode = randomBytes(8).toString('hex')

    // Create ambassador
    await prisma.ambassador.create({
      data: {
        userId,
        referralCode
      }
    })

    return NextResponse.json({
      referralLink: `https://velloncareers.co.za/?ref=${referralCode}`,
      referralCode
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}