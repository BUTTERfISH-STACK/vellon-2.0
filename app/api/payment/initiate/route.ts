import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
// @ts-ignore
import Yoco from 'yoco'

const yoco = process.env.YOCO_SECRET_KEY?.includes('dummy')
  ? null
  : new Yoco({ secretKey: process.env.YOCO_SECRET_KEY! })

export async function POST(request: NextRequest) {
  try {
    const { email, referralCode } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Find or create user
    let user = await db.findUserByEmail(email)
    if (!user) {
      user = await db.createUser({ email })
    }

    // Create pending payment
    const payment = await db.createPayment({
      userId: user.id,
      referralCode: referralCode || undefined
    })

    // Create Yoco checkout
    if (!yoco) {
      return NextResponse.json({ error: 'Payment not available in build mode' }, { status: 500 })
    }
    const checkout = await yoco.createCheckout({
      amount: 11999, // R119.99 in cents
      currency: 'ZAR',
      successUrl: `${process.env.NEXTAUTH_URL}/payment/success?paymentId=${payment.id}`,
      cancelUrl: `${process.env.NEXTAUTH_URL}/checkout`,
      metadata: {
        paymentId: payment.id
      }
    })

    return NextResponse.json({ checkoutUrl: checkout.redirectUrl })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to initiate payment' }, { status: 500 })
  }
}