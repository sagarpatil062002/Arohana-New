'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export interface AntigravityFloatProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  /** Vertical float amplitude in pixels (e.g. 6 yields [-6, 6, -6]). Default: 6 */
  amplitude?: number;
  /** Full oscillation cycle duration in seconds (5s to 7s). Default: 6 */
  duration?: number;
  /** Start delay in seconds (helps stagger multiple floating elements) */
  delay?: number;
  /** Subtle rotation tilt in degrees (e.g. 1 yields [-1, 1, -1]). Default: 0 */
  rotateAmplitude?: number;
  /** Subtle horizontal drift in pixels (e.g. 3 yields [-3, 3, -3]). Default: 0 */
  xAmplitude?: number;
  className?: string;
}

export function AntigravityFloat({
  children,
  amplitude = 6,
  duration = 6,
  delay = 0,
  rotateAmplitude = 0,
  xAmplitude = 0,
  className = '',
  ...motionProps
}: AntigravityFloatProps) {
  const prefersReduced = usePrefersReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  const animateProps: Record<string, number[]> = {
    y: [-amplitude, amplitude, -amplitude],
  };

  if (xAmplitude > 0) {
    animateProps.x = [-xAmplitude, xAmplitude, -xAmplitude];
  }

  if (rotateAmplitude > 0) {
    animateProps.rotate = [-rotateAmplitude, rotateAmplitude, -rotateAmplitude];
  }

  return (
    <motion.div
      animate={animateProps}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      }}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
