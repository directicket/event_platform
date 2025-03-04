import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { iEvent } from '@/lib/database/models/event.model'
import { IBM_Plex_Mono } from 'next/font/google';
import { formatDateTime } from '@/lib/utils';

const ibmMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '600'] })


const Checkout = ({ event, userId }: { event: iEvent, userId: string }) => {
  const onCheckout = async () => {
    const order = {
        eventTitle: event.title,
        eventId: event._id,
        price: event.price,
        isFree: event.isFree,
        buyerId: userId,
    }

    // await checkoutOrder(order)
  }

  return (
    <>
    { event.isFree ? 
      <div className='flex w-full'>
       
      <Button asChild className='text-left rounded-none
       w-full bg-white hover:bg-white border-white border text-black hover:text-black' size="lg">
         <Link href={`/events/${event._id}/pay`}>
         <div className='flex flex-col w-full'>
           <p className={`${ibmMono.className}text-yellow-300 w-full text-left ibm-16 md:ibm-16 text-wrap p-3`}>
             COLLECT TICKET
           </p>
           <hr className='hidden md:block border border-dashed border-black'/>
           <p className={`${ibmMono.className}text-yellow-300 w-full text-left ibm-16 md:ibm-16 text-wrap p-3`}>
             Available until {formatDateTime(event.startDateTime).dateOnly}, {' '}at{' '}
             {formatDateTime(event.startDateTime).timeOnly}
           </p>
         </div>
         </Link>
       </Button>
        </div>
       : <div className='flex w-full'>
       
           <Button asChild className='text-left rounded-none
            w-full bg-black hover:bg-black border-white border' size="lg">
              <Link href={`/events/${event._id}/pay`}>
              <div className='flex flex-col w-full'>
                <p className={`${ibmMono.className}text-white w-full text-left ibm-16 md:ibm-16 text-wrap p-3`}>
                  BUY TICKET
                </p>
                <hr className='hidden md:block border border-dashed border-white'/>
                <p className={`${ibmMono.className}text-white w-full text-left ibm-16 md:ibm-16 text-wrap p-3`}>
                  Available until {formatDateTime(event.startDateTime).dateOnly}, {' '}at{' '}
                  {formatDateTime(event.startDateTime).timeOnly}
                </p>
              </div>
              </Link>
            </Button>
     </div> 
     
     }
      </>
  )
}

export default Checkout