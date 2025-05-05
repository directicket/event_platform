"use client";

import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

type LazyVideoProps = {
    src: string;
    type?: string;
    [key: string]: any;
  };  

export default function LazyVideo({ src, type = "video/mp4", ...props }: LazyVideoProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.00001 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (inView) setLoaded(true);
  }, [inView]);

  return (
    <div ref={ref}>
      <video autoPlay muted loop playsInline className="w-full h-full object-cover" {...props}>
        {loaded && <source src={src} type={type} />}
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
