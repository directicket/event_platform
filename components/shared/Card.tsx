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

  // if (isEventCreator) return null
  return (
    
    <div className='group relative flex w-full max-w-[400px] flex-row overflow-hidden 
    p-2 border-b-neutral-500/30 border-r-0 border-l-0 border-t-0 border bg-black'>

      <Link href={`/events/${event._id}`}>
        <div className=' flex justify-center items-center' 
        style={{ height: '100px' }}
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

        {isEventCreator && !hidePrice && (
            <div className='absolute right-2 top-2 flex flex-row gap-2 rounded-full 
           bg-black text-white hover:underline p-3 p-medium-14
           border border-neutral-300/30 mt-6
            '>
                <Link href={`/events/${event._id}/update`}>
                  <SquarePen width={18} height={18}/>
                </Link>

                {/* <DeleteConfirmation eventId={event._id}/> */}
            </div>
        )}

        <div className='pt-4 pl-1'>
        <div className='flex flex-col gap-0.5 pt-2.5 md:gap-1 pl-2'>

          {/* <hr className='pb-2'/> */}

            <div className='flex max-w-56 gap-1 items-left justify-left'>
              <Link href={`/events/${event._id}`}>
                <p className='p-semibold-14 md:p-semibold-16 line-clamp-1 text-left hover:underline
                 flex-1 text-white'>{event.title}</p>
              </Link>
              
            </div>

            <p className='p-regular-14 p-medium-16 text-neutral-600 text-left 
            w-full justify-center pb-[-20px]'>
            {!hidePrice && 
                <span className='p-regular-14 text-neutral-600'>
                    {event.isFree ? 'FREE' : `₦${event.price}`}
                     {/* - {event.category.name} */}
                </span>}
                {' '}| {formatDateTime(event.endDateTime).dateOnly}
            </p>


            {/* {!hidePrice &&  */}
                {/* <div className='flex pt-0.5 gap-2 items-left justify-left pb-9'> */}
                {/* <span className='p-regular-14 text-neutral-600'> */}
                    {/* {event.isFree ? 'FREE' : `₦${event.price}`} */}
                     {/* - {event.category.name} */}
                {/* </span> */}
                {/* <p className='p-semibold-14 w-flex rounded-sm bg-grey-500/10 px-4 py-1 text-gray-500'>
                  {event.category.name}
                </p> */}
                {/* </div>} */}
              
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

            {/* <div className='w-full pt-2'>
            <Link href={`/events/${event._id}`}>
              <button className='p-semibold-14 h-12 w-full w-flex rounded-lg
              bg-white text-neutral-600 border border-neutral-300/70
              hover:bg-black px-4 py-1 hover:text-white hover:border-black'>
                  Get {event.category.name} ticket
              </button>
            </Link>
            </div> */}

            <div className='w-full'>
            {hasOrderLink && (
                    <Link href={`/orders?eventId=${event._id}`} 
                    className='underline p-semibold-14 w-full 
                     text-gray-500'>
                        
                          View buyers
                    </Link>
                )}
            </div>
        </div>
        </div>
    </div>
  )
}

export default Card