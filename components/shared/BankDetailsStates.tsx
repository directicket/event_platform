"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IBM_Plex_Mono } from "next/font/google";

const ibmMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "600"] });

const BankDetailsStatus = () => {
  const [hasAccess, setHasAccess] = useState<boolean | "default">("default");

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const response = await fetch("/api/check-bank-details");
        const data = await response.json();
        setHasAccess(data.status === "default" ? "default" : data.hasAccess);
        console.log("API response:", data);
      } catch (error) {
        console.error("Error checking access:", error);
      }
    };

    checkAccess();
  }, []);

  return (
    <>
      {hasAccess === "default" || hasAccess === false ? (
        <Link href="/profile/bank-details">
          <p className={`${ibmMono.className} underline font-normal p-regular-14 text-neutral-500`}>
            
          </p>
        </Link>
      ) : (
        <p className={`${ibmMono.className} font-normal p-regular-14 text-blue-700`}>
          Added
        </p>
      )}
    </>
  );
};

export default BankDetailsStatus;
