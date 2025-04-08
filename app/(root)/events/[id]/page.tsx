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
import { IBM_Plex_Mono } from 'next/font/google';
import SpotifyPreview from '@/components/shared/SpotifyPreview';

const ibmMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '600'] })

const EventDetails = async ({ params: { id }, searchParams }: SearchParamProps) => {
  const event = await getEventById(id);

  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: searchParams.page as string,
  })

  return (
    <>
    <div className='wrapper md: w-md:self-center md:flex md:flex-auto gap-10'>
      <div className=' text-white md:w-[58%]'>
        <div className=' flex flex-col md:flex-row max-h-xl gap-2 md:gap-6'> {/* outer box div */}
          
          <div className='max-w-xl lg:px-10 md:px-8 self-center'> {/* Openning of ticket artwork div */}
            <div className="flex mt-6 mb-20 md:mb-0 md:mt-0 min-h-96 bg-black 
              justify-center items-center overflow-hidden" 
              style={{ height: '100px' }}>
              <div className="box h-[205px] max-w-[150px] 
                    md:max-h-[305px] md:max-w-[250px] lg:max-h-[405px]
                    lg:max-w-[350px] flex items-center justify-center">
                <Image src={event.imageURL} alt="Ticket artwork"
                  width={100} height={100}
                  className="h-full border border-0.5 
                  border-neutral-800/40 object-contain 
                    w-auto spin"
                />
              </div>
            </div>
          </div> {/* End of ticket artwork div */}
          
          <div className='flex flex-col md:self-center md:pr-8'>
            <div className='flex flex-auto gap-4 md:gap-6'>
              <div className='w-full'>
                <p className='p-regular-14 md:p-medium-14'>{event.title}</p>
              </div>

              <div>
                <p className={`${ibmMono.className} ibm-14 md:ibm-16 mt-[-0.4px] text-neutral-600`}>
                  {event.isFree ? 
                  <span className={`${ibmMono.className}text-yellow-300`}>FREE</span> : `₦${event.price}`}
                </p>
              </div>
            </div>

            <div className='mt-1'>
              <CheckoutButton event={event}/>
            </div>

            
            <div className='flex flex-col gap-1 mt-8 md:mt-12'>
              <p className='p-regular-12'>
                {event.description}
              </p>

              <div className='flex flex-auto gap-6 mt-2'>
                <div className='w-[50%]'>
                  <p className='p-regular-12'>{event.location}</p>
                </div>
                <div className='flex flex-auto gap-4'>
                  <div className='w-full'>
                    <p className='p-regular-12'>{formatDateTime(event.startDateTime).dateOnly}</p>
                  </div>
                  <div className='w-full'>
                    <p className='p-regular-12 self-end text-right'>{formatDateTime(event.startDateTime).timeOnly}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div> {/* close of container */}
      </div>
        



      <div className='md:flex md:flex-col gap-8 mt-12 md:mt-0'>
          <SpotifyPreview playlistUrl={`${event.url}`}/>



  <div className='md:flex md:flex-col md:mt-0 mt-10'>
      {/* EVENTS FROM THE SAME CATEGORY */}
      <section className='my-0 flex flex-col'>
        <div className='gap-0'>
        <p className='p-regular-14 md:p-regular-16 text-white md:py-0 mb-2'>
            See more {event.category.name} tickets
          </p>
          <hr className='border border-neutral-800/70 border-1'/>
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
      </div>



      {/* <hr className="opacity-15"/> */}
        {/* <section id="questions" className=" text-white wrapper mt-2 mb-8 flex flex-col gap-8 md:gap-12
        ">
          <Faq />
        </section> */}

          {/* <div className="flex mb-0 min-h-96 lg:mt-[-35px] bg-black 
            justify-center items-center overflow-hidden " 
            style={{ height: '100px' }}>
            <div className="box h-[205px] max-w-[150px] md:max-h-[305px] 
            md:max-w-[250px] lg:max-h-[405px] lg:max-w-[350px] flex 
            items-center justify-center">
            <Image 
              src={event.imageURL}
              alt="Ticket artwork"
              width={100}
              height={100}
              className="h-full border border-0.5 border-neutral-800/40 
              object-contain w-auto spin"
            />
            </div>
          </div> */}
    </div>
    </div>
  </>
  )
}

export default EventDetails