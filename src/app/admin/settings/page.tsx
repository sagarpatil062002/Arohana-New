'use client';

import React, { useState, useEffect } from 'react';
import { useCmsContent } from '@/lib/cms/content-context';
import { Save, Check, Globe, ShieldCheck } from 'lucide-react';

export default function AdminSettingsPage() {
  const { content, saveDraft, updateDraftInMemory } = useCmsContent();
  const [settingsData, setSettingsData] = useState<any>(null);
  const [savedStatus, setSavedStatus] = useState(false);

  useEffect(() => {
    if (content.settings) {
      setSettingsData(JSON.parse(JSON.stringify(content.settings)));
    }
  }, [content.settings]);

  if (!settingsData) {
    return <div style={{ padding: '2rem' }}>Loading Settings...</div>;
  }

  const handleChange = (field: string, val: any) => {
    const updated = { ...settingsData, [field]: val };
    setSettingsData(updated);
    updateDraftInMemory('settings', updated);
  };

  const handleSave = async () => {
    const ok = await saveDraft('settings', settingsData);
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
              Global Site Settings &amp; SEO
            </h2>
            <div style={{ fontSize: '0.78rem', color: '#71717A' }}>
              Meta title, description, favicon &amp; social sharing cards.
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
              SITE TITLE
            </label>
            <input
              type="text"
              value={settingsData.siteTitle || ''}
              onChange={(e) => handleChange('siteTitle', e.target.value)}
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
              DEFAULT META DESCRIPTION
            </label>
            <textarea
              rows={3}
              value={settingsData.metaDescription || ''}
              onChange={(e) => handleChange('metaDescription', e.target.value)}
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                FAVICON PATH
              </label>
              <input
                type="text"
                value={settingsData.favicon || ''}
                onChange={(e) => handleChange('favicon', e.target.value)}
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
                SOCIAL SHARE IMAGE (OG:IMAGE)
              </label>
              <input
                type="text"
                value={settingsData.ogImage || ''}
                onChange={(e) => handleChange('ogImage', e.target.value)}
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
    </div>
  );
}
