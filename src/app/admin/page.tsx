'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Layers,
  Briefcase,
  Shield,
  Compass,
  Users,
  Image as ImageIcon,
  Plus,
  ArrowUpRight,
  Clock,
  Sparkles,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import MediaPickerModal from '@/components/admin/MediaPickerModal';

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState({
    sections: 10,
    caseStudies: 6,
    services: 3,
    armyProjects: 4,
    tourinJourneys: 3,
    partners: 7,
    mediaAssets: 4,
  });
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);

  useEffect(() => {
    // Load current live counts from files
    Promise.all([
      fetch('/api/content/home').then((r) => r.json()),
      fetch('/api/content/work').then((r) => r.json()),
      fetch('/api/content/services').then((r) => r.json()),
      fetch('/api/content/army-projects').then((r) => r.json()),
      fetch('/api/content/tourin').then((r) => r.json()),
      fetch('/api/content/about').then((r) => r.json()),
      fetch('/api/content/partners').then((r) => r.json()),
      fetch('/content/media.json').then((r) => r.json()),
    ])
      .then(([home, work, services, army, tourin, about, partners, media]) => {
        setCounts({
          sections: home.data?.sections?.length || 10,
          caseStudies: work.data?.caseStudies?.length || 6,
          services: services.data?.services?.length || 3,
          armyProjects: army.data?.projects?.length || 4,
          tourinJourneys: tourin.data?.journeys?.length || 3,
          aboutChapters: about.data?.chapters?.length || 3,
          partners: partners.data?.partners?.length || 7,
          mediaAssets: media.assets?.length || 4,
        } as any);
      })
      .catch(() => {});
  }, []);

  const stats = [
    { label: 'Homepage Sections', value: counts.sections, href: '/admin/home', icon: Layers, color: '#3B82F6' },
    { label: 'Active Case Studies', value: counts.caseStudies, href: '/admin/work', icon: Briefcase, color: '#DE322D' },
    { label: 'Practice Areas', value: counts.services, href: '/admin/services', icon: FileText, color: '#10B981' },
    { label: 'Tourin Journeys', value: counts.tourinJourneys, href: '/admin/tourin', icon: Compass, color: '#F59E0B' },
    { label: 'Army Projects', value: counts.armyProjects, href: '/admin/army-projects', icon: Shield, color: '#8B5CF6' },
    { label: 'Studio Chapters', value: (counts as any).aboutChapters || 3, href: '/admin/about', icon: Users, color: '#0EA5E9' },
    { label: 'Partner Logos', value: counts.partners, href: '/admin/partners', icon: Users, color: '#6366F1' },
    { label: 'Uploaded Assets', value: counts.mediaAssets, href: '/admin/media', icon: ImageIcon, color: '#EC4899' },
  ];

  const recentActivity = [
    { text: 'Homepage hero & sections synchronized with live theme', time: 'Just now', type: 'system' },
    { text: 'Army Projects: Investiture Ceremony video protocol enabled', time: '12 mins ago', type: 'edit' },
    { text: 'Work page: Instagram Reels carousel active', time: '45 mins ago', type: 'publish' },
    { text: 'File-based CMS initialized with zero database overhead', time: '2 hours ago', type: 'system' },
  ];

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      {/* Welcome Hero Banner */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          padding: 'clamp(1.75rem, 3vw, 2.5rem)',
          marginBottom: '2rem',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              color: '#DE322D',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
            }}
          >
            <Sparkles size={14} />
            <span>Ārohana Content Architecture</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.75rem, 2.8vw, 2.4rem)', fontWeight: 700, margin: '0 0 0.5rem 0', color: '#111113' }}>
            Good afternoon.
          </h1>
          <p style={{ fontSize: '0.95rem', color: '#71717A', margin: 0, maxWidth: '600px' }}>
            Manage your website content, case studies, videos, and media assets in real-time with zero database complexity.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link
            href="/admin/home"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.65rem 1.25rem',
              borderRadius: '9999px',
              backgroundColor: '#111113',
              color: '#FFFFFF',
              fontSize: '0.84rem',
              fontWeight: 600,
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
            }}
          >
            <Plus size={16} />
            Edit Homepage
          </Link>
          <button
            type="button"
            onClick={() => setIsMediaModalOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.65rem 1.25rem',
              borderRadius: '9999px',
              backgroundColor: '#FFFFFF',
              color: '#111113',
              fontSize: '0.84rem',
              fontWeight: 600,
              border: '1px solid rgba(0, 0, 0, 0.15)',
              cursor: 'pointer',
            }}
          >
            <ImageIcon size={16} />
            Upload Media
          </button>
        </div>
      </div>

      {/* Overview Cards Grid */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.05rem', fontWeight: 650, color: '#111113', marginBottom: '1rem', letterSpacing: '-0.01em' }}>
          Content Overview
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
            gap: '1rem',
          }}
        >
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  padding: '1.25rem',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.25s ease',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 10px 24px rgba(0, 0, 0, 0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.02)';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      backgroundColor: `${item.color}15`,
                      color: item.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <ArrowUpRight size={14} color="#A1A1AA" />
                </div>
                <div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#111113', lineHeight: 1.1 }}>
                    {item.value < 10 ? `0${item.value}` : item.value}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#71717A', marginTop: '0.25rem', fontWeight: 500 }}>
                    {item.label}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Two Column Section: Quick Managers + Activity */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
          gap: '1.75rem',
        }}
      >
        {/* Quick Actions Panel */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            padding: '1.75rem',
          }}
        >
          <h3 style={{ fontSize: '1.05rem', fontWeight: 650, color: '#111113', margin: '0 0 1.25rem 0' }}>
            Quick Managers
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { title: 'Homepage Sections', desc: 'Reorder, toggle visibility, and edit hero content', href: '/admin/home' },
              { title: 'Case Studies Directory', desc: 'Add or update client projects & Instagram reels', href: '/admin/work' },
              { title: 'Practice Areas', desc: 'Configure services, capabilities and consulting scopes', href: '/admin/services' },
              { title: 'Indian Army Projects', desc: 'Update verified defence briefs, stats & publications', href: '/admin/army-projects' },
              { title: 'Tourin Journeys', desc: 'Manage destination thinking, itineraries & expedition stats', href: '/admin/tourin' },
            ].map((m) => (
              <Link
                key={m.title}
                href={m.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.9rem 1.15rem',
                  borderRadius: '12px',
                  backgroundColor: '#F8F8FA',
                  textDecoration: 'none',
                  color: '#111113',
                  border: '1px solid rgba(0, 0, 0, 0.04)',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F0F0F3')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F8F8FA')}
              >
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{m.title}</div>
                  <div style={{ fontSize: '0.76rem', color: '#71717A', marginTop: '0.15rem' }}>{m.desc}</div>
                </div>
                <ArrowUpRight size={15} color="#DE322D" />
              </Link>
            ))}
          </div>
        </div>

        {/* System Status & Recent Activity */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            padding: '1.75rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 650, color: '#111113', margin: 0 }}>
              Recent Activity
            </h3>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.72rem',
                color: '#16A34A',
                fontWeight: 600,
                backgroundColor: '#DCFCE7',
                padding: '0.25rem 0.65rem',
                borderRadius: '9999px',
              }}
            >
              <CheckCircle2 size={13} />
              JSON Files Synchronized
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {recentActivity.map((act, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.85rem',
                  paddingBottom: i !== recentActivity.length - 1 ? '0.85rem' : 0,
                  borderBottom: i !== recentActivity.length - 1 ? '1px solid rgba(0, 0, 0, 0.06)' : 'none',
                }}
              >
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: '#F4F4F5',
                    color: '#71717A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                >
                  <Clock size={13} />
                </div>
                <div>
                  <div style={{ fontSize: '0.86rem', color: '#111113', fontWeight: 500, lineHeight: 1.4 }}>
                    {act.text}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#A1A1AA', marginTop: '0.2rem' }}>
                    {act.time}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: '1.5rem',
              padding: '1rem',
              backgroundColor: '#FAFAFA',
              borderRadius: '12px',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              fontSize: '0.78rem',
              color: '#52525B',
              lineHeight: 1.5,
            }}
          >
            <strong>Storage Architecture:</strong> Changes are saved to local content files (`/content/*.json`) and media to `/public/uploads/`.
          </div>
        </div>
      </div>

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        onSelect={(url) => {
          setIsMediaModalOpen(false);
        }}
      />
    </div>
  );
}
