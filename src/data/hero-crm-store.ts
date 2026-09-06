'use client';

import { useState, useEffect, useCallback } from 'react';
import { HeroSlide } from '@/types/crm';
import { DEFAULT_HERO_SLIDES } from '@/data/seed-crm';

const STORAGE_KEY = 'arohana_crm_hero_slides';
const EVENT_KEY = 'arohana_hero_slides_updated';

export function getStoredHeroSlides(): HeroSlide[] {
  if (typeof window === 'undefined') {
    return DEFAULT_HERO_SLIDES;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_HERO_SLIDES;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (err) {
    console.error('Failed to load hero slides from localStorage:', err);
  }
  return DEFAULT_HERO_SLIDES;
}

export function saveHeroSlides(slides: HeroSlide[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(slides));
    window.dispatchEvent(new CustomEvent(EVENT_KEY, { detail: slides }));
  } catch (err) {
    console.error('Failed to save hero slides to localStorage:', err);
  }
}

export function updateHeroSlide(id: string, updates: Partial<HeroSlide>): HeroSlide[] {
  const current = getStoredHeroSlides();
  const updated = current.map((slide) =>
    slide.id === id ? { ...slide, ...updates } : slide
  );
  saveHeroSlides(updated);
  return updated;
}

export function resetHeroSlides(): HeroSlide[] {
  saveHeroSlides(DEFAULT_HERO_SLIDES);
  return DEFAULT_HERO_SLIDES;
}

export function useHeroSlides() {
  const [slides, setSlides] = useState<HeroSlide[]>(DEFAULT_HERO_SLIDES);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Initial hydration from storage
    setSlides(getStoredHeroSlides());
    setIsLoaded(true);

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<HeroSlide[]>;
      if (customEvent.detail) {
        setSlides(customEvent.detail);
      } else {
        setSlides(getStoredHeroSlides());
      }
    };

    window.addEventListener(EVENT_KEY, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(EVENT_KEY, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const updateSlide = useCallback((id: string, updates: Partial<HeroSlide>) => {
    const updated = updateHeroSlide(id, updates);
    setSlides(updated);
  }, []);

  const reset = useCallback(() => {
    const defaultSlides = resetHeroSlides();
    setSlides(defaultSlides);
  }, []);

  const activeSlides = slides.filter((s) => s.isActive);

  return {
    slides: activeSlides.length > 0 ? activeSlides : DEFAULT_HERO_SLIDES,
    allSlides: slides,
    isLoaded,
    updateSlide,
    reset,
  };
}
