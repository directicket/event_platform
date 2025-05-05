import EventForm from "@/components/shared/EventForm"
import { auth } from "@clerk/nextjs"
import { Construction, IdCard, Ticket } from 'lucide-react'
import Link from "next/link";
import { IBM_Plex_Mono } from 'next/font/google';
import LazyVideo from "@/components/shared/LazyVideo";
import TicketModal from "@/components/shared/TicketModal";
import BankDetailsAlert from "@/components/shared/BankDetailsAlert";

const ibmMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '600'] })

const CreateEvent = () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  return (
    <>
    <section className="mt-16 bg-black md:max-w-4xl bg-cover bg-center py-2 wrapper gap-4 flex flex-col">
      <TicketModal />
      
      <BankDetailsAlert />

      
    </section> 

    <section id='create'>
      <div className="wrapper flex flex-row gap-2 mb-9">
        <div className='p-2 border border-neutral-800 bg-neutral-950 rounded-md flex flex-row gap-3'>
        <Ticket height={50} width={50} className="text-white self-center -rotate-45 pt-2 w-24"/>

        <div className="flex flex-col self-center mb-3">
        <h2 className="w p-semibold-24 tracking-tight mb-1 md:p-bold-24 text-wrap text-left text-white mt-4">
          Make your new ticket.
        </h2>

        <p className="text-neutral-500 text-left p-regular-14 md:p-regular-16">
          Could be a specific concert tour location ticket or an early bird, anything goes.
        </p>
        </div>
        </div>
      </div>

    <div className="wrapper -mt-6 mb-12">
    <div className="wrapper md:max-w-4xl border bg-neutral-950/40 border-neutral-800/50 rounded-md">
     <EventForm userId={userId} type="Create" />
    </div>
    </div>
    </section>

    
    </>
  )
}

export default CreateEvent