"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IBM_Plex_Mono } from "next/font/google";
import { SignedIn, SignedOut, UserButton, useAuth } from "@clerk/nextjs";
import { IdCard } from "lucide-react";

const ibmMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "600"] });

const BankDetailsAlert = () => {
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
    <>
      {hasAccess === "default" || hasAccess === false ? (
        <div className="flex flex-col gap-2">
          <div className="rounded-md flex flex-col p-4 bg-neutral-950/60 border border-neutral-800/50 gap-1">
            <div className="flex flex-row gap-[5.5px]">
              <IdCard width={20} height={20} className='text-blue-700'/>
              <p className={`${ibmMono.className} ibm-14 text-white`}>BANK DETAILS</p>
            </div>
            <p className="p-regular-12 md:p-regular-16 text-neutral-600">
              If you haven't, add your bank details so you can get paid. You won't get paid until you do so.</p>
          </div>
  
          <Link href='/profile/bank-details'>
            <p className="p-regular-14 text-blue-700 underline hover:no-underline">Add your bank details &rarr;</p>
          </Link>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default BankDetailsAlert;
