import EventForm from "@/components/shared/EventForm"
import { auth } from "@clerk/nextjs"

const CreateEvent = () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  return (
    <>
    <section className="bg-white bg-cover bg-center py-2 md:py-10">
        <h3 className="wrapper h3-bold text-left sm:text-left">Create a Ticket</h3>
        <p className="text-gray-400 wrapper text-left mt-[-30px]">Event details are verified by Directicket to help keep our platform safe.</p>
    </section>

    <div className="wrapper my-6">
      <EventForm userId={userId} type="Create" />
    </div>

    <div className="wrapper mt-[-30px]">
    <p className="text-gray-400 p-regular-14 wrapper text-left mt-[-30px]">By clicking 'Create Ticket' you agree to our Terms of Service.</p>
    </div>
    </>
  )
}

export default CreateEvent