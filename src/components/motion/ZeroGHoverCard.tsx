'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { useMagneticTilt } from '@/hooks/useMagneticTilt';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export interface ZeroGHoverCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  /** Enable cursor-following 3D magnetic tilt */
  enableMagneticTilt?: boolean;
  /** Max tilt angle in degrees. Default: 6 */
  maxTilt?: number;
  /** Scale on hover (default 1.04) */
  hoverScale?: number;
  /** Y displacement on hover (default -10px) */
  hoverY?: number;
  /** Duration of hover transition in seconds (default 0.8s) */
  hoverDuration?: number;
  /** Subtle continuous idle floating when not hovered */
  idleFloat?: boolean;
  /** Idle float amplitude in pixels (default 4px) */
  idleAmplitude?: number;
  /** Idle float duration in seconds (default 6s) */
  idleDuration?: number;
  /** Idle float phase delay in seconds */
  idleDelay?: number;
  className?: string;
}

export function ZeroGHoverCard({
  children,
  enableMagneticTilt = true,
  maxTilt = 6,
  hoverScale = 1.04,
  hoverY = -10,
  hoverDuration = 0.8,
  idleFloat = false,
  idleAmplitude = 4,
  idleDuration = 6,
  idleDelay = 0,
  className = '',
  style,
  ...motionProps
}: ZeroGHoverCardProps) {
  const prefersReduced = usePrefersReducedMotion();
  const {
    ref,
    rotateX,
    rotateY,
    x: magneticX,
    y: magneticY,
    isHovered,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  } = useMagneticTilt<HTMLDivElement>({
    maxTilt,
    maxTranslate: 5,
    stiffness: 130,
    damping: 20,
    mass: 0.7,
  });

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={enableMagneticTilt ? ref : undefined}
      onMouseMove={enableMagneticTilt ? handleMouseMove : undefined}
      onMouseEnter={enableMagneticTilt ? handleMouseEnter : undefined}
      onMouseLeave={enableMagneticTilt ? handleMouseLeave : undefined}
      whileHover={{
        y: hoverY,
        scale: hoverScale,
        boxShadow:
          '0 28px 56px -12px rgba(0, 0, 0, 0.09), 0 12px 24px -6px rgba(0, 0, 0, 0.04)',
      }}
      transition={{
        duration: hoverDuration,
        ease: [0.16, 1, 0.3, 1], // Weightless easeOut curve
      }}
      style={{
        ...(enableMagneticTilt && isHovered
          ? {
              rotateX,
              rotateY,
              x: magneticX,
              transformPerspective: 1000,
              transformStyle: 'preserve-3d',
            }
          : {}),
        ...style,
      }}
      className={`gpu-accelerated will-change-motion ${className}`}
      {...motionProps}
    >
      {idleFloat && !isHovered ? (
        <motion.div
          animate={{
            y: [-idleAmplitude, idleAmplitude, -idleAmplitude],
          }}
          transition={{
            duration: idleDuration,
            delay: idleDelay,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      ) : (
        children
      )}
    </motion.div>
  );
}
