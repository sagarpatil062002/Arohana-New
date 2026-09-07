'use client';

import React, { useState, useEffect } from 'react';
import { useCmsContent } from '@/lib/cms/content-context';
import { Save, Check, ExternalLink } from 'lucide-react';
import LivePreviewPanel from '@/components/admin/LivePreviewPanel';

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
    <div style={{ maxWidth: '1600px', margin: '0 auto', paddingBottom: '4rem' }}>
      {/* Top Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
          backgroundColor: '#FFFFFF',
          padding: '1.25rem 1.75rem',
          borderRadius: '16px',
          border: '1px solid rgba(0,0,0,0.06)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 650, margin: 0, color: '#111' }}>
              Global Footer CMS
            </h1>
            <span
              style={{
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                backgroundColor: '#f4f4f5',
                padding: '0.2rem 0.6rem',
                borderRadius: '6px',
                color: '#71717a',
              }}
            >
              All Pages
            </span>
          </div>
          <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.82rem', color: '#71717a' }}>
            Global tagline, copyright, and location badges displayed across the entire site.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.55rem 1rem',
              borderRadius: '9999px',
              border: '1px solid rgba(0,0,0,0.12)',
              backgroundColor: '#FFFFFF',
              color: '#333',
              fontSize: '0.8rem',
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            <ExternalLink size={14} /> Open Site
          </a>

          <button
            type="button"
            onClick={handleSave}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.55rem 1.4rem',
              borderRadius: '9999px',
              border: 'none',
              backgroundColor: savedStatus ? '#16A34A' : '#DE322D',
              color: '#FFFFFF',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {savedStatus ? <Check size={15} /> : <Save size={15} />}
            {savedStatus ? 'Saved Successfully' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Main Split Layout: Editor & Live Preview */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(500px, 1.15fr) 1fr',
          gap: '1.5rem',
          alignItems: 'start',
        }}
      >
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            padding: '1.75rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 650, margin: 0, color: '#111113' }}>
              Footer Settings
            </h2>
            <div style={{ fontSize: '0.78rem', color: '#71717A' }}>
              Edit the global brand statement, geographical reach, and copyright declaration.
            </div>
          </div>

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

          <div>
            <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
              BADGE SUFFIX
            </label>
            <input
              type="text"
              value={footerData.badge || ''}
              onChange={(e) => handleChange('badge', e.target.value)}
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

        {/* Live Preview Panel */}
        <div style={{ position: 'sticky', top: '1.5rem', height: 'calc(100vh - 7rem)' }}>
          <LivePreviewPanel previewUrl="/" title="Site Footer Preview" />
        </div>
      </div>
    </div>
  );
}
