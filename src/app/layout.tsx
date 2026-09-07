import type { Metadata } from 'next';
import './globals.css';
import SmoothScroll from '@/components/motion/SmoothScroll';
import AppShell from '@/components/layout/AppShell';
import ExperienceLoader from '@/components/common/ExperienceLoader';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#f5f5f3',
};

export const metadata: Metadata = {
  title: 'Ārohana Consultancy — We Build Brands, Businesses & Experiences',
  description:
    'Ārohana combines commercial thinking, sector experience and creative execution for businesses across hospitality, real estate, healthcare and more.',
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
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (!sessionStorage.getItem('arohana_loaded')) {
                  document.documentElement.classList.add('arohana-is-loading');
                } else {
                  document.documentElement.classList.add('arohana-already-loaded');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body>
        <ExperienceLoader />
        <div id="root-main-content">
          <SmoothScroll>
            <AppShell>{children}</AppShell>
          </SmoothScroll>
        </div>
      </body>
    </html>
  );
}
