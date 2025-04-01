"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { formatDateTime } from "@/lib/utils";
import { CircleX } from "lucide-react";
import Link from "next/link";
import { getEventById } from "@/lib/actions/event.actions";
import { getUserById } from "@/lib/actions/user.actions";

const PaystackButton = dynamic(
    () => import("react-paystack").then((mod) => mod.PaystackButton),
    { ssr: false }
  );
  
  const Page = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const [event, setEvent] = useState<any>(null);
    const [fees, setFees] = useState({
      serviceFee: 0,
      paymentProcessingFee: 0,
      totalPrice: 0,
    });
    const [user, setUser] = useState({ name: "", email: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const { user: authUser } = useUser();
    const router = useRouter();
  
    useEffect(() => {
      const fetchEvent = async () => {
        const eventData = await getEventById(id);
        setEvent(eventData);
      };
  
      const fetchFees = async () => {
        const feeResponse = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/paystack?eventId=${id}`,
          { cache: "no-store" }
        );
  
        if (feeResponse.ok) {
          const { serviceFee, paymentProcessingFee, totalPrice } = await feeResponse.json();
          setFees({ serviceFee, paymentProcessingFee, totalPrice });
        }
      };
  
      fetchEvent();
      fetchFees();
  
      if (authUser) {
        setUser({
          name: authUser.firstName || "",
          email: authUser.primaryEmailAddress?.emailAddress || "",
        });
      }
    }, [id, authUser]);
  
    if (!event) {
      return (
        <div className="wrapper flex w-full h-screen justify-center items-center">
          <p className="self-center text-white p-medium-16 md:p-semibold-20">Loading Checkout...</p>
        </div>
      );
    }
  
    if (errorMessage) {
      return (
        <div className="wrapper flex w-full h-screen justify-center items-center">
          <p className="text-white p-medium-16 md:p-semibold-20">{errorMessage}</p>
        </div>
      );
    }
  
    const handlePaymentSuccess = async (reference: string) => {
      try {
        const response = await fetch("/api/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reference, eventId: id }),
        });
        const data = await response.json();
        if (data.status === "success") {
          router.push(`/events/${event._id}/payment-success?reference=${reference}`);
        } else {
          alert("Payment verification failed!");
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        alert("Something went wrong with payment verification!");
      }
    };
  
    console.log("Sending to API:", {
      email: user.email,
      amount: fees.totalPrice * 100,
      eventId: event._id,
    });
  
    const handlePayment = async () => {
        try {
          const response = await fetch("/api/initialize-payments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: user.email,
              amount: fees.totalPrice * 100,
              eventId: event._id,
            }),
          });
      
          const data = await response.json();
      
          if (!response.ok) {
            alert(data.error || "Payment initialization failed");
            return;
          }
      
          console.log("Payment API response:", data);
      
          const authorizationUrl = data?.data?.authorization_url;
          
          if (!authorizationUrl) {
            alert("Payment initialization failed. No authorization URL.");
            return;
          }
      
          window.location.href = authorizationUrl; // Redirect to Paystack payment page
        } catch (error) {
          console.error("Payment error:", error);
          alert("Something went wrong. Please try again.");
        }
      };
      

  return (
    <>
    {/* <div className='text-white'>{JSON.stringify(fees)}</div> */}

    <div className="wrapper md:max-w-4xl text-white grid grid-cols-1 gap-2 md:gap-4 justify-center items-center mb-8">
      <div className="flex flex-auto justify-between">
        <h2 className="p-regular-20 md:p-regular-20 text-wrap self-center">Checkout</h2>
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
            <p className="p-regular-14 md:p-regular-16">
              {event.category.name} Ticket x1
            </p>
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
            <p className="flex p-regular-14 md:p-regular-16 self-end">₦{fees.serviceFee}</p>
            <p className="flex p-regular-14 md:p-regular-16 self-end">₦{fees.paymentProcessingFee}</p>
          </div>
        </div>

        <hr className="border border-dashed border-neutral-800 mt-2"/>

        <div className="flex flex-auto justify-between mt-2">
          <div className="flex flex-col">
          <p className="p-semibold-14 md:p-medium-16">No refunds* &mdash; All Ticket sales are final.</p>
          <p className="p-regular-14 text-neutral-600 mt-1">
            * Exceptions may apply, see our refund policy. <br/>
          By clicking 'Complete Order' you also agree to our Terms of Use and Refund Policy.
          </p>
          </div>
        </div>
      </div>

      <div className='flex flex-col mb-3 md:mt-0 mt-2'>
        <p className="p-regular-14 md:p-regular-16 mb-2 text-neutral-600">Select a Delivery method</p>
          <div className="p-4 px-5 md:px-4 bg-neutral-900/50 md:bg-neutral-950 border border-neutral-800 flex flex-col">
            <div className="flex flex-col md:px-1">
              <div className='flex flex-auto justify-between'>
                <p className='p-semibold-14 md:p-regular-16 mb-1'>Download Ticket</p>
                <p className="p-semibold-14 md:p-regular-16 mb-1">FREE</p>
              </div>
              <p className='p-regular-14 md:p-regular-16 text-neutral-600'>
                Your Ticket will be available for download immediately after purchase.</p>
            </div>
          </div>
      </div>

      {/* <div className='flex flex-col mb-4 md:mt-0'>
        <p className="p-regular-14 md:p-regular-16 mb-2 text-neutral-600">Select a Payment option</p>
          <div className="p-4 px-5 md:px-4 bg-neutral-900/50 md:bg-neutral-950 border border-neutral-800 flex flex-col">
            <div className="flex flex-col md:px-1">
              <p className='p-semibold-14 md:p-regular-16 mb-0.5'>Paystack Checkout</p>
              <p className='p-regular-14 md:p-regular-16 text-neutral-600'>
                Pay with your card, bank transfer, USSD and more.</p>
            </div>
          </div>

          <div className="p-4 px-5 md:px-4 border border-neutral-800 flex flex-col mt-2">
            <div className="flex flex-col md:px-1">
              <p className='p-semibold-14 md:p-regular-16 mb-0.5'>Redeem a code</p>
              
            </div>
          </div>
      </div> */}

      <div className="p-4 px-5 md:px-4 border border-neutral-800 flex flex-row mb-2">
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
          <p className="p-bold-16 md:p-bold-18 tracking-tight line-clamp-1">
            {event.title}
          </p>
          <p className="p-regular-16 md:p-regular-18">
            {formatDateTime(event.endDateTime).dateOnly}, by {" "}
            {formatDateTime(event.endDateTime).timeOnly}
          </p>
          <p className="text-neutral-600 p-regular-16 md:p-regular-18 line-clamp-1">
            {event.location}
          </p>
        </div>
      </div>

      <button 
        onClick={handlePayment} 
        className="w-full p-4 paystack-button text-black md:p-semibold-18"
        >
        Complete Order
       </button>
      </div>
    </>
  );
};

export default Page;
