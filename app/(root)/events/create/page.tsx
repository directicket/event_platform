import EventForm from "@/components/shared/EventForm"
import { auth } from "@clerk/nextjs"
import { Construction, IdCard } from 'lucide-react'
import Link from "next/link";
import { IBM_Plex_Mono } from 'next/font/google';

const ibmMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '600'] })

const CreateEvent = () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  return (
    <>
    <section className="bg-black md:max-w-4xl bg-cover bg-center py-2 wrapper gap-4 flex flex-col">
    <div>
        <h2 className="p-medium-20 md:p-regular-20 text-wrap text-white">Create a Ticket</h2>
        <p className="text-white text-left p-regular-14 md:p-regular-16">
          Tickets are unique products. Add a distinct name, description, and artwork for easy identification.
        </p>
      </div>
      
      <div className="flex flex-col gap-2">
        <div className="flex flex-col p-4 bg-neutral-950/60 border border-neutral-800/50 gap-1">
          <div className="flex flex-row gap-[5.5px]">
            <IdCard width={20} height={20} className='text-blue-700'/>
            <p className={`${ibmMono.className} ibm-14 text-white`}>BANK DETAILS</p>
          </div>
          <p className="p-regular-12 md:p-regular-16 text-neutral-600">
            If you haven't, add your bank details so you can get paid. You won't get paid until you do so.</p>
        </div>

        <Link href='/profile/bank-details'>
          <p className="p-regular-14 text-blue-700 underline hover:no-underline">Add your bank details &rarr;</p>
        </Link>
      </div>

      
    </section> 

    <div className="wrapper md:max-w-4xl">
     <EventForm userId={userId} type="Create" />
    </div>

    <div className="wrapper mt-[-30px] md:max-w-4xl ">
    <p className="text-gray-400 p-regular-14 wrapper text-left mt-[-30px]">By clicking 'Create Ticket' you agree to our Terms of Service.</p>
    </div>
    </>
  )
}

export default CreateEvent