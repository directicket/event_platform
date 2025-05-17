import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import QRCode from 'qrcode';
import { Redis } from '@upstash/redis';
import { getEventById } from '@/lib/actions/event.actions';
import Order from "@/lib/database/models/order.model"
import { connectToDatabase } from '@/lib/database';

await connectToDatabase();

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
    const { reference, eventId } = body;

    //get event details:
    const event = await getEventById(eventId);
    if (!event) throw new Error("Event data is missing");
    
    const eventDate = new Date(event.expiryDate)

    //get ttl time:
    const ttl = Math.floor((eventDate.getTime() - Date.now()) / 1000)

    if (!reference) {
      return NextResponse.json({ error: 'Reference is required' }, { status: 400 });
    }

    const qrKey = `qr:${userId}-${reference}`;
    
    // Fetch user's existing QR codes
    const existingQR = await redis.get(qrKey)

    if (existingQR) {
      // Return existing QR code
      const qrCodeDataUrl = await QRCode.toDataURL(existingQR);
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
    const finalCode = `https://directicket.live/validate/${userId}-${randomCode}`;

    // Generate QR code
    const qrCodeDataUrl = await QRCode.toDataURL(finalCode);
    const base64Data = qrCodeDataUrl.split(',')[1];
    const imageBuffer = Buffer.from(base64Data, 'base64');

    // Store in Redis atomically
    await redis.set(qrKey, finalCode, { ex: ttl });

    // Only create order if it doesn't already exist
    const existingOrder = await Order.findOne({ stripeId: reference });
    if (!existingOrder) {
      await Order.create({
        stripeId: reference,
        totalAmount: (data.data.amount / 100).toFixed(2), // Paystack returns amount in kobo
        event: eventId,
        buyer: userId,
      });
    }


    return new Response(imageBuffer, { headers: { 'Content-Type': 'image/png' } });
  } catch (error) {
    console.error('QR Code generation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
