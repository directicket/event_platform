import { Metadata } from "next";
import Footer from "@/components/shared/Footer";
import { getEventById, getRelatedEventsByCategory } from '@/lib/actions/event.actions'
import { SearchParamProps } from "@/types";

export async function generateMetadata({
    params,
  }: {
    params: { id: string };
  }): Promise<Metadata> {
    const event = await getEventById(params.id);

    return {
        title: `${event.title} - Directicket`, // Dynamically set the title
        description: "Buy and sell tickets to events on Directicket.",
        icons: {
            icon: `${event.imageURL}`
        },
        openGraph: {
            title: `${event.title}`,
            description: "Buy and sell tickets to events on Directicket.",
            images:`${event.imageURL}`
        },
        twitter: {
            card: 'summary_large_image',
            images: `${event.imageURL}`
        }
    };
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
