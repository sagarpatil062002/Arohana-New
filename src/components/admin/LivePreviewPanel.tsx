'use client';

import React, { useState } from 'react';
import { Monitor, Tablet, Smartphone, RotateCcw, ExternalLink, Eye } from 'lucide-react';

interface LivePreviewPanelProps {
  previewUrl?: string;
  title?: string;
}

export default function LivePreviewPanel({ previewUrl = '/', title }: LivePreviewPanelProps) {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [key, setKey] = useState(0);

  const getWidth = () => {
    switch (device) {
      case 'mobile':
        return '375px';
      case 'tablet':
        return '768px';
      default:
        return '100%';
    }
  };

  const normalizedPreviewUrl = React.useMemo(() => {
    if (!previewUrl) return '/?preview=true';
    if (previewUrl.includes('preview=true')) return previewUrl;
    return previewUrl.includes('?') ? `${previewUrl}&preview=true` : `${previewUrl}?preview=true`;
  }, [previewUrl]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#1E1E24',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Top Preview Controls Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.65rem 1.25rem',
          backgroundColor: '#16161A',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          color: '#FFFFFF',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#22C55E',
              boxShadow: '0 0 8px rgba(34, 197, 94, 0.8)',
            }}
          />
          <span style={{ fontSize: '0.76rem', fontWeight: 650, letterSpacing: '0.08em', color: '#E4E4E7' }}>
            {title || 'LIVE PREVIEW'}
          </span>
          <span style={{ fontSize: '0.72rem', color: '#71717A', marginLeft: '0.5rem' }}>
            {previewUrl}
          </span>
        </div>

        {/* Device Switcher */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '9999px',
            padding: '2px',
            gap: '2px',
          }}
        >
          <button
            type="button"
            onClick={() => setDevice('desktop')}
            title="Desktop View (100%)"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.3rem 0.7rem',
              borderRadius: '9999px',
              border: 'none',
              backgroundColor: device === 'desktop' ? '#FFFFFF' : 'transparent',
              color: device === 'desktop' ? '#111113' : '#A1A1AA',
              fontSize: '0.72rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <Monitor size={13} />
            Desktop
          </button>
          <button
            type="button"
            onClick={() => setDevice('tablet')}
            title="Tablet View (768px)"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.3rem 0.7rem',
              borderRadius: '9999px',
              border: 'none',
              backgroundColor: device === 'tablet' ? '#FFFFFF' : 'transparent',
              color: device === 'tablet' ? '#111113' : '#A1A1AA',
              fontSize: '0.72rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <Tablet size={13} />
            Tablet
          </button>
          <button
            type="button"
            onClick={() => setDevice('mobile')}
            title="Mobile View (375px)"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.3rem 0.7rem',
              borderRadius: '9999px',
              border: 'none',
              backgroundColor: device === 'mobile' ? '#FFFFFF' : 'transparent',
              color: device === 'mobile' ? '#111113' : '#A1A1AA',
              fontSize: '0.72rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <Smartphone size={13} />
            Mobile
          </button>
        </div>

        {/* Refresh & Pop-out Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={() => setKey((k) => k + 1)}
            title="Reload Preview Frame"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#A1A1AA',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <RotateCcw size={14} />
          </button>
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Open Live URL in New Tab"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#A1A1AA',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
            }}
          >
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Frame Container */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: device === 'desktop' ? '0' : '1.5rem',
          overflow: 'auto',
          backgroundColor: '#121215',
        }}
      >
        <div
          style={{
            width: getWidth(),
            height: '100%',
            maxWidth: '100%',
            backgroundColor: '#F7F7F8',
            borderRadius: device === 'desktop' ? '0' : '20px',
            overflow: 'hidden',
            boxShadow: device === 'desktop' ? 'none' : '0 20px 50px rgba(0, 0, 0, 0.6)',
            border: device === 'desktop' ? 'none' : '4px solid #2B2B33',
            transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            position: 'relative',
          }}
        >
          <iframe
            key={key}
            src={normalizedPreviewUrl}
            title="Ārohana Live Website Preview"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              backgroundColor: '#F7F7F8',
            }}
          />
        </div>
      </div>
    </div>
  );
}
