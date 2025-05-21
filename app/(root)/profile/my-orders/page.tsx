import Footer from "@/components/shared/Footer";
import Tickets from "@/components/shared/TicketCard";

export default function TicketsPage() {
  return (
    <>
    <main className="wrapper max-w-2xl mx-auto mt-16">
      <div className="flex flex-col gap-1 mb-2">
      <h1 className="h3-medium text-white">Your Purchases</h1>
      <p className='p-regular-14 text-neutral-500'>Here you can find all the tickets you've paid for on Directicket. Can't find your ticket? DM us on Instagram @directicket.live.</p>
      </div>
      <Tickets />
      
      
    </main>
    <div className='text-white wrapper'>
        <Footer />
      </div>
    </>
  );
}
