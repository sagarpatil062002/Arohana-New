'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CmsProvider } from '@/lib/cms/content-context';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <CmsProvider>
      {!isAdmin && <Navbar />}
      <main style={{ minHeight: '100vh', paddingTop: isAdmin ? 0 : '76px' }}>
        {children}
      </main>
      {!isAdmin && <Footer />}
    </CmsProvider>
  );
}
