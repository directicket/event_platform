import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import Search from "@/components/shared/Search";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const category = (searchParams?.category as string) || '';

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 20,
  });

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
            Buy or sell tickets and keep 100% of your earnings on 
            Nigeria's most secure platform for experiences and gatherings.</p>
            <Button size="lg" asChild className="bg-blue-700 hover:bg-blue-500 md:w-fit sm:items-center">
              <Link href="/events/create">
                Create a ticket now &rarr;
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
        <h3 className="h3-bold">Browse event Tickets</h3>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
        </div>

        <Collection 
          data={events?.data}
          emptyTitle="Couldn&apos;t find any Tickets with that name."
          emptyStateSubtext="Check your search for spelling errors or try searching for something else."
          collectionType="All_Events"
          limit={6}
          page={1}
          totalPages={2}
        />
      </section>
    </>
  );
}
