// src/hooks/useResponsive.ts
import { useEffect, useState } from 'react';

/**
 * Simple hook to detect viewport size categories and prefers-reduced-motion.
 * Returns booleans for mobile, tablet, and reducedMotion preference.
 */
export const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 600px)');
    const tabletQuery = window.matchMedia('(min-width: 601px) and (max-width: 1024px)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => {
      setIsMobile(mobileQuery.matches);
      setIsTablet(tabletQuery.matches);
      setReducedMotion(motionQuery.matches);
    };

    update();
    mobileQuery.addEventListener('change', update);
    tabletQuery.addEventListener('change', update);
    motionQuery.addEventListener('change', update);

    return () => {
      mobileQuery.removeEventListener('change', update);
      tabletQuery.removeEventListener('change', update);
      motionQuery.removeEventListener('change', update);
    };
  }, []);

  return { isMobile, isTablet, reducedMotion };
};
