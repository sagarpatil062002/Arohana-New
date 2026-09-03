// src/components/NavOverlay.tsx
import React, { useState, useContext } from 'react';
import { ExperienceContext } from '../App';
import { AudioPlayer } from './AudioPlayer';
import './NavOverlay.css';

interface NavOverlayProps {
  lenis?: any;
}

const CHAPTERS = [
  { id: 'chapter-hero', label: 'Monolith & Vision', num: '01' },
  { id: 'chapter-positioning', label: 'Strategic Discipline', num: '02' },
  { id: 'chapter-realms', label: 'Operational Theatres', num: '03' },
  { id: 'chapter-execution', label: 'Proof of Work', num: '04' },
  { id: 'chapter-army', label: 'Indian Army Projects', num: '05' },
  { id: 'chapter-founder', label: 'Leadership & Pedigree', num: '06' },
  { id: 'chapter-capabilities', label: 'Practice Areas', num: '07' },
  { id: 'chapter-cases', label: 'Selected Case Studies', num: '08' },
  { id: 'chapter-principles', label: 'The Standard', num: '09' },
  { id: 'chapter-tourin', label: 'Tourin Ladakh', num: '10' },
  { id: 'chapter-contact', label: 'Start a Conversation', num: '11' },
];

export const NavOverlay: React.FC<NavOverlayProps> = ({ lenis }) => {
  const { scrollProgress } = useContext(ExperienceContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);

  // Derive chapter from scrollProgress
  const chapterIdx = Math.min(CHAPTERS.length - 1, Math.floor(scrollProgress * CHAPTERS.length));
  const currentChapter = CHAPTERS[chapterIdx] || CHAPTERS[0];

  const scrollTo = (id: string) => {
    setMenuOpen(false);
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
    <>
      {/* Top HUD Header */}
      <header className="nav-overlay-header">
        {/* Brand Monogram & Name */}
        <div className="brand-logo-group" onClick={() => scrollTo('chapter-hero')}>
          <span className="brand-monogram-mark">Ā</span>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="brand-text-name">ĀROHANA</span>
            <span className="font-mono" style={{ fontSize: '8px', letterSpacing: '0.2em', color: '#C5A46D' }}>
              CONSULTANCY
            </span>
          </div>
        </div>

        {/* Center Spatial Depth Tracker */}
        <div className="hud-center-tracker">
          <div className="hud-chapter-badge">
            <span style={{ color: '#C5A46D', marginRight: '6px' }}>{currentChapter.num}</span>
            <span>{currentChapter.label.toUpperCase()}</span>
          </div>
          <span className="font-mono" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em' }}>
            DEPTH: {Math.round(scrollProgress * 100)}%
          </span>
        </div>

        {/* Right Actions */}
        <div className="hud-actions-group">
          {/* Ambient Soundscape Toggle */}
          <AudioPlayer isPlaying={audioPlaying} onToggle={() => setAudioPlaying((p) => !p)} />

          {/* Menu Drawer Button */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="menu-trigger-btn"
            aria-label={menuOpen ? 'Close chapter index' : 'Open chapter index'}
          >
            <span>{menuOpen ? 'CLOSE' : 'INDEX'}</span>
            <span style={{ color: '#C5A46D' }}>{menuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </header>

      {/* Fullscreen Chapter Index Drawer */}
      <div className={`spatial-menu-drawer ${menuOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C5A46D' }} />
            <span className="font-mono" style={{ fontSize: '11px', letterSpacing: '0.24em', color: '#C5A46D' }}>
              SPATIAL CHAPTER INDEX // 11 DESTINATIONS
            </span>
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            className="font-mono"
            style={{ fontSize: '11px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.6)' }}
          >
            [ CLOSE ✕ ]
          </button>
        </div>

        <ul className="drawer-nav-list">
          {CHAPTERS.map((ch) => (
            <li key={ch.id} className="drawer-nav-item">
              <a
                href={`#${ch.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(ch.id);
                }}
              >
                <span className="drawer-nav-number">{ch.num}</span>
                <span className="drawer-nav-label">{ch.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="drawer-footer">
          <span>ĀROHANA CONSULTANCY — MUMBAI · GOA · LADAKH</span>
          <span>EST. 2020 // ARCHITECTURAL // 3D</span>
        </div>
      </div>
    </>
  );
};

export default NavOverlay;
