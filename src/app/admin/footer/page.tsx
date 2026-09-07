'use client';

import React, { useState, useEffect } from 'react';
import { useCmsContent } from '@/lib/cms/content-context';
import { Save, Check } from 'lucide-react';

export default function AdminFooterPage() {
  const { content, saveDraft, updateDraftInMemory } = useCmsContent();
  const [footerData, setFooterData] = useState<any>(null);
  const [savedStatus, setSavedStatus] = useState(false);

  useEffect(() => {
    if (content.footer) {
      setFooterData(JSON.parse(JSON.stringify(content.footer)));
    }
  }, [content.footer]);

  if (!footerData) {
    return <div style={{ padding: '2rem' }}>Loading Footer Settings...</div>;
  }

  const handleChange = (field: string, val: any) => {
    const updated = { ...footerData, [field]: val };
    setFooterData(updated);
    updateDraftInMemory('footer', updated);
  };

  const handleSave = async () => {
    const ok = await saveDraft('footer', footerData);
    if (ok) {
      setSavedStatus(true);
      setTimeout(() => setSavedStatus(false), 2000);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          padding: '1.75rem',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 650, margin: 0, color: '#111113' }}>
              Footer Settings
            </h2>
            <div style={{ fontSize: '0.78rem', color: '#71717A' }}>
              Global tagline, copyright, and location badges across all pages.
            </div>
          </div>
          <button
            type="button"
            onClick={handleSave}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.45rem 1.25rem',
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
              BRAND TAGLINE
            </label>
            <textarea
              rows={2}
              value={footerData.tagline || ''}
              onChange={(e) => handleChange('tagline', e.target.value)}
              style={{
                width: '100%',
                padding: '0.55rem 0.85rem',
                borderRadius: '8px',
                border: '1px solid rgba(0, 0, 0, 0.12)',
                fontSize: '0.85rem',
                fontFamily: 'inherit',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
              LOCATIONS BADGE
            </label>
            <input
              type="text"
              value={footerData.locations || ''}
              onChange={(e) => handleChange('locations', e.target.value)}
              style={{
                width: '100%',
                padding: '0.55rem 0.85rem',
                borderRadius: '8px',
                border: '1px solid rgba(0, 0, 0, 0.12)',
                fontSize: '0.85rem',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
              COPYRIGHT TEXT
            </label>
            <input
              type="text"
              value={footerData.copyright || ''}
              onChange={(e) => handleChange('copyright', e.target.value)}
              style={{
                width: '100%',
                padding: '0.55rem 0.85rem',
                borderRadius: '8px',
                border: '1px solid rgba(0, 0, 0, 0.12)',
                fontSize: '0.85rem',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
