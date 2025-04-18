import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function GET(req, { params }) {
  try {
    const { code } = params;
    const [userId, randomCode] = code.split("-");

    if (!userId || !randomCode) {
      return NextResponse.json({ error: "Invalid QR Code" }, { status: 400 });
    }

    const usedKey = `used:${userId}-${randomCode}`;
    const wasUsed = await redis.get(usedKey);
    if (wasUsed) {
      return NextResponse.json({ error: "QR Code is invalid or has already been used" }, { status: 404 });
    }

    const userKey = `qr:${userId}`;
    const storedEntries = await redis.hgetall(userKey);
    const storedCode = Object.values(storedEntries).find((code) =>
      code.endsWith(`${userId}-${randomCode}`)
    );

    if (!storedCode) {
      return NextResponse.json({ error: "QR Code is invalid or has already been used" }, { status: 404 });
    }

    // Mark the code as used
    await redis.set(usedKey, true);

    return NextResponse.json({ message: "QR Code validated successfully", valid: true });
  } catch (error) {
    console.error("QR Code validation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
