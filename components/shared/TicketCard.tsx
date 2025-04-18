import { iEvent } from '@/lib/database/models/event.model'
import { formatDateTime } from '@/lib/utils'
import { auth } from '@clerk/nextjs/server'
import { BadgeCheck, SquarePen } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { IBM_Plex_Mono } from 'next/font/google';

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
    
    <div className='group relative flex w-full max-w-full md:max-w-full 
    flex-row overflow-hidden min-w-[300px]
    p-2 py-4 border-neutral-700/50 border border-t-0 border-r-0 border-l-0 bg-black'>

      <Link href={`/events/${event._id}`}>
        <div className=' flex justify-center items-center bg-black min-w-[80px] px-0' 
        style={{ height: '80px' }}
        >
          <Image
            alt='image'
            src={`${event.imageURL}`}
            className='object-cover border-[0.25px] border-neutral-800/70'
            width={650} // Max width constraint
            height={400} // Fixed height
            style={{
              maxWidth: '40px', // Variable width, max 650px
              width: 'auto', // Automatically adjusts the width
              height: '70%', // Stretches the image to fit the height of the container
            }}
          />
        </div>
        </Link>
        { /* IS EVENT CREATOR ... */}

        

        <div className='pt-4 pl-1'>
        <div className='flex flex-col gap-0.5 mt-0.5 md:gap-1 pl-2'>

          {/* <hr className='pb-2'/> */}

          <div className='lg:grid lg:grid-cols-3 lg:gap-16 lg:justify-between lg:self-center lg:mt-2'>
            <div className='flex max-w-56 lg:w-[1000px] gap-1 items-left justify-left'>
              <Link href={`/events/${event._id}/checkout`}>
                <span className='absolute inset-0 hover:border'></span>
                <p className='p-medium-14 md:p-regular-16 line-clamp-1 text-left hover:underline
                 flex-1 text-white'>{event.title}</p>
              </Link>
              
            </div>

            <p className='p-regular-14 p-medium-16 text-neutral-600 text-left 
            w-full justify-center pb-[-20px] mt-[-4px] lg:self-center'>
            {!hidePrice && 
                <span className={`${ibmMono.className} p-regular-14 text-neutral-600`}>
                    {event.isFree ? 
                    <span className={`${ibmMono.className}text-yellow-300`}>FREE</span> : `₦${event.price}`}
                     
                </span>}
                {' '}&#8226; {event.quantity} in stock
            </p>
            
            {isEventCreator && !hidePrice && (
            <div className='absolute right-2 top-2 flex flex-col gap-2 rounded-none 
           bg-black text-white hover:border p-3 p-medium-14
            mt-5 z-10 isolate self-center
            '>
                <Link href={`/events/${event._id}/update`}>
                  <SquarePen width={18} height={18}/>
                </Link>

                
            </div>
        )}
          </div>


            <div className='w-full mt-[-4px]'>
              {hasOrderLink && showStats && (
                <div className='flex flex-row gap-4'>
                  <div className='flex flex-row gap-1'>
                    <p className='p-semibold-14 text-neutral-700'>Sold:</p>
                    <p className='p-semibold-14 text-neutral-700'>{event.amountSold}</p>
                  </div>

                  <div className='flex flex-row gap-1'>
                    <p className='p-semibold-14 text-neutral-700'>Revenue:</p>
                    <p className='p-semibold-14 text-neutral-700'>₦{revenue.toLocaleString()}</p>
                  </div>
                </div>
              )}

            </div>
        </div>

        
        </div>
    </div>
  )
}

export default Card