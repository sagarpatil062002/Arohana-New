import React from 'react';
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
  return (
    <>
      {/* 01: Hero Video / Media Container */}
      <Hero />

      {/* 02: Selected Brands & Organisations Marquee */}
      <BrandsMarquee />

      {/* 03: Real-World Execution Mechanical Flip Counter */}
      <RealWorldImpact />

      {/* 04: Selected Indian Army Projects 3D Perspective Showcase */}
      <IndianArmySpotlight />

      {/* 05: Editorial Introduction / A Point of View */}
      <PointOfView />

      {/* 06: Selected Work Showcase — The work is the proof. (3D Coverflow) */}
      <SelectedWork />

      {/* 07: Deep Black Services Section */}
      <ServicesSection />

      {/* 08: Sectors & Built Environment Montage */}
      <SectorMontage />

      {/* 09: Tourin Experiential Travel Feature */}
      <TourinSpotlight />

      {/* 10: Signature Mouse-Trail Interactive CTA */}
      <InteractiveCTA />
    </>
  );
}
