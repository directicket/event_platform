import EventForm from "@/components/shared/EventForm"
import { getEventById } from "@/lib/actions/event.actions"
import { auth } from "@clerk/nextjs"
import { Construction, IdCard } from 'lucide-react'
import Link from "next/link";
import { IBM_Plex_Mono } from 'next/font/google';
import { formatDateTime } from "@/lib/utils";
import BankDetailsAlert from "@/components/shared/BankDetailsAlert";

const ibmMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '600'] })

type UpdateEventProps = {
  params: {
    id: string
  }
}

const UpdateEvent = async ({ params: { id } }: UpdateEventProps) => {

  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  const event = await getEventById(id)

  return (
    <>
    <section className="mt-16 bg-black md:max-w-4xl bg-cover bg-center py-2 wrapper gap-4 flex flex-col">
          <div className="bg-neutral-950 p-4 border border-neutral-800/50 rounded-md">
            <h2 className="p-medium-20 md:p-regular-20 text-wrap text-white">Edit your Ticket</h2>
            <hr className="border border-neutral-800/50 w-full my-3"/>
            <p className="text-neutral-500 text-left p-regular-14 md:p-regular-16">
              Current name: {event.title}<br/>
              Created on {formatDateTime(event.createdAt).dateOnly}<br/>
              by {formatDateTime(event.createdAt).timeOnly}.
            </p>
          </div>
           
          <BankDetailsAlert />
    
          
    </section> 
    <div className="wrapper mb-8">
    <div className="wrapper md:max-w-4xl border bg-neutral-950/40 border-neutral-800/50 rounded-md">
        <EventForm 
          type="Update" 
          event={event} 
          eventId={event._id} 
          userId={userId} 
        />
    </div>
    </div>
    </>
  )
}

export default UpdateEvent