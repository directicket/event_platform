import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { getUserById } from "@/lib/actions/user.actions"; // Import your user fetching function

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function GET(req, { params }) {
  try {
    const { code } = params; // The code part of the URL (userId-randomCode)
    const [userId, randomCode] = code.split("-"); // Splitting it into userId and randomCode

    if (!userId || !randomCode) {
      return NextResponse.json({ error: "Invalid QR Code" }, { status: 400 });
    }

    const userKey = `qr:${userId}`;
    const storedEntries = await redis.hgetall(userKey);

    const storedCode = Object.values(storedEntries).find((code) =>
      code.endsWith(`${userId}-${randomCode}`)
    );

    // Check if the code exists
    if (!storedCode) {
      return NextResponse.json({ error: "QR Code is invalid or has already been used" }, { status: 404 });
    }

    // Fetch user data if QR code is valid
    const user = await getUserById(userId);

    // If user is found, return the user data alongside validation success
    return NextResponse.json({ 
      message: "QR Code validated successfully", 
      valid: true,
      user, // Attach user data here
    });
  } catch (error) {
    console.error("QR Code validation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
