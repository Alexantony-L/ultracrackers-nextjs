import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import OfferBar from "@/components/common/OfferBar";
import StoreHeader from "@/components/common/StoreHeader";
import NavBar from "@/components/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ultra Crackers",
  description: "Best Crackers Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className=" flex flex-col bg-slate-50">
        {/* <StoreHeader /> */}
        <NavBar/>
        {/* <Header /> */}

        <main className="flex-1">
          {children}
        </main>

        {/* <Footer /> */}
      </body>
    </html>
  );
}