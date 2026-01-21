import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    return NextResponse.json({ error: 'Payment not available in build mode' }, { status: 500 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to initiate payment' }, { status: 500 })
  }
}