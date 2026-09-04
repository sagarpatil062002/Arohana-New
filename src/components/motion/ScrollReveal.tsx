'use client';

import React from 'react';
import { useInView } from '@/hooks/useInView';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export type RevealVariant = 'slide-up' | 'fade' | 'scale-up' | 'slide-left' | 'slide-right';

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number; // In milliseconds
  duration?: number; // In milliseconds
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
  id?: string;
}

export function ScrollReveal({
  children,
  variant = 'slide-up',
  delay = 0,
  duration = 600,
  threshold = 0.08,
  rootMargin = '0px 0px -20px 0px',
  triggerOnce = false,
  className = '',
  as: Component = 'div',
  style = {},
  id,
}: ScrollRevealProps) {
  const [ref, inView] = useInView<HTMLDivElement>({
    threshold,
    rootMargin,
    triggerOnce,
  });
  const prefersReduced = usePrefersReducedMotion();

  if (prefersReduced) {
    return React.createElement(
      Component,
      { className, style, id },
      children
    );
  }

  const getInitialTransform = (): string => {
    switch (variant) {
      case 'slide-up':
        return 'translate3d(0, 36px, 0)';
      case 'scale-up':
        return 'scale3d(0.96, 0.96, 1) translate3d(0, 20px, 0)';
      case 'slide-left':
        return 'translate3d(30px, 0, 0)';
      case 'slide-right':
        return 'translate3d(-30px, 0, 0)';
      case 'fade':
      default:
        return 'translate3d(0, 0, 0)';
    }
  };

  const dynamicStyle: React.CSSProperties = {
    ...style,
    opacity: inView ? 1 : 0,
    transform: inView ? 'translate3d(0, 0, 0) scale3d(1, 1, 1)' : getInitialTransform(),
    transitionProperty: 'opacity, transform',
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    transitionDelay: `${delay}ms`,
    willChange: inView ? 'auto' : 'opacity, transform',
  };

  return React.createElement(
    Component,
    {
      ref,
      className,
      style: dynamicStyle,
      id,
    },
    children
  );
}
