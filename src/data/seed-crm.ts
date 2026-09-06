import {
  CrmInquiry,
  HeroContent,
  HeroSlide,
  PovContent,
  OfferingsContent,
  ProofContent,
  DefenceContent,
  TourinContent,
  FinalCtaContent,
} from '@/types/crm';

export const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-01',
    slideOrder: 1,
    backgroundImageUrl: '/images/home/hero-dusk-mountain.png',
    textColorTheme: 'light',
    preTitle: 'BRANDS · EXPERIENCES · IMPACT',
    title: 'We build brands,\nbusinesses &\nexperiences.',
    subtitle: 'Ārohana brings together business thinking, creative communication, and disciplined execution.',
    isActive: true,
  },
  {
    id: 'slide-02',
    slideOrder: 2,
    backgroundImageUrl: '/images/home/hero-daylight-cloud.png',
    textColorTheme: 'dark',
    preTitle: '',
    title: 'Ideas\ninto\nImpact.',
    subtitle: 'We create visual stories, experiences and brands that connect people, places and possibilities.',
    isActive: true,
  },
];

export const DEFAULT_HERO_CONTENT: HeroContent = {
  tagline: 'Next-Gen Creative Consultancy',
  estBadge: '+ est. YR2020',
  systemBadge: '+ system: ĀROHANA',
  headline: 'We build brands, businesses & experiences.',
  description:
    'Ārohana brings together business thinking, creative communication, and disciplined execution — from digital brand growth and content systems to hospitality consulting and complex on-ground projects.',
  videoSrc: '/videos/hero-montage.mp4',
  poster: '/images/home/hero-poster.jpg',
  primaryCtaText: 'Start a Conversation',
  primaryCtaLink: '/contact',
  secondaryCtaText: 'View Selected Work',
  secondaryCtaLink: '/work',
  tag1: 'Define · Design · Deploy',
  tag2: 'Hospitality · Industry · Defence · Travel',
  tag3: 'Goa · Kolhapur · Delhi · Ladakh',
  footageContext: 'Montage: Ladakh, foundries, dining & publications.',
};

export const DEFAULT_POV_CONTENT: PovContent = {
  sectionNumber: '01',
  tag: 'Our Point of View',
  quote: '“Some businesses need better marketing. Others need a better way of thinking about the business itself.”',
  paragraph1:
    'Most creative agencies start and end with campaigns, posts, and aesthetic treatments. But when a restaurant is bleeding margins, an industrial group has confusing vertical messaging, or a high-altitude initiative requires sensitive local adoption, marketing templates fall apart.',
  paragraph2:
    'Ārohana works at the intersection where commercial reality and creative execution meet. We combine business-side hospitality experience, sector-specific insight, and disciplined on-ground production to solve root challenges — making businesses clearer, more credible, and commercially resilient.',
  ctaText: 'Read Founder Story & Philosophy',
  ctaLink: '/about',
  founderBadge: 'Madhura Hawal · Founder',
  founderCaption: 'On-ground direction and operational execution across remote Himalayan and commercial environments.',
  founderImage: '/images/home/madhura-editorial.jpg',
};

export const DEFAULT_OFFERINGS_CONTENT: OfferingsContent = {
  sectionNumber: '02',
  tag: 'Core Offerings',
  title: 'Three ways we work with businesses.',
  subtitle:
    'Tailored specialist capability structured around the actual commercial requirement — from continuous brand growth to operational consulting and standalone film production.',
  ctaText: 'Explore All 6 Pillars',
  ctaLink: '/services',
};

export const DEFAULT_PROOF_CONTENT: ProofContent = {
  sectionNumber: '03',
  tag: 'Selected Proof',
  title: 'The work is the proof.',
  subtitle:
    'Six primary case studies demonstrating how we solve root business, communication, and operational challenges across sectors.',
  ctaText: 'View All Case Studies',
  ctaLink: '/work',
};

export const DEFAULT_DEFENCE_CONTENT: DefenceContent = {
  sectionNumber: '05',
  tag: 'Defence & Community',
  title: 'Work that doesn’t fit a standard agency box.',
  description:
    'From ceremonial investiture video shoots for Western Command and 14 Corps institutional films, to commemorative books for the battle of Rezang La and rural women’s hygiene outreach across remote Himalayan settlements — Ārohana works in rigorous, high-stakes environments where generic marketing templates cannot survive.',
  ctaText: 'Explore Indian Army Projects',
  ctaLink: '/army-projects',
  contextPill: 'Western Command · 14 Corps · Fire & Fury',
};

export const DEFAULT_TOURIN_CONTENT: TourinContent = {
  sectionNumber: '06',
  tag: 'Owned Brand Venture',
  title: 'Journeys into the high-altitude landscape of Ladakh.',
  description:
    'Tourin is an experiential travel venture conceived, branded, and run by Ārohana — taking conscious travelers into remote Himalayan valleys with deep cultural immersion.',
  differenceTitle: 'The Tourin Difference',
  differenceText:
    'Authentic high-altitude expeditions designed with community custodians, zero generic commercial tourist routes, and mindful ecological footprint.',
  cta1Text: 'Explore Tourin Journeys',
  cta1Link: '/tourin',
  cta2Text: 'Plan a Ladakh Journey',
  cta2Link: '/contact',
};

export const DEFAULT_FINAL_CTA_CONTENT: FinalCtaContent = {
  tag: 'Let’s Start With Context',
  title: 'Have a brand, hospitality or production challenge?',
  description: 'Let’s start with what you’re trying to solve or build, not a cookie-cutter agency proposal.',
  primaryCtaText: 'Start a Conversation',
  primaryCtaLink: '/contact',
  phone: '+918380092241',
  displayPhone: '+91 83800 92241',
  email: 'founder@byarohana.com',
  badge1: 'Direct Founder Access',
  badge2: 'No Generic Jargon',
  badge3: 'Proof Over Claims',
};

export const DEFAULT_INQUIRIES: CrmInquiry[] = [
  {
    id: 'inq-1001',
    name: 'Vikramaditya Shinde',
    email: 'vikram@shindegroup.in',
    phone: '+91 98220 11445',
    company: 'Shinde Hospitality & Estates',
    service: 'Hospitality Operations & Consulting',
    message:
      'We are opening a 45-key heritage boutique resort in North Goa (Assagao) and require full pre-opening F&B concept design, operational SOPs, and culinary branding.',
    status: 'new',
    createdAt: '2026-08-22T14:32:00.000Z',
    notes: 'Urgent inquiry. Target opening Q4 2026. Founder scheduled preliminary discovery call.',
  },
  {
    id: 'inq-1002',
    name: 'Col. Ranjit Verma (Retd.)',
    email: 'ranjit.verma@westerncommand-trust.org',
    phone: '+91 94191 88231',
    company: 'Western Command Heritage Cell',
    service: 'Content, Documentary & Film Production',
    message:
      'Looking for documentary production and a hardbound archival publication for our upcoming 50th Corps Raising Day commemorative celebration in Chandimandir.',
    status: 'proposal_sent',
    createdAt: '2026-08-20T09:15:00.000Z',
    notes: 'Draft proposal and portfolio references from Rezang La and Fire & Fury corps submitted.',
  },
  {
    id: 'inq-1003',
    name: 'Ananya Deshmukh',
    email: 'ananya@gatellc.com',
    phone: '+91 98812 44320',
    company: 'Kirloskar-Ferrous Ancillary Group',
    service: 'Brand Architecture & GTM Strategy',
    message:
      'Our manufacturing group operates 4 disparate foundry and precision casting units. We need a unified parent brand hierarchy and modern international web presence.',
    status: 'contacted',
    createdAt: '2026-08-18T16:45:00.000Z',
    notes: 'Had initial 30-min call with Madhura. Preparing detailed scope audit of the 4 subsidiaries.',
  },
  {
    id: 'inq-1004',
    name: 'Tsering Dorjey',
    email: 'dorjey@ladakhdestinations.com',
    phone: '+91 94199 77810',
    company: 'Changthang High Altitude Expeditions',
    service: 'Tourin Experiential Travel Journey',
    message:
      'Interested in partnering with Ārohana/Tourin for an exclusive winter wildlife and high-altitude photography residency across Hanle and Nubra Valley.',
    status: 'closed',
    createdAt: '2026-08-15T11:20:00.000Z',
    notes: 'Partnership agreement finalized. 2026-27 expedition calendar drafted.',
  },
];
