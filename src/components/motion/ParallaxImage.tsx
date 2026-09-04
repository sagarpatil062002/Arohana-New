'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

interface ParallaxImageProps {
  src: string;
  alt: string;
  aspectRatio?: string;
  borderRadius?: string;
  style?: React.CSSProperties;
  className?: string;
  priority?: boolean;
  speed?: number; // percentage shift, e.g. 10
}

export default function ParallaxImage({
  src,
  alt,
  aspectRatio = '16/10',
  borderRadius = '24px',
  style = {},
  className = '',
  priority = false,
  speed = 10,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    const imgEl = imageRef.current;
    if (!container || !imgEl) return;

    gsap.fromTo(
      imgEl,
      { yPercent: -speed },
      {
        yPercent: speed,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
  }, [speed]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio,
        borderRadius,
        overflow: 'hidden',
        ...style,
      }}
      className={className}
    >
      <div
        ref={imageRef}
        style={{
          position: 'absolute',
          inset: '-10% 0',
          width: '100%',
          height: '120%',
          willChange: 'transform',
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          style={{ objectFit: 'cover' }}
        />
      </div>
    </div>
  );
}
