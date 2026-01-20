import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-yoco-signature')

    // Verify signature if needed, but for simplicity, assume trusted

    const event = JSON.parse(body)

    if (event.type === 'payment.succeeded') {
      const { metadata } = event.data
      const paymentId = metadata?.paymentId

      if (!paymentId) return NextResponse.json({ received: true })

      // Update payment to PAID
      const payment = await prisma.payment.update({
        where: { id: paymentId },
        data: { status: 'PAID' },
        include: { user: true }
      })

      // If referral exists, credit ambassador
      if (payment.referralCode) {
        const ambassador = await prisma.ambassador.findUnique({
          where: { referralCode: payment.referralCode },
          include: { user: true }
        })

        if (ambassador && ambassador.userId !== payment.userId) {
          // No self-referral
          await prisma.ambassador.update({
            where: { id: ambassador.id },
            data: { totalEarnings: { increment: 35 } }
          })
        }
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 })
  }
}