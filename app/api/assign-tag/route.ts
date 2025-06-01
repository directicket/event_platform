import { assignTagToEvent } from '@/lib/actions/tag.actions'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { eventId, tagId } = await req.json()
    if (!eventId || !tagId) {
      return NextResponse.json({ message: 'Missing data' }, { status: 400 })
    }

    const updatedEvent = await assignTagToEvent({ eventId, tagId })

    return NextResponse.json(updatedEvent, { status: 200 })
  } catch (err) {
    console.error('API Error:', err)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
