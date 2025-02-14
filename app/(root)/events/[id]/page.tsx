import CheckoutButton from '@/components/shared/CheckoutButton';
import Collection from '@/components/shared/Collection';
import { getEventById, getRelatedEventsByCategory } from '@/lib/actions/event.actions'
import { formatDateTime } from '@/lib/utils';
import { SearchParamProps } from '@/types'
import { BadgeCheck, Calendar, DivideIcon, MapPin, Ticket, UserRound } from 'lucide-react';
import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Search from '@/components/shared/Search';
import Faq from '@/components/shared/Faq';
import Link from 'next/link';

const EventDetails = async ({ params: { id }, searchParams }: SearchParamProps) => {
  const event = await getEventById(id);

  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: searchParams.page as string,
  })

  return (
    <>
    <div className='md:grid md:grid-cols-2 lg:wrapper md:gap-8'>

    <div className='lg:flex lg:flex-col lg:wrapper lg:max-w-[500px] md:min-w-sm
    md:overflow-hidden'>
      
    <section className="flex justify-center lg:max-w-[500px] bg-clip-content wrapper
     bg-black md:min-w-fit">

      <div className=" grid grid-cols-1 lg:max-w-[500px] w-full border
       border-neutral-800/70 md:min-w-sm">
        

        <div className='flex w-full flex-col wrapper gap-8 lg:py-10 py-5 text-white'>
          <div className='flex flex-col gap-1.5 md:px-2  lg:pt-0 lg:p-8'>

            {/* hm1 */}
            <div className='flex flex-col gap-1.5 mt-[-3px]'>
            {/* <hr className="opacity-15 mb-[6px]"/> */}
              <h2 className='h2-medium'>{event.title}</h2>
              <p className='p-medium-20 md:p-medium-18 text-white md:py-0'>
                {event.isFree ? 'Free' : `₦${event.price}`} {' '}
                {/* <span className='text-neutral-700'>&#8226; @{event.organizer.username}</span> */}
              </p>
            </div>

            <div className='flex flex-col '>
            {/* <p className='p-regular-14 md:p-regular-16 text-neutral-700 md:py-0'>Ticket description</p> */}
            <p className='p-regular-14 md:p-regular-18'>{event.description}</p>
          </div>


            {/* hm1 */}
           <div className='grid grid-cols-2 gap-2'>
            <div className='flex flex-col gap-0'>
              <p className='p-regular-14 md:p-regular-16 text-neutral-700 pt-3 md:py-0'>
                Location
              </p>
              <p className='p-regular-14 md:p-regular-18'>{event.location}</p>
            </div>


            <div className='flex flex-col gap-0'>
              <p className='p-regular-14 md:p-regular-16 text-neutral-700 pt-3 md:py-0'>
                Date & Time
              </p>
              <p className='p-regular-14 md:p-regular-18'>{formatDateTime(event.endDateTime).dateOnly}. <br/>
                {formatDateTime(event.endDateTime).timeOnly}</p>
            </div>
           </div>

           <div className='mt-4'>
           <CheckoutButton event={event} />
           </div>

           <div className='grid-cols-1 flex gap-1 text-white'>
           {/* <p className='p-medium-14 md:p-medium-16 text-neutral-700 mb-1 md:py-0'>Stay updated</p> */}
            {/* <p className='p-medium-16 md:p-medium-20 text-white mt-[-5px] border rounded-full
            bg-black py-2 w-fit px-2'>
              <a href={`${event.url}`} className="text-wrap">
                Contact @{event.organizer.username}
                <span className='md:hidden'>&#8599;</span>
              </a>
            </p> */}
                {/* <Image
                src='/assets/icons/blue-black-check.svg'
                width={5} height={5} alt='checkmark' className='w-4'>
                </Image> */}
            </div>

           {/* <hr className='wrapper border-neutral-700/40 mb-[-35px]'/> */}

           

            
{/* hidden */}
            <div className='hidden flex-col gap-3 sm:flex-row sm:items-center'>
            {/* <div className='hidden flex flex-col gap-3 sm:flex-row sm:items-center'> */}

              <div className='flex gap-3'>
                <p className='p-bold-16 rounded-sm bg-green-500/10 px-5 py-2 text-green-700'>
                  {event.isFree ? 'FREE' : `₦${event.price}`}
                </p>
                {/* <p className='p-medium-16 rounded-sm bg-grey-500/10 px-4 py-2 text-grey-500'>
                  {event.category.name}
                </p> */}
              </div>

              <p className='p-medium-16 ml-2 mt-2 sm:mt-0 text-muted-foreground'>
                Created by{' '}
                <span className='text-white p-bold-16'>@{event.organizer.username}</span>
              </p>
            </div>
          </div>
{/* hidden */}
          

          
              
           

          {/* <div className='flex flex-col gap-5'> */}
            {/* <div className='flex gap-2 md:gap-3'>
              <Calendar width={24} height={24} className='text-muted-foreground mr-[-5px]'/>
              <div className='p-medium-16 lg:p-regular-20 flex flex-wrap items-center'>
              <p className='text-white ml-1'>{formatDateTime(event.endDateTime).dateOnly}, {formatDateTime(event.endDateTime).timeOnly}</p>
              </div>
            </div> */}


            {/* <div className='p-regular-18 flex items-center gap-3'> */}
              {/* <MapPin width={24} height={24} className='text-muted-foreground mr-[-5px]'/> */}
              {/* <p className='text-white p-medium-16 lg:p-regular-20'>{event.location}</p> */}
            {/* </div> */}
          {/* </div> */}

          

          {/* <div className='flex-row gap-0'>
            <div className='p-medium-16 lg:p-regular-20 flex w-full items-center bg-neutral-900'>
              <p className='text-white ml-1 text-center w-full p-4'>Ticket access closes: <br/> {' '} 
                <span className='text-red-500 p-semibold-16'>
                  {formatDateTime(event.startDateTime).dateOnly}, 
                  {formatDateTime(event.startDateTime).timeOnly}
              </span>.</p>
            </div>
          </div> */}



        </div>

        <hr className='border border-dashed border-neutral-800/70'/>

        <div className=" flex mb-0 min-h-96 lg:mt-[-35px] bg-black 
        justify-center items-center overflow-hidden " 
        style={{ height: '100px' }}>
          <div className="box 
          h-[205px] max-w-[150px]
          md:max-h-[305px] md:max-w-[250px]
          lg:max-h-[405px] lg:max-w-[350px]
          flex items-center justify-center">
          <Image 
            src={event.imageURL}
            alt="Ticket artwork"
            width={100}
            height={100}
            className="h-full border border-0.5 border-neutral-800/40 
            object-contain w-auto spin"
          />
          </div>
        </div>
      </div>
    </section>



    <section id="#organizer" className='wrapper lg:max-w-[500px]'>
      <div className='text-left rounded-none items-center
        w-full bg-black flex flex-row border border-neutral-800/70 p-3'>
          <Ticket width={22} height={22} className='text-neutral-700 mr-1.5 -rotate-45 rounded-full p-0.5'/>
            <p className='text-neutral-700 p-regular-16 line-clamp-1'>by @{event.organizer.username}
            </p>
      </div>

      {/* <hr className='border border-neutral-800/70'/> */}

      <div className='text-left rounded-none items-center
        w-full bg-black flex flex-row border border-neutral-800/70 p-3 border-t-0'>
            <p className='text-neutral-700 p-regular-16 text-wrap'>
              To learn more about this Ticket please click this link{' '}
              <Link href={`${event.url}`}>
                <span className='underline'>here</span>
              </Link>
              . Sales for this ticket close on {formatDateTime(event.startDateTime).dateOnly}, {' '}at{' '}
              {formatDateTime(event.startDateTime).timeOnly}.
            </p>
      </div>
    </section>
</div>



<div className='md:flex md:flex-col'>
    {/* EVENTS FROM THE SAME CATEGORY */}
    <section className='wrapper my-0 flex flex-col gap-1 md:gap-2'>
      <div className='gap-0'>
      <p className='p-regular-14 md:p-regular-16 text-neutral-700 pt-3 md:py-0'>
          More {event.category.name} tickets
        </p>
        {/* <h3 className='h3-medium text-left text-wrap text-white'>We think you'll like</h3> */}
      </div>

      {/* <Search /> */}

      <Collection 
          data={relatedEvents?.data}
          emptyTitle="No Tickets found."
          emptyStateSubtext="We couldn&apos;t find any Tickets similar to this one."
          collectionType="All_Events"
          limit={6}
          page={1}
          totalPages={2}
        />
    </section>




    {/* <hr className="opacity-15"/> */}
      <section id="questions" className=" text-white wrapper mt-2 mb-8 flex flex-col gap-8 md:gap-12
      ">
        <Faq />
      </section>
  </div>

      </div>
    </>
  )
}

export default EventDetails