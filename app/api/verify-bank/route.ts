// app/api/verify-bank/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { accountNumber, bankCode } = await req.json();
    if (!accountNumber || !bankCode) {
      return NextResponse.json({ error: "Missing account details" }, { status: 400 });
    }

    const paystackResponse = await fetch(`https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    });

    const data = await paystackResponse.json();
    if (!data.status) {
      return NextResponse.json({ error: "Invalid account details" }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
