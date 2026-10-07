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

export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getSectionContent } from '@/lib/cms/content-manager';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sections = ['home', 'work', 'services', 'army-projects', 'tourin', 'about', 'partners', 'contact', 'footer', 'settings'];
  const initialContent: Record<string, any> = {};
  for (const s of sections) {
    try {
      const val = getSectionContent(s, false);
      if (val) initialContent[s] = val;
    } catch (e) {}
  }

  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                // Only run intro experience loader on root homepage
                if ((window.location.pathname === '/' || window.location.pathname === '') && !sessionStorage.getItem('arohana_loaded')) {
                  document.documentElement.classList.add('arohana-is-loading');
                  setTimeout(function() {
                    document.documentElement.classList.remove('arohana-is-loading');
                  }, 1800);
                } else {
                  document.documentElement.classList.add('arohana-already-loaded');
                }
              } catch (e) {
                document.documentElement.classList.remove('arohana-is-loading');
              }
            `,
          }}
        />
      </head>
      <body>
        <ExperienceLoader />
        <div id="root-main-content">
          <SmoothScroll>
            <AppShell initialContent={initialContent}>{children}</AppShell>
          </SmoothScroll>
        </div>
      </body>
    </html>
  );
}
