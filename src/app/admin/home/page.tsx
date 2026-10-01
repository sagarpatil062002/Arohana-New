'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useCmsContent } from '@/lib/cms/content-context';
import LivePreviewPanel from '@/components/admin/LivePreviewPanel';
import MediaPickerModal from '@/components/admin/MediaPickerModal';
import {
  GripVertical,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  Save,
  Check,
  Plus,
  Trash2,
  Sparkles,
  Layers,
  Briefcase,
  Shield,
  Compass,
  FileText,
  Quote,
  LayoutGrid,
  Send,
  Sliders,
  Upload,
  Video,
} from 'lucide-react';

export default function AdminHomePage() {
  const { content, saveDraft, publishSection, updateDraftInMemory } = useCmsContent();
  const [homeData, setHomeData] = useState<any>(null);
  const [activeSectionId, setActiveSectionId] = useState<string>('hero');
  const [mediaPickerTarget, setMediaPickerTarget] = useState<{ path: string; type?: 'image' | 'video' } | null>(null);
  const [brandLogoIndex, setBrandLogoIndex] = useState<number | null>(null);
  const [heroSlideIndex, setHeroSlideIndex] = useState<number | null>(null);
  const [draftSavedStatus, setDraftSavedStatus] = useState(false);
  const [publishedStatus, setPublishedStatus] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const editorScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (content.home) {
      setHomeData(JSON.parse(JSON.stringify(content.home)));
    }
  }, [content.home]);

  // Smoothly scroll editor back to top when switching sections
  useEffect(() => {
    editorScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSectionId]);

  if (!homeData) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center', color: '#71717A' }}>
        Loading Homepage Content...
      </div>
    );
  }

  // Generic deep update helper
  const updateField = (path: string[], val: any) => {
    const updated = JSON.parse(JSON.stringify(homeData));
    let current = updated;
    for (let i = 0; i < path.length - 1; i++) {
      if (!current[path[i]]) current[path[i]] = {};
      current = current[path[i]];
    }
    current[path[path.length - 1]] = val;
    setHomeData(updated);
    updateDraftInMemory('home', updated);
  };

  // Atomic toggle for Hero section keeping hero.enabled and sections list in sync
  const toggleHeroSection = () => {
    const updated = JSON.parse(JSON.stringify(homeData));
    const current = updated.hero?.enabled !== false;
    const next = !current;
    if (!updated.hero) updated.hero = {};
    updated.hero.enabled = next;
    if (Array.isArray(updated.sections)) {
      updated.sections = updated.sections.map((s: any) =>
        s.id === 'hero' ? { ...s, visible: next } : s
      );
    }
    setHomeData(updated);
    updateDraftInMemory('home', updated);
    setToastMessage(next ? '✓ Hero Section is now Active' : '✕ Hero Section is now Hidden');
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Atomic toggle for Point of View section keeping pov.enabled and sections list in sync
  const togglePovSection = () => {
    const updated = JSON.parse(JSON.stringify(homeData));
    const current = updated.pov?.enabled !== false;
    const next = !current;
    if (!updated.pov) updated.pov = {};
    updated.pov.enabled = next;
    if (Array.isArray(updated.sections)) {
      updated.sections = updated.sections.map((s: any) =>
        s.id === 'pov' ? { ...s, visible: next } : s
      );
    }
    setHomeData(updated);
    updateDraftInMemory('home', updated);
    setToastMessage(next ? '✓ Point of View Section is now Active' : '✕ Point of View Section is now Hidden');
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Atomic toggle for Selected Work section
  const toggleWorkSection = () => {
    const updated = JSON.parse(JSON.stringify(homeData));
    const current = updated.selectedWork?.enabled !== false;
    const next = !current;
    if (!updated.selectedWork) updated.selectedWork = {};
    updated.selectedWork.enabled = next;
    if (Array.isArray(updated.sections)) {
      updated.sections = updated.sections.map((s: any) =>
        s.id === 'work' ? { ...s, visible: next } : s
      );
    }
    setHomeData(updated);
    updateDraftInMemory('home', updated);
    setToastMessage(next ? '✓ Selected Work Section is now Active' : '✕ Selected Work Section is now Hidden');
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Atomic toggle for Capabilities & Numbers section
  const toggleServicesSection = () => {
    const updated = JSON.parse(JSON.stringify(homeData));
    const current = updated.services?.enabled !== false;
    const next = !current;
    if (!updated.services) updated.services = {};
    updated.services.enabled = next;
    if (Array.isArray(updated.sections)) {
      updated.sections = updated.sections.map((s: any) =>
        s.id === 'services' ? { ...s, visible: next } : s
      );
    }
    setHomeData(updated);
    updateDraftInMemory('home', updated);
    setToastMessage(next ? '✓ Capabilities & Numbers Section is now Active' : '✕ Capabilities & Numbers Section is now Hidden');
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Atomic toggle for Brands Marquee section
  const toggleBrandsSection = () => {
    const updated = JSON.parse(JSON.stringify(homeData));
    const current = updated.brands?.enabled !== false;
    const next = !current;
    if (!updated.brands) updated.brands = {};
    updated.brands.enabled = next;
    if (Array.isArray(updated.sections)) {
      updated.sections = updated.sections.map((s: any) =>
        s.id === 'brands' ? { ...s, visible: next } : s
      );
    }
    setHomeData(updated);
    updateDraftInMemory('home', updated);
    setToastMessage(next ? '✓ Brands Marquee Section is now Active' : '✕ Brands Marquee Section is now Hidden');
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Atomic toggle for Indian Army Spotlight section
  const toggleArmySection = () => {
    const updated = JSON.parse(JSON.stringify(homeData));
    const current = updated.armySpotlight?.enabled !== false;
    const next = !current;
    if (!updated.armySpotlight) updated.armySpotlight = {};
    updated.armySpotlight.enabled = next;
    if (Array.isArray(updated.sections)) {
      updated.sections = updated.sections.map((s: any) =>
        s.id === 'army' ? { ...s, visible: next } : s
      );
    }
    setHomeData(updated);
    updateDraftInMemory('home', updated);
    setToastMessage(next ? '✓ Indian Army Spotlight Section is now Active' : '✕ Indian Army Spotlight Section is now Hidden');
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Atomic toggle for Signature CTA section
  const toggleCtaSection = () => {
    const updated = JSON.parse(JSON.stringify(homeData));
    const current = updated.cta?.enabled !== false;
    const next = !current;
    if (!updated.cta) updated.cta = {};
    updated.cta.enabled = next;
    if (Array.isArray(updated.sections)) {
      updated.sections = updated.sections.map((s: any) =>
        s.id === 'cta' ? { ...s, visible: next } : s
      );
    }
    setHomeData(updated);
    updateDraftInMemory('home', updated);
    setToastMessage(next ? '✓ Signature CTA Section is now Active' : '✕ Signature CTA Section is now Hidden');
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleSectionVisibility = (id: string) => {
    const updated = JSON.parse(JSON.stringify(homeData));
    const updatedSections = (updated.sections || []).map((sec: any) =>
      sec.id === id ? { ...sec, visible: !sec.visible } : sec
    );
    updated.sections = updatedSections;
    const targetSec = updatedSections.find((s: any) => s.id === id);
    if (targetSec) {
      if (id === 'hero') {
        if (!updated.hero) updated.hero = {};
        updated.hero.enabled = targetSec.visible;
      } else if (id === 'pov') {
        if (!updated.pov) updated.pov = {};
        updated.pov.enabled = targetSec.visible;
      } else if (id === 'work') {
        if (!updated.selectedWork) updated.selectedWork = {};
        updated.selectedWork.enabled = targetSec.visible;
      } else if (id === 'services') {
        if (!updated.services) updated.services = {};
        updated.services.enabled = targetSec.visible;
      } else if (id === 'brands') {
        if (!updated.brands) updated.brands = {};
        updated.brands.enabled = targetSec.visible;
      } else if (id === 'army') {
        if (!updated.armySpotlight) updated.armySpotlight = {};
        updated.armySpotlight.enabled = targetSec.visible;
      } else if (id === 'cta') {
        if (!updated.cta) updated.cta = {};
        updated.cta.enabled = targetSec.visible;
      }
    }
    setHomeData(updated);
    updateDraftInMemory('home', updated);
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= homeData.sections.length) return;
    const newSections = [...homeData.sections];
    const temp = newSections[index];
    newSections[index] = newSections[targetIdx];
    newSections[targetIdx] = temp;
    const updated = { ...homeData, sections: newSections };
    setHomeData(updated);
    updateDraftInMemory('home', updated);
  };

  const handleSaveDraft = async () => {
    const ok = await saveDraft('home', homeData);
    if (ok) {
      setDraftSavedStatus(true);
      setToastMessage('✓ Draft saved to Admin CRM! Click "Publish Live" to make changes live on the website.');
      setTimeout(() => setDraftSavedStatus(false), 2400);
      setTimeout(() => setToastMessage(''), 5000);
    }
  };

  const handlePublishLive = async () => {
    const ok = await publishSection('home', homeData);
    if (ok) {
      setPublishedStatus(true);
      setToastMessage('🚀 Homepage Published Live! Changes are now live on the website.');
      setTimeout(() => setPublishedStatus(false), 2400);
      setTimeout(() => setToastMessage(''), 5000);
    }
  };

  const sectionTabs = [
    { id: 'hero', label: '01 Hero Banner & Carousel', icon: Sparkles, isLive: true },
    { id: 'pov', label: '02 Point of View', icon: Quote, isLive: true },
    { id: 'work', label: '03 Selected Work', icon: Briefcase, isLive: true },
    { id: 'services', label: '04 Practice Areas & Numbers', icon: FileText, isLive: true },
    { id: 'brands', label: '05 Brands Marquee', icon: Layers, isLive: true },
    { id: 'army', label: '06 Army Spotlight', icon: Shield, isLive: true },
    { id: 'cta', label: '07 Signature CTA', icon: Send, isLive: true },
    { id: 'order', label: 'Order & Visibility', icon: GripVertical, isLive: true },
  ];

  return (
    <div className="admin-split-grid" style={{ display: 'grid', gridTemplateColumns: '1.08fr 0.92fr', gap: '1.5rem', height: '100%', minHeight: 0 }}>
      {/* ─── LEFT COLUMN: SECTION-BY-SECTION EDITOR ─── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
          height: '100%',
          minHeight: 0,
        }}
      >
        {/* Editor Top Bar */}
        <div
          style={{
            padding: '1rem 1.4rem',
            borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FAFAFA',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 650, margin: 0, color: '#111113' }}>
                  Homepage Section Editor
                </h2>
                <span style={{ fontSize: '0.72rem', backgroundColor: '#ECFDF5', padding: '2px 8px', borderRadius: '6px', color: '#047857', fontWeight: 600 }}>
                  7 Live Sections
                </span>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#71717A', marginTop: '0.15rem' }}>
                Select any section to edit copy, sharp metric numbers, images, and brand logos in real-time.
              </div>
            </div>

            {/* Quick Section Dropdown Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#52525B' }}>Section:</span>
              <select
                value={activeSectionId}
                onChange={(e) => setActiveSectionId(e.target.value)}
                style={{
                  padding: '0.4rem 0.75rem',
                  borderRadius: '6px',
                  border: '1px solid rgba(0, 0, 0, 0.15)',
                  backgroundColor: '#FFFFFF',
                  color: '#111113',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  outline: 'none',
                }}
              >
                {sectionTabs.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            {/* Save Draft Button (Saves to Admin CRM side) */}
            <button
              type="button"
              onClick={handleSaveDraft}
              title="Save draft to Admin CRM without pushing live"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.5rem 1rem',
                borderRadius: '9999px',
                border: '1px solid rgba(0, 0, 0, 0.15)',
                backgroundColor: draftSavedStatus ? '#F0FDF4' : '#FFFFFF',
                color: draftSavedStatus ? '#16A34A' : '#18181B',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              {draftSavedStatus ? <Check size={14} /> : <Save size={14} />}
              {draftSavedStatus ? 'Draft Saved' : 'Save Draft'}
            </button>

            {/* Publish Live Button (Makes changes live on website) */}
            <button
              type="button"
              onClick={handlePublishLive}
              title="Publish all changes live to the website"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.5rem 1.25rem',
                borderRadius: '9999px',
                border: 'none',
                backgroundColor: publishedStatus ? '#16A34A' : '#DE322D',
                color: '#FFFFFF',
                fontSize: '0.82rem',
                fontWeight: 650,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(222, 50, 45, 0.25)',
              }}
            >
              {publishedStatus ? <Check size={15} /> : <Upload size={15} />}
              {publishedStatus ? 'Published Live!' : 'Publish Live'}
            </button>
          </div>
        </div>

        {/* Global Admin CRM Notification Toast */}
        {toastMessage && (
          <div
            style={{
              padding: '0.65rem 1.4rem',
              backgroundColor: '#111113',
              color: '#FFFFFF',
              fontSize: '0.78rem',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#4ADE80', fontWeight: 700 }}>●</span>
              <span>{toastMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setToastMessage('')}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#A1A1AA',
                cursor: 'pointer',
                fontSize: '0.85rem',
                padding: '0 4px',
              }}
            >
              ✕
            </button>
          </div>
        )}

        {/* Section Navigation Tabs (Horizontal Pill Selector with hidden scrollbar) */}
        <div
          className="admin-tabs-row"
          style={{
            display: 'flex',
            gap: '0.45rem',
            padding: '0.65rem 1rem',
            borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
            backgroundColor: '#FFFFFF',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {sectionTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSectionId === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveSectionId(tab.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '9999px',
                  border: isActive ? '1px solid #111113' : '1px solid rgba(0, 0, 0, 0.08)',
                  backgroundColor: isActive
                    ? '#111113'
                    : tab.isLive === false
                    ? '#F4F4F5'
                    : '#F8F8FA',
                  color: isActive
                    ? '#FFFFFF'
                    : tab.isLive === false
                    ? '#A1A1AA'
                    : '#52525B',
                  fontSize: '0.76rem',
                  fontWeight: isActive ? 600 : 500,
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'all 0.2s ease',
                }}
              >
                <Icon size={13} color={isActive ? '#FFFFFF' : tab.isLive === false ? '#A1A1AA' : '#71717A'} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Scrollable Section Form Content - Prominent, smooth, effortless scroll */}
        <div
          ref={editorScrollRef}
          className="admin-editor-scroll"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.4rem 1.6rem 6rem 1.6rem',
            scrollBehavior: 'smooth',
            overscrollBehavior: 'contain',
          }}
        >
          {/* ════════════════════════════════════════════════════════════
              SECTION 01: HERO
             ════════════════════════════════════════════════════════════ */}
          {activeSectionId === 'hero' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 650, margin: 0, color: '#111113' }}>
                    Hero Banner &amp; Messaging
                  </h3>
                  <p style={{ fontSize: '0.78rem', color: '#71717A', margin: '0.2rem 0 0 0' }}>
                    Manage the creative agency photographic hero banner, typography, and dynamic action buttons.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={toggleHeroSection}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.4rem 0.85rem',
                    borderRadius: '6px',
                    border: '1px solid ' + (homeData.hero?.enabled === false ? '#EF4444' : 'rgba(0,0,0,0.12)'),
                    backgroundColor: homeData.hero?.enabled === false ? '#FEE2E2' : '#ECFDF5',
                    color: homeData.hero?.enabled === false ? '#DC2626' : '#047857',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {homeData.hero?.enabled === false ? <EyeOff size={13} /> : <Eye size={13} />}
                  {homeData.hero?.enabled === false ? 'Hero Section Hidden' : 'Hero Section Active'}
                </button>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>
                    EYEBROW BADGE / TAG
                  </label>
                  <button
                    type="button"
                    onClick={() => updateField(['hero', 'eyebrowEnabled'], homeData.hero?.eyebrowEnabled === false ? true : false)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      border: 'none',
                      backgroundColor: homeData.hero?.eyebrowEnabled === false ? '#FEE2E2' : '#ECFDF5',
                      color: homeData.hero?.eyebrowEnabled === false ? '#DC2626' : '#047857',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {homeData.hero?.eyebrowEnabled === false ? 'Eyebrow Hidden' : 'Eyebrow Visible'}
                  </button>
                </div>
                <input
                  type="text"
                  value={homeData.hero?.badge || ''}
                  onChange={(e) => updateField(['hero', 'badge'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>
                    MAIN HEADLINE (Use Enter for line breaks)
                  </label>
                  <button
                    type="button"
                    onClick={() => updateField(['hero', 'headlineEnabled'], homeData.hero?.headlineEnabled === false ? true : false)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      border: 'none',
                      backgroundColor: homeData.hero?.headlineEnabled === false ? '#FEE2E2' : '#ECFDF5',
                      color: homeData.hero?.headlineEnabled === false ? '#DC2626' : '#047857',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {homeData.hero?.headlineEnabled === false ? 'Headline Hidden' : 'Headline Visible'}
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={homeData.hero?.headline || ''}
                  onChange={(e) => updateField(['hero', 'headline'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>
                    SUBHEADLINE / INTRO STATEMENT
                  </label>
                  <button
                    type="button"
                    onClick={() => updateField(['hero', 'subheadlineEnabled'], homeData.hero?.subheadlineEnabled === false ? true : false)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      border: 'none',
                      backgroundColor: homeData.hero?.subheadlineEnabled === false ? '#FEE2E2' : '#ECFDF5',
                      color: homeData.hero?.subheadlineEnabled === false ? '#DC2626' : '#047857',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {homeData.hero?.subheadlineEnabled === false ? 'Subheadline Hidden' : 'Subheadline Visible'}
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={homeData.hero?.subheadline || ''}
                  onChange={(e) => updateField(['hero', 'subheadline'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              {/* ── Multi-Image Hero Banner Carousel Manager ── */}
              <div
                style={{
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  backgroundColor: '#F8F9FA',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#111113' }}>
                        Hero Banner Carousel (Multi-Image Slides)
                      </span>
                      <span style={{ fontSize: '0.7rem', backgroundColor: '#ECFDF5', color: '#047857', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                        {(homeData.hero?.bannerImages?.length || (homeData.hero?.bannerImage ? 1 : 0))} Slides
                      </span>
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#71717A', marginTop: '0.2rem' }}>
                      Add and reorder multiple images. The hero background will smoothly cycle through them with sleek agency controls.
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                    {/* Banner Clarity selector */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <span style={{ fontSize: '0.72rem', color: '#52525B', fontWeight: 600 }}>Clarity:</span>
                      <select
                        value={homeData.hero?.bannerClarity || 'clear'}
                        onChange={(e) => updateField(['hero', 'bannerClarity'], e.target.value)}
                        style={{
                          padding: '0.3rem 0.5rem',
                          borderRadius: '6px',
                          border: '1px solid rgba(0,0,0,0.15)',
                          backgroundColor: '#FFFFFF',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        <option value="clear">✨ Clear &amp; Bright (Default)</option>
                        <option value="balanced">Balanced Studio</option>
                        <option value="deep">Deep Contrast</option>
                      </select>
                    </div>

                    {/* Autoplay interval selector */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <span style={{ fontSize: '0.72rem', color: '#52525B', fontWeight: 600 }}>Duration:</span>
                      <select
                        value={homeData.hero?.carouselInterval || 5000}
                        onChange={(e) => updateField(['hero', 'carouselInterval'], Number(e.target.value))}
                        style={{
                          padding: '0.3rem 0.5rem',
                          borderRadius: '6px',
                          border: '1px solid rgba(0,0,0,0.15)',
                          backgroundColor: '#FFFFFF',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        <option value={3000}>3 seconds</option>
                        <option value={4000}>4 seconds</option>
                        <option value={5000}>5 seconds (Default)</option>
                        <option value={6000}>6 seconds</option>
                        <option value={8000}>8 seconds</option>
                      </select>
                    </div>

                    {/* Add Slide Button */}
                    <button
                      type="button"
                      onClick={() => {
                        const current = Array.isArray(homeData.hero?.bannerImages) && homeData.hero.bannerImages.length > 0
                          ? [...homeData.hero.bannerImages]
                          : [
                              {
                                id: 'banner-1',
                                image: homeData.hero?.bannerImage || '/images/home/hero-mountain-sky.png',
                                badge: 'STRATEGY · COMMUNICATION · EXECUTION',
                                badgeEnabled: true,
                                headline: 'We build brands,\nbusinesses &\nexperiences.',
                                headlineEnabled: true,
                                subheadline: 'Ārohana brings together business thinking, creative communication and execution across sectors.',
                                subheadlineEnabled: true,
                                clickableUrl: '/work',
                                isImageClickable: true,
                                buttonLabel: 'Explore Our Work',
                                buttonUrl: '/work',
                                buttonEnabled: true,
                                imageEnabled: true,
                                enabled: true,
                              },
                            ];
                        const newBannerNumber = current.length + 1;
                        const newSlide = {
                          id: `banner-${Date.now()}`,
                          image: '/images/services/services-hero-collage.png',
                          caption: 'Creative Direction & Impact',
                          badge: 'STRATEGY · COMMUNICATION · EXECUTION',
                          badgeEnabled: true,
                          headline: 'We build brands,\nbusinesses &\nexperiences.',
                          headlineEnabled: true,
                          subheadline: 'Ārohana brings together business thinking, creative communication and execution across sectors.',
                          subheadlineEnabled: true,
                          clickableUrl: '/work',
                          isImageClickable: true,
                          buttonLabel: 'Explore Capabilities',
                          buttonUrl: '/work',
                          buttonEnabled: true,
                          imageEnabled: true,
                          enabled: true,
                        };
                        const updated = [...current, newSlide];
                        updateField(['hero', 'bannerImages'], updated);
                        setToastMessage(`✓ New Banner #${newBannerNumber} added to Hero Carousel with all fields ready to edit!`);
                        setTimeout(() => setToastMessage(''), 4500);
                      }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        padding: '0.35rem 0.75rem',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: '#111113',
                        color: '#FFFFFF',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      <Plus size={13} /> Add New Banner Slide
                    </button>
                  </div>
                </div>

                {/* Slides List with Full Independent Controls */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {(Array.isArray(homeData.hero?.bannerImages) && homeData.hero.bannerImages.length > 0
                    ? homeData.hero.bannerImages
                    : [
                        {
                          id: 'banner-1',
                          image: homeData.hero?.bannerImage || '/images/home/hero-mountain-sky.png',
                          badge: 'STRATEGY · COMMUNICATION · EXECUTION',
                          headline: 'We build brands,\nbusinesses &\nexperiences.',
                          subheadline: 'Ārohana brings together business thinking, creative communication and execution across sectors.',
                          clickableUrl: '',
                          buttonLabel: 'Explore Our Work',
                          buttonUrl: '/work',
                          buttonEnabled: true,
                          imageEnabled: true,
                          enabled: true,
                        },
                      ]
                  ).map((slide: any, idx: number, arr: any[]) => (
                    <div
                      key={slide.id || idx}
                      style={{
                        padding: '1.1rem',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '12px',
                        border: '1px solid ' + (slide.enabled === false ? 'rgba(239, 68, 68, 0.3)' : 'rgba(0,0,0,0.08)'),
                        opacity: slide.enabled === false ? 0.7 : 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.85rem',
                      }}
                    >
                      {/* Top Bar: Slide Index, Visibility Toggle, Ordering & Delete */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '0.65rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                          <span style={{ fontSize: '0.78rem', fontWeight: 700, backgroundColor: '#111113', color: '#FFFFFF', padding: '2px 8px', borderRadius: '4px' }}>
                            Banner #{idx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const list = [...arr];
                              list[idx] = { ...list[idx], enabled: list[idx].enabled === false ? true : false };
                              updateField(['hero', 'bannerImages'], list);
                            }}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              border: 'none',
                              backgroundColor: slide.enabled === false ? '#FEE2E2' : '#ECFDF5',
                              color: slide.enabled === false ? '#DC2626' : '#047857',
                              fontSize: '0.72rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                            }}
                          >
                            {slide.enabled === false ? <EyeOff size={12} /> : <Eye size={12} />}
                            {slide.enabled === false ? 'Disabled' : 'Active Banner'}
                          </button>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <button
                            type="button"
                            disabled={idx === 0}
                            title="Move banner up"
                            onClick={() => {
                              if (idx === 0) return;
                              const list = [...arr];
                              const temp = list[idx];
                              list[idx] = list[idx - 1];
                              list[idx - 1] = temp;
                              updateField(['hero', 'bannerImages'], list);
                              if (idx === 1) updateField(['hero', 'bannerImage'], list[0]?.image || '');
                            }}
                            style={{
                              border: '1px solid rgba(0,0,0,0.1)',
                              borderRadius: '4px',
                              background: '#F8F8FA',
                              cursor: idx === 0 ? 'not-allowed' : 'pointer',
                              padding: '3px 6px',
                              color: idx === 0 ? '#D4D4D8' : '#52525B',
                            }}
                          >
                            <ChevronUp size={14} />
                          </button>
                          <button
                            type="button"
                            disabled={idx === arr.length - 1}
                            title="Move banner down"
                            onClick={() => {
                              if (idx === arr.length - 1) return;
                              const list = [...arr];
                              const temp = list[idx];
                              list[idx] = list[idx + 1];
                              list[idx + 1] = temp;
                              updateField(['hero', 'bannerImages'], list);
                            }}
                            style={{
                              border: '1px solid rgba(0,0,0,0.1)',
                              borderRadius: '4px',
                              background: '#F8F8FA',
                              cursor: idx === arr.length - 1 ? 'not-allowed' : 'pointer',
                              padding: '3px 6px',
                              color: idx === arr.length - 1 ? '#D4D4D8' : '#52525B',
                            }}
                          >
                            <ChevronDown size={14} />
                          </button>
                          <button
                            type="button"
                            disabled={arr.length <= 1}
                            title="Delete banner"
                            onClick={() => {
                              if (arr.length <= 1) return;
                              const filtered = arr.filter((_: any, i: number) => i !== idx);
                              updateField(['hero', 'bannerImages'], filtered);
                              updateField(['hero', 'bannerImage'], filtered[0]?.image || '');
                            }}
                            style={{
                              border: 'none',
                              background: 'transparent',
                              cursor: arr.length <= 1 ? 'not-allowed' : 'pointer',
                              padding: '3px 6px',
                              color: arr.length <= 1 ? '#D4D4D8' : '#EF4444',
                            }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Eyebrow Badge + Visibility */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.65rem', alignItems: 'flex-end' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, color: '#52525B', marginBottom: '0.2rem' }}>
                            BANNER EYEBROW BADGE
                          </label>
                          <input
                            type="text"
                            value={slide.badge ?? slide.eyebrow ?? ''}
                            placeholder="STRATEGY · COMMUNICATION · EXECUTION"
                            onChange={(e) => {
                              const list = [...arr];
                              list[idx] = { ...list[idx], badge: e.target.value, eyebrow: e.target.value };
                              updateField(['hero', 'bannerImages'], list);
                            }}
                            style={{ ...inputStyle, padding: '0.35rem 0.55rem', fontSize: '0.78rem' }}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const list = [...arr];
                            list[idx] = { ...list[idx], badgeEnabled: list[idx].badgeEnabled === false ? true : false };
                            updateField(['hero', 'bannerImages'], list);
                          }}
                          style={{
                            padding: '0.4rem 0.65rem',
                            borderRadius: '6px',
                            border: '1px solid rgba(0,0,0,0.12)',
                            backgroundColor: slide.badgeEnabled === false ? '#FEE2E2' : '#F4F4F5',
                            color: slide.badgeEnabled === false ? '#DC2626' : '#52525B',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          {slide.badgeEnabled === false ? 'Badge Hidden' : 'Badge Visible'}
                        </button>
                      </div>

                      {/* Main Headline */}
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                          <label style={{ fontSize: '0.7rem', fontWeight: 600, color: '#52525B' }}>
                            MAIN HEADLINE (Enter for line breaks)
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              const list = [...arr];
                              list[idx] = { ...list[idx], headlineEnabled: list[idx].headlineEnabled === false ? true : false };
                              updateField(['hero', 'bannerImages'], list);
                            }}
                            style={{
                              padding: '2px 7px',
                              borderRadius: '4px',
                              border: '1px solid rgba(0,0,0,0.08)',
                              backgroundColor: slide.headlineEnabled === false ? '#FEE2E2' : '#F4F4F5',
                              color: slide.headlineEnabled === false ? '#DC2626' : '#52525B',
                              fontSize: '0.68rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                            }}
                          >
                            {slide.headlineEnabled === false ? 'Headline Hidden' : 'Headline Visible'}
                          </button>
                        </div>
                        <textarea
                          rows={2}
                          value={slide.headline || ''}
                          placeholder="We build brands,\nbusinesses &\nexperiences."
                          onChange={(e) => {
                            const list = [...arr];
                            list[idx] = { ...list[idx], headline: e.target.value };
                            updateField(['hero', 'bannerImages'], list);
                            if (idx === 0) updateField(['hero', 'headline'], e.target.value);
                          }}
                          style={{ ...inputStyle, padding: '0.35rem 0.55rem', fontSize: '0.78rem' }}
                        />
                      </div>

                      {/* Subheadline */}
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                          <label style={{ fontSize: '0.7rem', fontWeight: 600, color: '#52525B' }}>
                            SUBHEADLINE / STATEMENT
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              const list = [...arr];
                              list[idx] = { ...list[idx], subheadlineEnabled: list[idx].subheadlineEnabled === false ? true : false };
                              updateField(['hero', 'bannerImages'], list);
                            }}
                            style={{
                              padding: '2px 7px',
                              borderRadius: '4px',
                              border: '1px solid rgba(0,0,0,0.08)',
                              backgroundColor: slide.subheadlineEnabled === false ? '#FEE2E2' : '#F4F4F5',
                              color: slide.subheadlineEnabled === false ? '#DC2626' : '#52525B',
                              fontSize: '0.68rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                            }}
                          >
                            {slide.subheadlineEnabled === false ? 'Subheadline Hidden' : 'Subheadline Visible'}
                          </button>
                        </div>
                        <textarea
                          rows={2}
                          value={slide.subheadline || ''}
                          placeholder="Ārohana brings together business thinking, creative communication and execution across sectors."
                          onChange={(e) => {
                            const list = [...arr];
                            list[idx] = { ...list[idx], subheadline: e.target.value };
                            updateField(['hero', 'bannerImages'], list);
                            if (idx === 0) updateField(['hero', 'subheadline'], e.target.value);
                          }}
                          style={{ ...inputStyle, padding: '0.35rem 0.55rem', fontSize: '0.78rem' }}
                        />
                      </div>

                      {/* Image Upload, Replace, Enable/Disable, Clickable URL */}
                      <div style={{ display: 'grid', gridTemplateColumns: '70px 1.2fr 1.2fr auto', gap: '0.65rem', alignItems: 'center' }}>
                        <div
                          style={{
                            width: '70px',
                            height: '46px',
                            borderRadius: '6px',
                            overflow: 'hidden',
                            backgroundColor: '#0a0d14',
                            border: '1px solid rgba(0,0,0,0.1)',
                            position: 'relative',
                          }}
                        >
                          {slide.image ? (
                            <img
                              src={slide.image}
                              alt={`Banner ${idx + 1}`}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          ) : (
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#71717A' }}>
                              <ImageIcon size={16} />
                            </div>
                          )}
                        </div>

                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                            <span style={{ fontSize: '0.68rem', color: '#71717A', fontWeight: 600 }}>
                              IMAGE URL / UPLOAD
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                const list = [...arr];
                                list[idx] = { ...list[idx], imageEnabled: list[idx].imageEnabled === false ? true : false };
                                updateField(['hero', 'bannerImages'], list);
                              }}
                              style={{
                                padding: '1px 6px',
                                borderRadius: '3px',
                                border: 'none',
                                backgroundColor: slide.imageEnabled === false ? '#FEE2E2' : '#ECFDF5',
                                color: slide.imageEnabled === false ? '#DC2626' : '#047857',
                                fontSize: '0.66rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                              }}
                            >
                              {slide.imageEnabled === false ? 'Image Hidden' : 'Image Visible'}
                            </button>
                          </div>
                          <div style={{ display: 'flex', gap: '0.35rem' }}>
                            <input
                              type="text"
                              value={slide.image || ''}
                              placeholder="/images/home/hero-mountain-sky.png"
                              onChange={(e) => {
                                const list = [...arr];
                                list[idx] = { ...list[idx], image: e.target.value };
                                updateField(['hero', 'bannerImages'], list);
                                if (idx === 0) updateField(['hero', 'bannerImage'], e.target.value);
                              }}
                              style={{ ...inputStyle, padding: '0.35rem 0.55rem', fontSize: '0.78rem', flex: 1 }}
                            />
                            <button
                              type="button"
                              onClick={() => setHeroSlideIndex(idx)}
                              style={{ ...mediaBtnStyle, padding: '0 0.55rem', fontSize: '0.74rem' }}
                            >
                              <ImageIcon size={13} /> Pick
                            </button>
                          </div>
                        </div>

                        <div>
                          <span style={{ fontSize: '0.68rem', color: '#71717A', display: 'block', marginBottom: '0.2rem', fontWeight: 600 }}>
                            URL LINK
                          </span>
                          <input
                            type="text"
                            value={slide.clickableUrl || ''}
                            placeholder="e.g. /work or https://..."
                            onChange={(e) => {
                              const list = [...arr];
                              list[idx] = { ...list[idx], clickableUrl: e.target.value };
                              updateField(['hero', 'bannerImages'], list);
                            }}
                            style={{ ...inputStyle, padding: '0.35rem 0.55rem', fontSize: '0.78rem' }}
                          />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', paddingTop: '0.9rem' }}>
                          <button
                            type="button"
                            onClick={() => {
                              const list = [...arr];
                              list[idx] = { ...list[idx], isImageClickable: list[idx].isImageClickable === false ? true : false };
                              updateField(['hero', 'bannerImages'], list);
                            }}
                            title="Make image clickable through URL link"
                            style={{
                              padding: '0.35rem 0.65rem',
                              borderRadius: '6px',
                              border: '1px solid rgba(0,0,0,0.12)',
                              backgroundColor: slide.isImageClickable === false ? '#F4F4F5' : '#EFF6FF',
                              color: slide.isImageClickable === false ? '#71717A' : '#1D4ED8',
                              fontSize: '0.72rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {slide.isImageClickable === false ? 'Image Not Clickable' : '✓ Clickable Image'}
                          </button>
                        </div>
                      </div>

                      {/* Button Controls: Label, URL, Enable/Disable */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.2fr auto', gap: '0.65rem', alignItems: 'flex-end', paddingTop: '0.5rem', borderTop: '1px dashed rgba(0,0,0,0.06)' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 600, color: '#52525B', marginBottom: '0.2rem' }}>
                            BUTTON LABEL
                          </label>
                          <input
                            type="text"
                            value={slide.buttonLabel || ''}
                            placeholder="Explore Our Work"
                            onChange={(e) => {
                              const list = [...arr];
                              list[idx] = { ...list[idx], buttonLabel: e.target.value };
                              updateField(['hero', 'bannerImages'], list);
                            }}
                            style={{ ...inputStyle, padding: '0.35rem 0.55rem', fontSize: '0.78rem' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 600, color: '#52525B', marginBottom: '0.2rem' }}>
                            BUTTON URL
                          </label>
                          <input
                            type="text"
                            value={slide.buttonUrl || ''}
                            placeholder="/work"
                            onChange={(e) => {
                              const list = [...arr];
                              list[idx] = { ...list[idx], buttonUrl: e.target.value };
                              updateField(['hero', 'bannerImages'], list);
                            }}
                            style={{ ...inputStyle, padding: '0.35rem 0.55rem', fontSize: '0.78rem' }}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const list = [...arr];
                            list[idx] = { ...list[idx], buttonEnabled: list[idx].buttonEnabled === false ? true : false };
                            updateField(['hero', 'bannerImages'], list);
                          }}
                          style={{
                            padding: '0.4rem 0.65rem',
                            borderRadius: '6px',
                            border: '1px solid rgba(0,0,0,0.12)',
                            backgroundColor: slide.buttonEnabled === false ? '#FEE2E2' : '#F4F4F5',
                            color: slide.buttonEnabled === false ? '#DC2626' : '#52525B',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          {slide.buttonEnabled === false ? 'Button Hidden' : 'Button Enabled'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Banner Video & Floating Showcase Card Controls ── */}
              <div
                style={{
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  backgroundColor: '#F8F9FA',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                }}
              >
                {/* Header with Title and Toggle */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Video size={17} color="#DE322D" />
                      <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#111113' }}>
                        Banner Showcase Video Card
                      </span>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          backgroundColor: homeData.hero?.showVideoCard ? '#ECFDF5' : '#F4F4F5',
                          color: homeData.hero?.showVideoCard ? '#047857' : '#71717A',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontWeight: 600,
                        }}
                      >
                        {homeData.hero?.showVideoCard ? 'Visible on Banner' : 'Removed from Banner'}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#71717A', marginTop: '0.2rem' }}>
                      Option to add, remove, or replace the floating video showcase card and showreel video on the hero banner.
                    </div>
                  </div>

                  {/* Toggle Button */}
                  <button
                    type="button"
                    onClick={() => {
                      const next = !homeData.hero?.showVideoCard;
                      updateField(['hero', 'showVideoCard'], next);
                      if (next && !homeData.hero?.videoCard) {
                        updateField(['hero', 'videoCard'], {
                          enabled: true,
                          videoUrl: '/videos/hero-montage.mp4',
                          posterImage: '/images/case-studies/raysons/neora-1.jpg',
                          badge: 'PRODUCTION · 4K FILM',
                          title: 'Raysons Group · Neora Deck',
                          subtitle: 'Multi-Entity Commercial Film & Social Retainers',
                        });
                      }
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.4rem 0.85rem',
                      borderRadius: '6px',
                      border: '1px solid ' + (homeData.hero?.showVideoCard ? '#EF4444' : '#111113'),
                      backgroundColor: homeData.hero?.showVideoCard ? '#FEF2F2' : '#111113',
                      color: homeData.hero?.showVideoCard ? '#DC2626' : '#FFFFFF',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    {homeData.hero?.showVideoCard ? (
                      <>
                        <EyeOff size={14} /> Remove Video Card from Banner
                      </>
                    ) : (
                      <>
                        <Plus size={14} /> Add Video Card to Banner
                      </>
                    )}
                  </button>
                </div>

                {!homeData.hero?.showVideoCard ? (
                  <div
                    style={{
                      padding: '0.9rem 1.1rem',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '8px',
                      border: '1px dashed rgba(0, 0, 0, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      flexWrap: 'wrap',
                    }}
                  >
                    <div style={{ fontSize: '0.78rem', color: '#52525B' }}>
                      <strong>Video Card is currently hidden.</strong> The hero banner displays the full-width photographic carousel banner and editorial statement without video overlay clutter.
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        updateField(['hero', 'showVideoCard'], true);
                        if (!homeData.hero?.videoCard) {
                          updateField(['hero', 'videoCard'], {
                            enabled: true,
                            videoUrl: '/videos/hero-montage.mp4',
                            posterImage: '/images/case-studies/raysons/neora-1.jpg',
                            badge: 'PRODUCTION · 4K FILM',
                            title: 'Raysons Group · Neora Deck',
                            subtitle: 'Multi-Entity Commercial Film & Social Retainers',
                          });
                        }
                      }}
                      style={{
                        padding: '0.35rem 0.75rem',
                        borderRadius: '6px',
                        backgroundColor: '#111113',
                        color: '#FFFFFF',
                        border: 'none',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Enable Video Card
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', backgroundColor: '#FFFFFF', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.08)' }}>
                    {/* Video URL with Replace and Remove buttons */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.73rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                        SHOWREEL VIDEO URL / FILE (Plays in Modal on Click)
                      </label>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <input
                          type="text"
                          value={homeData.hero?.videoCard?.videoUrl || ''}
                          onChange={(e) => updateField(['hero', 'videoCard', 'videoUrl'], e.target.value)}
                          style={{ ...inputStyle, flex: 1, minWidth: '200px' }}
                          placeholder="/videos/hero-montage.mp4"
                        />
                        <button
                          type="button"
                          onClick={() => setMediaPickerTarget({ path: 'hero.videoCard.videoUrl', type: 'video' })}
                          style={mediaBtnStyle}
                        >
                          <Video size={13} /> {homeData.hero?.videoCard?.videoUrl ? 'Replace Video' : 'Pick Video'}
                        </button>
                        {homeData.hero?.videoCard?.videoUrl && (
                          <button
                            type="button"
                            onClick={() => updateField(['hero', 'videoCard', 'videoUrl'], '')}
                            style={{
                              padding: '0 0.65rem',
                              borderRadius: '8px',
                              backgroundColor: '#FEE2E2',
                              color: '#DC2626',
                              border: 'none',
                              fontSize: '0.74rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                            }}
                          >
                            Remove Video
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Video Poster Image & Meta */}
                    <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '1rem', alignItems: 'center' }}>
                      <div
                        style={{
                          width: '80px',
                          height: '56px',
                          borderRadius: '6px',
                          overflow: 'hidden',
                          backgroundColor: '#0a0d14',
                          border: '1px solid rgba(0,0,0,0.1)',
                          position: 'relative',
                        }}
                      >
                        {homeData.hero?.videoCard?.posterImage ? (
                          <img
                            src={homeData.hero?.videoCard?.posterImage}
                            alt="Video Poster Preview"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#71717A' }}>
                            <ImageIcon size={18} />
                          </div>
                        )}
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        <label style={{ fontSize: '0.73rem', fontWeight: 600, color: '#52525B' }}>
                          VIDEO CARD POSTER / THUMBNAIL
                        </label>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <input
                            type="text"
                            value={homeData.hero?.videoCard?.posterImage || ''}
                            onChange={(e) => updateField(['hero', 'videoCard', 'posterImage'], e.target.value)}
                            style={{ ...inputStyle, flex: 1 }}
                            placeholder="/images/case-studies/raysons/neora-1.jpg"
                          />
                          <button
                            type="button"
                            onClick={() => setMediaPickerTarget({ path: 'hero.videoCard.posterImage', type: 'image' })}
                            style={mediaBtnStyle}
                          >
                            <ImageIcon size={13} /> Pick Poster
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Card Title & Badge */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.73rem', fontWeight: 600, color: '#52525B', marginBottom: '0.3rem' }}>
                          BADGE LABEL
                        </label>
                        <input
                          type="text"
                          value={homeData.hero?.videoCard?.badge || 'PRODUCTION · 4K FILM'}
                          onChange={(e) => updateField(['hero', 'videoCard', 'badge'], e.target.value)}
                          style={inputStyle}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.73rem', fontWeight: 600, color: '#52525B', marginBottom: '0.3rem' }}>
                          CARD TITLE
                        </label>
                        <input
                          type="text"
                          value={homeData.hero?.videoCard?.title || 'Raysons Group · Neora Deck'}
                          onChange={(e) => updateField(['hero', 'videoCard', 'title'], e.target.value)}
                          style={inputStyle}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.73rem', fontWeight: 600, color: '#52525B', marginBottom: '0.3rem' }}>
                        CARD SUBTITLE / CONTEXT
                      </label>
                      <input
                        type="text"
                        value={homeData.hero?.videoCard?.subtitle || 'Multi-Entity Commercial Film & Social Retainers'}
                        onChange={(e) => updateField(['hero', 'videoCard', 'subtitle'], e.target.value)}
                        style={inputStyle}
                      />
                    </div>
                  </div>
                )}

                {/* ── Background Looping Banner Video (Optional Full Canvas Override) ── */}
                <div
                  style={{
                    borderTop: '1px solid rgba(0, 0, 0, 0.08)',
                    paddingTop: '0.9rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>
                      BACKGROUND LOOPING BANNER VIDEO (Overrides Carousel when set)
                    </label>
                    {homeData.hero?.videoUrl && (
                      <span style={{ fontSize: '0.68rem', backgroundColor: '#FEF3C7', color: '#B45309', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>
                        Active Background Video
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="text"
                      value={homeData.hero?.videoUrl || ''}
                      onChange={(e) => updateField(['hero', 'videoUrl'], e.target.value)}
                      style={{ ...inputStyle, flex: 1 }}
                      placeholder="e.g. /videos/banner-loop.mp4 (Leave empty to use multi-image carousel)"
                    />
                    <button
                      type="button"
                      onClick={() => setMediaPickerTarget({ path: 'hero.videoUrl', type: 'video' })}
                      style={mediaBtnStyle}
                    >
                      <Video size={13} /> {homeData.hero?.videoUrl ? 'Replace Video' : 'Pick Video'}
                    </button>
                    {homeData.hero?.videoUrl && (
                      <button
                        type="button"
                        onClick={() => updateField(['hero', 'videoUrl'], '')}
                        style={{
                          padding: '0 0.75rem',
                          borderRadius: '8px',
                          backgroundColor: '#FEE2E2',
                          color: '#DC2626',
                          border: 'none',
                          fontSize: '0.74rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        Remove Video
                      </button>
                    )}
                  </div>
                  <div style={{ fontSize: '0.71rem', color: '#71717A' }}>
                    Leave this empty to enjoy the multi-image carousel. If a video URL is provided, it plays as the banner background.
                  </div>
                </div>
              </div>

              {/* ── Dynamic Action Buttons Manager ── */}
              <div
                style={{
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  borderRadius: '10px',
                  padding: '1.15rem',
                  backgroundColor: '#FAFAFB',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 650, color: '#111113' }}>
                      Hero Action Buttons &amp; Redirect Links
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#71717A' }}>
                      Add, reorder, or edit redirect links and buttons on the hero section.
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const currentButtons = Array.isArray(homeData.hero?.buttons) && homeData.hero.buttons.length > 0
                        ? homeData.hero.buttons
                        : [
                            { id: '1', label: homeData.hero?.ctaLabel || 'Explore Our Work', url: homeData.hero?.ctaLink || '/work', variant: 'primary' },
                          ];
                      const newBtn = {
                        id: `btn-${Date.now()}`,
                        label: 'New Button',
                        url: '/contact',
                        variant: 'secondary',
                      };
                      updateField(['hero', 'buttons'], [...currentButtons, newBtn]);
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '6px',
                      border: '1px solid rgba(0,0,0,0.12)',
                      backgroundColor: '#FFFFFF',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      color: '#111113',
                    }}
                  >
                    <Plus size={13} /> Add Button
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {(Array.isArray(homeData.hero?.buttons) && homeData.hero.buttons.length > 0
                    ? homeData.hero.buttons
                    : [
                        { id: '1', label: homeData.hero?.ctaLabel || 'Explore Our Work', url: homeData.hero?.ctaLink || '/work', variant: 'primary' },
                      ]
                  ).map((btn: any, idx: number) => (
                    <div
                      key={btn.id || idx}
                      style={{
                        padding: '0.85rem',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '8px',
                        border: '1px solid rgba(0,0,0,0.06)',
                        display: 'grid',
                        gridTemplateColumns: '1.2fr 1.6fr 1fr auto',
                        gap: '0.5rem',
                        alignItems: 'center',
                      }}
                    >
                      <div>
                        <span style={{ fontSize: '0.68rem', color: '#71717A', display: 'block', marginBottom: '0.2rem' }}>
                          Button Label
                        </span>
                        <input
                          type="text"
                          value={btn.label || ''}
                          onChange={(e) => {
                            const list = [
                              ...(Array.isArray(homeData.hero?.buttons) && homeData.hero.buttons.length > 0
                                ? homeData.hero.buttons
                                : [
                                    { id: '1', label: homeData.hero?.ctaLabel || 'Explore Our Work', url: homeData.hero?.ctaLink || '/work', variant: 'primary' },
                                    { id: '2', label: homeData.hero?.secondaryCtaLabel || 'What We Do', url: homeData.hero?.secondaryCtaLink || '/services', variant: 'secondary' },
                                  ]),
                            ];
                            list[idx] = { ...list[idx], label: e.target.value };
                            updateField(['hero', 'buttons'], list);
                            if (idx === 0) updateField(['hero', 'ctaLabel'], e.target.value);
                            if (idx === 1) updateField(['hero', 'secondaryCtaLabel'], e.target.value);
                          }}
                          style={{ ...inputStyle, padding: '0.35rem 0.55rem', fontSize: '0.78rem' }}
                        />
                      </div>

                      <div>
                        <span style={{ fontSize: '0.68rem', color: '#71717A', display: 'block', marginBottom: '0.2rem' }}>
                          Redirect Link / URL
                        </span>
                        <input
                          type="text"
                          value={btn.url || ''}
                          onChange={(e) => {
                            const list = [
                              ...(Array.isArray(homeData.hero?.buttons) && homeData.hero.buttons.length > 0
                                ? homeData.hero.buttons
                                : [
                                    { id: '1', label: homeData.hero?.ctaLabel || 'Explore Our Work', url: homeData.hero?.ctaLink || '/work', variant: 'primary' },
                                    { id: '2', label: homeData.hero?.secondaryCtaLabel || 'What We Do', url: homeData.hero?.secondaryCtaLink || '/services', variant: 'secondary' },
                                  ]),
                            ];
                            list[idx] = { ...list[idx], url: e.target.value };
                            updateField(['hero', 'buttons'], list);
                            if (idx === 0) updateField(['hero', 'ctaLink'], e.target.value);
                            if (idx === 1) updateField(['hero', 'secondaryCtaLink'], e.target.value);
                          }}
                          style={{ ...inputStyle, padding: '0.35rem 0.55rem', fontSize: '0.78rem' }}
                        />
                      </div>

                      <div>
                        <span style={{ fontSize: '0.68rem', color: '#71717A', display: 'block', marginBottom: '0.2rem' }}>
                          Button Style
                        </span>
                        <select
                          value={btn.variant || 'primary'}
                          onChange={(e) => {
                            const list = [
                              ...(Array.isArray(homeData.hero?.buttons) && homeData.hero.buttons.length > 0
                                ? homeData.hero.buttons
                                : [
                                    { id: '1', label: homeData.hero?.ctaLabel || 'Explore Our Work', url: homeData.hero?.ctaLink || '/work', variant: 'primary' },
                                    { id: '2', label: homeData.hero?.secondaryCtaLabel || 'What We Do', url: homeData.hero?.secondaryCtaLink || '/services', variant: 'secondary' },
                                  ]),
                            ];
                            list[idx] = { ...list[idx], variant: e.target.value };
                            updateField(['hero', 'buttons'], list);
                          }}
                          style={{
                            ...inputStyle,
                            padding: '0.35rem 0.55rem',
                            fontSize: '0.78rem',
                            backgroundColor: '#FFFFFF',
                            cursor: 'pointer',
                          }}
                        >
                          <option value="primary">Primary (Red)</option>
                          <option value="secondary">Secondary (Dark)</option>
                          <option value="showreel">Watch Showreel</option>
                        </select>
                      </div>

                      <div style={{ paddingTop: '1rem' }}>
                        <button
                          type="button"
                          onClick={() => {
                            const list = [
                              ...(Array.isArray(homeData.hero?.buttons) && homeData.hero.buttons.length > 0
                                ? homeData.hero.buttons
                                : [
                                    { id: '1', label: homeData.hero?.ctaLabel || 'Explore Our Work', url: homeData.hero?.ctaLink || '/work', variant: 'primary' },
                                    { id: '2', label: homeData.hero?.secondaryCtaLabel || 'What We Do', url: homeData.hero?.secondaryCtaLink || '/services', variant: 'secondary' },
                                  ]),
                            ];
                            const filtered = list.filter((_: any, i: number) => i !== idx);
                            updateField(['hero', 'buttons'], filtered);
                          }}
                          style={{
                            border: 'none',
                            backgroundColor: 'transparent',
                            color: '#EF4444',
                            cursor: 'pointer',
                            padding: '0.35rem',
                          }}
                          title="Delete button"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════
              SECTION 06: SELECTED BRANDS & ORGANISATIONS MARQUEE
             ════════════════════════════════════════════════════════════ */}
          {activeSectionId === 'brands' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 650, margin: 0, color: '#111113' }}>
                      06 Selected Brands &amp; Organisations Marquee
                    </h3>
                    <span style={{ fontSize: '0.7rem', backgroundColor: '#F0FDF4', color: '#16A34A', padding: '2px 7px', borderRadius: '4px', fontWeight: 600 }}>
                      Live Flow
                    </span>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: '#71717A', margin: '0.2rem 0 0 0' }}>
                    Configure client logos, names, fallback monograms, and links. Positioned right above the Signature CTA.
                  </p>
                </div>

                {/* Section Level Enable/Disable Toggle */}
                <button
                  type="button"
                  onClick={toggleBrandsSection}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.4rem 0.85rem',
                    borderRadius: '6px',
                    border: '1px solid ' + (homeData.brands?.enabled === false ? '#EF4444' : 'rgba(0,0,0,0.12)'),
                    backgroundColor: homeData.brands?.enabled === false ? '#FEE2E2' : '#ECFDF5',
                    color: homeData.brands?.enabled === false ? '#DC2626' : '#047857',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {homeData.brands?.enabled === false ? <EyeOff size={13} /> : <Eye size={13} />}
                  {homeData.brands?.enabled === false ? 'Section Hidden' : 'Section Active'}
                </button>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>
                    SECTION EYEBROW
                  </label>
                  <button
                    type="button"
                    onClick={() => updateField(['brands', 'eyebrowEnabled'], homeData.brands?.eyebrowEnabled === false ? true : false)}
                    style={{
                      padding: '2px 8px',
                      borderRadius: '4px',
                      border: 'none',
                      backgroundColor: homeData.brands?.eyebrowEnabled === false ? '#FEE2E2' : '#ECFDF5',
                      color: homeData.brands?.eyebrowEnabled === false ? '#DC2626' : '#047857',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {homeData.brands?.eyebrowEnabled === false ? 'Eyebrow Hidden' : 'Eyebrow Visible'}
                  </button>
                </div>
                <input
                  type="text"
                  value={homeData.brands?.eyebrow || ''}
                  onChange={(e) => updateField(['brands', 'eyebrow'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>
                    SECTION HEADING
                  </label>
                  <button
                    type="button"
                    onClick={() => updateField(['brands', 'headingEnabled'], homeData.brands?.headingEnabled === false ? true : false)}
                    style={{
                      padding: '2px 8px',
                      borderRadius: '4px',
                      border: 'none',
                      backgroundColor: homeData.brands?.headingEnabled === false ? '#FEE2E2' : '#ECFDF5',
                      color: homeData.brands?.headingEnabled === false ? '#DC2626' : '#047857',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {homeData.brands?.headingEnabled === false ? 'Heading Hidden' : 'Heading Visible'}
                  </button>
                </div>
                <input
                  type="text"
                  value={homeData.brands?.heading || ''}
                  onChange={(e) => updateField(['brands', 'heading'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>
                    PARTNER BRANDS LIST ({homeData.brands?.list?.length || 0})
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const newList = [...(homeData.brands?.list || [])];
                      newList.push({
                        id: `brand-${Date.now()}`,
                        name: 'New Partner Brand',
                        monogram: 'NP',
                        badgeBg: '#111113',
                        badgeColor: '#ffffff',
                        link: '/work',
                        enabled: true,
                        nameEnabled: true,
                        monogramEnabled: true,
                        linkEnabled: true,
                        logoEnabled: true,
                      });
                      updateField(['brands', 'list'], newList);
                      setToastMessage(`✓ New Partner Brand #${newList.length} added successfully!`);
                      setTimeout(() => setToastMessage(''), 4000);
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.3rem 0.75rem',
                      borderRadius: '6px',
                      backgroundColor: '#111113',
                      color: '#ffffff',
                      border: 'none',
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    <Plus size={13} /> Add Brand
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {(homeData.brands?.list || []).map((brand: any, idx: number, arr: any[]) => (
                    <div
                      key={brand.id || idx}
                      style={{
                        padding: '1rem',
                        borderRadius: '12px',
                        border: '1px solid ' + (brand.enabled === false ? 'rgba(239, 68, 68, 0.3)' : 'rgba(0,0,0,0.08)'),
                        backgroundColor: brand.enabled === false ? '#FFF5F5' : '#F8F8FA',
                        opacity: brand.enabled === false ? 0.75 : 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.85rem',
                      }}
                    >
                      {/* Top Bar: Brand Index, Visibility Toggle, Ordering & Delete */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, backgroundColor: '#111113', color: '#FFFFFF', padding: '2px 8px', borderRadius: '4px' }}>
                            Brand #{idx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const list = [...arr];
                              list[idx] = { ...list[idx], enabled: list[idx].enabled === false ? true : false };
                              updateField(['brands', 'list'], list);
                            }}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              border: 'none',
                              backgroundColor: brand.enabled === false ? '#FEE2E2' : '#ECFDF5',
                              color: brand.enabled === false ? '#DC2626' : '#047857',
                              fontSize: '0.7rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                            }}
                          >
                            {brand.enabled === false ? <EyeOff size={11} /> : <Eye size={11} />}
                            {brand.enabled === false ? 'Brand Disabled' : 'Brand Active'}
                          </button>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <button
                            type="button"
                            disabled={idx === 0}
                            title="Move brand up"
                            onClick={() => {
                              if (idx === 0) return;
                              const list = [...arr];
                              const temp = list[idx];
                              list[idx] = list[idx - 1];
                              list[idx - 1] = temp;
                              updateField(['brands', 'list'], list);
                            }}
                            style={{
                              border: '1px solid rgba(0,0,0,0.1)',
                              borderRadius: '4px',
                              background: '#FFFFFF',
                              cursor: idx === 0 ? 'not-allowed' : 'pointer',
                              padding: '2px 6px',
                              color: idx === 0 ? '#D4D4D8' : '#52525B',
                            }}
                          >
                            <ChevronUp size={13} />
                          </button>
                          <button
                            type="button"
                            disabled={idx === arr.length - 1}
                            title="Move brand down"
                            onClick={() => {
                              if (idx === arr.length - 1) return;
                              const list = [...arr];
                              const temp = list[idx];
                              list[idx] = list[idx + 1];
                              list[idx + 1] = temp;
                              updateField(['brands', 'list'], list);
                            }}
                            style={{
                              border: '1px solid rgba(0,0,0,0.1)',
                              borderRadius: '4px',
                              background: '#FFFFFF',
                              cursor: idx === arr.length - 1 ? 'not-allowed' : 'pointer',
                              padding: '2px 6px',
                              color: idx === arr.length - 1 ? '#D4D4D8' : '#52525B',
                            }}
                          >
                            <ChevronDown size={13} />
                          </button>
                          <button
                            type="button"
                            title="Delete brand"
                            onClick={() => {
                              const brandName = brand.name || `Brand #${idx + 1}`;
                              const updated = homeData.brands.list.filter((_: any, i: number) => i !== idx);
                              updateField(['brands', 'list'], updated);
                              setToastMessage(`✓ "${brandName}" deleted successfully`);
                              setTimeout(() => setToastMessage(''), 4000);
                            }}
                            style={{
                              border: 'none',
                              backgroundColor: 'transparent',
                              color: '#EF4444',
                              cursor: 'pointer',
                              padding: '2px 6px',
                            }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Fields Row: Name, Monogram, Link */}
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1.2fr 0.8fr 1fr',
                          gap: '0.65rem',
                          alignItems: 'flex-start',
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                            <span style={{ fontSize: '0.68rem', fontWeight: 600, color: '#71717A' }}>
                              BRAND NAME
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                const list = [...arr];
                                list[idx] = { ...list[idx], nameEnabled: list[idx].nameEnabled === false ? true : false };
                                updateField(['brands', 'list'], list);
                              }}
                              style={{
                                padding: '1px 6px',
                                borderRadius: '3px',
                                border: 'none',
                                backgroundColor: brand.nameEnabled === false ? '#FEE2E2' : '#ECFDF5',
                                color: brand.nameEnabled === false ? '#DC2626' : '#047857',
                                fontSize: '0.66rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                              }}
                            >
                              {brand.nameEnabled === false ? 'Hidden' : 'Visible'}
                            </button>
                          </div>
                          <input
                            type="text"
                            value={brand.name || ''}
                            placeholder="e.g. Raysons Group"
                            onChange={(e) => {
                              const updated = [...homeData.brands.list];
                              updated[idx] = { ...updated[idx], name: e.target.value };
                              updateField(['brands', 'list'], updated);
                            }}
                            style={{ ...inputStyle, padding: '0.4rem 0.65rem', fontSize: '0.82rem' }}
                          />
                        </div>

                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                            <span style={{ fontSize: '0.68rem', fontWeight: 600, color: '#71717A' }}>
                              MONOGRAM (FALLBACK)
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                const list = [...arr];
                                list[idx] = { ...list[idx], monogramEnabled: list[idx].monogramEnabled === false ? true : false };
                                updateField(['brands', 'list'], list);
                              }}
                              style={{
                                padding: '1px 6px',
                                borderRadius: '3px',
                                border: 'none',
                                backgroundColor: brand.monogramEnabled === false ? '#FEE2E2' : '#ECFDF5',
                                color: brand.monogramEnabled === false ? '#DC2626' : '#047857',
                                fontSize: '0.66rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                              }}
                            >
                              {brand.monogramEnabled === false ? 'Hidden' : 'Visible'}
                            </button>
                          </div>
                          <input
                            type="text"
                            value={brand.monogram || ''}
                            placeholder="e.g. RG"
                            onChange={(e) => {
                              const updated = [...homeData.brands.list];
                              updated[idx] = { ...updated[idx], monogram: e.target.value };
                              updateField(['brands', 'list'], updated);
                            }}
                            style={{ ...inputStyle, padding: '0.4rem 0.65rem', fontSize: '0.82rem' }}
                          />
                        </div>

                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                            <span style={{ fontSize: '0.68rem', fontWeight: 600, color: '#71717A' }}>
                              TARGET LINK
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                const list = [...arr];
                                list[idx] = { ...list[idx], linkEnabled: list[idx].linkEnabled === false ? true : false };
                                updateField(['brands', 'list'], list);
                              }}
                              style={{
                                padding: '1px 6px',
                                borderRadius: '3px',
                                border: 'none',
                                backgroundColor: brand.linkEnabled === false ? '#FEE2E2' : '#ECFDF5',
                                color: brand.linkEnabled === false ? '#DC2626' : '#047857',
                                fontSize: '0.66rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                              }}
                            >
                              {brand.linkEnabled === false ? 'Hidden' : 'Visible'}
                            </button>
                          </div>
                          <input
                            type="text"
                            value={brand.link || ''}
                            placeholder="e.g. /work"
                            onChange={(e) => {
                              const updated = [...homeData.brands.list];
                              updated[idx] = { ...updated[idx], link: e.target.value };
                              updateField(['brands', 'list'], updated);
                            }}
                            style={{ ...inputStyle, padding: '0.4rem 0.65rem', fontSize: '0.82rem' }}
                          />
                        </div>
                      </div>

                      {/* Bottom Row: Logo option (with preview and fallback indicator) */}
                      <div
                        style={{
                          paddingTop: '0.75rem',
                          borderTop: '1px dashed rgba(0, 0, 0, 0.08)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          flexWrap: 'wrap',
                        }}
                      >
                        {/* Preview Box: shows logo if present, else monogram badge */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                          <div
                            style={{
                              width: '44px',
                              height: '44px',
                              borderRadius: '8px',
                              background: brand.badgeBg || '#111113',
                              color: brand.badgeColor || '#ffffff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontFamily: 'var(--font-display, sans-serif)',
                              fontWeight: 700,
                              fontSize: (brand.monogram || '').length > 3 ? '0.7rem' : '0.85rem',
                              position: 'relative',
                              overflow: 'hidden',
                              border: '1px solid rgba(0, 0, 0, 0.1)',
                              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
                              flexShrink: 0,
                            }}
                          >
                            {brand.logo ? (
                              <img
                                src={brand.logo}
                                alt={brand.name || 'Logo'}
                                style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }}
                              />
                            ) : (
                              brand.monogram || '?'
                            )}
                          </div>
                          <div>
                            <div style={{ fontSize: '0.74rem', fontWeight: 600, color: brand.logo ? '#16A34A' : '#71717A' }}>
                              {brand.logo ? '✓ Logo Active' : '● Using Monogram'}
                            </div>
                            <div style={{ fontSize: '0.68rem', color: '#A1A1AA' }}>
                              {brand.logo ? 'Displayed in marquee' : 'Upload logo or keep monogram'}
                            </div>
                          </div>
                        </div>

                        {/* Logo URL Input & Actions with Toggle */}
                        <div style={{ flex: 1, minWidth: '220px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <input
                            type="text"
                            placeholder="Logo URL or pick file..."
                            value={brand.logo || ''}
                            onChange={(e) => {
                              const updated = [...homeData.brands.list];
                              updated[idx] = { ...updated[idx], logo: e.target.value };
                              updateField(['brands', 'list'], updated);
                            }}
                            style={{ ...inputStyle, padding: '0.4rem 0.65rem', fontSize: '0.78rem' }}
                          />
                          <button
                            type="button"
                            onClick={() => setBrandLogoIndex(idx)}
                            style={{
                              ...mediaBtnStyle,
                              padding: '0.4rem 0.75rem',
                              fontSize: '0.74rem',
                              height: '32px',
                            }}
                          >
                            <Upload size={12} /> Upload
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const list = [...arr];
                              list[idx] = { ...list[idx], logoEnabled: list[idx].logoEnabled === false ? true : false };
                              updateField(['brands', 'list'], list);
                            }}
                            style={{
                              padding: '0 0.65rem',
                              borderRadius: '6px',
                              border: 'none',
                              backgroundColor: brand.logoEnabled === false ? '#FEE2E2' : '#ECFDF5',
                              color: brand.logoEnabled === false ? '#DC2626' : '#047857',
                              fontSize: '0.7rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              height: '32px',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {brand.logoEnabled === false ? 'Logo Hidden' : 'Logo Visible'}
                          </button>
                          {brand.logo && (
                            <button
                              type="button"
                              title="Remove logo (use monogram)"
                              onClick={() => {
                                const updated = [...homeData.brands.list];
                                const { logo, ...rest } = updated[idx];
                                updated[idx] = rest;
                                updateField(['brands', 'list'], updated);
                                setToastMessage(`✓ Removed logo for "${brand.name || 'brand'}", now using monogram.`);
                                setTimeout(() => setToastMessage(''), 3500);
                              }}
                              style={{
                                padding: '0.4rem 0.65rem',
                                borderRadius: '8px',
                                border: '1px solid rgba(239, 68, 68, 0.2)',
                                backgroundColor: '#FEF2F2',
                                color: '#EF4444',
                                fontSize: '0.74rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                height: '32px',
                              }}
                            >
                              Use Monogram
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}


          {/* ════════════════════════════════════════════════════════════
              SECTION 02: INDIAN ARMY SPOTLIGHT
             ════════════════════════════════════════════════════════════ */}
          {activeSectionId === 'army' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 650, margin: 0, color: '#111113' }}>
                      06 Indian Army Projects Spotlight
                    </h3>
                    <span style={{ fontSize: '0.7rem', backgroundColor: '#F0FDF4', color: '#16A34A', padding: '2px 7px', borderRadius: '4px', fontWeight: 600 }}>
                      Live Flow
                    </span>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: '#71717A', margin: '0.2rem 0 0 0' }}>
                    Showcase of defence briefs, authentic imagery and verified credentials in clean editorial presentation.
                  </p>
                </div>

                {/* Section Level Enable / Disable Toggle */}
                <button
                  type="button"
                  onClick={toggleArmySection}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '0.4rem 0.85rem',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: homeData.armySpotlight?.enabled === false ? '#FEE2E2' : '#ECFDF5',
                    color: homeData.armySpotlight?.enabled === false ? '#DC2626' : '#047857',
                    fontSize: '0.76rem',
                    fontWeight: 650,
                    cursor: 'pointer',
                  }}
                >
                  {homeData.armySpotlight?.enabled === false ? <EyeOff size={14} /> : <Eye size={14} />}
                  {homeData.armySpotlight?.enabled === false ? 'Section Hidden' : 'Section Active'}
                </button>
              </div>

              {/* Eyebrow with Enable/Disable */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>
                    EYEBROW TAG
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const cur = homeData.armySpotlight?.showEyebrow !== false;
                      updateField(['armySpotlight', 'showEyebrow'], !cur);
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '2px 7px',
                      borderRadius: '4px',
                      border: 'none',
                      backgroundColor: homeData.armySpotlight?.showEyebrow === false ? '#FEE2E2' : '#ECFDF5',
                      color: homeData.armySpotlight?.showEyebrow === false ? '#DC2626' : '#047857',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {homeData.armySpotlight?.showEyebrow === false ? <EyeOff size={11} /> : <Eye size={11} />}
                    {homeData.armySpotlight?.showEyebrow === false ? 'Eyebrow Hidden' : 'Eyebrow Visible'}
                  </button>
                </div>
                <input
                  type="text"
                  value={homeData.armySpotlight?.eyebrow || ''}
                  onChange={(e) => updateField(['armySpotlight', 'eyebrow'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              {/* Headline with Enable/Disable */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>
                    HEADLINE
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const cur = homeData.armySpotlight?.showHeadline !== false;
                      updateField(['armySpotlight', 'showHeadline'], !cur);
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '2px 7px',
                      borderRadius: '4px',
                      border: 'none',
                      backgroundColor: homeData.armySpotlight?.showHeadline === false ? '#FEE2E2' : '#ECFDF5',
                      color: homeData.armySpotlight?.showHeadline === false ? '#DC2626' : '#047857',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {homeData.armySpotlight?.showHeadline === false ? <EyeOff size={11} /> : <Eye size={11} />}
                    {homeData.armySpotlight?.showHeadline === false ? 'Headline Hidden' : 'Headline Visible'}
                  </button>
                </div>
                <input
                  type="text"
                  value={homeData.armySpotlight?.title || ''}
                  onChange={(e) => updateField(['armySpotlight', 'title'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              {/* Description with Enable/Disable */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>
                    DESCRIPTION
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const cur = homeData.armySpotlight?.showDescription !== false;
                      updateField(['armySpotlight', 'showDescription'], !cur);
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '2px 7px',
                      borderRadius: '4px',
                      border: 'none',
                      backgroundColor: homeData.armySpotlight?.showDescription === false ? '#FEE2E2' : '#ECFDF5',
                      color: homeData.armySpotlight?.showDescription === false ? '#DC2626' : '#047857',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {homeData.armySpotlight?.showDescription === false ? <EyeOff size={11} /> : <Eye size={11} />}
                    {homeData.armySpotlight?.showDescription === false ? 'Description Hidden' : 'Description Visible'}
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={homeData.armySpotlight?.description || ''}
                  onChange={(e) => updateField(['armySpotlight', 'description'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              {/* Army Carousel Cards with Add, Reorder, Enable/Disable, and Delete */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B', margin: 0 }}>
                    ARMY CAROUSEL CARDS ({homeData.armySpotlight?.cards?.length || 0})
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const cards = [...(homeData.armySpotlight?.cards || [])];
                      cards.push({
                        id: `army-card-${Date.now()}`,
                        category: 'Defence Brief',
                        title: 'New Army Project',
                        location: 'NORTHERN SECTOR',
                        image: '/images/army/western-command-1.jpg',
                        enabled: true,
                        showCategory: true,
                        showTitle: true,
                        showLocation: true,
                        showImage: true,
                      });
                      updateField(['armySpotlight', 'cards'], cards);
                      setToastMessage('✓ New Army Project Card added successfully!');
                      setTimeout(() => setToastMessage(''), 3500);
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: '#111113',
                      color: '#FFFFFF',
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    <Plus size={13} /> Add Card
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {(homeData.armySpotlight?.cards || []).map((card: any, idx: number) => (
                    <div
                      key={card.id || idx}
                      style={{
                        padding: '0.85rem',
                        borderRadius: '10px',
                        border: '1px solid ' + (card.enabled === false ? 'rgba(239, 68, 68, 0.3)' : 'rgba(0,0,0,0.08)'),
                        backgroundColor: '#F8F8FA',
                        opacity: card.enabled === false ? 0.7 : 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.65rem',
                      }}
                    >
                      {/* Card Header with Enable/Disable, Move, and Delete */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '0.45rem' }}>
                        <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#111113' }}>
                          Card #{idx + 1}: {card.title || 'Untitled Card'}
                        </span>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          {/* Card Enable/Disable */}
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...homeData.armySpotlight.cards];
                              updated[idx] = { ...updated[idx], enabled: updated[idx].enabled === false ? true : false };
                              updateField(['armySpotlight', 'cards'], updated);
                              setToastMessage(updated[idx].enabled ? `✓ Card #${idx + 1} enabled` : `✕ Card #${idx + 1} disabled`);
                              setTimeout(() => setToastMessage(''), 3000);
                            }}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '3px',
                              padding: '2px 7px',
                              borderRadius: '4px',
                              border: 'none',
                              backgroundColor: card.enabled === false ? '#FEE2E2' : '#ECFDF5',
                              color: card.enabled === false ? '#DC2626' : '#047857',
                              fontSize: '0.7rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                            }}
                          >
                            {card.enabled === false ? <EyeOff size={11} /> : <Eye size={11} />}
                            {card.enabled === false ? 'Disabled' : 'Enabled'}
                          </button>

                          {/* Move Up */}
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => {
                              if (idx === 0) return;
                              const updated = [...homeData.armySpotlight.cards];
                              const temp = updated[idx];
                              updated[idx] = updated[idx - 1];
                              updated[idx - 1] = temp;
                              updateField(['armySpotlight', 'cards'], updated);
                            }}
                            style={{
                              border: '1px solid rgba(0,0,0,0.1)',
                              background: '#FFFFFF',
                              borderRadius: '4px',
                              padding: '2px 5px',
                              cursor: idx === 0 ? 'not-allowed' : 'pointer',
                              color: idx === 0 ? '#D4D4D8' : '#52525B',
                            }}
                          >
                            <ChevronUp size={13} />
                          </button>

                          {/* Move Down */}
                          <button
                            type="button"
                            disabled={idx === (homeData.armySpotlight?.cards?.length || 0) - 1}
                            onClick={() => {
                              if (idx === (homeData.armySpotlight?.cards?.length || 0) - 1) return;
                              const updated = [...homeData.armySpotlight.cards];
                              const temp = updated[idx];
                              updated[idx] = updated[idx + 1];
                              updated[idx + 1] = temp;
                              updateField(['armySpotlight', 'cards'], updated);
                            }}
                            style={{
                              border: '1px solid rgba(0,0,0,0.1)',
                              background: '#FFFFFF',
                              borderRadius: '4px',
                              padding: '2px 5px',
                              cursor: idx === (homeData.armySpotlight?.cards?.length || 0) - 1 ? 'not-allowed' : 'pointer',
                              color: idx === (homeData.armySpotlight?.cards?.length || 0) - 1 ? '#D4D4D8' : '#52525B',
                            }}
                          >
                            <ChevronDown size={13} />
                          </button>

                          {/* Delete Card */}
                          <button
                            type="button"
                            onClick={() => {
                              const deletedTitle = card.title || `Card #${idx + 1}`;
                              const updated = (homeData.armySpotlight?.cards || []).filter((_: any, i: number) => i !== idx);
                              updateField(['armySpotlight', 'cards'], updated);
                              setToastMessage(`✓ ${deletedTitle} deleted successfully.`);
                              setTimeout(() => setToastMessage(''), 3500);
                            }}
                            style={{
                              border: '1px solid #FECACA',
                              background: '#FEF2F2',
                              borderRadius: '4px',
                              padding: '2px 6px',
                              cursor: 'pointer',
                              color: '#DC2626',
                              display: 'inline-flex',
                              alignItems: 'center',
                            }}
                            title="Delete this card"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                            <span style={{ fontSize: '0.68rem', color: '#71717A' }}>Category</span>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...homeData.armySpotlight.cards];
                                updated[idx] = { ...updated[idx], showCategory: updated[idx].showCategory === false ? true : false };
                                updateField(['armySpotlight', 'cards'], updated);
                              }}
                              style={{
                                fontSize: '0.65rem',
                                border: 'none',
                                background: 'transparent',
                                color: card.showCategory === false ? '#DC2626' : '#047857',
                                cursor: 'pointer',
                                fontWeight: 600,
                              }}
                            >
                              {card.showCategory === false ? 'Hidden' : 'Visible'}
                            </button>
                          </div>
                          <input
                            type="text"
                            value={card.category || ''}
                            onChange={(e) => {
                              const updated = [...homeData.armySpotlight.cards];
                              updated[idx] = { ...updated[idx], category: e.target.value };
                              updateField(['armySpotlight', 'cards'], updated);
                            }}
                            style={{ ...inputStyle, padding: '0.35rem 0.55rem' }}
                          />
                        </div>
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                            <span style={{ fontSize: '0.68rem', color: '#71717A' }}>Title</span>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...homeData.armySpotlight.cards];
                                updated[idx] = { ...updated[idx], showTitle: updated[idx].showTitle === false ? true : false };
                                updateField(['armySpotlight', 'cards'], updated);
                              }}
                              style={{
                                fontSize: '0.65rem',
                                border: 'none',
                                background: 'transparent',
                                color: card.showTitle === false ? '#DC2626' : '#047857',
                                cursor: 'pointer',
                                fontWeight: 600,
                              }}
                            >
                              {card.showTitle === false ? 'Hidden' : 'Visible'}
                            </button>
                          </div>
                          <input
                            type="text"
                            value={card.title || ''}
                            onChange={(e) => {
                              const updated = [...homeData.armySpotlight.cards];
                              updated[idx] = { ...updated[idx], title: e.target.value };
                              updateField(['armySpotlight', 'cards'], updated);
                            }}
                            style={{ ...inputStyle, padding: '0.35rem 0.55rem' }}
                          />
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                            <span style={{ fontSize: '0.68rem', color: '#71717A' }}>Location / Formations</span>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...homeData.armySpotlight.cards];
                                updated[idx] = { ...updated[idx], showLocation: updated[idx].showLocation === false ? true : false };
                                updateField(['armySpotlight', 'cards'], updated);
                              }}
                              style={{
                                fontSize: '0.65rem',
                                border: 'none',
                                background: 'transparent',
                                color: card.showLocation === false ? '#DC2626' : '#047857',
                                cursor: 'pointer',
                                fontWeight: 600,
                              }}
                            >
                              {card.showLocation === false ? 'Hidden' : 'Visible'}
                            </button>
                          </div>
                          <input
                            type="text"
                            value={card.location || ''}
                            onChange={(e) => {
                              const updated = [...homeData.armySpotlight.cards];
                              updated[idx] = { ...updated[idx], location: e.target.value };
                              updateField(['armySpotlight', 'cards'], updated);
                            }}
                            style={{ ...inputStyle, padding: '0.35rem 0.55rem' }}
                          />
                        </div>
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                            <span style={{ fontSize: '0.68rem', color: '#71717A' }}>Image Path</span>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...homeData.armySpotlight.cards];
                                updated[idx] = { ...updated[idx], showImage: updated[idx].showImage === false ? true : false };
                                updateField(['armySpotlight', 'cards'], updated);
                              }}
                              style={{
                                fontSize: '0.65rem',
                                border: 'none',
                                background: 'transparent',
                                color: card.showImage === false ? '#DC2626' : '#047857',
                                cursor: 'pointer',
                                fontWeight: 600,
                              }}
                            >
                              {card.showImage === false ? 'Hidden' : 'Visible'}
                            </button>
                          </div>
                          <div style={{ display: 'flex', gap: '0.35rem' }}>
                            <input
                              type="text"
                              value={card.image || ''}
                              onChange={(e) => {
                                const updated = [...homeData.armySpotlight.cards];
                                updated[idx] = { ...updated[idx], image: e.target.value };
                                updateField(['armySpotlight', 'cards'], updated);
                              }}
                              style={{ ...inputStyle, padding: '0.35rem 0.55rem', flex: 1 }}
                            />
                            <button
                              type="button"
                              onClick={() => setMediaPickerTarget({ path: `armySpotlight.cards.${idx}.image`, type: 'image' })}
                              style={{ ...mediaBtnStyle, padding: '0 0.5rem', fontSize: '0.7rem' }}
                            >
                              Pick
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════
              SECTION 03: EDITORIAL INTRO & POINT OF VIEW
             ════════════════════════════════════════════════════════════ */}
          {activeSectionId === 'pov' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 650, margin: 0, color: '#111113' }}>
                      03 Editorial Intro &amp; A Point of View
                    </h3>
                    <span style={{ fontSize: '0.7rem', backgroundColor: '#F0FDF4', color: '#16A34A', padding: '2px 7px', borderRadius: '4px', fontWeight: 600 }}>
                      Live Flow
                    </span>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: '#71717A', margin: '0.2rem 0 0 0' }}>
                    The foundational philosophy, founder portrait collage, and business-first perspective.
                  </p>
                </div>

                {/* Section Level Enable/Disable Toggle */}
                <button
                  type="button"
                  onClick={togglePovSection}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.4rem 0.85rem',
                    borderRadius: '6px',
                    border: '1px solid ' + (homeData.pov?.enabled === false ? '#EF4444' : 'rgba(0,0,0,0.12)'),
                    backgroundColor: homeData.pov?.enabled === false ? '#FEE2E2' : '#ECFDF5',
                    color: homeData.pov?.enabled === false ? '#DC2626' : '#047857',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {homeData.pov?.enabled === false ? <EyeOff size={13} /> : <Eye size={13} />}
                  {homeData.pov?.enabled === false ? 'Section Hidden' : 'Section Active'}
                </button>
              </div>

              {/* Founder Portrait & Profile Card (Live on Homepage Right Column) */}
              <div
                style={{
                  padding: '1rem',
                  borderRadius: '10px',
                  border: '1px solid ' + (homeData.pov?.founderCardEnabled === false ? 'rgba(239, 68, 68, 0.3)' : 'rgba(0, 0, 0, 0.08)'),
                  backgroundColor: homeData.pov?.founderCardEnabled === false ? '#FFF5F5' : '#F8F8FA',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#111113' }}>
                      FOUNDER PORTRAIT &amp; IDENTITY CARD
                    </span>
                    <span style={{ fontSize: '0.68rem', color: '#71717A', backgroundColor: '#FFFFFF', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(0,0,0,0.06)' }}>
                      Live Right Column Component
                    </span>
                  </div>

                  {/* Card Enable/Disable Toggle */}
                  <button
                    type="button"
                    onClick={() => updateField(['pov', 'founderCardEnabled'], homeData.pov?.founderCardEnabled === false ? true : false)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      border: 'none',
                      backgroundColor: homeData.pov?.founderCardEnabled === false ? '#FEE2E2' : '#ECFDF5',
                      color: homeData.pov?.founderCardEnabled === false ? '#DC2626' : '#047857',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {homeData.pov?.founderCardEnabled === false ? <EyeOff size={12} /> : <Eye size={12} />}
                    {homeData.pov?.founderCardEnabled === false ? 'Card Disabled' : 'Card Enabled'}
                  </button>
                </div>

                {/* Founder Image Picker */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#52525B' }}>
                      Founder Portrait Photo (Madhura Hawal)
                    </span>
                    <button
                      type="button"
                      onClick={() => updateField(['pov', 'founderPhotoEnabled'], homeData.pov?.founderPhotoEnabled === false ? true : false)}
                      style={{
                        padding: '2px 8px',
                        borderRadius: '4px',
                        border: 'none',
                        backgroundColor: homeData.pov?.founderPhotoEnabled === false ? '#FEE2E2' : '#ECFDF5',
                        color: homeData.pov?.founderPhotoEnabled === false ? '#DC2626' : '#047857',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {homeData.pov?.founderPhotoEnabled === false ? 'Photo Hidden' : 'Photo Visible'}
                    </button>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div
                      style={{
                        width: '54px',
                        height: '68px',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        border: '1px solid rgba(0,0,0,0.1)',
                        backgroundColor: '#E4E4E7',
                        position: 'relative',
                        flexShrink: 0,
                      }}
                    >
                      {homeData.pov?.founderImage || '/images/home/madhura-editorial.jpg' ? (
                        <img
                          src={homeData.pov?.founderImage || '/images/home/madhura-editorial.jpg'}
                          alt="Founder Portrait Preview"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : null}
                    </div>
                    <div style={{ flex: 1, display: 'flex', gap: '0.4rem' }}>
                      <input
                        type="text"
                        value={homeData.pov?.founderImage || ''}
                        placeholder="/images/home/madhura-editorial.jpg"
                        onChange={(e) => updateField(['pov', 'founderImage'], e.target.value)}
                        style={{ ...inputStyle, fontSize: '0.78rem' }}
                      />
                      <button
                        type="button"
                        onClick={() => setMediaPickerTarget({ path: 'pov.founderImage', type: 'image' })}
                        style={mediaBtnStyle}
                      >
                        Pick / Upload
                      </button>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#52525B' }}>
                        FOUNDER NAME
                      </label>
                      <button
                        type="button"
                        onClick={() => updateField(['pov', 'founderNameEnabled'], homeData.pov?.founderNameEnabled === false ? true : false)}
                        style={{
                          padding: '2px 8px',
                          borderRadius: '4px',
                          border: 'none',
                          backgroundColor: homeData.pov?.founderNameEnabled === false ? '#FEE2E2' : '#ECFDF5',
                          color: homeData.pov?.founderNameEnabled === false ? '#DC2626' : '#047857',
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        {homeData.pov?.founderNameEnabled === false ? 'Name Hidden' : 'Name Visible'}
                      </button>
                    </div>
                    <input
                      type="text"
                      value={homeData.pov?.founderName || ''}
                      placeholder="MADHURA HAWAL"
                      onChange={(e) => updateField(['pov', 'founderName'], e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#52525B' }}>
                        FOUNDER ROLE / BADGE
                      </label>
                      <button
                        type="button"
                        onClick={() => updateField(['pov', 'founderRoleEnabled'], homeData.pov?.founderRoleEnabled === false ? true : false)}
                        style={{
                          padding: '2px 8px',
                          borderRadius: '4px',
                          border: 'none',
                          backgroundColor: homeData.pov?.founderRoleEnabled === false ? '#FEE2E2' : '#ECFDF5',
                          color: homeData.pov?.founderRoleEnabled === false ? '#DC2626' : '#047857',
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        {homeData.pov?.founderRoleEnabled === false ? 'Role Hidden' : 'Role Visible'}
                      </button>
                    </div>
                    <input
                      type="text"
                      value={homeData.pov?.founderRole || ''}
                      placeholder="FOUNDER"
                      onChange={(e) => updateField(['pov', 'founderRole'], e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#52525B' }}>
                      FOUNDER BIO / CARD DESCRIPTION
                    </label>
                    <button
                      type="button"
                      onClick={() => updateField(['pov', 'founderDescEnabled'], homeData.pov?.founderDescEnabled === false ? true : false)}
                      style={{
                        padding: '2px 8px',
                        borderRadius: '4px',
                        border: 'none',
                        backgroundColor: homeData.pov?.founderDescEnabled === false ? '#FEE2E2' : '#ECFDF5',
                        color: homeData.pov?.founderDescEnabled === false ? '#DC2626' : '#047857',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {homeData.pov?.founderDescEnabled === false ? 'Bio Hidden' : 'Bio Visible'}
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    value={homeData.pov?.founderDesc || ''}
                    placeholder="Madhura Hawal on-ground directing projects across Ladakh and regional commercial hubs."
                    onChange={(e) => updateField(['pov', 'founderDesc'], e.target.value)}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#52525B' }}>
                      FOUNDER BUTTON LINK (ARROW)
                    </label>
                    <button
                      type="button"
                      onClick={() => updateField(['pov', 'founderLinkEnabled'], homeData.pov?.founderLinkEnabled === false ? true : false)}
                      style={{
                        padding: '2px 8px',
                        borderRadius: '4px',
                        border: 'none',
                        backgroundColor: homeData.pov?.founderLinkEnabled === false ? '#FEE2E2' : '#ECFDF5',
                        color: homeData.pov?.founderLinkEnabled === false ? '#DC2626' : '#047857',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {homeData.pov?.founderLinkEnabled === false ? 'Link Hidden' : 'Link Visible'}
                    </button>
                  </div>
                  <input
                    type="text"
                    value={homeData.pov?.founderLink || ''}
                    placeholder="/about"
                    onChange={(e) => updateField(['pov', 'founderLink'], e.target.value)}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>
                    EYEBROW
                  </label>
                  <button
                    type="button"
                    onClick={() => updateField(['pov', 'eyebrowEnabled'], homeData.pov?.eyebrowEnabled === false ? true : false)}
                    style={{
                      padding: '2px 8px',
                      borderRadius: '4px',
                      border: 'none',
                      backgroundColor: homeData.pov?.eyebrowEnabled === false ? '#FEE2E2' : '#ECFDF5',
                      color: homeData.pov?.eyebrowEnabled === false ? '#DC2626' : '#047857',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {homeData.pov?.eyebrowEnabled === false ? 'Eyebrow Hidden' : 'Eyebrow Visible'}
                  </button>
                </div>
                <input
                  type="text"
                  value={homeData.pov?.eyebrow || ''}
                  onChange={(e) => updateField(['pov', 'eyebrow'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>
                    MAIN EDITORIAL HEADLINE
                  </label>
                  <button
                    type="button"
                    onClick={() => updateField(['pov', 'headlineEnabled'], homeData.pov?.headlineEnabled === false ? true : false)}
                    style={{
                      padding: '2px 8px',
                      borderRadius: '4px',
                      border: 'none',
                      backgroundColor: homeData.pov?.headlineEnabled === false ? '#FEE2E2' : '#ECFDF5',
                      color: homeData.pov?.headlineEnabled === false ? '#DC2626' : '#047857',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {homeData.pov?.headlineEnabled === false ? 'Headline Hidden' : 'Headline Visible'}
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={homeData.pov?.headline || ''}
                  onChange={(e) => updateField(['pov', 'headline'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>
                    PARAGRAPH 1 (Core statement)
                  </label>
                  <button
                    type="button"
                    onClick={() => updateField(['pov', 'paragraph1Enabled'], homeData.pov?.paragraph1Enabled === false ? true : false)}
                    style={{
                      padding: '2px 8px',
                      borderRadius: '4px',
                      border: 'none',
                      backgroundColor: homeData.pov?.paragraph1Enabled === false ? '#FEE2E2' : '#ECFDF5',
                      color: homeData.pov?.paragraph1Enabled === false ? '#DC2626' : '#047857',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {homeData.pov?.paragraph1Enabled === false ? 'Paragraph 1 Hidden' : 'Paragraph 1 Visible'}
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={homeData.pov?.paragraph1 || ''}
                  onChange={(e) => updateField(['pov', 'paragraph1'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>
                    PARAGRAPH 2 (Execution breadth)
                  </label>
                  <button
                    type="button"
                    onClick={() => updateField(['pov', 'paragraph2Enabled'], homeData.pov?.paragraph2Enabled === false ? true : false)}
                    style={{
                      padding: '2px 8px',
                      borderRadius: '4px',
                      border: 'none',
                      backgroundColor: homeData.pov?.paragraph2Enabled === false ? '#FEE2E2' : '#ECFDF5',
                      color: homeData.pov?.paragraph2Enabled === false ? '#DC2626' : '#047857',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {homeData.pov?.paragraph2Enabled === false ? 'Paragraph 2 Hidden' : 'Paragraph 2 Visible'}
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={homeData.pov?.paragraph2 || ''}
                  onChange={(e) => updateField(['pov', 'paragraph2'], e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════
              SECTION 04: SELECTED WORK SHOWCASE
             ════════════════════════════════════════════════════════════ */}
          {activeSectionId === 'work' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 650, margin: 0, color: '#111113' }}>
                      03 Selected Work 3D Coverflow Showcase
                    </h3>
                    <span style={{ fontSize: '0.7rem', backgroundColor: '#F0FDF4', color: '#16A34A', padding: '2px 7px', borderRadius: '4px', fontWeight: 600 }}>
                      Live Flow
                    </span>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: '#71717A', margin: '0.2rem 0 0 0' }}>
                    The work is the proof: featured case study cards displayed on the homepage.
                  </p>
                </div>

                {/* Section Level Enable / Disable Toggle */}
                <button
                  type="button"
                  onClick={toggleWorkSection}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '0.4rem 0.85rem',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: homeData.selectedWork?.enabled === false ? '#FEE2E2' : '#ECFDF5',
                    color: homeData.selectedWork?.enabled === false ? '#DC2626' : '#047857',
                    fontSize: '0.76rem',
                    fontWeight: 650,
                    cursor: 'pointer',
                  }}
                >
                  {homeData.selectedWork?.enabled === false ? <EyeOff size={14} /> : <Eye size={14} />}
                  {homeData.selectedWork?.enabled === false ? 'Section Hidden' : 'Section Active'}
                </button>
              </div>

              {/* Eyebrow with Enable/Disable */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>
                    EYEBROW
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const cur = homeData.selectedWork?.showEyebrow !== false;
                      updateField(['selectedWork', 'showEyebrow'], !cur);
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '2px 7px',
                      borderRadius: '4px',
                      border: 'none',
                      backgroundColor: homeData.selectedWork?.showEyebrow === false ? '#FEE2E2' : '#ECFDF5',
                      color: homeData.selectedWork?.showEyebrow === false ? '#DC2626' : '#047857',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {homeData.selectedWork?.showEyebrow === false ? <EyeOff size={11} /> : <Eye size={11} />}
                    {homeData.selectedWork?.showEyebrow === false ? 'Eyebrow Hidden' : 'Eyebrow Visible'}
                  </button>
                </div>
                <input
                  type="text"
                  value={homeData.selectedWork?.eyebrow || ''}
                  onChange={(e) => updateField(['selectedWork', 'eyebrow'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              {/* Headline with Enable/Disable */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>
                    HEADLINE
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const cur = homeData.selectedWork?.showHeadline !== false;
                      updateField(['selectedWork', 'showHeadline'], !cur);
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '2px 7px',
                      borderRadius: '4px',
                      border: 'none',
                      backgroundColor: homeData.selectedWork?.showHeadline === false ? '#FEE2E2' : '#ECFDF5',
                      color: homeData.selectedWork?.showHeadline === false ? '#DC2626' : '#047857',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {homeData.selectedWork?.showHeadline === false ? <EyeOff size={11} /> : <Eye size={11} />}
                    {homeData.selectedWork?.showHeadline === false ? 'Headline Hidden' : 'Headline Visible'}
                  </button>
                </div>
                <input
                  type="text"
                  value={homeData.selectedWork?.title || ''}
                  onChange={(e) => updateField(['selectedWork', 'title'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              {/* Showcase Projects with Add, Reorder, Enable/Disable, and Working Delete */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B', margin: 0 }}>
                    SHOWCASE PROJECTS ({homeData.selectedWork?.projects?.length || 0})
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const projects = [...(homeData.selectedWork?.projects || [])];
                      projects.push({
                        id: `proj-${Date.now()}`,
                        index: String(projects.length + 1).padStart(2, '0'),
                        title: 'New Showcase Project',
                        category: 'Commercial',
                        link: '/work',
                        image: '/images/case-studies/raysons/neora-1.jpg',
                        enabled: true,
                        showTitle: true,
                        showCategory: true,
                        showLink: true,
                        showImage: true,
                      });
                      updateField(['selectedWork', 'projects'], projects);
                      setToastMessage('✓ New Showcase Project added successfully!');
                      setTimeout(() => setToastMessage(''), 3500);
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: '#111113',
                      color: '#FFFFFF',
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    <Plus size={13} /> Add Project
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {(homeData.selectedWork?.projects || []).map((proj: any, idx: number) => (
                    <div
                      key={proj.id || idx}
                      style={{
                        padding: '0.85rem',
                        borderRadius: '10px',
                        border: '1px solid ' + (proj.enabled === false ? 'rgba(239, 68, 68, 0.3)' : 'rgba(0,0,0,0.08)'),
                        backgroundColor: '#F8F8FA',
                        opacity: proj.enabled === false ? 0.7 : 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.65rem',
                      }}
                    >
                      {/* Project Header with Enable/Disable, Move, and Delete */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '0.45rem' }}>
                        <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#111113' }}>
                          Project #{idx + 1}: {proj.title || 'Untitled Project'}
                        </span>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          {/* Enable/Disable Toggle */}
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...homeData.selectedWork.projects];
                              updated[idx] = { ...updated[idx], enabled: updated[idx].enabled === false ? true : false };
                              updateField(['selectedWork', 'projects'], updated);
                              setToastMessage(updated[idx].enabled ? `✓ Project #${idx + 1} enabled` : `✕ Project #${idx + 1} disabled`);
                              setTimeout(() => setToastMessage(''), 3000);
                            }}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '3px',
                              padding: '2px 7px',
                              borderRadius: '4px',
                              border: 'none',
                              backgroundColor: proj.enabled === false ? '#FEE2E2' : '#ECFDF5',
                              color: proj.enabled === false ? '#DC2626' : '#047857',
                              fontSize: '0.7rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                            }}
                          >
                            {proj.enabled === false ? <EyeOff size={11} /> : <Eye size={11} />}
                            {proj.enabled === false ? 'Disabled' : 'Enabled'}
                          </button>

                          {/* Move Up */}
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => {
                              if (idx === 0) return;
                              const updated = [...homeData.selectedWork.projects];
                              const temp = updated[idx];
                              updated[idx] = updated[idx - 1];
                              updated[idx - 1] = temp;
                              updateField(['selectedWork', 'projects'], updated);
                            }}
                            style={{
                              border: '1px solid rgba(0,0,0,0.1)',
                              background: '#FFFFFF',
                              borderRadius: '4px',
                              padding: '2px 5px',
                              cursor: idx === 0 ? 'not-allowed' : 'pointer',
                              color: idx === 0 ? '#D4D4D8' : '#52525B',
                            }}
                          >
                            <ChevronUp size={13} />
                          </button>

                          {/* Move Down */}
                          <button
                            type="button"
                            disabled={idx === (homeData.selectedWork?.projects?.length || 0) - 1}
                            onClick={() => {
                              if (idx === (homeData.selectedWork?.projects?.length || 0) - 1) return;
                              const updated = [...homeData.selectedWork.projects];
                              const temp = updated[idx];
                              updated[idx] = updated[idx + 1];
                              updated[idx + 1] = temp;
                              updateField(['selectedWork', 'projects'], updated);
                            }}
                            style={{
                              border: '1px solid rgba(0,0,0,0.1)',
                              background: '#FFFFFF',
                              borderRadius: '4px',
                              padding: '2px 5px',
                              cursor: idx === (homeData.selectedWork?.projects?.length || 0) - 1 ? 'not-allowed' : 'pointer',
                              color: idx === (homeData.selectedWork?.projects?.length || 0) - 1 ? '#D4D4D8' : '#52525B',
                            }}
                          >
                            <ChevronDown size={13} />
                          </button>

                          {/* Delete Project */}
                          <button
                            type="button"
                            onClick={() => {
                              const deletedTitle = proj.title || `Project #${idx + 1}`;
                              const updated = (homeData.selectedWork?.projects || []).filter((_: any, i: number) => i !== idx);
                              updateField(['selectedWork', 'projects'], updated);
                              setToastMessage(`✓ ${deletedTitle} deleted successfully.`);
                              setTimeout(() => setToastMessage(''), 3500);
                            }}
                            style={{
                              border: '1px solid #FECACA',
                              background: '#FEF2F2',
                              borderRadius: '4px',
                              padding: '2px 6px',
                              cursor: 'pointer',
                              color: '#DC2626',
                              display: 'inline-flex',
                              alignItems: 'center',
                            }}
                            title="Delete this project"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.5rem' }}>
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                            <span style={{ fontSize: '0.68rem', color: '#71717A' }}>Project Title</span>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...homeData.selectedWork.projects];
                                updated[idx] = { ...updated[idx], showTitle: updated[idx].showTitle === false ? true : false };
                                updateField(['selectedWork', 'projects'], updated);
                              }}
                              style={{
                                fontSize: '0.65rem',
                                border: 'none',
                                background: 'transparent',
                                color: proj.showTitle === false ? '#DC2626' : '#047857',
                                cursor: 'pointer',
                                fontWeight: 650,
                              }}
                            >
                              {proj.showTitle === false ? 'Hidden' : 'Visible'}
                            </button>
                          </div>
                          <input
                            type="text"
                            value={proj.title || ''}
                            onChange={(e) => {
                              const updated = [...homeData.selectedWork.projects];
                              updated[idx] = { ...updated[idx], title: e.target.value };
                              updateField(['selectedWork', 'projects'], updated);
                            }}
                            style={{ ...inputStyle, padding: '0.35rem 0.55rem' }}
                          />
                        </div>
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                            <span style={{ fontSize: '0.68rem', color: '#71717A' }}>Category</span>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...homeData.selectedWork.projects];
                                updated[idx] = { ...updated[idx], showCategory: updated[idx].showCategory === false ? true : false };
                                updateField(['selectedWork', 'projects'], updated);
                              }}
                              style={{
                                fontSize: '0.65rem',
                                border: 'none',
                                background: 'transparent',
                                color: proj.showCategory === false ? '#DC2626' : '#047857',
                                cursor: 'pointer',
                                fontWeight: 650,
                              }}
                            >
                              {proj.showCategory === false ? 'Hidden' : 'Visible'}
                            </button>
                          </div>
                          <input
                            type="text"
                            value={proj.category || ''}
                            onChange={(e) => {
                              const updated = [...homeData.selectedWork.projects];
                              updated[idx] = { ...updated[idx], category: e.target.value };
                              updateField(['selectedWork', 'projects'], updated);
                            }}
                            style={{ ...inputStyle, padding: '0.35rem 0.55rem' }}
                          />
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                            <span style={{ fontSize: '0.68rem', color: '#71717A' }}>Link URL</span>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...homeData.selectedWork.projects];
                                updated[idx] = { ...updated[idx], showLink: updated[idx].showLink === false ? true : false };
                                updateField(['selectedWork', 'projects'], updated);
                              }}
                              style={{
                                fontSize: '0.65rem',
                                border: 'none',
                                background: 'transparent',
                                color: proj.showLink === false ? '#DC2626' : '#047857',
                                cursor: 'pointer',
                                fontWeight: 650,
                              }}
                            >
                              {proj.showLink === false ? 'Hidden' : 'Visible'}
                            </button>
                          </div>
                          <input
                            type="text"
                            value={proj.link || ''}
                            onChange={(e) => {
                              const updated = [...homeData.selectedWork.projects];
                              updated[idx] = { ...updated[idx], link: e.target.value };
                              updateField(['selectedWork', 'projects'], updated);
                            }}
                            style={{ ...inputStyle, padding: '0.35rem 0.55rem' }}
                          />
                        </div>
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                            <span style={{ fontSize: '0.68rem', color: '#71717A' }}>Image Path</span>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...homeData.selectedWork.projects];
                                updated[idx] = { ...updated[idx], showImage: updated[idx].showImage === false ? true : false };
                                updateField(['selectedWork', 'projects'], updated);
                              }}
                              style={{
                                fontSize: '0.65rem',
                                border: 'none',
                                background: 'transparent',
                                color: proj.showImage === false ? '#DC2626' : '#047857',
                                cursor: 'pointer',
                                fontWeight: 650,
                              }}
                            >
                              {proj.showImage === false ? 'Hidden' : 'Visible'}
                            </button>
                          </div>
                          <div style={{ display: 'flex', gap: '0.35rem' }}>
                            <input
                              type="text"
                              value={proj.image || ''}
                              onChange={(e) => {
                                const updated = [...homeData.selectedWork.projects];
                                updated[idx] = { ...updated[idx], image: e.target.value };
                                updateField(['selectedWork', 'projects'], updated);
                              }}
                              style={{ ...inputStyle, padding: '0.35rem 0.55rem', flex: 1 }}
                            />
                            <button
                              type="button"
                              onClick={() => setMediaPickerTarget({ path: `selectedWork.projects.${idx}.image`, type: 'image' })}
                              style={{ ...mediaBtnStyle, padding: '0 0.5rem', fontSize: '0.7rem' }}
                            >
                              Pick
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════
              SECTION 05: CAPABILITIES & SHARP NUMBERS
             ════════════════════════════════════════════════════════════ */}
          {activeSectionId === 'services' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 650, margin: 0, color: '#111113' }}>
                      04 Capabilities &amp; Sharp Metric Numbers
                    </h3>
                    <span style={{ fontSize: '0.7rem', backgroundColor: '#F0FDF4', color: '#16A34A', padding: '2px 7px', borderRadius: '4px', fontWeight: 600 }}>
                      Live Flow
                    </span>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: '#71717A', margin: '0.25rem 0 0 0' }}>
                    &ldquo;Three distinct capabilities. One strategic spine.&rdquo; &bull; Controls capabilities headline, sharp flipping metric numbers, and practice areas.
                  </p>
                </div>

                {/* Section Level Enable / Disable Toggle */}
                <button
                  type="button"
                  onClick={toggleServicesSection}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '0.4rem 0.85rem',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: homeData.services?.enabled === false ? '#FEE2E2' : '#ECFDF5',
                    color: homeData.services?.enabled === false ? '#DC2626' : '#047857',
                    fontSize: '0.76rem',
                    fontWeight: 650,
                    cursor: 'pointer',
                  }}
                >
                  {homeData.services?.enabled === false ? <EyeOff size={14} /> : <Eye size={14} />}
                  {homeData.services?.enabled === false ? 'Section Hidden' : 'Section Active'}
                </button>
              </div>

              {/* Eyebrow with Enable/Disable */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>
                    SECTION EYEBROW
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const cur = homeData.services?.showEyebrow !== false;
                      updateField(['services', 'showEyebrow'], !cur);
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '2px 7px',
                      borderRadius: '4px',
                      border: 'none',
                      backgroundColor: homeData.services?.showEyebrow === false ? '#FEE2E2' : '#ECFDF5',
                      color: homeData.services?.showEyebrow === false ? '#DC2626' : '#047857',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {homeData.services?.showEyebrow === false ? <EyeOff size={11} /> : <Eye size={11} />}
                    {homeData.services?.showEyebrow === false ? 'Eyebrow Hidden' : 'Eyebrow Visible'}
                  </button>
                </div>
                <input
                  type="text"
                  value={homeData.services?.eyebrow || ''}
                  placeholder="e.g. CAPABILITIES & PRACTICE AREAS"
                  onChange={(e) => updateField(['services', 'eyebrow'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              {/* Headline with Enable/Disable */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>
                    SECTION HEADLINE
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const cur = homeData.services?.showHeadline !== false;
                      updateField(['services', 'showHeadline'], !cur);
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '2px 7px',
                      borderRadius: '4px',
                      border: 'none',
                      backgroundColor: homeData.services?.showHeadline === false ? '#FEE2E2' : '#ECFDF5',
                      color: homeData.services?.showHeadline === false ? '#DC2626' : '#047857',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {homeData.services?.showHeadline === false ? <EyeOff size={11} /> : <Eye size={11} />}
                    {homeData.services?.showHeadline === false ? 'Headline Hidden' : 'Headline Visible'}
                  </button>
                </div>
                <input
                  type="text"
                  value={homeData.services?.title || ''}
                  placeholder="Three distinct capabilities. One strategic spine."
                  onChange={(e) => updateField(['services', 'title'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              {/* Intro Copy with Enable/Disable */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>
                    SECTION INTRO COPY
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const cur = homeData.services?.showDescription !== false;
                      updateField(['services', 'showDescription'], !cur);
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '2px 7px',
                      borderRadius: '4px',
                      border: 'none',
                      backgroundColor: homeData.services?.showDescription === false ? '#FEE2E2' : '#ECFDF5',
                      color: homeData.services?.showDescription === false ? '#DC2626' : '#047857',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {homeData.services?.showDescription === false ? <EyeOff size={11} /> : <Eye size={11} />}
                    {homeData.services?.showDescription === false ? 'Intro Hidden' : 'Intro Visible'}
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={homeData.services?.description || ''}
                  placeholder="Ārohana combines commercial thinking, sector experience and creative execution..."
                  onChange={(e) => updateField(['services', 'description'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              {/* ─── 3 SHARP METRIC NUMBERS ─── */}
              <div style={{ padding: '1.1rem', backgroundColor: '#F8F8FA', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                  <div>
                    <h4 style={{ fontSize: '0.88rem', fontWeight: 650, margin: 0, color: '#111113' }}>
                      Statistics Section (3 Statistics)
                    </h4>
                    <span style={{ fontSize: '0.72rem', color: '#71717A' }}>
                      Editable statistic numbers, labels, enable/disable toggles, and reordering.
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    {/* Subsection toggle */}
                    <button
                      type="button"
                      onClick={() => {
                        const cur = homeData.impactStats?.enabled !== false;
                        updateField(['impactStats', 'enabled'], !cur);
                      }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '0.35rem 0.65rem',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: homeData.impactStats?.enabled === false ? '#FEE2E2' : '#ECFDF5',
                        color: homeData.impactStats?.enabled === false ? '#DC2626' : '#047857',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {homeData.impactStats?.enabled === false ? <EyeOff size={12} /> : <Eye size={12} />}
                      {homeData.impactStats?.enabled === false ? 'Stats Block Hidden' : 'Stats Block Active'}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const counters = [...(homeData.impactStats?.counters || [])];
                        counters.push({
                          id: `stat-${Date.now()}`,
                          target: 10,
                          suffix: '+',
                          title: 'New Metric',
                          desc: 'Strategic impact across sectors',
                          enabled: true,
                          showTarget: true,
                          showSuffix: true,
                          showTitle: true,
                          showDesc: true,
                        });
                        updateField(['impactStats', 'counters'], counters);
                        setToastMessage('✓ New Statistic added successfully!');
                        setTimeout(() => setToastMessage(''), 3500);
                      }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '0.35rem 0.75rem',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: '#111113',
                        color: '#FFFFFF',
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      <Plus size={13} /> Add Stat
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {(() => {
                    const defaultStats = [
                      { id: 'commercial', target: 25, suffix: '+', title: 'Commercial Engagements', desc: 'Hospitality, enterprise & consumer brands', enabled: true },
                      { id: 'sectors', target: 6, suffix: '', title: 'Industry Sectors', desc: 'Hospitality, Real Estate, Healthcare, Media, Travel & Defence', enabled: true },
                      { id: 'expeditions', target: 15, suffix: '+', title: 'Himalayan Expeditions', desc: 'Curated mountain journeys and border initiatives', enabled: true },
                    ];
                    const rawList = homeData.impactStats?.counters && homeData.impactStats.counters.length > 0
                      ? homeData.impactStats.counters
                      : defaultStats;
                    const list = rawList;

                    return list.map((cnt: any, idx: number) => (
                      <div
                        key={cnt.id || idx}
                        style={{
                          padding: '0.85rem',
                          borderRadius: '8px',
                          backgroundColor: '#FFFFFF',
                          border: '1px solid ' + (cnt.enabled === false ? 'rgba(239, 68, 68, 0.3)' : 'rgba(0,0,0,0.08)'),
                          opacity: cnt.enabled === false ? 0.7 : 1,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.5rem',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#111113' }}>
                            Statistic #{idx + 1}: {cnt.title || cnt.label || 'Metric'}
                          </span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <button
                              type="button"
                              onClick={() => {
                                const counters = [...list];
                                counters[idx] = { ...counters[idx], enabled: counters[idx].enabled === false ? true : false };
                                updateField(['impactStats', 'counters'], counters);
                                setToastMessage(counters[idx].enabled ? `✓ Statistic #${idx + 1} enabled` : `✕ Statistic #${idx + 1} disabled`);
                                setTimeout(() => setToastMessage(''), 3000);
                              }}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '3px',
                                padding: '2px 7px',
                                borderRadius: '4px',
                                border: 'none',
                                backgroundColor: cnt.enabled === false ? '#FEE2E2' : '#ECFDF5',
                                color: cnt.enabled === false ? '#DC2626' : '#047857',
                                fontSize: '0.7rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                              }}
                            >
                              {cnt.enabled === false ? <EyeOff size={11} /> : <Eye size={11} />}
                              {cnt.enabled === false ? 'Disabled' : 'Enabled'}
                            </button>
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => {
                                if (idx === 0) return;
                                const counters = [...list];
                                const temp = counters[idx];
                                counters[idx] = counters[idx - 1];
                                counters[idx - 1] = temp;
                                updateField(['impactStats', 'counters'], counters);
                              }}
                              style={{
                                border: '1px solid rgba(0,0,0,0.1)',
                                background: '#F8F8FA',
                                borderRadius: '4px',
                                padding: '2px 5px',
                                cursor: idx === 0 ? 'not-allowed' : 'pointer',
                                color: idx === 0 ? '#D4D4D8' : '#52525B',
                              }}
                            >
                              <ChevronUp size={13} />
                            </button>
                            <button
                              type="button"
                              disabled={idx === list.length - 1}
                              onClick={() => {
                                if (idx === list.length - 1) return;
                                const counters = [...list];
                                const temp = counters[idx];
                                counters[idx] = counters[idx + 1];
                                counters[idx + 1] = temp;
                                updateField(['impactStats', 'counters'], counters);
                              }}
                              style={{
                                border: '1px solid rgba(0,0,0,0.1)',
                                background: '#F8F8FA',
                                borderRadius: '4px',
                                padding: '2px 5px',
                                cursor: idx === list.length - 1 ? 'not-allowed' : 'pointer',
                                color: idx === list.length - 1 ? '#D4D4D8' : '#52525B',
                              }}
                            >
                              <ChevronDown size={13} />
                            </button>
                            {/* Working Delete Button */}
                            <button
                              type="button"
                              onClick={() => {
                                const deletedLabel = cnt.title || cnt.label || `Statistic #${idx + 1}`;
                                const counters = list.filter((_: any, i: number) => i !== idx);
                                updateField(['impactStats', 'counters'], counters);
                                setToastMessage(`✓ ${deletedLabel} deleted successfully.`);
                                setTimeout(() => setToastMessage(''), 3500);
                              }}
                              style={{
                                border: '1px solid #FECACA',
                                background: '#FEF2F2',
                                borderRadius: '4px',
                                padding: '2px 6px',
                                cursor: 'pointer',
                                color: '#DC2626',
                                display: 'inline-flex',
                                alignItems: 'center',
                              }}
                              title="Delete statistic"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '95px 75px 1fr', gap: '0.5rem', alignItems: 'center' }}>
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                              <span style={{ fontSize: '0.68rem', fontWeight: 600, color: '#71717A' }}>
                                NUMBER
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  const counters = [...list];
                                  counters[idx] = { ...counters[idx], showTarget: counters[idx].showTarget === false ? true : false };
                                  updateField(['impactStats', 'counters'], counters);
                                }}
                                style={{
                                  fontSize: '0.65rem',
                                  border: 'none',
                                  background: 'transparent',
                                  color: cnt.showTarget === false ? '#DC2626' : '#047857',
                                  cursor: 'pointer',
                                  fontWeight: 650,
                                }}
                              >
                                {cnt.showTarget === false ? 'Hidden' : 'Visible'}
                              </button>
                            </div>
                            <input
                              type="number"
                              value={cnt.target ?? 0}
                              onChange={(e) => {
                                const counters = [...list];
                                counters[idx] = { ...counters[idx], target: parseInt(e.target.value) || 0 };
                                updateField(['impactStats', 'counters'], counters);
                              }}
                              style={{ ...inputStyle, padding: '0.35rem 0.55rem' }}
                            />
                          </div>
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                              <span style={{ fontSize: '0.68rem', fontWeight: 600, color: '#71717A' }}>
                                SUFFIX
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  const counters = [...list];
                                  counters[idx] = { ...counters[idx], showSuffix: counters[idx].showSuffix === false ? true : false };
                                  updateField(['impactStats', 'counters'], counters);
                                }}
                                style={{
                                  fontSize: '0.65rem',
                                  border: 'none',
                                  background: 'transparent',
                                  color: cnt.showSuffix === false ? '#DC2626' : '#047857',
                                  cursor: 'pointer',
                                  fontWeight: 650,
                                }}
                              >
                                {cnt.showSuffix === false ? 'Hidden' : 'Visible'}
                              </button>
                            </div>
                            <input
                              type="text"
                              value={cnt.suffix || ''}
                              placeholder="+"
                              onChange={(e) => {
                                const counters = [...list];
                                counters[idx] = { ...counters[idx], suffix: e.target.value };
                                updateField(['impactStats', 'counters'], counters);
                              }}
                              style={{ ...inputStyle, padding: '0.35rem 0.55rem' }}
                            />
                          </div>
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                              <span style={{ fontSize: '0.68rem', fontWeight: 600, color: '#71717A' }}>
                                STATISTIC LABEL
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  const counters = [...list];
                                  counters[idx] = { ...counters[idx], showTitle: counters[idx].showTitle === false ? true : false };
                                  updateField(['impactStats', 'counters'], counters);
                                }}
                                style={{
                                  fontSize: '0.65rem',
                                  border: 'none',
                                  background: 'transparent',
                                  color: cnt.showTitle === false ? '#DC2626' : '#047857',
                                  cursor: 'pointer',
                                  fontWeight: 650,
                                }}
                              >
                                {cnt.showTitle === false ? 'Hidden' : 'Visible'}
                              </button>
                            </div>
                            <input
                              type="text"
                              value={cnt.title || cnt.label || ''}
                              placeholder="e.g. Commercial Engagements"
                              onChange={(e) => {
                                const counters = [...list];
                                counters[idx] = { ...counters[idx], title: e.target.value, label: e.target.value };
                                updateField(['impactStats', 'counters'], counters);
                              }}
                              style={{ ...inputStyle, padding: '0.35rem 0.55rem' }}
                            />
                          </div>
                        </div>

                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                            <span style={{ fontSize: '0.68rem', fontWeight: 600, color: '#71717A' }}>
                              SUPPORTING CONTEXT
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                const counters = [...list];
                                counters[idx] = { ...counters[idx], showDesc: counters[idx].showDesc === false ? true : false };
                                updateField(['impactStats', 'counters'], counters);
                              }}
                              style={{
                                fontSize: '0.65rem',
                                border: 'none',
                                background: 'transparent',
                                color: cnt.showDesc === false ? '#DC2626' : '#047857',
                                cursor: 'pointer',
                                fontWeight: 650,
                              }}
                            >
                              {cnt.showDesc === false ? 'Hidden' : 'Visible'}
                            </button>
                          </div>
                          <input
                            type="text"
                            value={cnt.desc || cnt.detail || ''}
                            placeholder="e.g. Hospitality, enterprise & consumer brands"
                            onChange={(e) => {
                              const counters = [...list];
                              counters[idx] = { ...counters[idx], desc: e.target.value, detail: e.target.value };
                              updateField(['impactStats', 'counters'], counters);
                            }}
                            style={{ ...inputStyle, padding: '0.35rem 0.55rem' }}
                          />
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </div>

              {/* ─── 3 PRACTICE PILLARS ─── */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B', margin: 0 }}>
                    PRACTICE PILLARS ({homeData.services?.items?.length || 0})
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <button
                      type="button"
                      onClick={() => {
                        const cur = homeData.services?.pillarsEnabled !== false;
                        updateField(['services', 'pillarsEnabled'], !cur);
                      }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '0.35rem 0.65rem',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: homeData.services?.pillarsEnabled === false ? '#FEE2E2' : '#ECFDF5',
                        color: homeData.services?.pillarsEnabled === false ? '#DC2626' : '#047857',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {homeData.services?.pillarsEnabled === false ? <EyeOff size={12} /> : <Eye size={12} />}
                      {homeData.services?.pillarsEnabled === false ? 'Pillars Block Hidden' : 'Pillars Block Active'}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const items = [...(homeData.services?.items || [])];
                        items.push({
                          num: String(items.length + 1).padStart(2, '0'),
                          title: 'New Practice Pillar',
                          description: 'Strategic branding and execution across multi-channel environments.',
                          tags: ['Brand Strategy', 'Creative Direction', 'Platforms'],
                          href: '/services',
                          image: '/images/services/digital-growth.jpg',
                          enabled: true,
                          showNum: true,
                          showTitle: true,
                          showDescription: true,
                          showTags: true,
                          showHref: true,
                          showImage: true,
                        });
                        updateField(['services', 'items'], items);
                        setToastMessage('✓ New Practice Pillar added successfully!');
                        setTimeout(() => setToastMessage(''), 3500);
                      }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '0.35rem 0.75rem',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: '#111113',
                        color: '#FFFFFF',
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      <Plus size={13} /> Add Pillar
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {(homeData.services?.items || []).map((srv: any, idx: number) => (
                    <div
                      key={idx}
                      style={{
                        padding: '0.85rem',
                        borderRadius: '10px',
                        border: '1px solid ' + (srv.enabled === false ? 'rgba(239, 68, 68, 0.3)' : 'rgba(0,0,0,0.08)'),
                        backgroundColor: '#F8F8FA',
                        opacity: srv.enabled === false ? 0.7 : 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.65rem',
                      }}
                    >
                      {/* Header with Enable/Disable, Move, and Delete */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '0.45rem' }}>
                        <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#111113' }}>
                          Pillar #{idx + 1}: {srv.title || 'Untitled Pillar'}
                        </span>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          {/* Enable/Disable Toggle */}
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...homeData.services.items];
                              updated[idx] = { ...updated[idx], enabled: updated[idx].enabled === false ? true : false };
                              updateField(['services', 'items'], updated);
                              setToastMessage(updated[idx].enabled ? `✓ Pillar #${idx + 1} enabled` : `✕ Pillar #${idx + 1} disabled`);
                              setTimeout(() => setToastMessage(''), 3000);
                            }}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '3px',
                              padding: '2px 7px',
                              borderRadius: '4px',
                              border: 'none',
                              backgroundColor: srv.enabled === false ? '#FEE2E2' : '#ECFDF5',
                              color: srv.enabled === false ? '#DC2626' : '#047857',
                              fontSize: '0.7rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                            }}
                          >
                            {srv.enabled === false ? <EyeOff size={11} /> : <Eye size={11} />}
                            {srv.enabled === false ? 'Disabled' : 'Enabled'}
                          </button>

                          {/* Move Up */}
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => {
                              if (idx === 0) return;
                              const updated = [...homeData.services.items];
                              const temp = updated[idx];
                              updated[idx] = updated[idx - 1];
                              updated[idx - 1] = temp;
                              updateField(['services', 'items'], updated);
                            }}
                            style={{
                              border: '1px solid rgba(0,0,0,0.1)',
                              background: '#FFFFFF',
                              borderRadius: '4px',
                              padding: '2px 5px',
                              cursor: idx === 0 ? 'not-allowed' : 'pointer',
                              color: idx === 0 ? '#D4D4D8' : '#52525B',
                            }}
                          >
                            <ChevronUp size={13} />
                          </button>

                          {/* Move Down */}
                          <button
                            type="button"
                            disabled={idx === (homeData.services?.items?.length || 0) - 1}
                            onClick={() => {
                              if (idx === (homeData.services?.items?.length || 0) - 1) return;
                              const updated = [...homeData.services.items];
                              const temp = updated[idx];
                              updated[idx] = updated[idx + 1];
                              updated[idx + 1] = temp;
                              updateField(['services', 'items'], updated);
                            }}
                            style={{
                              border: '1px solid rgba(0,0,0,0.1)',
                              background: '#FFFFFF',
                              borderRadius: '4px',
                              padding: '2px 5px',
                              cursor: idx === (homeData.services?.items?.length || 0) - 1 ? 'not-allowed' : 'pointer',
                              color: idx === (homeData.services?.items?.length || 0) - 1 ? '#D4D4D8' : '#52525B',
                            }}
                          >
                            <ChevronDown size={13} />
                          </button>

                          {/* Delete Pillar */}
                          <button
                            type="button"
                            onClick={() => {
                              const deletedTitle = srv.title || `Pillar #${idx + 1}`;
                              const updated = (homeData.services?.items || []).filter((_: any, i: number) => i !== idx);
                              updateField(['services', 'items'], updated);
                              setToastMessage(`✓ ${deletedTitle} deleted successfully.`);
                              setTimeout(() => setToastMessage(''), 3500);
                            }}
                            style={{
                              border: '1px solid #FECACA',
                              background: '#FEF2F2',
                              borderRadius: '4px',
                              padding: '2px 6px',
                              cursor: 'pointer',
                              color: '#DC2626',
                              display: 'inline-flex',
                              alignItems: 'center',
                            }}
                            title="Delete this pillar"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '0.5rem' }}>
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                            <span style={{ fontSize: '0.68rem', color: '#71717A' }}>Number</span>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...homeData.services.items];
                                updated[idx] = { ...updated[idx], showNum: updated[idx].showNum === false ? true : false };
                                updateField(['services', 'items'], updated);
                              }}
                              style={{
                                fontSize: '0.65rem',
                                border: 'none',
                                background: 'transparent',
                                color: srv.showNum === false ? '#DC2626' : '#047857',
                                cursor: 'pointer',
                                fontWeight: 650,
                              }}
                            >
                              {srv.showNum === false ? 'Hidden' : 'Visible'}
                            </button>
                          </div>
                          <input
                            type="text"
                            value={srv.num || ''}
                            onChange={(e) => {
                              const updated = [...homeData.services.items];
                              updated[idx] = { ...updated[idx], num: e.target.value };
                              updateField(['services', 'items'], updated);
                            }}
                            style={{ ...inputStyle, padding: '0.35rem 0.55rem' }}
                          />
                        </div>
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                            <span style={{ fontSize: '0.68rem', color: '#71717A' }}>Title</span>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...homeData.services.items];
                                updated[idx] = { ...updated[idx], showTitle: updated[idx].showTitle === false ? true : false };
                                updateField(['services', 'items'], updated);
                              }}
                              style={{
                                fontSize: '0.65rem',
                                border: 'none',
                                background: 'transparent',
                                color: srv.showTitle === false ? '#DC2626' : '#047857',
                                cursor: 'pointer',
                                fontWeight: 650,
                              }}
                            >
                              {srv.showTitle === false ? 'Hidden' : 'Visible'}
                            </button>
                          </div>
                          <input
                            type="text"
                            value={srv.title || ''}
                            onChange={(e) => {
                              const updated = [...homeData.services.items];
                              updated[idx] = { ...updated[idx], title: e.target.value };
                              updateField(['services', 'items'], updated);
                            }}
                            style={{ ...inputStyle, padding: '0.35rem 0.55rem' }}
                          />
                        </div>
                      </div>

                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                          <span style={{ fontSize: '0.68rem', color: '#71717A' }}>Description</span>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...homeData.services.items];
                              updated[idx] = { ...updated[idx], showDescription: updated[idx].showDescription === false ? true : false };
                              updateField(['services', 'items'], updated);
                            }}
                            style={{
                              fontSize: '0.65rem',
                              border: 'none',
                              background: 'transparent',
                              color: srv.showDescription === false ? '#DC2626' : '#047857',
                              cursor: 'pointer',
                              fontWeight: 650,
                            }}
                          >
                            {srv.showDescription === false ? 'Hidden' : 'Visible'}
                          </button>
                        </div>
                        <textarea
                          rows={2}
                          value={srv.description || ''}
                          onChange={(e) => {
                            const updated = [...homeData.services.items];
                            updated[idx] = { ...updated[idx], description: e.target.value };
                            updateField(['services', 'items'], updated);
                          }}
                          style={{ ...inputStyle, padding: '0.35rem 0.55rem' }}
                        />
                      </div>

                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                          <span style={{ fontSize: '0.68rem', color: '#71717A' }}>Tags (comma-separated pills)</span>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...homeData.services.items];
                              updated[idx] = { ...updated[idx], showTags: updated[idx].showTags === false ? true : false };
                              updateField(['services', 'items'], updated);
                            }}
                            style={{
                              fontSize: '0.65rem',
                              border: 'none',
                              background: 'transparent',
                              color: srv.showTags === false ? '#DC2626' : '#047857',
                              cursor: 'pointer',
                              fontWeight: 650,
                            }}
                          >
                            {srv.showTags === false ? 'Hidden' : 'Visible'}
                          </button>
                        </div>
                        <input
                          type="text"
                          value={Array.isArray(srv.tags) ? srv.tags.join(', ') : (srv.tags || '')}
                          placeholder="e.g. Brand Strategy, Creative Direction, Platforms"
                          onChange={(e) => {
                            const updated = [...homeData.services.items];
                            updated[idx] = {
                              ...updated[idx],
                              tags: e.target.value.split(',').map((t: string) => t.trim()).filter(Boolean),
                            };
                            updateField(['services', 'items'], updated);
                          }}
                          style={{ ...inputStyle, padding: '0.35rem 0.55rem' }}
                        />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                            <span style={{ fontSize: '0.68rem', color: '#71717A' }}>Link / Anchor</span>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...homeData.services.items];
                                updated[idx] = { ...updated[idx], showHref: updated[idx].showHref === false ? true : false };
                                updateField(['services', 'items'], updated);
                              }}
                              style={{
                                fontSize: '0.65rem',
                                border: 'none',
                                background: 'transparent',
                                color: srv.showHref === false ? '#DC2626' : '#047857',
                                cursor: 'pointer',
                                fontWeight: 650,
                              }}
                            >
                              {srv.showHref === false ? 'Hidden' : 'Visible'}
                            </button>
                          </div>
                          <input
                            type="text"
                            value={srv.href || ''}
                            onChange={(e) => {
                              const updated = [...homeData.services.items];
                              updated[idx] = { ...updated[idx], href: e.target.value };
                              updateField(['services', 'items'], updated);
                            }}
                            style={{ ...inputStyle, padding: '0.35rem 0.55rem' }}
                          />
                        </div>
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                            <span style={{ fontSize: '0.68rem', color: '#71717A' }}>Cover Image</span>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...homeData.services.items];
                                updated[idx] = { ...updated[idx], showImage: updated[idx].showImage === false ? true : false };
                                updateField(['services', 'items'], updated);
                              }}
                              style={{
                                fontSize: '0.65rem',
                                border: 'none',
                                background: 'transparent',
                                color: srv.showImage === false ? '#DC2626' : '#047857',
                                cursor: 'pointer',
                                fontWeight: 650,
                              }}
                            >
                              {srv.showImage === false ? 'Hidden' : 'Visible'}
                            </button>
                          </div>
                          <div style={{ display: 'flex', gap: '0.35rem' }}>
                            <input
                              type="text"
                              value={srv.image || ''}
                              onChange={(e) => {
                                const updated = [...homeData.services.items];
                                updated[idx] = { ...updated[idx], image: e.target.value };
                                updateField(['services', 'items'], updated);
                              }}
                              style={{ ...inputStyle, padding: '0.35rem 0.55rem', flex: 1 }}
                            />
                            <button
                              type="button"
                              onClick={() => setMediaPickerTarget({ path: `services.items.${idx}.image`, type: 'image' })}
                              style={{ ...mediaBtnStyle, padding: '0 0.5rem', fontSize: '0.7rem' }}
                            >
                              Pick
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════
              SECTION 07: INTERACTIVE SIGNATURE CTA
             ════════════════════════════════════════════════════════════ */}
          {activeSectionId === 'cta' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 650, margin: 0, color: '#111113' }}>
                      07 Signature Last CTA Section
                    </h3>
                    <span style={{ fontSize: '0.7rem', backgroundColor: '#F0FDF4', color: '#16A34A', padding: '2px 7px', borderRadius: '4px', fontWeight: 600 }}>
                      Live Flow
                    </span>
                  </div>

                  {/* Section Enable/Disable toggle */}
                  <button
                    type="button"
                    onClick={toggleCtaSection}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '0.4rem 0.85rem',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: homeData.cta?.enabled === false ? '#FEE2E2' : '#ECFDF5',
                      color: homeData.cta?.enabled === false ? '#DC2626' : '#047857',
                      fontSize: '0.76rem',
                      fontWeight: 650,
                      cursor: 'pointer',
                    }}
                  >
                    {homeData.cta?.enabled === false ? <EyeOff size={14} /> : <Eye size={14} />}
                    {homeData.cta?.enabled === false ? 'Section Hidden' : 'Section Active'}
                  </button>
                </div>
                <p style={{ fontSize: '0.78rem', color: '#71717A', margin: '0.2rem 0 0 0' }}>
                  Control the closing CTA section, background image, copy, links, and element visibility.
                </p>
              </div>

              {/* ── MOUSE HOVER TRAIL IMAGES (SIGNATURE CURSOR EFFECT) ── */}
              <div style={{ padding: '1.15rem', backgroundColor: '#F8F8FA', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#111113', letterSpacing: '0.02em' }}>
                        MOUSE HOVER TRAIL IMAGES (SIGNATURE EFFECT)
                      </span>
                      <span style={{ fontSize: '0.68rem', backgroundColor: '#EFF6FF', color: '#1D4ED8', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>
                        Cursor Hover
                      </span>
                    </div>
                    <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.72rem', color: '#71717A' }}>
                      Select images displayed in floating cards as visitors move their mouse across the Last CTA section.
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => {
                        const cur = homeData.cta?.hoverImagesEnabled !== false;
                        updateField(['cta', 'hoverImagesEnabled'], !cur);
                        setToastMessage(cur ? '✕ Cursor hover effect disabled' : '✓ Cursor hover effect enabled');
                        setTimeout(() => setToastMessage(''), 3500);
                      }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 9px',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: homeData.cta?.hoverImagesEnabled === false ? '#FEE2E2' : '#ECFDF5',
                        color: homeData.cta?.hoverImagesEnabled === false ? '#DC2626' : '#047857',
                        fontSize: '0.72rem',
                        fontWeight: 650,
                        cursor: 'pointer',
                      }}
                    >
                      {homeData.cta?.hoverImagesEnabled === false ? <EyeOff size={12} /> : <Eye size={12} />}
                      {homeData.cta?.hoverImagesEnabled === false ? 'Hover Trail Disabled' : 'Hover Trail Active'}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const defaultSeven = [
                          { id: '1', image: '/images/case-studies/raysons/casting-hero.jpg', title: 'Raysons Group', enabled: true },
                          { id: '2', image: '/images/case-studies/loom/loom-hero.jpg', title: 'Loom Crafts', enabled: true },
                          { id: '3', image: '/images/case-studies/picturetime/picturetime-hero.jpg', title: 'PictureTime', enabled: true },
                          { id: '4', image: '/images/case-studies/she/she-hero.jpg', title: 'Project SHE', enabled: true },
                          { id: '5', image: '/images/case-studies/misu/misu-hero.jpg', title: 'Misu Dining', enabled: true },
                          { id: '6', image: '/images/case-studies/rrskins/rrskins-hero.jpg', title: 'RR Skins', enabled: true },
                          { id: '7', image: '/images/tourin/tourin-hero.jpg', title: 'Tourin Expeditions', enabled: true },
                        ];
                        const currentList = Array.isArray(homeData.cta?.hoverImages) && homeData.cta.hoverImages.length > 0
                          ? [...homeData.cta.hoverImages]
                          : defaultSeven;
                        const newItem = {
                          id: String(Date.now()),
                          image: '/images/case-studies/raysons/neora-1.jpg',
                          title: `Hover Card 0${currentList.length + 1}`,
                          enabled: true,
                        };
                        const updated = [...currentList, newItem];
                        updateField(['cta', 'hoverImages'], updated);
                        setToastMessage('✓ New hover image added to CTA trail');
                        setTimeout(() => setToastMessage(''), 3500);
                      }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        border: '1px solid rgba(0,0,0,0.12)',
                        backgroundColor: '#FFFFFF',
                        color: '#111113',
                        fontSize: '0.72rem',
                        fontWeight: 650,
                        cursor: 'pointer',
                      }}
                    >
                      <Plus size={12} /> Add Hover Image
                    </button>
                  </div>
                </div>

                {/* Hover Images List */}
                {(() => {
                  const defaultSeven = [
                    { id: '1', image: '/images/case-studies/raysons/casting-hero.jpg', title: 'Raysons Group', enabled: true },
                    { id: '2', image: '/images/case-studies/loom/loom-hero.jpg', title: 'Loom Crafts', enabled: true },
                    { id: '3', image: '/images/case-studies/picturetime/picturetime-hero.jpg', title: 'PictureTime', enabled: true },
                    { id: '4', image: '/images/case-studies/she/she-hero.jpg', title: 'Project SHE', enabled: true },
                    { id: '5', image: '/images/case-studies/misu/misu-hero.jpg', title: 'Misu Dining', enabled: true },
                    { id: '6', image: '/images/case-studies/rrskins/rrskins-hero.jpg', title: 'RR Skins', enabled: true },
                    { id: '7', image: '/images/tourin/tourin-hero.jpg', title: 'Tourin Expeditions', enabled: true },
                  ];
                  const rawList = homeData.cta?.hoverImages;
                  const list = (Array.isArray(rawList) && rawList.length > 0)
                    ? rawList
                    : defaultSeven;

                  return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                      {list.map((item: any, idx: number) => {
                        const imgUrl = typeof item === 'string' ? item : item.image;
                        const isItemEnabled = typeof item === 'object' ? item.enabled !== false : true;
                        const itemTitle = typeof item === 'object' ? item.title || `Hover Card 0${idx + 1}` : `Hover Card 0${idx + 1}`;

                        return (
                          <div
                            key={item.id || idx}
                            style={{
                              display: 'grid',
                              gridTemplateColumns: '70px 1fr auto',
                              gap: '0.75rem',
                              alignItems: 'center',
                              padding: '0.65rem 0.75rem',
                              borderRadius: '8px',
                              backgroundColor: '#FFFFFF',
                              border: isItemEnabled ? '1px solid rgba(0,0,0,0.08)' : '1px solid #FECACA',
                              opacity: isItemEnabled ? 1 : 0.6,
                            }}
                          >
                            {/* Thumbnail Preview */}
                            <div
                              style={{
                                width: '70px',
                                height: '48px',
                                borderRadius: '5px',
                                overflow: 'hidden',
                                backgroundColor: '#111113',
                                position: 'relative',
                                border: '1px solid rgba(0,0,0,0.1)',
                              }}
                            >
                              {imgUrl ? (
                                <img
                                  src={imgUrl}
                                  alt={itemTitle}
                                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                              ) : (
                                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#71717A' }}>
                                  <ImageIcon size={16} />
                                </div>
                              )}
                            </div>

                            {/* Inputs: URL & Title */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                              <div style={{ display: 'flex', gap: '0.4rem' }}>
                                <input
                                  type="text"
                                  value={imgUrl || ''}
                                  placeholder="/images/case-studies/..."
                                  onChange={(e) => {
                                    const next = [...list];
                                    if (typeof next[idx] === 'object') {
                                      next[idx] = { ...next[idx], image: e.target.value };
                                    } else {
                                      next[idx] = { id: String(Date.now()), image: e.target.value, enabled: true };
                                    }
                                    updateField(['cta', 'hoverImages'], next);
                                  }}
                                  style={{ ...inputStyle, padding: '0.35rem 0.55rem', fontSize: '0.76rem', flex: 1 }}
                                />
                                <button
                                  type="button"
                                  onClick={() => setMediaPickerTarget({ path: `cta.hoverImages.${idx}.image`, type: 'image' })}
                                  style={mediaBtnStyle}
                                >
                                  <ImageIcon size={12} /> {imgUrl ? 'Replace' : 'Upload / Pick'}
                                </button>
                              </div>
                              <input
                                type="text"
                                value={itemTitle}
                                placeholder="Card description or project name"
                                onChange={(e) => {
                                  const next = [...list];
                                  if (typeof next[idx] === 'object') {
                                    next[idx] = { ...next[idx], title: e.target.value };
                                  } else {
                                    next[idx] = { id: String(Date.now()), image: imgUrl, title: e.target.value, enabled: true };
                                  }
                                  updateField(['cta', 'hoverImages'], next);
                                }}
                                style={{ ...inputStyle, padding: '0.3rem 0.55rem', fontSize: '0.72rem', color: '#71717A' }}
                              />
                            </div>

                            {/* Action Buttons: Enable/Disable & Delete */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                              <button
                                type="button"
                                title={isItemEnabled ? 'Disable this hover card' : 'Enable this hover card'}
                                onClick={() => {
                                  const next = [...list];
                                  if (typeof next[idx] === 'object') {
                                    next[idx] = { ...next[idx], enabled: !isItemEnabled };
                                  } else {
                                    next[idx] = { id: String(Date.now()), image: imgUrl, enabled: !isItemEnabled };
                                  }
                                  updateField(['cta', 'hoverImages'], next);
                                  setToastMessage(isItemEnabled ? `✕ Card 0${idx + 1} disabled` : `✓ Card 0${idx + 1} enabled`);
                                  setTimeout(() => setToastMessage(''), 3500);
                                }}
                                style={{
                                  padding: '0.35rem',
                                  borderRadius: '5px',
                                  border: '1px solid rgba(0,0,0,0.1)',
                                  backgroundColor: isItemEnabled ? '#F4F4F5' : '#FEE2E2',
                                  color: isItemEnabled ? '#52525B' : '#DC2626',
                                  cursor: 'pointer',
                                }}
                              >
                                {isItemEnabled ? <Eye size={13} /> : <EyeOff size={13} />}
                              </button>

                              <button
                                type="button"
                                title="Delete this hover image"
                                onClick={() => {
                                  const next = list.filter((_: any, i: number) => i !== idx);
                                  updateField(['cta', 'hoverImages'], next);
                                  setToastMessage('✓ Hover image deleted');
                                  setTimeout(() => setToastMessage(''), 3500);
                                }}
                                style={{
                                  padding: '0.35rem',
                                  borderRadius: '5px',
                                  border: '1px solid #FECACA',
                                  backgroundColor: '#FEF2F2',
                                  color: '#DC2626',
                                  cursor: 'pointer',
                                }}
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>

              {/* Eyebrow with Enable/Disable */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>
                    EYEBROW
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const cur = homeData.cta?.showEyebrow !== false;
                      updateField(['cta', 'showEyebrow'], !cur);
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '2px 7px',
                      borderRadius: '4px',
                      border: 'none',
                      backgroundColor: homeData.cta?.showEyebrow === false ? '#FEE2E2' : '#ECFDF5',
                      color: homeData.cta?.showEyebrow === false ? '#DC2626' : '#047857',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {homeData.cta?.showEyebrow === false ? <EyeOff size={11} /> : <Eye size={11} />}
                    {homeData.cta?.showEyebrow === false ? 'Eyebrow Hidden' : 'Eyebrow Visible'}
                  </button>
                </div>
                <input
                  type="text"
                  value={homeData.cta?.eyebrow || ''}
                  onChange={(e) => updateField(['cta', 'eyebrow'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              {/* Headline with Enable/Disable */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>
                    MAIN HEADLINE
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const cur = homeData.cta?.showHeadline !== false;
                      updateField(['cta', 'showHeadline'], !cur);
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '2px 7px',
                      borderRadius: '4px',
                      border: 'none',
                      backgroundColor: homeData.cta?.showHeadline === false ? '#FEE2E2' : '#ECFDF5',
                      color: homeData.cta?.showHeadline === false ? '#DC2626' : '#047857',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {homeData.cta?.showHeadline === false ? <EyeOff size={11} /> : <Eye size={11} />}
                    {homeData.cta?.showHeadline === false ? 'Headline Hidden' : 'Headline Visible'}
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={homeData.cta?.headline || ''}
                  onChange={(e) => updateField(['cta', 'headline'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              {/* Description with Enable/Disable */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>
                    SUBTITLE / SUPPORTING COPY
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const cur = homeData.cta?.showDescription !== false;
                      updateField(['cta', 'showDescription'], !cur);
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '2px 7px',
                      borderRadius: '4px',
                      border: 'none',
                      backgroundColor: homeData.cta?.showDescription === false ? '#FEE2E2' : '#ECFDF5',
                      color: homeData.cta?.showDescription === false ? '#DC2626' : '#047857',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {homeData.cta?.showDescription === false ? <EyeOff size={11} /> : <Eye size={11} />}
                    {homeData.cta?.showDescription === false ? 'Copy Hidden' : 'Copy Visible'}
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={homeData.cta?.description || ''}
                  onChange={(e) => updateField(['cta', 'description'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              {/* Button with Enable/Disable */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>
                    ACTION BUTTON
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const cur = homeData.cta?.showButton !== false;
                      updateField(['cta', 'showButton'], !cur);
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '2px 7px',
                      borderRadius: '4px',
                      border: 'none',
                      backgroundColor: homeData.cta?.showButton === false ? '#FEE2E2' : '#ECFDF5',
                      color: homeData.cta?.showButton === false ? '#DC2626' : '#047857',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {homeData.cta?.showButton === false ? <EyeOff size={11} /> : <Eye size={11} />}
                    {homeData.cta?.showButton === false ? 'Button Hidden' : 'Button Visible'}
                  </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                  <div>
                    <span style={{ fontSize: '0.68rem', color: '#71717A', display: 'block', marginBottom: '0.2rem' }}>Button Label</span>
                    <input
                      type="text"
                      value={homeData.cta?.buttonLabel || ''}
                      onChange={(e) => updateField(['cta', 'buttonLabel'], e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.68rem', color: '#71717A', display: 'block', marginBottom: '0.2rem' }}>Destination Link</span>
                    <input
                      type="text"
                      value={homeData.cta?.buttonLink || ''}
                      onChange={(e) => updateField(['cta', 'buttonLink'], e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>

              {/* Direct Inquiry Email with Enable/Disable */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>
                    DIRECT INQUIRY EMAIL ADDRESS
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const cur = homeData.cta?.showEmail !== false;
                      updateField(['cta', 'showEmail'], !cur);
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '2px 7px',
                      borderRadius: '4px',
                      border: 'none',
                      backgroundColor: homeData.cta?.showEmail === false ? '#FEE2E2' : '#ECFDF5',
                      color: homeData.cta?.showEmail === false ? '#DC2626' : '#047857',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {homeData.cta?.showEmail === false ? <EyeOff size={11} /> : <Eye size={11} />}
                    {homeData.cta?.showEmail === false ? 'Email Hidden' : 'Email Visible'}
                  </button>
                </div>
                <input
                  type="email"
                  value={homeData.cta?.email || ''}
                  onChange={(e) => updateField(['cta', 'email'], e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════
              SECTION: ORDER & VISIBILITY
             ════════════════════════════════════════════════════════════ */}
          {activeSectionId === 'order' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 650, margin: 0, color: '#111113' }}>
                  Section Sequence &amp; Visibility Controls
                </h3>
                <p style={{ fontSize: '0.78rem', color: '#71717A', margin: '0.2rem 0 0 0' }}>
                  Reorder or toggle visibility for each of the 7 live homepage sections. Live preview updates instantly.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {(homeData.sections || [])
                  .filter((sec: any) => !['impact', 'montage', 'tourin'].includes(sec.id))
                  .map((sec: any, idx: number, arr: any[]) => (
                  <div
                    key={sec.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem 1rem',
                      borderRadius: '10px',
                      backgroundColor: sec.visible ? '#FFFFFF' : '#FAFAFA',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                      opacity: sec.visible ? 1 : 0.6,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => moveSection(idx, 'up')}
                          style={{ border: 'none', background: 'transparent', cursor: idx === 0 ? 'not-allowed' : 'pointer', padding: 0 }}
                        >
                          <ChevronUp size={14} color={idx === 0 ? '#D4D4D8' : '#71717A'} />
                        </button>
                        <button
                          type="button"
                          disabled={idx === arr.length - 1}
                          onClick={() => moveSection(idx, 'down')}
                          style={{ border: 'none', background: 'transparent', cursor: idx === arr.length - 1 ? 'not-allowed' : 'pointer', padding: 0 }}
                        >
                          <ChevronDown size={14} color={idx === arr.length - 1 ? '#D4D4D8' : '#71717A'} />
                        </button>
                      </div>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#71717A', width: '22px' }}>
                        0{idx + 1}
                      </span>
                      <div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#111113' }}>
                          {sec.name}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#A1A1AA' }}>
                          ID: {sec.id} &bull; Type: {sec.type}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSectionVisibility(sec.id)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        padding: '0.35rem 0.75rem',
                        borderRadius: '9999px',
                        border: '1px solid rgba(0, 0, 0, 0.1)',
                        backgroundColor: sec.visible ? '#FFFFFF' : '#F4F4F5',
                        color: sec.visible ? '#16A34A' : '#71717A',
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {sec.visible ? <Eye size={13} /> : <EyeOff size={13} />}
                      {sec.visible ? 'Visible' : 'Hidden'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─── RIGHT COLUMN: REAL-TIME LIVE PREVIEW ─── */}
      <div style={{ height: '100%' }}>
        <LivePreviewPanel previewUrl="/" />
      </div>

      {/* Media Picker Modal */}
      {(mediaPickerTarget || brandLogoIndex !== null || heroSlideIndex !== null) && (
        <MediaPickerModal
          isOpen={true}
          onClose={() => {
            setMediaPickerTarget(null);
            setBrandLogoIndex(null);
            setHeroSlideIndex(null);
          }}
          mediaType={mediaPickerTarget?.type || 'image'}
          initialUrl={
            heroSlideIndex !== null
              ? homeData.hero?.bannerImages?.[heroSlideIndex]?.image || ''
              : brandLogoIndex !== null
              ? homeData.brands?.list?.[brandLogoIndex]?.logo || ''
              : mediaPickerTarget
              ? mediaPickerTarget.path.split('.').reduce((acc: any, key: string) => acc?.[key], homeData) || ''
              : ''
          }
          onSelect={(url) => {
            if (heroSlideIndex !== null) {
              const currentSlides = Array.isArray(homeData.hero?.bannerImages) && homeData.hero.bannerImages.length > 0
                ? [...homeData.hero.bannerImages]
                : [{ id: 'slide-1', image: homeData.hero?.bannerImage || '', caption: '' }];
              if (currentSlides[heroSlideIndex]) {
                currentSlides[heroSlideIndex] = {
                  ...currentSlides[heroSlideIndex],
                  image: url,
                };
              } else {
                currentSlides.push({ id: `slide-${Date.now()}`, image: url, caption: '' });
              }
              updateField(['hero', 'bannerImages'], currentSlides);
              if (heroSlideIndex === 0) {
                updateField(['hero', 'bannerImage'], url);
                updateField(['hero', 'posterImage'], url);
              }
              setHeroSlideIndex(null);
            } else if (brandLogoIndex !== null) {
              const updated = [...(homeData.brands?.list || [])];
              updated[brandLogoIndex] = { ...updated[brandLogoIndex], logo: url };
              updateField(['brands', 'list'], updated);
              setBrandLogoIndex(null);
            } else if (mediaPickerTarget) {
              const parts = mediaPickerTarget.path.split('.');
              updateField(parts, url);
              setMediaPickerTarget(null);
            }
          }}
        />
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.55rem 0.85rem',
  borderRadius: '8px',
  border: '1px solid rgba(0, 0, 0, 0.12)',
  fontSize: '0.85rem',
  outline: 'none',
  fontFamily: 'inherit',
};

const mediaBtnStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.35rem',
  padding: '0 0.85rem',
  borderRadius: '8px',
  backgroundColor: '#111113',
  color: '#FFFFFF',
  border: 'none',
  fontSize: '0.78rem',
  fontWeight: 600,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
};
