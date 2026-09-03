// src/hooks/useNarrativeScroll.ts
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook to coordinate GSAP timeline animations with Lenis scroll progress.
 */
export const useNarrativeScroll = (
  lenis: Lenis | null,
  scrollProgress: number,
  _deviceQuality: 'high' | 'medium' | 'low',
  _reducedMotion: boolean,
) => {
  const masterTimeline = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!masterTimeline.current) {
      masterTimeline.current = gsap.timeline({ paused: true });
    }
  }, []);

  useEffect(() => {
    if (!masterTimeline.current) return;
    masterTimeline.current.seek(scrollProgress * masterTimeline.current.duration());
  }, [scrollProgress]);

  useEffect(() => {
    if (!lenis) return;
    const onResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [lenis]);
};
