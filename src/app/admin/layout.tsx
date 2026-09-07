'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import { CmsProvider } from '@/lib/cms/content-context';
import { Loader2 } from 'lucide-react';

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setIsAuthenticated(true);
      return;
    }

    fetch('/api/auth/check')
      .then((r) => r.json())
      .then((data) => {
        if (data.isAuthenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          router.push('/admin/login');
        }
      })
      .catch(() => {
        setIsAuthenticated(false);
        router.push('/admin/login');
      });
  }, [pathname, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (isAuthenticated === null) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0F1014',
          color: '#FFFFFF',
          gap: '0.75rem',
          fontSize: '0.9rem',
          fontFamily: 'var(--font-sans, sans-serif)',
        }}
      >
        <Loader2 size={24} className="animate-spin" color="#DE322D" />
        Verifying Ārohana Admin Session...
      </div>
    );
  }

  return <AdminLayout>{children}</AdminLayout>;
}
