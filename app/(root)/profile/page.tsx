import Collection from '@/components/shared/Collection';
import { getEventsByUser } from '@/lib/actions/event.actions';
import { auth, currentUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { IBM_Plex_Mono } from 'next/font/google';
import { useEffect, useState } from "react";
import BankDetailsStatus from '@/components/shared/BankDetailsStates'
import { TrendingUp } from 'lucide-react';

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

      {/* USER INFO */}
      <section className='wrapper text-white flex flex-col gap-3'>
        <div className='w-full bg-neutral-950/60 border border-neutral-800/50 p-4'>
          <h1 className='text-xl font-normal'>{userFullName}</h1>
          <p className='text-sm text-neutral-600'>@{userName}</p>

          <div className='flex flex-row gap-6 md:gap-24 mt-8'>
            <div className='flex flex-col'>
              <p className='p-regular-12 text-neutral-600'>Email</p>
              <p className={`${ibmMono.className} font-normal p-regular-14 max-w-44 md:max-w-fit line-clamp-1`}>{userEmail}</p>
            </div>
            <div className='flex flex-col'>
              <p className='p-regular-12 text-neutral-600'>Bank details</p>
              <BankDetailsStatus />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-col p-4 bg-neutral-950/60 border border-neutral-800/50 gap-1">
            <div className="flex flex-row gap-[5.5px]">
              <TrendingUp width={20} height={20} className='text-white'/>
              <p className={`${ibmMono.className} ibm-14 text-white`}>SALES INSIGHTS</p>
            </div>
            <p className="p-regular-12 md:p-regular-16 text-neutral-600">
              You'll soon be able to track all your ticket sales right from this page.</p>
          </div>
        </div>
      </section>

      {/* LISTINGS */}
      <section className='bg-black bg-cover bg-center pt-5 md:pt-16 md:py-2'>
        <div className='wrapper flex items-left justify-left sm:justify-between align-middle'>
          <h3 className='p-regular-16 md:p-regular-18 text-left sm:text-left text-white'>
            Your Listings
          </h3>
          <Button size="sm" className='flex-row bg-black text-white hover:text-black hover:bg-white p-medium-12 underline rounded-full hidden sm:flex'>
            <Link href="/events/create">New Ticket</Link>
          </Button>
        </div>
      </section>

      <section className='wrapper mt-[-30px]'>
        <Collection 
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
    </>
  );
}
