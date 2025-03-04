import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { connectToDatabase } from '@/lib/database';
import { auth } from '@clerk/nextjs';
import mongoose from 'mongoose';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    // Check Redis for stored subaccount
    const subaccount = await redis.get(`user:${userId}:subaccount`);
    const hasSubaccount = !!subaccount;

    // Connect to MongoDB and get the actual user _id
    const db = await connectToDatabase();
    const UserModel = db.model("User");
    const EventModel = db.model("Event");

    // Find the user's MongoDB ObjectId from Clerk ID
    const user = await UserModel.findOne({ clerkId: userId }).select("_id");
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    // Check if user has events
    const userHasEvent = await EventModel.exists({ organizer: user._id });

    // Determine access and default state
    if (!hasSubaccount && !userHasEvent) {
      return NextResponse.json({ success: true, status: "default" });
    }

    return NextResponse.json({ success: true, hasAccess: hasSubaccount });
  } catch (error) {
    console.error('Error in check-bank-details:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
