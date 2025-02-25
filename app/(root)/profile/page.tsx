import Collection from '@/components/shared/Collection'
import UserInfo from '@/components/shared/UserInfo'
import { Button } from '@/components/ui/button'
import { getEventsByUser } from '@/lib/actions/event.actions'
import { iEvent } from '@/lib/database/models/event.model'
import { auth, currentUser, UserButton } from '@clerk/nextjs'
import { CirclePlus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { IBM_Plex_Mono } from 'next/font/google';

const ibmMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '600'] })


const ProfilePage = async () => {
  const user = await currentUser(); // Fetch user details from Clerk
  const userFullName = user?.firstName + " " + user?.lastName; // Combine first and last name
  const userEmail = user?.emailAddresses[0]?.emailAddress; // Get primary email
  const userName = user?.username;

  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const organizedEvents = await getEventsByUser({ userId, page: 1 });

  return (
      <>
          {/* <div className='w-full bg-black/60 p-4 border-r-0 border-l-0 border-t-0 border-b-neutral-800/50 border flex-col gap-1 flex sticky-header header-blur absolute'>
              <p className={`${ibmMono.className} ibm-18 text-white`}>MISSING BANK DETAILS</p>
              <p className='text-neutral-600 p-regular-12'>
                You've made your Tickets but users can't pay to you. 
                Add your bank details, it only takes 10 seconds</p>
          </div> */}

          {/* USER INFO */}
          <section className='wrapper text-white'>
            <div className='w-full bg-neutral-950/60 border border-neutral-800/50 p-4'>
              <h1 className='text-xl font-normal'>{userFullName}</h1>
              <p className='text-sm text-neutral-600'>@{userName}</p>

              <div className='flex flex-row gap-6 md:gap-24 mt-8'>
                <div className='flex flex-col'>
                  <p className='p-regular-12 text-neutral-600'>Email</p>
                  <p className={`${ibmMono.className} font-normal p-regular-14`}>{userEmail}</p>
                </div>

                <div className='flex flex-col'>
                  <p className='p-regular-12 text-neutral-600'>Sales Status</p>
                  <p className={`${ibmMono.className} font-normal p-regular-14 text-neutral-500`}>Inactive</p>
                </div>
              </div>
            </div>

            
          </section>

          {/* Rest of the page */}

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
                  emptyTitle="You haven&apos;t created any tickets yet"
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
};

export default ProfilePage;
