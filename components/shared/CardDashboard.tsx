import { iEvent } from '@/lib/database/models/event.model'
import { formatDateTime } from '@/lib/utils'
import { auth } from '@clerk/nextjs/server'
import { BadgeCheck, ChartLine, CirclePause, OctagonPause, SquarePen } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { IBM_Plex_Mono } from 'next/font/google';
import CheckoutButton from './CheckoutButton'
import dynamic from 'next/dynamic'

const TagDropdownWrapper = dynamic(() => import('./TagDropdownWrapper'), { ssr: false })

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
    <div>
    {!event.url ? 
            <div className="shadow-md shadow-black mt-2 
            mb-2 shrink-0 w-full md:w-[100%] 
            snap-start flex flex-col rounded-xl p-4
             bg-neutral-900 border border-neutral-800/50 gap-1">
            <p className="p-regular-12 md:p-regular-16 text-neutral-500/90 mb-2">
              Get a headstart!
            </p>
            <div className="flex flex-row gap-[5.5px]">
              <SquarePen width={18} height={18} className='text-white self-center'/>
              <p className={`p-semibold-16 text-white`}>Customize this dummy ticket.</p>
            </div>
            <p className="p-regular-14 md:p-regular-16 text-neutral-500">
              It'll be visible to customers after you edit it.
            </p>
          </div> : <div></div>}

    <div className={`text-white rounded-xl ${!event.url ? 'bg-neutral-900' : 'bg-black'} relative flex flex-col gap-0 border-neutral-800/60 border w-full ${event.quantity === 0 ? '' : ''}`}>
      <div className='flex flex-row w-full p-4 justify-between'>
        <div className='flex flex-row'>
        {isEventCreator && !hidePrice && (
            <div className='w-fit p-0 bg-none text-white hover:text-neutral-800 z-30 right-4 top-4 isolate absolute'>
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
          }  { hasOrderLink ? ' ' : <span>{' '}&bull;{' '}
            <span className={`${
                event.quantity < 10
                  ? 'text-red-600'
                  : event.quantity <= 30
                  ? 'text-yellow-600'
                  : ''
              }`}
            >
              {`${event.quantity === 0 ? 'OUT OF STOCK' : event.quantity <= 30 ? `ONLY ${event.quantity} LEFT` : `IN STOCK`}`}
            </span>
            </span> }
        </p>
        </div>
        {/* <p className='p-regular-12 md:p-regular-14 self-center'>See details &rarr;</p> */}
      </div>

                  

      <div className='flex flex-row p-4 -mt-3 mb-2'>
      <div className='max-w-xl self-center '> {/* Openning of ticket artwork div */}
          <div className="flex md:mb-0 md:mt-0 h-fit md:min-h-32 bg-none
            justify-center items-center">
            <div className="h-fit max-w-[60px] 
                  md:h-full md:max-w-[60px] lg:max-h-[250px]
                  lg:max-w-[350px] flex items-center justify-center small-box">
              <Image src={event ? event.imageURL : '/assets/images/dt-icon.svg'} alt="Ticket artwork"
                width={100} height={100}
                className="h-fit md:max-w-[250px] border border-0.5 
                border-neutral-800/40 object-contain 
                  w-auto md:w-fit rounded-[calc(var(--radius)-6px)] spin"
              />
            </div>
          </div>
        </div>

        <div className={`self-center flex flex-col w-full p-4 ${event.quantity === 0 ? 'pointer-events-none opacity-50' : ''}`}>
          <Link href={`/events/${event._id}/${event.isFree ? 'collect-ticket' : 'checkout'}`} className={`${event.quantity === 0 || hasEventFinished ? 'pointer-events-none opacity-50' : ''}`}>
            <span className={`absolute inset-0 hover:border rounded-xl ${event.quantity === 0 ? 'pointer-events-none opacity-50' : ''}`}></span>
            <p className='p-regular-14 md:p-regular-16 font-medium line-clamp-1'>
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
        <div className='px-4'>
            
            <hr className='border border-dashed border-neutral-800 border-0.5 mb-4'/>

            <div className='flex flex-col gap-2'>
              <div className='flex flex-wrap gap-4'>
                <div className='flex flex-row gap-1'>
                  <p className={`p-0.5 px-2 bg-white/10 text-neutral-300 w-fit ibm-12 rounded-sm ${ event.quantity > 0 ? 'text-white' : 'text-red-600 bg-red-700/20' }`}>{event.quantity === 0 ? 'Out of stock' : `${event.quantity} in stock`}</p>
                </div>

                <div className='flex flex-row gap-1'>
                  <p className={`p-0.5 px-2 text-neutral-700 bg-white/10 w-fit ibm-12 rounded-sm 
                    ${event.isFree && event.amountSold > 0 ? 'text-black bg-yellow-400' : `${ event.amountSold > 0 ? 'text-lime bg-lime-400/15' : 'text-neutral-700'}`}
                    
                    `}>{event.amountSold} { event.isFree ? 'collected' : 'sold'}</p>
                </div>

                { !event.isFree ? <div className='flex flex-row gap-1'>
                  <p className={`p-0.5 px-2 bg-white/10 w-fit ibm-12 rounded-sm ${ revenue > 0 ? 'text-black paystack-button' : 'text-neutral-700' }`}>₦{revenue.toLocaleString()} made</p>
                </div> : <div></div>}
              </div>

              <div className='flex flex-col gap-1'>
                <p className='p-regular-14 text-neutral-500'>This ticket will expire by <span className='text-pink-600'>{formatDateTime(event.expiryDate).timeOnly} on {formatDateTime(event.expiryDate).dateOnly}</span> for customers that haven't scanned it.</p>
              </div>

              

            </div>
        </div>
          )}

            
            <div className='z-20 relative w-full flex flex-col gap-1 p-4 mt-8'>
              {event.url ? 
              <div>
              {hasEventFinished ? 
              <div className='mb-2 flex flex-row gap-2 bg-white/5 border border-neutral-700/60 py-2 pr-4 pl-3 items-start rounded-sm'>
                <CirclePause height={35} width={35} className='text-neutral-200 self-center w-10'/>
                <p className='p-regular-14 leading-tight self-center text-neutral-200 mb-[3px]'>Sales for this ticket are paused because your event has started.</p>
              </div> 
              : 
              <div></div>
              }
              </div>
              : <div></div>}

              <div className='flex flex-row justify-between mt-2'>
            <p className='p-regular-12 md:p-regular-14 font-normal self-end text-neutral-500'>
              Created {formatDateTime(event.createdAt).dateOnly}
            </p>

            <TagDropdownWrapper eventId={event._id} />

            </div>

            {event.url ? 
            <Link href={`/profile/${event._id}/sales-report`}>
            <div className='z-[999] p-regular-14 md:p-regular-14 flex flex-row gap-2 font-normal self-end bg-blue-900/20 text-blue-600 w-full border border-neutral-800/30 rounded-md mt-2 p-4'>
              <ChartLine width={18} height={18} className='self-center' /> 
              <p className='self-center'>
                See who's bought this! <span className='font-semibold underline hover:no-underline inset-0'>View Report &rarr;</span>
              </p>
            </div>
          </Link>
          : <div></div>}

            </div>

            

    </div>
    </div>
    </>
  )
}

export default CardDashboard