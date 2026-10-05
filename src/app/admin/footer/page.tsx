'use client';

import React, { useState, useEffect } from 'react';
import { useCmsContent } from '@/lib/cms/content-context';
import { Save, Check, ExternalLink, X, FileText, Upload } from 'lucide-react';
import LivePreviewPanel from '@/components/admin/LivePreviewPanel';

export default function AdminFooterPage() {
  const { content, saveDraft, updateDraftInMemory, publishSection } = useCmsContent();
  const [footerData, setFooterData] = useState<any>(null);
  const [savedStatus, setSavedStatus] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

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
      showToast('Footer draft saved.', 'success');
    } else {
      showToast('Save failed. Please retry.', 'error');
    }
  };

  const handlePublish = async () => {
    const ok = await publishSection('footer', footerData);
    if (ok) {
      showToast('Footer published live!', 'success');
    } else {
      showToast('Publish failed. Please retry.', 'error');
    }
  };

  return (
    <div style={{ maxWidth: '1600px', margin: '0 auto', paddingBottom: '4rem' }}>
      {/* TOAST */}
      {toast && (
        <div style={{
          position: 'fixed', top: '1.5rem', right: '1.5rem', zIndex: 9999,
          padding: '0.85rem 1.35rem', borderRadius: '8px',
          backgroundColor: toast.type === 'success' ? '#15803D' : '#DC2626',
          color: '#fff', fontSize: '0.85rem', fontWeight: 600,
          boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
          display: 'flex', alignItems: 'center', gap: '0.5rem',
        }}>
          {toast.type === 'success' ? <Check size={14} /> : <X size={14} />}
          {toast.msg}
        </div>
      )}
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

          {/* Amber pill: Save Draft */}
          <button
            type="button"
            onClick={handleSave}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.45rem 0.95rem',
              borderRadius: '9999px',
              border: '1px solid #D97706',
              backgroundColor: savedStatus ? '#F0FDF4' : '#FEF3C7',
              color: savedStatus ? '#16A34A' : '#92400E',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              transition: 'all 0.15s ease',
            }}
          >
            {savedStatus ? <Check size={13} /> : <FileText size={13} />}
            <span>{savedStatus ? 'Draft Saved' : 'Save Draft'}</span>
          </button>

          {/* Red pill: Publish Live */}
          <button
            type="button"
            onClick={handlePublish}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.45rem 1.15rem',
              borderRadius: '9999px',
              border: 'none',
              backgroundColor: '#DE322D',
              color: '#FFFFFF',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(222, 50, 45, 0.25)',
              transition: 'all 0.2s ease',
            }}
          >
            <Upload size={13} />
            <span>Publish This Page</span>
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
        <div className="admin-preview-sticky">
          <LivePreviewPanel previewUrl="/" title="Site Footer Preview" />
        </div>
      </div>
    </div>
  );
}
