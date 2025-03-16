import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import QRCode from "qrcode";
import { Redis } from "@upstash/redis";

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

    const userKey = `qr:${userId}`;
    
    // First-time fetch from Redis
    let finalCode = await redis.hget(userKey, eventId);

    // If QR code doesn't exist, generate a new one
    if (!finalCode) {
      const randomCode = Math.random().toString(36).substring(2, 12).toUpperCase();
      finalCode = `${userId}-${randomCode}`;
      await redis.hset(userKey, { [eventId]: finalCode });
    }

    // Generate QR code
    const qrCodeDataUrl = await QRCode.toDataURL(finalCode);
    
    return NextResponse.json({ qrCodeDataUrl, finalCode });
  } catch (error) {
    console.error("QR Code generation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
