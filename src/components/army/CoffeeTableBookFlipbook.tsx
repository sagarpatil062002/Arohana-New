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
  BookOpen,
  RotateCcw,
  Loader2,
  FileText,
} from 'lucide-react';

interface FlipbookProps {
  pdfUrl?: string;
  title?: string;
  subtitle?: string;
  fallbackImage?: string;
}

export default function CoffeeTableBookFlipbook({
  pdfUrl = '/uploads/rezang-la-coffee-table-book.pdf',
  title = 'Rezang La War Memorial — Official Coffee Table Book',
  subtitle = 'Archival Commemorative Hardbound Edition',
  fallbackImage = '/uploads/1790516827847-rezang-la-memorial.jpg',
}: FlipbookProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');
  const [pdfDoc, setPdfDoc] = useState<any>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const leftCanvasRef = useRef<HTMLCanvasElement>(null);
  const rightCanvasRef = useRef<HTMLCanvasElement>(null);

  // Dynamic PDF.js script loader
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
        console.warn('PDF.js rendering notice:', err.message);
        if (isMounted) {
          setError(err.message || 'PDF Preview Unavailable');
          setIsLoading(false);
        }
      }
    };

    loadPdfJs();

    return () => {
      isMounted = false;
    };
  }, [pdfUrl]);

  // Render pages to left & right canvases
  useEffect(() => {
    if (!pdfDoc) return;

    let isRendering = true;

    const renderPage = async (pageNum: number, canvas: HTMLCanvasElement | null) => {
      if (!canvas || pageNum < 1 || pageNum > pdfDoc.numPages) return;
      try {
        const page = await pdfDoc.getPage(pageNum);
        if (!isRendering) return;

        const viewport = page.getViewport({ scale });
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext = {
          canvasContext: ctx,
          viewport: viewport,
        };
        await page.render(renderContext).promise;
      } catch (e) {
        // Page render cancelled or failed
      }
    };

    // Desktop double-page spread, Mobile single-page
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    if (isMobile) {
      renderPage(currentPage, leftCanvasRef.current);
    } else {
      const leftPageNum = currentPage % 2 === 0 ? currentPage : currentPage - 1;
      const rightPageNum = leftPageNum + 1;
      renderPage(leftPageNum > 0 ? leftPageNum : 1, leftCanvasRef.current);
      renderPage(rightPageNum <= numPages ? rightPageNum : rightPageNum - 1, rightCanvasRef.current);
    }

    return () => {
      isRendering = false;
    };
  }, [pdfDoc, currentPage, scale, numPages]);

  const handleNextPage = () => {
    if (currentPage >= numPages) return;
    setFlipDirection('next');
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPage((prev) => Math.min(numPages, prev + 2));
      setIsFlipping(false);
    }, 250);
  };

  const handlePrevPage = () => {
    if (currentPage <= 1) return;
    setFlipDirection('prev');
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPage((prev) => Math.max(1, prev - 2));
      setIsFlipping(false);
    }, 250);
  };

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
        backgroundColor: '#0F1015',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        overflow: 'hidden',
        color: '#FFFFFF',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Top Controls Bar */}
      <div
        style={{
          padding: '0.85rem 1.25rem',
          backgroundColor: '#161720',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: 'rgba(222, 50, 45, 0.15)',
              color: '#DE322D',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <BookOpen size={16} />
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

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* Zoom Controls */}
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '8px', padding: '2px' }}>
            <button
              type="button"
              onClick={() => setScale((s) => Math.max(0.6, s - 0.15))}
              style={actionBtnStyle}
              title="Zoom Out"
            >
              <ZoomOut size={14} />
            </button>
            <span style={{ fontSize: '0.72rem', fontWeight: 600, padding: '0 6px', color: 'rgba(255,255,255,0.7)' }}>
              {Math.round(scale * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setScale((s) => Math.min(2.0, s + 0.15))}
              style={actionBtnStyle}
              title="Zoom In"
            >
              <ZoomIn size={14} />
            </button>
          </div>

          {/* Fullscreen Toggle */}
          <button type="button" onClick={toggleFullscreen} style={actionBtnStyle} title="Toggle Fullscreen">
            {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          </button>

          {/* Download PDF */}
          {pdfUrl && (
            <a
              href={pdfUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...actionBtnStyle, textDecoration: 'none', backgroundColor: '#DE322D', color: '#FFFFFF' }}
              title="Download PDF Document"
            >
              <Download size={14} />
              <span style={{ fontSize: '0.72rem', fontWeight: 700, marginLeft: '4px' }}>PDF</span>
            </a>
          )}
        </div>
      </div>

      {/* Main Flipbook Stage */}
      <div
        style={{
          position: 'relative',
          minHeight: '440px',
          maxHeight: isFullscreen ? 'calc(100vh - 120px)' : '620px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem 1rem',
          overflow: 'auto',
          perspective: '1200px',
          backgroundColor: '#090A0E',
        }}
      >
        {isLoading && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', color: '#A1A1AA' }}>
            <Loader2 size={32} className="animate-spin" style={{ color: '#DE322D' }} />
            <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>Rendering Flipbook Spread...</span>
          </div>
        )}

        {error || (!isLoading && !pdfDoc) ? (
          /* Elegant Fallback Spread Presentation when PDF URL is custom or static fallback */
          <div
            style={{
              position: 'relative',
              maxWidth: '840px',
              width: '100%',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={fallbackImage}
              alt={title}
              style={{ width: '100%', height: 'auto', maxHeight: '480px', objectFit: 'cover', display: 'block' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(15, 16, 21, 0.95) 0%, rgba(15, 16, 21, 0.4) 60%, transparent 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '1.75rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#DE322D', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                <FileText size={14} />
                <span>Commemorative Archival Publication</span>
              </div>
              <h4 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#FFFFFF', margin: '0.35rem 0' }}>
                {title}
              </h4>
              <p style={{ fontSize: '0.84rem', color: 'rgba(255, 255, 255, 0.75)', margin: 0, maxWidth: '580px' }}>
                Tactile clothbound hardback publication detailing historical battle archives, veteran testimonies, and museum-grade visual documentation.
              </p>
            </div>
          </div>
        ) : (
          /* Dual-Canvas Page Flip Spread */
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2px',
              transform: `scale(${scale})`,
              transformOrigin: 'center center',
              transition: 'transform 0.2s ease',
              position: 'relative',
            }}
          >
            {/* Left Page Canvas */}
            <div
              style={{
                position: 'relative',
                boxShadow: '-10px 10px 30px rgba(0,0,0,0.5)',
                borderRadius: '4px 0 0 4px',
                overflow: 'hidden',
                backgroundColor: '#FFFFFF',
                transition: 'transform 0.25s ease',
                transform: isFlipping && flipDirection === 'prev' ? 'rotateY(15deg)' : 'none',
              }}
            >
              <canvas ref={leftCanvasRef} style={{ display: 'block', maxWidth: '100%', height: 'auto' }} />
              {/* Spine Shadow */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  width: '24px',
                  background: 'linear-gradient(to left, rgba(0,0,0,0.3) 0%, transparent 100%)',
                  pointerEvents: 'none',
                }}
              />
            </div>

            {/* Right Page Canvas */}
            <div
              style={{
                position: 'relative',
                boxShadow: '10px 10px 30px rgba(0,0,0,0.5)',
                borderRadius: '0 4px 4px 0',
                overflow: 'hidden',
                backgroundColor: '#FFFFFF',
                transition: 'transform 0.25s ease',
                transform: isFlipping && flipDirection === 'next' ? 'rotateY(-15deg)' : 'none',
              }}
            >
              <canvas ref={rightCanvasRef} style={{ display: 'block', maxWidth: '100%', height: 'auto' }} />
              {/* Spine Shadow */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  width: '24px',
                  background: 'linear-gradient(to right, rgba(0,0,0,0.3) 0%, transparent 100%)',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Page Navigation Footer */}
      <div
        style={{
          padding: '0.75rem 1.25rem',
          backgroundColor: '#161720',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <button
          type="button"
          onClick={handlePrevPage}
          disabled={currentPage <= 1}
          style={{
            ...actionBtnStyle,
            opacity: currentPage <= 1 ? 0.4 : 1,
            cursor: currentPage <= 1 ? 'not-allowed' : 'pointer',
            padding: '0.45rem 0.85rem',
            gap: '0.35rem',
          }}
        >
          <ChevronLeft size={16} />
          <span>Previous Spread</span>
        </button>

        <div style={{ fontSize: '0.8rem', fontWeight: 650, color: 'rgba(255,255,255,0.85)' }}>
          {numPages > 0 ? (
            <>
              Spread {Math.ceil(currentPage / 2)} of {Math.ceil(numPages / 2)}
              <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.45)', marginLeft: '6px' }}>
                (Pages {currentPage}–{Math.min(numPages, currentPage + 1)} of {numPages})
              </span>
            </>
          ) : (
            'Interactive Archival Flipbook'
          )}
        </div>

        <button
          type="button"
          onClick={handleNextPage}
          disabled={numPages > 0 && currentPage >= numPages - 1}
          style={{
            ...actionBtnStyle,
            opacity: numPages > 0 && currentPage >= numPages - 1 ? 0.4 : 1,
            cursor: numPages > 0 && currentPage >= numPages - 1 ? 'not-allowed' : 'pointer',
            padding: '0.45rem 0.85rem',
            gap: '0.35rem',
          }}
        >
          <span>Next Spread</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

const actionBtnStyle: React.CSSProperties = {
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
