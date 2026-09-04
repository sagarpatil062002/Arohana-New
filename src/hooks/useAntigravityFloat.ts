'use client';

import { useMemo } from 'react';
import { TargetAndTransition, Transition } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export interface AntigravityFloatOptions {
  /** Maximum vertical displacement in pixels. Default is 6px (yielding [-6, 6, -6]) */
  yOffset?: number;
  /** Maximum subtle rotation in degrees. Default is 0.8 */
  rotateOffset?: number;
  /** Maximum horizontal drift in pixels. Default is 2 */
  xOffset?: number;
  /** Duration of one full floating cycle in seconds (e.g. 5 to 7). Default is 6 */
  duration?: number;
  /** Delay in seconds before starting idle levitation */
  delay?: number;
  /** Whether to add subtle rotation to the float */
  withRotation?: boolean;
  /** Whether to add subtle horizontal drift */
  withHorizontalDrift?: boolean;
}

export function useAntigravityFloat(options: AntigravityFloatOptions = {}) {
  const {
    yOffset = 6,
    rotateOffset = 0.8,
    xOffset = 2,
    duration = 6,
    delay = 0,
    withRotation = false,
    withHorizontalDrift = false,
  } = options;

  const prefersReduced = usePrefersReducedMotion();

  const floatAnimation: TargetAndTransition = useMemo(() => {
    if (prefersReduced) {
      return { y: 0, x: 0, rotate: 0 };
    }

    const anim: TargetAndTransition = {
      y: [-yOffset, yOffset, -yOffset],
    };

    if (withHorizontalDrift) {
      anim.x = [-xOffset, xOffset, -xOffset];
    }

    if (withRotation) {
      anim.rotate = [-rotateOffset, rotateOffset, -rotateOffset];
    }

    return anim;
  }, [yOffset, rotateOffset, xOffset, withRotation, withHorizontalDrift, prefersReduced]);

  const floatTransition: Transition = useMemo(() => {
    if (prefersReduced) {
      return { duration: 0 };
    }

    return {
      duration,
      delay,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
    };
  }, [duration, delay, prefersReduced]);

  return {
    animate: floatAnimation,
    transition: floatTransition,
  };
}
