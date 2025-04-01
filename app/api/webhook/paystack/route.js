import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

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

    // Store verified payment in Redis
    const paymentKey = `payment:reference:${reference}`;
    await redis.set(paymentKey, JSON.stringify({
      userId: customer.id,
      eventId: metadata.eventId,
      timestamp: Date.now(),
    }), 
    // { ex: 86400 } // Expire in 24 hours -- commented out cuz wtf...?
); 

    return NextResponse.json({ message: 'Payment recorded' }, { status: 200 });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
