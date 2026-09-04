'use client';

import { useRef, RefObject } from 'react';
import { useScroll, useTransform, MotionValue } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export interface UseParallaxLayerOptions {
  /**
   * Speed multiplier:
   * Positive (e.g. 0.15 to 0.4): moves upwards faster as you scroll down (foreground float)
   * Negative (e.g. -0.15 to -0.3): moves slower/downwards, creating background depth
   */
  speed?: number;
  /** Distance in pixels to travel across the viewport scroll range. Defaults to speed * 200 */
  distance?: number;
  /** Custom scroll trigger container ref */
  targetRef?: RefObject<HTMLElement>;
  /** Framer Motion useScroll offset config. Default: ["start end", "end start"] */
  offset?: [string, string];
}

export function useParallaxLayer(options: UseParallaxLayerOptions = {}): {
  ref: RefObject<HTMLDivElement>;
  y: MotionValue<number> | number;
  opacity?: MotionValue<number>;
} {
  const {
    speed = 0.2,
    distance = speed * 180,
    targetRef,
    offset = ['start end', 'end start'],
  } = options;

  const internalRef = useRef<HTMLDivElement>(null);
  const elementRef = targetRef || internalRef;
  const prefersReduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: elementRef,
    offset: offset as any,
  });

  // Calculate start and end positions
  const startY = distance;
  const endY = -distance;

  const y = useTransform(scrollYProgress, [0, 1], [startY, endY]);

  if (prefersReduced) {
    return {
      ref: internalRef,
      y: 0,
    };
  }

  return {
    ref: internalRef,
    y,
  };
}
