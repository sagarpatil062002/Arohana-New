'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Home,
  Briefcase,
  Layers,
  Compass,
  Shield,
  Users,
  Mail,
  PanelBottom,
  Image as ImageIcon,
  Settings,
  Eye,
  Save,
  UploadCloud,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Check,
  FileText,
  MessageSquare,
} from 'lucide-react';
import PublishDialog from './PublishDialog';
import { useCmsContent } from '@/lib/cms/content-context';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { content, saveDraft } = useCmsContent();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  // Close mobile nav on route change
  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  // Sidebar arranged strictly in the exact order of the frontend Navbar:
  // Home -> Studio/About -> Work -> Case Studies -> Services -> Tourin -> Army Projects -> Contact
  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Client Inquiries', href: '/admin/leads', icon: MessageSquare },
    { label: 'Home Page', href: '/admin/home', icon: Home },
    { label: 'Studio / About', href: '/admin/about', icon: Users },
    { label: 'Work Page', href: '/admin/work', icon: Briefcase },
    { label: 'Case Studies', href: '/admin/cases', icon: FileText },
    { label: 'Services', href: '/admin/services', icon: Layers },
    { label: 'Tourin Brand', href: '/admin/tourin', icon: Compass },
    { label: 'Army Projects', href: '/admin/army-projects', icon: Shield },
    { label: 'Contact Info', href: '/admin/contact', icon: Mail },
    { label: 'Footer Settings', href: '/admin/footer', icon: PanelBottom },
    { label: 'Media Library', href: '/admin/media', icon: ImageIcon },
    { label: 'Site Settings', href: '/admin/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('arohana_admin_session');
      sessionStorage.removeItem('arohana_admin_session');
    }
    await fetch('/api/auth/login', { method: 'DELETE' });
    router.push('/admin/login');
  };

  const handleTopSave = async () => {
    const sec = pathname?.replace('/admin/', '').replace('/admin', '') || 'home';
    if (sec && content[sec]) {
      await saveDraft(sec, content[sec]);
    }
    triggerSaveNotification();
  };

  const triggerSaveNotification = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#F7F7F8',
        fontFamily: 'var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',
        color: '#111113',
      }}
    >
      {/* ─── DESKTOP & MOBILE SIDEBAR ─── */}
      <aside
        className={`admin-sidebar ${mobileNavOpen ? 'mobile-open' : ''}`}
        style={{
          width: '260px',
          backgroundColor: '#111113',
          color: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          zIndex: 50,
          position: 'sticky',
          top: 0,
          height: '100vh',
        }}
      >
        {/* Brand Header */}
        <div
          style={{
            padding: '1.75rem 1.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link href="/admin" style={{ textDecoration: 'none', color: '#FFFFFF' }}>
            <div style={{ fontSize: '1.15rem', fontWeight: 700, letterSpacing: '0.08em' }}>
              ĀROHANA
            </div>
            <div style={{ fontSize: '0.68rem', color: '#DE322D', letterSpacing: '0.14em', fontWeight: 600 }}>
              ADMIN CRM &bull; CMS
            </div>
          </Link>
          <button
            type="button"
            className="admin-mobile-close"
            onClick={() => setMobileNavOpen(false)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#FFFFFF',
              cursor: 'pointer',
              display: 'none',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav
          style={{
            flex: 1,
            padding: '1.25rem 0.85rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontSize: '0.84rem',
                  fontWeight: isActive ? 600 : 450,
                  color: isActive ? '#FFFFFF' : '#A1A1AA',
                  backgroundColor: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  transition: 'all 0.2s ease',
                }}
              >
                <Icon size={17} color={isActive ? '#DE322D' : 'currentColor'} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer Actions */}
        <div
          style={{
            padding: '1.25rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.55rem 0.85rem',
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              color: '#D4D4D8',
              fontSize: '0.78rem',
              textDecoration: 'none',
              fontWeight: 500,
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Eye size={14} />
              Preview Live Site
            </span>
            <ExternalLink size={12} />
          </a>

          <button
            type="button"
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.55rem 0.85rem',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: 'transparent',
              color: '#EF4444',
              fontSize: '0.78rem',
              fontWeight: 500,
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ─── MAIN CONTENT AREA ─── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, minHeight: '100vh' }}>
        {/* Top Sticky Header */}
        <header
          style={{
            height: '68px',
            flexShrink: 0,
            position: 'sticky',
            top: 0,
            zIndex: 40,
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 1.75rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              type="button"
              className="admin-mobile-toggle"
              onClick={() => setMobileNavOpen(true)}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'none',
                color: '#111113',
              }}
            >
              <Menu size={22} />
            </button>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#111113' }}>
              Ārohana Content Control Panel
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              type="button"
              onClick={handleTopSave}
              title="Save current page changes into Centralized CRM Draft Store (does NOT publish to live)"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.5rem 1rem',
                borderRadius: '9999px',
                border: '1px solid rgba(0, 0, 0, 0.15)',
                backgroundColor: '#FFFFFF',
                color: '#111113',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              <Save size={14} />
              Save Draft
            </button>

            <button
              type="button"
              onClick={() => setIsPublishDialogOpen(true)}
              title="Publish all saved draft changes across the entire website to live"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.5rem 1.25rem',
                borderRadius: '9999px',
                border: 'none',
                backgroundColor: '#DE322D',
                color: '#FFFFFF',
                fontSize: '0.8rem',
                fontWeight: 650,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(222, 50, 45, 0.28)',
                transition: 'all 0.2s ease',
              }}
            >
              <UploadCloud size={15} />
              Publish All Changes
            </button>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main
          className="admin-main-viewport"
          style={{
            flex: 1,
            padding: '1.25rem 1.5rem',
            boxSizing: 'border-box',
            minHeight: 'calc(100vh - 68px)',
          }}
        >
          {children}
        </main>
      </div>

      {/* Publish Dialog */}
      <PublishDialog
        isOpen={isPublishDialogOpen}
        onClose={() => setIsPublishDialogOpen(false)}
        onPublishSuccess={() => {
          setSaveToast(true);
          setTimeout(() => setSaveToast(false), 3000);
        }}
      />

      {/* Save Draft Toast */}
      {saveToast && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: '#111113',
            color: '#FFFFFF',
            borderRadius: '9999px',
            padding: '0.65rem 1.25rem',
            fontSize: '0.82rem',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
            zIndex: 99999,
            animation: 'fadeIn 0.25s ease',
          }}
        >
          <Check size={16} color="#22C55E" />
          Draft saved &amp; ready to preview!
        </div>
      )}

      <style jsx global>{`
        /* ─── Global Admin CRM Scrollbar Enhancements ─── */
        /* Make editor scrollbars prominent, smooth, and effortless to grab */
        .admin-editor-scroll,
        .admin-custom-scroll {
          scrollbar-width: thin;
          scrollbar-color: #94A3B8 #F1F5F9;
          overscroll-behavior: contain;
          scroll-behavior: smooth;
        }

        .admin-editor-scroll::-webkit-scrollbar,
        .admin-custom-scroll::-webkit-scrollbar {
          width: 9px;
          height: 9px;
        }

        .admin-editor-scroll::-webkit-scrollbar-track,
        .admin-custom-scroll::-webkit-scrollbar-track {
          background: #F1F5F9;
          border-radius: 9999px;
        }

        .admin-editor-scroll::-webkit-scrollbar-thumb,
        .admin-custom-scroll::-webkit-scrollbar-thumb {
          background: #94A3B8;
          border-radius: 9999px;
          border: 2px solid #F1F5F9;
        }

        .admin-editor-scroll::-webkit-scrollbar-thumb:hover,
        .admin-custom-scroll::-webkit-scrollbar-thumb:hover {
          background: #475569;
        }

        .admin-editor-scroll::-webkit-scrollbar-thumb:active,
        .admin-custom-scroll::-webkit-scrollbar-thumb:active {
          background: #1E293B;
        }

        /* Completely hide ugly horizontal scrollbar bar in tab rows */
        .admin-tabs-row,
        .no-scrollbar {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }

        .admin-tabs-row::-webkit-scrollbar,
        .no-scrollbar::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }

        /* Natural page scrolling with sticky preview on desktop */
        .admin-split-grid {
          display: grid;
          grid-template-columns: 1.08fr 0.92fr;
          gap: 1.5rem;
          align-items: start;
          width: 100%;
        }

        .admin-preview-sticky {
          position: sticky;
          top: 80px;
          height: calc(100vh - 100px);
          max-height: 920px;
          min-height: 660px;
          display: flex !important;
          flex-direction: column !important;
          width: 100%;
        }

        @media (max-width: 1120px) {
          .admin-split-grid {
            grid-template-columns: 1fr !important;
          }
          .admin-preview-sticky {
            position: relative !important;
            top: 0 !important;
            height: 720px !important;
            width: 100% !important;
          }
          .admin-main-viewport {
            height: auto !important;
            min-height: calc(100vh - 68px) !important;
            padding: 1rem !important;
          }
        }

        @media (max-width: 900px) {
          .admin-sidebar {
            position: fixed !important;
            left: -260px;
            transition: left 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .admin-sidebar.mobile-open {
            left: 0 !important;
          }
          .admin-mobile-toggle {
            display: block !important;
          }
          .admin-mobile-close {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}
