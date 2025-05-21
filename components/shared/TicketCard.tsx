"use client";

import { getEventById } from "@/lib/actions/event.actions";
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
        const event = getEventById(data.orders.eventId)
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  

  if (loading) return <p className='text-white h-screen text-left w-screen p-regular-16'>Please wait, your tickets are loading...</p>;
  if (!orders.length) return <p className='text-neutral-400 h-screen text-left w-screen p-regular-20'>No tickets found.</p>;

  return (
    <div className="grid gap-4 mt-4">
      {orders.map(order => (
        <div key={order.id} className="rounded-md border border-neutral-800 p-4 text-white">
          <h3 className="text-lg font-semibold">{order.eventTitle}</h3>
          
          <div className='flex flex-col gap-1'>
            <div className='flex flex-row justify-between text-lime'>
              <p className="text-sm">₦{order.totalAmount}</p>
              <p className="text-sm">Ref: {order.reference}</p>
            </div>
            <hr className='border-0.5 border border-neutral-700/80 border-dashed'/>
            <p className="text-sm text-neutral-600">
            Bought on {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>

          
          <a
            href={`/events/${order.eventId}/payment-success?reference=${order.reference}&txref=${order.reference}`}
            className="text-lime hover:no-underline underline mt-2 inline-block"
          >
            View Ticket →
          </a>
        </div>
      ))}
    </div>
  );
}
