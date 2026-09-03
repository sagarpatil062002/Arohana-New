// src/components/NarrativeLayer.tsx
import React from 'react';
import { HeroChapter } from './sections/HeroChapter';
import { PositioningChapter } from './sections/PositioningChapter';
import { RealmsChapter } from './sections/RealmsChapter';
import { ExecutionChapter } from './sections/ExecutionChapter';
import { ArmyProjectsChapter } from './sections/ArmyProjectsChapter';
import { FounderChapter } from './sections/FounderChapter';
import { CapabilitiesChapter } from './sections/CapabilitiesChapter';
import { PrinciplesChapter } from './sections/PrinciplesChapter';
import { CaseStudiesChapter } from './sections/CaseStudiesChapter';
import { TourinChapter } from './sections/TourinChapter';
import { ContactChapter } from './sections/ContactChapter';

interface NarrativeLayerProps {
  lenis?: any;
}

export const NarrativeLayer: React.FC<NarrativeLayerProps> = ({ lenis }) => {
  const scrollToChapter = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      if (lenis && lenis.scrollTo) {
        lenis.scrollTo(target, { offset: -40, duration: 1.5 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div
      className="narrative-content-layer"
      style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        minHeight: '100vh',
        pointerEvents: 'auto',
      }}
    >
      {/* 01 & 02: Hero & Vision */}
      <HeroChapter onExplore={() => scrollToChapter('chapter-positioning')} />

      {/* 03: Positioning & Strategic Discipline */}
      <PositioningChapter />

      {/* 04: Operational Theatres // 04 Realms */}
      <RealmsChapter />

      {/* 05 & 06: Proof of Work // Real-World Execution */}
      <ExecutionChapter />

      {/* 07: Special Engagements // Indian Army Projects */}
      <ArmyProjectsChapter />

      {/* 08: Leadership & Pedigree // Founder */}
      <FounderChapter />

      {/* 09: Practice Areas // Capabilities */}
      <CapabilitiesChapter />

      {/* 10: Selected Enterprise Commissions // Case Studies */}
      <CaseStudiesChapter />

      {/* 11: Operating Code // The Standard */}
      <PrinciplesChapter />

      {/* 12: High-Altitude Travel Unit // Tourin */}
      <TourinChapter />

      {/* 13: Final Sovereign Climax // Contact */}
      <ContactChapter />
    </div>
  );
};

export default NarrativeLayer;
