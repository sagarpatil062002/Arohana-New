'use client';

import React from 'react';
import CircularImageTrack from './CircularImageTrack';

export default function BrandsMarquee() {
  return (
    <section
      className="section-light"
      style={{
        paddingTop: '3.5rem',
        paddingBottom: '3.5rem',
        borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Split Screen Partnerships: Left Side Company Info & Names | Right Side 3D Rotating Cylinder */}
      <CircularImageTrack />
    </section>
  );
}
