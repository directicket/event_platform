import { Construction } from 'lucide-react'

const EventPage = () => {

  return (
    <div className='text-white flex flex-col items-center justify-center h-screen text-center gap-2'>
        <Construction width={20} height={20} className='text-yellow-300'/>
      <h1 className='p-20-regular'>We're making some updates to improve your experience. Be back soon!</h1>
    </div>
  );
};

export default EventPage;