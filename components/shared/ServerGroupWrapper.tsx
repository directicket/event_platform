// components/server/UserOrganizedEvents.tsx
import CollectionGroups from './CollectionGroups'
import { getEventsByUser } from '@/lib/actions/event.actions'
import { auth, currentUser } from '@clerk/nextjs'

type Props = {
  query: string
}

export default async function UserOrganizedEvents({ query }: Props) {
  const user = await currentUser()
  const { sessionClaims } = auth()
  const userId = sessionClaims?.userId as string

  const organizedEvents = await getEventsByUser({ query, userId, page: 1 })

  return (
    <CollectionGroups  
      data={organizedEvents?.data}
      emptyTitle="You haven't created any tickets yet"
      emptyStateSubtext="Whenever you create tickets they will show up here."
      collectionType="Events_Organized"
      limit={12}
      page={1}
      urlParamName='eventsPage'
      totalPages={2}
    />
  )
}
