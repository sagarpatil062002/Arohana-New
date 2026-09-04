'use client';

import React from 'react';
import FroxenHero from '@/components/home/FroxenHero';
import PointOfViewSection from '@/components/home/PointOfViewSection';
import ThreeWaysWeWork from '@/components/home/ThreeWaysWeWork';
import SelectedWorkEditorial from '@/components/home/SelectedWorkEditorial';
import SpecialProjectsStrip from '@/components/home/SpecialProjectsStrip';
import TourinSpotlight from '@/components/home/TourinSpotlight';
import CreativeProcessSection from '@/components/home/CreativeProcessSection';
import MarqueeTicker from '@/components/ui/MarqueeTicker';

const SECTORS_LIST = [
  'Hospitality & F&B',
  'Real Estate & Built Environment',
  'Healthcare',
  'Lifestyle & Consumer Brands',
  'Entertainment & Media',
  'Travel & Tourism',
  'Institutional & Defence Briefs',
];

const BRANDS_LIST = [
  'Raysons Group',
  'PictureTime',
  'Loom Crafts',
  'Neora Deck',
  'Misu',
  'RR Skins',
  'Blu Resorts',
  'Qubice',
  'Kanopy',
  'Citron',
  'DTK Karekar Jewellery',
  'Holiday Village',
  'Spice Goa',
  'Khana Khazana',
];

export default function HomePage() {
  return (
    <div className="bg-[#060607] min-h-screen text-[#ECECEF]">
      {/* 01: Hero Section */}
      <FroxenHero />

      {/* Ticker 1: Sectors Experience Band */}
      <MarqueeTicker
        items={SECTORS_LIST}
        separator="✦"
        speed="slow"
        className="bg-[#09090c] border-y border-white/10"
      />

      {/* 02: Point of View Section */}
      <PointOfViewSection />

      {/* 03: Three Ways We Work */}
      <ThreeWaysWeWork />

      {/* Ticker 2: Brands & Organisations Marquee */}
      <div className="py-8 bg-[#09090c] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 mb-3">
          <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-500">
            Brands and organisations we've worked with
          </p>
        </div>
        <MarqueeTicker
          items={BRANDS_LIST}
          separator="✳"
          speed="normal"
          reverse={true}
          className="border-none py-2"
        />
      </div>

      {/* 04: Selected Work Centerpiece */}
      <SelectedWorkEditorial />

      {/* 05: Special / Institutional Projects */}
      <SpecialProjectsStrip />

      {/* 06: Tourin Spotlight */}
      <TourinSpotlight />

      {/* 07: Creative Process & Methodology */}
      <CreativeProcessSection />
    </div>
  );
}
