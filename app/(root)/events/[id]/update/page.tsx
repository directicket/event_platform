import EventForm from "@/components/shared/EventForm"
import { getEventById } from "@/lib/actions/event.actions"
import { auth } from "@clerk/nextjs"
import { Construction } from 'lucide-react'
import Link from "next/link";
import { IBM_Plex_Mono } from 'next/font/google';

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
    <section className="bg-black md:max-w-4xl bg-cover bg-center py-2 wrapper gap-4 flex flex-col">
        <div>
            <h2 className="p-regular-20 md:p-regular-20 text-wrap text-white">Edit your Ticket</h2>
            <p className="text-neutral-600 text-left p-regular-14 md:p-regular-16">
              Tickets are unique products. Use distinct a name, description, and artwork for easy identification.
            </p>
          </div>
          
          <div className="flex flex-col gap-2">
            
    
            <div className="flex flex-col p-4 bg-neutral-950/60 border border-neutral-800/50 gap-1">
              <div className="flex flex-row gap-[5.5px]">
                <Construction width={20} height={20} className='text-yellow-300'/>
                <p className={`${ibmMono.className} ibm-14 text-white`}>PAID TICKETS</p>
              </div>
              <p className="p-regular-12 md:p-regular-16 text-neutral-600">
              We're currently rolling out the ability to create paid tickets. You will get access within the next 7 days.</p>
            </div>
    
            <Link href='/profile/bank-details'>
              <p className="p-regular-14 text-yellow-300 underline hover:no-underline">Add your bank details before then &rarr;</p>
            </Link>
          </div>
    
          
    </section> 

    <div className="wrapper md:max-w-4xl">
        <EventForm 
          type="Update" 
          event={event} 
          eventId={event._id} 
          userId={userId} 
        />
    </div>

    <div className="wrapper mt-[-30px] md:max-w-4xl ">
    <p className="text-gray-400 p-regular-14 wrapper text-left mt-[-30px]">By clicking 'Update Ticket' you agree to our Terms of Service.</p>
    </div>
    </>
  )
}

export default UpdateEvent