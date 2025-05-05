'use client'

import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function CreatorProfileSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (inView) setAnimate(true);
  }, [inView]);

  return (
    <section id="creator-profile" className="min-h-screen bg-black text-white flex items-start justify-start">
      <div className='wrapper flex flex-col gap-2 text-left' ref={ref}>
        <h1 className='h2-regular w-full'>
          Introduce{' '}
          <span
            className={`transition-all duration-700 ${
              animate
                ? 'font-bold bg-gradient-to-r from-yellow-400 to-lime-400 bg-clip-text text-transparent'
                : 'font-normal text-white'
            }`}
          >
            yourself
          </span>{' '}
          as a creator.
        </h1>

        <p className='p-regular-16 text-neutral-500 w-full'>
          Every ticket you create lives on your profile.
        </p>

        <div
          style={{
            transition: 'transform 1.8s ease, opacity 0.8s ease',
            transform: animate ? 'scale(1)' : 'scale(0.9)',
            opacity: animate ? 1 : 0,
          }}
          className="mt-8 w-full h-full"
        >
          <Image
            alt='image'
            src='/assets/images/introduce-yourself-image.png'
            width={800}
            height={800}
            className="w-full h-full object-cover"
          />
        </div>

        <p className="p-regular-14 text-neutral-500 mt-1 w-[85%]">
          Meaning you can <span className="text-white">use 1 link to sell tickets to everything</span> you organize.
          Put it in your bios across social media or send it directly to your customers.
        </p>
      </div>
    </section>
  );
}
