import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import QRCode from 'qrcode';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function POST(req) {
  try {
    const body = await req.json();
    console.log('Webhook received:', body);

    if (body.event !== 'charge.success') {
      return NextResponse.json({ message: 'Ignored' }, { status: 200 });
    }

    const { reference, customer, metadata } = body.data;
    if (!reference || !customer || !metadata?.eventId) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const userId = customer.id;
    const eventId = metadata.eventId;
    const userEmail = customer.email;

    // Generate a unique QR code if not already stored
    const userKey = `qr:${userId}`;
    let finalCode = await redis.hget(userKey, eventId);

    if (!finalCode) {
      const randomCode = Math.random().toString(36).substring(2, 12).toUpperCase();
      finalCode = `${userId}-${randomCode}`;
      await redis.hset(userKey, { [eventId]: finalCode });
    }

    // Generate QR code image as Data URL
    const qrCodeDataUrl = await QRCode.toDataURL(finalCode);

    // Store verified payment in Redis
    const paymentKey = `payment:reference:${reference}`;
    await redis.set(paymentKey, JSON.stringify({ userId, eventId, timestamp: Date.now() }));

    // Call send-email API
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: userEmail,
        finalCode,
        eventId,
      }),
    });

    return NextResponse.json({ message: 'Payment recorded and email sent' }, { status: 200 });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}