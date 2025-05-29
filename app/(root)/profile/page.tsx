import Collection from '@/components/shared/Collection';
import { getEventsByUser } from '@/lib/actions/event.actions';
import { auth, currentUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { IBM_Plex_Mono } from 'next/font/google';
import { useEffect, useState } from "react";
import BankDetailsStatus from '@/components/shared/BankDetailsStates'
import { TrendingUp, HandCoins, ArrowRight, Globe, Sunrise, HandHeart, Plus, Ticket, CircleUserRound, SquareArrowOutUpRight } from 'lucide-react';
import Footer from '@/components/shared/Footer';
import CopyText from '@/components/shared/CopyText';
import CollectionDashboard from '@/components/shared/CollectionDashboard';
import { getUserById, getUserByUsername } from '@/lib/actions/user.actions';
import Event from '@/lib/database/models/event.model'
import Search from '@/components/shared/Search';
import { useSearchParams } from 'next/navigation';
import CountUp from 'react-countup';
import InViewCounter from '@/components/shared/RevenueConter';

const ibmMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '600'] });

export default async function ProfilePage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const query = typeof searchParams.query === 'string' ? searchParams.query : '';
  const user = await currentUser();
  const userFullName = `${user?.firstName} ${user?.lastName}`;
  const userFirstName = user?.firstName
  const userEmail = user?.emailAddresses[0]?.emailAddress;
  const userName = user?.username;
  const userPhoto = user?.imageUrl

  const stringUserName = userName?.toString()

  // const userUserName = await getUserByUsername(stringUserName)

  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const organizedEvents = await getEventsByUser({ query, userId, page: 1 });

  const userObject = await getUserById(userId)

    const ticketCount = await Event.countDocuments({ organizer: userId })
  
    const ticketMade = await getEventsByUser({ userId: userId, page: 1 })
  
    const totalTicketsSold = organizedEvents?.data?.reduce((acc: number, event: any) => {
      return acc + (event.amountSold || 0)
    }, 0) || 0

    const totalTicketsRevenue = organizedEvents?.data?.reduce((acc: number, event: any) => {
      const price = Number(event.price) || 0
      const sold = Number(event.amountSold) || 0
      return acc + price * sold
    }, 0) || 0


  return (
    <>
    <div className='mt-16'>
      {/* USER INFO */}
      <section className='wrapper text-white flex flex-col gap-2'>

        
        <h1 className='h3-regular font-normal'>
          <span className='text-neutral-600'>Hello,</span> <br/>{userFullName} {userObject.isVerified && ( <img src='/assets/icons/white-black-check.svg' alt='verified' className='inline w-5 h-5 mb-0.5'/>)}</h1>
        
        <div className='flex flex-auto gap-2'>
        <CopyText text={`directicket.live/${userName}`} />
        <a 
          href={`/${userName}`}
          className='text-sm p-0.5 px-2 bg-black hover:bg-white/90 text-neutral-200 hover:text-neutral-900 border border-neutral-800/80 w-fit ibm-12 rounded-sm'>
              View <SquareArrowOutUpRight height={14} width={14} className={`inline self-center mb-0.5`} />
              
        </a>
        </div>

        {/* <div className='flex flex-row items-start justify-start'>
        <div className='flex flex-row gap-1'>
          <p className="text-sm font-medium text-white">
            {ticketCount} {ticketCount === 1 ? 'Ticket' : 'Tickets'}
          </p>
          <p className='text-sm font-regular text-white'>
            &bull;
          </p>
          <p className="text-sm font-medium text-white">
            {totalTicketsSold} {totalTicketsSold === 1 ? 'All-time Sale' : 'All-time Sales'}
          </p>
        </div>
      </div> */}

        <div className='flex flex-row gap-6 md:gap-24 mt-3 p-4 border border-neutral-800 rounded-md'>
            <div className='flex flex-col'>
              <p className='p-regular-12 text-neutral-600'>Tickets</p>
              <p className={`${ibmMono.className} truncate font-normal p-regular-14 max-w-44 md:max-w-fit line-clamp-1`}>
                {ticketCount}</p>
            </div>
            <div className='flex flex-col'>
              <p className='p-regular-12 text-neutral-600'>Sales</p>
              <p className={`${ibmMono.className} truncate font-normal p-regular-14 max-w-44 md:max-w-fit line-clamp-1`}>
                {totalTicketsSold}</p>
            </div>
            <div className='flex flex-col'>
              <p className='p-regular-12 text-neutral-600'>Revenue</p>
              <InViewCounter totalTicketsRevenue={totalTicketsRevenue} />
            </div>
            <div className='w-[1px] border border-neutral-900 rounded-md'>

            </div>
            <div className='flex flex-col'>
              <p className='p-regular-12 text-neutral-600 line-clamp-1'>Bank details</p>
              <BankDetailsStatus />
            </div>
          </div>
        
 
          <div className='flex flex-row justify-between gap-2 mt-[1px]'>

          <Link href={`/profile/my-orders`} className='w-full'>
          <div className='w-full rounded-sm gap-2 justify-between flex flex-row p-3 hover:text-white hover:bg-neutral-800/75 bg-neutral-900/75 border border-neutral-900'>
            <p className='p-regular-14 self-center ml-0.5'>My Purchases</p>
            <Ticket width={16} height={16} className='self-center -rotate-45'/>
          </div>
          </Link>

          <Link href={`/events/create`} className='w-full'>
          <div className='rounded-sm justify-between flex flex-row p-3 text-black hover:text-black hover:bg-white/85 bg-neutral-100 border border-neutral-900'>
            <p className='p-regular-14 self-center ml-0.5'>Create Ticket</p>
            <Plus width={16} height={16} className='self-center'/>
          </div>
          </Link>
          </div>

          
          
      </section>

      {/* LISTINGS */}
      <section className='bg-black bg-cover bg-center pt-5 md:pt-16 md:py-2 mb-2 wrapper'>
        <Search />
      </section>

      <section className='wrapper mt-[-30px]'>
        <CollectionDashboard
          data={organizedEvents?.data}
          emptyTitle="You haven't created any tickets yet"
          emptyStateSubtext="Whenever you create tickets they will show up here."
          collectionType="Events_Organized"
          limit={12}
          page={1}
          urlParamName='eventsPage'
          totalPages={2}
        />
      </section>
      </div>

      <div className='text-white wrapper'>
            <Footer />
            </div>
    </>
  );
}
