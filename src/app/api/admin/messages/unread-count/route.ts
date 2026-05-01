import { NextResponse } from 'next/server'
import { getLeadStats } from '@/lib/db/inquiries'

export async function GET() {
  try {
    const stats = await getLeadStats()

    return NextResponse.json({ count: stats.new || 0 })
  } catch (error) {
    console.error('Error fetching unread messages count:', error)
    return NextResponse.json({ count: 0 }, { status: 500 })
  }
}