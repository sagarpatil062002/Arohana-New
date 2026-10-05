'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import {
  Monitor,
  Tablet,
  Smartphone,
  RotateCcw,
  ExternalLink,
  Maximize2,
  Minimize2,
  X,
} from 'lucide-react';

interface LivePreviewPanelProps {
  previewUrl?: string;
  title?: string;
}

export default function LivePreviewPanel({ previewUrl = '/', title }: LivePreviewPanelProps) {
  const [device, setDevice] = useState<'tablet' | 'mobile'>('mobile');
  const [isDesktopModalOpen, setIsDesktopModalOpen] = useState(false);
  const [key, setKey] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [containerDim, setContainerDim] = useState({ width: 600, height: 700 });
  const [desktopDim, setDesktopDim] = useState({ width: 1100, height: 620 });
  const [mounted, setMounted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const desktopFrameRef = useRef<HTMLDivElement>(null);
  const desktopIframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Effortlessly scroll the preview iframe when mouse wheel scrolls anywhere on the black preview panel
  const handleWheel = (e: React.WheelEvent) => {
    try {
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.scrollBy({ top: e.deltaY, behavior: 'auto' });
      }
    } catch (err) {}
    try {
      iframeRef.current?.contentWindow?.postMessage({ type: 'CMS_SCROLL', deltaY: e.deltaY }, '*');
    } catch (err) {}
  };

  // Prevent admin page from scrolling when mouse wheel is inside the preview area, forwarding scroll to iframe
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      try {
        if (iframeRef.current?.contentWindow) {
          iframeRef.current.contentWindow.scrollBy({ top: e.deltaY, behavior: 'auto' });
        }
      } catch (err) {}
      try {
        iframeRef.current?.contentWindow?.postMessage({ type: 'CMS_SCROLL', deltaY: e.deltaY }, '*');
      } catch (err) {}
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
    };
  }, []);

  // Measure container dimensions for responsive scaling
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        if (clientWidth > 0 && clientHeight > 0) {
          setContainerDim({ width: clientWidth, height: clientHeight });
        }
      }
    };

    updateDimensions();

    const resizeObserver = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(updateDimensions)
      : null;

    if (containerRef.current && resizeObserver) {
      resizeObserver.observe(containerRef.current);
    }
    window.addEventListener('resize', updateDimensions);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener('resize', updateDimensions);
    };
  }, [isFullscreen]);

  // Measure desktop modal frame dimensions
  useEffect(() => {
    const updateDesktopDim = () => {
      if (desktopFrameRef.current) {
        const { clientWidth, clientHeight } = desktopFrameRef.current;
        if (clientWidth > 0 && clientHeight > 0) {
          setDesktopDim({ width: clientWidth, height: clientHeight });
        }
      }
    };

    updateDesktopDim();

    const resizeObserver = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(updateDesktopDim)
      : null;

    if (desktopFrameRef.current && resizeObserver) {
      resizeObserver.observe(desktopFrameRef.current);
    }
    window.addEventListener('resize', updateDesktopDim);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener('resize', updateDesktopDim);
    };
  }, [mounted, isDesktopModalOpen]);

  // Escape key closes desktop popup modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDesktopModalOpen) {
        setIsDesktopModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDesktopModalOpen]);

  // Ensure normalized URL always carries preview=true so CmsProvider loads Centralized Draft Store
  const normalizedPreviewUrl = useMemo(() => {
    if (!previewUrl) return '/?preview=true';
    if (previewUrl.includes('preview=true')) return previewUrl;
    return previewUrl.includes('?') ? `${previewUrl}&preview=true` : `${previewUrl}?preview=true`;
  }, [previewUrl]);

  // Viewport definitions
  const TABLET_TARGET_WIDTH = 768;
  const MOBILE_TARGET_WIDTH = 375;
  const DESKTOP_MODAL_WIDTH = 1280;

  // Compute scaling factor and dimensions for inline preview (Mobile & Tablet)
  const { targetWidth, scale, iframeHeight, wrapperStyle, frameBorder } = useMemo(() => {
    const cw = containerDim.width || 600;
    const ch = containerDim.height || 700;

    if (device === 'tablet') {
      if (cw < TABLET_TARGET_WIDTH) {
        const s = Math.min(1, Math.max(0.35, cw / TABLET_TARGET_WIDTH));
        const effHeight = Math.round(ch / s);
        return {
          targetWidth: TABLET_TARGET_WIDTH,
          scale: s,
          iframeHeight: effHeight,
          wrapperStyle: {
            width: `${TABLET_TARGET_WIDTH}px`,
            height: `${effHeight}px`,
            transform: `scale(${s})`,
            transformOrigin: 'top center',
          },
          frameBorder: '6px solid #282830',
        };
      } else {
        return {
          targetWidth: TABLET_TARGET_WIDTH,
          scale: 1,
          iframeHeight: ch - 40,
          wrapperStyle: {
            width: `${TABLET_TARGET_WIDTH}px`,
            height: '100%',
            transform: 'none',
            transformOrigin: 'top center',
          },
          frameBorder: '6px solid #282830',
        };
      }
    } else {
      // Mobile
      return {
        targetWidth: MOBILE_TARGET_WIDTH,
        scale: 1,
        iframeHeight: Math.max(580, ch - 40),
        wrapperStyle: {
          width: `${MOBILE_TARGET_WIDTH}px`,
          height: '100%',
          minHeight: '580px',
          maxHeight: '840px',
          transform: 'none',
          transformOrigin: 'top center',
        },
        frameBorder: '8px solid #24242A',
      };
    }
  }, [device, containerDim]);

  // Compute scale for true 1280px desktop resolution inside popup modal
  const desktopScale = useMemo(() => {
    const w = desktopDim.width || 1100;
    return Math.min(1, Math.max(0.3, w / DESKTOP_MODAL_WIDTH));
  }, [desktopDim.width]);

  const desktopIframeHeight = useMemo(() => {
    const h = desktopDim.height || 620;
    return Math.round(h / desktopScale);
  }, [desktopDim.height, desktopScale]);

  const handleCloseModal = () => {
    setIsDesktopModalOpen(false);
  };

  return (
    <div
      onWheel={handleWheel}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: '660px',
        backgroundColor: '#16161A',
        borderRadius: isFullscreen ? 0 : '16px',
        overflow: 'hidden',
        border: isFullscreen ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
        position: isFullscreen ? 'fixed' : 'relative',
        top: isFullscreen ? 0 : undefined,
        left: isFullscreen ? 0 : undefined,
        right: isFullscreen ? 0 : undefined,
        bottom: isFullscreen ? 0 : undefined,
        zIndex: isFullscreen ? 99999 : 1,
      }}
    >
      {/* ─── Top Preview Controls Bar ─── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.65rem 1.25rem',
          backgroundColor: '#111114',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          color: '#FFFFFF',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#22C55E',
              boxShadow: '0 0 8px rgba(34, 197, 94, 0.8)',
            }}
          />
          <span style={{ fontSize: '0.78rem', fontWeight: 650, letterSpacing: '0.06em', color: '#F4F4F5' }}>
            {title || 'CRM DRAFT PREVIEW'}
          </span>
          <span
            style={{
              fontSize: '0.68rem',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              color: '#A1A1AA',
              padding: '2px 8px',
              borderRadius: '4px',
              fontFamily: 'monospace',
            }}
          >
            {device === 'tablet' ? '768px · Tablet' : '375px · Mobile'}
          </span>
        </div>

        {/* ─── Device Switcher ─── */}
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
          {/* Desktop Button: Opens Desktop Popup Modal */}
          <button
            type="button"
            onClick={() => setIsDesktopModalOpen(true)}
            title="Open Desktop Live Preview Modal (1280px Scale)"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.3rem 0.75rem',
              borderRadius: '9999px',
              border: 'none',
              backgroundColor: isDesktopModalOpen ? '#FFFFFF' : 'transparent',
              color: isDesktopModalOpen ? '#111113' : '#A1A1AA',
              fontSize: '0.72rem',
              fontWeight: 650,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <Monitor size={13} />
            Desktop
          </button>

          {/* Tablet Button */}
          <button
            type="button"
            onClick={() => setDevice('tablet')}
            title="Tablet Mode (768px Breakpoint)"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.3rem 0.75rem',
              borderRadius: '9999px',
              border: 'none',
              backgroundColor: device === 'tablet' && !isDesktopModalOpen ? '#FFFFFF' : 'transparent',
              color: device === 'tablet' && !isDesktopModalOpen ? '#111113' : '#A1A1AA',
              fontSize: '0.72rem',
              fontWeight: 650,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <Tablet size={13} />
            Tablet
          </button>

          {/* Mobile Button */}
          <button
            type="button"
            onClick={() => setDevice('mobile')}
            title="Mobile Mode (375px Breakpoint)"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.3rem 0.75rem',
              borderRadius: '9999px',
              border: 'none',
              backgroundColor: device === 'mobile' && !isDesktopModalOpen ? '#FFFFFF' : 'transparent',
              color: device === 'mobile' && !isDesktopModalOpen ? '#111113' : '#A1A1AA',
              fontSize: '0.72rem',
              fontWeight: 650,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <Smartphone size={13} />
            Mobile
          </button>
        </div>

        {/* ─── Actions: Refresh, Fullscreen, Pop-out ─── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <button
            type="button"
            onClick={() => setKey((k) => k + 1)}
            title="Reload Preview Frame"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#A1A1AA',
              cursor: 'pointer',
              padding: '5px',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '4px',
            }}
          >
            <RotateCcw size={14} />
          </button>

          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? 'Exit Fullscreen' : 'Expand Preview'}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#A1A1AA',
              cursor: 'pointer',
              padding: '5px',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '4px',
            }}
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>

          <a
            href={normalizedPreviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Open Draft Preview in New Tab"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#A1A1AA',
              cursor: 'pointer',
              padding: '5px',
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              borderRadius: '4px',
            }}
          >
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* ─── Viewport Frame Container ─── */}
      <div
        ref={containerRef}
        onWheel={handleWheel}
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1.25rem 1rem',
          overflow: 'hidden',
          backgroundColor: '#0F0F12',
          position: 'relative',
        }}
      >
        <div
          style={{
            ...wrapperStyle,
            backgroundColor: '#F5F5F3',
            borderRadius: '18px',
            overflow: 'hidden',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.7)',
            border: frameBorder,
            transition: 'width 0.25s ease, transform 0.25s ease',
            position: 'relative',
          }}
        >
          <iframe
            ref={iframeRef}
            key={`inline-${key}`}
            src={normalizedPreviewUrl}
            title="Ārohana Draft Website Preview"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              backgroundColor: '#F5F5F3',
              display: 'block',
            }}
          />
        </div>
      </div>

      {/* ─── Desktop Preview Popup Modal (Instant Pre-loaded, 1280px True Desktop View) ─── */}
      {mounted && createPortal(
        <div
          onClick={handleCloseModal}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            zIndex: 9999999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.25rem',
            boxSizing: 'border-box',
            visibility: isDesktopModalOpen ? 'visible' : 'hidden',
            opacity: isDesktopModalOpen ? 1 : 0,
            pointerEvents: isDesktopModalOpen ? 'auto' : 'none',
            transition: 'opacity 0.18s ease, visibility 0.18s ease',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 0, 0, 0.08)',
              width: '100%',
              maxWidth: '1180px',
              height: '88vh',
              maxHeight: '920px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              transform: isDesktopModalOpen ? 'scale(1)' : 'scale(0.97)',
              transition: 'transform 0.18s ease',
            }}
          >
            {/* Modal Top Header */}
            <div
              style={{
                padding: '1rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #F1F5F9',
                backgroundColor: '#FFFFFF',
                flexShrink: 0,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '8px',
                    backgroundColor: '#EFF6FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#2563EB',
                  }}
                >
                  <Monitor size={20} strokeWidth={2.2} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#0F172A' }}>
                    Live Preview
                  </h3>
                  <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: '#64748B' }}>
                    This is how your page will look on the website.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#64748B',
                  cursor: 'pointer',
                  padding: '6px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'color 0.15s ease',
                }}
                title="Close Preview (Esc)"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body / Framed True 1280px Desktop View */}
            <div
              style={{
                padding: '1rem 1.5rem',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#F8FAFC',
                minHeight: 0,
                overflow: 'hidden',
              }}
            >
              <div
                ref={desktopFrameRef}
                style={{
                  flex: 1,
                  width: '100%',
                  height: '100%',
                  minHeight: '440px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
                  backgroundColor: '#FFFFFF',
                  position: 'relative',
                }}
              >
                <iframe
                  ref={desktopIframeRef}
                  key={`desktop-${key}`}
                  src={normalizedPreviewUrl}
                  loading="eager"
                  title="Desktop Live Preview"
                  style={{
                    width: `${DESKTOP_MODAL_WIDTH}px`,
                    height: `${desktopIframeHeight}px`,
                    transform: `scale(${desktopScale})`,
                    transformOrigin: 'top left',
                    border: 'none',
                    display: 'block',
                    backgroundColor: '#FFFFFF',
                  }}
                />
              </div>
            </div>

            {/* Modal Bottom Footer */}
            <div
              style={{
                padding: '0.75rem 1.5rem',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                borderTop: '1px solid #F1F5F9',
                backgroundColor: '#FFFFFF',
                flexShrink: 0,
              }}
            >
              <button
                type="button"
                onClick={handleCloseModal}
                style={{
                  padding: '0.45rem 1.5rem',
                  borderRadius: '8px',
                  border: '1px solid #D1D5DB',
                  backgroundColor: '#FFFFFF',
                  color: '#334155',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                  transition: 'background-color 0.15s ease',
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
