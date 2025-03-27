import Countdown from '@/components/shared/Countdown';

const EventPage = () => {
  const eventDate = new Date("2025-03-28T00:00:00Z").getTime(); // Set your event date here

  return (
    <div className='text-white flex flex-col items-center justify-center h-screen text-center'>
      <h1 className='p-20-regular'>START SELLING MARCH 27</h1>
      <Countdown targetDate={eventDate} />
    </div>
  );
};

export default EventPage;
