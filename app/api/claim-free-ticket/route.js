import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import QRCode from "qrcode";
import { Redis } from "@upstash/redis";
import { getEventById } from '@/lib/actions/event.actions';
import Order from "@/lib/database/models/order.model"
import User from "@/lib/database/models/user.model"
import { connectToDatabase } from '@/lib/database';

await connectToDatabase();

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function POST(req) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { eventId } = body;

    if (!eventId) {
      return NextResponse.json({ error: "Event ID is required" }, { status: 400 });
    }

    //get event details:
    const event = await getEventById(eventId);
    if (!event) throw new Error("Event data is missing");
    
    const eventDate = new Date(event.expiryDate)

    //get ttl time:
    const ttl = Math.floor((eventDate.getTime() - Date.now()) / 1000)

    const qrKey = `qr:${userId}-${eventId}`;
    
    // First-time fetch from Redis
    let finalCode = await redis.get(qrKey);

    // If QR code doesn't exist, generate a new one
    if (!finalCode) {
      const randomCode = Math.random().toString(36).substring(2, 12).toUpperCase();
      finalCode = `https://directicket.live/validate/${userId}-${randomCode}`;
      await redis.set(qrKey, finalCode, { ex: ttl } );
    }

    // Generate QR code
    const qrCodeDataUrl = await QRCode.toDataURL(finalCode);

        // Only create order if it doesn't already exist
    const existingOrder = await Order.findOne({ stripeId: reference });
    if (!existingOrder) {
      const user = await User.findOne({ clerkId: userId })

      if (!user) {
        throw new Error("User not found")
      }

      await Order.create({
        stripeId: reference,
        totalAmount: (data.data.amount / 100).toFixed(2), // Paystack returns amount in kobo
        event: eventId,
        buyer: user._id,
      });
    }
    
    return NextResponse.json({ qrCodeDataUrl, finalCode });
  } catch (error) {
    console.error("QR Code generation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
