import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div
      className="section-light"
      style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <div className="tag-mono" style={{ color: '#ff3b30', marginBottom: '1rem' }}>
        404 • PAGE NOT FOUND
      </div>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3rem, 7vw, 6rem)',
          fontWeight: 500,
          marginBottom: '1.5rem',
        }}
      >
        Lost in Context.
      </h1>
      <p style={{ color: '#666', maxWidth: '440px', lineHeight: 1.6, marginBottom: '2.5rem' }}>
        The page or case study you requested could not be located.
      </p>
      <Link href="/" className="button-editorial button-editorial-dark" style={{ height: '48px', padding: '0 1.75rem' }}>
        <div className="button-texts-slider">
          <span className="button-text-item">Return to Home</span>
          <span className="button-text-item">Return to Home</span>
        </div>
        <ArrowLeft size={16} />
      </Link>
    </div>
  );
}
