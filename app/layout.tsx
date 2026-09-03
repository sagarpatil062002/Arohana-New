import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import RootNavWrapper from "@/components/RootNavWrapper";
import FooterWrapper from "@/components/FooterWrapper";
import { siteConfig } from "@/data/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap"
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: "ĀROHANA CONSULTANCY | Brands, Businesses & Experiences",
    template: "%s | Ārohana Consultancy"
  },
  description: siteConfig.description,
  keywords: [
    "Ārohana",
    "Brand Consultancy",
    "Digital Brand Growth",
    "Hospitality Consulting",
    "Content Production",
    "Indian Army Projects",
    "Tourin Ladakh",
    "Commercial Strategy",
    "Kolhapur",
    "Goa"
  ],
  authors: [{ name: "Madhura Hawal" }],
  openGraph: {
    title: "Ārohana Consultancy | Brands, Businesses & Experiences",
    description: siteConfig.description,
    url: "https://arohana.co.in",
    siteName: "Ārohana Consultancy",
    locale: "en_IN",
    type: "website"
  },
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceMono.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@300,400,500,600,700&display=swap"
        />
      </head>
      <body className="bg-[#050811] text-white flex flex-col min-h-screen selection:bg-[#C5A46D] selection:text-[#0A0F14]">
        <RootNavWrapper />
        <main className="flex-grow">{children}</main>
        <FooterWrapper />
      </body>
    </html>
  );
}

