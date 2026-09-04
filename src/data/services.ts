import { ServicePillar, EngagementModel, RetainerComparisonRow } from '@/types';

export const SERVICE_PILLARS: ServicePillar[] = [
  {
    number: '01',
    title: 'Digital Brand Growth',
    subtitle: 'Brand strategy, strategic communication, social media, creative direction & platform execution.',
    description:
      'For businesses that need a stronger brand presence, better communication and consistent execution — not just a schedule of posts.',
    capabilities: [
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
    proofReferences: [
      'Raysons Group — Multi-business communication & positioning',
      'Loom Crafts — Dual-journey luxury retail & prefab architecture growth',
      'PictureTime — Cinema promotion to broader brand storytelling',
      'RR Skins — Healthcare communication built around trust and education',
    ],
    image: '/images/services/digital-growth.jpg',
    capabilityNotice:
      'Important distinction: Performance marketing, SEO, websites and lead generation are specialized capabilities scoped around business objectives, rather than implied to be bundled into every social-media retainer.',
  },
  {
    number: '02',
    title: 'Hospitality Consulting',
    subtitle: 'Restaurant concept, menu development, food cost, pricing, SOPs, staffing, kitchen control & marketing.',
    description:
      'This is where Ārohana is different from a conventional marketing agency. Hospitality consulting comes from actual industry experience as well as consulting work.',
    capabilities: [
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
    proofReferences: [
      'Misu — Pan-Asian dining operations, menu margin engineering & visual direction',
      'Spice Goa — Culinary legacy positioning & kitchen workflow refinement',
      'Khana Khazana — Kitchen pass SOPs, portion control & local dining marketing',
      'Khau Gali — Street food concept standardization & kitchen pass controls',
      'Resort Blu — Resort F&B revenue & guest experience systems',
      'Holiday Village — Dining operations, service training & OTA distribution',
    ],
    image: '/images/services/hospitality-consulting.jpg',
    capabilityNotice:
      'Relevant experience includes Misu, Spice Goa, Khana Khazana, Khau Gali, Resort Blu and Holiday Village, among other hospitality projects.',
  },
  {
    number: '03',
    title: 'Content & Brand Production',
    subtitle: 'Corporate films, documentaries, institutional videos, campaign films, scripting, shoots & post-production.',
    description:
      'When the story needs to be bigger than a post, Ārohana can take the idea through scripting, production and post-production.',
    capabilities: [
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
    proofReferences: [
      'PictureTime — Festival & high-altitude on-ground documentation',
      'Raysons Group — Industrial casting facility documentary film',
    ],
    image: '/images/services/content-production.jpg',
    capabilityNotice:
      'Proof: SHE documentary/content, PictureTime festival/on-ground content, Raysons industrial/casting film, high-altitude field productions.',
  },
];

export const ENGAGEMENT_MODELS = [
  {
    model: 'Ongoing digital partnership',
    bestFor: 'Brands needing continuous strategy, content, creative and platform management',
    description:
      'Continuous brand growth where Ārohana leads marketing strategy, monthly narrative calendars, creative direction, photo/video production, and multi-channel campaign management.',
  },
  {
    model: 'Hospitality consulting',
    bestFor: 'Restaurants, cafés, resorts and hospitality businesses needing operational or commercial intervention',
    description:
      'Targeted operational and culinary consulting addressing concept, menu engineering, kitchen SOPs, food costing, staff training, and pre-launch setup.',
  },
  {
    model: 'Project production',
    bestFor: 'Films, documentaries, launches, campaigns, exhibitions or other defined projects',
    description:
      'Defined milestone-driven production covering end-to-end scripting, on-ground shoot direction, and post-production for corporate, institutional, or brand films.',
  },
  {
    model: 'Hybrid engagement',
    bestFor: 'Businesses where business consulting and digital communication need to move together',
    description:
      'Holistic engagement where operational restructuring and commercial repositioning are deployed simultaneously with ongoing brand communication and growth.',
  },
];

export const TEAM_STRUCTURE_NOTE = {
  title: 'A note on team structure',
  content:
    'Ārohana does not need to sell a fixed team chart on the website. The client should understand that the right specialists are assembled around the brief — strategy, design, editing, photography, videography, performance or hospitality specialists as required.',
};

