'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface ParallaxImageProps {
  children: React.ReactNode;
  speed?: number; // Subtle parallax multiplier, e.g. 0.08 to 0.15 (positive = moves slower than scroll)
  maxOffset?: number; // Max pixel offset (default 30px)
  className?: string;
}

export function ParallaxImage({
  children,
  speed = 0.1,
  maxOffset = 30,
  className = '',
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    if (typeof window === 'undefined') return;

    // Check if mobile screen (width < 768) - disable or reduce parallax
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) {
            ticking = false;
            return;
          }

          const rect = containerRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          // Only calculate when element is in viewport range
          if (rect.top < windowHeight && rect.bottom > 0) {
            const elementCenter = rect.top + rect.height / 2;
            const screenCenter = windowHeight / 2;
            const distanceFromCenter = elementCenter - screenCenter;
            const calculatedOffset = Math.max(-maxOffset, Math.min(maxOffset, distanceFromCenter * speed));
            setOffsetY(calculatedOffset);
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed, maxOffset, prefersReduced]);

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div
        style={{
          transform: `translate3d(0, ${offsetY}px, 0)`,
          transition: 'transform 0.1s cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
}
