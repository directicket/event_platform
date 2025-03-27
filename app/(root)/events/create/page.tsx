import EventForm from "@/components/shared/EventForm"
import { auth } from "@clerk/nextjs"

const CreateEvent = () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  return (
    <>
    <section className="bg-black md:max-w-4xl bg-cover bg-center py-2 wrapper">
      <h2 className="p-regular-20 md:p-regular-20 text-wrap text-white">Create a Ticket</h2>
        <p className="text-neutral-600 text-left">If you haven't,{' '}<a href='/profile/bank-details' className='text-blue-700 underline'>click here to add your bank details.</a>{' '}Make sure your Ticket contains accurate details.</p>
    </section> 

    <div className="wrapper md:max-w-4xl">
      <EventForm userId={userId} type="Create" />
    </div>

    <div className="wrapper mt-[-30px] md:max-w-4xl ">
    <p className="text-gray-400 p-regular-14 wrapper text-left mt-[-30px]">By clicking 'Create Ticket' you agree to our Terms of Service.</p>
    </div>
    </>
  )
}

export default CreateEvent