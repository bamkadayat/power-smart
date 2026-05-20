import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { Footer } from "@/shared/components/Footer";

import { Header } from "./_components/Header";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PowerSmart — Cheapest electricity hours in Norway",
  description:
    "Find the cheapest electricity hours in your Norwegian price area (NO1–NO5).",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
