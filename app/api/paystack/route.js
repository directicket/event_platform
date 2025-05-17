import { NextResponse } from 'next/server';
import { getEventById } from '@/lib/actions/event.actions'; // fetches event info from the db

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get('eventId');

    if (!eventId) {
      return NextResponse.json({ error: 'Event ID is required' }, { status: 400 });
    }

    const event = await getEventById(eventId);

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    const price = Number(event.price);

    // Calculate fees
    const serviceFee = Math.ceil(price * 0.075); // 7.5% service fee
    const paymentProcessingFee = Math.ceil(price * 0.015 + 100); // 1.5% + no flat fee anymore!
    const totalPrice = price + serviceFee + paymentProcessingFee;

    return NextResponse.json({
      serviceFee,
      paymentProcessingFee,
      totalPrice,
      event,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
