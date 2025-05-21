'use client'

// import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from 'next/font/google'
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Providers from "@/components/shared/Providers";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import NProgress from "nprogress";
import Loading from '@/components/shared/Loading'
import SocialMediaCheck from "@/components/shared/SocialMediaCheck";

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
})

// export const metadata: Metadata = {
//   title: "Directicket",
//   description: "Buy and sell tickets to events.",
//   icons: {
//     icon: "/favicon.ico",
//     apple: "/apple-touch-icon.png"
//   }
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname()

  useEffect(() => {
    NProgress.configure({
      showSpinner: false,
    })

    const progressBar = document.querySelector('#nprogress .bar') as HTMLElement;
    if (progressBar) {
      progressBar.style.backgroundColor = 'white';
    }

    NProgress.start()

    const handleRouteChangeComplete = () => {
      NProgress.done()
      setTimeout(() => NProgress.remove(), 300)
    }

    window.addEventListener('load', handleRouteChangeComplete)

    return () => {
      window.removeEventListener('load', handleRouteChangeComplete)
    }
  }, [pathname])

  return (
    <>
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.variable} antialiased`}
        >
          <Providers>
            <SocialMediaCheck/>
          {children}
          </Providers>
          <Analytics/>
          <SpeedInsights/>
        </body>
      </html>
    </ClerkProvider>

    <style jsx global>{`
      #nprogress .bar {
        box-shadow: none !important;
        background: white !important;
      }

      #nprogress .peg {
      box-shadow: none !important;
      }
      `}</style>
    </>
  );
}
