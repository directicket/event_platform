import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Event from "@/lib/database/models/event.model";
import Order from "@/lib/database/models/order.model";
import User from "@/lib/database/models/user.model";
import { connectToDatabase } from "@/lib/database";

export async function GET() {
  await connectToDatabase();
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await User.findOne({ clerkId: userId });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const orders = await Order.find({ buyer: user._id }).populate("event");

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
