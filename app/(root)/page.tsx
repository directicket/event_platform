import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import Search from "@/components/shared/Search";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Faq from "@/components/shared/Faq";
import { IBM_Plex_Mono } from 'next/font/google';
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Ban, Banknote, ChartArea, CircleHelp, CirclePlus, CircleUserRound, Flag, HandCoins, Palette, ScanQrCode, ShoppingBag, Ticket, TriangleAlert, UsersRound } from "lucide-react";
import InViewCounter from "@/components/shared/Counter";
import LazyVideo from "@/components/shared/LazyVideo";
import Footer from "@/components/shared/Footer";
import CreatorProfileSection from "@/components/shared/CreatorImage";
import CommunitySection from "@/components/shared/CommunityImage";
import LazyVideoNoLoop from "@/components/shared/LazyVideoNoLoop";

const ibmMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '600'] })

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const category = (searchParams?.category as string) || '';

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 20,
  });


  return (
    <>
    <div className='lg:flex lg:items-center lg:justify-center lg:w-full'>
    <div className='lg:max-w-screen-md'>
      <section id="hero" className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className='wrapper flex flex-col gap-3 text-center items-center justify-center'>
          
          <div className='max-w-xl lg:px-10 md:px-8 self-center mb-2'> {/* Openning of ticket artwork div */}
            <div className="flex md:mb-0 md:mt-0 min-h-fit bg-black 
              justify-center items-center" 
              style={{ height: '100px' }}>
              <div className="box h-[150px] max-w-[150px] 
                    md:max-h-[305px] md:max-w-[250px] lg:max-h-[405px]
                    lg:max-w-[350px] flex items-center justify-center">
                <Image src='/assets/images/ticket-artwork.jpg' alt="Ticket artwork"
                  width={100} height={100}
                  className="h-full border border-0.5 
                  border-neutral-800/40 object-contain 
                    w-auto spin self-center"
                />
              </div>
            </div>
          </div>

          <h1 className='h36-regular font-normal'>Make Your Tickets<br/>
            <span className='font-bold'>An Experience.</span>
          </h1>

          <p className='p-regular-18 text-neutral-600 max-w-[75%] mb-2'>
            Every ticket gets its own page, rules, and vibe. Sell them separately and stay in control.
          </p>

          <SignedIn>
              <button className={`${ibmMono.className} bg-white text-black ibm-18 py-2 px-4 rounded-sm`}>
              <Link href='/events/create'>
                MAKE A TICKET
                </Link>
              </button>

              <button className={`${ibmMono.className} bg-black text-white ibm-18 mt-1 rounded-sm`}>
              <Link href='/profile'>
                VIEW DASHBOARD
                </Link>
              </button>
          </SignedIn>
          <SignedOut>
              <button className={`${ibmMono.className} bg-white text-black ibm-18 py-2 px-4 rounded-sm`}>
                <Link href='/sign-up'>
                MAKE A TICKET
                </Link>
              </button>
          </SignedOut>
        </div>
      </section>

      <section id="ticket-as-product" className="flex-col min-h-screen bg-black text-white flex items-center justify-center">
        <div className='h-full'>
          <LazyVideoNoLoop src="/assets/videos/ticket-product.mp4" />
          </div>
        
        <div className='wrapper flex flex-col gap-3 text-center items-center justify-center'>
          <h1 className='h2-bold'>
            Treat tickets like the products they are.
          </h1>

          <p className='p-regular-18 text-neutral-500 max-w-[75%]'>
            Directicket is the only place you can make tickets to whatever 
            you want without making events first.
          </p>
        </div>
      </section>

      <section id="expressive-tickets" className="min-h-screen bg-black text-white flex items-start justify-start mt-8">
        <div className='wrapper flex flex-col gap-2 text-left'>
          <h1 className='h2-regular w-full'>
            Tickets as <br/>
            expressive as you are.
          </h1>

          <p className='p-regular-16 text-neutral-500 w-full'>
            On Directicket, your creativity shines.
          </p>

          
          <div className="flex overflow-x-auto gap-4 snap-x snap-mandatory"> {/* start of snapping, sideways scrolling div */}

            <div className="shrink-0 w-80 snap-start flex flex-col gap-6
             overflow-hidden mt-2 border border-neutral-900/70 card-bg p-6">
              <LazyVideo src="/assets/videos/ticket-artwork-upload.mp4" />
              <hr className="border border-neutral-800"/>
              <p className="p-regular-14 text-neutral-500">
                <span className="text-white">Upload Ticket Artworks </span> and turn each ticket you create into an extension of your brand.
              </p>
            </div>

            <div className="shrink-0 w-80 snap-start flex flex-col gap-6
             overflow-hidden mt-2 border border-neutral-900/70 card-bg p-6">
              <LazyVideo src="/assets/videos/create-tickets.mp4" />
              <hr className="border border-neutral-800"/>
              <p className="p-regular-14 text-neutral-500">
                Create tickets simply by <span className="text-white">adding details you want your customers to know.</span> It won't even take up to 30 seconds.
              </p>
            </div>

            <div className="shrink-0 w-80 snap-start flex flex-col gap-6
             overflow-hidden mt-2 border border-neutral-900/70 card-bg p-6">
              <Image alt='image' src='/assets/images/spotify-playlists-image.png' width={500} height={500} className="w-full h-full object-cover" />              
              <hr className="border border-neutral-800"/>
              <p className="p-regular-14 text-neutral-500">
                Bring your tickets to life with <span className="text-white">any Spotify playlist of your choice.</span> Just paste in its link when creating a ticket.
              </p>
            </div>

          </div>
        </div>
      </section>

      <CreatorProfileSection />

      <section id="richer-exp" className="min-h-screen bg-black text-white flex items-start justify-start mt-8">
        <div className='wrapper flex flex-col gap-2 text-left'>
          <h1 className='h2-regular w-full'>
            Get a richer experience.
          </h1>

          <p className='p-regular-16 text-neutral-500 w-full'>
            No fees on what you earn, security built into every ticket, and so much more.
          </p>

          
          <div className="flex overflow-x-auto gap-4 snap-x snap-mandatory"> {/* start of snapping, sideways scrolling div */}

            <div className="shrink-0 w-80 snap-start flex flex-col gap-6
             overflow-hidden mt-2 border border-neutral-900/70 card-bg p-6">
              <Image alt='image' src='/assets/images/bank-alert-image.png' width={500} height={500} className="w-full h-full object-contain" />              
              <hr className="border border-neutral-800"/>
              <p className="p-regular-14 text-neutral-500">
                Sell tickets and <span className="text-white">get paid every business day without fees cutting into your earnings.</span>
              </p>
            </div>

            <div className="shrink-0 w-80 snap-start flex flex-col gap-6
             overflow-hidden mt-2 border border-neutral-900/70 card-bg p-6">
              <Image alt='image' src='/assets/images/track-tickets-image.png' width={500} height={500} className="w-full h-full object-cover" />              
              <hr className="border border-neutral-800"/>
              <p className="p-regular-14 text-neutral-500">
                <span className="text-white">Track tickets you've created</span> and how they're performing right from your Dashboard.
              </p>
            </div>

            <div className="shrink-0 w-80 snap-start flex flex-col gap-6
             overflow-hidden mt-2 border border-neutral-900/70 card-bg p-6">
              <Image alt='image' src='/assets/images/scan-qr-code-image.png' width={500} height={500} className="w-full h-full object-cover" />              
              <hr className="border border-neutral-800"/>
              <p className="p-regular-14 text-neutral-500">
                <span className="text-white">Scan QR Codes on tickets with any app</span>, including your iPhone camera. Once scanned, tickets can't be gotten back.
              </p>
            </div>

          </div>
        </div>
      </section>

      <CommunitySection />
          
      

      <section className='wrapper'>
        <div className="mt-8 gap-1 text-white">
          <div className="relative overflow-hidden">
            {/* Background Video */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full min-h-96 object-cover"
            >
              <source src="/assets/videos/launch-party-bg-vid.MP4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Foreground Content */}
            <div className='flex flex-col bottom-0 left-0 self-end'>
              <p className="hover:bg-black/85 absolute inset-0 bg-black/50 border border-neutral-800 p-4 pl-5 h3-medium line-clamp-3">
                Sights from our last ticketed experience.
              </p>
            </div>

            <p className="absolute bottom-0 left-0 p-4 pl-5 p-regular-14 line-clamp-3 text-white/70">
              Give guests an experience they'll never forget.
            </p>
          </div>
        </div>
      </section>

      <div className='wrapper text-white my-52 flex flex-col gap-2 items-center justify-center'>
        <div className='max-w-xl lg:px-10 md:px-8 self-center mb-2'> {/* Openning of ticket artwork div */}
          <div className="flex md:mb-0 md:mt-0 min-h-fit bg-black 
            justify-center items-center" 
            style={{ height: '100px' }}>
            <div className="box h-[150px] max-w-[150px] 
                  md:max-h-[305px] md:max-w-[250px] lg:max-h-[405px]
                  lg:max-w-[350px] flex items-center justify-center">
              <Image src='/assets/images/ticket-artwork.jpg' alt="Ticket artwork"
                width={100} height={100}
                className="h-full border border-0.5 
                border-neutral-800/40 object-contain 
                  w-auto spin self-center"
              />
            </div>
          </div>
        </div>
        <p className='h1-bold text-center'>Ticket anything. Instantly.</p>
        <p className="p-regular-18 text-neutral-500 text-center my-2 w-[90%]">
          Create individual tickets and sell them without creating events.
        </p>
        <SignedIn>
          
            <button className={`${ibmMono.className} p-2 px-4 bg-white rounded-sm text-black w-fit`}>
            <Link href='/events/create'>
              CREATE A TICKET
              </Link>
            </button>
          
        </SignedIn>
        <SignedOut>
          
            <button className={`${ibmMono.className} p-2 px-4 bg-white rounded-sm text-black w-fit`}>
            <Link href='/sign-up'>
            TRY IT NOW
            </Link>
            </button>
          
        </SignedOut>
      </div>

      <div className='text-white wrapper'>
      <Faq />
      </div>

      <section className='wrapper'>
      <div className="wrapper flex overflow-x-auto gap-4 snap-x snap-mandatory md:flex-row">
        <div className="shrink-0 w-[100%] snap-start flex flex-col gap-2 card-bg p-4 rounded-md border border-neutral-800">
          <CircleHelp width={25} height={25} className='text-white'/>
          <h3 className='h3-medium text-white'>Need our help?</h3>
          <div className='flex flex-col gap-4'>
          <p className='p-regular-16 text-neutral-500 w-[90%]'>
            Our customer support team is standing by to take your questions.
          </p>
          
          <button className={`${ibmMono.className} p-2 px-4 text-center hover:bg-white/50 bg-white rounded-sm text-black w-full`}>
          <Link href='https://instagram.com/directicket.live'>
            SEND TEXT
            </Link>
          </button>
          </div>
        </div>

        {/* <div className="self-start h-fit shrink-0 w-[100%] snap-start first-letter:flex flex-col gap-2 card-bg p-4 rounded-md border border-neutral-800">
          <Flag width={25} height={25} className='text-red-600'/>
          <h3 className='h3-medium text-white'>Report an issue.</h3>
          <div className='flex flex-col gap-4'>
          <p className='p-regular-16 text-neutral-500 w-[90%]'>
            If you see something, say something. We'll get on it ASAP.
          </p>
          <SignedIn>
            
              <button className={`${ibmMono.className} p-2 px-4 text-center hover:bg-red-600/50 bg-red-600 rounded-sm text-black w-full`}>
              <Link href='/report'>
                FILE REPORT
                </Link>
              </button>
            
          </SignedIn>
          
          <SignedOut>
            
            <button className={`${ibmMono.className} p-2 px-4 text-center hover:bg-red-600/50 bg-red-600 rounded-sm text-black w-full`}>
            <Link href='/sign-in'>
              SIGN IN TO CONTINUE
              </Link>
            </button>
            
          </SignedOut>
          
          </div>
        </div> */}
      </div>      
      </section>

      <div className='text-white wrapper mb-7'>
      <Footer />
      </div>
      </div>
      </div>

      <div className="wrapper flex flex-col items-center justify-center scroll-container
        fixed bottom-0 h-fit mx-auto right-0 left-0 w-fit
        px-4 p-3 bg-red-600 bg-blur">
        <div className="scrolling-text flex flex-row">
          <TriangleAlert className='text-black flex-row' height={20} width={20}/>
          <p className="p-medium-16 pl-1 flex-row text-black">
              <span className='font-bold'>Ticket Expiry is here!</span> Make tickets for late comers expire when your event starts!
          </p>
        </div>
      </div>
    </>
  );
}