"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IBM_Plex_Mono } from "next/font/google";
import { SignedIn, SignedOut, UserButton, useAuth } from "@clerk/nextjs";

const ibmMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "600"] });

const BankDetailsStatus = () => {
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
        <Link href="/profile/bank-details">
          <p className={`${ibmMono.className} underline font-normal p-regular-14 text-red-600`}>
            Add yours
          </p>
        </Link>
      ) : (
        <p className={`${ibmMono.className} font-normal p-regular-14 text-yellow-400`}>
          Added
        </p>
      )}
    </>
  );
};

export default BankDetailsStatus;
