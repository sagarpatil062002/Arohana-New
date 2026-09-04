'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, HTMLMotionProps } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export interface ParallaxLayerProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  /**
   * Speed factor:
   * Positive (e.g. 0.2, 0.4): foreground layer moving upwards faster
   * Negative (e.g. -0.2, -0.4): background layer lagging/moving downwards
   */
  speed?: number;
  /** Distance in pixels to travel */
  distance?: number;
  /** Custom scroll trigger container ref */
  targetRef?: React.RefObject<HTMLElement>;
  /** Optional scroll-linked scaling (e.g. [0.95, 1.05]) */
  scaleRange?: [number, number];
  /** Optional scroll-linked opacity fade (e.g. [0.8, 1]) */
  opacityRange?: [number, number];
  className?: string;
}

export function ParallaxLayer({
  children,
  speed = 0.2,
  distance,
  targetRef,
  scaleRange,
  opacityRange,
  className = '',
  ...motionProps
}: ParallaxLayerProps) {
  const internalRef = useRef<HTMLDivElement>(null);
  const containerRef = targetRef || internalRef;
  const prefersReduced = usePrefersReducedMotion();

  const travelDistance = distance ?? speed * 160;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [travelDistance, -travelDistance]);
  const scale = scaleRange ? useTransform(scrollYProgress, [0, 1], scaleRange) : undefined;
  const opacity = opacityRange ? useTransform(scrollYProgress, [0, 1], opacityRange) : undefined;

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={internalRef}
      style={{
        y,
        scale,
        opacity,
        willChange: 'transform',
      }}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
