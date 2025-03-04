"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfileClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("reload")) {
      router.replace("/profile"); // Remove query param
      window.location.reload(); // Hard refresh
    }
  }, [searchParams, router]);

  return null; // This component just runs the effect
}
