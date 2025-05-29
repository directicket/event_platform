'use client';

import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { IBM_Plex_Mono } from 'next/font/google';

const ibmMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '600'] });

export default function InViewCounter({ totalTicketsRevenue }: { totalTicketsRevenue: number }) {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <p ref={ref} className={`${ibmMono.className} truncate font-normal p-regular-14 max-w-44 md:max-w-fit text-lime line-clamp-1`}>
      ₦
      {inView && (
        <CountUp
          start={0}
          end={totalTicketsRevenue}
          duration={2}
          separator=","
        />
      )}
    </p>
  );
}
