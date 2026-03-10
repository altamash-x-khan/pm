import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dr. Farheen Homeopathy | Natural Healing, Lasting Wellness",
  description: "Book your consultation with Dr. Farheen for holistic, professional homeopathic care. Tailored treatments for Women's Health, Chronic Diseases, and more.",
};

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased min-h-screen bg-background text-foreground flex flex-col selection:bg-brand-rose selection:text-white">
        <Navbar />
        <main className="flex-grow pt-[88px]">
          {children}
        </main>
        <Footer />
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
