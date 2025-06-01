import { NextResponse } from 'next/server'
import { getUserTags } from '@/lib/actions/tag.actions'

export async function GET() {
  try {
    const tags = await getUserTags()
    return NextResponse.json({ tags }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch tags' }, { status: 500 })
  }
}
