import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import NavItems from "./NavItems"
import MobileNav from "./MobileNav"

const Header = () => {
  return (
    <div className="w-full sticky-header border-b pb-[-20] bg-white bg-opacity-90 header-blur absolute text-black">
      <div className="wrapper flex items-center align-middle justify-between py-[-20]">
        <Link href="/" className="w-36">
          <Image 
            src="/assets/images/logo.svg" width={110} height={38}
            alt="Directicket Logo"
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
            <Button asChild className="h-fit min-w-fit px-3 rounded-3xl p-1 bg-blue-500 hover:bg-blue-500 cursor-pointer">
              <Link href="/sign-in" className="p-medium-12 px-3 text-white cursor-pointer">
              Sign in
              </Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </div>
  )
}

export default Header