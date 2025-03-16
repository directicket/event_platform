import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { accountNumber, bankCode, bankName, name } = await req.json();
    if (!accountNumber || !bankCode || !bankName) {
      return NextResponse.json({ error: "Missing required bank details" }, { status: 400 });
    }

    // Fetch user details from Clerk
    const userResponse = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
      headers: { Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}` },
    });

    if (!userResponse.ok) {
      return NextResponse.json({ error: "Failed to fetch user details" }, { status: 500 });
    }

    const user = await userResponse.json();
    const userName = name || "Unknown User"; // Use name from frontend
    const userEmail = user.email_addresses?.[0]?.email_address || "";

    // Create Paystack subaccount
    const paystackResponse = await fetch("https://api.paystack.co/subaccount", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        business_name: userName,
        settlement_bank: bankCode,
        account_number: accountNumber,
        percentage_charge: 8.256880733944953,
        primary_contact_email: userEmail,
      }),
    });

    const paystackData = await paystackResponse.json();

    if (!paystackResponse.ok) {
      return NextResponse.json({ error: paystackData.message || "Failed to create subaccount" }, { status: 500 });
    }

    const subaccountId = paystackData.data.subaccount_code;

    // Store in Redis
    await redis.set(`user:${userId}:subaccount`, JSON.stringify({
      subaccountId,
      accountNumber,
      bankCode,
      bankName,
      createdAt: new Date().toISOString(),
    }));

    return NextResponse.json({ subaccountId, userId });
  } catch (error) {
    console.error("Error creating subaccount:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
