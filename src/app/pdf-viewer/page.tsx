'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ReusablePdfViewer from '@/components/pdf/ReusablePdfViewer';

function PdfViewerContent() {
  const searchParams = useSearchParams();
  const url = searchParams.get('url') || searchParams.get('pdf') || '';
  const title = searchParams.get('title') || 'PDF Document Viewer';
  const subtitle = searchParams.get('subtitle') || 'Institutional Publication Archive';
  const backUrl = searchParams.get('back') || searchParams.get('returnUrl') || '/indian-army-projects';

  return (
    <ReusablePdfViewer
      pdfUrl={url}
      title={title}
      subtitle={subtitle}
      backUrl={backUrl}
    />
  );
}

export default function PdfViewerPage() {
  return (
    <Suspense
      fallback={
        <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0F0F11', color: '#A1A1AA' }}>
          Loading PDF Viewer...
        </div>
      }
    >
      <PdfViewerContent />
    </Suspense>
  );
}
