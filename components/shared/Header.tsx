import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import NavItems from "./NavItems"
import MobileNav from "./MobileNav"
import { IBM_Plex_Mono } from 'next/font/google';
import { TriangleAlert } from "lucide-react"

const ibmMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '600'] })

const Header = () => {
  return (
    <div className="w-full sticky-header border-b-white/50 pb-[-20]
      absolute text-white">
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
            <NavItems />
          </nav>
        </SignedIn>
        
        <div className="flex w-32 justify-end gap-3">
          <SignedIn>
            <UserButton afterSignOutUrl="/"/>
            <MobileNav />
          </SignedIn>
          <SignedOut>
            <Button asChild className="h-fit min-w-fit px-3 text-black rounded-3xl p-1 bg-white hover:bg-white cursor-pointer">
              <Link href="/sign-in" className="p-medium-12 px-3 text-black cursor-pointer">
              Sign in
              </Link>
            </Button>
          </SignedOut>
        </div>
      </div>

      <div className='gradient wrapper w-full bg-black/100 p-4 border-r-0 border-l-0 border-t-0 mt-[-1px] border-b-neutral-800/50 border flex-col gap-1 flex sticky-header header-blur absolute'>
              <div className="flex flex-row">
                <TriangleAlert width={20} height={20} className="text-white mr-2 self-center"/>
              <p className={`${ibmMono.className} ibm-14 text-white`}>MISSING BANK DETAILS</p>
              </div>
              <p className='text-neutral-600 p-regular-12 md:p-regular-16'>
                You've made your Tickets but no one can pay you. 
                Add your bank details, it only takes 10 seconds.</p>
          </div>
    </div>
  )
}

export default Header