'use client';

import React from 'react';
import { motion, HTMLMotionProps, Variants } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface StaggerDriftProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  /** Stagger interval in seconds (default is 0.18s) */
  staggerInterval?: number;
  /** Delay in seconds before children start animating */
  delayChildren?: number;
  /** Viewport threshold to trigger the animation */
  threshold?: number;
  /** Whether to trigger only once or on each entry */
  once?: boolean;
  className?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (custom: { staggerInterval: number; delayChildren: number }) => ({
    opacity: 1,
    transition: {
      staggerChildren: custom.staggerInterval,
      delayChildren: custom.delayChildren,
    },
  }),
};

export function StaggerDrift({
  children,
  staggerInterval = 0.15,
  delayChildren = 0.05,
  threshold = 0.08,
  once = false,
  className = '',
  ...motionProps
}: StaggerDriftProps) {
  const prefersReduced = usePrefersReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={containerVariants}
      custom={{ staggerInterval, delayChildren }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

interface StaggerDriftItemProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  /** Distance in pixels to float (default 60px) */
  distance?: number;
  /** Duration in seconds (default 1.4s) */
  duration?: number;
  /** Optional idle floating levitation on item */
  idleFloat?: boolean;
  /** Idle float index for phase offset */
  index?: number;
  className?: string;
}

const itemVariants: Variants = {
  hidden: (distance: number) => ({
    opacity: 0,
    y: distance,
    scale: 0.98,
  }),
  visible: (custom: { distance: number; duration: number }) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: custom.duration,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export function StaggerDriftItem({
  children,
  distance = 60,
  duration = 1.4,
  idleFloat = false,
  index = 0,
  className = '',
  ...motionProps
}: StaggerDriftItemProps) {
  const prefersReduced = usePrefersReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={itemVariants}
      custom={{ distance, duration }}
      className={className}
      {...motionProps}
    >
      {idleFloat ? (
        <motion.div
          animate={{
            y: [-5, 5, -5],
          }}
          transition={{
            duration: 5.5 + (index % 3) * 0.8,
            delay: (index % 4) * 0.4,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
          className="h-full w-full"
        >
          {children}
        </motion.div>
      ) : (
        children
      )}
    </motion.div>
  );
}
