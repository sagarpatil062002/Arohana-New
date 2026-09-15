'use client';

import React, { useState, useEffect } from 'react';
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
} from 'lucide-react';

export default function AdminHomePage() {
  const { content, saveDraft, updateDraftInMemory } = useCmsContent();
  const [homeData, setHomeData] = useState<any>(null);
  const [activeSectionId, setActiveSectionId] = useState<string>('hero');
  const [mediaPickerTarget, setMediaPickerTarget] = useState<{ path: string; type?: 'image' | 'video' } | null>(null);
  const [brandLogoIndex, setBrandLogoIndex] = useState<number | null>(null);
  const [savedStatus, setSavedStatus] = useState(false);

  useEffect(() => {
    if (content.home) {
      setHomeData(JSON.parse(JSON.stringify(content.home)));
    }
  }, [content.home]);

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

  const handleSectionVisibility = (id: string) => {
    const updatedSections = (homeData.sections || []).map((sec: any) =>
      sec.id === id ? { ...sec, visible: !sec.visible } : sec
    );
    const updated = { ...homeData, sections: updatedSections };
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

  const handleSave = async () => {
    const ok = await saveDraft('home', homeData);
    if (ok) {
      setSavedStatus(true);
      setTimeout(() => setSavedStatus(false), 2200);
    }
  };

  const sectionTabs = [
    { id: 'hero', label: '01 Hero Section', icon: Sparkles, isLive: true },
    { id: 'army', label: '02 Army Spotlight', icon: Shield, isLive: true },
    { id: 'pov', label: '03 Point of View', icon: Quote, isLive: true },
    { id: 'work', label: '04 Selected Work', icon: Briefcase, isLive: true },
    { id: 'services', label: '05 Capabilities & Numbers', icon: FileText, isLive: true },
    { id: 'brands', label: '06 Brands Marquee', icon: Layers, isLive: true },
    { id: 'cta', label: '07 Signature CTA', icon: Send, isLive: true },
    { id: 'order', label: 'Order & Visibility', icon: GripVertical, isLive: true },
    { id: 'impact', label: 'Archive: Impact', icon: Sliders, isLive: false },
    { id: 'montage', label: 'Archive: Montage', icon: LayoutGrid, isLive: false },
    { id: 'tourin', label: 'Archive: Tourin', icon: Compass, isLive: false },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.08fr 0.92fr', gap: '1.5rem', height: 'calc(100vh - 120px)' }}>
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
          <button
            type="button"
            onClick={handleSave}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.5rem 1.25rem',
              borderRadius: '9999px',
              border: 'none',
              backgroundColor: savedStatus ? '#16A34A' : '#111113',
              color: '#FFFFFF',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {savedStatus ? <Check size={15} /> : <Save size={15} />}
            {savedStatus ? 'Saved Draft' : 'Save Changes'}
          </button>
        </div>

        {/* Section Navigation Tabs (Horizontal Pill Selector) */}
        <div
          style={{
            display: 'flex',
            gap: '0.4rem',
            padding: '0.65rem 1rem',
            borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
            backgroundColor: '#FFFFFF',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
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

        {/* Scrollable Section Form Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.4rem' }}>
          {/* ════════════════════════════════════════════════════════════
              SECTION 01: HERO
             ════════════════════════════════════════════════════════════ */}
          {activeSectionId === 'hero' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 650, margin: 0, color: '#111113' }}>
                  Hero Section Video &amp; Messaging
                </h3>
                <p style={{ fontSize: '0.78rem', color: '#71717A', margin: '0.2rem 0 0 0' }}>
                  Controls the primary above-the-fold carousel, badges, headlines, and call-to-actions.
                </p>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  EYEBROW BADGE / TAG
                </label>
                <input
                  type="text"
                  value={homeData.hero?.badge || ''}
                  onChange={(e) => updateField(['hero', 'badge'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  MAIN HEADLINE (Use Enter for line breaks)
                </label>
                <textarea
                  rows={3}
                  value={homeData.hero?.headline || ''}
                  onChange={(e) => updateField(['hero', 'headline'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  SUBHEADLINE / INTRO STATEMENT
                </label>
                <textarea
                  rows={3}
                  value={homeData.hero?.subheadline || ''}
                  onChange={(e) => updateField(['hero', 'subheadline'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                    PRIMARY CTA TEXT
                  </label>
                  <input
                    type="text"
                    value={homeData.hero?.ctaLabel || ''}
                    onChange={(e) => updateField(['hero', 'ctaLabel'], e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                    PRIMARY CTA LINK
                  </label>
                  <input
                    type="text"
                    value={homeData.hero?.ctaLink || ''}
                    onChange={(e) => updateField(['hero', 'ctaLink'], e.target.value)}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                    SECONDARY CTA TEXT
                  </label>
                  <input
                    type="text"
                    value={homeData.hero?.secondaryCtaLabel || ''}
                    onChange={(e) => updateField(['hero', 'secondaryCtaLabel'], e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                    SECONDARY CTA LINK
                  </label>
                  <input
                    type="text"
                    value={homeData.hero?.secondaryCtaLink || ''}
                    onChange={(e) => updateField(['hero', 'secondaryCtaLink'], e.target.value)}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  HERO POSTER / BACKGROUND IMAGE
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    value={homeData.hero?.posterImage || ''}
                    onChange={(e) => updateField(['hero', 'posterImage'], e.target.value)}
                    style={{ ...inputStyle, flex: 1 }}
                  />
                  <button
                    type="button"
                    onClick={() => setMediaPickerTarget({ path: 'hero.posterImage', type: 'image' })}
                    style={mediaBtnStyle}
                  >
                    <ImageIcon size={14} /> Pick Image
                  </button>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  SHOWREEL VIDEO URL / FILE
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    value={homeData.hero?.videoUrl || ''}
                    onChange={(e) => updateField(['hero', 'videoUrl'], e.target.value)}
                    style={{ ...inputStyle, flex: 1 }}
                  />
                  <button
                    type="button"
                    onClick={() => setMediaPickerTarget({ path: 'hero.videoUrl', type: 'video' })}
                    style={mediaBtnStyle}
                  >
                    Pick Video
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════
              SECTION 06: SELECTED BRANDS & ORGANISATIONS MARQUEE
             ════════════════════════════════════════════════════════════ */}
          {activeSectionId === 'brands' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
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

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  SECTION EYEBROW
                </label>
                <input
                  type="text"
                  value={homeData.brands?.eyebrow || ''}
                  onChange={(e) => updateField(['brands', 'eyebrow'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  SECTION HEADING
                </label>
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
                        name: 'New Partner',
                        monogram: 'NP',
                        badgeBg: '#111113',
                        badgeColor: '#ffffff',
                        link: '/work',
                      });
                      updateField(['brands', 'list'], newList);
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

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {(homeData.brands?.list || []).map((brand: any, idx: number) => (
                    <div
                      key={brand.id || idx}
                      style={{
                        padding: '1rem',
                        borderRadius: '12px',
                        border: '1px solid rgba(0,0,0,0.08)',
                        backgroundColor: '#F8F8FA',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.85rem',
                      }}
                    >
                      {/* Top Row: Name, Monogram, Link, Delete */}
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1.2fr 0.8fr 1fr 36px',
                          gap: '0.65rem',
                          alignItems: 'center',
                        }}
                      >
                        <div>
                          <span style={{ fontSize: '0.68rem', fontWeight: 600, color: '#71717A', display: 'block', marginBottom: '0.2rem' }}>
                            BRAND NAME
                          </span>
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
                          <span style={{ fontSize: '0.68rem', fontWeight: 600, color: '#71717A', display: 'block', marginBottom: '0.2rem' }}>
                            MONOGRAM (FALLBACK)
                          </span>
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
                          <span style={{ fontSize: '0.68rem', fontWeight: 600, color: '#71717A', display: 'block', marginBottom: '0.2rem' }}>
                            TARGET LINK
                          </span>
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
                        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '0.85rem' }}>
                          <button
                            type="button"
                            title="Delete brand"
                            onClick={() => {
                              const updated = homeData.brands.list.filter((_: any, i: number) => i !== idx);
                              updateField(['brands', 'list'], updated);
                            }}
                            style={{
                              height: '32px',
                              width: '32px',
                              border: 'none',
                              backgroundColor: 'transparent',
                              color: '#EF4444',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: '6px',
                            }}
                          >
                            <Trash2 size={15} />
                          </button>
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

                        {/* Logo URL Input & Actions */}
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
                          {brand.logo && (
                            <button
                              type="button"
                              title="Remove logo (use monogram)"
                              onClick={() => {
                                const updated = [...homeData.brands.list];
                                const { logo, ...rest } = updated[idx];
                                updated[idx] = rest;
                                updateField(['brands', 'list'], updated);
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
              ARCHIVE: REAL-WORLD IMPACT COUNTERS
             ════════════════════════════════════════════════════════════ */}
          {activeSectionId === 'impact' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 650, margin: 0, color: '#111113' }}>
                    Impact Counters (Archived Standalone / Integrated in Capabilities)
                  </h3>
                  <span style={{ fontSize: '0.7rem', backgroundColor: '#F4F4F5', color: '#71717A', padding: '2px 7px', borderRadius: '4px', fontWeight: 600 }}>
                    Archived Standalone
                  </span>
                </div>
                <p style={{ fontSize: '0.78rem', color: '#71717A', margin: '0.2rem 0 0 0' }}>
                  These 4 counters are now active directly inside Section 05 (Capabilities &amp; Numbers). Editing them here or in Section 05 updates them.
                </p>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  SECTION EYEBROW
                </label>
                <input
                  type="text"
                  value={homeData.impactStats?.eyebrow || ''}
                  onChange={(e) => updateField(['impactStats', 'eyebrow'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  SECTION HEADING
                </label>
                <input
                  type="text"
                  value={homeData.impactStats?.heading || ''}
                  onChange={(e) => updateField(['impactStats', 'heading'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  SECTION SUBTITLE
                </label>
                <input
                  type="text"
                  value={homeData.impactStats?.subtitle || ''}
                  onChange={(e) => updateField(['impactStats', 'subtitle'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.65rem' }}>
                  THE 4 STAT COUNTERS
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {(homeData.impactStats?.counters || []).map((cnt: any, idx: number) => (
                    <div
                      key={cnt.id || idx}
                      style={{
                        padding: '1rem',
                        borderRadius: '10px',
                        border: '1px solid rgba(0,0,0,0.08)',
                        backgroundColor: '#F8F8FA',
                      }}
                    >
                      <div style={{ display: 'grid', gridTemplateColumns: '100px 100px 1fr', gap: '0.75rem', marginBottom: '0.65rem' }}>
                        <div>
                          <span style={{ fontSize: '0.68rem', color: '#71717A', display: 'block' }}>Number</span>
                          <input
                            type="number"
                            value={cnt.target || 0}
                            onChange={(e) => {
                              const updated = [...homeData.impactStats.counters];
                              updated[idx] = { ...updated[idx], target: parseInt(e.target.value) || 0 };
                              updateField(['impactStats', 'counters'], updated);
                            }}
                            style={{ ...inputStyle, padding: '0.35rem 0.55rem' }}
                          />
                        </div>
                        <div>
                          <span style={{ fontSize: '0.68rem', color: '#71717A', display: 'block' }}>Suffix (+, k)</span>
                          <input
                            type="text"
                            value={cnt.suffix || ''}
                            onChange={(e) => {
                              const updated = [...homeData.impactStats.counters];
                              updated[idx] = { ...updated[idx], suffix: e.target.value };
                              updateField(['impactStats', 'counters'], updated);
                            }}
                            style={{ ...inputStyle, padding: '0.35rem 0.55rem' }}
                          />
                        </div>
                        <div>
                          <span style={{ fontSize: '0.68rem', color: '#71717A', display: 'block' }}>Title / Metric</span>
                          <input
                            type="text"
                            value={cnt.title || ''}
                            onChange={(e) => {
                              const updated = [...homeData.impactStats.counters];
                              updated[idx] = { ...updated[idx], title: e.target.value };
                              updateField(['impactStats', 'counters'], updated);
                            }}
                            style={{ ...inputStyle, padding: '0.35rem 0.55rem' }}
                          />
                        </div>
                      </div>

                      <div>
                        <span style={{ fontSize: '0.68rem', color: '#71717A', display: 'block' }}>Description</span>
                        <input
                          type="text"
                          value={cnt.desc || ''}
                          onChange={(e) => {
                            const updated = [...homeData.impactStats.counters];
                            updated[idx] = { ...updated[idx], desc: e.target.value };
                            updateField(['impactStats', 'counters'], updated);
                          }}
                          style={{ ...inputStyle, padding: '0.35rem 0.55rem' }}
                        />
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
              <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 650, margin: 0, color: '#111113' }}>
                    02 Indian Army Projects Spotlight
                  </h3>
                  <span style={{ fontSize: '0.7rem', backgroundColor: '#F0FDF4', color: '#16A34A', padding: '2px 7px', borderRadius: '4px', fontWeight: 600 }}>
                    Live Flow
                  </span>
                </div>
                <p style={{ fontSize: '0.78rem', color: '#71717A', margin: '0.2rem 0 0 0' }}>
                  Showcase of defence briefs, authentic imagery and verified credentials in clean editorial presentation.
                </p>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  EYEBROW TAG
                </label>
                <input
                  type="text"
                  value={homeData.armySpotlight?.eyebrow || ''}
                  onChange={(e) => updateField(['armySpotlight', 'eyebrow'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  HEADLINE
                </label>
                <input
                  type="text"
                  value={homeData.armySpotlight?.title || ''}
                  onChange={(e) => updateField(['armySpotlight', 'title'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  DESCRIPTION
                </label>
                <textarea
                  rows={2}
                  value={homeData.armySpotlight?.description || ''}
                  onChange={(e) => updateField(['armySpotlight', 'description'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.65rem' }}>
                  ARMY CAROUSEL CARDS ({homeData.armySpotlight?.cards?.length || 0})
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {(homeData.armySpotlight?.cards || []).map((card: any, idx: number) => (
                    <div
                      key={card.id || idx}
                      style={{
                        padding: '0.85rem',
                        borderRadius: '10px',
                        border: '1px solid rgba(0,0,0,0.08)',
                        backgroundColor: '#F8F8FA',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                      }}
                    >
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                        <div>
                          <span style={{ fontSize: '0.68rem', color: '#71717A' }}>Category</span>
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
                          <span style={{ fontSize: '0.68rem', color: '#71717A' }}>Title</span>
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
                          <span style={{ fontSize: '0.68rem', color: '#71717A' }}>Location / Formations</span>
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
                          <span style={{ fontSize: '0.68rem', color: '#71717A' }}>Image Path</span>
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
              <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
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

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  EYEBROW
                </label>
                <input
                  type="text"
                  value={homeData.pov?.eyebrow || ''}
                  onChange={(e) => updateField(['pov', 'eyebrow'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  MAIN EDITORIAL HEADLINE
                </label>
                <textarea
                  rows={2}
                  value={homeData.pov?.headline || ''}
                  onChange={(e) => updateField(['pov', 'headline'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  PARAGRAPH 1 (Core statement)
                </label>
                <textarea
                  rows={3}
                  value={homeData.pov?.paragraph1 || ''}
                  onChange={(e) => updateField(['pov', 'paragraph1'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  PARAGRAPH 2 (Execution breadth)
                </label>
                <textarea
                  rows={3}
                  value={homeData.pov?.paragraph2 || ''}
                  onChange={(e) => updateField(['pov', 'paragraph2'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                    BUTTON 1 LABEL
                  </label>
                  <input
                    type="text"
                    value={homeData.pov?.btnPrimaryText || ''}
                    onChange={(e) => updateField(['pov', 'btnPrimaryText'], e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                    BUTTON 1 LINK
                  </label>
                  <input
                    type="text"
                    value={homeData.pov?.btnPrimaryLink || ''}
                    onChange={(e) => updateField(['pov', 'btnPrimaryLink'], e.target.value)}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                    BUTTON 2 LABEL
                  </label>
                  <input
                    type="text"
                    value={homeData.pov?.btnSecondaryText || ''}
                    onChange={(e) => updateField(['pov', 'btnSecondaryText'], e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                    BUTTON 2 LINK
                  </label>
                  <input
                    type="text"
                    value={homeData.pov?.btnSecondaryLink || ''}
                    onChange={(e) => updateField(['pov', 'btnSecondaryLink'], e.target.value)}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  FOUNDER QUOTE
                </label>
                <input
                  type="text"
                  value={homeData.pov?.quote || ''}
                  onChange={(e) => updateField(['pov', 'quote'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  QUOTE ATTRIBUTION
                </label>
                <input
                  type="text"
                  value={homeData.pov?.attribution || ''}
                  onChange={(e) => updateField(['pov', 'attribution'], e.target.value)}
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
              <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 650, margin: 0, color: '#111113' }}>
                    04 Selected Work 3D Coverflow Showcase
                  </h3>
                  <span style={{ fontSize: '0.7rem', backgroundColor: '#F0FDF4', color: '#16A34A', padding: '2px 7px', borderRadius: '4px', fontWeight: 600 }}>
                    Live Flow
                  </span>
                </div>
                <p style={{ fontSize: '0.78rem', color: '#71717A', margin: '0.2rem 0 0 0' }}>
                  The work is the proof: featured case study cards displayed on the homepage.
                </p>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  EYEBROW
                </label>
                <input
                  type="text"
                  value={homeData.selectedWork?.eyebrow || ''}
                  onChange={(e) => updateField(['selectedWork', 'eyebrow'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  HEADLINE
                </label>
                <input
                  type="text"
                  value={homeData.selectedWork?.title || ''}
                  onChange={(e) => updateField(['selectedWork', 'title'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  SUBTITLE
                </label>
                <input
                  type="text"
                  value={homeData.selectedWork?.subtitle || ''}
                  onChange={(e) => updateField(['selectedWork', 'subtitle'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.65rem' }}>
                  SHOWCASE PROJECTS ({homeData.selectedWork?.projects?.length || 0})
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {(homeData.selectedWork?.projects || []).map((proj: any, idx: number) => (
                    <div
                      key={proj.id || idx}
                      style={{
                        padding: '0.85rem',
                        borderRadius: '10px',
                        border: '1px solid rgba(0,0,0,0.08)',
                        backgroundColor: '#F8F8FA',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                      }}
                    >
                      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.5rem' }}>
                        <div>
                          <span style={{ fontSize: '0.68rem', color: '#71717A' }}>Project Title</span>
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
                          <span style={{ fontSize: '0.68rem', color: '#71717A' }}>Category</span>
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
                          <span style={{ fontSize: '0.68rem', color: '#71717A' }}>Link URL</span>
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
                          <span style={{ fontSize: '0.68rem', color: '#71717A' }}>Image Path</span>
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
              <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 650, margin: 0, color: '#111113' }}>
                    05 Capabilities &amp; Sharp Metric Numbers
                  </h3>
                  <span style={{ fontSize: '0.7rem', backgroundColor: '#F0FDF4', color: '#16A34A', padding: '2px 7px', borderRadius: '4px', fontWeight: 600 }}>
                    Live Flow
                  </span>
                </div>
                <p style={{ fontSize: '0.78rem', color: '#71717A', margin: '0.25rem 0 0 0' }}>
                  &ldquo;Three distinct capabilities. One strategic spine.&rdquo; &bull; Controls capabilities headline, 4 sharp flipping metric numbers, and practice areas.
                </p>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  SECTION EYEBROW
                </label>
                <input
                  type="text"
                  value={homeData.services?.eyebrow || ''}
                  placeholder="e.g. CAPABILITIES & PRACTICE AREAS"
                  onChange={(e) => updateField(['services', 'eyebrow'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  SECTION HEADLINE
                </label>
                <input
                  type="text"
                  value={homeData.services?.title || ''}
                  placeholder="Three distinct capabilities. One strategic spine."
                  onChange={(e) => updateField(['services', 'title'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  SECTION INTRO COPY
                </label>
                <textarea
                  rows={2}
                  value={homeData.services?.description || ''}
                  placeholder="Ārohana combines commercial thinking, sector experience and creative execution..."
                  onChange={(e) => updateField(['services', 'description'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              {/* ─── 4 SHARP FLIPPING METRIC NUMBERS ─── */}
              <div style={{ padding: '1.1rem', backgroundColor: '#F8F8FA', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                  <div>
                    <h4 style={{ fontSize: '0.88rem', fontWeight: 650, margin: 0, color: '#111113' }}>
                      Sharp Flipping Metric Numbers (4 Stats)
                    </h4>
                    <span style={{ fontSize: '0.72rem', color: '#71717A' }}>
                      Live 3D flipping linear numerals animated every time the section scrolls into view.
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {(homeData.impactStats?.counters || [
                    { id: 'commercial', target: 25, suffix: '+', title: 'Commercial Engagements', desc: 'Hospitality, enterprise & consumer brands' },
                    { id: 'sectors', target: 6, twoDigits: true, title: 'Industry Sectors', desc: 'Hospitality, Real Estate, Healthcare, Media, Travel & Defence' },
                    { id: 'cases', target: 8, twoDigits: true, title: 'Featured Case Studies', desc: 'Multi-entity retainers and technical production' },
                    { id: 'expeditions', target: 15, suffix: '+', title: 'Himalayan Expeditions', desc: 'Curated mountain journeys and border initiatives' },
                  ]).map((cnt: any, idx: number) => (
                    <div
                      key={cnt.id || idx}
                      style={{
                        padding: '0.85rem',
                        borderRadius: '8px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid rgba(0,0,0,0.08)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                      }}
                    >
                      <div style={{ display: 'grid', gridTemplateColumns: '85px 65px 120px 1fr', gap: '0.5rem', alignItems: 'center' }}>
                        <div>
                          <span style={{ fontSize: '0.68rem', fontWeight: 600, color: '#71717A', display: 'block', marginBottom: '0.2rem' }}>
                            TARGET
                          </span>
                          <input
                            type="number"
                            value={cnt.target ?? 0}
                            onChange={(e) => {
                              const counters = [...(homeData.impactStats?.counters || [])];
                              counters[idx] = { ...counters[idx], target: parseInt(e.target.value) || 0 };
                              updateField(['impactStats', 'counters'], counters);
                            }}
                            style={{ ...inputStyle, padding: '0.35rem 0.55rem' }}
                          />
                        </div>
                        <div>
                          <span style={{ fontSize: '0.68rem', fontWeight: 600, color: '#71717A', display: 'block', marginBottom: '0.2rem' }}>
                            SUFFIX
                          </span>
                          <input
                            type="text"
                            value={cnt.suffix || ''}
                            placeholder="+"
                            onChange={(e) => {
                              const counters = [...(homeData.impactStats?.counters || [])];
                              counters[idx] = { ...counters[idx], suffix: e.target.value };
                              updateField(['impactStats', 'counters'], counters);
                            }}
                            style={{ ...inputStyle, padding: '0.35rem 0.55rem' }}
                          />
                        </div>
                        <div>
                          <span style={{ fontSize: '0.68rem', fontWeight: 600, color: '#71717A', display: 'block', marginBottom: '0.2rem' }}>
                            FORMATTING
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const counters = [...(homeData.impactStats?.counters || [])];
                              counters[idx] = { ...counters[idx], twoDigits: !counters[idx].twoDigits };
                              updateField(['impactStats', 'counters'], counters);
                            }}
                            style={{
                              ...inputStyle,
                              padding: '0.35rem 0.55rem',
                              textAlign: 'center',
                              cursor: 'pointer',
                              backgroundColor: cnt.twoDigits ? '#111113' : '#F4F4F5',
                              color: cnt.twoDigits ? '#FFFFFF' : '#71717A',
                              fontWeight: 600,
                              fontSize: '0.74rem',
                            }}
                          >
                            {cnt.twoDigits ? '0X (e.g. 06)' : 'Standard'}
                          </button>
                        </div>
                        <div>
                          <span style={{ fontSize: '0.68rem', fontWeight: 600, color: '#71717A', display: 'block', marginBottom: '0.2rem' }}>
                            METRIC TITLE
                          </span>
                          <input
                            type="text"
                            value={cnt.title || cnt.label || ''}
                            placeholder="e.g. Commercial Engagements"
                            onChange={(e) => {
                              const counters = [...(homeData.impactStats?.counters || [])];
                              counters[idx] = { ...counters[idx], title: e.target.value, label: e.target.value };
                              updateField(['impactStats', 'counters'], counters);
                            }}
                            style={{ ...inputStyle, padding: '0.35rem 0.55rem' }}
                          />
                        </div>
                      </div>

                      <div>
                        <span style={{ fontSize: '0.68rem', fontWeight: 600, color: '#71717A', display: 'block', marginBottom: '0.2rem' }}>
                          SUBTITLE / CONTEXT DETAIL
                        </span>
                        <input
                          type="text"
                          value={cnt.desc || cnt.detail || ''}
                          placeholder="e.g. Hospitality, enterprise & consumer brands"
                          onChange={(e) => {
                            const counters = [...(homeData.impactStats?.counters || [])];
                            counters[idx] = { ...counters[idx], desc: e.target.value, detail: e.target.value };
                            updateField(['impactStats', 'counters'], counters);
                          }}
                          style={{ ...inputStyle, padding: '0.35rem 0.55rem' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ─── 3 PRACTICE PILLARS ─── */}
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.65rem' }}>
                  PRACTICE PILLARS ({homeData.services?.items?.length || 0})
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {(homeData.services?.items || []).map((srv: any, idx: number) => (
                    <div
                      key={idx}
                      style={{
                        padding: '0.85rem',
                        borderRadius: '10px',
                        border: '1px solid rgba(0,0,0,0.08)',
                        backgroundColor: '#F8F8FA',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                      }}
                    >
                      <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '0.5rem' }}>
                        <div>
                          <span style={{ fontSize: '0.68rem', color: '#71717A' }}>Number</span>
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
                          <span style={{ fontSize: '0.68rem', color: '#71717A' }}>Title</span>
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
                        <span style={{ fontSize: '0.68rem', color: '#71717A' }}>Description</span>
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
                        <span style={{ fontSize: '0.68rem', color: '#71717A' }}>Tags (comma-separated pills)</span>
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
                          <span style={{ fontSize: '0.68rem', color: '#71717A' }}>Link / Anchor</span>
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
                          <span style={{ fontSize: '0.68rem', color: '#71717A' }}>Cover Image</span>
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
              ARCHIVE: SECTORS & BUILT ENVIRONMENT MONTAGE
             ════════════════════════════════════════════════════════════ */}
          {activeSectionId === 'montage' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 650, margin: 0, color: '#111113' }}>
                    Sectors &amp; Built Environment Montage (Archived)
                  </h3>
                  <span style={{ fontSize: '0.7rem', backgroundColor: '#F4F4F5', color: '#71717A', padding: '2px 7px', borderRadius: '4px', fontWeight: 600 }}>
                    Archived Section
                  </span>
                </div>
                <p style={{ fontSize: '0.78rem', color: '#71717A', margin: '0.2rem 0 0 0' }}>
                  6 core sectors: Hospitality, Real Estate, Healthcare, Lifestyle, Defence, Travel. Re-enable anytime via Order &amp; Visibility.
                </p>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  EYEBROW
                </label>
                <input
                  type="text"
                  value={homeData.sectorsMontage?.eyebrow || ''}
                  onChange={(e) => updateField(['sectorsMontage', 'eyebrow'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  HEADLINE
                </label>
                <input
                  type="text"
                  value={homeData.sectorsMontage?.title || ''}
                  onChange={(e) => updateField(['sectorsMontage', 'title'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.65rem' }}>
                  THE 6 SECTORS
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {(homeData.sectorsMontage?.sectors || []).map((sec: any, idx: number) => (
                    <div
                      key={sec.id || idx}
                      style={{
                        padding: '0.85rem',
                        borderRadius: '10px',
                        border: '1px solid rgba(0,0,0,0.08)',
                        backgroundColor: '#F8F8FA',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                      }}
                    >
                      <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 1fr', gap: '0.5rem' }}>
                        <div>
                          <span style={{ fontSize: '0.68rem', color: '#71717A' }}>Number</span>
                          <input
                            type="text"
                            value={sec.number || ''}
                            onChange={(e) => {
                              const updated = [...homeData.sectorsMontage.sectors];
                              updated[idx] = { ...updated[idx], number: e.target.value };
                              updateField(['sectorsMontage', 'sectors'], updated);
                            }}
                            style={{ ...inputStyle, padding: '0.35rem 0.55rem' }}
                          />
                        </div>
                        <div>
                          <span style={{ fontSize: '0.68rem', color: '#71717A' }}>Title</span>
                          <input
                            type="text"
                            value={sec.title || ''}
                            onChange={(e) => {
                              const updated = [...homeData.sectorsMontage.sectors];
                              updated[idx] = { ...updated[idx], title: e.target.value };
                              updateField(['sectorsMontage', 'sectors'], updated);
                            }}
                            style={{ ...inputStyle, padding: '0.35rem 0.55rem' }}
                          />
                        </div>
                        <div>
                          <span style={{ fontSize: '0.68rem', color: '#71717A' }}>Subtitle</span>
                          <input
                            type="text"
                            value={sec.subtitle || ''}
                            onChange={(e) => {
                              const updated = [...homeData.sectorsMontage.sectors];
                              updated[idx] = { ...updated[idx], subtitle: e.target.value };
                              updateField(['sectorsMontage', 'sectors'], updated);
                            }}
                            style={{ ...inputStyle, padding: '0.35rem 0.55rem' }}
                          />
                        </div>
                      </div>

                      <div>
                        <span style={{ fontSize: '0.68rem', color: '#71717A' }}>Description</span>
                        <textarea
                          rows={2}
                          value={sec.description || ''}
                          onChange={(e) => {
                            const updated = [...homeData.sectorsMontage.sectors];
                            updated[idx] = { ...updated[idx], description: e.target.value };
                            updateField(['sectorsMontage', 'sectors'], updated);
                          }}
                          style={{ ...inputStyle, padding: '0.35rem 0.55rem' }}
                        />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                        <div>
                          <span style={{ fontSize: '0.68rem', color: '#71717A' }}>Link</span>
                          <input
                            type="text"
                            value={sec.link || ''}
                            onChange={(e) => {
                              const updated = [...homeData.sectorsMontage.sectors];
                              updated[idx] = { ...updated[idx], link: e.target.value };
                              updateField(['sectorsMontage', 'sectors'], updated);
                            }}
                            style={{ ...inputStyle, padding: '0.35rem 0.55rem' }}
                          />
                        </div>
                        <div>
                          <span style={{ fontSize: '0.68rem', color: '#71717A' }}>Image Path</span>
                          <div style={{ display: 'flex', gap: '0.35rem' }}>
                            <input
                              type="text"
                              value={sec.image || ''}
                              onChange={(e) => {
                                const updated = [...homeData.sectorsMontage.sectors];
                                updated[idx] = { ...updated[idx], image: e.target.value };
                                updateField(['sectorsMontage', 'sectors'], updated);
                              }}
                              style={{ ...inputStyle, padding: '0.35rem 0.55rem', flex: 1 }}
                            />
                            <button
                              type="button"
                              onClick={() => setMediaPickerTarget({ path: `sectorsMontage.sectors.${idx}.image`, type: 'image' })}
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
              ARCHIVE: TOURIN SPOTLIGHT
             ════════════════════════════════════════════════════════════ */}
          {activeSectionId === 'tourin' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 650, margin: 0, color: '#111113' }}>
                    Tourin Experiential Travel Feature (Archived)
                  </h3>
                  <span style={{ fontSize: '0.7rem', backgroundColor: '#F4F4F5', color: '#71717A', padding: '2px 7px', borderRadius: '4px', fontWeight: 600 }}>
                    Archived Section
                  </span>
                </div>
                <p style={{ fontSize: '0.78rem', color: '#71717A', margin: '0.2rem 0 0 0' }}>
                  Himalayan travel venture spotlight, trekking, homestays and bespoke expeditions. Re-enable anytime via Order &amp; Visibility.
                </p>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  TAG / BRAND
                </label>
                <input
                  type="text"
                  value={homeData.tourinSpotlight?.tag || ''}
                  onChange={(e) => updateField(['tourinSpotlight', 'tag'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  HEADLINE
                </label>
                <input
                  type="text"
                  value={homeData.tourinSpotlight?.title || ''}
                  onChange={(e) => updateField(['tourinSpotlight', 'title'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  DESCRIPTION
                </label>
                <textarea
                  rows={2}
                  value={homeData.tourinSpotlight?.description || ''}
                  onChange={(e) => updateField(['tourinSpotlight', 'description'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.65rem' }}>
                  EXPERIENTIAL CATEGORIES ({homeData.tourinSpotlight?.categories?.length || 0})
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {(homeData.tourinSpotlight?.categories || []).map((cat: any, idx: number) => (
                    <div
                      key={cat.id || idx}
                      style={{
                        padding: '0.85rem',
                        borderRadius: '10px',
                        border: '1px solid rgba(0,0,0,0.08)',
                        backgroundColor: '#F8F8FA',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                      }}
                    >
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '0.5rem' }}>
                        <div>
                          <span style={{ fontSize: '0.68rem', color: '#71717A' }}>Category Name</span>
                          <input
                            type="text"
                            value={cat.name || ''}
                            onChange={(e) => {
                              const updated = [...homeData.tourinSpotlight.categories];
                              updated[idx] = { ...updated[idx], name: e.target.value };
                              updateField(['tourinSpotlight', 'categories'], updated);
                            }}
                            style={{ ...inputStyle, padding: '0.35rem 0.55rem' }}
                          />
                        </div>
                        <div>
                          <span style={{ fontSize: '0.68rem', color: '#71717A' }}>Tagline</span>
                          <input
                            type="text"
                            value={cat.tagline || ''}
                            onChange={(e) => {
                              const updated = [...homeData.tourinSpotlight.categories];
                              updated[idx] = { ...updated[idx], tagline: e.target.value };
                              updateField(['tourinSpotlight', 'categories'], updated);
                            }}
                            style={{ ...inputStyle, padding: '0.35rem 0.55rem' }}
                          />
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                        <div>
                          <span style={{ fontSize: '0.68rem', color: '#71717A' }}>Thumbnail Image</span>
                          <div style={{ display: 'flex', gap: '0.35rem' }}>
                            <input
                              type="text"
                              value={cat.image || ''}
                              onChange={(e) => {
                                const updated = [...homeData.tourinSpotlight.categories];
                                updated[idx] = { ...updated[idx], image: e.target.value };
                                updateField(['tourinSpotlight', 'categories'], updated);
                              }}
                              style={{ ...inputStyle, padding: '0.35rem 0.55rem', flex: 1 }}
                            />
                            <button
                              type="button"
                              onClick={() => setMediaPickerTarget({ path: `tourinSpotlight.categories.${idx}.image`, type: 'image' })}
                              style={{ ...mediaBtnStyle, padding: '0 0.5rem', fontSize: '0.7rem' }}
                            >
                              Pick
                            </button>
                          </div>
                        </div>

                        <div>
                          <span style={{ fontSize: '0.68rem', color: '#71717A' }}>Hero Background Image</span>
                          <div style={{ display: 'flex', gap: '0.35rem' }}>
                            <input
                              type="text"
                              value={cat.heroImage || ''}
                              onChange={(e) => {
                                const updated = [...homeData.tourinSpotlight.categories];
                                updated[idx] = { ...updated[idx], heroImage: e.target.value };
                                updateField(['tourinSpotlight', 'categories'], updated);
                              }}
                              style={{ ...inputStyle, padding: '0.35rem 0.55rem', flex: 1 }}
                            />
                            <button
                              type="button"
                              onClick={() => setMediaPickerTarget({ path: `tourinSpotlight.categories.${idx}.heroImage`, type: 'image' })}
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 650, margin: 0, color: '#111113' }}>
                    07 Signature Mouse-Trail Interactive CTA
                  </h3>
                  <span style={{ fontSize: '0.7rem', backgroundColor: '#F0FDF4', color: '#16A34A', padding: '2px 7px', borderRadius: '4px', fontWeight: 600 }}>
                    Live Flow
                  </span>
                </div>
                <p style={{ fontSize: '0.78rem', color: '#71717A', margin: '0.2rem 0 0 0' }}>
                  The large dark closing CTA with cursor-following interactive cards.
                </p>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  EYEBROW
                </label>
                <input
                  type="text"
                  value={homeData.cta?.eyebrow || ''}
                  onChange={(e) => updateField(['cta', 'eyebrow'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  MAIN HEADLINE
                </label>
                <textarea
                  rows={2}
                  value={homeData.cta?.headline || ''}
                  onChange={(e) => updateField(['cta', 'headline'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  SUBTITLE / SUPPORTING COPY
                </label>
                <textarea
                  rows={3}
                  value={homeData.cta?.description || ''}
                  onChange={(e) => updateField(['cta', 'description'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                    PRIMARY BUTTON LABEL
                  </label>
                  <input
                    type="text"
                    value={homeData.cta?.buttonLabel || ''}
                    onChange={(e) => updateField(['cta', 'buttonLabel'], e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                    BUTTON DESTINATION LINK
                  </label>
                  <input
                    type="text"
                    value={homeData.cta?.buttonLink || ''}
                    onChange={(e) => updateField(['cta', 'buttonLink'], e.target.value)}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  DIRECT INQUIRY EMAIL ADDRESS
                </label>
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
              SECTION 11: ORDER & VISIBILITY
             ════════════════════════════════════════════════════════════ */}
          {activeSectionId === 'order' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 650, margin: 0, color: '#111113' }}>
                  Section Sequence &amp; Visibility Controls
                </h3>
                <p style={{ fontSize: '0.78rem', color: '#71717A', margin: '0.2rem 0 0 0' }}>
                  Reorder or toggle visibility for each of the 10 homepage sections. Live preview updates instantly.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {(homeData.sections || []).map((sec: any, idx: number) => (
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
                          disabled={idx === homeData.sections.length - 1}
                          onClick={() => moveSection(idx, 'down')}
                          style={{ border: 'none', background: 'transparent', cursor: idx === homeData.sections.length - 1 ? 'not-allowed' : 'pointer', padding: 0 }}
                        >
                          <ChevronDown size={14} color={idx === homeData.sections.length - 1 ? '#D4D4D8' : '#71717A'} />
                        </button>
                      </div>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#71717A', width: '22px' }}>
                        {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
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
      {(mediaPickerTarget || brandLogoIndex !== null) && (
        <MediaPickerModal
          isOpen={true}
          onClose={() => {
            setMediaPickerTarget(null);
            setBrandLogoIndex(null);
          }}
          mediaType={mediaPickerTarget?.type || 'image'}
          onSelect={(url) => {
            if (brandLogoIndex !== null) {
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
