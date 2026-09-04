'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface LenisContextType {
  lenis: Lenis | null;
  scrollTo: (target: string | HTMLElement | number, options?: Parameters<Lenis['scrollTo']>[1]) => void;
}

const LenisContext = createContext<LenisContextType>({
  lenis: null,
  scrollTo: () => {},
});

export const useLenis = () => useContext(LenisContext);

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const pathname = usePathname();
  const prefersReduced = usePrefersReducedMotion();
  const rafHandleRef = useRef<number | null>(null);

  useEffect(() => {
    // If user prefers reduced motion, disable inertial smooth scroll
    if (prefersReduced) {
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
      return;
    }

    // Initialize Lenis with high inertia, soft damping weightless floating curve
    const lenis = new Lenis({
      duration: 2.0,
      lerp: 0.04,
      wheelMultiplier: 0.7,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
      infinite: false,
    });

    setLenisInstance(lenis);

    // Continuous Animation Frame Loop
    function raf(time: number) {
      lenis.raf(time);
      rafHandleRef.current = requestAnimationFrame(raf);
    }

    rafHandleRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafHandleRef.current) {
        cancelAnimationFrame(rafHandleRef.current);
      }
      lenis.destroy();
      setLenisInstance(null);
    };
  }, [prefersReduced]);

  // Handle route changes: scroll to top weightlessly
  useEffect(() => {
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { immediate: true });
    }
  }, [pathname, lenisInstance]);

  const scrollTo = (
    target: string | HTMLElement | number,
    options?: Parameters<Lenis['scrollTo']>[1]
  ) => {
    if (lenisInstance) {
      lenisInstance.scrollTo(target, {
        duration: 1.8,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        ...options,
      });
    }
  };

  return (
    <LenisContext.Provider value={{ lenis: lenisInstance, scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
}
