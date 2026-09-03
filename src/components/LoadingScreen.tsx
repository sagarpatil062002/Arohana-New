// src/components/LoadingScreen.tsx
import React, { useState, useEffect } from 'react';
import './LoadingScreen.css';

interface LoadingScreenProps {
  onFinish?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinish }) => {
  const [step, setStep] = useState(1); // 1: 'Ā', 2: 'ĀROHANA', 3: 'CONSULTANCY', 4: 'READY'
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Simulated sequence with smooth progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 28);

    // Step transitions
    const t1 = setTimeout(() => setStep(2), 600);
    const t2 = setTimeout(() => setStep(3), 1200);
    const t3 = setTimeout(() => setStep(4), 1800);

    // Auto-enter if user doesn't click
    const autoEnter = setTimeout(() => {
      handleComplete();
    }, 2800);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') {
        handleComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(autoEnter);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleComplete = () => {
    if (isFadingOut) return;
    setIsFadingOut(true);
    setTimeout(() => {
      if (onFinish) onFinish();
    }, 750);
  };

  return (
    <div className={`loading-screen-root ${isFadingOut ? 'fading-out' : ''}`}>
      {/* HUD Header */}
      <header className="loading-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#C5A46D',
              animation: 'subtlePulse 2s infinite',
            }}
          />
          <span className="font-mono" style={{ fontSize: '11px', letterSpacing: '0.24em', color: 'rgba(255,255,255,0.6)' }}>
            ĀROHANA // SPATIAL ARCHIVE
          </span>
        </div>

        <button
          onClick={handleComplete}
          className="font-mono"
          style={{
            fontSize: '10px',
            letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.4)',
            padding: '4px 8px',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
          aria-label="Skip opening animation"
        >
          [ ESC TO ENTER ]
        </button>
      </header>

      {/* Cinematic Centerpiece */}
      <div className="loading-center">
        {/* Monogram Glyph */}
        <div className="monogram-symbol">
          Ā
        </div>

        {/* Dynamic Name Progression */}
        {step >= 2 && (
          <h1 className="brand-reveal-title">
            ĀROHANA
          </h1>
        )}

        {step >= 3 && (
          <div className="brand-reveal-sub">
            CONSULTANCY
          </div>
        )}

        {/* Progress Bar */}
        <div className="loading-progress-bar-container">
          <div className="loading-progress-fill" style={{ width: `${progress}%` }} />
        </div>

        {/* Enter Action */}
        {step >= 4 && (
          <button onClick={handleComplete} className="enter-button">
            ENTER EXPERIENCE →
          </button>
        )}
      </div>

      {/* Footer Details */}
      <footer className="loading-footer">
        <span>[ 16°41'N 74°14'E — MUMBAI · GOA · LADAKH ]</span>
        <span>INITIALISING 3D ENVIRONMENT // {progress}%</span>
      </footer>
    </div>
  );
};

export default LoadingScreen;
