import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Image from "next/image"
import { Separator } from "../ui/separator"
import NavItems from "./NavItems"
import Link from "next/link"
  
const MobileNav = () => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
            <Image
              src="/assets/icons/menu.svg"
              alt="menu button"
              width={22}
              height={22}
              className="cursor-pointer"
            />
        </SheetTrigger>
        <SheetContent className="w-full flex flex-col gap-6 bg-white md:hidden
        ">
            <Link href="/">  
              <Image 
                src="/assets/images/logo.svg"
                alt="logo"
                width={128}
                height={38}
              />
            </Link>  
            <Separator className="border border-gray-50" />
            <NavItems />
        </SheetContent>
      </Sheet>

    </nav>
  )
}

export default MobileNav