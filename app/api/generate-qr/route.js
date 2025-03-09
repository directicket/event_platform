import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import QRCode from 'qrcode';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function POST(req) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { reference } = body;

    if (!reference) {
      return NextResponse.json({ error: 'Reference is required' }, { status: 400 });
    }

    const userKey = `qr:${userId}`;
    
    // Fetch user's existing QR codes
    const existingQRs = await redis.hgetall(userKey) || {};

    if (existingQRs[reference]) {
      // Return existing QR code
      const qrCodeDataUrl = await QRCode.toDataURL(existingQRs[reference]);
      const base64Data = qrCodeDataUrl.split(',')[1];
      const imageBuffer = Buffer.from(base64Data, 'base64');
      return new Response(imageBuffer, { headers: { 'Content-Type': 'image/png' } });
    }

    // Verify payment status from Paystack
    const paystackVerificationUrl = `https://api.paystack.co/transaction/verify/${reference}`;
    const response = await fetch(paystackVerificationUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (!response.ok || !data.status || data.data.status !== 'success') {
      return NextResponse.json({ error: 'Payment verification failed' }, { status: 400 });
    }

    // Generate a unique 10-character code
    const randomCode = Math.random().toString(36).substring(2, 12).toUpperCase();
    const finalCode = `${userId}-${randomCode}`;

    // Generate QR code
    const qrCodeDataUrl = await QRCode.toDataURL(finalCode);
    const base64Data = qrCodeDataUrl.split(',')[1];
    const imageBuffer = Buffer.from(base64Data, 'base64');

    // Store in Redis atomically
    await redis.hset(userKey, { [reference]: finalCode });

    return new Response(imageBuffer, { headers: { 'Content-Type': 'image/png' } });
  } catch (error) {
    console.error('QR Code generation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
