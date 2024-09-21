import CheckoutButton from '@/components/shared/CheckoutButton';
import Collection from '@/components/shared/Collection';
import { getEventById, getRelatedEventsByCategory } from '@/lib/actions/event.actions'
import { formatDateTime } from '@/lib/utils';
import { SearchParamProps } from '@/types'
import { BadgeCheck, Calendar, MapPin } from 'lucide-react';
import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const EventDetails = async ({ params: { id }, searchParams }: SearchParamProps) => {
  const event = await getEventById(id);

  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: searchParams.page as string,
  })

  return (
    <>
    <section className="flex justify-center bg-white bg-contain">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
        <div className="wrapper flex mb-[-15px]">
          <Image 
            src={event.imageURL}
            alt="hero image"
            width={1000}
            height={1000}
            className="min-h-[300px] max-h-[2500px] rounded-md h-fit w-full md:rounded-md object-cover object-center"
          />
        </div>

        <div className='flex w-full flex-col gap-8 p-5 md:p-10 bg-white'>
          <div className='flex flex-col gap-6'>
            <div className='flex gap-1'>
              <BadgeCheck className='w-5 text-muted-foreground'></BadgeCheck>
              <p className='text-muted-foreground'>Verified by Directicket</p>
            </div>
            <h2 className='h2-bold'>{event.title}</h2>

            <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
              <div className='flex gap-3'>
                <p className='p-bold-16 rounded-sm bg-green-500/10 px-5 py-2 text-green-700'>
                  {event.isFree ? 'FREE' : `₦${event.price}`}
                </p>
                <p className='p-medium-16 rounded-sm bg-grey-500/10 px-4 py-2 text-grey-500'>
                  {event.category.name}
                </p>
              </div>

              <p className='p-medium-16 ml-2 mt-2 sm:mt-0 text-muted-foreground'>
                Created by{' '}
                <span className='text-black p-bold-16'>@{event.organizer.username}</span>
              </p>
            </div>
          </div>

          <CheckoutButton event={event} />

          <div className='flex flex-col gap-5 mt-[-25px]'>
            <div className='flex gap-2 md:gap-3'>
              <div className='p-medium-16 lg:p-regular-20 flex flex-wrap items-center'>
                <p className='text-black ml-1'>Get this Ticket before sales end on {' '} 
                  <span className='text-red-500'>
                    {formatDateTime(event.startDateTime).dateOnly}, 
                    {formatDateTime(event.startDateTime).timeOnly}
                  </span>.</p>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-5'>
            <div className='flex gap-2 md:gap-3'>
              <Calendar width={24} height={24} className='text-muted-foreground mr-[-5px]'/>
              <div className='p-medium-16 lg:p-regular-20 flex flex-wrap items-center'>
              <p className='text-muted-foreground ml-1'>{formatDateTime(event.endDateTime).dateOnly}, {formatDateTime(event.endDateTime).timeOnly}</p>
              </div>
            </div>


            <div className='p-regular-18 flex items-center gap-3'>
              <MapPin width={24} height={24} className='text-muted-foreground mr-[-5px]'/>
              <p className='text-muted-foreground p-medium-16 lg:p-regular-20'>{event.location}</p>
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <p className='p-bold-16 lg:p-bold-18'>Ticket description</p>
            <p className='p-regular-16 lg:p-regular-18 mt-[-5px]'>{event.description}</p>
            <p className='p-bold-16 lg:p-bold-18 mt-6'>Stay updated</p>
            <p className='p-regular-16 lg:p-regular-18 text-black mt-[-5px]'>Learn more about this event via this link: {' '}
              <a href={`${event.url}`} className="truncate text-wrap">
                <span className='truncate text-blue-600 underline text-wrap'>{event.url}</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* EVENTS FROM THE SAME CATEGORY */}
    <section className='wrapper my-8 flex flex-col gap-8 md:gap-12'>
      <h3 className='h3-medium mb-[-15px] text-wrap'>Other {' '}{event.category.name}{' '} Tickets</h3>

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

    <section className="wrapper my-8 flex flex-col gap-8 md:gap-12
      ">
        <div className="flex flex-col gap-5">
          <h3 className="h3-medium">Questions & answers</h3>
          <div className="flex flex-col justify-center gap-8 mt-[-20px]">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="p-regular-20">Why choose Directicket?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground p-semibold-14 md:max-w-[500px]">
                  Directicket is a first-of-its-kind ticket-focused platform. With Directicket, 
                  you can manage each ticket on its own page with lots of customization options. 
                  Directicket also pays more on average than its closest competing platform and is the 
                  top choice for a wide range of users seeking intelligent control over the 
                  ticketing experience for their events.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="flex flex-col justify-center gap-8 mt-[-20px]">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="p-regular-20 text-left text-wrap">Are there any limits on the amount of tickets that can be sold?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground p-semibold-14 md:max-w-[500px]">
                  On Directicket, you can sell as many tickets as you want. We&apos;re ready for crowds of every size.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="flex flex-col justify-center gap-8 mt-[-20px]">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="p-regular-20 text-left text-wrap">Are there any fees associated with using Directicket?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground p-semibold-14 md:max-w-[500px]">
                  Directicket charges a service fee of 15% of the ticket price to ticket buyers. 
                  The only money we make is from the service fee we charge and the rest is yours.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="flex flex-col justify-center gap-8 mt-[-20px]">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="p-regular-20 text-left text-wrap">How fast do I get paid using Directicket?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground p-semibold-14 md:max-w-[500px]">
                  You can expect to recieve the money you've made from ticket sales in 2-5 working days. As time goes, on we expect this time span to shorten.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="flex flex-col justify-center gap-8 mt-[-20px]">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="p-regular-20 text-left text-wrap">How can I get in contact with customer support?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground p-semibold-14 md:max-w-[500px]">
                  You can text us on Snapchat @directicket or call either 09025771255 or 09035960581.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </>
  )
}

export default EventDetails