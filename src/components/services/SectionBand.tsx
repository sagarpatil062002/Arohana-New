import React from 'react';

interface SectionBandProps {
  index: string;
  eyebrow: string;
  meta: string;
  theme?: 'light' | 'dark';
}

export default function SectionBand({ index, eyebrow, meta, theme = 'light' }: SectionBandProps) {
  return (
    <header className={`svc-band${theme === 'dark' ? ' svc-band--dark' : ''}`}>
      <span className="svc-band-index">{index}</span>
      <span className="svc-eyebrow svc-eyebrow--red svc-band-center">
        <span className="svc-eyebrow-dot" />
        {eyebrow}
      </span>
      <span className="svc-band-meta">{meta}</span>
    </header>
  );
}