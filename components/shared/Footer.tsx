import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className=" bg-neutral-700/10">
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

        <p className="opacity-30 lg:opacity-40 text-white">&copy; 2025 Directicket. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer