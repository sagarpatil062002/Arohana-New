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
  RotateCcw,
} from 'lucide-react';

export default function AdminHomePage() {
  const { content, saveDraft, updateDraftInMemory } = useCmsContent();
  const [homeData, setHomeData] = useState<any>(null);
  const [activeAccordion, setActiveAccordion] = useState<string>('hero');
  const [mediaPickerTarget, setMediaPickerTarget] = useState<string | null>(null);
  const [savedStatus, setSavedStatus] = useState(false);

  useEffect(() => {
    if (content.home) {
      setHomeData(JSON.parse(JSON.stringify(content.home)));
    }
  }, [content.home]);

  if (!homeData) {
    return <div style={{ padding: '2rem' }}>Loading Homepage Content...</div>;
  }

  const handleHeroChange = (field: string, val: any) => {
    const updated = {
      ...homeData,
      hero: {
        ...homeData.hero,
        [field]: val,
      },
    };
    setHomeData(updated);
    updateDraftInMemory('home', updated);
  };

  const handleSectionVisibility = (id: string) => {
    const updatedSections = homeData.sections.map((sec: any) =>
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
      setTimeout(() => setSavedStatus(false), 2000);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', height: 'calc(100vh - 120px)' }}>
      {/* ─── LEFT COLUMN: HOMEPAGE CONTENT EDITOR ─── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          overflow: 'hidden',
        }}
      >
        {/* Editor Top Bar */}
        <div
          style={{
            padding: '1.15rem 1.5rem',
            borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FAFAFA',
          }}
        >
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 650, margin: 0, color: '#111113' }}>
              Homepage Sections &amp; Content
            </h2>
            <div style={{ fontSize: '0.76rem', color: '#71717A' }}>
              Changes update the Live Preview immediately.
            </div>
          </div>
          <button
            type="button"
            onClick={handleSave}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.45rem 1.15rem',
              borderRadius: '9999px',
              border: 'none',
              backgroundColor: savedStatus ? '#16A34A' : '#111113',
              color: '#FFFFFF',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {savedStatus ? <Check size={14} /> : <Save size={14} />}
            {savedStatus ? 'Saved Draft' : 'Save Section'}
          </button>
        </div>

        {/* Scrollable Section Accordions */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem' }}>
          {/* SECTION 1: HERO */}
          <div
            style={{
              border: '1px solid rgba(0, 0, 0, 0.08)',
              borderRadius: '12px',
              marginBottom: '1rem',
              overflow: 'hidden',
            }}
          >
            <div
              onClick={() => setActiveAccordion(activeAccordion === 'hero' ? '' : 'hero')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.85rem 1.15rem',
                backgroundColor: '#F8F8FA',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#DE322D', width: '22px' }}>01</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 650, color: '#111113' }}>Hero Section</span>
                <span style={{ fontSize: '0.7rem', color: '#16A34A', backgroundColor: '#DCFCE7', padding: '2px 8px', borderRadius: '9999px' }}>
                  Visible
                </span>
              </div>
              {activeAccordion === 'hero' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>

            {activeAccordion === 'hero' && (
              <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: '#FFFFFF' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                    TOP BADGE / EYEBROW
                  </label>
                  <input
                    type="text"
                    value={homeData.hero.badge || ''}
                    onChange={(e) => handleHeroChange('badge', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.55rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(0, 0, 0, 0.12)',
                      fontSize: '0.85rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                    MAIN HEADLINE
                  </label>
                  <input
                    type="text"
                    value={homeData.hero.headline || ''}
                    onChange={(e) => handleHeroChange('headline', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.55rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(0, 0, 0, 0.12)',
                      fontSize: '0.85rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                    SUBHEADLINE / INTRO PARAGRAPH
                  </label>
                  <textarea
                    rows={3}
                    value={homeData.hero.subheadline || ''}
                    onChange={(e) => handleHeroChange('subheadline', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.55rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(0, 0, 0, 0.12)',
                      fontSize: '0.85rem',
                      outline: 'none',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                      PRIMARY CTA LABEL
                    </label>
                    <input
                      type="text"
                      value={homeData.hero.ctaLabel || ''}
                      onChange={(e) => handleHeroChange('ctaLabel', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.55rem 0.85rem',
                        borderRadius: '8px',
                        border: '1px solid rgba(0, 0, 0, 0.12)',
                        fontSize: '0.85rem',
                        outline: 'none',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                      PRIMARY CTA LINK
                    </label>
                    <input
                      type="text"
                      value={homeData.hero.ctaLink || ''}
                      onChange={(e) => handleHeroChange('ctaLink', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.55rem 0.85rem',
                        borderRadius: '8px',
                        border: '1px solid rgba(0, 0, 0, 0.12)',
                        fontSize: '0.85rem',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                    BACKGROUND VIDEO CLIP OR POSTER
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <input
                      type="text"
                      value={homeData.hero.videoUrl || ''}
                      readOnly
                      style={{
                        flex: 1,
                        padding: '0.55rem 0.85rem',
                        borderRadius: '8px',
                        border: '1px solid rgba(0, 0, 0, 0.12)',
                        fontSize: '0.82rem',
                        backgroundColor: '#F8F8FA',
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setMediaPickerTarget('video')}
                      style={{
                        padding: '0.55rem 1rem',
                        borderRadius: '8px',
                        backgroundColor: '#111113',
                        color: '#FFFFFF',
                        border: 'none',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Change Video
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* SECTION 2: HOMEPAGE SECTIONS ORDER & VISIBILITY */}
          <div style={{ marginTop: '1.5rem' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 650, color: '#111113', marginBottom: '0.75rem' }}>
              Manage Sections Order &amp; Visibility
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {homeData.sections.map((sec: any, idx: number) => (
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
                        Type: {sec.type}
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
        </div>
      </div>

      {/* ─── RIGHT COLUMN: REAL-TIME LIVE PREVIEW ─── */}
      <div style={{ height: '100%' }}>
        <LivePreviewPanel previewUrl="/" />
      </div>

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={!!mediaPickerTarget}
        onClose={() => setMediaPickerTarget(null)}
        mediaType="video"
        onSelect={(url) => {
          handleHeroChange('videoUrl', url);
          setMediaPickerTarget(null);
        }}
      />
    </div>
  );
}
