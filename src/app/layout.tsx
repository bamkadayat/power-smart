import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { Footer } from "@/shared/components/Footer";
import { getSiteUrl } from "@/shared/config/siteUrl";

import { Header } from "./_components/Header";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const TITLE = "PowerSmart — Cheapest electricity hours in Norway";
const DESCRIPTION =
  "Find the cheapest electricity hours in your Norwegian price area (NO1–NO5). Hourly spot prices, smart appliance windows.";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: "PowerSmart",
    type: "website",
    locale: "en_NO",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
