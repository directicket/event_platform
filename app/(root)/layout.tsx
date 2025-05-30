import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="flex h-screen flex-col">
        
        <main className="flex-1 bg-black"><Header />{children}</main>
        {/* <Footer /> */}

      </div>
    );
  }