import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href="/">
          <Image 
            src="/assets/images/dt-icon.svg"
            alt="Directicket Logo"
            width={25}
            height={25}
            className="opacity-30"
          />
        </Link>

        <p className="opacity-30 lg:opacity-40">&copy; 2024 Directicket. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer