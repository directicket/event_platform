import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import Search from "@/components/shared/Search";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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
      <section className="bg-black bg-contain py-5 md:py-10">
        {/* <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold space sm:text-center md:text-left">
              Create and buy tickets to <span className="text-blue-700">
                exciting experiences
              </span>.
            </h1>
            <p className="p-regular-18 md:p-regular-24 sm:text-center md:text-left text-muted-foreground">
            Buy or sell tickets and keep 100% of your earnings on 
            Nigeria's most secure platform for experiences and gatherings.</p>
            <Button size="lg" asChild className="bg-blue-700 hover:bg-blue-500 md:w-fit sm:items-center min-w-[200px]">
              <Link href="/events/create">
                Create a ticket now
              </Link>
            </Button>
            <Button size="lg" asChild className="mt-[-15px] min-w-[200px] bg-white border hover:bg-white border-blue-700 text-blue-700 md:w-fit sm:items-center">
              <Link href="/#events">
                Browse Tickets
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
        </div> */}
      </section>

      

      <div className="wrapper flex flex-col items-center justify-center
       h-fit mx-auto w-fit gap-2 text-white
       focus:top-0 bg-black">
        <h3 className='h2-medium mb-2 md:max-w-[600px] text-center md:text-center text-wrap'>
          A community-driven, curated storefront for event Tickets.
        </h3>

          

          <div className='w-fit py-0'>
            <Link href='/events/create'>
              <button className='p-semibold-14 h-10 w-full w-flex
              text-white text-left md:hidden bg-black border-white border pl-3 pr-3'>
                  Create your own Ticket to sell &#8599;
              </button>
            </Link>
      </div>

          <p 
      className="bg-black pt-2 text-neutral-600 
      md:w-fit w-fit sm:items-center h-[25px] text-center max-w-[260px] md:max-w-[400px]
       p-regular-14 pb-20 md:block hidden">
          Keep 100% of profit from ticket sales when you sell tickets to your event on Directicket.<sup className="p-regular-12 underline">1</sup>{' '}
          <Link href="/events/create" className="underline text-blue-500">Sell now &#8250;</Link>
          </p>

          <p 
      className="bg-black pt-2 text-neutral-600 
      md:w-fit w-fit sm:items-center h-[25px] text-center max-w-[260px] md:max-w-[400px]
       p-regular-14 pb-20 md:hidden hidden">
          Giving you 100% of ticket sales profit 
          means you earn up to 20% more per ticket on Directicket.<sup className="p-regular-12 underline">1</sup>{' '}
          <a href="#questions" className="underline text-black">Learn More &#8250;</a>
          </p>
      </div>

      


      <section id="events" className="wrapper bg-black my-8 flex flex-col  md:gap-12">
     


        {/* <h3 className="p-medium-20 md:p-medium-24 mx-auto">Get tickets now</h3> */}

        
        <Search />
        <Collection 
          data={events?.data}
          emptyTitle="There aren&apos;t any Tickets with that name."
          emptyStateSubtext="Check your search for spelling errors or try searching for something else."
          collectionType="All_Events"
          limit={6}
          page={1}
          totalPages={2}
        />
      </section>

      <hr className="opacity-15"/>
      <section id="questions" className=" text-white wrapper mt-2 mb-8 flex flex-col gap-8 md:gap-12
      ">
        <div className="flex flex-col gap-5">
          <h3 className="h3-medium">Frequently Asked <br/>Questions</h3>
          <hr/>
          <div className="flex flex-col justify-center gap-8 mt-[-20px]">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="p-semibold-16">Why choose Directicket?</AccordionTrigger>
                <AccordionContent className="text-neutral-500 p-semibold-14 md:max-w-[500px]">
                  Directicket is a first-of-its-kind ticket-focused platform. With Directicket, 
                  you can manage each ticket on its own page with lots of customization options. 
                  Directicket also pays more on average than its closest competing platform and is the 
                  top choice for a wide range of users seeking intelligent control over the 
                  ticketing experience for their events.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="flex flex-col justify-center gap-8 mt-[-20px]">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="p-semibold-16 text-left text-wrap">Are there any limits on the amount of tickets that can be sold?</AccordionTrigger>
                <AccordionContent className="text-neutral-500 p-semibold-14 max-w[300px] md:max-w-[500px]">
                  On Directicket, you can sell as many tickets as you want. We&apos;re ready for crowds of every size.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="flex flex-col justify-center gap-8 mt-[-20px]">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="p-semibold-16 text-left text-wrap">Are there any fees associated with using Directicket?</AccordionTrigger>
                <AccordionContent className="text-neutral-500 p-semibold-14 md:max-w-[500px]">
                  Directicket charges a service fee of 15% of the ticket price to ticket buyers. 
                  The only money we make is from the service fee we charge and the rest is yours.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="flex flex-col justify-center gap-8 mt-[-20px]">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="p-semibold-16 text-left text-wrap">How fast do I get paid using Directicket?</AccordionTrigger>
                <AccordionContent className="text-neutral-500 p-semibold-14 md:max-w-[500px]">
                  You can expect to recieve the money you've made from ticket sales in 2-5 working days. As time goes, on we expect this time span to shorten.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="flex flex-col justify-center gap-8 mt-[-20px]">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="p-semibold-16 text-left text-wrap">How can I get in contact with customer support?</AccordionTrigger>
                <AccordionContent className="text-neutral-500 p-semibold-14 md:max-w-[500px]">
                  You can DM us on Snapchat @directicket or call either 09025771255 or 09035960581.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* <div className='wrapper flex flex-col items-center justify-center
       h-fit mx-auto w-fit'>
            <Link href='/events/create'>
              <button className='p-semibold-14 h-10 
              w-fit w-flex rounded-lg text-white
              bg-blue-500 px-4 py-1 hover:underline  
              fixed bottom-3 right-3 md:bottom-4 md:right-4 md:hidden'>
                  Create your Ticket &rarr;
              </button>
            </Link>
        </div> */}

      
    </>
  );
}
