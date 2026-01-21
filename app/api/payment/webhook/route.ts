import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-yoco-signature')

    // Verify signature
    const secret = process.env.YOCO_WEBHOOK_SECRET
    if (secret && signature) {
      const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(body, 'utf8')
        .digest('hex')

      if (signature !== expectedSignature) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
      }
    }

    const event = JSON.parse(body)

    if (event.type === 'payment.succeeded') {
      const paymentReference = event.data.paymentReference
      const purchaseId = event.data.metadata?.purchaseId

      if (!paymentReference || !purchaseId) return NextResponse.json({ received: true })

      // Find purchase by id
      const purchase = await prisma.purchase.findUnique({
        where: { id: purchaseId }
      })

      if (!purchase) {
        console.error(`Purchase not found for id: ${purchaseId}`)
        return NextResponse.json({ received: true })
      }

      // Update purchase with payment_reference
      await prisma.purchase.update({
        where: { id: purchaseId },
        data: { payment_reference: paymentReference }
      })

      console.log(`Payment ${paymentReference} succeeded for purchase ${purchase.id}`)

      // If referral_code exists, add commission to ambassador
      if (purchase.referral_code) {
        const ambassador = await prisma.ambassador.findUnique({
          where: { referral_code: purchase.referral_code }
        })

        if (ambassador) {
          await prisma.ambassador.update({
            where: { id: ambassador.id },
            data: { total_earned: { increment: 3500 } }
          })
          console.log(`Added R35 to ambassador ${ambassador.email}`)
        }
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 })
  }
}