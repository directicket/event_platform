"use client"

import { iEvent } from '@/lib/database/models/event.model'
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import Checkout from './Checkout'
import { SearchParamProps } from '@/types'
import { formatDateTime } from '@/lib/utils';
import { getEventById, getRelatedEventsByCategory } from '@/lib/actions/event.actions'
import { trusted } from 'mongoose'
import { IBM_Plex_Mono } from 'next/font/google';

const ibmMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '600'] })

const EventDetails = async ({ params: { id }, searchParams }: SearchParamProps) => {
  const event = await getEventById(id);

  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: searchParams.page as string,
  })
}

const CheckoutButton = ({ event }: { event: iEvent}) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  const hasEventFinished = new Date(event.startDateTime) <= new Date();

  return (
    <div className='flex items-center gap-3'>
        {hasEventFinished ? (
          <Button className=' text-left rounded-none
           w-full bg-black border border-neutral-800' size="lg" disabled={true}>
            <p className={`${ibmMono.className}text-neutral-800 ibm-16 md:ibm-20 text-wrap p-3`}>
              ACCESS TO THIS TICKET HAS BEEN CLOSED BY ITS CREATOR.
            </p>
          </Button>
        ): (
            <>
              <SignedOut>
                <Button asChild className='text-left rounded-none
           w-full bg-black hover:bg-black border-white border' size="lg">
                    <Link href="/maintenance">
                      <div className='flex flex-col w-full'>
                        <p className={`${ibmMono.className}text-white w-full text-left ibm-16 md:ibm-16 text-wrap p-3`}>
                          GET TICKET
                        </p>
                        <hr className='hidden md:block border border-dashed border-white my-1'/>
                        <p className={`${ibmMono.className}text-white w-full text-left ibm-16 md:ibm-16 text-wrap p-3`}>
                          Available until {formatDateTime(event.startDateTime).dateOnly}, {' '}at{' '}
                          {formatDateTime(event.startDateTime).timeOnly}. 
                        </p>
                      </div>
                    </Link>
                </Button>
              </SignedOut>

              <SignedIn>
                <div className='w-full text-left'>
                  <Checkout event={event} userId={userId}/>
                </div>
              </SignedIn>
            </>
        )}
    </div>
  )
}

export default CheckoutButton