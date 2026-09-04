import React from 'react';
import Hero from '@/components/home/Hero';
import BrandsMarquee from '@/components/home/BrandsMarquee';
import PointOfView from '@/components/home/PointOfView';
import SelectedWork from '@/components/home/SelectedWork';
import ServicesSection from '@/components/home/ServicesSection';
import SectorMontage from '@/components/home/SectorMontage';
import StatsProof from '@/components/home/StatsProof';
import IndianArmySpotlight from '@/components/home/IndianArmySpotlight';
import TourinSpotlight from '@/components/home/TourinSpotlight';
import InteractiveCTA from '@/components/home/InteractiveCTA';

export default function HomePage() {
  return (
    <>
      {/* 01: Alture-Style Hero with Split Display Typography & Video Container */}
      <Hero />

      {/* 02: Selected Brands & Organisations Marquee */}
      <BrandsMarquee />

      {/* 03: Editorial Introduction / A Point of View */}
      <PointOfView />

      {/* 04: Selected Work Sticky Scroll Showcase */}
      <SelectedWork />

      {/* 05: Deep Black Services Section with Cursor-Following Image Crossfade */}
      <ServicesSection />

      {/* 06: Sectors & Built Environment Montage */}
      <SectorMontage />

      {/* 07: Proof & Verifiable Metrics */}
      <StatsProof />

      {/* 08: Indian Army Special Operations Feature */}
      <IndianArmySpotlight />

      {/* 09: Tourin Experiential Travel Feature */}
      <TourinSpotlight />

      {/* 10: Signature Mouse-Trail Interactive CTA */}
      <InteractiveCTA />
    </>
  );
}
