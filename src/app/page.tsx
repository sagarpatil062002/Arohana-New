'use client';

import React from 'react';
import { useCmsContent } from '@/lib/cms/content-context';
import Hero from '@/components/home/Hero';
import PointOfView from '@/components/home/PointOfView';
import WhatWeDoSection from '@/components/home/WhatWeDoSection';
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
    whatWeDo: <WhatWeDoSection key="whatWeDo" />,
    work: <SelectedWork key="work" />,
    services: <ServicesSection key="services" />,
    brands: <BrandsMarquee key="brands" />,
    army: <IndianArmySpotlight key="army" />,
    cta: <InteractiveCTA key="cta" />,
  };

  // If sections are configured in CMS, respect order and visibility while ensuring whatWeDo is never dropped
  if (configuredSections && Array.isArray(configuredSections) && configuredSections.length > 0) {
    const hasWhatWeDo = configuredSections.some((sec: any) => sec.id === 'whatWeDo');
    const sectionsToRender = [...configuredSections];

    // If whatWeDo is missing from legacy configuration, insert it right before 'work' (or after 'pov')
    if (!hasWhatWeDo && content?.home?.whatWeDo?.enabled !== false) {
      const povIndex = sectionsToRender.findIndex((sec: any) => sec.id === 'pov');
      const insertAt = povIndex !== -1 ? povIndex + 1 : 2;
      sectionsToRender.splice(insertAt, 0, { id: 'whatWeDo', visible: true, name: 'What We Do' });
    }

    return (
      <>
        {sectionsToRender.map((sec: any) => {
          if (sec.visible === false) return null;
          return sectionComponentMap[sec.id] || null;
        })}
      </>
    );
  }

  // Fallback default order: WhatWeDo comes right before "The work is the proof" (SelectedWork)
  return (
    <>
      <Hero />
      <PointOfView />
      <WhatWeDoSection />
      <SelectedWork />
      <ServicesSection />
      <BrandsMarquee />
      <IndianArmySpotlight />
      <InteractiveCTA />
    </>
  );
}
