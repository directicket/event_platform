import { getUserByUsername } from '@/lib/actions/user.actions'
import { getEventsByUser } from '@/lib/actions/event.actions'
import Event from '@/lib/database/models/event.model'
import Collection from '@/components/shared/Collection'
import { IBM_Plex_Mono } from 'next/font/google';
import Footer from '@/components/shared/Footer';

const ibmMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '600'] });

type Props = {
  params: { username: string }
}

export default async function PublicProfilePage({ params }: Props) {
  const user = await getUserByUsername(params.username)

  if (!user) return <div>User not found</div>

  const eventCount = await Event.countDocuments({ organizer: user._id })

  const organizedEvents = await getEventsByUser({ userId: user._id, page: 1 })

  const totalTicketsSold = organizedEvents?.data?.reduce((acc: number, event: any) => {
    return acc + (event.amountSold || 0)
  }, 0) || 0

  return (
    <>
    <div>
        <section className='wrapper text-white flex flex-col gap-1 xl:overflow-clip'>
        <div className="mt-[-20px] relative left-1/2 right-1/2 -mx-[50vw] w-screen h-[33vh] md:h-[20vh] overflow-hidden">
  {/* Background image section */}
  <div
  className="absolute inset-0 z-0 blur-md"
  style={{
    backgroundImage: `url(${user.photo})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'blur(5px) brightness(0.5)',
    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',

  }}
/>

</div>

<div className='relative z-10 flex flex-auto items-center justify-between gap-2 text-left min-h-40 mt-[-4rem]'>
  <div className='flex flex-row-reverse gap-3 w-full justify-between px-4'>
    <img 
      src={user.photo} 
      alt={`${user.firstName} ${user.lastName}'s profile picture`}
      className="w-16 h-16 rounded-full object-cover border border-neutral-800 self-end"
    />
    
    <div className='flex flex-col gap-0.5 self-center max-w-[275px] overflow-clip'>
      <h1 className='p-regular-24 font-bold w-full line-clamp-1'>{user.firstName} {user.lastName} <span>{user.isVerified && ( <img src='/assets/icons/white-black-check.svg' alt='verified' className='inline w-5 h-5 mb-0.5'/>)}</span></h1>
      
      <div className='flex flex-row items-start justify-start'>
        <div className='flex flex-row gap-1'>
          <p className="text-sm font-medium text-white">
            {eventCount} {eventCount === 1 ? 'Ticket' : 'Tickets'}
          </p>
        </div>
      </div>
      
      <p className={`${ibmMono.className} text-sm text-neutral-400 truncate`}>
        directicket.live/<span className='font-bold text-white'>{user.username}</span>
      </p>
    </div>
  </div>
</div>

            <Collection 
                data={organizedEvents?.data}
                emptyTitle="No tickets yet"
                emptyStateSubtext="When they create tickets, they'll show up here."
                collectionType="Public_Events_Organized"
                limit={400}
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
  )
}
