'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export type DriftDirection = 'up' | 'down' | 'left' | 'right' | 'none';

export interface ScrollDriftProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  /** Direction from which the element floats into view. Default is 'up' */
  direction?: DriftDirection;
  /** Distance in pixels to float (default is 60px) */
  distance?: number;
  /** Delay in seconds */
  delay?: number;
  /** Duration in seconds (default is 1.4s) */
  duration?: number;
  /** Viewport threshold to trigger animation (default 0.15) */
  threshold?: number;
  /** Whether to trigger only once or on each entry */
  once?: boolean;
  /** Enable subtle continuous idle floating levitation after entering view */
  idleFloat?: boolean;
  /** Idle float amplitude in pixels (default 5px) */
  idleAmplitude?: number;
  /** Idle float duration in seconds (default 6s) */
  idleDuration?: number;
  className?: string;
}

export function ScrollDrift({
  children,
  direction = 'up',
  distance = 60,
  delay = 0,
  duration = 1.2,
  threshold = 0.08,
  once = false,
  idleFloat = false,
  idleAmplitude = 5,
  idleDuration = 6,
  className = '',
  ...motionProps
}: ScrollDriftProps) {
  const prefersReduced = usePrefersReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  const getInitialOffsets = () => {
    switch (direction) {
      case 'up':
        return { y: distance, x: 0 };
      case 'down':
        return { y: -distance, x: 0 };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      case 'none':
      default:
        return { x: 0, y: 0 };
    }
  };

  const initial = {
    opacity: 0,
    ...getInitialOffsets(),
    scale: 0.98,
  };

  const whileInView = {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
  };

  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      viewport={{ once, amount: threshold }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Weightless deceleration curve
      }}
      className={className}
      {...motionProps}
    >
      {idleFloat ? (
        <motion.div
          animate={{
            y: [-idleAmplitude, idleAmplitude, -idleAmplitude],
          }}
          transition={{
            duration: idleDuration,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: delay + 0.5,
          }}
        >
          {children}
        </motion.div>
      ) : (
        children
      )}
    </motion.div>
  );
}
