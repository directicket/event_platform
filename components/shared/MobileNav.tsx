'use client'

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IBM_Plex_Mono } from "next/font/google";

const ibmMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "600"] });

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="md:hidden relative">
      {/* Trigger */}
      <button onClick={() => setIsOpen(true)} className="align-middle">
        <Image
          src="/assets/icons/menu.svg"
          alt="menu button"
          width={22}
          height={22}
          className="cursor-pointer"
        />
      </button>

      {/* Sheet */}
      {isOpen && (
        <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center h-screen">
          <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-white h1-bold font-normal">✕</button>
          <div className="p-6 rounded-lg flex flex-col gap-6">
            <p className='ibm-14 text-neutral-600'>SELECT ONE:</p>
            <Link href="/events/create" onClick={() => setIsOpen(false)} className={`${ibmMono.className}text-white ibm-16 hover:underline`}>1. Create a Ticket</Link>
            <Link href="/profile" onClick={() => setIsOpen(false)} className={`${ibmMono.className}text-white ibm-16 hover:underline`}>2. Your Dashboard</Link>
            <Link href="/profile/my-orders" onClick={() => setIsOpen(false)} className={`${ibmMono.className}text-white ibm-16 hover:underline`}>3. Your Purchases</Link>
            <Link href="/blog" onClick={() => setIsOpen(false)} className={`${ibmMono.className}text-white ibm-16 hover:underline`}>4. Directicket Blog</Link>
            <Link href="/" onClick={() => setIsOpen(false)} className={`${ibmMono.className}text-white ibm-16 hover:underline`}>5. About Directicket</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default MobileNav;
