import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/database';
import Event from '@/lib/database/models/event.model';
import Category from '@/lib/database/models/category.model'; // or wherever it's located
import { auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) throw new Error("Unauthorized");

    const body = await req.json();
    const { tagId } = body;

    if (!tagId) {
      return NextResponse.json({ error: 'Missing tagId' }, { status: 400 });
    }

    await connectToDatabase();

    const events = await Event.find({ tags: tagId })
      .populate('organizer', 'firstName lastName username')
      .populate('category', 'name')
      .populate('tags', 'name') // still use populate for display name

    return NextResponse.json({ data: events });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
