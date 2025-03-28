import EventForm from "@/components/shared/EventForm"
import { auth } from "@clerk/nextjs"
import { Construction } from 'lucide-react'
import Link from "next/link";
import { IBM_Plex_Mono } from 'next/font/google';

const ibmMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '600'] })

const CreateEvent = () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  return (
    <>
    <section className="bg-black md:max-w-4xl bg-cover bg-center py-2 wrapper">
      <h2 className="p-regular-20 md:p-regular-20 text-wrap text-white">Create a Ticket</h2>
        <p className="text-neutral-600 text-left">Make sure your Ticket contains accurate details.</p>
    </section> 

    <div className="wrapper md:max-w-4xl gap-2">
      <Link href='/profile'>
      <div className="flex flex-col p-4 bg-blue-700 hover:bg-blue-700/80">
        <p className="p-regular-14 text-black underline">Make sure you've added your bank details to this profile. &rarr;</p>
      </div>
      </Link>

      <div className="flex flex-col p-4 bg-neutral-950/60 border border-neutral-800/50">
        <div className="flex flex-row gap-1">
          <Construction width={20} height={20} className='text-yellow-300'/>
          <p className={`${ibmMono.className} ibm-14`}>PAID TICKETS</p>
        </div>
        <p className="p-regular-12 md:p-regular-16 text-neutral-600">We're eliminating fees for all organizers. We will let you know when this feature is available for you within the next week.</p>
      </div>
      <EventForm userId={userId} type="Create" />
    </div>

    <div className="wrapper mt-[-30px] md:max-w-4xl ">
    <p className="text-gray-400 p-regular-14 wrapper text-left mt-[-30px]">By clicking 'Create Ticket' you agree to our Terms of Service.</p>
    </div>
    </>
  )
}

export default CreateEvent