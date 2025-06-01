import { getEventById } from '@/lib/actions/event.actions'
import TagDropdown from './TagDropdown'

const TagDropdownWrapper = async ({ eventId }: { eventId: string }) => {
  const event = await getEventById(eventId)

  const currentTagId = event?.tags || ''

  return <TagDropdown eventId={eventId} currentTagId={currentTagId} />
}

export default TagDropdownWrapper
