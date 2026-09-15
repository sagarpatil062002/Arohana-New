'use client';

import React from 'react';
import { useCmsContent } from '@/lib/cms/content-context';
import Hero from '@/components/home/Hero';
import BrandsMarquee from '@/components/home/BrandsMarquee';
import RealWorldImpact from '@/components/home/RealWorldImpact';
import IndianArmySpotlight from '@/components/home/IndianArmySpotlight';
import PointOfView from '@/components/home/PointOfView';
import SelectedWork from '@/components/home/SelectedWork';
import ServicesSection from '@/components/home/ServicesSection';
import SectorMontage from '@/components/home/SectorMontage';
import TourinSpotlight from '@/components/home/TourinSpotlight';
import InteractiveCTA from '@/components/home/InteractiveCTA';

export default function HomePage() {
  const { content } = useCmsContent();
  const configuredSections = content?.home?.sections;

  const sectionComponentMap: Record<string, React.ReactNode> = {
    hero: <Hero key="hero" />,
    brands: <BrandsMarquee key="brands" />,
    impact: <RealWorldImpact key="impact" />,
    army: <IndianArmySpotlight key="army" />,
    pov: <PointOfView key="pov" />,
    work: <SelectedWork key="work" />,
    services: <ServicesSection key="services" />,
    montage: <SectorMontage key="montage" />,
    tourin: <TourinSpotlight key="tourin" />,
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
      <IndianArmySpotlight />
      <PointOfView />
      <SelectedWork />
      <ServicesSection />
      <BrandsMarquee />
      <InteractiveCTA />
    </>
  );
}
