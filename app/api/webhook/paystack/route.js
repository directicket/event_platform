import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { connectToDatabase } from '@/lib/database';
import Event from '@/lib/database/models/event.model'; // adjust path if needed

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

    const eventId = metadata.eventId;

    // Store verified payment in Redis
    const paymentKey = `payment:reference:${reference}`;
    await redis.set(
      paymentKey,
      JSON.stringify({
        userId: customer.id,
        eventId,
        timestamp: Date.now(),
      })
    );

    // ↓↓↓ Decrement event quantity in MongoDB ↓↓↓
    await connectToDatabase();
    await Event.findByIdAndUpdate(
      eventId,
      { 
        $inc: { quantity: -1, amountSold: 1 }
      },
      { new: true }
    );

    return NextResponse.json({ message: 'Payment recorded & quantity updated' }, { status: 200 });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
