export interface ArmyProjectVisual {
  src: string;
  caption: string;
  alt: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square' | 'wide';
}

export interface ArmyTimelineProject {
  id: string;
  indexNumber: string;
  timelineLabel: string;
  organization: string;
  title: string;
  subtitle?: string;
  description: string;
  tags: string[];
  metadata: {
    location: string;
    environment: string;
    productionType: string;
    dateOrPeriod: string;
    services: string;
  };
  expandableSections?: {
    scope?: string;
    creativeApproach?: string;
    productionNotes?: string;
  };
  visuals?: ArmyProjectVisual[];
  ctaLink?: {
    label: string;
    href: string;
  };
  isTextOnly?: boolean;
  disclosureNotice?: string;
  factualNote?: string;
}

export const ARMY_HERO_DATA = {
  sectionPill: '01 / SPECIAL PROJECTS',
  eyebrow: 'SELECTED INDIAN ARMY PROJECTS',
  brandContext: 'Ārohana Consultancy',
  heading: 'Selected Indian Army Projects',
  supportingStatement:
    'Communication, storytelling, design and production across different Army environments.',
  backgroundImage: '/images/army/army-hero.jpg',
  heroVisual: {
    src: '/images/army/army-hero.jpg',
    alt: 'Selected Indian Army project documentation by Ārohana',
    caption: 'On-ground production and communication assignments across high-altitude and ceremonial military environments.',
  },
};

export const ARMY_TIMELINE_PROJECTS: ArmyTimelineProject[] = [
  // 01: WESTERN COMMAND
  {
    id: 'western-command',
    indexNumber: '01',
    timelineLabel: 'WESTERN COMMAND',
    organization: 'WESTERN COMMAND',
    title: 'Investiture Ceremony',
    subtitle: 'Ceremonial protocol shoot and documentary post-production',
    description:
      'Ārohana handled the shoot and post-production for the Western Command Investiture Ceremony in February 2026.',
    tags: ['Shoot', 'Production', 'Post-production'],
    metadata: {
      location: 'HQ Western Command Theatre',
      environment: 'Protocol & Ceremonial Formation',
      productionType: 'Multi-Camera Filming & Sound Master',
      dateOrPeriod: 'February 2026',
      services: 'Filming · Editing · Color Grading · Audio Choreography',
    },
    expandableSections: {
      scope: 'Coverage of formal investiture protocols, honors and awards distribution, and parade sequences.',
      creativeApproach: 'Restrained, dignified visual pacing tailored to military protocol and ceremonial integrity.',
      productionNotes: 'Tight turnaround master post-production with multi-track sound engineering and high-definition mastering.',
    },
    visuals: [
      {
        src: '/images/army/western-command-1.jpg',
        alt: 'Western Command Investiture Ceremony honors and awards presentation',
        caption: 'Honors and awards presentation documentation at Western Command Investiture Ceremony.',
      },
      {
        src: '/images/army/western-command-2.jpg',
        alt: 'Western Command ceremonial film post-production editing',
        caption: 'Post-production editing and ceremonial sound choreography for official documentary film.',
      },
    ],
  },

  // 02: 14 CORPS HEADQUARTERS
  {
    id: '14-corps',
    indexNumber: '02',
    timelineLabel: '14 CORPS HQ',
    organization: '14 CORPS HEADQUARTERS',
    title: 'Communication & Production',
    subtitle: 'High-altitude visual communication, films and archival design',
    description:
      'Ārohana has undertaken communication, design and video-production work for 14 Corps Headquarters, including visual communication and films developed through scripting, voice-over, editing and sound.',
    tags: ['Visual Communication', 'Video Production', 'Scripting & Sound'],
    metadata: {
      location: 'Leh & Indus Valley, Ladakh',
      environment: 'High-Altitude Operational Theatre (11,500+ ft)',
      productionType: 'Communication Design & Video Production',
      dateOrPeriod: '2023 – Present',
      services: 'Scripting · Voice-Over · Production · Graphic Design',
    },
    expandableSections: {
      scope: 'Institutional communication campaigns, internal and public-facing visual communication, and video production.',
      creativeApproach: 'Authentic high-altitude cinematography paired with authoritative scripting and professional narration.',
      productionNotes: 'Field filming in sub-zero and remote mountain environments requiring specialized equipment and acclimatized crews.',
    },
    visuals: [
      {
        src: '/images/army/14corps-1.jpg',
        alt: '14 Corps Headquarters visual communication and graphic design',
        caption: 'Designed asset: Institutional storytelling and visual communication design.',
      },
      {
        src: '/images/army/14corps-2.jpg',
        alt: '14 Corps high-altitude filming and narration',
        caption: 'Video still: High-altitude filming, professional narration, and master audio-visual editing in Ladakh.',
      },
    ],
  },

  // 03: FIRE & FURY CORPS
  {
    id: 'fire-and-fury',
    indexNumber: '03',
    timelineLabel: 'FIRE & FURY',
    organization: 'FIRE & FURY CORPS',
    title: 'Corps-Level Communication & Publications',
    subtitle: 'XIV Corps communication, publications and community initiatives',
    description:
      'Fire & Fury Corps is the designation associated with XIV Corps. Ārohana has undertaken project work associated with Fire & Fury across communication, publications, video and community-facing initiatives.',
    tags: ['Communication', 'Publications', 'Community Initiatives', 'Video'],
    metadata: {
      location: 'Ladakh Theatre',
      environment: 'Strategic High-Altitude Corps Area',
      productionType: 'Integrated Communication & Publication Design',
      dateOrPeriod: 'Multi-Year Engagements',
      services: 'Editorial Design · Video · Social Media · Strategy',
    },
    expandableSections: {
      scope: 'Spans historical commemorative literature, community welfare communication, and social video production.',
      creativeApproach: 'Balancing historical gravitas with contemporary digital readability across diverse audiences.',
      productionNotes: 'Seamless integration between on-ground research, military history curation, and modern typography.',
    },
    visuals: [
      {
        src: '/images/army/fire-fury-1.jpg',
        alt: 'Fire & Fury Corps communication and publication design',
        caption: 'Integrated communication and publication design for Fire & Fury Corps assignments.',
      },
      {
        src: '/images/army/14corps-1.jpg',
        alt: 'Fire & Fury archival and communication layouts',
        caption: 'Archival design, visual identity, and strategic storytelling.',
      },
    ],
  },

  // 04: REZANG LA WAR MEMORIAL
  {
    id: 'rezang-la',
    indexNumber: '04',
    timelineLabel: 'REZANG LA',
    organization: 'FIRE & FURY CORPS',
    title: 'Rezang La War Memorial',
    subtitle: 'Commemorative coffee-table book design and visual communication',
    description:
      'Coffee-table book design and visual communication for the Rezang La War Memorial.',
    tags: ['Publication Design', 'Coffee-Table Book', 'Visual Communication'],
    metadata: {
      location: 'Chushul Sector, Ladakh (16,000+ ft)',
      environment: 'Historic High-Altitude Battlefield & Memorial',
      productionType: 'Hardbound Archival Publication',
      dateOrPeriod: 'Commemorative Edition',
      services: 'Book Architecture · Visual Layout · Print Production',
    },
    expandableSections: {
      scope: 'Complete publication design including hardbound cover architecture, typographic systems, and archival photo restoration.',
      creativeApproach: 'Subtle, dignified layout allowing historical accounts and veteran testimonies to stand out with gravitas.',
      productionNotes: 'High-specification tactile print finishing, custom clothbound styling, and museum-grade archival reproduction.',
    },
    visuals: [
      {
        src: '/images/army/rezang-la-1.jpg',
        alt: 'Rezang La War Memorial commemorative book cover design',
        caption: 'Cover: Hardbound commemorative publication for Rezang La War Memorial.',
      },
      {
        src: '/images/army/rezang-la-2.jpg',
        alt: 'Rezang La commemorative volume interior spread and archival curation',
        caption: 'Interior spread: Archival curation, historical records, and battlefield chronicle layout.',
      },
    ],
  },

  // 05: 69 ARMOURED REGIMENT
  {
    id: '69-armoured',
    indexNumber: '05',
    timelineLabel: '69 ARMOURED',
    organization: 'FIRE & FURY CORPS',
    title: '69 Armoured Regiment',
    subtitle: 'Regimental history publication and visual communication',
    description:
      'Coffee-table book design and visual communication for 69 Armoured Regiment.',
    tags: ['Publication Design', 'Regimental History', 'Visual Communication'],
    metadata: {
      location: 'High-Altitude Deployment Zone, Ladakh',
      environment: 'Highest Armored Deployment in the World',
      productionType: 'Regimental Coffee-Table Volume',
      dateOrPeriod: 'Regimental Edition',
      services: 'Editorial Layout · Photo Curation · Archival Narrative',
    },
    expandableSections: {
      scope: 'Documentation of regimental history, armored operations in extreme altitude, and unit heritage.',
      creativeApproach: 'Strong typographic grids reflecting mechanized power and tactical discipline.',
      productionNotes: 'Extensive curation of unit photography, technical armor schematics, and ceremonial spreads.',
    },
    visuals: [
      {
        src: '/images/army/69armoured-1.jpg',
        alt: '69 Armoured Regiment commemorative volume cover',
        caption: 'Cover: Heritage coffee-table volume for 69 Armoured Regiment.',
      },
      {
        src: '/images/army/69armoured-2.jpg',
        alt: '69 Armoured Regiment interior spread and regimental heritage',
        caption: 'Selected spread: Regimental heritage, chronicles, and armored vehicle photography.',
      },
    ],
  },

  // 06: SHE — SUSTAINABLE HEALTH EMPOWERMENT
  {
    id: 'she-sadbhavana',
    indexNumber: '06',
    timelineLabel: 'SHE',
    organization: 'OPERATION SADBHAVANA · FIRE & FURY',
    title: 'SHE — Sustainable Health Empowerment',
    subtitle: 'Health and hygiene initiative across 8 remote Ladakh villages',
    description:
      'A health and hygiene initiative developed in alignment with the objectives of Operation Sadbhavana and implemented across eight remote villages. Ārohana developed the initiative’s name and identity and worked across its communication and documentary content.',
    tags: ['Operation Sadbhavana', 'Brand Identity', 'Documentary Film'],
    metadata: {
      location: '8 Remote Border Villages, Ladakh',
      environment: 'Remote Mountain Communities',
      productionType: 'Field Facilitation & Documentary Video',
      dateOrPeriod: 'Multi-Phase Implementation',
      services: 'Naming · Brand Identity · Workshop Design · Film',
    },
    expandableSections: {
      scope: 'Development of the SHE brand identity, workshop training material, hygiene kits, and on-ground community documentation.',
      creativeApproach: 'Culturally attuned, empathetic visual language that resonated directly with local Ladakhi women and community leaders.',
      productionNotes: 'Documentary crew traveled across 8 remote villages conducting interviews, workshops, and impact filming.',
    },
    ctaLink: {
      label: 'View the SHE case study →',
      href: '/work/she',
    },
    visuals: [
      {
        src: '/images/case-studies/she/she-hero.jpg',
        alt: 'SHE community workshops with Ladakhi women across remote border villages',
        caption: 'On-ground workshops and health education facilitation in remote Ladakh villages.',
      },
      {
        src: '/images/case-studies/she/field-1.jpg',
        alt: 'SHE field team facilitating health education in Ladakh village',
        caption: 'Field engagement and community interaction in high-altitude border settlements.',
      },
    ],
  },

  // 07: OPERATION SAMPARK
  {
    id: 'operation-sampark',
    indexNumber: '07',
    timelineLabel: 'OP SAMPARK',
    organization: 'FIRE & FURY CORPS',
    title: 'Operation Sampark',
    subtitle: 'Border community hospitality training & social video production',
    description:
      'Ārohana worked with homestay owners in border communities on practical hospitality, hygiene and guest relations. The engagement also included training material and a supporting video produced for Fire & Fury’s social media.',
    tags: ['Hospitality Training', 'Border Communities', 'Social Video'],
    metadata: {
      location: 'Border Villages & Line of Control / LAC Sectors',
      environment: 'Rural Himalayan Homestays',
      productionType: 'Workshop Curriculum & Social Content',
      dateOrPeriod: 'Community Initiative',
      services: 'Hospitality Modules · Training · Social Media Video',
    },
    expandableSections: {
      scope: 'Practical curriculum on guest reception, hygiene standards, dining setup, and sustainable village tourism.',
      creativeApproach: 'Actionable visual guides with simple diagrams and engaging video modules for local hosts.',
      productionNotes: 'On-location filming capturing genuine homestay hosts, daily routines, and culinary hospitality.',
    },
    visuals: [
      {
        src: '/images/army/sampark-1.jpg',
        alt: 'Operation Sampark on-ground hospitality workshop in border community',
        caption: 'On-ground training: Practical hospitality and guest relations workshop with border homestay hosts.',
      },
      {
        src: '/images/work/sampark-thumb.jpg',
        alt: 'Operation Sampark hospitality video production still',
        caption: 'Video still: Social media video production supporting border tourism training.',
      },
    ],
  },

  // 08: VIBRANT VILLAGES PROGRAMME & BORDER TOURISM
  {
    id: 'vibrant-villages',
    indexNumber: '08',
    timelineLabel: 'VIBRANT VILLAGES',
    organization: 'GOVERNMENT OF INDIA INITIATIVE',
    title: 'Vibrant Villages Programme & Border Tourism',
    subtitle: 'Storytelling, video production and border tourism documentation',
    description:
      'Ārohana contributed communication and video work connected with the Vibrant Villages Programme and border-tourism initiatives in Ladakh, including scripting, voice-over and production.',
    tags: ['Government of India Initiative', 'Border Tourism', 'Video Production'],
    metadata: {
      location: 'Designated Border Villages, Eastern Ladakh',
      environment: 'Border Settlement & Tourism Hubs',
      productionType: 'Cinematic Storytelling & Production',
      dateOrPeriod: 'Strategic Initiative',
      services: 'Scripting · Cinematography · Voice-Over · Editing',
    },
    factualNote:
      'The Vibrant Villages Programme is a Government of India programme. Ārohana contributed communication and video storytelling connected with these initiatives.',
    expandableSections: {
      scope: 'Documenting village cultural heritage, eco-tourism potential, and sustainable community development.',
      creativeApproach: 'Narratives highlighting the resilience and rich cultural tapestry of high-altitude border residents.',
      productionNotes: 'High-definition cinematography across remote settlements, nomad pastures, and pristine landscape corridors.',
    },
    visuals: [
      {
        src: '/images/army/vibrant-villages-1.jpg',
        alt: 'Vibrant Villages Programme border tourism storytelling in Ladakh',
        caption: 'Border tourism storytelling: Showcasing village community life, cultural landscapes, and sustainable local enterprise.',
      },
      {
        src: '/images/tourin/tourin-hero.jpg',
        alt: 'Pristine border landscapes in Ladakh',
        caption: 'High-altitude landscape and border valley documentation in Ladakh.',
      },
    ],
  },

  // 09: 12 RASHTRIYA RIFLES / DELTA FORCE
  {
    id: '12-rr-delta-force',
    indexNumber: '09',
    timelineLabel: '12 RR / DELTA FORCE',
    organization: '12 RASHTRIYA RIFLES / DELTA FORCE',
    title: 'Selected Project Work',
    subtitle: 'Confidential assignment under military protocol',
    description:
      'Ārohana has also undertaken project work associated with 12 Rashtriya Rifles under Delta Force.',
    tags: ['Institutional Engagement', 'Confidential Assignment'],
    metadata: {
      location: 'Classified Operational Sector',
      environment: 'Operational Formation',
      productionType: 'Classified Documentation',
      dateOrPeriod: 'Clearance Restricted',
      services: 'Institutional Engagement',
    },
    isTextOnly: true,
    disclosureNotice:
      'No project details are to be published. Under information clearance protocols, this assignment is recorded solely by organisational reference.',
  },
];

export const FIELD_NOTES_PILLARS = [
  {
    number: '01',
    title: 'REMOTE CONDITIONS',
    subtitle: 'Sub-zero temperatures & extreme elevations',
    description:
      'Executing multi-day shoots and on-ground workshops at altitudes up to 16,000+ ft requires specialized acclimatization, ruggedized equipment workflows, and complete self-sufficiency in remote Himalayan terrain.',
  },
  {
    number: '02',
    title: 'HIGH-ALTITUDE PRODUCTION',
    subtitle: 'Precision filming, audio & post-production',
    description:
      'From ceremonial investiture protocols to narrative documentaries, productions are built with cinematic composition, high-fidelity sound capture, bilingual narration, and tight turnaround mastering.',
  },
  {
    number: '03',
    title: 'INSTITUTIONAL DOCUMENTATION',
    subtitle: 'Archival integrity & publication design',
    description:
      'Designing hardbound coffee-table books and regimental volumes that balance historical gravitas, archival photograph curation, and contemporary typographic standards for institutional posterity.',
  },
  {
    number: '04',
    title: 'COMMUNITY FACILITATION',
    subtitle: 'Field-based execution & empowerment',
    description:
      'Bridging institutional objectives with village communities through practical hospitality workshops, health education programmes, and authentic storytelling that respects local culture.',
  },
];

export const FIELD_PHOTO_ESSAY_GALLERY = [
  {
    id: 'photo-1',
    src: '/images/army/army-hero.jpg',
    title: 'Field Execution in Ladakh',
    caption: 'High-altitude production and field documentation across extreme Himalayan terrain.',
    aspect: 'wide',
  },
  {
    id: 'photo-2',
    src: '/images/army/western-command-1.jpg',
    title: 'Western Command Investiture',
    caption: 'Honors and ceremonial awards documentation for Western Command.',
    aspect: 'standard',
  },
  {
    id: 'photo-3',
    src: '/images/army/rezang-la-1.jpg',
    title: 'Rezang La War Memorial Volume',
    caption: 'Hardbound publication architecture honoring the heroes of Rezang La.',
    aspect: 'tall',
  },
  {
    id: 'photo-4',
    src: '/images/army/14corps-2.jpg',
    title: '14 Corps High-Altitude Filming',
    caption: 'Cinematography and voice-over narrative production for 14 Corps Headquarters.',
    aspect: 'standard',
  },
  {
    id: 'photo-5',
    src: '/images/army/sampark-1.jpg',
    title: 'Operation Sampark Workshops',
    caption: 'Practical hospitality and hygiene facilitation with border homestay hosts.',
    aspect: 'standard',
  },
  {
    id: 'photo-6',
    src: '/images/army/69armoured-1.jpg',
    title: '69 Armoured Regiment Heritage',
    caption: 'Commemorative regimental publication showcasing armored operations.',
    aspect: 'wide',
  },
];

export const ARMY_PAGE_PROOF_METRICS = [
  { value: '09', label: 'Field Engagements', detail: 'Across Command & Corps Theatres' },
  { value: '16,000+', label: 'Peak Elevation (ft)', detail: 'Extreme High-Altitude Operational Zones' },
  { value: '08', label: 'Border Villages', detail: 'Community Health & Hospitality Work' },
  { value: '100%', label: 'Protocol Compliance', detail: 'Security & Information Clearance Adherence' },
];

export const ARMY_PAGE_CLOSING_DATA = {
  sectionPill: '05 / ĀROHANA STANDARD',
  primary: 'Different environments. Different audiences. Different briefs.',
  secondary: 'The work changes with the context. The standard of thinking and execution does not.',
  ctaText: 'Start a Conversation',
  ctaHref: '/contact',
};
