"use client";

import { useEffect, useState } from "react";
import dynamic from 'next/dynamic'
import Image from "next/image";
import Link from "next/link";
import { CircleX } from "lucide-react";
import { getEventById } from "@/lib/actions/event.actions";
import { formatDateTime } from "@/lib/utils";

const PaystackButton = dynamic(
    () => import("react-paystack").then((mod) => mod.PaystackButton),
    { ssr: false } // disable server-side rendering
  );

const Payment = ({ params: { id }, }) => {
  const [event, setEvent] = useState(null);
  const [fees, setFees] = useState({ serviceFee: 0, paymentProcessingFee: 0, totalPrice: 0 });
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    // Fetch event details
    const fetchEvent = async () => {
      const eventData = await getEventById(id);
      setEvent(eventData);
    };

    // Fetch fees from API
    const fetchFees = async () => {
      const feeResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/paystack?eventId=${id}`, {
        cache: "no-store",
      });

      if (feeResponse.ok) {
        const { serviceFee, paymentProcessingFee, totalPrice } = await feeResponse.json();
        setFees({ serviceFee, paymentProcessingFee, totalPrice });
      }
    };

    // Fetch user details (simulate logged-in user)
    const fetchUser = async () => {
      // Simulate fetching logged-in user info
      setUser({ name: "John Doe", email: "johndoe@example.com" });
    };

    fetchEvent();
    fetchFees();
    fetchUser();
  }, [id]);

  if (!event) return(
    <div className='wrapper flex w-full h-screen justify-center items-center'>
        <p className="self-center p-medium-16 md:p-medium-18">Loading Checkout...</p>
    </div>
  ) ;

  const publicKey = "pk_live_cdcd30416956c25bd6a01347da6b88bee450c8c1";

  const componentProps = {
    email: user.email,
    amount: fees.totalPrice * 100, // Convert to kobo
    metadata: {
      name: user.name,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () => alert("Payment Successful!"),
    onClose: () => alert("Payment cancelled."),
  };

  return (
    <div className="wrapper md:max-w-4xl text-white grid grid-cols-1 gap-2 md:gap-4 justify-center items-center">
      <div className="flex flex-auto justify-between">
        <p className="p-regular-20 md:p-regular-20 text-wrap self-center">Express Ticket Checkout</p>
        <Link href={`/events/${event._id}`}>
          <CircleX width={22} height={22} className="text-white self-center h-full" />
        </Link>
      </div>

      <div className="p-4 px-5 md:px-4 border border-neutral-800 flex flex-col gap-2 md:gap-4">
        <div className="flex flex-auto justify-between">
          <p className="p-semibold-20">Total</p>
          <p className="p-semibold-20">₦{fees.totalPrice}</p>
        </div>

        <div className="flex flex-auto justify-between align-baseline">
          <div className="flex flex-col">
            <p className="p-medium-16 md:p-medium-18 text-neutral-600">Ticket</p>
            <p className="p-regular-14 md:p-regular-16">{event.category.name} Ticket x1</p>
          </div>
          <p className="p-regular-14 md:p-regular-16 self-end">₦{event.price}</p>
        </div>

        <div className="flex flex-auto justify-between">
          <div className="flex flex-col">
            <p className="p-medium-16 md:p-medium-18 text-neutral-600">Fees</p>
            <p className="p-regular-14 md:p-regular-16">Service Fee</p>
            <p className="p-regular-14 md:p-regular-16">Payment Processing Fee</p>
          </div>
          <div className="flex flex-col self-end">
            <p className="p-regular-14 md:p-regular-16 self-end">₦{fees.serviceFee}</p>
            <p className="p-regular-14 md:p-regular-16 self-end">₦{fees.paymentProcessingFee}</p>
          </div>
        </div>
      </div>

      <div className="p-4 px-5 md:px-4 border border-neutral-800 flex flex-row">
        <div
          className="sm:flex mb-0 min-h-fit bg-black mr-4 self-center justify-center items-center overflow-hidden align-middle hidden md:block"
          style={{ height: "20px" }}
        >
          <div className="box">
            <Image
              src={event.imageURL}
              alt="hero image"
              width={35}
              height={35}
              className="min-h-fit border border-0.5 border-neutral-800/40 max-h-fit h-fit object-contain object-center w-fit spin m-2"
              style={{
                maxWidth: "650px",
                width: "auto",
                height: "100%",
              }}
            />
          </div>
        </div>
        <div className="flex flex-col text-left self-center align-middle h-full">
          <p className="p-bold-16 md:p-bold-18 tracking-tight line-clamp-1">{event.title}</p>
          <p className="p-regular-16 md:p-regular-18">
            {formatDateTime(event.endDateTime).dateOnly}, by {formatDateTime(event.endDateTime).timeOnly}
          </p>
          <p className="text-neutral-600 p-regular-16 md:p-regular-18 line-clamp-1">
            {event.location}
          </p>
        </div>
      </div>

      <PaystackButton {...componentProps} className="w-full p-4 bg-blue-500 text-white" />
    </div>
  );
};

export default Payment;
