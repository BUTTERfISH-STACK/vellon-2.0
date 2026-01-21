import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
// @ts-ignore
import Yoco from 'yoco'
import { randomUUID } from 'crypto'

const yoco = process.env.YOCO_SECRET_KEY?.includes('dummy')
  ? null
  : new Yoco({ secretKey: process.env.YOCO_SECRET_KEY! })

export async function POST(request: NextRequest) {
  try {
    // Read referral cookie
    const referralCode = request.cookies.get('vellon_ref')?.value

    // Generate payment reference
    const paymentReference = randomUUID()

    // Create pending purchase
    const purchase = await prisma.purchase.create({
      data: {
        payment_reference: paymentReference,
        referral_code: referralCode || null,
        ambassador_commission: referralCode ? 3500 : 0
      }
    })

    // Create Yoco checkout
    if (!yoco) {
      return NextResponse.json({ error: 'Payment not available in build mode' }, { status: 500 })
    }

    const domain = process.env.NEXT_PUBLIC_DOMAIN || 'https://yourdomain.co'
    const checkout = await yoco.createCheckout({
      amount: 11999, // R119.99 in cents
      currency: 'ZAR',
      successUrl: `${domain}/payment/success?purchaseId=${purchase.id}`,
      cancelUrl: `${domain}/checkout`,
      metadata: {
        purchaseId: purchase.id
      }
    })

    return NextResponse.json({ checkoutUrl: checkout.redirectUrl })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to initiate payment' }, { status: 500 })
  }
}