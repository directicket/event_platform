import Collection from '@/components/shared/Collection';
import { getEventsByUser } from '@/lib/actions/event.actions';
import { auth, currentUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { IBM_Plex_Mono } from 'next/font/google';
import { useEffect, useState } from "react";
import BankDetailsStatus from '@/components/shared/BankDetailsStates'
import { TrendingUp, HandCoins, ArrowRight, Globe, Sunrise, HandHeart, Plus, Ticket, CircleUserRound } from 'lucide-react';
import Footer from '@/components/shared/Footer';
import CopyText from '@/components/shared/CopyText';
import CollectionDashboard from '@/components/shared/CollectionDashboard';

const ibmMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '600'] });

export default async function ProfilePage() {
  const user = await currentUser();
  const userFullName = `${user?.firstName} ${user?.lastName}`;
  const userEmail = user?.emailAddresses[0]?.emailAddress;
  const userName = user?.username;

  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const organizedEvents = await getEventsByUser({ userId, page: 1 });

  return (
    <>
    <div className='mt-16'>
      {/* USER INFO */}
      <section className='wrapper text-white flex flex-col gap-3'>
        <div className='w-full bg-neutral-950/70 border border-neutral-800/50 p-4 rounded-md'>
          <h1 className='text-xl font-normal'>{userFullName}</h1>
          <CopyText text={`directicket.live/${userName}`} />

          <div className='flex flex-row gap-6 md:gap-24 mt-8'>
            <div className='flex flex-col'>
              <p className='p-regular-12 text-neutral-600'>Email</p>
              <p className={`${ibmMono.className} truncate font-normal p-regular-14 max-w-44 md:max-w-fit line-clamp-1`}>{userEmail}</p>
            </div>
            <div className='flex flex-col'>
              <p className='p-regular-12 text-neutral-600'>Bank details</p>
              <BankDetailsStatus />
            </div>
          </div>

          
          <div className='flex flex-row justify-between gap-4'>
          <Link href={`/${user?.username}`} className='w-full'>
          <div className='w-full rounded-sm gap-2 justify-between flex flex-row p-3 hover:text-white hover:bg-neutral-800/75 bg-neutral-900/75 mt-4 border border-neutral-900'>
            <p className='p-regular-14 self-center ml-0.5'>View Profile</p>
            <CircleUserRound width={17} height={17} className='self-center'/>
          </div>
          </Link>

          <Link href={`/profile/my-orders`} className='w-full'>
          <div className='w-full rounded-sm gap-2 justify-between flex flex-row p-3 hover:text-white hover:bg-neutral-800/75 bg-neutral-900/75 mt-4 border border-neutral-900'>
            <p className='p-regular-14 self-center ml-0.5'>My Purchases</p>
            <Ticket width={16} height={16} className='self-center -rotate-45'/>
          </div>
          </Link>
          </div>

          <Link href={`/events/create`}>
          <div className='rounded-sm justify-between flex flex-row p-3 text-black hover:text-black hover:bg-yellow-400/85  bg-yellow-400 mt-4 border border-neutral-900'>
            <p className='p-regular-14 self-center ml-0.5'>Create Ticket</p>
            <Plus width={16} height={16} className='self-center'/>
          </div>
          </Link>
        </div>

          
      </section>

      {/* LISTINGS */}
      <section className='bg-black bg-cover bg-center pt-5 md:pt-16 md:py-2 mb-2'>
        <div className='wrapper flex flex-col gap-0'>
          <h3 className='text-xl md:p-regular-18 text-left sm:text-left text-white'>
            Manage Tickets
          </h3>
          <p className='p-regular-14 md:p-regular-18 text-left sm:text-left text-neutral-600'>
            View all the tickets you've created on directicket.
          </p>
        </div>
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
