import { iEvent } from '@/lib/database/models/event.model'
import { formatDateTime } from '@/lib/utils'
import { auth } from '@clerk/nextjs/server'
import { BadgeCheck, SquarePen } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { DeleteConfirmation } from './DeleteConfirmation'

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
    <div className='group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-md bg-white border transition-all hover:shadow-lg md:min-h-[438px]'>
        <Link 
          href={`/events/${event._id}`}
          style={{backgroundImage: `url(${event.imageURL})`}}
          className='flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500'
        />
        { /* IS EVENT CREATOR ... */}

        {isEventCreator && !hidePrice && (
            <div className='absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all text-black'>
                <Link href={`/events/${event._id}/update`}>
                  <SquarePen width={20} height={20} />
                </Link>

                {/* <DeleteConfirmation eventId={event._id}/> */}
            </div>
        )}

        <div
          className='flex min-h-[230px] flex-col gap-3 p-5 md:gap-4'
        >
           {!hidePrice && <div className='flex gap-2'>
                <span className='p-semibold-14 rounded-sm bg-green-500/10 px-4 py-1 text-green-700'>
                    {event.isFree ? 'FREE' : `₦${event.price}`}
                </span>
                <p className='p-semibold-14 w-flex rounded-sm bg-grey-500/10 px-4 py-1 text-gray-500'>
                  {event.category.name}
                </p>
            </div>}

            <p className='p-medium-14 p-medium-16 text-muted-foreground'>
                {formatDateTime(event.endDateTime).dateTime}
            </p>

            <p className='p-medium-14 p-medium-16 text-red-500'>
                Sales end {' '} {formatDateTime(event.startDateTime).dateOnly}.
            </p>

            <div className='flex w-full gap-1 items-center'>
              <Link href={`/events/${event._id}`}>
                <p className='p-bold-20 md:p-bold-24 line-clamp-1 flex-1 text-black'>{event.title}</p>
              </Link>
              <BadgeCheck className='w-5 min-w-5 text-black justify-items-start'></BadgeCheck>
            </div>
            
            <div className='flex-between w-full'>
                <div className='flex gap-1'>
                  <p className='p-medium-14 md:p-medium-16 text-muted-foreground p-bold-14'>
                    @{event.organizer.username}
                  </p>
                  {/* <BadgeCheck className='w-5 text-muted-foreground'></BadgeCheck> */}
                </div>

                {hasOrderLink && (
                    <Link href={`/orders?eventId=${event._id}`} className='flex gap-2'>
                        <p className='text-blue-600 underline'>Order Details</p>
                    </Link>
                )}
            </div>
        </div>
    </div>
  )
}

export default Card