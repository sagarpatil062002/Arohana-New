'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCmsContent } from '@/lib/cms/content-context';
import LivePreviewPanel from '@/components/admin/LivePreviewPanel';
import MediaPickerModal from '@/components/admin/MediaPickerModal';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { Plus, Trash2, Eye, EyeOff, Save, Check, Upload, Compass, ChevronUp, ChevronDown } from 'lucide-react';

export default function AdminTourinPage() {
  const { content, saveDraft, updateDraftInMemory } = useCmsContent();
  const [tourinData, setTourinData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'hero' | 'genesis' | 'destination' | 'philosophy' | 'journeys' | 'proof' | 'stats'>('hero');
  const [selectedJourneyId, setSelectedJourneyId] = useState<string | null>('slow-ladakh');
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [savedStatus, setSavedStatus] = useState(false);

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

  const handleHeroChange = (field: string, val: any) => {
    const updated = {
      ...tourinData,
      hero: {
        ...(tourinData.hero || {}),
        [field]: val,
      },
    };
    setTourinData(updated);
    updateDraftInMemory('tourin', updated);
  };

  const handleGenesisChange = (field: string, val: any) => {
    const updated = {
      ...tourinData,
      genesis: {
        ...(tourinData.genesis || {}),
        [field]: val,
      },
    };
    setTourinData(updated);
    updateDraftInMemory('tourin', updated);
  };

  const handleDestinationChange = (field: string, val: any) => {
    const updated = {
      ...tourinData,
      destination: {
        ...(tourinData.destination || {}),
        [field]: val,
      },
    };
    setTourinData(updated);
    updateDraftInMemory('tourin', updated);
  };

  const handleJourneysTakenChange = (field: string, val: any) => {
    const updated = {
      ...tourinData,
      journeysTaken: {
        ...(tourinData.journeysTaken || {}),
        [field]: val,
      },
    };
    setTourinData(updated);
    updateDraftInMemory('tourin', updated);
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
    };
    const currentPlaces = tourinData.destination?.places || [
      {
        id: 'ladakh',
        name: 'LADAKH',
        status: 'Active',
        subtitle: 'High Passes, Starlit Deserts & Living Monasteries',
        regions: 'Nubra · Sham Valley · Hanle Dark Sky · Zanskar',
        image: '/images/tourin/dest-ladakh.jpg',
      },
      {
        id: 'more-places',
        name: 'ADDING MORE PLACES',
        status: 'Coming Soon',
        subtitle: 'New Routes & Untouched Terrains',
        regions: 'Carefully scouting new regions with local hosts and unhurried pacing.',
        image: '/images/tourin/tourin-hero.jpg',
        isComingSoon: true,
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
    setTourinData(updated);
    updateDraftInMemory('tourin', updated);
  };

  const handleJourneyChange = (field: string, val: any) => {
    if (!selectedJourney) return;
    const updatedJourneys = tourinData.journeys.map((j: any) =>
      j.id === selectedJourney.id ? { ...j, [field]: val } : j
    );
    const updated = { ...tourinData, journeys: updatedJourneys };
    setTourinData(updated);
    updateDraftInMemory('tourin', updated);
  };

  const handleTogglePublished = (id: string) => {
    const updatedJourneys = tourinData.journeys.map((j: any) =>
      j.id === id ? { ...j, published: !j.published } : j
    );
    const updated = { ...tourinData, journeys: updatedJourneys };
    setTourinData(updated);
    updateDraftInMemory('tourin', updated);
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
    setTourinData(updated);
    setSelectedJourneyId(newId);
    updateDraftInMemory('tourin', updated);
  };

  const handleDeleteJourney = () => {
    if (!deleteTargetId) return;
    const updatedJourneys = tourinData.journeys.filter((j: any) => j.id !== deleteTargetId);
    const updated = { ...tourinData, journeys: updatedJourneys };
    setTourinData(updated);
    if (selectedJourneyId === deleteTargetId) {
      setSelectedJourneyId(updatedJourneys[0]?.id || null);
    }
    setDeleteTargetId(null);
    updateDraftInMemory('tourin', updated);
  };

  const handleStatChange = (index: number, field: string, val: string) => {
    const updatedStats = [...(tourinData.stats || [])];
    if (!updatedStats[index]) updatedStats[index] = { value: '', label: '' };
    updatedStats[index] = { ...updatedStats[index], [field]: val };
    const updated = { ...tourinData, stats: updatedStats };
    setTourinData(updated);
    updateDraftInMemory('tourin', updated);
  };

  const handleSave = async () => {
    const ok = await saveDraft('tourin', tourinData);
    if (ok) {
      setSavedStatus(true);
      setTimeout(() => setSavedStatus(false), 2000);
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
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 650, margin: 0, color: '#111113' }}>
              Tourin Venture &amp; Journeys
            </h2>
            <div style={{ fontSize: '0.76rem', color: '#71717A' }}>
              Destination thinking, high-altitude expeditions &amp; philosophy.
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
                padding: '0.45rem 1.15rem',
                borderRadius: '9999px',
                border: 'none',
                backgroundColor: savedStatus ? '#16A34A' : '#111113',
                color: '#FFFFFF',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {savedStatus ? <Check size={14} /> : <Save size={14} />}
              {savedStatus ? 'Saved' : 'Save Draft'}
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
            { id: 'journeys', label: `05: Journeys (${tourinData.journeys?.length || 0})` },
            { id: 'proof', label: '06: Journeys Taken' },
            { id: 'stats', label: '07: Readiness Stats' },
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

        {/* ─── TAB 01: HERO & STORY ─── */}
        {activeTab === 'hero' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 650, color: '#DE322D', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Section 01: Hero Editorial Grid &amp; Storytelling
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                EYEBROW BADGE
              </label>
              <input
                type="text"
                value={tourinData.hero?.eyebrow || ''}
                onChange={(e) => handleHeroChange('eyebrow', e.target.value)}
                placeholder="OWNED EXPERIENTIAL TRAVEL BRAND"
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                MAIN EDITORIAL HEADLINE
              </label>
              <textarea
                rows={2}
                value={tourinData.hero?.headline || ''}
                onChange={(e) => handleHeroChange('headline', e.target.value)}
                placeholder="Travel beyond the itinerary."
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem', fontFamily: 'inherit' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                SUB-QUOTE / HOOK
              </label>
              <input
                type="text"
                value={tourinData.hero?.quote || ''}
                onChange={(e) => handleHeroChange('quote', e.target.value)}
                placeholder="Some places are better experienced when you stop trying to see everything."
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                BODY DESCRIPTION
              </label>
              <textarea
                rows={3}
                value={tourinData.hero?.description || ''}
                onChange={(e) => handleHeroChange('description', e.target.value)}
                placeholder="Tourin creates experiential journeys..."
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem', fontFamily: 'inherit' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  PRIMARY DESTINATION
                </label>
                <input
                  type="text"
                  value={tourinData.hero?.primaryDestination || ''}
                  onChange={(e) => handleHeroChange('primaryDestination', e.target.value)}
                  placeholder="Ladakh, Himalayan Plateau"
                  style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  OPERATIONAL ELEVATION
                </label>
                <input
                  type="text"
                  value={tourinData.hero?.elevation || ''}
                  onChange={(e) => handleHeroChange('elevation', e.target.value)}
                  placeholder="11,500 – 17,580 FT"
                  style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem' }}
                />
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 02: THE GENESIS ─── */}
        {activeTab === 'genesis' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 650, color: '#DE322D', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Section 02: The Genesis (Why Tourin)
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  SECTION TAG
                </label>
                <input
                  type="text"
                  value={tourinData.genesis?.tag || ''}
                  onChange={(e) => handleGenesisChange('tag', e.target.value)}
                  placeholder="THE GENESIS"
                  style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  SECTION HEADING
                </label>
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
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                PARAGRAPH 1 (THE REALISATION)
              </label>
              <textarea
                rows={2}
                value={tourinData.genesis?.p1 || ''}
                onChange={(e) => handleGenesisChange('p1', e.target.value)}
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem', fontFamily: 'inherit' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                PARAGRAPH 2 (THE PLACE BEHIND)
              </label>
              <textarea
                rows={2}
                value={tourinData.genesis?.p2 || ''}
                onChange={(e) => handleGenesisChange('p2', e.target.value)}
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem', fontFamily: 'inherit' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                PARAGRAPH 3 (OUR PURPOSE)
              </label>
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
            <div style={{ fontSize: '0.85rem', fontWeight: 650, color: '#DE322D', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Section 03: Where We Go (Destination Policy)
            </div>
            <div style={{ fontSize: '0.78rem', color: '#71717A', lineHeight: 1.5 }}>
              Currently kept focused exclusively on <strong>Ladakh</strong>. Copy indicates more destinations are being added (coming soon) without displaying placeholder cards.
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  SECTION TAG
                </label>
                <input
                  type="text"
                  value={tourinData.destination?.tag || ''}
                  onChange={(e) => handleDestinationChange('tag', e.target.value)}
                  placeholder="THE DESTINATION"
                  style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  SECTION HEADING
                </label>
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
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                PRIMARY REGION DESCRIPTION (LADAKH)
              </label>
              <textarea
                rows={3}
                value={tourinData.destination?.primary || ''}
                onChange={(e) => handleDestinationChange('primary', e.target.value)}
                placeholder="Ladakh is our home ground and primary destination..."
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem', fontFamily: 'inherit' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                EXPANSION / COMING SOON COPY
              </label>
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
                },
                {
                  id: 'more-places',
                  name: 'ADDING MORE PLACES',
                  status: 'Coming Soon',
                  subtitle: 'New Routes & Untouched Terrains',
                  regions: 'Carefully scouting new regions with local hosts and unhurried pacing.',
                  image: '/images/tourin/tourin-hero.jpg',
                  isComingSoon: true,
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
                    <button
                      type="button"
                      onClick={() => handleDeletePlace(pIdx)}
                      title="Delete Place"
                      style={{ border: 'none', background: 'transparent', color: '#EF4444', cursor: 'pointer', padding: '0.2rem' }}
                    >
                      <Trash2 size={14} />
                    </button>
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
            <div style={{ fontSize: '0.85rem', fontWeight: 650, color: '#DE322D', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Section 03: Our Philosophy &amp; Core Belief
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  SECTION TAG
                </label>
                <input
                  type="text"
                  value={tourinData.philosophy?.tag || ''}
                  onChange={(e) => handlePhilosophyChange('tag', e.target.value)}
                  placeholder="OUR PHILOSOPHY"
                  style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  SECTION HEADING
                </label>
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
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                PARAGRAPH 1 (SENSE OF PLACE)
              </label>
              <textarea
                rows={2}
                value={tourinData.philosophy?.p1 || ''}
                onChange={(e) => handlePhilosophyChange('p1', e.target.value)}
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem', fontFamily: 'inherit' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                PARAGRAPH 2 (IMMERSIVE ACTIONS)
              </label>
              <textarea
                rows={2}
                value={tourinData.philosophy?.p2 || ''}
                onChange={(e) => handlePhilosophyChange('p2', e.target.value)}
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem', fontFamily: 'inherit' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                SIGNATURE QUOTE BLOCK
              </label>
              <textarea
                rows={2}
                value={tourinData.philosophy?.quote || ''}
                onChange={(e) => handlePhilosophyChange('quote', e.target.value)}
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem', fontFamily: 'inherit' }}
              />
            </div>
          </div>
        )}

        {/* ─── TAB 04: JOURNEYS DIRECTORY ─── */}
        {activeTab === 'journeys' && (
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '220px 1fr', overflow: 'hidden' }}>
            {/* Journeys List */}
            <div
              style={{
                borderRight: '1px solid rgba(0, 0, 0, 0.08)',
                overflowY: 'auto',
                padding: '0.75rem',
                backgroundColor: '#FAFAFA',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem',
              }}
            >
              {tourinData.journeys.map((j: any) => {
                const isSelected = j.id === selectedJourney?.id;
                return (
                  <div
                    key={j.id}
                    onClick={() => setSelectedJourneyId(j.id)}
                    style={{
                      padding: '0.65rem',
                      borderRadius: '8px',
                      backgroundColor: isSelected ? '#FFFFFF' : 'transparent',
                      border: isSelected ? '1px solid rgba(0, 0, 0, 0.12)' : '1px solid transparent',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ fontSize: '0.82rem', fontWeight: 650, color: '#111113' }}>
                      {j.title}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#71717A', marginTop: '2px' }}>
                      {j.duration}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Journey Form Editor */}
            {selectedJourney && (
              <div style={{ overflowY: 'auto', padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#DE322D', letterSpacing: '0.1em' }}>
                    JOURNEY: {selectedJourney.title}
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => handleTogglePublished(selectedJourney.id)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        padding: '0.3rem 0.65rem',
                        borderRadius: '9999px',
                        border: '1px solid rgba(0, 0, 0, 0.1)',
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        backgroundColor: selectedJourney.published !== false ? '#DCFCE7' : '#F4F4F5',
                        color: selectedJourney.published !== false ? '#16A34A' : '#71717A',
                        cursor: 'pointer',
                      }}
                    >
                      {selectedJourney.published !== false ? <Eye size={12} /> : <EyeOff size={12} />}
                      {selectedJourney.published !== false ? 'Visible' : 'Hidden'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteTargetId(selectedJourney.id)}
                      title="Delete Journey"
                      style={{ border: 'none', backgroundColor: 'transparent', color: '#EF4444', cursor: 'pointer' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                      JOURNEY TITLE
                    </label>
                    <input
                      type="text"
                      value={selectedJourney.title || ''}
                      onChange={(e) => handleJourneyChange('title', e.target.value)}
                      style={{ width: '100%', padding: '0.55rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                      DURATION
                    </label>
                    <input
                      type="text"
                      value={selectedJourney.duration || ''}
                      onChange={(e) => handleJourneyChange('duration', e.target.value)}
                      placeholder="8 Days / 7 Nights"
                      style={{ width: '100%', padding: '0.55rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                      TYPE / THEME
                    </label>
                    <input
                      type="text"
                      value={selectedJourney.type || ''}
                      onChange={(e) => handleJourneyChange('type', e.target.value)}
                      placeholder="Cultural Immersion & Slow Exploration"
                      style={{ width: '100%', padding: '0.55rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                      ELEVATION
                    </label>
                    <input
                      type="text"
                      value={selectedJourney.elevation || ''}
                      onChange={(e) => handleJourneyChange('elevation', e.target.value)}
                      placeholder="9,500 — 11,500 FT"
                      style={{ width: '100%', padding: '0.55rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                    DESCRIPTION
                  </label>
                  <textarea
                    rows={2}
                    value={selectedJourney.desc || selectedJourney.overview || ''}
                    onChange={(e) => handleJourneyChange('desc', e.target.value)}
                    style={{ width: '100%', padding: '0.55rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem', fontFamily: 'inherit' }}
                  />
                </div>

                {/* Media Image */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                    FEATURED DESTINATION PHOTO
                  </label>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div
                      style={{
                        position: 'relative',
                        width: '80px',
                        height: '60px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        backgroundColor: '#F4F4F5',
                        border: '1px solid rgba(0,0,0,0.1)',
                        flexShrink: 0,
                      }}
                    >
                      {selectedJourney.image ? (
                        <Image src={selectedJourney.image} alt={selectedJourney.title} fill style={{ objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A1A1AA' }}>
                          No Image
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsMediaPickerOpen(true)}
                      style={{
                        padding: '0.45rem 0.85rem',
                        borderRadius: '9999px',
                        border: '1px solid rgba(0, 0, 0, 0.15)',
                        backgroundColor: '#FFFFFF',
                        color: '#111113',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                      }}
                    >
                      <Upload size={13} />
                      Replace / Upload Image
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── TAB 06: JOURNEYS TAKEN (PROOF) ─── */}
        {activeTab === 'proof' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 650, color: '#DE322D', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Section 06: Journeys Already Taken (Proof &amp; Track Record)
            </div>
            <div style={{ fontSize: '0.78rem', color: '#71717A', lineHeight: 1.5 }}>
              Focus on depth, execution quality, and medical safety. <em>(Guideline: Avoid arbitrary numbers or metrics in narrative copy).</em>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  SECTION TAG
                </label>
                <input
                  type="text"
                  value={tourinData.journeysTaken?.tag || ''}
                  onChange={(e) => handleJourneysTakenChange('tag', e.target.value)}
                  placeholder="PROOF THAT IT WORKS"
                  style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  SECTION HEADING
                </label>
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
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                PRIMARY SUMMARY PARAGRAPH
              </label>
              <textarea
                rows={3}
                value={tourinData.journeysTaken?.p1 || ''}
                onChange={(e) => handleJourneysTakenChange('p1', e.target.value)}
                placeholder="Tourin has successfully guided private cultural journeys..."
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem', fontFamily: 'inherit' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                OPERATIONAL &amp; SAFETY DETAIL PARAGRAPH
              </label>
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

        {/* ─── TAB 07: READINESS STATS ─── */}
        {activeTab === 'stats' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 650, color: '#DE322D', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Section 05: Operational Readiness &amp; Pacing Stats (4 Metrics)
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {(tourinData.stats || [{}, {}, {}, {}]).map((stat: any, idx: number) => (
                <div key={idx} style={{ padding: '1rem', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '10px', backgroundColor: '#FAFAFA' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#DE322D', marginBottom: '0.5rem' }}>
                    METRIC CARD {String(idx + 1).padStart(2, '0')}
                  </div>
                  <div style={{ marginBottom: '0.75rem' }}>
                    <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, color: '#52525B', marginBottom: '0.25rem' }}>
                      VALUE / METRIC
                    </label>
                    <input
                      type="text"
                      value={stat.value || ''}
                      onChange={(e) => handleStatChange(idx, 'value', e.target.value)}
                      placeholder="17,580 FT"
                      style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.82rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, color: '#52525B', marginBottom: '0.25rem' }}>
                      LABEL
                    </label>
                    <input
                      type="text"
                      value={stat.label || ''}
                      onChange={(e) => handleStatChange(idx, 'label', e.target.value)}
                      placeholder="Maximum Altitude Reached"
                      style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.82rem' }}
                    />
                  </div>
                </div>
              ))}
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
        onClose={() => setIsMediaPickerOpen(false)}
        mediaType="image"
        onSelect={(url) => {
          handleJourneyChange('image', url);
          setIsMediaPickerOpen(false);
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
