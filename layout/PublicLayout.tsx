import React from "react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatPopover from "@/app/components/ChatPopover";

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* navbar */}
      <Navbar />

      {/* content */}
      <main className={cn("flex-1 container mx-auto pt-[50px] lg:pt-[100px]")}>
        {children}
      </main>
      <ChatPopover />

      {/* footer */}
      <Footer />
    </div>
  );
};

export default PublicLayout;
