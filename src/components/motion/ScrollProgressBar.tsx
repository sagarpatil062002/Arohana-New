'use client';

import React, { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface ScrollProgressBarProps {
  color?: string;
  height?: number; // In pixels (default 2px)
  className?: string;
}

export function ScrollProgressBar({
  color = 'bg-stodio-red',
  height = 2,
  className = '',
}: ScrollProgressBarProps) {
  const [progress, setProgress] = useState(0);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    if (typeof window === 'undefined') return;

    const updateScrollProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setProgress(Math.min(100, Math.max(0, (currentScroll / scrollHeight) * 100)));
      }
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();

    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 pointer-events-none ${className}`}
      style={{ height: `${height}px` }}
    >
      <div
        className={`h-full ${color} transition-all duration-75 ease-out`}
        style={{
          width: `${progress}%`,
          boxShadow: '0 0 8px rgba(222, 50, 45, 0.4)',
        }}
      />
    </div>
  );
}
