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
        <div className="fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50">
          <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-white h1-bold font-normal">✕</button>
          <div className="p-6 rounded-lg shadow-lg flex flex-col gap-4">
            <Link href="/" onClick={() => setIsOpen(false)} className={`${ibmMono.className}text-white ibm-18 hover:underline`}>HOME</Link>
            <Link href="/events/create" onClick={() => setIsOpen(false)} className={`${ibmMono.className}text-white ibm-18 hover:underline`}>CREATE</Link>
            <Link href="/profile" onClick={() => setIsOpen(false)} className={`${ibmMono.className}text-white ibm-18 hover:underline`}>DASHBOARD</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default MobileNav;
