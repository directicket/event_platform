'use client'

import { SignedIn, SignedOut, UserButton, useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import { IBM_Plex_Mono } from "next/font/google";
import { TriangleAlert } from "lucide-react";

const ibmMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "600"] });

const Header = () => {
  const { isLoaded, userId } = useAuth();
  const [hasAccess, setHasAccess] = useState<boolean | "default">("default");

  useEffect(() => {
    if (!isLoaded || !userId) return; // Wait for Clerk to load

    // Check if bank details status is cached in localStorage
    const cachedAccess = localStorage.getItem(`bank-details-${userId}`);
    if (cachedAccess) {
      setHasAccess(JSON.parse(cachedAccess)); // Set from cache
      return; // Skip the API call if cached
    }

    // Fetch from the API if not cached
    const checkAccess = async () => {
      try {
        const response = await fetch("/api/check-bank-details");
        const data = await response.json();
        const status = data.status === "default" ? "default" : data.hasAccess;

        // Cache the response for future checks
        localStorage.setItem(`bank-details-${userId}`, JSON.stringify(status));
        
        setHasAccess(status); // Set the state based on the API response
        console.log("API response:", data);
      } catch (error) {
        console.error("Error checking access:", error);
      }
    };

    checkAccess();
  }, [isLoaded, userId]); // Runs only when Clerk is fully loaded

  return (
    <div className="w-full sticky-header border-b-white/50 pb-[-20] absolute text-white">
      <div className="bg-black wrapper flex items-center align-middle justify-between py-[-20]">
        <Link href="/" className="w-36">
          <Image 
            src="/assets/images/logo.svg" width={110} height={38}
            alt="Directicket Logo"
            className="text-white"
          />
        </Link>

        <SignedIn>
          <nav className="md:flex-between hidden w-full max-w-xs">
            {/* <NavItems /> */}
          </nav>
        </SignedIn>

        <div className="flex w-32 justify-end gap-3">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <MobileNav />
          </SignedIn>
          {/* <SignedOut> */}
            <Button asChild className="h-fit min-w-fit px-3 text-black rounded-3xl p-1 bg-white hover:bg-white cursor-pointer">
              <Link href="/maintenance" className="p-medium-12 px-3 text-black cursor-pointer">
                Sign in
              </Link>
            </Button>
          {/* </SignedOut> */}
        </div>
      </div>

      {hasAccess === false && (
        <>
        <SignedIn>
          <Link href='/profile/bank-details'>
            <div className='gradient wrapper w-full bg-black/100 p-4 border-r-0 border-l-0 border-t-0 mt-[-1px] border-b-neutral-800/50 border flex-col gap-1 flex sticky-header header-blur absolute'>
              <div className="flex flex-row">
                <TriangleAlert width={20} height={20} className="text-white mr-2 self-center"/>
                <p className={`${ibmMono.className} ibm-14 text-white`}>MISSING BANK DETAILS</p>
              </div>
              <p className='text-neutral-600 p-regular-12 md:p-regular-16'>
                You've made your Tickets but no one can pay you.{' '}
                <span className="underline">Add your bank details, it only takes 10 seconds.</span>
              </p>
            </div>
          </Link>
        </SignedIn>
        <SignedOut>
          <div></div>
        </SignedOut>
        </>
      )}
    </div>
  );
};

export default Header;
