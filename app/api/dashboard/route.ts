import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { ambassador: { include: { referralClicks: true, payments: true } } }
  })

  if (!user?.ambassador) {
    return NextResponse.json({ error: 'Not an ambassador' }, { status: 403 })
  }

  const ambassador = user.ambassador

  const totalClicks = ambassador.referralClicks.length
  const paidConversions = ambassador.payments.filter(p => p.status === 'PAID').length
  const totalEarnings = ambassador.totalEarnings
  const payoutEligible = totalEarnings >= 300

  return NextResponse.json({
    referralLink: `https://velloncareers.co.za/?ref=${ambassador.referralCode}`,
    totalClicks,
    paidConversions,
    totalEarnings,
    payoutEligible
  })
}