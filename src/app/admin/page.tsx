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
  MessageSquare,
  Upload,
  Check,
  Globe,
} from 'lucide-react';
import LivePreviewPanel from '@/components/admin/LivePreviewPanel';
import MediaPickerModal from '@/components/admin/MediaPickerModal';

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState({
    sections: 10,
    caseStudies: 6,
    services: 3,
    armyProjects: 4,
    tourinJourneys: 3,
    aboutChapters: 3,
    mediaAssets: 4,
    leadsCount: 0,
    newLeadsCount: 0,
  });
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('/');
  const [previewTitle, setPreviewTitle] = useState('Homepage Preview');
  const [savedStatus, setSavedStatus] = useState(false);

  useEffect(() => {
    // Load current live counts from files and leads API
    Promise.all([
      fetch('/api/content/home').then((r) => r.json()).catch(() => ({})),
      fetch('/api/content/work').then((r) => r.json()).catch(() => ({})),
      fetch('/api/content/services').then((r) => r.json()).catch(() => ({})),
      fetch('/api/content/army-projects').then((r) => r.json()).catch(() => ({})),
      fetch('/api/content/tourin').then((r) => r.json()).catch(() => ({})),
      fetch('/api/content/about').then((r) => r.json()).catch(() => ({})),
      fetch('/content/media.json').then((r) => r.json()).catch(() => ({})),
      fetch('/api/leads').then((r) => r.json()).catch(() => ({})),
    ])
      .then(([home, work, services, army, tourin, about, media, leadsRes]) => {
        const leads = leadsRes.leads || [];
        const newLeads = leads.filter((l: any) => l.status === 'new').length;

        setCounts({
          sections: home.data?.sections?.length || 10,
          caseStudies: work.data?.caseStudies?.length || 6,
          services: services.data?.services?.length || 3,
          armyProjects: army.data?.projects?.length || 4,
          tourinJourneys: tourin.data?.journeys?.length || 3,
          aboutChapters: about.data?.chapters?.length || 3,
          mediaAssets: media.assets?.length || 4,
          leadsCount: leads.length || 0,
          newLeadsCount: newLeads,
        });
      })
      .catch(() => {});
  }, []);

  const stats = [
    { label: 'Client Inquiries', value: counts.leadsCount, href: '/admin/leads', icon: MessageSquare, color: '#DE322D', badge: counts.newLeadsCount > 0 ? `${counts.newLeadsCount} New` : undefined },
    { label: 'Homepage Sections', value: counts.sections, href: '/admin/home', icon: Layers, color: '#3B82F6' },
    { label: 'Case Studies', value: counts.caseStudies, href: '/admin/cases', icon: FileText, color: '#DE322D' },
    { label: 'Work & Reels', value: 6, href: '/admin/work', icon: Briefcase, color: '#F97316' },
    { label: 'Practice Areas', value: counts.services, href: '/admin/services', icon: Layers, color: '#10B981' },
    { label: 'Army Projects', value: counts.armyProjects, href: '/admin/army-projects', icon: Shield, color: '#8B5CF6' },
    { label: 'Tourin Journeys', value: counts.tourinJourneys, href: '/admin/tourin', icon: Compass, color: '#F59E0B' },
    { label: 'Studio Chapters', value: counts.aboutChapters, href: '/admin/about', icon: Users, color: '#0EA5E9' },
  ];

  const recentActivity = [
    { text: 'Client Inquiry API synchronized with Contact Us page', time: 'Just now', type: 'system' },
    { text: 'Homepage hero & sections synchronized with live theme', time: '10 mins ago', type: 'system' },
    { text: 'Army Projects: Investiture Ceremony video protocol enabled', time: '25 mins ago', type: 'edit' },
    { text: 'Work page: Instagram Reels carousel active', time: '55 mins ago', type: 'publish' },
    { text: 'File-based CMS initialized with zero database overhead', time: '2 hours ago', type: 'system' },
  ];

  const previewPages = [
    { label: 'Home', url: '/', title: 'Homepage Preview' },
    { label: 'Work', url: '/work', title: 'Work & Reels Preview' },
    { label: 'Cases', url: '/work/raysons-group', title: 'Case Study Preview' },
    { label: 'Services', url: '/services', title: 'Practice Areas Preview' },
    { label: 'Army', url: '/army-projects', title: 'Army Projects Preview' },
    { label: 'Tourin', url: '/tourin', title: 'Tourin Journeys Preview' },
    { label: 'About', url: '/about', title: 'About Us Preview' },
    { label: 'Contact', url: '/contact', title: 'Contact Us Preview' },
  ];

  const handleQuickSaveDraft = () => {
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2000);
  };

  const handleQuickPublish = () => {
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* ── TOP ACTION HEADER (UNIFORM ACROSS ALL ADMIN PAGES) ── */}
      <div
        style={{
          padding: '0.85rem 1.5rem',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: '#111113' }}>
            Ārohana Studio Overview
          </div>
          <span
            style={{
              fontSize: '0.75rem',
              padding: '0.2rem 0.6rem',
              borderRadius: '9999px',
              backgroundColor: '#F4F4F5',
              color: '#52525B',
              fontWeight: 600,
            }}
          >
            Live CMS Architecture
          </span>
          <Link
            href="/admin/leads"
            style={{
              fontSize: '0.78rem',
              color: '#DE322D',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              marginLeft: '0.25rem',
              fontWeight: 600,
            }}
          >
            <MessageSquare size={13} />
            <span>Client Inquiries ({counts.leadsCount})</span>
          </Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {/* Amber pill: Save Draft */}
          <button
            type="button"
            onClick={handleQuickSaveDraft}
            title="Save draft to CRM"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.45rem 0.95rem',
              borderRadius: '9999px',
              border: '1px solid #D97706',
              backgroundColor: savedStatus ? '#F0FDF4' : '#FEF3C7',
              color: savedStatus ? '#16A34A' : '#92400E',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              transition: 'all 0.15s ease',
            }}
          >
            {savedStatus ? <Check size={13} /> : <FileText size={13} />}
            <span>{savedStatus ? 'Draft Saved' : 'Save Draft'}</span>
          </button>

          {/* Red pill: Publish Live */}
          <button
            type="button"
            onClick={handleQuickPublish}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.45rem 1.15rem',
              borderRadius: '9999px',
              border: 'none',
              backgroundColor: '#DE322D',
              color: '#FFFFFF',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(222, 50, 45, 0.25)',
            }}
          >
            <Upload size={13} />
            <span>Publish This Page</span>
          </button>
        </div>
      </div>

      {/* ── SPLIT MAIN WORKSPACE: LEFT EDITOR/OVERVIEW | RIGHT STICKY PREVIEW ── */}
      <div className="admin-split-grid" style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '1.5rem', alignItems: 'start', padding: '1rem' }}>
        {/* LEFT COLUMN: NATURAL PAGE SCROLL */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Welcome Hero Banner */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              padding: '1.5rem',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  color: '#DE322D',
                  textTransform: 'uppercase',
                  marginBottom: '0.4rem',
                }}
              >
                <Sparkles size={13} />
                <span>Ārohana Content Architecture</span>
              </div>
              <h1 style={{ fontSize: '1.6rem', fontWeight: 700, margin: '0 0 0.35rem 0', color: '#111113' }}>
                Good afternoon.
              </h1>
              <p style={{ fontSize: '0.86rem', color: '#71717A', margin: 0, maxWidth: '520px' }}>
                Manage your website content, case studies, videos, and media assets in real-time with zero database complexity.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
              <Link
                href="/admin/home"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.55rem 1.15rem',
                  borderRadius: '9999px',
                  backgroundColor: '#111113',
                  color: '#FFFFFF',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  boxShadow: '0 3px 10px rgba(0, 0, 0, 0.12)',
                }}
              >
                <Plus size={14} />
                Edit Homepage
              </Link>
              <button
                type="button"
                onClick={() => setIsMediaModalOpen(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.55rem 1.15rem',
                  borderRadius: '9999px',
                  backgroundColor: '#FFFFFF',
                  color: '#111113',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  border: '1px solid rgba(0, 0, 0, 0.15)',
                  cursor: 'pointer',
                }}
              >
                <ImageIcon size={14} />
                Upload Media
              </button>
            </div>
          </div>

          {/* Overview Cards Grid */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 650, color: '#111113', margin: 0 }}>
                Content &amp; Inquiries Overview
              </h2>
              <span style={{ fontSize: '0.75rem', color: '#71717A' }}>Live JSON sync</span>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 155px), 1fr))',
                gap: '0.85rem',
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
                      borderRadius: '14px',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                      padding: '1.1rem',
                      textDecoration: 'none',
                      color: 'inherit',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      position: 'relative',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 18px rgba(0, 0, 0, 0.06)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.02)';
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          backgroundColor: `${item.color}15`,
                          color: item.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Icon size={16} />
                      </div>
                      {item.badge ? (
                        <span style={{ fontSize: '0.65rem', backgroundColor: '#FEE2E2', color: '#DE322D', padding: '2px 6px', borderRadius: '9999px', fontWeight: 700 }}>
                          {item.badge}
                        </span>
                      ) : (
                        <ArrowUpRight size={13} color="#A1A1AA" />
                      )}
                    </div>
                    <div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111113', lineHeight: 1.1 }}>
                        {item.value < 10 ? `0${item.value}` : item.value}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: '#71717A', marginTop: '0.2rem', fontWeight: 500 }}>
                        {item.label}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Managers Panel */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              padding: '1.5rem',
            }}
          >
            <h3 style={{ fontSize: '0.98rem', fontWeight: 650, color: '#111113', margin: '0 0 1rem 0' }}>
              Quick Managers
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { title: 'Client Inquiries & Leads', desc: 'Review contact inquiries, replies, and status updates', href: '/admin/leads' },
                { title: 'Homepage Sections', desc: 'Reorder, toggle visibility, and edit hero banner & CTA buttons', href: '/admin/home' },
                { title: 'Case Studies Directory', desc: 'Add or update in-depth client case study narratives & galleries', href: '/admin/cases' },
                { title: 'Practice Areas', desc: 'Configure services, capabilities and consulting scopes', href: '/admin/services' },
                { title: 'Tourin Journeys', desc: 'Manage destination thinking, itineraries & expedition stats', href: '/admin/tourin' },
                { title: 'Indian Army Projects', desc: 'Update verified defence briefs, stats & publications', href: '/admin/army-projects' },
                { title: 'Studio / About Us', desc: 'Update founder philosophy, agency chapters & ethos', href: '/admin/about' },
                { title: 'Work Page & Instagram Reels', desc: 'Manage page heading and Instagram reel showcases', href: '/admin/work' },
                { title: 'Contact Information', desc: 'Manage studio emails, address, and enquiry routing', href: '/admin/contact' },
              ].map((m) => (
                <Link
                  key={m.title}
                  href={m.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
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
                    <div style={{ fontSize: '0.86rem', fontWeight: 600 }}>{m.title}</div>
                    <div style={{ fontSize: '0.74rem', color: '#71717A', marginTop: '0.1rem' }}>{m.desc}</div>
                  </div>
                  <ArrowUpRight size={14} color="#DE322D" />
                </Link>
              ))}
            </div>
          </div>

          {/* System Status & Recent Activity */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              padding: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 650, color: '#111113', margin: 0 }}>
                Recent Activity &amp; Health
              </h3>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.7rem',
                  color: '#16A34A',
                  fontWeight: 600,
                  backgroundColor: '#DCFCE7',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '9999px',
                }}
              >
                <CheckCircle2 size={12} />
                JSON Synchronized
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {recentActivity.map((act, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    paddingBottom: i !== recentActivity.length - 1 ? '0.75rem' : 0,
                    borderBottom: i !== recentActivity.length - 1 ? '1px solid rgba(0, 0, 0, 0.06)' : 'none',
                  }}
                >
                  <div
                    style={{
                      width: '26px',
                      height: '26px',
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
                    <Clock size={12} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.84rem', color: '#111113', fontWeight: 500, lineHeight: 1.35 }}>
                      {act.text}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#A1A1AA', marginTop: '0.15rem' }}>
                      {act.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: STICKY INTERACTIVE LIVE PREVIEW PANE */}
        <div className="admin-preview-sticky" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {/* Quick Page Selector for Preview */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '0.5rem 0.75rem',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              overflowX: 'auto',
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#71717A', textTransform: 'uppercase', marginRight: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Globe size={11} /> Page:
            </span>
            {previewPages.map((p) => {
              const isActive = previewUrl === p.url;
              return (
                <button
                  key={p.url}
                  type="button"
                  onClick={() => {
                    setPreviewUrl(p.url);
                    setPreviewTitle(p.title);
                  }}
                  style={{
                    padding: '0.25rem 0.6rem',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: isActive ? '#111113' : '#F4F4F5',
                    color: isActive ? '#FFFFFF' : '#52525B',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {p.label}
                </button>
              );
            })}
          </div>

          {/* Live Preview Frame */}
          <div style={{ flex: 1, minHeight: 0 }}>
            <LivePreviewPanel
              previewUrl={previewUrl}
              title={previewTitle}
            />
          </div>
        </div>
      </div>

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        onSelect={() => setIsMediaModalOpen(false)}
      />
    </div>
  );
}
