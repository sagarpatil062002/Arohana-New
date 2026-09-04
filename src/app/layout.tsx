import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { SmoothScrollProvider } from '@/components/motion/SmoothScrollProvider';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'Ārohana Consultancy | Brands, Businesses & Experiences',
    template: '%s | Ārohana Consultancy',
  },
  description:
    'Ārohana combines business thinking, creative communication and execution across digital brand growth, hospitality consulting and content production.',
  metadataBase: new URL('https://byarohana.com'),
  openGraph: {
    title: 'Ārohana Consultancy | Brands, Businesses & Experiences',
    description:
      'Ārohana combines business thinking, creative communication and execution across digital brand growth, hospitality consulting and content production.',
    url: 'https://byarohana.com',
    siteName: 'Ārohana Consultancy',
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} dark`}>
      <body className="min-h-screen bg-[#060607] text-[#ECECEF] font-sans flex flex-col justify-between selection:bg-froxen-lime selection:text-black overflow-x-hidden antialiased froxen-grain">
        <SmoothScrollProvider>
          <CustomCursor />
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
