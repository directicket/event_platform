// app/api/verify-payment/route.js

import { NextResponse } from 'next/server';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Received request body:", body); // log the incoming request data

    const { reference, eventId } = body;

    if (!reference || !eventId) {
      console.log("Missing reference or eventId"); // log missing data
      return NextResponse.json({ error: 'Reference and Event ID are required' }, { status: 400 });
    }

    // Paystack verification endpoint
    const paystackVerificationUrl = `https://api.paystack.co/transaction/verify/${reference}`;

    const response = await fetch(paystackVerificationUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log("Paystack API response:", data); // log the response from Paystack

    if (!response.ok || !data.status) {
      console.log("Payment verification failed at Paystack API");
      return NextResponse.json({ error: 'Payment verification failed' }, { status: 400 });
    }

    return NextResponse.json({ status: 'success', message: 'Payment verified successfully' });

  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
