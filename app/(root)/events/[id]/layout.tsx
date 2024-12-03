import { Metadata } from "next";
import Footer from "@/components/shared/Footer";
import { getEventById, getRelatedEventsByCategory } from '@/lib/actions/event.actions'
import { SearchParamProps } from "@/types";

export async function generateMetadata({ params: { id } }: SearchParamProps): Promise<Metadata> {
    const event = await getEventById(id);

    return {
        title: `${event.title} - ${event.category.name} - Directicket`, // Dynamically set the title
        description: "Buy and sell tickets to events on Directicket.",
        icons: {
            icon: "/favicon.ico"
        }
    };
}

const EventDetails = async ({ params: { id }, searchParams }: SearchParamProps) => {
    const event = await getEventById(id);
  
    const relatedEvents = await getRelatedEventsByCategory({
        categoryId: event.category._id,
        eventId: event._id,
        page: searchParams.page as string,
    });
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-screen flex-col">
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
}
