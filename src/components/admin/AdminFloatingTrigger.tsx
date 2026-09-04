'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Sliders, Lock, ShieldCheck } from 'lucide-react';
import { useAdminAuth } from '@/lib/auth';
import { AdminModal } from '@/components/admin/AdminModal';

export function AdminFloatingTrigger() {
  const { isAuthenticated } = useAdminAuth();
  const [modalOpen, setModalOpen] = useState(false);

  // Listen to global open event
  useEffect(() => {
    const handleOpenAdmin = () => setModalOpen(true);
    window.addEventListener('arohana:open_admin', handleOpenAdmin);
    return () => window.removeEventListener('arohana:open_admin', handleOpenAdmin);
  }, []);

  return (
    <>
      {/* The Global Admin & Live CMS Modal */}
      <AdminModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

export function triggerAdminModal() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('arohana:open_admin'));
  }
}
