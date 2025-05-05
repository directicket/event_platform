'use client';

import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { IBM_Plex_Mono } from 'next/font/google';

const ibmMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '600'] })

export default function InViewCounter() {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <div ref={ref} className='flex flex-col md:flex-row items-center justify-center gap-12 md:gap-8'>
      <div className='flex flex-col gap-1 self-start w-full'>
        <h3 className='h1-bold italic bottom-0 left-0 text-center md:text-left w-full text-lime'>
            {inView && <CountUp start={0} end={250} duration={2} />}+
        </h3>
        <p className='p-regular-16 text-neutral-500 text-center md:text-left w-full'>
            Creators this month
        </p>
      </div>
        
      <div className='flex flex-col gap-1 self-start w-full'>
        <h3 className='h1-bold italic bottom-0 left-0 text-center md:text-left w-full text-lime'>
            {inView && <CountUp start={1} end={4} duration={2} />}x
        </h3>
        <p className='p-regular-16 text-neutral-500 text-center md:text-left w-full'>
            growth since March
        </p>
      </div>

      <div className='flex flex-col gap-1 self-start w-full'>
        <h3 className='h1-bold italic bottom-0 left-0 text-center md:text-left w-full text-lime'>
            {inView && <CountUp start={1} end={54} duration={2} />}%
        </h3>
        <p className='p-regular-16 text-neutral-500 text-center md:text-left w-full'>
            growth in creators last month
        </p>
      </div>
    </div>
  );
}
