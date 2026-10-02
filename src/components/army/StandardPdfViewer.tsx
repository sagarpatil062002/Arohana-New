'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Download,
  FileText,
  Loader2,
  Search,
} from 'lucide-react';

interface StandardPdfViewerProps {
  pdfUrl?: string;
  title?: string;
  subtitle?: string;
  fallbackImage?: string;
}

export default function StandardPdfViewer({
  pdfUrl = '/uploads/xiv-corps-publication.pdf',
  title = 'Fire & Fury Corps — XIV Corps Official Publication',
  subtitle = 'Commemorative Archival Document',
  fallbackImage = '/uploads/1790516375474-firefury1.jpg',
}: StandardPdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.2);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [pdfDoc, setPdfDoc] = useState<any>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    const loadPdfJs = async () => {
      try {
        if (!(window as any).pdfjsLib) {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
          script.async = true;
          document.body.appendChild(script);

          await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = () => reject(new Error('Failed to load PDF.js library'));
          });
        }

        const pdfjs = (window as any).pdfjsLib;
        if (pdfjs) {
          pdfjs.GlobalWorkerOptions.workerSrc =
            'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

          if (!pdfUrl) {
            setIsLoading(false);
            return;
          }

          const loadingTask = pdfjs.getDocument(pdfUrl);
          const doc = await loadingTask.promise;
          if (isMounted) {
            setPdfDoc(doc);
            setNumPages(doc.numPages);
            setIsLoading(false);
          }
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || 'PDF Document Unavailable');
          setIsLoading(false);
        }
      }
    };

    loadPdfJs();

    return () => {
      isMounted = false;
    };
  }, [pdfUrl]);

  // Render current page canvas
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;

    let isRendering = true;

    const renderPage = async () => {
      try {
        const page = await pdfDoc.getPage(currentPage);
        if (!isRendering) return;

        const viewport = page.getViewport({ scale });
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: ctx,
          viewport: viewport,
        }).promise;
      } catch (e) {}
    };

    renderPage();

    return () => {
      isRendering = false;
    };
  }, [pdfDoc, currentPage, scale]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        backgroundColor: '#111218',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        overflow: 'hidden',
        color: '#FFFFFF',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top Controls Toolbar */}
      <div
        style={{
          padding: '0.85rem 1.25rem',
          backgroundColor: '#181922',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: 'rgba(59, 130, 246, 0.15)',
              color: '#3B82F6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FileText size={16} />
          </div>
          <div>
            <div style={{ fontSize: '0.86rem', fontWeight: 650, color: '#FFFFFF', lineHeight: 1.2 }}>
              {title}
            </div>
            {subtitle && (
              <div style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.55)', marginTop: '2px' }}>
                {subtitle}
              </div>
            )}
          </div>
        </div>

        {/* Page Nav & Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {numPages > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', backgroundColor: 'rgba(255,255,255,0.06)', padding: '3px 8px', borderRadius: '8px' }}>
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage <= 1}
                style={{ ...btnIconStyle, opacity: currentPage <= 1 ? 0.4 : 1 }}
                title="Previous Page"
              >
                <ChevronLeft size={15} />
              </button>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#FFFFFF' }}>
                Page {currentPage} of {numPages}
              </span>
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(numPages, p + 1))}
                disabled={currentPage >= numPages}
                style={{ ...btnIconStyle, opacity: currentPage >= numPages ? 0.4 : 1 }}
                title="Next Page"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          )}

          {/* Zoom Controls */}
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '8px', padding: '2px' }}>
            <button
              type="button"
              onClick={() => setScale((s) => Math.max(0.7, s - 0.15))}
              style={btnIconStyle}
              title="Zoom Out"
            >
              <ZoomOut size={14} />
            </button>
            <span style={{ fontSize: '0.72rem', fontWeight: 600, padding: '0 6px', color: 'rgba(255,255,255,0.7)' }}>
              {Math.round(scale * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setScale((s) => Math.min(2.5, s + 0.15))}
              style={btnIconStyle}
              title="Zoom In"
            >
              <ZoomIn size={14} />
            </button>
          </div>

          <button type="button" onClick={toggleFullscreen} style={btnIconStyle} title="Fullscreen">
            {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          </button>

          {pdfUrl && (
            <a
              href={pdfUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...btnIconStyle, textDecoration: 'none', backgroundColor: '#3B82F6', color: '#FFFFFF' }}
              title="Download PDF"
            >
              <Download size={14} />
              <span style={{ fontSize: '0.72rem', fontWeight: 700, marginLeft: '4px' }}>PDF</span>
            </a>
          )}
        </div>
      </div>

      {/* Main Canvas Display Area */}
      <div
        style={{
          position: 'relative',
          minHeight: '440px',
          maxHeight: isFullscreen ? 'calc(100vh - 100px)' : '620px',
          overflow: 'auto',
          backgroundColor: '#0A0B0E',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
        }}
      >
        {isLoading && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', color: '#A1A1AA' }}>
            <Loader2 size={32} className="animate-spin" style={{ color: '#3B82F6' }} />
            <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>Loading Publication Document...</span>
          </div>
        )}

        {error || (!isLoading && !pdfDoc) ? (
          /* Fallback view when PDF file is unrendered/custom */
          <div
            style={{
              position: 'relative',
              maxWidth: '820px',
              width: '100%',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.15)',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={fallbackImage}
              alt={title}
              style={{ width: '100%', height: 'auto', maxHeight: '460px', objectFit: 'cover', display: 'block' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(10, 11, 14, 0.95) 0%, rgba(10, 11, 14, 0.4) 60%, transparent 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '1.75rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#3B82F6', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                <FileText size={14} />
                <span>Institutional Publication Document</span>
              </div>
              <h4 style={{ fontSize: '1.35rem', fontWeight: 600, color: '#FFFFFF', margin: '0.35rem 0' }}>
                {title}
              </h4>
              <p style={{ fontSize: '0.84rem', color: 'rgba(255, 255, 255, 0.75)', margin: 0, maxWidth: '560px' }}>
                Institutional publication coverage, editorial layouts, and historical documentation.
              </p>
            </div>
          </div>
        ) : (
          <div
            style={{
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
              backgroundColor: '#FFFFFF',
            }}
          >
            <canvas ref={canvasRef} style={{ display: 'block', maxWidth: '100%', height: 'auto' }} />
          </div>
        )}
      </div>
    </div>
  );
}

const btnIconStyle: React.CSSProperties = {
  border: 'none',
  backgroundColor: 'rgba(255, 255, 255, 0.08)',
  color: '#FFFFFF',
  borderRadius: '6px',
  padding: '6px 8px',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.74rem',
  transition: 'background-color 0.2s ease',
};
