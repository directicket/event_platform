"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoadingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");

  useEffect(() => {
    if (!reference) return;

    const checkPaymentStatus = async () => {
      try {
        const response = await fetch(`/api/payment-status?reference=${reference}`);
        const data = await response.json();

        if (data.verified) {
          router.replace(`/events/${data.eventId}/payment-success?reference=${reference}`);
        } else {
          setTimeout(checkPaymentStatus, 2000); // Retry after 2 seconds if not verified
        }
      } catch (error) {
        console.error("Error checking payment status:", error);
      }
    };

    checkPaymentStatus();
  }, [reference, router]);

  return (
    <div className="flex items-center justify-center min-h-screen text-lg font-semibold text-white">
      Processing payment, please wait...
    </div>
  );
}
