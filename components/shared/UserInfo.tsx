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

const UserInfo = ({ event, hasOrderLink, hidePrice }: CardProps) => {
  const {sessionClaims} = auth();
  const userId = sessionClaims?.userId as string;

  const isEventCreator = userId === event.organizer._id.toString();

  // if (isEventCreator) return null
  return (
    
    <div className='group relative flex w-full max-w-[400px] md:max-w-[700px] 
    flex-row overflow-hidden min-w-[300px]
    p-2 pb-0 pl-0 pt-0 border-neutral-700/50 border bg-black'>

      <Link href={`/events/${event._id}`}>
        <div className=' flex justify-center items-center bg-neutral-900/30 min-w-[80px] px-4' 
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
                {' '}&#8226; {formatDateTime(event.endDateTime).dateOnly}
            </p>
            
            {isEventCreator && !hidePrice && (
            <div className='absolute right-2 top-2 flex flex-col gap-2 rounded-none 
           bg-black text-white hover:underline p-3 p-medium-14
            mt-3
            '>
                <Link href={`/events/${event._id}/update`}>
                  <SquarePen width={18} height={18}/>
                </Link>

                {/* <DeleteConfirmation eventId={event._id}/> */}
            </div>
        )}
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

export default UserInfo