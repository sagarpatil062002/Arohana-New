'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

interface MaskedHeadingProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div';
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  scrub?: boolean | number;
}

export default function MaskedHeading({
  children,
  as: Component = 'h2',
  className = '',
  style = {},
  delay = 0,
  scrub = false,
}: MaskedHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = textRef.current;
    const container = containerRef.current;
    if (!el || !container) return;

    if (scrub) {
      gsap.fromTo(
        el,
        { yPercent: 100, opacity: 0.2 },
        {
          yPercent: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top 90%',
            end: 'top 50%',
            scrub: scrub === true ? 1 : scrub,
          },
        }
      );
    } else {
      gsap.fromTo(
        el,
        { yPercent: 105, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          delay,
          ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }
  }, [delay, scrub]);

  return (
    <div
      ref={containerRef}
      style={{
        overflow: 'hidden',
        display: 'block',
        ...style,
      }}
      className={className}
    >
      <Component
        ref={textRef as any}
        style={{
          display: 'block',
          willChange: 'transform, opacity',
          margin: 0,
        }}
      >
        {children}
      </Component>
    </div>
  );
}
