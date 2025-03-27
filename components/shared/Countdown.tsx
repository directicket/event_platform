'use client'
import { useState, useEffect } from 'react';
import { IBM_Plex_Mono } from 'next/font/google';

const ibmMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '600'] })


interface CountdownProps {
    targetDate: number; // Type the targetDate as a number (milliseconds since epoch)
  }

  const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(targetDate - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(targetDate - new Date().getTime());
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [targetDate]);

  // Convert milliseconds to hours, minutes, seconds
  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  // If countdown is finished, show 'EXPIRED'
  if (timeLeft <= 0) {
    return <div>PLEASE STAND BY</div>;
  }

  return (
    <div className={`${ibmMono.className} text-black`}>
      {hours < 10 ? `0${hours}` : hours}:
      {minutes < 10 ? `0${minutes}` : minutes}:
      {seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
};

export default Countdown;
