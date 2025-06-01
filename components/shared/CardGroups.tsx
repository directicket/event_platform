import { iEvent } from '@/lib/database/models/event.model'
import { formatDateTime } from '@/lib/utils'
import { auth } from '@clerk/nextjs/server'
import { BadgeCheck, CirclePause, OctagonPause, SquarePen } from 'lucide-react'
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

const CardDashboard = ({ event, hasOrderLink, hidePrice, showStats }: CardProps) => {
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
    <div className={`text-white rounded-md bg-black relative flex flex-col gap-0 ${event.quantity === 0 ? '' : ''}`}>
      <div className='flex flex-row'>
        <p className='p-medium-14'>{event.title}</p>
        <p className='p-medium-14 text-neutral-500'>{event.tags?.name}</p>
      </div>
      
      <hr className='border-neutral-800/60 border w-full'/>
    </div>
    </>
  )
}

export default CardDashboard