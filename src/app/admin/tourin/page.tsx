'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCmsContent } from '@/lib/cms/content-context';
import LivePreviewPanel from '@/components/admin/LivePreviewPanel';
import MediaPickerModal from '@/components/admin/MediaPickerModal';
import { Plus, Trash2, Eye, EyeOff, Save, Check, Upload, Compass } from 'lucide-react';

export default function AdminTourinPage() {
  const { content, saveDraft, updateDraftInMemory } = useCmsContent();
  const [tourinData, setTourinData] = useState<any>(null);
  const [selectedJourneyId, setSelectedJourneyId] = useState<string | null>('journey-1');
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
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
        ...tourinData.hero,
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

  const handleSave = async () => {
    const ok = await saveDraft('tourin', tourinData);
    if (ok) {
      setSavedStatus(true);
      setTimeout(() => setSavedStatus(false), 2000);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: '1.5rem', height: 'calc(100vh - 120px)' }}>
      {/* ─── LEFT COLUMN: TOURIN EDITOR ─── */}
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
              Tourin Brand &amp; Journeys
            </h2>
            <div style={{ fontSize: '0.76rem', color: '#71717A' }}>
              Destination thinking, high-altitude expeditions &amp; itineraries.
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
            }}
          >
            {savedStatus ? <Check size={14} /> : <Save size={14} />}
            {savedStatus ? 'Saved' : 'Save Draft'}
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Section 1: Hero & Destination Settings */}
          <div
            style={{
              backgroundColor: '#F8F8FA',
              borderRadius: '12px',
              padding: '1.25rem',
              border: '1px solid rgba(0, 0, 0, 0.06)',
            }}
          >
            <h3 style={{ fontSize: '0.9rem', fontWeight: 650, color: '#111113', margin: '0 0 1rem 0' }}>
              Brand Headline &amp; Destination Settings
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  HEADLINE
                </label>
                <input
                  type="text"
                  value={tourinData.hero.headline || ''}
                  onChange={(e) => handleHeroChange('headline', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.85rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(0, 0, 0, 0.12)',
                    fontSize: '0.85rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  PRIMARY DESTINATION
                </label>
                <input
                  type="text"
                  value={tourinData.hero.primaryDestination || ''}
                  onChange={(e) => handleHeroChange('primaryDestination', e.target.value)}
                  placeholder="e.g. Ladakh, Himachal, Kashmir, Uttarakhand, Rajasthan"
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.85rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(0, 0, 0, 0.12)',
                    fontSize: '0.85rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  MISSION / OVERVIEW STATEMENT
                </label>
                <textarea
                  rows={2}
                  value={tourinData.hero.subheadline || ''}
                  onChange={(e) => handleHeroChange('subheadline', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.85rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(0, 0, 0, 0.12)',
                    fontSize: '0.85rem',
                    outline: 'none',
                    fontFamily: 'inherit',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Section 2: Journeys Management */}
          <div>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 650, color: '#111113', margin: '0 0 1rem 0' }}>
              Expedition Journeys ({tourinData.journeys.length})
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {tourinData.journeys.map((j: any) => {
                const isSelected = j.id === selectedJourney?.id;
                return (
                  <div
                    key={j.id}
                    onClick={() => setSelectedJourneyId(j.id)}
                    style={{
                      padding: '1rem',
                      borderRadius: '12px',
                      backgroundColor: isSelected ? '#FFFFFF' : '#FAFAFA',
                      border: isSelected ? '1.5px solid #DE322D' : '1px solid rgba(0, 0, 0, 0.08)',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 650, color: '#111113' }}>
                        {j.title}
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#71717A', fontWeight: 500 }}>
                        {j.duration}
                      </span>
                    </div>

                    {isSelected && (
                      <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.25rem' }}>
                            JOURNEY TITLE
                          </label>
                          <input
                            type="text"
                            value={j.title || ''}
                            onChange={(e) => handleJourneyChange('title', e.target.value)}
                            style={{
                              width: '100%',
                              padding: '0.45rem 0.75rem',
                              borderRadius: '6px',
                              border: '1px solid rgba(0, 0, 0, 0.12)',
                              fontSize: '0.82rem',
                            }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.25rem' }}>
                            OVERVIEW
                          </label>
                          <textarea
                            rows={2}
                            value={j.overview || ''}
                            onChange={(e) => handleJourneyChange('overview', e.target.value)}
                            style={{
                              width: '100%',
                              padding: '0.45rem 0.75rem',
                              borderRadius: '6px',
                              border: '1px solid rgba(0, 0, 0, 0.12)',
                              fontSize: '0.82rem',
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ─── RIGHT COLUMN: REAL-TIME LIVE PREVIEW ─── */}
      <div style={{ height: '100%' }}>
        <LivePreviewPanel previewUrl="/tourin" />
      </div>
    </div>
  );
}
