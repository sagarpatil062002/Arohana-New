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
  const { content, saveDraft, updateDraftInMemory } = useCmsContent();
  const [homeData, setHomeData] = useState<any>(null);
  const [activeSectionId, setActiveSectionId] = useState<string>('hero');
  const [mediaPickerTarget, setMediaPickerTarget] = useState<{ path: string; type?: 'image' | 'video' } | null>(null);
  const [brandLogoIndex, setBrandLogoIndex] = useState<number | null>(null);
  const [heroSlideIndex, setHeroSlideIndex] = useState<number | null>(null);
  const [savedStatus, setSavedStatus] = useState(false);
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
              <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 650, margin: 0, color: '#111113' }}>
                  Hero Banner &amp; Messaging
                </h3>
                <p style={{ fontSize: '0.78rem', color: '#71717A', margin: '0.2rem 0 0 0' }}>
                  Manage the creative agency photographic hero banner, typography, and dynamic action buttons.
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
                                id: 'slide-1',
                                image: homeData.hero?.bannerImage || '/images/home/hero-mountain-sky.png',
                                caption: 'Strategic Landscapes',
                              },
                            ];
                        const newSlide = {
                          id: `banner-${Date.now()}`,
                          image: '/images/services/services-hero-collage.png',
                          caption: 'Creative Direction & Impact',
                        };
                        const updated = [...current, newSlide];
                        updateField(['hero', 'bannerImages'], updated);
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
                      <Plus size={13} /> Add Slide Image
                    </button>
                  </div>
                </div>

                {/* Slides List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {(Array.isArray(homeData.hero?.bannerImages) && homeData.hero.bannerImages.length > 0
                    ? homeData.hero.bannerImages
                    : [
                        {
                          id: 'slide-1',
                          image: homeData.hero?.bannerImage || homeData.hero?.posterImage || '/images/home/hero-mountain-sky.png',
                          caption: 'Brand Strategy & Strategic Landscapes',
                        },
                      ]
                  ).map((slide: any, idx: number, arr: any[]) => (
                    <div
                      key={slide.id || idx}
                      style={{
                        padding: '0.85rem',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '10px',
                        border: '1px solid rgba(0,0,0,0.08)',
                        display: 'grid',
                        gridTemplateColumns: '70px 1.5fr 1fr auto',
                        gap: '0.75rem',
                        alignItems: 'center',
                      }}
                    >
                      {/* Slide Thumbnail Preview */}
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
                            alt={`Slide ${idx + 1}`}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#71717A' }}>
                            <ImageIcon size={16} />
                          </div>
                        )}
                        <span
                          style={{
                            position: 'absolute',
                            bottom: '2px',
                            left: '2px',
                            backgroundColor: 'rgba(0,0,0,0.7)',
                            color: '#ffffff',
                            fontSize: '0.6rem',
                            fontWeight: 700,
                            padding: '1px 4px',
                            borderRadius: '3px',
                          }}
                        >
                          0{idx + 1}
                        </span>
                      </div>

                      {/* Image URL & Pick Button */}
                      <div>
                        <span style={{ fontSize: '0.68rem', color: '#71717A', display: 'block', marginBottom: '0.2rem', fontWeight: 600 }}>
                          BANNER IMAGE URL / FILE
                        </span>
                        <div style={{ display: 'flex', gap: '0.35rem' }}>
                          <input
                            type="text"
                            value={slide.image || ''}
                            placeholder="/images/home/hero-mountain-sky.png"
                            onChange={(e) => {
                              const list = [...arr];
                              list[idx] = { ...list[idx], image: e.target.value };
                              updateField(['hero', 'bannerImages'], list);
                              if (idx === 0) {
                                updateField(['hero', 'bannerImage'], e.target.value);
                                updateField(['hero', 'posterImage'], e.target.value);
                              }
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

                      {/* Slide Caption / Sub-tag */}
                      <div>
                        <span style={{ fontSize: '0.68rem', color: '#71717A', display: 'block', marginBottom: '0.2rem', fontWeight: 600 }}>
                          SLIDE CAPTION / TAG (Optional)
                        </span>
                        <input
                          type="text"
                          value={slide.caption || ''}
                          placeholder="e.g. Brand Strategy & Execution"
                          onChange={(e) => {
                            const list = [...arr];
                            list[idx] = { ...list[idx], caption: e.target.value };
                            updateField(['hero', 'bannerImages'], list);
                          }}
                          style={{ ...inputStyle, padding: '0.35rem 0.55rem', fontSize: '0.78rem' }}
                        />
                      </div>

                      {/* Actions: Move Up, Move Down, Delete */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <button
                          type="button"
                          disabled={idx === 0}
                          title="Move slide up"
                          onClick={() => {
                            if (idx === 0) return;
                            const list = [...arr];
                            const temp = list[idx];
                            list[idx] = list[idx - 1];
                            list[idx - 1] = temp;
                            updateField(['hero', 'bannerImages'], list);
                            updateField(['hero', 'bannerImage'], list[0]?.image || '');
                          }}
                          style={{
                            border: 'none',
                            background: 'transparent',
                            cursor: idx === 0 ? 'not-allowed' : 'pointer',
                            padding: '4px',
                            color: idx === 0 ? '#D4D4D8' : '#52525B',
                          }}
                        >
                          <ChevronUp size={15} />
                        </button>
                        <button
                          type="button"
                          disabled={idx === arr.length - 1}
                          title="Move slide down"
                          onClick={() => {
                            if (idx === arr.length - 1) return;
                            const list = [...arr];
                            const temp = list[idx];
                            list[idx] = list[idx + 1];
                            list[idx + 1] = temp;
                            updateField(['hero', 'bannerImages'], list);
                            updateField(['hero', 'bannerImage'], list[0]?.image || '');
                          }}
                          style={{
                            border: 'none',
                            background: 'transparent',
                            cursor: idx === arr.length - 1 ? 'not-allowed' : 'pointer',
                            padding: '4px',
                            color: idx === arr.length - 1 ? '#D4D4D8' : '#52525B',
                          }}
                        >
                          <ChevronDown size={15} />
                        </button>
                        <button
                          type="button"
                          disabled={arr.length <= 1}
                          title="Delete slide"
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
                            padding: '4px',
                            color: arr.length <= 1 ? '#D4D4D8' : '#EF4444',
                          }}
                        >
                          <Trash2 size={15} />
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
