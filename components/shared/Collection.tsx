import { iEvent } from '@/lib/database/models/event.model'
import React from 'react'
import Card from './Card'
import Pagination from './Pagination'

type CollectionProps = {
    data: iEvent[],
    emptyTitle: string,
    emptyStateSubtext: string,
    limit: number,
    page: number | string,
    totalPages?: number,
    urlParamName?: string,
    collectionType?: 'Events_Organized' | 'My_Tickets' | 'All_Events' | 'Public_Events_Organized'
}

const Collection = ({
    data,
    emptyTitle,
    emptyStateSubtext,
    page,
    totalPages = 0,
    collectionType,
    urlParamName,
}: CollectionProps) => {
  return (
    <>
      {data.length > 0 ? (
        <div className='flex flex-col items-center gap-10'>
            <ul className='grid w-full grid-cols-1 gap-5 md:gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 xl:gap-0'>
                {data.map((event) => {
                    const isPrivateOrganizerView = collectionType === 'Events_Organized';
                    const isPublicOrganizerView = collectionType === 'Public_Events_Organized';
                    const isMyTickets = collectionType === 'My_Tickets';
                    
                    const hasOrderLink = isPrivateOrganizerView;
                    const hidePrice = isMyTickets;
                    const showStats = isPrivateOrganizerView;
                    
                    return (
                        <li key={event._id} className='flex justify-center'>
                        <Card
                        event={event}
                        hasOrderLink={hasOrderLink}
                        hidePrice={hidePrice}
                        showStats={showStats}
                      />
                        </li>
                    )
                })}
            </ul>

            {/* {totalPages > 1 && (
              <Pagination urlParamName={urlParamName} page={page} totalPages={totalPages}/>
            )} */}
        </div>
      ): (
        <div className='text-muted-foreground flex-left wrapper
         text-left text-neutral-700 w-full flex-col gap-1 rounded-[14px] py-28'>
            <h3 className='p-medium-20 md:h4-medium'>{emptyTitle}</h3>
            <p className='p-regular-14 md:p-regular-20'>{emptyStateSubtext}</p>
        </div>
      )}
    </>
  )
}

export default Collection