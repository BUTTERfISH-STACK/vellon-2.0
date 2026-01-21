import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const ambassador = await prisma.ambassador.findUnique({
      where: { email }
    })

    if (!ambassador) {
      return NextResponse.json({ error: 'Ambassador not found' }, { status: 404 })
    }

    // Count total sales (purchases with this referral_code)
    const totalSales = await prisma.purchase.count({
      where: { referral_code: ambassador.referral_code }
    })

    const domain = process.env.NEXT_PUBLIC_DOMAIN || 'https://yourdomain.co'
    const referralLink = `${domain}?ref=${ambassador.referral_code}`

    return NextResponse.json({
      referral_code: ambassador.referral_code,
      total_earned: ambassador.total_earned,
      total_sales: totalSales,
      referral_link: referralLink
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}