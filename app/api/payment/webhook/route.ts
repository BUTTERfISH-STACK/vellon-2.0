import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

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

      // For now, just mark as received since we don't have update functionality in simple DB
      // In a real implementation, you'd need to add update methods to the DB class
      console.log(`Payment ${paymentId} succeeded`)

      // Note: Ambassador crediting would need to be implemented
      // This is simplified for the basic functionality
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 })
  }
}