'use client'

import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import InViewCounter from './Counter';

export default function CommunitySection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (inView) setAnimate(true);
  }, [inView]);

  return (
    <section id="community" className="min-h-screen bg-black text-white flex items-center justify-center mt-12">
      <div className='wrapper flex flex-col gap-3 text-center items-center justify-center'>
        <div
          ref={ref}
          style={{
            transition: 'transform 0.8s ease, opacity 0.8s ease',
            transform: animate ? 'scale(1)' : 'scale(0.9)',
            opacity: animate ? 1 : 0,
          }}
          className='w-[85]'
        >
          <Image
            alt='image'
            src='/assets/images/growing-community-image.png'
            width={900}
            height={900}
            className="w-full h-full object-cover mb-8"
          />
        </div>

        <h1 className='h2-bold'>
          A growing community of <span
            className={`transition-all duration-700 ${
              animate
                ? 'font-bold bg-gradient-to-r from-lime-400 to-green-600 bg-clip-text text-transparent'
                : 'font-normal text-white'
            }`}
          >creators</span> and <span
          className={`transition-all duration-700 ${
            animate
              ? 'font-bold bg-gradient-to-r from-green-600 to-lime-400 bg-clip-text text-transparent'
              : 'font-normal text-white'
          }`}
        >customers.</span>
        </h1>

        <p className='p-regular-18 text-neutral-500 max-w-[95%]'>
          Growth is a good sign that something's working. We're seeing a lot of it.
        </p>

        <div className='flex flex-row justify-between my-16'>
            <InViewCounter />
        </div>
      </div>
    </section>
  );
}
