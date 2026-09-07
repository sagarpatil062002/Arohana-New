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
} from 'lucide-react';

export default function AdminHomePage() {
  const { content, saveDraft, updateDraftInMemory } = useCmsContent();
  const [homeData, setHomeData] = useState<any>(null);
  const [activeSectionId, setActiveSectionId] = useState<string>('hero');
  const [mediaPickerTarget, setMediaPickerTarget] = useState<{ path: string; type?: 'image' | 'video' } | null>(null);
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
    { id: 'hero', label: '01 Hero Section', icon: Sparkles },
    { id: 'brands', label: '02 Brands Marquee', icon: Layers },
    { id: 'impact', label: '03 Impact Counters', icon: Sliders },
    { id: 'army', label: '04 Army Spotlight', icon: Shield },
    { id: 'pov', label: '05 Point of View', icon: Quote },
    { id: 'work', label: '06 Selected Work', icon: Briefcase },
    { id: 'services', label: '07 Services Pillar', icon: FileText },
    { id: 'montage', label: '08 Sectors Montage', icon: LayoutGrid },
    { id: 'tourin', label: '09 Tourin Travel', icon: Compass },
    { id: 'cta', label: '10 Signature CTA', icon: Send },
    { id: 'order', label: 'Order & Visibility', icon: GripVertical },
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
              <span style={{ fontSize: '0.72rem', backgroundColor: '#F4F4F5', padding: '2px 8px', borderRadius: '6px', color: '#71717A', fontWeight: 600 }}>
                10 Sections
              </span>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#71717A', marginTop: '0.15rem' }}>
              Select any section to edit its copy, images and links in real-time.
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
                  backgroundColor: isActive ? '#111113' : '#F8F8FA',
                  color: isActive ? '#FFFFFF' : '#52525B',
                  fontSize: '0.76rem',
                  fontWeight: isActive ? 600 : 500,
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'all 0.2s ease',
                }}
              >
                <Icon size={13} color={isActive ? '#FFFFFF' : '#71717A'} />
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
              SECTION 02: SELECTED BRANDS & MARQUEE
             ════════════════════════════════════════════════════════════ */}
          {activeSectionId === 'brands' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 650, margin: 0, color: '#111113' }}>
                  Selected Brands &amp; Organisations Marquee
                </h3>
                <p style={{ fontSize: '0.78rem', color: '#71717A', margin: '0.2rem 0 0 0' }}>
                  Configure client badges, names, monogram pills, and target destination links.
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
                        padding: '0.85rem',
                        borderRadius: '10px',
                        border: '1px solid rgba(0,0,0,0.08)',
                        backgroundColor: '#F8F8FA',
                        display: 'grid',
                        gridTemplateColumns: '1.2fr 0.8fr 1fr 36px',
                        gap: '0.65rem',
                        alignItems: 'center',
                      }}
                    >
                      <div>
                        <span style={{ fontSize: '0.68rem', color: '#71717A', display: 'block' }}>Name</span>
                        <input
                          type="text"
                          value={brand.name || ''}
                          onChange={(e) => {
                            const updated = [...homeData.brands.list];
                            updated[idx] = { ...updated[idx], name: e.target.value };
                            updateField(['brands', 'list'], updated);
                          }}
                          style={{ ...inputStyle, padding: '0.35rem 0.55rem', fontSize: '0.8rem' }}
                        />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.68rem', color: '#71717A', display: 'block' }}>Monogram</span>
                        <input
                          type="text"
                          value={brand.monogram || ''}
                          onChange={(e) => {
                            const updated = [...homeData.brands.list];
                            updated[idx] = { ...updated[idx], monogram: e.target.value };
                            updateField(['brands', 'list'], updated);
                          }}
                          style={{ ...inputStyle, padding: '0.35rem 0.55rem', fontSize: '0.8rem' }}
                        />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.68rem', color: '#71717A', display: 'block' }}>Link</span>
                        <input
                          type="text"
                          value={brand.link || ''}
                          onChange={(e) => {
                            const updated = [...homeData.brands.list];
                            updated[idx] = { ...updated[idx], link: e.target.value };
                            updateField(['brands', 'list'], updated);
                          }}
                          style={{ ...inputStyle, padding: '0.35rem 0.55rem', fontSize: '0.8rem' }}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = homeData.brands.list.filter((_: any, i: number) => i !== idx);
                          updateField(['brands', 'list'], updated);
                        }}
                        style={{
                          height: '32px',
                          border: 'none',
                          backgroundColor: 'transparent',
                          color: '#EF4444',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════
              SECTION 03: REAL-WORLD IMPACT COUNTERS
             ════════════════════════════════════════════════════════════ */}
          {activeSectionId === 'impact' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 650, margin: 0, color: '#111113' }}>
                  Real-World Execution Flip Counters
                </h3>
                <p style={{ fontSize: '0.78rem', color: '#71717A', margin: '0.2rem 0 0 0' }}>
                  Custom numeric roll-up counters animated on scroll.
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
              SECTION 04: INDIAN ARMY SPOTLIGHT
             ════════════════════════════════════════════════════════════ */}
          {activeSectionId === 'army' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 650, margin: 0, color: '#111113' }}>
                  Indian Army Projects 3D Perspective Spotlight
                </h3>
                <p style={{ fontSize: '0.78rem', color: '#71717A', margin: '0.2rem 0 0 0' }}>
                  Showcase of defence briefs, authentic imagery and verified credentials.
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
              SECTION 05: EDITORIAL INTRO & POINT OF VIEW
             ════════════════════════════════════════════════════════════ */}
          {activeSectionId === 'pov' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 650, margin: 0, color: '#111113' }}>
                  Editorial Intro &amp; A Point of View
                </h3>
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
              SECTION 06: SELECTED WORK SHOWCASE
             ════════════════════════════════════════════════════════════ */}
          {activeSectionId === 'work' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 650, margin: 0, color: '#111113' }}>
                  Selected Work 3D Coverflow Showcase
                </h3>
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
              SECTION 07: SERVICES / PRACTICE AREAS
             ════════════════════════════════════════════════════════════ */}
          {activeSectionId === 'services' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 650, margin: 0, color: '#111113' }}>
                  Practice Areas &amp; Deep Black Services
                </h3>
                <p style={{ fontSize: '0.78rem', color: '#71717A', margin: '0.2rem 0 0 0' }}>
                  The 3 core pillars displayed on the deep black homepage section.
                </p>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  EYEBROW
                </label>
                <input
                  type="text"
                  value={homeData.services?.eyebrow || ''}
                  onChange={(e) => updateField(['services', 'eyebrow'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  HEADLINE
                </label>
                <input
                  type="text"
                  value={homeData.services?.title || ''}
                  onChange={(e) => updateField(['services', 'title'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  DESCRIPTION
                </label>
                <textarea
                  rows={2}
                  value={homeData.services?.description || ''}
                  onChange={(e) => updateField(['services', 'description'], e.target.value)}
                  style={inputStyle}
                />
              </div>

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
              SECTION 08: SECTORS & BUILT ENVIRONMENT MONTAGE
             ════════════════════════════════════════════════════════════ */}
          {activeSectionId === 'montage' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 650, margin: 0, color: '#111113' }}>
                  Sectors &amp; Built Environment Montage
                </h3>
                <p style={{ fontSize: '0.78rem', color: '#71717A', margin: '0.2rem 0 0 0' }}>
                  6 core sectors: Hospitality, Real Estate, Healthcare, Lifestyle, Defence, Travel.
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
              SECTION 09: TOURIN SPOTLIGHT
             ════════════════════════════════════════════════════════════ */}
          {activeSectionId === 'tourin' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 650, margin: 0, color: '#111113' }}>
                  Tourin Experiential Travel Feature
                </h3>
                <p style={{ fontSize: '0.78rem', color: '#71717A', margin: '0.2rem 0 0 0' }}>
                  Himalayan travel venture spotlight, trekking, homestays and bespoke expeditions.
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
              SECTION 10: INTERACTIVE SIGNATURE CTA
             ════════════════════════════════════════════════════════════ */}
          {activeSectionId === 'cta' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 650, margin: 0, color: '#111113' }}>
                  Signature Mouse-Trail Interactive CTA
                </h3>
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
      {mediaPickerTarget && (
        <MediaPickerModal
          isOpen={true}
          onClose={() => setMediaPickerTarget(null)}
          mediaType={mediaPickerTarget.type || 'image'}
          onSelect={(url) => {
            const parts = mediaPickerTarget.path.split('.');
            updateField(parts, url);
            setMediaPickerTarget(null);
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
