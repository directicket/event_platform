import CheckoutButton from '@/components/shared/CheckoutButton';
import Collection from '@/components/shared/Collection';
import { getEventById, getRelatedEventsByCategory } from '@/lib/actions/event.actions'
import { formatDateTime } from '@/lib/utils';
import { SearchParamProps } from '@/types'
import { Calendar, MapPin } from 'lucide-react';
import Image from 'next/image';

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
        <Image 
          src={event.imageURL}
          alt="hero image"
          width={1000}
          height={1000}
          className="min-h-[300px] max-h-[2500px] h-fit w-full md:rounded-md object-cover object-center"
        />

        <div className='flex w-full flex-col gap-8 p-5 md:p-10 bg-white'>
          <div className='flex flex-col gap-6'>
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
                by{' '}
                <span className='text-black'>{event.organizer.firstName} {event.organizer.lastName}</span>
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
            <p className='p-bold-20 text-black'>Ticket description</p>
            <p className='p-regular-16 lg:p-regular-18'>{event.description}</p>
            <p className='p-bold-16 lg:p-bold-18 mt-6'>Stay updated</p>
            <p className='p-regular-16 lg:p-regular-18 text-black mt-[-5px]'>Learn more about this event via this link: {' '}
              <a href={`${event.url}`}>
                <span className='truncate text-blue-600 underline'>{event.url}</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* EVENTS FROM THE SAME CATEGORY */}
    <section className='wrapper my-8 flex flex-col gap-8 md:gap-12'>
      <h2 className='h2-bold'>More like this</h2>

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
    </>
  )
}

export default EventDetails