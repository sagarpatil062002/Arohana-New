import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ExperienceContext } from '../App';
import { HeroChapter } from '../components/sections/HeroChapter';
import { PositioningChapter } from '../components/sections/PositioningChapter';
import { RealmsChapter } from '../components/sections/RealmsChapter';
import { ExecutionChapter } from '../components/sections/ExecutionChapter';
import { ArmyProjectsChapter } from '../components/sections/ArmyProjectsChapter';
import { FounderChapter } from '../components/sections/FounderChapter';
import { CapabilitiesChapter } from '../components/sections/CapabilitiesChapter';
import { PrinciplesChapter } from '../components/sections/PrinciplesChapter';
import { CaseStudiesChapter } from '../components/sections/CaseStudiesChapter';
import { TourinChapter } from '../components/sections/TourinChapter';
import { ContactChapter } from '../components/sections/ContactChapter';

export const HomePage: React.FC = () => {
  const { scrollProgress } = useContext(ExperienceContext);

  const scrollToPositioning = () => {
    const el = document.getElementById('chapter-positioning');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', background: 'transparent' }}>

      {/* Spatial HUD chapter marker */}
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '28px',
          zIndex: 100,
          background: 'rgba(5, 8, 17, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '6px 14px',
          borderRadius: '2px',
          fontFamily: 'Space Mono, monospace',
          fontSize: '10px',
          letterSpacing: '0.2em',
          color: '#C5A46D',
          pointerEvents: 'none',
        }}
      >
        DEPTH: {Math.round(scrollProgress * 100)}%
      </div>

      {/* Narrative Experience Layer */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        {/* 01 Hero */}
        <HeroChapter onExplore={scrollToPositioning} />

        {/* 02 Strategic Discipline */}
        <PositioningChapter />

        {/* 03 Operational Theatres */}
        <RealmsChapter />

        {/* 04 Proof of Work */}
        <ExecutionChapter />

        {/* 05 Army Projects */}
        <div style={{ position: 'relative' }}>
          <ArmyProjectsChapter />
          <div style={{ textAlign: 'center', paddingBottom: '3rem' }}>
            <Link
              to="/army-projects"
              className="btn-solid"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#C5A46D',
                color: '#0A0F14',
                fontFamily: 'Space Mono, monospace',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.2em',
                padding: '12px 24px',
                textDecoration: 'none',
                textTransform: 'uppercase',
                borderRadius: '2px',
              }}
            >
              <span>EXPLORE ALL MILITARY BRIEFS</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* 06 Leadership Pedigree */}
        <div style={{ position: 'relative' }}>
          <FounderChapter />
          <div style={{ textAlign: 'center', paddingBottom: '3rem' }}>
            <Link
              to="/about"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#ffffff',
                fontFamily: 'Space Mono, monospace',
                fontSize: '11px',
                letterSpacing: '0.2em',
                padding: '12px 24px',
                textDecoration: 'none',
                textTransform: 'uppercase',
                borderRadius: '2px',
                background: 'rgba(255,255,255,0.03)',
              }}
            >
              <span>READ FULL STORY &amp; TIMELINE</span>
              <span style={{ color: '#C5A46D' }}>→</span>
            </Link>
          </div>
        </div>

        {/* 07 Practice Areas */}
        <div style={{ position: 'relative' }}>
          <CapabilitiesChapter />
          <div style={{ textAlign: 'center', paddingBottom: '3rem' }}>
            <Link
              to="/services"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#ffffff',
                fontFamily: 'Space Mono, monospace',
                fontSize: '11px',
                letterSpacing: '0.2em',
                padding: '12px 24px',
                textDecoration: 'none',
                textTransform: 'uppercase',
                borderRadius: '2px',
                background: 'rgba(255,255,255,0.03)',
              }}
            >
              <span>VIEW FULL SERVICE FRAMEWORK</span>
              <span style={{ color: '#C5A46D' }}>→</span>
            </Link>
          </div>
        </div>

        {/* 08 Case Studies */}
        <div style={{ position: 'relative' }}>
          <CaseStudiesChapter />
          <div style={{ textAlign: 'center', paddingBottom: '3rem' }}>
            <Link
              to="/work"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#ffffff',
                fontFamily: 'Space Mono, monospace',
                fontSize: '11px',
                letterSpacing: '0.2em',
                padding: '12px 24px',
                textDecoration: 'none',
                textTransform: 'uppercase',
                borderRadius: '2px',
                background: 'rgba(255,255,255,0.03)',
              }}
            >
              <span>EXPLORE ALL WORK &amp; CASE STUDIES</span>
              <span style={{ color: '#C5A46D' }}>→</span>
            </Link>
          </div>
        </div>

        {/* 09 Operating Principles */}
        <PrinciplesChapter />

        {/* 10 Tourin Ladakh */}
        <div style={{ position: 'relative' }}>
          <TourinChapter />
          <div style={{ textAlign: 'center', paddingBottom: '3rem' }}>
            <Link
              to="/tourin"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#C5A46D',
                color: '#0A0F14',
                fontFamily: 'Space Mono, monospace',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.2em',
                padding: '12px 24px',
                textDecoration: 'none',
                textTransform: 'uppercase',
                borderRadius: '2px',
              }}
            >
              <span>EXPLORE TOURIN EXPERIENCES</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* 11 Contact Climax */}
        <ContactChapter />
      </div>
    </div>
  );
};

export default HomePage;
