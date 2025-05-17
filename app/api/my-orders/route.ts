import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Order from "@/lib/database/models/order.model";
import { connectToDatabase } from "@/lib/database";

export async function GET() {
  await connectToDatabase();
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const orders = await Order.find({ buyer: userId }).populate("event");

  const formatted = orders.map(order => ({
    id: order._id,
    eventTitle: order.event.title,
    eventId: order.event._id,
    createdAt: order.createdAt,
    totalAmount: order.totalAmount,
    reference: order.stripeId,
  }));

  return NextResponse.json({ orders: formatted });
}
