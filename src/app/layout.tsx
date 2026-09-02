import type { Metadata } from "next";
import { Bebas_Neue, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://byarohana.com"),
  title: "Ārohana Consultancy | Brands, Businesses & Experiences",
  description: "Ārohana combines business thinking, creative communication and execution across digital brand growth, hospitality consulting and content production.",
  keywords: ["Brand Strategy", "Hospitality Consulting", "Digital Growth", "Content Production", "Ārohana Consultancy", "Tourin Ladakh", "Madhura Hawal"],
  authors: [{ name: "Ārohana Consultancy" }],
  openGraph: {
    title: "Ārohana Consultancy | Brands, Businesses & Experiences",
    description: "We build brands, businesses & experiences with commercial context, sector understanding and creative execution.",
    url: "https://byarohana.com",
    siteName: "Ārohana Consultancy",
    images: [
      {
        url: "/assets/raysons.jpg",
        width: 1200,
        height: 630,
        alt: "Ārohana Consultancy",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-background text-foreground selection:bg-white selection:text-black antialiased">
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
