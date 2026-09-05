'use client';

import React from 'react';
import ShowreelSection, { ShowreelItem } from '@/components/motion/ShowreelSection';

export default function SectorMontage() {
  const sectors: ShowreelItem[] = [
    {
      id: 'hospitality',
      title: 'Hospitality & F&B',
      subtitle: 'Menu Creation, Operating Systems & Repeat Guest Visits',
      description:
        'Hands-on advisory across experiential dining, boutique resorts, and beverage concepts. We work on menu engineering, guest retention, and operational unit economics.',
      image: '/images/case-studies/misu/bar-1.jpg',
      badge: 'HOSPITALITY & F&B',
    },
    {
      id: 'real-estate',
      title: 'Real Estate & Built Environment',
      subtitle: 'Industrial Foundries, Prefab & Luxury Modular Living',
      description:
        'Translating complex technical capabilities and high-end living spaces into cohesive commercial brands across foundries, luxury composite decking, and modular architecture.',
      image: '/images/case-studies/loom/prefab-1.jpg',
      badge: 'BUILT ENVIRONMENT',
    },
    {
      id: 'healthcare',
      title: 'Healthcare',
      subtitle: 'Clinical Authority, Patient Education & Deep Trust',
      description:
        'Elevating patient trust and clinical authority through evidence-based health and dermatological education rather than superficial promises.',
      image: '/images/case-studies/rrskins/education-1.jpg',
      badge: 'HEALTHCARE',
    },
    {
      id: 'consumer',
      title: 'Lifestyle & Consumer Brands',
      subtitle: 'Distinctive Visual Identity & Commercial Momentum',
      description:
        'Building sustainable brand positioning, content velocity, digital storefronts, and paid acquisition systems for businesses that need a stronger market presence.',
      image: '/images/services/digital-growth.jpg',
      badge: 'LIFESTYLE & CONSUMER',
    },
    {
      id: 'entertainment',
      title: 'Entertainment & Media',
      subtitle: 'Cultural Events, Digital Distribution & On-Ground Content',
      description:
        'Cinematic media production, festival campaigns, and on-ground digital coverage tailored to culturally engaged audiences.',
      image: '/images/case-studies/picturetime/picturetime-hero.jpg',
      badge: 'ENTERTAINMENT & MEDIA',
    },
    {
      id: 'travel',
      title: 'Travel & Tourism',
      subtitle: 'Experiential High-Altitude Journeys & Cultural Roots',
      description:
        'Thoughtfully planned travel experiences connecting travellers with genuine local cultures, heritage homestays, and remote landscapes.',
      image: '/images/tourin/tourin-hero.jpg',
      badge: 'TRAVEL & TOURISM',
    },
  ];

  return (
    <div>
      <ShowreelSection
        items={sectors}
        eyebrow="[ 05 ] Sector Depth"
        heading="Where our experience sits."
        subheading="Cross-disciplinary capability deployed across 6 core commercial and institutional sectors without generic agency templates."
        theme="light"
      />
    </div>
  );
}
