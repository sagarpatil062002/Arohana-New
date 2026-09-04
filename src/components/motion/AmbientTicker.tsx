'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export interface AmbientTickerProps {
  children: React.ReactNode;
  /** Speed of complete cycle in seconds (default is 70s as per specification) */
  speed?: number;
  /** Direction of marquee drift: 'left' or 'right' */
  direction?: 'left' | 'right';
  /** Number of item duplications for seamless loop (default: 3) */
  repeatCount?: number;
  /** Slow down smoothly on hover */
  pauseOnHover?: boolean;
  className?: string;
}

export function AmbientTicker({
  children,
  speed = 70,
  direction = 'left',
  repeatCount = 3,
  pauseOnHover = true,
  className = '',
}: AmbientTickerProps) {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReduced = usePrefersReducedMotion();

  if (prefersReduced) {
    return (
      <div className={`overflow-x-auto ${className}`}>
        <div className="flex items-center gap-8 w-max">{children}</div>
      </div>
    );
  }

  const travelInitial = direction === 'left' ? '0%' : '-50%';
  const travelTarget = direction === 'left' ? '-50%' : '0%';

  return (
    <div
      onMouseEnter={() => pauseOnHover && setIsHovered(true)}
      onMouseLeave={() => pauseOnHover && setIsHovered(false)}
      className={`relative overflow-hidden w-full select-none ${className}`}
    >
      <motion.div
        className="flex items-center gap-12 w-max whitespace-nowrap will-change-transform"
        animate={{
          x: [travelInitial, travelTarget],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: isHovered ? speed * 3.5 : speed, // Soft glide deceleration on hover
            ease: 'linear',
          },
        }}
      >
        {Array.from({ length: repeatCount }).map((_, i) => (
          <div key={i} className="flex items-center gap-12 flex-shrink-0">
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
