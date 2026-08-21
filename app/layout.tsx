import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://byarohana.com"),
  title: {
    default: "Ārohana Consultancy | Brands, Businesses & Experiences",
    template: "%s | Ārohana Consultancy",
  },
  description:
    "Ārohana combines business thinking, creative communication and execution across digital brand growth, hospitality consulting and content production.",
  abstract:
    "A premium consultancy and creative studio building brands, businesses and experiences.",
  keywords: [
    "consultancy",
    "brand strategy",
    "hospitality consulting",
    "content production",
    "digital brand growth",
    "creative studio",
  ],
  authors: [{ name: "Ārohana Consultancy" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://byarohana.com/",
    siteName: "Ārohana Consultancy",
    title: "Ārohana Consultancy | Brands, Businesses & Experiences",
    description:
      "Ārohana brings together business thinking, creative communication and execution — from digital brand growth and content to hospitality consulting and complex on-ground projects.",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ārohana Consultancy | Brands, Businesses & Experiences",
    description:
      "Ārohana combines business thinking, creative communication and execution across digital brand growth, hospitality consulting and content production.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* mark JS as available before paint so reveal animations can start
            hidden; without JS, content remains fully visible */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
