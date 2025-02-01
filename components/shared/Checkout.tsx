import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { iEvent } from '@/lib/database/models/event.model'


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
      <div className='flex w-full items-center'>
        <Link href='/profile' className='w-full'>
            <Button 
            className='text-center rounded-none w-full
          bg-yellow-300 hover:bg-yellow-300' size="lg">
                <p className='text-black p-medium-16 md:p-medium-20 p-3'>
                    + Collect Ticket
                </p>
            </Button>
        </Link>
      </div>
       : <div className='flex w-full items-center'>
       <Link href={`/events/${event._id}/pay`} className='w-full'>
           <Button 
           className='text-center rounded-none w-full
         bg-white hover:bg-white' size="lg">
               <p className='text-black p-medium-16 md:p-medium-20 p-3'>
                   Buy Ticket
               </p>
           </Button>
       </Link>
     </div> 
     
     }
      </>
  )
}

export default Checkout