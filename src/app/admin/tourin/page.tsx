'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useCmsContent } from '@/lib/cms/content-context';
import LivePreviewPanel from '@/components/admin/LivePreviewPanel';
import MediaPickerModal from '@/components/admin/MediaPickerModal';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { Plus, Trash2, Eye, EyeOff, Save, Check, Upload, Compass, ChevronUp, ChevronDown } from 'lucide-react';

/**
 * Reusable enable / disable switch used across every Tourin field.
 * Every Tourin element is individually controllable from the Admin CRM.
 */
function ToggleSwitch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      title={label || 'Enable / Disable'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        padding: '0.22rem 0.6rem 0.22rem 0.3rem',
        borderRadius: '9999px',
        border: `1px solid ${checked ? 'rgba(22,163,74,0.35)' : 'rgba(0,0,0,0.15)'}`,
        backgroundColor: checked ? 'rgba(22,163,74,0.08)' : '#F4F4F5',
        color: checked ? '#15803D' : '#8A8A92',
        fontSize: '0.66rem',
        fontWeight: 700,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}
    >
      <span
        style={{
          width: '30px',
          height: '16px',
          borderRadius: '9999px',
          backgroundColor: checked ? '#16A34A' : '#D4D4D8',
          position: 'relative',
          transition: 'background-color 0.2s ease',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: '2px',
            left: checked ? '16px' : '2px',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            transition: 'left 0.2s ease',
          }}
        />
      </span>
      {checked ? 'ON' : 'OFF'}
    </button>
  );
}

/** Field label with an inline Enable / Disable control. */
function FieldLabel({
  children,
  enabled,
  onToggle,
}: {
  children: React.ReactNode;
  enabled?: boolean;
  onToggle?: (v: boolean) => void;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.5rem',
        marginBottom: '0.35rem',
      }}
    >
      <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>
        {children}
      </label>
      {onToggle && <ToggleSwitch checked={enabled !== false} onChange={onToggle} />}
    </div>
  );
}

export default function AdminTourinPage() {
  const { content, saveDraft, updateDraftInMemory, publishSection } = useCmsContent();
  const [tourinData, setTourinData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'hero' | 'genesis' | 'destination' | 'philosophy' | 'journeys' | 'proof'>('hero');
  const [selectedJourneyId, setSelectedJourneyId] = useState<string | null>('slow-ladakh');
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [mediaTarget, setMediaTarget] = useState<'journey' | 'image1' | 'image2' | 'image3' | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [savedStatus, setSavedStatus] = useState(false);
  const tourinSaveTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (content.tourin) {
      setTourinData(JSON.parse(JSON.stringify(content.tourin)));
    }
  }, [content.tourin]);

  if (!tourinData) {
    return <div style={{ padding: '2rem' }}>Loading Tourin Content...</div>;
  }

  const selectedJourney =
    tourinData.journeys?.find((j: any) => j.id === selectedJourneyId) || tourinData.journeys?.[0];

  const applyTourinUpdate = (updated: any) => {
    setTourinData(updated);
    updateDraftInMemory('tourin', updated);

    // Instant zero-refresh live sync to iframes
    try {
      const iframes = document.querySelectorAll('iframe');
      iframes.forEach((frame) => {
        try {
          frame.contentWindow?.postMessage(
            { type: 'DRAFT_UPDATE', section: 'tourin', data: updated },
            '*'
          );
        } catch (e) {}
      });
    } catch (e) {}

    // Debounced draft saving
    if (tourinSaveTimeout.current) clearTimeout(tourinSaveTimeout.current);
    tourinSaveTimeout.current = setTimeout(() => {
      saveDraft('tourin', updated);
    }, 600);
  };

  const handleHeroChange = (field: string, val: any) => {
    const updated = {
      ...tourinData,
      hero: {
        ...(tourinData.hero || {}),
        [field]: val,
      },
    };
    applyTourinUpdate(updated);
  };

  // Update a single property of one of the Section 01 images (Image 1 / 2 / 3)
  const handleHeroImageChange = (key: 'image1' | 'image2' | 'image3', field: string, val: any) => {
    const updated = {
      ...tourinData,
      hero: {
        ...(tourinData.hero || {}),
        [key]: {
          ...(tourinData.hero?.[key] || {}),
          [field]: val,
        },
      },
    };
    applyTourinUpdate(updated);
  };

  const handleGenesisChange = (field: string, val: any) => {
    const updated = {
      ...tourinData,
      genesis: {
        ...(tourinData.genesis || {}),
        [field]: val,
      },
    };
    applyTourinUpdate(updated);
  };

  const handleDestinationChange = (field: string, val: any) => {
    const updated = {
      ...tourinData,
      destination: {
        ...(tourinData.destination || {}),
        [field]: val,
      },
    };
    applyTourinUpdate(updated);
  };

  const handleJourneysTakenChange = (field: string, val: any) => {
    const updated = {
      ...tourinData,
      journeysTaken: {
        ...(tourinData.journeysTaken || {}),
        [field]: val,
      },
    };
    applyTourinUpdate(updated);
  };

  const handleAddPlace = () => {
    const newPlace = {
      id: `place-${Date.now()}`,
      name: 'NEW DESTINATION',
      status: 'Coming Soon',
      subtitle: 'New Routes & Untouched Terrains',
      regions: 'Carefully scouting new regions with local hosts and unhurried pacing.',
      image: '/images/tourin/tourin-hero.jpg',
      isComingSoon: true,
      enabled: true,
    };
    const currentPlaces = tourinData.destination?.places || [
      {
        id: 'ladakh',
        name: 'LADAKH',
        status: 'Active',
        subtitle: 'High Passes, Starlit Deserts & Living Monasteries',
        regions: 'Nubra · Sham Valley · Hanle Dark Sky · Zanskar',
        image: '/images/tourin/dest-ladakh.jpg',
        enabled: true,
      },
      {
        id: 'more-places',
        name: 'ADDING MORE PLACES',
        status: 'Coming Soon',
        subtitle: 'New Routes & Untouched Terrains',
        regions: 'Carefully scouting new regions with local hosts and unhurried pacing.',
        image: '/images/tourin/tourin-hero.jpg',
        isComingSoon: true,
        enabled: true,
      },
    ];
    handleDestinationChange('places', [...currentPlaces, newPlace]);
  };

  const handleUpdatePlace = (index: number, field: string, val: any) => {
    const currentPlaces = [...(tourinData.destination?.places || [])];
    if (!currentPlaces[index]) return;
    currentPlaces[index] = { ...currentPlaces[index], [field]: val };
    handleDestinationChange('places', currentPlaces);
  };

  const handleDeletePlace = (index: number) => {
    const currentPlaces = [...(tourinData.destination?.places || [])];
    currentPlaces.splice(index, 1);
    handleDestinationChange('places', currentPlaces);
  };

  const handlePhilosophyChange = (field: string, val: any) => {
    const updated = {
      ...tourinData,
      philosophy: {
        ...(tourinData.philosophy || {}),
        [field]: val,
      },
    };
    applyTourinUpdate(updated);
  };

  const handleJourneyChange = (field: string, val: any) => {
    if (!selectedJourney) return;
    const updatedJourneys = (tourinData.journeys || []).map((j: any) =>
      j.id === selectedJourney.id ? { ...j, [field]: val } : j
    );
    const updated = { ...tourinData, journeys: updatedJourneys };
    applyTourinUpdate(updated);
  };

  const handleTogglePublished = (id: string) => {
    const updatedJourneys = (tourinData.journeys || []).map((j: any) =>
      j.id === id ? { ...j, published: !j.published } : j
    );
    const updated = { ...tourinData, journeys: updatedJourneys };
    applyTourinUpdate(updated);
  };

  const handleAddNewJourney = () => {
    const newId = `journey-${Date.now()}`;
    const newJourney = {
      id: newId,
      title: 'New Curated Journey',
      duration: '7 Days / 6 Nights',
      type: 'Cultural & Landscape Immersion',
      desc: 'Carefully curated experiential itinerary exploring authentic local living.',
      image: '/images/tourin/dest-ladakh.jpg',
      elevation: '9,500 — 12,000 FT',
      published: true,
    };
    const updated = {
      ...tourinData,
      journeys: [...(tourinData.journeys || []), newJourney],
    };
    setSelectedJourneyId(newId);
    applyTourinUpdate(updated);
  };

  const handleDeleteJourney = () => {
    if (!deleteTargetId) return;
    const updatedJourneys = (tourinData.journeys || []).filter((j: any) => j.id !== deleteTargetId);
    const updated = { ...tourinData, journeys: updatedJourneys };
    if (selectedJourneyId === deleteTargetId) {
      setSelectedJourneyId(updatedJourneys[0]?.id || null);
    }
    setDeleteTargetId(null);
    applyTourinUpdate(updated);
  };

  const handleSave = async () => {
    const ok = await saveDraft('tourin', tourinData);
    if (ok) {
      setSavedStatus(true);
      setTimeout(() => setSavedStatus(false), 2000);
    }
  };

  const handlePublishLive = async () => {
    if (publishSection) {
      const ok = await publishSection('tourin', tourinData);
      if (ok) {
        setSavedStatus(true);
        setTimeout(() => setSavedStatus(false), 2500);
      }
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: '1.5rem', height: 'calc(100vh - 120px)' }}>
      {/* ─── LEFT COLUMN: SECTION-BY-SECTION TOURIN EDITOR ─── */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 650, margin: 0, color: '#111113' }}>
                Tourin Venture &amp; Journeys
              </h2>
              <div style={{ fontSize: '0.76rem', color: '#71717A' }}>
                Destination thinking, high-altitude expeditions &amp; philosophy.
              </div>
            </div>

            {/* Quick Section Dropdown Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#52525B' }}>Section:</span>
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value as any)}
                style={{
                  padding: '0.35rem 0.65rem',
                  borderRadius: '6px',
                  border: '1px solid rgba(0, 0, 0, 0.15)',
                  backgroundColor: '#FFFFFF',
                  color: '#111113',
                  fontSize: '0.78rem',
                  fontWeight: 650,
                  cursor: 'pointer',
                  outline: 'none',
                }}
              >
                <option value="hero">01: Hero &amp; Story</option>
                <option value="genesis">02: The Genesis</option>
                <option value="destination">03: Where We Go</option>
                <option value="philosophy">04: Philosophy</option>
                <option value="journeys">05: Journeys</option>
                <option value="proof">06: Journeys Taken (Proof)</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.65rem' }}>
            {activeTab === 'journeys' && (
              <button
                type="button"
                onClick={handleAddNewJourney}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.45rem 0.95rem',
                  borderRadius: '9999px',
                  border: '1px solid rgba(0, 0, 0, 0.12)',
                  backgroundColor: '#FFFFFF',
                  color: '#111113',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <Plus size={14} />
                Add Journey
              </button>
            )}
            <button
              type="button"
              onClick={handleSave}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.45rem 1rem',
                borderRadius: '9999px',
                border: '1px solid rgba(0, 0, 0, 0.15)',
                backgroundColor: '#FFFFFF',
                color: '#111113',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {savedStatus ? <Check size={14} /> : <Save size={14} />}
              {savedStatus ? 'Draft Saved' : 'Save Draft'}
            </button>
            <button
              type="button"
              onClick={handlePublishLive}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.45rem 1.15rem',
                borderRadius: '9999px',
                border: 'none',
                backgroundColor: '#16A34A',
                color: '#FFFFFF',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <Check size={14} />
              Publish Live
            </button>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '0.25rem',
            padding: '0.4rem 1rem',
            borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
            backgroundColor: '#F4F4F5',
            overflowX: 'auto',
          }}
        >
          {[
            { id: 'hero', label: '01: Hero & Story' },
            { id: 'genesis', label: '02: The Genesis' },
            { id: 'destination', label: '03: Where We Go' },
            { id: 'philosophy', label: '04: Philosophy' },
            { id: 'proof', label: '05: Journeys Taken' },
          ].map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: '0.45rem 0.9rem',
                  fontSize: '0.78rem',
                  fontWeight: active ? 700 : 500,
                  color: active ? '#111113' : '#71717A',
                  background: active ? '#FFFFFF' : 'transparent',
                  border: active ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid transparent',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ─── TAB 01: SECTION 01 — HERO & STORY ─── */}
        {activeTab === 'hero' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', paddingBottom: '0.85rem', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 650, color: '#DE322D', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Section 01: Hero Editorial Grid &amp; Storytelling
              </div>
              <ToggleSwitch
                checked={tourinData.hero?.enabled !== false}
                onChange={(v) => handleHeroChange('enabled', v)}
                label="Enable / Disable entire Section 01"
              />
            </div>

            {tourinData.hero?.enabled === false && (
              <div style={{ padding: '0.7rem 0.9rem', borderRadius: '8px', backgroundColor: '#FEF3C7', color: '#92400E', fontSize: '0.8rem', fontWeight: 600 }}>
                Section 01 is disabled — it is hidden on the Tourin page. Re-enable it to restore the saved content.
              </div>
            )}

            {/* EYEBROW BADGE */}
            <div>
              <FieldLabel
                enabled={tourinData.hero?.eyebrowEnabled !== false}
                onToggle={(v) => handleHeroChange('eyebrowEnabled', v)}
              >
                EYEBROW BADGE
              </FieldLabel>
              <input
                type="text"
                value={tourinData.hero?.eyebrow || ''}
                onChange={(e) => handleHeroChange('eyebrow', e.target.value)}
                placeholder="OWNED EXPERIENTIAL TRAVEL BRAND"
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem' }}
              />
            </div>

            {/* MAIN EDITORIAL HEADLINE */}
            <div>
              <FieldLabel
                enabled={tourinData.hero?.headlineEnabled !== false}
                onToggle={(v) => handleHeroChange('headlineEnabled', v)}
              >
                MAIN EDITORIAL HEADLINE
              </FieldLabel>
              <textarea
                rows={2}
                value={tourinData.hero?.headline || ''}
                onChange={(e) => handleHeroChange('headline', e.target.value)}
                placeholder="Travel beyond the itinerary."
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem', fontFamily: 'inherit' }}
              />
            </div>

            {/* SUB-QUOTE / HOOK */}
            <div>
              <FieldLabel
                enabled={tourinData.hero?.quoteEnabled !== false}
                onToggle={(v) => handleHeroChange('quoteEnabled', v)}
              >
                SUB-QUOTE / HOOK
              </FieldLabel>
              <input
                type="text"
                value={tourinData.hero?.quote || ''}
                onChange={(e) => handleHeroChange('quote', e.target.value)}
                placeholder="Some places are better experienced when you stop trying to see everything."
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem' }}
              />
            </div>

            {/* BODY DESCRIPTION */}
            <div>
              <FieldLabel
                enabled={tourinData.hero?.descriptionEnabled !== false}
                onToggle={(v) => handleHeroChange('descriptionEnabled', v)}
              >
                BODY DESCRIPTION
              </FieldLabel>
              <textarea
                rows={3}
                value={tourinData.hero?.description || ''}
                onChange={(e) => handleHeroChange('description', e.target.value)}
                placeholder="Tourin creates experiential journeys..."
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem', fontFamily: 'inherit' }}
              />
            </div>

{/* ── SECTION 01 IMAGES (Image 1 large + Image 2 & Image 3 equal, stacked) ── */}
            <div style={{ marginTop: '0.25rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#111113', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Section 01 — Images
                </div>
                <span style={{ fontSize: '0.68rem', color: '#8A8A92' }}>
                  Image 2 = Image 3 · Image 2 + gap + Image 3 = Image 1
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '1rem' }}>
                {(['image1', 'image2', 'image3'] as const).map((key, idx) => {
                  const img = tourinData.hero?.[key] || {};
                  return (
                    <div key={key} style={{ border: '1px solid rgba(0,0,0,0.1)', borderRadius: '10px', overflow: 'hidden', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ position: 'relative', width: '100%', height: '118px', backgroundColor: '#F4F4F5' }}>
                        {img.src ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={img.src}
                            alt={img.alt || `Section 01 Image ${idx + 1}`}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: img.enabled === false ? 0.35 : 1 }}
                          />
                        ) : (
                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', color: '#A1A1AA' }}>
                            No image
                          </div>
                        )}
                      </div>

                      <div style={{ padding: '0.7rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.4rem' }}>
                          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#111113' }}>
                            IMAGE {idx + 1}{idx === 0 ? ' · MAIN' : ''}
                          </span>
                          <ToggleSwitch
                            checked={img.enabled !== false}
                            onChange={(v) => handleHeroImageChange(key, 'enabled', v)}
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setMediaTarget(key);
                            setIsMediaPickerOpen(true);
                          }}
                          style={{
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem',
                            padding: '0.45rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.15)',
                            backgroundColor: '#FFFFFF', color: '#111113', fontSize: '0.76rem', fontWeight: 600, cursor: 'pointer',
                          }}
                        >
                          <Upload size={13} />
                          {img.src ? 'Replace / Upload' : 'Upload'}
                        </button>

                        <input
                          type="text"
                          value={img.src || ''}
                          onChange={(e) => handleHeroImageChange(key, 'src', e.target.value)}
                          placeholder="/images/... or https://"
                          style={{ width: '100%', padding: '0.45rem 0.6rem', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.72rem' }}
                        />
                        <input
                          type="text"
                          value={img.alt || ''}
                          onChange={(e) => handleHeroImageChange(key, 'alt', e.target.value)}
                          placeholder="Alt text"
                          style={{ width: '100%', padding: '0.45rem 0.6rem', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.72rem' }}
                        />
                        
                        <div style={{ marginTop: '0.25rem', paddingTop: '0.5rem', borderTop: '1px dashed rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#3F3F46' }}>Clickable Banner</span>
                            <ToggleSwitch
                              checked={img.isClickable !== false}
                              onChange={(v) => handleHeroImageChange(key, 'isClickable', v)}
                            />
                          </div>
                          
                          {img.isClickable !== false && (
                            <>
                              <input
                                type="text"
                                value={img.redirectUrl || ''}
                                onChange={(e) => handleHeroImageChange(key, 'redirectUrl', e.target.value)}
                                placeholder="Redirect URL (e.g. /army-projects or https://...)"
                                style={{ width: '100%', padding: '0.45rem 0.6rem', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.72rem' }}
                              />
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '0.68rem', color: '#71717A' }}>Open in new tab</span>
                                <ToggleSwitch
                                  checked={!!img.openInNewTab}
                                  onChange={(v) => handleHeroImageChange(key, 'openInNewTab', v)}
                                />
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 02: THE GENESIS ─── */}
        {activeTab === 'genesis' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 650, color: '#DE322D', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Section 02: The Genesis (Why Tourin)
                </div>
                <div style={{ fontSize: '0.74rem', color: '#71717A' }}>
                  Foundational storytelling narrative explaining why Tourin was created.
                </div>
              </div>
              <ToggleSwitch
                checked={tourinData.genesis?.enabled !== false}
                onChange={(v) => handleGenesisChange('enabled', v)}
                label="Section Enabled"
              />
            </div>

            {tourinData.genesis?.enabled === false && (
              <div style={{ padding: '0.7rem 0.9rem', borderRadius: '8px', backgroundColor: '#FEF3C7', color: '#92400E', fontSize: '0.8rem', fontWeight: 600 }}>
                Section 02 is disabled and hidden on the website.
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <FieldLabel
                  enabled={tourinData.genesis?.tagEnabled !== false}
                  onToggle={(v) => handleGenesisChange('tagEnabled', v)}
                >
                  SECTION TAG
                </FieldLabel>
                <input
                  type="text"
                  value={tourinData.genesis?.tag || ''}
                  onChange={(e) => handleGenesisChange('tag', e.target.value)}
                  placeholder="THE GENESIS"
                  style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem' }}
                />
              </div>
              <div>
                <FieldLabel
                  enabled={tourinData.genesis?.headingEnabled !== false}
                  onToggle={(v) => handleGenesisChange('headingEnabled', v)}
                >
                  SECTION HEADING
                </FieldLabel>
                <input
                  type="text"
                  value={tourinData.genesis?.heading || ''}
                  onChange={(e) => handleGenesisChange('heading', e.target.value)}
                  placeholder="Why Tourin."
                  style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem' }}
                />
              </div>
            </div>

            <div>
              <FieldLabel
                enabled={tourinData.genesis?.p1Enabled !== false}
                onToggle={(v) => handleGenesisChange('p1Enabled', v)}
              >
                PARAGRAPH 1 (THE REALISATION)
              </FieldLabel>
              <textarea
                rows={2}
                value={tourinData.genesis?.p1 || ''}
                onChange={(e) => handleGenesisChange('p1', e.target.value)}
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem', fontFamily: 'inherit' }}
              />
            </div>

            <div>
              <FieldLabel
                enabled={tourinData.genesis?.p2Enabled !== false}
                onToggle={(v) => handleGenesisChange('p2Enabled', v)}
              >
                PARAGRAPH 2 (THE PLACE BEHIND)
              </FieldLabel>
              <textarea
                rows={2}
                value={tourinData.genesis?.p2 || ''}
                onChange={(e) => handleGenesisChange('p2', e.target.value)}
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem', fontFamily: 'inherit' }}
              />
            </div>

            <div>
              <FieldLabel
                enabled={tourinData.genesis?.p3Enabled !== false}
                onToggle={(v) => handleGenesisChange('p3Enabled', v)}
              >
                PARAGRAPH 3 (OUR PURPOSE)
              </FieldLabel>
              <textarea
                rows={2}
                value={tourinData.genesis?.p3 || ''}
                onChange={(e) => handleGenesisChange('p3', e.target.value)}
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem', fontFamily: 'inherit' }}
              />
            </div>
          </div>
        )}

        {/* ─── TAB 03: WHERE WE GO (DESTINATION) ─── */}
        {activeTab === 'destination' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 650, color: '#DE322D', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Section 03: Where We Go (Destination Policy)
                </div>
                <div style={{ fontSize: '0.74rem', color: '#71717A' }}>
                  Destination thinking, region discovery, and expansion routes.
                </div>
              </div>
              <ToggleSwitch
                checked={tourinData.destination?.enabled !== false}
                onChange={(v) => handleDestinationChange('enabled', v)}
                label="Section Enabled"
              />
            </div>

            {tourinData.destination?.enabled === false && (
              <div style={{ padding: '0.7rem 0.9rem', borderRadius: '8px', backgroundColor: '#FEF3C7', color: '#92400E', fontSize: '0.8rem', fontWeight: 600 }}>
                Section 03 is disabled and hidden on the website.
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <FieldLabel
                  enabled={tourinData.destination?.tagEnabled !== false}
                  onToggle={(v) => handleDestinationChange('tagEnabled', v)}
                >
                  SECTION TAG
                </FieldLabel>
                <input
                  type="text"
                  value={tourinData.destination?.tag || ''}
                  onChange={(e) => handleDestinationChange('tag', e.target.value)}
                  placeholder="THE DESTINATION"
                  style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem' }}
                />
              </div>
              <div>
                <FieldLabel
                  enabled={tourinData.destination?.headingEnabled !== false}
                  onToggle={(v) => handleDestinationChange('headingEnabled', v)}
                >
                  SECTION HEADING
                </FieldLabel>
                <input
                  type="text"
                  value={tourinData.destination?.heading || ''}
                  onChange={(e) => handleDestinationChange('heading', e.target.value)}
                  placeholder="Where we go."
                  style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem' }}
                />
              </div>
            </div>

            <div>
              <FieldLabel
                enabled={tourinData.destination?.primaryEnabled !== false}
                onToggle={(v) => handleDestinationChange('primaryEnabled', v)}
              >
                PRIMARY REGION DESCRIPTION (LADAKH)
              </FieldLabel>
              <textarea
                rows={3}
                value={tourinData.destination?.primary || ''}
                onChange={(e) => handleDestinationChange('primary', e.target.value)}
                placeholder="Ladakh is our home ground and primary destination..."
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem', fontFamily: 'inherit' }}
              />
            </div>

            <div>
              <FieldLabel
                enabled={tourinData.destination?.upcomingEnabled !== false}
                onToggle={(v) => handleDestinationChange('upcomingEnabled', v)}
              >
                EXPANSION / COMING SOON COPY
              </FieldLabel>
              <textarea
                rows={2}
                value={tourinData.destination?.upcoming || ''}
                onChange={(e) => handleDestinationChange('upcoming', e.target.value)}
                placeholder="We will be adding more places (coming soon) as new journeys and routes are finalized."
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem', fontFamily: 'inherit' }}
              />
            </div>

            {/* Places / Destination Cards List */}
            <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#111113' }}>
                  DESTINATION CARDS ({tourinData.destination?.places?.length || 2})
                </div>
                <button
                  type="button"
                  onClick={handleAddPlace}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '9999px',
                    border: '1px solid rgba(0, 0, 0, 0.15)',
                    backgroundColor: '#FFFFFF',
                    color: '#111113',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  <Plus size={13} />
                  Add Destination Place
                </button>
              </div>

              {(tourinData.destination?.places || [
                {
                  id: 'ladakh',
                  name: 'LADAKH',
                  status: 'Active',
                  subtitle: 'High Passes, Starlit Deserts & Living Monasteries',
                  regions: 'Nubra · Sham Valley · Hanle Dark Sky · Zanskar',
                  image: '/images/tourin/dest-ladakh.jpg',
                  enabled: true,
                },
                {
                  id: 'more-places',
                  name: 'ADDING MORE PLACES',
                  status: 'Coming Soon',
                  subtitle: 'New Routes & Untouched Terrains',
                  regions: 'Carefully scouting new regions with local hosts and unhurried pacing.',
                  image: '/images/tourin/tourin-hero.jpg',
                  isComingSoon: true,
                  enabled: true,
                },
              ]).map((place: any, pIdx: number) => (
                <div
                  key={place.id || pIdx}
                  style={{
                    padding: '1rem',
                    borderRadius: '10px',
                    border: '1px solid rgba(0,0,0,0.08)',
                    backgroundColor: '#FAFAFA',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: place.isComingSoon ? '#DE322D' : '#16A34A', textTransform: 'uppercase' }}>
                      {place.status || (place.isComingSoon ? 'Coming Soon' : 'Active')}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <ToggleSwitch
                        checked={place.enabled !== false}
                        onChange={(v) => handleUpdatePlace(pIdx, 'enabled', v)}
                        label="Place Enabled"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeletePlace(pIdx)}
                        title="Delete Place"
                        style={{ border: 'none', background: 'transparent', color: '#EF4444', cursor: 'pointer', padding: '0.2rem' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, color: '#52525B', marginBottom: '0.2rem' }}>
                        NAME
                      </label>
                      <input
                        type="text"
                        value={place.name || ''}
                        onChange={(e) => handleUpdatePlace(pIdx, 'name', e.target.value)}
                        style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.82rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, color: '#52525B', marginBottom: '0.2rem' }}>
                        STATUS BADGE (e.g. Active / Coming Soon)
                      </label>
                      <input
                        type="text"
                        value={place.status || ''}
                        onChange={(e) => {
                          handleUpdatePlace(pIdx, 'status', e.target.value);
                          handleUpdatePlace(pIdx, 'isComingSoon', e.target.value.toLowerCase().includes('soon'));
                        }}
                        style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.82rem' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, color: '#52525B', marginBottom: '0.2rem' }}>
                      SUBTITLE
                    </label>
                    <input
                      type="text"
                      value={place.subtitle || ''}
                      onChange={(e) => handleUpdatePlace(pIdx, 'subtitle', e.target.value)}
                      style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.82rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, color: '#52525B', marginBottom: '0.2rem' }}>
                      REGIONS / SUMMARY
                    </label>
                    <input
                      type="text"
                      value={place.regions || ''}
                      onChange={(e) => handleUpdatePlace(pIdx, 'regions', e.target.value)}
                      style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.82rem' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── TAB 04: PHILOSOPHY ─── */}
        {activeTab === 'philosophy' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 650, color: '#DE322D', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Section 04: Our Philosophy &amp; Core Belief
                </div>
                <div style={{ fontSize: '0.74rem', color: '#71717A' }}>
                  Principles, authentic pacing, and core experiential convictions.
                </div>
              </div>
              <ToggleSwitch
                checked={tourinData.philosophy?.enabled !== false}
                onChange={(v) => handlePhilosophyChange('enabled', v)}
                label="Section Enabled"
              />
            </div>

            {tourinData.philosophy?.enabled === false && (
              <div style={{ padding: '0.7rem 0.9rem', borderRadius: '8px', backgroundColor: '#FEF3C7', color: '#92400E', fontSize: '0.8rem', fontWeight: 600 }}>
                Section 04 is disabled and hidden on the website.
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <FieldLabel
                  enabled={tourinData.philosophy?.tagEnabled !== false}
                  onToggle={(v) => handlePhilosophyChange('tagEnabled', v)}
                >
                  SECTION TAG
                </FieldLabel>
                <input
                  type="text"
                  value={tourinData.philosophy?.tag || ''}
                  onChange={(e) => handlePhilosophyChange('tag', e.target.value)}
                  placeholder="OUR PHILOSOPHY"
                  style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem' }}
                />
              </div>
              <div>
                <FieldLabel
                  enabled={tourinData.philosophy?.headingEnabled !== false}
                  onToggle={(v) => handlePhilosophyChange('headingEnabled', v)}
                >
                  SECTION HEADING
                </FieldLabel>
                <input
                  type="text"
                  value={tourinData.philosophy?.heading || ''}
                  onChange={(e) => handlePhilosophyChange('heading', e.target.value)}
                  placeholder="What we believe."
                  style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem' }}
                />
              </div>
            </div>

            <div>
              <FieldLabel
                enabled={tourinData.philosophy?.p1Enabled !== false}
                onToggle={(v) => handlePhilosophyChange('p1Enabled', v)}
              >
                PARAGRAPH 1 (SENSE OF PLACE)
              </FieldLabel>
              <textarea
                rows={2}
                value={tourinData.philosophy?.p1 || ''}
                onChange={(e) => handlePhilosophyChange('p1', e.target.value)}
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem', fontFamily: 'inherit' }}
              />
            </div>

            <div>
              <FieldLabel
                enabled={tourinData.philosophy?.p2Enabled !== false}
                onToggle={(v) => handlePhilosophyChange('p2Enabled', v)}
              >
                PARAGRAPH 2 (IMMERSIVE ACTIONS)
              </FieldLabel>
              <textarea
                rows={2}
                value={tourinData.philosophy?.p2 || ''}
                onChange={(e) => handlePhilosophyChange('p2', e.target.value)}
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem', fontFamily: 'inherit' }}
              />
            </div>

            <div>
              <FieldLabel
                enabled={tourinData.philosophy?.quoteEnabled !== false}
                onToggle={(v) => handlePhilosophyChange('quoteEnabled', v)}
              >
                SIGNATURE QUOTE BLOCK
              </FieldLabel>
              <textarea
                rows={2}
                value={tourinData.philosophy?.quote || ''}
                onChange={(e) => handlePhilosophyChange('quote', e.target.value)}
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem', fontFamily: 'inherit' }}
              />
            </div>
          </div>
        )}



        {/* ─── TAB 06: JOURNEYS TAKEN (PROOF) ─── */}
        {activeTab === 'proof' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 650, color: '#DE322D', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Section 06: Journeys Already Taken (Proof &amp; Track Record)
                </div>
                <div style={{ fontSize: '0.74rem', color: '#71717A' }}>
                  Focus on depth, execution quality, and medical safety.
                </div>
              </div>
              <ToggleSwitch
                checked={tourinData.journeysTaken?.enabled !== false}
                onChange={(v) => handleJourneysTakenChange('enabled', v)}
                label="Section Enabled"
              />
            </div>

            {tourinData.journeysTaken?.enabled === false && (
              <div style={{ padding: '0.7rem 0.9rem', borderRadius: '8px', backgroundColor: '#FEF3C7', color: '#92400E', fontSize: '0.8rem', fontWeight: 600 }}>
                Section 06 is disabled and hidden on the website.
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <FieldLabel
                  enabled={tourinData.journeysTaken?.tagEnabled !== false}
                  onToggle={(v) => handleJourneysTakenChange('tagEnabled', v)}
                >
                  SECTION TAG
                </FieldLabel>
                <input
                  type="text"
                  value={tourinData.journeysTaken?.tag || ''}
                  onChange={(e) => handleJourneysTakenChange('tag', e.target.value)}
                  placeholder="PROOF THAT IT WORKS"
                  style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem' }}
                />
              </div>
              <div>
                <FieldLabel
                  enabled={tourinData.journeysTaken?.headingEnabled !== false}
                  onToggle={(v) => handleJourneysTakenChange('headingEnabled', v)}
                >
                  SECTION HEADING
                </FieldLabel>
                <input
                  type="text"
                  value={tourinData.journeysTaken?.heading || ''}
                  onChange={(e) => handleJourneysTakenChange('heading', e.target.value)}
                  placeholder="Journeys already taken."
                  style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem' }}
                />
              </div>
            </div>

            <div>
              <FieldLabel
                enabled={tourinData.journeysTaken?.p1Enabled !== false}
                onToggle={(v) => handleJourneysTakenChange('p1Enabled', v)}
              >
                PRIMARY SUMMARY PARAGRAPH
              </FieldLabel>
              <textarea
                rows={3}
                value={tourinData.journeysTaken?.p1 || ''}
                onChange={(e) => handleJourneysTakenChange('p1', e.target.value)}
                placeholder="Tourin has successfully guided private cultural journeys..."
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem', fontFamily: 'inherit' }}
              />
            </div>

            <div>
              <FieldLabel
                enabled={tourinData.journeysTaken?.p2Enabled !== false}
                onToggle={(v) => handleJourneysTakenChange('p2Enabled', v)}
              >
                OPERATIONAL &amp; SAFETY DETAIL PARAGRAPH
              </FieldLabel>
              <textarea
                rows={2}
                value={tourinData.journeysTaken?.p2 || ''}
                onChange={(e) => handleJourneysTakenChange('p2', e.target.value)}
                placeholder="Proven on high-altitude routes with trusted local relationships..."
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem', fontFamily: 'inherit' }}
              />
            </div>
          </div>
        )}


      </div>

      {/* ─── RIGHT COLUMN: REAL-TIME LIVE PREVIEW ─── */}
      <div style={{ height: '100%' }}>
        <LivePreviewPanel previewUrl="/tourin" />
      </div>

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => {
          setIsMediaPickerOpen(false);
          setMediaTarget(null);
        }}
        mediaType="image"
        initialUrl={
          mediaTarget === 'image1'
            ? tourinData.hero?.image1?.src || ''
            : mediaTarget === 'image2'
            ? tourinData.hero?.image2?.src || ''
            : mediaTarget === 'image3'
            ? tourinData.hero?.image3?.src || ''
            : selectedJourney?.image || ''
        }
        onSelect={(url) => {
          if (mediaTarget === 'image1' || mediaTarget === 'image2' || mediaTarget === 'image3') {
            handleHeroImageChange(mediaTarget, 'src', url);
          } else {
            handleJourneyChange('image', url);
          }
          setIsMediaPickerOpen(false);
          setMediaTarget(null);
        }}
      />

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={!!deleteTargetId}
        title="Delete Curated Journey?"
        message="This itinerary will be permanently removed from your Tourin venture."
        confirmLabel="Delete"
        onConfirm={handleDeleteJourney}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
