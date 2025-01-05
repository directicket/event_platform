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
          <Button className=' text-center rounded-none
           w-full bg-neutral-800' size="lg" disabled={true}>
            <p className='text-white p-medium-16 md:p-medium-20 text-wrap p-3'>
              Access to this ticket has been <br className='md:hidden'/> limited by its creator.
            </p>
          </Button>
        ): (
            <>
              <SignedOut>
                <Button asChild className='text-center rounded-none
           w-full bg-white hover:bg-white' size="lg">
                    <Link href="/sign-in">
                      <p className='text-black p-medium-16 md:p-medium-20 text-wrap p-3'>
                        Get Ticket
                      </p>
                    </Link>
                </Button>
              </SignedOut>

              <SignedIn>
                <Checkout />
              </SignedIn>
            </>
        )}
    </div>
  )
}

export default CheckoutButton