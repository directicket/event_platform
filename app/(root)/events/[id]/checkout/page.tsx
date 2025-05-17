"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useAuth, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { formatDateTime } from "@/lib/utils";
import { CircleX, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { getEventById } from "@/lib/actions/event.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { IBM_Plex_Mono } from 'next/font/google';
import SpotifyPreview from '@/components/shared/SpotifyPreview';

const ibmMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '600'] })

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
          <p className="self-center text-white p-medium-16 md:p-semibold-20">Loading...</p>
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

      const hasEventStarted = new Date(event.startDateTime) <= new Date();
      const areTicketsExpiring = new Date(event.expiryDate) <= new Date();
      

  return (
    <>
    {/* <div className='text-white'>{JSON.stringify(fees)}</div> */}

    <div className="wrapper md:max-w-4xl text-white grid grid-cols-1 gap-2 mt-12 md:gap-4 justify-center items-center mb-8">
    <div className="md:p-0 px-0 md:px-0 flex flex-col md:mb-2 md:self-center">
        <div className='max-w-xl lg:px-10 md:px-8 self-center'> {/* Openning of ticket artwork div */}
          <div className="flex mt-6 mb-20 md:mb-0 md:mt-0 min-h-96 bg-black 
            justify-center items-center overflow-hidden" 
            style={{ height: '100px' }}>
            <div className="box h-[205px] max-w-[150px] 
                  md:max-h-[305px] md:max-w-[250px] lg:max-h-[405px]
                  lg:max-w-[350px] flex items-center justify-center">
              <Image src={event ? event.imageURL : '/assets/images/dt-icon.svg'} alt="Ticket artwork"
                width={100} height={100}
                className="h-full border border-0.5 
                border-neutral-800/40 object-contain 
                  w-auto spin self-center"
              />
            </div>
          </div>
        </div>

        <div className='flex flex-col md:self-center gap-3 md:w-full'>
          {/* <div>
          <p className='p-semibold-16 text-neutral-500 mb-1'>
              About this ticket
          </p>
          <hr className="border border-neutral-800 border-dashed"/>
          </div> */}

          <div className='flex flex-auto gap-4 md:gap-6 '>
            <div className='w-full'>
              <p className='p-regular-16 md:p-medium-16 text-neutral-100'>{event.title}</p>
            </div>

            <div>
              <p className={`${ibmMono.className} ibm-16 md:ibm-16 mt-[-0.4px] text-neutral-100`}>
                {event.isFree ? 
                <span className={`${ibmMono.className}text-yellow-300`}>FREE</span> : `₦${event.price}`}
              </p>
            </div>
          </div>

          <a href='#buy' className='mb-2'>
          <p className={`${ibmMono.className} rounded-md text-black p-4 bg-neutral-200 border border-neutral-200 hover:bg-white/80 hover:text-black`}>BUY TICKET <br/><br/>{`${event.quantity === 0 ? 'OUT OF STOCK' : event.quantity <= 30 ? `ONLY ${event.quantity} IN STOCK` : `LIMITED STOCK AVAILABLE`}`}</p>
          </a>
          

          <div className='flex flex-col gap-1'>
            <p className='p-regular-14 text-neutral-400 mb-10'>
              {event.description}
            </p>

            {hasEventStarted ? 
          <p className={`${ibmMono.className} rounded-md text-neutral-600 p-4 bg-black border border-neutral-800/80`}>HURRY! THE EVENT HAS STARTED.</p>
          : <div></div>}

            <p className='p-semibold-16 text-neutral-400 mb-1'>
              Additional Info
            </p>
            <hr className="border-0.5 border-neutral-400 border-dashed"/>

            <div className='flex flex-auto gap-6 mt-2 text-neutral-400'>
              <div className='w-[50%]'>
                <p className='p-regular-14'>{event.location}</p>
              </div>
              <div className='flex flex-auto gap-4'>
                <div className='w-full'>
                  <p className='p-regular-14'>{formatDateTime(event.startDateTime).dateOnly}</p>
                </div>
                <div className='w-full'>
                  <p className='p-regular-14 self-end text-right'>{formatDateTime(event.startDateTime).timeOnly}</p>
                </div>
              </div>
            </div>
          </div>

          

          <div className='md:flex md:flex-col gap-8 mt-2 md:mt-0'>
          <SpotifyPreview playlistUrl={`${event.url}`}/>
          </div>
        </div>
        
      </div>


      <div className="mt-8 gap-1">
      <div className='flex flex-col'>
        <h2 className="p-medium-20 md:p-medium-20 text-wrap">Meet the creator</h2>
        <p className='p-regular-12 md:p-regular-14 font-normal text-neutral-500 line-clamp-2'>You can find all tickets made by a creator on their profile.</p>
      </div>
      <div className="relative rounded-md overflow-hidden mt-2">
        <div className="w-full overflow-hidden max-h-48 min-h-48">
          <Image src={event ? event.imageURL : '/assets/images/dt-icon.svg'} 
          alt="Ticket Artwork" width={100} height={100}
          className="w-full object-cover rounded-md overflow-hidden blur min-h-48"/>
        </div>
        <Link href={`/${event.organizer.username}`}>
        <p className="hover:bg-neutral-950/95 rounded-md absolute top-0 left-0 inset-0 bg-black/70 border border-neutral-800 p-4 pl-5 h3-medium line-clamp-3">
          There's more! Explore {event.organizer.username}'s profile.
        </p>
        </Link>
        <Link href={`/${event.organizer.username}`}>
        <p className="absolute bottom-0 left-0 p-4 pl-5 p-regular-14 line-clamp-3">
          Check it out &rarr;
        </p>
        </Link>
      </div>
      </div>
      
      <section id='buy'>
      <div className="flex flex-auto justify-between mt-8">
        <div className='flex flex-col'>
          <h2 className="p-medium-20 md:p-medium-20 text-wrap">Ready to buy this ticket?</h2>
          <p className='p-regular-12 md:p-regular-14 font-normal text-neutral-500 line-clamp-2'>You're only one click away from getting it!</p>
        </div>
        {/* <Link href={`/events/${event._id}`}>
          <CircleX width={22} height={22} className="text-white self-center h-full" />
        </Link> */}
      </div>
      </section>

      

      <div className="p-4 px-5 md:px-4 rounded-md border bg-neutral-900/30 border-neutral-800/50 flex flex-col gap-2 md:gap-4">
        { event.expiryDate ?
        <div className="shadow-md shadow-black mt-2 mb-2 shrink-0 w-full md:w-[100%] snap-start flex flex-col rounded-md p-4 bg-neutral-900 border border-neutral-800/50 gap-1">
          <div className="flex flex-row gap-[7.5px]">
            <TriangleAlert width={18} height={18} className='text-red-600 self-center'/>
            <p className={`${ibmMono.className} ibm-14 text-white`}>DON'T BE LATE!</p>
          </div>
          <hr className='border-0.5 border-dashed border-neutral-500 my-3 w-full'/>
          <p className="p-regular-14 md:p-regular-16 text-neutral-500">
            This ticket will expire if it isn't scanned before {' '}
            <span className='underline text-red-600'>{formatDateTime(event.expiryDate).timeOnly} on {' '}
            {formatDateTime(event.expiryDate).dateOnly}.</span>
          </p>
        </div> : <div></div> }
        
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
          <p className="p-regular-14 text-neutral-500 mt-1">
            * Exceptions may apply, see our refund policy. <br/>
          By clicking 'Get Ticket' you also agree to our Terms of Use and Refund Policy.
          </p>
          </div>
        </div>
      </div>

      <div className='flex flex-col mb-3 md:mt-0 mt-2'>
        <p className="p-regular-14 md:p-regular-16 mb-2 text-neutral-600">Select a Delivery method</p>
          <div className="p-4 px-5 md:px-4 rounded-md bg-neutral-900/50 md:bg-neutral-950 border border-neutral-900 flex flex-col">
            <div className="flex flex-col md:px-1">
              <div className='flex flex-auto justify-between'>
                <p className='p-semibold-14 md:p-regular-16 mb-1'>View in web (default)</p>
                <p className="p-semibold-14 md:p-regular-16 mb-1">FREE</p>
              </div>
              <p className='p-regular-14 md:p-regular-16 text-neutral-500'>
                Your Ticket will be available in the web to view immediately after purchase.</p>
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

      
      { !areTicketsExpiring ?
      <SignedIn>
        <button 
          onClick={handlePayment} 
          className="w-full p-4 paystack-button md:hidden rounded-md text-black md:p-semibold-18"
          >
          Buy Now
        </button>
       </SignedIn>
       : 
       <SignedIn>
        <button 
          className="w-full p-4 bg-red-600/30 rounded-md text-red-600 md:p-semibold-18"
          >
          You're too late! Sales are closed.
        </button>
       </SignedIn>
       }

       <SignedOut>
       <Link href='/sign-in'>
       <button
          className="w-full p-4 bg-white text-black md:p-semibold-18"
          >
          Buy Now
        </button>
        </Link>
       </SignedOut>


       <div className="mt-8 gap-1">
      <div className='flex flex-col'>
        <h2 className="p-medium-20 md:p-medium-20 text-wrap">Create & sell your Tickets</h2>
        <p className='p-regular-12 md:p-regular-14 font-normal text-neutral-500 line-clamp-2'>Create tickets then share your profile to your buyers. And keep a 100% of what you earn on all ticket sales.</p>
      </div>
      <div className="relative rounded-md overflow-hidden mt-2 text-white">
        <div className="w-full overflow-hidden max-h-48 min-h-48">
          <Image src={event ? event.imageURL : '/assets/images/dt-icon.svg'} 
          alt="Ticket Artwork" width={100} height={100}
          className="w-full object-cover overflow-hidden  min-h-48 blur-lg"/>
        </div>
        <Link href='/events/create'>
        <p className="hover:bg-blue-700/85 absolute rounded-md top-0 left-0 bg-gradient-to-tr inset-0 bg-blue-700/60 border border-neutral-800 p-4 pl-5 h3-medium line-clamp-3">
          Join the community of 350+ sellers.
        </p>
        </Link>
        <Link href='/events/create'>
        <p className="absolute bottom-0 left-0 p-4 pl-5 p-regular-14 line-clamp-3">
          Create yours now &rarr;
        </p>
        </Link>
      </div>
      </div>
      </div>
    </>
  );
};

export default Page;
