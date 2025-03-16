"use client"

import { headerLinks } from '@/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { IBM_Plex_Mono } from "next/font/google";

const ibmMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "600"] });

const NavItems = () => {
  const pathname = usePathname();

  const handleRefresh = () => {
    // Trigger a page refresh
    window.location.reload();
  };

  return (
    <ul className={`${ibmMono.className} ibm-20 md:flex-between flex w-full flex-col items-start gap-5 md:flex-row text-white`}>
      {headerLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <li
            key={link.route}
            className={`${
              isActive && 'text-white underline'
            } flex-center p-regular-16 whitespace-nowrap`}
          >
            <Link
              href={link.route} 
              onClick={handleRefresh}
            >
              {link.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default NavItems
