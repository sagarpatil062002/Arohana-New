'use client';

import { useState, useEffect, useRef, RefObject } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

interface UseInViewOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * High-performance IntersectionObserver hook that triggers animations when scrolling down,
 * resets when scrolled up past the element (so scrolling down re-animates), and stays
 * stable without jitter when scrolled past the top.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {}
): [RefObject<T>, boolean] {
  const { threshold = 0.08, rootMargin = '0px 0px -20px 0px', triggerOnce = false } = options;
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      setIsInView(true);
      return;
    }

    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            observer.unobserve(node);
          }
        } else {
          // If the element exits through the bottom of the viewport (user scrolled UP),
          // reset it so that when the user scrolls back DOWN, it animates again every time.
          if (!triggerOnce) {
            const isBelowViewport = entry.boundingClientRect.top > 0;
            if (isBelowViewport) {
              setIsInView(false);
            }
          }
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, prefersReduced]);

  return [ref, prefersReduced ? true : isInView];
}
