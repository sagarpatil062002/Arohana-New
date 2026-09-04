'use client';

import React, { createContext, useContext } from 'react';
import { useInView } from '@/hooks/useInView';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface StaggerContextValue {
  inView: boolean;
  staggerDelay: number;
}

const StaggerContext = createContext<StaggerContextValue>({
  inView: false,
  staggerDelay: 80,
});

interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number; // Milliseconds between items (default 80ms)
  threshold?: number;
  rootMargin?: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
}

export function StaggerContainer({
  children,
  staggerDelay = 80,
  threshold = 0.1,
  rootMargin = '0px 0px -30px 0px',
  className = '',
  as: Component = 'div',
  style = {},
}: StaggerContainerProps) {
  const [ref, inView] = useInView<HTMLDivElement>({
    threshold,
    rootMargin,
    triggerOnce: false,
  });

  return (
    <StaggerContext.Provider value={{ inView, staggerDelay }}>
      {React.createElement(
        Component,
        {
          ref,
          className,
          style,
        },
        children
      )}
    </StaggerContext.Provider>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  index: number;
  duration?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
}

export function StaggerItem({
  children,
  index,
  duration = 650,
  className = '',
  as: Component = 'div',
  style = {},
}: StaggerItemProps) {
  const { inView, staggerDelay } = useContext(StaggerContext);
  const prefersReduced = usePrefersReducedMotion();

  if (prefersReduced) {
    return React.createElement(
      Component,
      { className, style },
      children
    );
  }

  const delayMs = index * staggerDelay;

  const dynamicStyle: React.CSSProperties = {
    ...style,
    opacity: inView ? 1 : 0,
    transform: inView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 30px, 0)',
    transitionProperty: 'opacity, transform',
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    transitionDelay: `${delayMs}ms`,
    willChange: inView ? 'auto' : 'opacity, transform',
  };

  return React.createElement(
    Component,
    {
      className,
      style: dynamicStyle,
    },
    children
  );
}
