'use client';

import React from 'react';
import { useCmsContent } from '@/lib/cms/content-context';
import Hero from '@/components/home/Hero';
import PointOfView from '@/components/home/PointOfView';
import SelectedWork from '@/components/home/SelectedWork';
import ServicesSection from '@/components/home/ServicesSection';
import BrandsMarquee from '@/components/home/BrandsMarquee';
import IndianArmySpotlight from '@/components/home/IndianArmySpotlight';
import InteractiveCTA from '@/components/home/InteractiveCTA';

export default function HomePage() {
  const { content } = useCmsContent();
  const configuredSections = content?.home?.sections;

  const sectionComponentMap: Record<string, React.ReactNode> = {
    hero: <Hero key="hero" />,
    pov: <PointOfView key="pov" />,
    work: <SelectedWork key="work" />,
    services: <ServicesSection key="services" />,
    brands: <BrandsMarquee key="brands" />,
    army: <IndianArmySpotlight key="army" />,
    cta: <InteractiveCTA key="cta" />,
  };

  // If sections are configured in CMS, respect order and visibility
  if (configuredSections && Array.isArray(configuredSections) && configuredSections.length > 0) {
    return (
      <>
        {configuredSections.map((sec: any) => {
          if (sec.visible === false) return null;
          return sectionComponentMap[sec.id] || null;
        })}
      </>
    );
  }

  // Fallback default order
  return (
    <>
      <Hero />
      <PointOfView />
      <SelectedWork />
      <ServicesSection />
      <BrandsMarquee />
      <IndianArmySpotlight />
      <InteractiveCTA />
    </>
  );
}
