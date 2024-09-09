import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="bg-white bg-contain py-5 md:py-10
      ">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold space sm:text-center md:text-left">
              Create and buy tickets to <span className="text-blue-700">
                exciting experiences
              </span>.
            </h1>
            <p className="p-regular-18 md:p-regular-24 sm:text-center md:text-left text-muted-foreground">
            Buy tickets or sell and keep 100% of money made on tickets. 
            All on Nigeria's most secure event ticketing platform.</p>
            <Button size="lg" asChild className="bg-blue-700 hover:bg-blue-500 md:w-fit sm:items-center">
              <Link href="/events/create">
                Create an event &rarr;
              </Link>
            </Button>
          </div>

          <Image
            src="/assets/images/hero.png"
            alt="hero image"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section>

      <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h3 className="h3-bold">Browse event tickets</h3>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          Search
          CategoryFilter
        </div>
      </section>
    </>
  );
}
