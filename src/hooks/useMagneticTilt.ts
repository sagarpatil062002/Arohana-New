'use client';

import { useRef, useState, useCallback, MouseEvent } from 'react';
import { useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export interface UseMagneticTiltOptions {
  /** Maximum tilt angle in degrees. Default is 8 */
  maxTilt?: number;
  /** Maximum translation displacement in pixels. Default is 6 */
  maxTranslate?: number;
  /** Spring stiffness for inertial deceleration. Default is 150 */
  stiffness?: number;
  /** Spring damping for soft settle. Default is 18 */
  damping?: number;
  /** Mass of the floating layer. Default is 0.6 */
  mass?: number;
}

export function useMagneticTilt<T extends HTMLElement = HTMLDivElement>(
  options: UseMagneticTiltOptions = {}
) {
  const {
    maxTilt = 7,
    maxTranslate = 6,
    stiffness = 140,
    damping = 18,
    mass = 0.6,
  } = options;

  const ref = useRef<T>(null);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReduced = usePrefersReducedMotion();

  // Normalized cursor coordinates (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for soft, smooth, zero-gravity inertial response
  const springConfig = { stiffness, damping, mass };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Map to 3D rotation and translation
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-maxTilt, maxTilt]);
  const x = useTransform(smoothMouseX, [-0.5, 0.5], [-maxTranslate, maxTranslate]);
  const y = useTransform(smoothMouseY, [-0.5, 0.5], [-maxTranslate, maxTranslate]);

  const handleMouseMove = useCallback(
    (e: MouseEvent<T>) => {
      if (prefersReduced || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      // Calculate normalized value centered at (0, 0) in range [-0.5, 0.5]
      const normX = clientX / rect.width - 0.5;
      const normY = clientY / rect.height - 0.5;

      mouseX.set(normX);
      mouseY.set(normY);
    },
    [mouseX, mouseY, prefersReduced]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return {
    ref,
    rotateX: prefersReduced ? 0 : rotateX,
    rotateY: prefersReduced ? 0 : rotateY,
    x: prefersReduced ? 0 : x,
    y: prefersReduced ? 0 : y,
    isHovered,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  };
}
