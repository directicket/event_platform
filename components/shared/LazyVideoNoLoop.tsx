"use client";

import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

type LazyVideoProps = {
    src: string;
    type?: string;
    [key: string]: any;
  };  

export default function LazyVideoNoLoop({ src, type = "video/mp4", ...props }: LazyVideoProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.00001 });
  const [loaded, setLoaded] = useState(false);
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    if (inView) setAnimate(true);
  }, [inView]);

  useEffect(() => {
    if (inView) setLoaded(true);
  }, [inView]);

  return (
    <div ref={ref} style={{
      transition: 'transform 1.8s ease, opacity 0.8s ease',
      transform: animate ? 'scale(1)' : 'scale(0.9)',
      opacity: animate ? 1 : 0,
    }}>
      <video autoPlay muted playsInline poster='/assets/images/product-cover.jpg' preload='auto' className="w-full h-full object-cover pointer-events-none" {...props}>
        {loaded && <source src={src} type={type} />}
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
