import { iEvent } from '@/lib/database/models/event.model'
import { formatDateTime } from '@/lib/utils'
import { auth } from '@clerk/nextjs/server'
import { BadgeCheck, SquarePen } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
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

  const hasEventFinished = new Date(event.startDateTime) <= new Date();

  // if (isEventCreator) return null
  return (
    <>
    <div className={`text-white rounded-md bg-neutral-950 relative flex flex-col gap-0 border-neutral-900 border w-full ${event.quantity === 0 ? '' : ''}`}>
      <div className='flex flex-row w-full p-4 justify-between'>
        <div className='flex flex-row'>
        {isEventCreator && !hidePrice && (
            <div className='w-fit p-0 bg-black text-white hover:text-neutral-800 z-30 right-4 top-4 isolate absolute'>
                <Link href={`/events/${event._id}/update`}>
                  <SquarePen width={16} height={16}/>
                </Link>
            </div>
        )}
        <p className={`${ibmMono.className} p-regular-14 md:p-regular-14 ${event.quantity === 0 ? 'opacity-50' : ''}`}>
          {event.isFree ? 
            <span className='text-yellow-300'>FREE</span> 
            : 
            `₦${event.price}`
          } {' '}&#8226;{' '}
            <span className={`${
                event.quantity < 10
                  ? 'text-red-600'
                  : event.quantity <= 30
                  ? 'text-yellow-600'
                  : ''
              }`}
            >
              {`${event.quantity === 0 ? 'OUT OF STOCK' : ` `}`}
            </span>
        </p>
        </div>
        {/* <p className='p-regular-12 md:p-regular-14 self-center'>See details &rarr;</p> */}
      </div>

                  

      <div className='flex flex-row p-4 -mt-3 mb-2'>
      <div className='max-w-xl self-center'> {/* Openning of ticket artwork div */}
          <div className="flex md:mb-0 md:mt-0 min-h-fit md:min-h-0 bg-neutral-950 
            justify-center items-center overflow-hidden" 
            style={{ height: '100px' }}>
            <div className="h-fit max-w-[60px] 
                  md:h-full md:max-w-[60px] lg:max-h-[250px]
                  lg:max-w-[350px] flex items-center justify-center">
              <Image src={event ? event.imageURL : '/assets/images/dt-icon.svg'} alt="Ticket artwork"
                width={100} height={100}
                className="h-full md:max-w-[250px] border border-0.5 
                border-neutral-800/40 object-contain 
                  w-auto md:w-fit"
              />
            </div>
          </div>
        </div>

        <p className={`flex flex-col p-medium-16 ${hasEventFinished ? 'pointer-events-none bg-black/85 z-10 flex items-center justify-center text-center absolute inset-0 hover:border rounded-md' : 'hidden'}`}>
          Sales for this ticket are closed.<br />
          <span className='p-regular-12 text-neutral-600'>Its event has either started or passed.</span>
        </p>

        <div className={`self-center flex flex-col w-full p-4 ${event.quantity === 0 ? 'pointer-events-none opacity-50' : ''}`}>
          <Link href={`/events/${event._id}/${event.isFree ? 'collect-ticket' : 'checkout'}`} className={`${event.quantity === 0 || hasEventFinished ? 'pointer-events-none opacity-50' : ''}`}>
            <span className={`absolute inset-0 hover:border rounded-md ${event.quantity === 0 ? 'pointer-events-none opacity-50' : ''}`}></span>
            <p className='p-regular-14 md:p-regular-16 font-medium'>
              {event.title}
            </p>
          </Link>
          <p className='p-regular-12 md:p-regular-14 font-normal text-neutral-500 line-clamp-2'>
            {event.description}
          </p>
        </div>
      </div>

      

        {/* <div className='w-full'>
          <CheckoutButton event={event}/>
        </div> */}

        {hasOrderLink && showStats && (
        <div className='z-20 w-full p-4 border border-dashed border-neutral-900 border-b-0 border-r-0 border-t border-l-0'>
            <div className='flex flex-row gap-4'>
              <div className='flex flex-row gap-1'>
                <p className='p-semibold-14 text-white'>Sold:</p>
                <p className={`p-semibold-14 ${ event.amountSold > 0 ? 'text-lime' : 'text-neutral-700' }`}>{event.amountSold}</p>
              </div>

              <div className='flex flex-row gap-1'>
                <p className='p-semibold-14 text-white'>All-time Revenue:</p>
                <p className={`p-semibold-14 ${ revenue > 0 ? 'text-lime' : 'text-neutral-700' }`}>₦{revenue.toLocaleString()}</p>
              </div>
            </div>
            </div>
          )}

          {!hasOrderLink && !showStats && (
            <div className='z-20 relative w-full flex flex-row gap-1 p-4 border border-dashed border-neutral-900 border-b-0 border-r-0 border-t border-l-0'>
            <p className='p-regular-12 md:p-regular-14 font-normal text-neutral-500'>
              Created {formatDateTime(event.createdAt).dateOnly} by {' '}
            </p>
            <Link href={`/${event.organizer.username}`} className={`${hasEventFinished ? 'pointer-events-none' : ''}`}>
              <span className='absolute inset-0 hover:bg-neutral-700/30 rounded-br-md rounded-bl-md'></span>
              <p className='p-regular-12 md:p-regular-14 font-medium underline text-neutral-500'>{event.organizer.username}</p>
            </Link>
            </div>
          )}

    </div>
    </>
  )
}

export default Card