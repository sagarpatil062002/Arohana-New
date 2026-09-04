'use client';

import React from 'react';
import ShowreelSection, { ShowreelItem } from '@/components/motion/ShowreelSection';

export default function SectorMontage() {
  const sectors: ShowreelItem[] = [
    {
      id: 'hospitality',
      title: 'Hospitality & Experiential F&B',
      subtitle: 'Concept, Menu Architecture & Repeat Guest Behaviour',
      description:
        'Hands-on advisory across the full lifecycle of experiential dining, boutique resorts, and beverage concepts. We work on menu margins, guest retention, and operational unit economics.',
      image: '/images/case-studies/misu/bar-1.jpg',
      badge: 'HOSPITALITY & F&B',
    },
    {
      id: 'real-estate',
      title: 'Real Estate & Built Environment',
      subtitle: 'Industrial Foundries, Modular Architecture & Luxury Outdoor',
      description:
        'Translating complex technical capabilities and high-end living spaces into cohesive commercial brands across foundries, luxury composite decking, and modular architecture.',
      image: '/images/case-studies/loom/prefab-1.jpg',
      badge: 'BUILT ENVIRONMENT',
    },
    {
      id: 'healthcare',
      title: 'Healthcare & Clinical Dermatology',
      subtitle: 'Evidence-Led Education & Patient Trust',
      description:
        'Elevating patient trust and clinical authority through evidence-based dermatological education rather than superficial cosmetic promises.',
      image: '/images/case-studies/rrskins/education-1.jpg',
      badge: 'CLINICAL HEALTHCARE',
    },
    {
      id: 'defence',
      title: 'High-Altitude & Defence Operations',
      subtitle: 'Western Command & Remote Community Initiatives',
      description:
        'Deploying communication, documentation, and operational initiatives across complex environments — including Ladakh communities and the Indian Army.',
      image: '/images/home/strip-she.jpg',
      badge: 'DEFENCE & FIELD PROJECTS',
    },
  ];

  return (
    <ShowreelSection
      items={sectors}
      eyebrow="WHERE OUR EXPERIENCE SITS"
      heading="Sector understanding that shapes practical, commercially grounded execution."
      theme="light"
    />
  );
}
