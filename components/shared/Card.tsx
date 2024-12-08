import { iEvent } from '@/lib/database/models/event.model'
import { formatDateTime } from '@/lib/utils'
import { auth } from '@clerk/nextjs/server'
import { BadgeCheck, SquarePen } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { DeleteConfirmation } from './DeleteConfirmation'
import { Button } from '../ui/button'

type CardProps = {
    event: iEvent,
    hasOrderLink?: boolean,
    hidePrice?: boolean,
}

const Card = ({ event, hasOrderLink, hidePrice }: CardProps) => {
  const {sessionClaims} = auth();
  const userId = sessionClaims?.userId as string;

  const isEventCreator = userId === event.organizer._id.toString();

  return (
    <div className='group relative flex w-full max-w-[400px] flex-col overflow-hidden 
    p-2 rounded-xl bg-neutral-100 '>
        <div className='bg-neutral-100 flex justify-center rounded-lg items-center' style={{ height: '220px' }}>
          <Image
            alt='image'
            src={`${event.imageURL}`}
            className='object-contain border-[0.25px] border-muted-foreground shadow-sm shadow-black'
            width={650} // Max width constraint
            height={400} // Fixed height
            style={{
              maxWidth: '650px', // Variable width, max 650px
              width: 'auto', // Automatically adjusts the width
              height: '70%', // Stretches the image to fit the height of the container
            }}
          />
        </div>
        { /* IS EVENT CREATOR ... */}

        {isEventCreator && !hidePrice && (
            <div className='absolute right-2 top-2 flex flex-row gap-2 rounded-lg 
           bg-white text-black hover:underline p-3 p-medium-14
           border border-neutral-300/70
            '>
                <Link href={`/events/${event._id}/update`}>
                  <SquarePen width={18} height={18}/>
                </Link>

                {/* <DeleteConfirmation eventId={event._id}/> */}
            </div>
        )}

        <div className='flex flex-col gap-0.5 pt-2 md:gap-1'>

          <hr className='pb-2'/>
            <div className='flex w-full gap-1 items-center'>
              <Link href={`/events/${event._id}`}>
                <p className='p-medium-16 md:p-medium-18 line-clamp-1 flex-1 text-black'>{event.title}</p>
              </Link>
              <BadgeCheck className='w-4 text-black justify-items-start'></BadgeCheck>
            </div>

            <p className='p-medium-14 p-medium-16 text-black'>
                {formatDateTime(event.endDateTime).dateTime}
            </p>


            {!hidePrice && 
                <div className='flex pt-0.5 gap-2'>
                <span className='p-medium-14 text-neutral-600'>
                    {event.isFree ? 'FREE' : `₦${event.price}`}
                </span>
                {/* <p className='p-semibold-14 w-flex rounded-sm bg-grey-500/10 px-4 py-1 text-gray-500'>
                  {event.category.name}
                </p> */}
                </div>}
              
              {/* <p className='p-medium-14 p-medium-16 text-red-500'>
              Sales end {' '} {formatDateTime(event.startDateTime).dateOnly}.
              </p> */}
            
            <div className='flex-between w-full'>
                {/* <div className='flex gap-1'>
                  <p className='p-medium-14 md:p-medium-16 text-muted-foreground p-bold-14'>
                    @{event.organizer.username}
                  </p> */}
                  {/* <BadgeCheck className='w-5 text-muted-foreground'></BadgeCheck> */}
                {/* </div> */}
            </div>

            <div className='w-full pt-2'>
            <Link href={`/events/${event._id}`}>
              <button className='p-semibold-14 h-12 w-full w-flex rounded-lg
              bg-white text-neutral-600 border border-neutral-300/70
              hover:bg-black px-4 py-1 hover:text-white hover:border-black'>
                  Get {event.category.name} ticket
              </button>
            </Link>
            </div>

            <div className='w-full'>
            {hasOrderLink && (
                    <Link href={`/orders?eventId=${event._id}`}>
                        <button className='pb-4 underline p-semibold-14 h-8 w-full w-flex rounded-sm bg-neutral-100 px-4 py-1 text-gray-500'>
                          View buyers
                        </button>
                    </Link>
                )}
            </div>
        </div>
    </div>
  )
}

export default Card