import type { Metadata } from 'next';
import './globals.css';
import SmoothScroll from '@/components/motion/SmoothScroll';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#f5f5f3',
};

export const metadata: Metadata = {
  title: 'Ārohana Consultancy — We build brands, businesses & experiences',
  description:
    'Ārohana brings together business thinking, creative communication and execution — from digital brand growth and content to hospitality consulting and complex on-ground projects.',
  keywords: [
    'Ārohana Consultancy',
    'Brand Strategy',
    'Hospitality Consulting',
    'Digital Growth',
    'Content Production',
    'Tourin Ladakh',
    'Indian Army Special Projects',
  ],
  authors: [{ name: 'Ārohana Consultancy' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>
          <Navbar />
          <main style={{ minHeight: '100vh', paddingTop: '76px' }}>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
