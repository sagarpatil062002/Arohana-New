'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Maximize2,
  Minimize2,
  Download,
  ArrowLeft,
  FileText,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';

interface ReusablePdfViewerProps {
  pdfUrl: string;
  title?: string;
  subtitle?: string;
  backUrl?: string;
  onClose?: () => void;
}

export default function ReusablePdfViewer({
  pdfUrl,
  title = 'Document Viewer',
  subtitle = 'Institutional Publication Archive',
  backUrl,
  onClose,
}: ReusablePdfViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [pageNum, setPageNum] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>(0);
  const [scale, setScale] = useState<number>(1.2);
  const [rotation, setRotation] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Load PDF.js from CDN
  useEffect(() => {
    let isMounted = true;

    if (!pdfUrl) {
      setErrorMsg('No PDF URL specified.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    const loadPdfJs = async () => {
      try {
        if (!(window as any).pdfjsLib) {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
          script.async = true;
          document.body.appendChild(script);

          await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = () => reject(new Error('Failed to load PDF viewer engine.'));
          });
        }

        const pdfjsLib = (window as any).pdfjsLib;
        pdfjsLib.GlobalWorkerOptions.workerSrc =
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const doc = await loadingTask.promise;

        if (isMounted) {
          setPdfDoc(doc);
          setNumPages(doc.numPages);
          setPageNum(1);
          setIsLoading(false);
        }
      } catch (err: any) {
        if (isMounted) {
          console.error('PDF load error:', err);
          setErrorMsg(
            err.message || 'Unable to render PDF document. Please verify the URL or network connection.'
          );
          setIsLoading(false);
        }
      }
    };

    loadPdfJs();

    return () => {
      isMounted = false;
    };
  }, [pdfUrl]);

  // Render Current Page
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;

    let isRenderCancelled = false;

    const renderPage = async () => {
      try {
        const page = await pdfDoc.getPage(pageNum);
        if (isRenderCancelled) return;

        const viewport = page.getViewport({ scale, rotation });
        const canvas = canvasRef.current!;
        const context = canvas.getContext('2d')!;

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;
      } catch (err) {
        console.error('Page render error:', err);
      }
    };

    renderPage();

    return () => {
      isRenderCancelled = true;
    };
  }, [pdfDoc, pageNum, scale, rotation]);

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
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        minHeight: isFullscreen ? '100vh' : 'calc(100vh - 80px)',
        backgroundColor: '#0F0F11',
        color: '#FFFFFF',
        fontFamily: 'inherit',
      }}
    >
      {/* Top Controls Toolbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.85rem 1.5rem',
          backgroundColor: '#18181B',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          flexWrap: 'wrap',
          gap: '1rem',
          zIndex: 10,
        }}
      >
        {/* Left: Title & Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {backUrl ? (
            <Link
              href={backUrl}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 0.85rem',
                borderRadius: '6px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#FFFFFF',
                fontSize: '0.8rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              <ArrowLeft size={15} />
              <span>Back</span>
            </Link>
          ) : onClose ? (
            <button
              type="button"
              onClick={onClose}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 0.85rem',
                borderRadius: '6px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#FFFFFF',
                fontSize: '0.8rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <ArrowLeft size={15} />
              <span>Close</span>
            </button>
          ) : (
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                backgroundColor: '#DE322D',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FileText size={18} color="#FFFFFF" />
            </div>
          )}

          <div>
            <h1 style={{ fontSize: '0.95rem', fontWeight: 650, margin: 0, color: '#FFFFFF' }}>
              {title}
            </h1>
            {subtitle && (
              <span style={{ fontSize: '0.74rem', color: '#A1A1AA', display: 'block' }}>
                {subtitle}
              </span>
            )}
          </div>
        </div>

        {/* Center: Page Controls */}
        {!isLoading && !errorMsg && numPages > 0 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              padding: '0.3rem 0.75rem',
              borderRadius: '9999px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <button
              type="button"
              disabled={pageNum <= 1}
              onClick={() => setPageNum((p) => Math.max(1, p - 1))}
              style={{
                background: 'transparent',
                border: 'none',
                color: pageNum <= 1 ? '#52525B' : '#FFFFFF',
                cursor: pageNum <= 1 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
              title="Previous Page"
            >
              <ChevronLeft size={18} />
            </button>

            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#FFFFFF', padding: '0 0.4rem' }}>
              Page {pageNum} of {numPages}
            </span>

            <button
              type="button"
              disabled={pageNum >= numPages}
              onClick={() => setPageNum((p) => Math.min(numPages, p + 1))}
              style={{
                background: 'transparent',
                border: 'none',
                color: pageNum >= numPages ? '#52525B' : '#FFFFFF',
                cursor: pageNum >= numPages ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
              title="Next Page"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Right: Zoom & Actions */}
        {!isLoading && !errorMsg && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={() => setScale((s) => Math.max(0.6, s - 0.2))}
              style={{
                padding: '0.4rem',
                borderRadius: '6px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#FFFFFF',
                border: 'none',
                cursor: 'pointer',
              }}
              title="Zoom Out"
            >
              <ZoomOut size={16} />
            </button>

            <span style={{ fontSize: '0.78rem', color: '#A1A1AA', minWidth: '42px', textAlign: 'center' }}>
              {Math.round(scale * 100)}%
            </span>

            <button
              type="button"
              onClick={() => setScale((s) => Math.min(3.0, s + 0.2))}
              style={{
                padding: '0.4rem',
                borderRadius: '6px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#FFFFFF',
                border: 'none',
                cursor: 'pointer',
              }}
              title="Zoom In"
            >
              <ZoomIn size={16} />
            </button>

            <button
              type="button"
              onClick={() => setRotation((r) => (r + 90) % 360)}
              style={{
                padding: '0.4rem',
                borderRadius: '6px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#FFFFFF',
                border: 'none',
                cursor: 'pointer',
              }}
              title="Rotate 90°"
            >
              <RotateCw size={16} />
            </button>

            <button
              type="button"
              onClick={toggleFullscreen}
              style={{
                padding: '0.4rem',
                borderRadius: '6px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#FFFFFF',
                border: 'none',
                cursor: 'pointer',
              }}
              title="Fullscreen"
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>

            <a
              href={pdfUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 0.85rem',
                borderRadius: '6px',
                backgroundColor: '#DE322D',
                color: '#FFFFFF',
                fontSize: '0.78rem',
                fontWeight: 600,
                textDecoration: 'none',
                marginLeft: '0.4rem',
              }}
            >
              <Download size={14} />
              <span>Download</span>
            </a>
          </div>
        )}
      </div>

      {/* Canvas / Main View Area */}
      <div
        style={{
          flex: 1,
          overflow: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem 1rem',
          backgroundColor: '#09090B',
          position: 'relative',
        }}
      >
        {isLoading && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                border: '3px solid rgba(255, 255, 255, 0.1)',
                borderTopColor: '#DE322D',
                borderRadius: '50%',
                animation: 'pdfSpin 0.8s linear infinite',
              }}
            />
            <span style={{ fontSize: '0.85rem', color: '#A1A1AA', fontWeight: 500 }}>
              Rendering PDF Document...
            </span>
          </div>
        )}

        {errorMsg && (
          <div
            style={{
              maxWidth: '460px',
              padding: '2rem',
              borderRadius: '12px',
              backgroundColor: '#18181B',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <AlertCircle size={38} color="#EF4444" />
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 650, color: '#FFFFFF', marginBottom: '0.4rem' }}>
                Unable to Load Document
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#A1A1AA', lineHeight: 1.5, margin: 0 }}>
                {errorMsg}
              </p>
            </div>
            <button
              type="button"
              onClick={() => window.location.reload()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.55rem 1.1rem',
                borderRadius: '6px',
                backgroundColor: '#DE322D',
                color: '#FFFFFF',
                fontSize: '0.8rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <RefreshCw size={14} />
              <span>Retry Loading</span>
            </button>
          </div>
        )}

        <canvas
          ref={canvasRef}
          style={{
            display: isLoading || errorMsg ? 'none' : 'block',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.6)',
            borderRadius: '4px',
            maxWidth: '100%',
          }}
        />
      </div>

      <style jsx>{`
        @keyframes pdfSpin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
