"use client"

import { iEvent } from '@/lib/database/models/event.model'
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import Checkout from './Checkout'

const CheckoutButton = ({ event }: { event: iEvent}) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  const hasEventFinished = new Date(event.startDateTime) <= new Date();

  return (
    <div className='flex items-center gap-3'>
        {hasEventFinished ? (
          <Button className='rounded-sm text-grey-400 bg-grey-50 text-center w-full hover:bg-red-500 hover:text-white' size="lg">
            <p className='text-grey-400 hover:text-white'>This Ticket is no longer on sale.</p>
          </Button>
        ): (
            <>
              <SignedOut>
                <Button asChild className='rounded-sm bg-blue-600' size="lg">
                    <Link href="/sign-in">
                      Get Ticket
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