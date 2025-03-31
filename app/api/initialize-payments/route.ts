import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { getUserById } from "@/lib/actions/user.actions";
import { getEventById } from "@/lib/actions/event.actions";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function POST(req: NextRequest) {
  try {
    const { email, amount, eventId } = await req.json();

    if (!email || !amount || !eventId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Fetch event organizer's Clerk ID
    const event = await getEventById(eventId);
    if (!event || !event.organizer?._id) {
      return NextResponse.json({ error: "Invalid event or organizer" }, { status: 400 });
    }

    const userData = await getUserById(event.organizer._id);
    if (!userData) {
      return NextResponse.json({ error: "Organizer not found" }, { status: 404 });
    }

    console.log(userData.clerkId)


    // Fetch subaccount data from Redis
    const subaccountRaw = await redis.get(`user:${userData.clerkId}:subaccount`);
    const subaccountData = typeof subaccountRaw === "string" ? JSON.parse(subaccountRaw) : subaccountRaw;
    const subaccountId = subaccountData?.subaccountId; // Extract the correct value

    if (!subaccountId || typeof subaccountId !== "string") {
      return NextResponse.json(
        { error: "The organizer hasn't started accepting payments yet." },
        { status: 400 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL

    const callbackUrl = `${siteUrl}/events/${eventId}/claim-ticket`

    // Initialize Paystack payment
    const paystackResponse = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount,
        callback_url: callbackUrl,
        subaccount: subaccountId,
        metadata: { eventId },
      }),
    });

    const data = await paystackResponse.json();
    console.log("Paystack response:", paystackResponse);

    if (!paystackResponse.ok) {
      return NextResponse.json({ error: data.message || "Payment initialization failed" }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error initializing payment:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
