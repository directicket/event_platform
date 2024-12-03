import Collection from '@/components/shared/Collection'
import { Button } from '@/components/ui/button'
import { getEventsByUser } from '@/lib/actions/event.actions'
import { auth } from '@clerk/nextjs'
import { CirclePlus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const ProfilePage = async () => {
    const { sessionClaims } = auth();
    const userId  = sessionClaims?.userId as string;

    const organizedEvents = await getEventsByUser({ userId, page: 1 })

  return (
    <>
      {/*MY TICKETS */}
      <section className='bg-white bg-cover bg-center py-5 md:py-10'>
        <div className='wrapper flex items-left justify-left sm:justify-between align-middle'>
            <h3 className='p-medium-20 md:p-medium-24 text-left sm:text-left align-middle'>Your Purchases</h3>
            <Button asChild size="sm" className='bg-white text-black hover:text-white hover:bg-black p-medium-12 border border-black rounded-full hidden sm:flex'>
                <Link href="/#events">Browse more</Link>
            </Button>
        </div>
      </section>

      {/* <section className='wrapper my-8'>
        <Collection 
          data={events?.data}
          emptyTitle="You haven&apos;t boought any tickets yet"
          emptyStateSubtext="Whenever you buy tickets they will show up here."
          collectionType="My_Tickets"
          limit={3}
          page={1}
          urlParamName='ordersPage'
          totalPages={2}
        />
      </section> */}

      {/*EVENTS ORGANIZED */}
      <section className='bg-white bg-cover bg-center py-16 md:py-24'>
        <div className='wrapper flex items-left justify-left sm:justify-between align-middle'>
          <h3 className='p-medium-20 md:p-medium-24 text-left sm:text-left'>Your Tickets</h3>
            <Button size="sm" className='flex-row bg-white text-black hover:text-white hover:bg-black p-medium-12 border border-black rounded-full hidden sm:flex'>
                <CirclePlus height={18} width={18} className='pr-1'/>
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
  )
}

export default ProfilePage