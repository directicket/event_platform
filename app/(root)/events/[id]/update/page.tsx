import EventForm from "@/components/shared/EventForm"
import { getEventById } from "@/lib/actions/event.actions"
import { auth } from "@clerk/nextjs"

type UpdateEventProps = {
  params: {
    id: string
  }
}

const UpdateEvent = async ({ params: { id } }: UpdateEventProps) => {

  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  const event = await getEventById(id)

  return (
    <>
    <section className="bg-white bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-left sm:text-left">Edit Ticket details</h3>
        <p className="text-gray-400 wrapper text-left mt-[-30px]">Event details are verified by Directicket to help keep our platform safe.</p>
    </section>

    <div className="wrapper my-8">
        <EventForm 
          type="Update" 
          event={event} 
          eventId={event._id} 
          userId={userId} 
        />
    </div>

    <div className="wrapper mt-[-30px]">
    <p className="text-gray-400 p-regular-14 wrapper text-left mt-[-30px]">By clicking 'Update Ticket' you agree to our Terms of Service.</p>
    </div>
    </>
  )
}

export default UpdateEvent