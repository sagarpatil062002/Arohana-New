'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AdminModal } from '@/components/admin/AdminModal';

export default function AdminPage() {
  const router = useRouter();

  return (
    <div className="min-h-[85vh] bg-stodio-bg py-8">
      <AdminModal isOpen={true} onClose={() => router.push('/')} />
    </div>
  );
}
