import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const reference = searchParams.get('reference');

    if (!reference) {
      return NextResponse.json({ error: 'Reference is required' }, { status: 400 });
    }

    // Check Redis for the stored reference
    const paymentStatus = await redis.get(`payment:reference:${reference}`);

    if (!paymentStatus) {
      return NextResponse.json({ status: 'pending' });
    }

    return NextResponse.json({ status: 'verified' });
  } catch (error) {
    console.error('Payment status check error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
