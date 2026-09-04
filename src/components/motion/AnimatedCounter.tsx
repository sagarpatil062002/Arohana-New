'use client';

import React, { useState, useEffect } from 'react';
import { useInView } from '@/hooks/useInView';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number; // In ms (default 1500)
  className?: string;
  padZero?: boolean;
}

export function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 1500,
  className = '',
  padZero = false,
}: AnimatedCounterProps) {
  const [ref, inView] = useInView<HTMLSpanElement>({
    threshold: 0.2,
    triggerOnce: true,
  });
  const [displayCount, setDisplayCount] = useState(0);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      setDisplayCount(value);
      return;
    }

    if (!inView) return;

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const easeOutCubic = (t: number): number => {
      return 1 - Math.pow(1 - t, 3);
    };

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const current = Math.floor(easedProgress * value);

      setDisplayCount(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayCount(value);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [inView, value, duration, prefersReduced]);

  const formattedCount = padZero && displayCount < 10 ? `0${displayCount}` : displayCount;

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {formattedCount}
      {suffix}
    </span>
  );
}
