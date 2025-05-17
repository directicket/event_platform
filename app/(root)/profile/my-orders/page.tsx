import Tickets from "@/components/shared/TicketCard";

export default function TicketsPage() {
  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Tickets</h1>
      <Tickets />
    </main>
  );
}
