import { NextRequest, NextResponse } from 'next/server'
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

      console.log(`Payment ${paymentReference} succeeded for purchase ${purchaseId}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 })
  }
}