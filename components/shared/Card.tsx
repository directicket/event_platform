import { iEvent } from '@/lib/database/models/event.model'
import { formatDateTime } from '@/lib/utils'
import { auth } from '@clerk/nextjs/server'
import { BadgeCheck, SquarePen } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { DeleteConfirmation } from './DeleteConfirmation'
import { Button } from '../ui/button'
import { IBM_Plex_Mono } from 'next/font/google';
import CheckoutButton from './CheckoutButton'

const ibmMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '600'] })


type CardProps = {
    event: iEvent,
    hasOrderLink?: boolean,
    hidePrice?: boolean,
    showStats?: boolean;
}

const Card = ({ event, hasOrderLink, hidePrice, showStats }: CardProps) => {
  const {sessionClaims} = auth();
  const userId = sessionClaims?.userId as string;

  const isEventCreator = userId === event.organizer._id.toString();

  const price = Number(event.price)
  const amountSold = event.amountSold

  const revenue = price * amountSold

  // if (isEventCreator) return null
  return (
    <div className={`text-white bg-black relative flex flex-col gap-0 border-neutral-900 border w-full ${event.quantity === 0 ? '' : ''}`}>
      <div className='flex flex-row w-full p-4 justify-between'>
        <div className='flex flex-row'>
        {isEventCreator && !hidePrice && (
            <div className='w-fit p-0 bg-black text-white hover:text-neutral-800 z-10 right-4 top-4 isolate absolute'>
                <Link href={`/events/${event._id}/update`}>
                  <SquarePen width={16} height={16}/>
                </Link>
            </div>
        )}
        <p className={`${ibmMono.className} p-regular-14 md:p-regular-14 ${event.quantity === 0 ? 'opacity-50' : ''}`}>
          {event.isFree ? 
            <span className={`${ibmMono.className}text-yellow-300`}>FREE</span> 
            : 
            `₦${event.price}`
          } {' '}&#8226; {`${event.quantity === 0 ? 'Out of Stock' : `${event.quantity} in stock`}`}
        </p>
        </div>
        <p className='p-regular-12 md:p-regular-14'>&rarr;</p>
      </div>

      <div className={`flex flex-col w-full p-4 ${event.quantity === 0 ? 'pointer-events-none opacity-50' : ''}`}>
        <Link href={`/events/${event._id}/${event.isFree ? 'collect-ticket' : 'checkout'}`} className={`${event.quantity === 0 ? 'pointer-events-none opacity-50' : ''}`}>
          <span className={`absolute inset-0 hover:border ${event.quantity === 0 ? 'pointer-events-none opacity-50' : ''}`}></span>
          <p className='p-regular-14 md:p-regular-16 font-medium'>
            {event.title}
          </p>
        </Link>
        <p className='p-regular-12 md:p-regular-14 font-normal text-neutral-700/80'>
          {event.description}
        </p>

        
      </div>

      

        {/* <div className='w-full'>
          <CheckoutButton event={event}/>
        </div> */}

        {hasOrderLink && showStats && (
        <div className='w-full p-4 border border-dashed border-neutral-900 border-b-0 border-r-0 border-t border-l-0'>
            <div className='flex flex-row gap-4'>
              <div className='flex flex-row gap-1'>
                <p className='p-semibold-14 text-lime-400'>Sold:</p>
                <p className='p-semibold-14 text-lime-400'>{event.amountSold}</p>
              </div>

              <div className='flex flex-row gap-1'>
                <p className='p-semibold-14 text-lime-400'>Revenue:</p>
                <p className='p-semibold-14 text-lime-400'>₦{revenue.toLocaleString()}</p>
              </div>
            </div>
            </div>
          )}

          {!hasOrderLink && !showStats && (
            <div className='relative w-full flex flex-row gap-1 p-4 border border-dashed border-neutral-900 border-b-0 border-r-0 border-t border-l-0'>
            <p className='p-regular-12 md:p-regular-14 font-normal text-neutral-700/80'>
              Created on {formatDateTime(event.startDateTime).dateOnly} by {' '}
            </p>
            <Link href={`/${event.organizer.username}`}>
              <span className='absolute inset-0 hover:bg-neutral-700/30'></span>
              <p className='p-regular-12 md:p-regular-14 font-medium underline text-neutral-700/80'>/{event.organizer.username}</p>
            </Link>
            </div>
          )}

    </div>
  )
}

export default Card