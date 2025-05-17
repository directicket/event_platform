"use client";

import { useEffect, useState } from "react";

type Order = {
  id: string;
  eventTitle: string;
  eventId: string;
  createdAt: string;
  totalAmount: string;
  reference: string;
};

export default function Tickets() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/my-orders", { cache: "no-store" });
        const data = await res.json();
        setOrders(data.orders);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading your tickets...</p>;
  if (!orders.length) return <p className='text-white'>No tickets found.</p>;

  return (
    <div className="grid gap-4">
      {orders.map(order => (
        <div key={order.id} className="rounded-xl border p-4 shadow-sm text-white">
          <h3 className="text-lg font-semibold">{order.eventTitle}</h3>
          <p className="text-sm text-muted-foreground">
            Bought on {new Date(order.createdAt).toLocaleString()}
          </p>
          <p className="text-sm">Reference: {order.reference}</p>
          <p className="text-sm">Amount: ₦{order.totalAmount}</p>
          <a
            href={`/events/${order.eventId}/payment-success?reference=${order.reference}&txref=${order.reference}`}
            className="text-blue-600 underline mt-2 inline-block"
          >
            View Ticket →
          </a>
        </div>
      ))}
    </div>
  );
}
