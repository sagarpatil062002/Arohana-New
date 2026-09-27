export interface ServicePillarContent {
  id: string;
  num: string;
  category: string;
  title: string;
  tagline: string;
  desc: string;
  image: string;
  overlapImage?: string;
  deliverables: string[];
  noteLabel: string;
  note: string;
}

export const SERVICES_HERO = {
  eyebrow: 'Practice Areas & Capabilities',
  principle: 'What we do depends on what the business actually needs.',
  headlineLineOne: 'Three ways',
  headlineLineTwo: 'we work.',
  intro:
    'Ārohana can come in as an ongoing digital partner, a hospitality consultant, a content/production partner or a combination of these.',
};

export const SERVICES_PILLARS: ServicePillarContent[] = [
  {
    id: 'digital',
    num: '01',
    category: 'Digital Brand Growth',
    title: 'Digital Brand Growth',
    tagline:
      'Brand strategy, content, social media, creative direction, video production, advertising and websites for businesses that need a stronger market presence.',
    desc: 'For businesses that need a stronger brand presence, better communication and consistent execution — not just a schedule of posts.',
    image: '/images/services/digital-growth.jpg',
    deliverables: [
      'Brand strategy and positioning',
      'Strategic communication',
      'Content strategy and monthly calendars',
      'Social media management',
      'Creative direction',
      'Copywriting and scripting',
      'Graphic design',
      'Photography and videography',
      'Video production and editing',
      'Campaign development',
      'Meta advertising',
      'Google advertising',
      'SEO',
      'Website strategy/design',
      'Lead generation',
    ],
    noteLabel: 'Note',
    note: 'Performance marketing, SEO, websites and lead generation are capabilities, not implied to be included in every social-media retainer.',
  },
  {
    id: 'hospitality',
    num: '02',
    category: 'Hospitality Consulting',
    title: 'Hospitality Consulting',
    tagline:
      'Menu creation, operational systems, staff training, revenue optimisation and digital marketing — built from actual hospitality experience.',
    desc: 'This is where Ārohana is different from a conventional marketing agency. Hospitality consulting comes from actual industry experience as well as consulting work.',
    image: '/images/services/hospitality-consulting.jpg',
    deliverables: [
      'Restaurant / café concept development',
      'Menu creation and menu engineering',
      'Recipe and product development',
      'Pricing and food-cost control',
      'Kitchen and operational systems',
      'SOPs',
      'Staff training',
      'Service systems',
      'Revenue optimisation',
      'Social-media and digital marketing',
      'Zomato / Swiggy management where required',
      'OTA consulting and digital distribution',
      'Operational setup and handover',
    ],
    noteLabel: 'Relevant Experience',
    note: 'Misu, Spice Goa, Khana Khazana, Khau Gali, Resort Blu and Holiday Village, among other hospitality projects.',
  },
  {
    id: 'content',
    num: '03',
    category: 'Content & Brand Production',
    title: 'Content & Brand Production',
    tagline:
      'Corporate films, documentaries, campaigns and institutional content — from scripting through post-production.',
    desc: 'When the story needs to be bigger than a post, Ārohana can take the idea through scripting, production and post-production.',
    image: '/images/services/content-production.jpg',
    overlapImage: '/images/tourin/tourin-2.jpg',
    deliverables: [
      'Corporate films',
      'Brand films',
      'Documentaries',
      'Institutional films',
      'Campaign films',
      'Promotional films and reels',
      'Scripting',
      'Voice-over',
      'Shoot direction',
      'Editing',
      'Sound and post-production',
    ],
    noteLabel: 'Proof',
    note: 'SHE documentary/content, Western Command Investiture Ceremony, Indian Army project videos, PictureTime festival/on-ground content, Raysons industrial/casting film.',
  },
];

export interface EngagementModelContent {
  num: string;
  title: string;
  bestFor: string;
  description: string;
}

export const ENGAGEMENT_MODELS: EngagementModelContent[] = [
  {
    num: '01',
    title: 'Strategic Retainers',
    bestFor: '',
    description: '',
  },
  {
    num: '02',
    title: 'Project Collaborations',
    bestFor: '',
    description: '',
  },
  {
    num: '03',
    title: 'Specialised Production Briefs',
    bestFor: '',
    description: '',
  },
];

export const TEAM_STRUCTURE_CONTENT = {
  eyebrow: 'Team Structure',
  title: 'A note on team structure.',
  content:
    'Ārohana does not need to sell a fixed team chart on the website. The client should understand that the right specialists are assembled around the brief — strategy, design, editing, photography, videography, performance or hospitality specialists as required.',
  tagline: 'CURATED AROUND THE CHALLENGE • BESPOKE TEAMS',
};

export const SERVICES_CTA_CONTENT = {
  eyebrow: "Let's build",
  headlineLineOne: "Don't start with a service.",
  headlineLineTwo: 'Start with a problem.',
  sub: 'Tell us what you are trying to build, fix or change.',
  cta: 'Start a conversation',
};