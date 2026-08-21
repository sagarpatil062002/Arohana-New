/* =========================================================================
   Site content — structured data, kept separate from presentation.
   Swap these arrays/maps for a CMS later without touching components.

   ┌──────────────────────────────────────────────────────────────────────┐
   │  DEV SAMPLE MEDIA — NOT REAL ĀROHANA WORK                              │
   │  Every `src` below points to /public/samples/* which are temporary,   │
   │  royalty-free development placeholders (photography from Unsplash,    │
   │  hero clip is a CC0 sample). They are used ONLY so the homepage looks  │
   │  complete during development and are NOT client/brand imagery.         │
   │  TO GO LIVE: replace each /public/samples/* file (or its `src`) with   │
   │  the approved real Ārohana asset described in its `label`/`alt`.      │
   └──────────────────────────────────────────────────────────────────────┘
   ========================================================================= */

export type MediaRef = {
  src: string; // path under /public, e.g. "/work/raysons.jpg"
  alt: string;
  label: string; // describes the intended real asset this placeholder stands for
  poster?: string; // poster/fallback image (used by hero video)
};

export type NavItem = { label: string; href: string };

export const site = {
  wordmark: "ĀROHANA",
  nav: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "Tourin", href: "/tourin" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavItem[],
  contact: {
    email: "founder@byarohana.com",
    phone: "+91 8380092241",
    phoneHref: "tel:+918380092241",
  },
};

export const hero = {
  eyebrow: "Consultancy · Creative · Execution",
  headline: "We build brands, businesses & experiences.",
  supporting:
    "Ārohana brings together business thinking, creative communication and execution — from digital brand growth and content to hospitality consulting and complex on-ground projects.",
  primaryCta: { label: "Start a conversation", href: "/contact" },
  secondaryCta: { label: "See our work", href: "/work" },
  // TEMP sample: 8–12s muted montage will replace this CC0 clip + poster.
  media: {
    src: "/samples/hero.mp4",
    poster: "/samples/hero_poster.jpg",
    alt: "A cinematic montage of Ārohana's real work across hospitality, the built environment, healthcare, PictureTime and Ladakh field projects.",
    label:
      "Cinematic hero montage — hospitality, built environment, healthcare, PictureTime, Ladakh / Army field work (8–12s, muted, loop).",
  } satisfies MediaRef,
};

export const pointOfView = {
  eyebrow: "A point of view",
  headline:
    "Some businesses need better marketing. Others need a better way of thinking about the business itself.",
  body: [
    "Ārohana works where those two things meet — combining commercial context, sector understanding and creative execution into work that actually moves a business forward.",
    "We are as comfortable in a founder's first conversation as we are on a shoot, in a kitchen, or on the ground in a place most agencies never visit.",
  ],
  // TEMP sample: founder on-ground editorial still.
  media: {
    src: "/samples/pov.jpg",
    alt: "Madhura working on-ground in Ladakh, directing or supporting a project.",
    label:
      "Editorial image — Madhura on-ground in Ladakh / directing a project (real work).",
  } satisfies MediaRef,
};

export type Service = {
  number: string;
  title: string;
  description: string;
  media: MediaRef;
};

export const services: Service[] = [
  {
    number: "01",
    title: "Digital Brand Growth",
    description:
      "Brand and communication strategy, social ecosystems, content, creative direction, production, performance and platform execution.",
    // TEMP sample: branding / creative work.
    media: {
      src: "/samples/svc-digital.jpg",
      alt: "Digital brand and content work in progress.",
      label: "Real digital / content production still.",
    },
  },
  {
    number: "02",
    title: "Hospitality Consulting",
    description:
      "Restaurant concept, menu development, food cost, pricing, SOPs, staffing, kitchen control, revenue optimisation and marketing.",
    // TEMP sample: restaurant / F&B environment.
    media: {
      src: "/samples/svc-hospitality.jpg",
      alt: "Hospitality consulting — restaurant concept and kitchen control.",
      label: "Real hospitality / F&B environment still.",
    },
  },
  {
    number: "03",
    title: "Content & Brand Production",
    description:
      "Films, documentaries, corporate/institutional videos, campaign content, scripting, shoots and post-production.",
    // TEMP sample: film / production.
    media: {
      src: "/samples/svc-production.jpg",
      alt: "Film and documentary production on location.",
      label: "Real film / production still.",
    },
  },
];

export const serviceDetails: Record<string, { capabilities: string[]; projects: string[] }> = {
  "Digital Brand Growth": {
    capabilities: [
      "Brand strategy and positioning",
      "Strategic communication",
      "Content strategy and monthly calendars",
      "Social media management",
      "Creative direction",
      "Copywriting and scripting",
      "Graphic design",
      "Photography and videography",
      "Video production and editing",
      "Campaign development",
      "Meta advertising",
      "Google advertising",
      "SEO",
      "Website strategy/design",
      "Lead generation",
    ],
    projects: ["Raysons Group", "Loom Crafts", "PictureTime"],
  },
  "Hospitality Consulting": {
    capabilities: [
      "Restaurant / café concept development",
      "Menu creation and menu engineering",
      "Recipe and product development",
      "Pricing and food-cost control",
      "Kitchen and operational systems",
      "SOPs",
      "Staff training",
      "Service systems",
      "Revenue optimisation",
      "Social-media and digital marketing",
      "Zomato / Swiggy management where required",
      "OTA consulting and digital distribution",
      "Operational setup and handover",
    ],
    projects: ["Misu", "Spice Goa", "Khana Khazana", "Khau Gali", "Resort Blu", "Holiday Village"],
  },
  "Content & Brand Production": {
    capabilities: [
      "Corporate films",
      "Brand films",
      "Documentaries",
      "Institutional films",
      "Campaign films",
      "Promotional films and reels",
      "Scripting",
      "Voice-over",
      "Shoot direction",
      "Editing",
      "Sound and post-production",
    ],
    projects: ["SHE documentary", "Western Command Investiture Ceremony", "Indian Army project videos", "PictureTime festival/on-ground content", "Raysons industrial/casting film"],
  },
};

export type WorkItem = {
  name: string;
  description: string;
  tags: string[];
  href: string;
  size: "feature" | "standard";
  media: MediaRef;
};

export const selectedWork: WorkItem[] = [
  {
    name: "Raysons Group",
    description:
      "One group. Multiple businesses. Different communication needs — shaped into a single, coherent way of speaking.",
    tags: ["Group brand", "Multi-business", "Strategy"],
    href: "/work/raysons-group",
    size: "feature",
    // TEMP sample: built environment / real estate.
    media: {
      src: "/samples/work-raysons.jpg",
      alt: "Raysons Group — built environment and business portfolio.",
      label: "Raysons Group real environment / business still.",
    },
  },
  {
    name: "Loom Crafts",
    description:
      "One brand, two very different buying journeys — communicated without losing a single thread of the story.",
    tags: ["Consumer", "DTC", "Narrative"],
    href: "/work/loom-crafts",
    size: "standard",
    // TEMP sample: furniture / product.
    media: {
      src: "/samples/work-loom.jpg",
      alt: "Loom Crafts product and craft environment.",
      label: "Loom Crafts real product / craft still.",
    },
  },
  {
    name: "PictureTime",
    description:
      "From cinema promotion to a broader brand story — building a narrative bigger than any single release.",
    tags: ["Entertainment", "Brand story", "Media"],
    href: "/work/picturetime",
    size: "standard",
    // TEMP sample: cinema / entertainment.
    media: {
      src: "/samples/work-picturetime.jpg",
      alt: "PictureTime mobile cinema and audience.",
      label: "PictureTime real cinema / audience still.",
    },
  },
  {
    name: "SHE",
    description:
      "A community initiative built around health, dignity and sustainability — communication with responsibility at its centre.",
    tags: ["Community", "Health", "Sustainability"],
    href: "/work/she",
    size: "feature",
    // TEMP sample: community / people.
    media: {
      src: "/samples/work-she.jpg",
      alt: "SHE community initiative — people and everyday life.",
      label: "SHE real community / field still (approved).",
    },
  },
  {
    name: "Misu",
    description:
      "Hospitality thinking that goes beyond the dining room — concept, operations and the experience between them.",
    tags: ["Hospitality", "Concept", "Experience"],
    href: "/work/misu",
    size: "standard",
    // TEMP sample: hospitality / restaurant.
    media: {
      src: "/samples/work-misu.jpg",
      alt: "Misu hospitality space and service.",
      label: "Misu real hospitality still.",
    },
  },
  {
    name: "RR Skins",
    description:
      "Making a specialised healthcare offering easier to understand and trust — clarity as a form of care.",
    tags: ["Healthcare", "Clarity", "Trust"],
    href: "/work/rr-skins",
    size: "standard",
    // TEMP sample: healthcare environment.
    media: {
      src: "/samples/work-rrskins.jpg",
      alt: "RR Skins specialised healthcare environment.",
      label: "RR Skins real healthcare still.",
    },
  },
];

export const sectors: string[] = [
  "Hospitality & F&B",
  "Real Estate & Built Environment",
  "Healthcare",
  "Lifestyle & Consumer Brands",
  "Entertainment & Media",
  "Travel & Tourism",
  "Institutional / Community",
];

export const sectorProjects: Record<string, string[]> = {
  "Hospitality & F&B": ["Misu", "Spice Goa", "Khana Khazana", "Khau Gali", "Resort Blu", "Holiday Village"],
  "Real Estate & Built Environment": ["Raysons Group", "Citron", "Loom Crafts", "Neora Deck"],
  "Healthcare": ["RR Skins"],
  "Lifestyle & Consumer Brands": ["DTK Karekar Jewellery", "Fraganta", "Loom Crafts"],
  "Entertainment & Media": ["PictureTime"],
  "Travel & Tourism": ["Tourin", "Holiday Village"],
  "Institutional / Community": ["SHE", "Operation Sampark", "Indian Army projects", "Western Command"],
};

// Logo strip — only names approved for public use. No fabricated logos:
// each renders as a clean wordmark placeholder until a real logo is supplied.
export const brands: string[] = [
  "Raysons Group",
  "PictureTime",
  "Loom Crafts",
  "Neora Deck",
  "Misu",
  "RR Skins",
  "Blu Resorts",
  "Qubice",
  "Kanopy",
  "Citron",
  "DTK Karekar Jewellery",
];

export const complexProjects = {
  eyebrow: "Beyond the standard brief",
  headline: "The work that doesn't fit a standard agency box",
  body: "Ārohana's experience extends from remote-community initiatives in Ladakh to films and communication projects for the Indian Army, where environment, audience and responsibility required different preparation. Only approved, non-confidential work is shown.",
  cta: { label: "Explore selected projects", href: "/indian-army-projects" },
  items: [
    {
      name: "SHE",
      caption: "Community initiative — health, dignity, sustainability.",
      // TEMP sample: community / people (not identifiable Army imagery).
      media: {
        src: "/samples/complex-2.jpg",
        alt: "SHE community work in Ladakh.",
        label: "SHE approved field still.",
      },
    },
    {
      name: "Operation Sampark",
      caption: "Homestay training and local capacity building.",
      // TEMP sample: remote field environment.
      media: {
        src: "/samples/complex-1.jpg",
        alt: "Homestay training under Operation Sampark.",
        label: "Operation Sampark approved still.",
      },
    },
    {
      name: "Approved film work",
      caption: "Documentary / communication still (cleared for public use).",
      // TEMP sample: mountains / Ladakh-type environment.
      media: {
        src: "/samples/complex-3.jpg",
        alt: "Approved Indian Army documentation still.",
        label: "Approved Army film/documentation still.",
      },
    },
  ],
};

export const tourin = {
  eyebrow: "An owned brand",
  headline: "And then there is Tourin.",
  body: "Tourin is an experiential travel brand beginning with Ladakh, built from lived experience rather than a generic destination catalogue. 15+ separate bookings and trips so far — shaped by people, food, stays and the roads in between.",
  stat: { value: "15+", label: "separate bookings & trips so far" },
  cta: { label: "Explore Tourin", href: "/tourin" },
  media: [
    {
      // TEMP sample: road journeys / sense of place.
      src: "/samples/tourin-1.jpg",
      alt: "Ladakh — local people and everyday life.",
      label: "Ladakh: people / local interaction (real).",
    },
    {
      // TEMP sample: food / stays.
      src: "/samples/tourin-2.jpg",
      alt: "Ladakh — food and stays.",
      label: "Ladakh: food / stays (real).",
    },
    {
      // TEMP sample: mountains / landscape.
      src: "/samples/tourin-3.jpg",
      alt: "Ladakh — roads and sense of place.",
      label: "Ladakh: roads / sense of place (real).",
    },
  ],
};

export const finalCta = {
  eyebrow: "Let's talk",
  headline:
    "If you're building something serious, let's talk about what it actually needs.",
  primaryCta: { label: "Start a conversation", href: "/contact" },
  contact: site.contact,
};

export type CaseStudy = {
  slug: string;
  client: string;
  headline: string;
  sector: string;
  location: string;
  engagement: string;
  duration: string;
  situation: string;
  challenge: string;
  thinking: string;
  workstreams: { title: string; body: string }[];
  proof: string;
  gallery: { src: string; alt: string; label: string }[];
};

export const caseStudies: Record<string, CaseStudy> = {
  "raysons-group": {
    slug: "raysons-group",
    client: "Raysons Group",
    headline: "One group. Multiple businesses. Different communication needs — shaped into a single, coherent way of speaking.",
    sector: "Real Estate & Built Environment",
    location: "Kolhapur, Maharashtra",
    engagement: "Long-term digital partnership + project production",
    duration: "Ongoing",
    situation:
      "Raysons Group operates across real estate, hospitality and allied businesses, each with its own audience, tone and communication requirements. The challenge was not a lack of visibility, but a lack of coherence.",
    challenge:
      "Different businesses under one group were speaking in different voices. The group needed a way to present itself that was unified without being generic, and specific without being fragmented.",
    thinking:
      "We treated the group as a portfolio of distinct stories rather than forcing a single template. The digital strategy was built around the relationships between the businesses, not just their individual outputs.",
    workstreams: [
      {
        title: "Group brand architecture",
        body: "Mapping the relationships between businesses and defining how they speak to different audiences — from buyers and investors to partners and recruits.",
      },
      {
        title: "Digital ecosystem",
        body: "Website strategy, social platforms and content systems that reflect the group's scale while keeping each business distinct.",
      },
      {
        title: "Project production",
        body: "Films and photography for real estate launches, hospitality properties and corporate communications — on-brand and on-time.",
      },
    ],
    proof:
      "A coherent digital presence across multiple business verticals, with content that reflects the group's scale and sector depth. Long-term partnership spanning strategy, content and production.",
    gallery: [
      { src: "/samples/work-raysons.jpg", alt: "Raysons Group built environment.", label: "Real estate / built environment still." },
      { src: "/samples/work-raysons.jpg", alt: "Raysons Group hospitality.", label: "Hospitality property still." },
      { src: "/samples/work-raysons.jpg", alt: "Raysons Group brand system.", label: "Brand system / digital still." },
    ],
  },
  "loom-crafts": {
    slug: "loom-crafts",
    client: "Loom Crafts",
    headline: "One brand, two very different buying journeys — communicated without losing a single thread of the story.",
    sector: "Lifestyle & Consumer Brands",
    location: "India",
    engagement: "Digital brand growth",
    duration: "Ongoing",
    situation:
      "Loom Crafts operates across furniture and prefabricated solutions — two products with very different buyers, decision cycles and emotional triggers. The brand needed to speak to both without confusion.",
    challenge:
      "Two verticals, two buying journeys, one brand. The communication needed to be distinct enough for each audience while remaining recognisably the same brand.",
    thinking:
      "We separated the narrative threads but kept the visual and tonal system unified. Each vertical got its own story architecture, with the brand as the common thread.",
    workstreams: [
      {
        title: "Brand positioning",
        body: "Defining the core brand idea and then adapting it for two distinct product worlds — furniture (emotion, craft, home) and prefab (efficiency, trust, scale).",
      },
      {
        title: "Content systems",
        body: "Separate content calendars and social strategies for each vertical, with shared visual language and cross-over moments.",
      },
      {
        title: "Creative production",
        body: "Photography, video and design that serve both verticals without diluting either.",
      },
    ],
    proof:
      "Clear, distinct communication for two very different products under one brand — with measurable engagement across both verticals.",
    gallery: [
      { src: "/samples/work-loom.jpg", alt: "Loom Crafts furniture.", label: "Furniture / product still." },
      { src: "/samples/work-loom.jpg", alt: "Loom Crafts prefab.", label: "Prefab / environment still." },
      { src: "/samples/work-loom.jpg", alt: "Loom Crafts brand.", label: "Brand system still." },
    ],
  },
  picturetime: {
    slug: "picturetime",
    client: "PictureTime",
    headline: "From cinema promotion to a broader brand story — building a narrative bigger than any single release.",
    sector: "Entertainment & Media",
    location: "India",
    engagement: "Digital brand work + on-ground content",
    duration: "Ongoing",
    situation:
      "PictureTime began with cinema promotion — a reactive, release-by-release model. The brand had deeper cultural relevance that wasn't being communicated.",
    challenge:
      "Move from a promotion-only model to a brand story that audiences follow regardless of what's releasing. Build recognition for the platform, not just individual films.",
    thinking:
      "We treated PictureTime as a media brand with its own voice, rather than a promotional channel for other people's content. The digital strategy was built around the platform's personality.",
    workstreams: [
      {
        title: "Brand narrative",
        body: "Defining what PictureTime stands for beyond ticket sales — community, culture, the joy of cinema.",
      },
      {
        title: "Social strategy",
        body: "A content ecosystem that balances film promotion with brand storytelling, audience engagement and event coverage.",
      },
      {
        title: "On-ground content",
        body: "Festival coverage, audience moments and event documentation that builds a library of PictureTime-specific content.",
      },
    ],
    proof:
      "A stronger, more recognisable digital brand with content that serves both promotion and platform identity. Consistent on-ground presence at festivals and events.",
    gallery: [
      { src: "/samples/work-picturetime.jpg", alt: "PictureTime cinema promotion.", label: "Cinema / audience still." },
      { src: "/samples/work-picturetime.jpg", alt: "PictureTime festival.", label: "Festival / event still." },
      { src: "/samples/work-picturetime.jpg", alt: "PictureTime brand.", label: "Brand / digital still." },
    ],
  },
  she: {
    slug: "she",
    client: "SHE — Sustainable Health Empowerment",
    headline: "A community initiative built around health, dignity and sustainability — communication with responsibility at its centre.",
    sector: "Institutional / Community",
    location: "Ladakh, India",
    engagement: "Identity + communication + documentary content",
    duration: "Project-based",
    situation:
      "SHE was a health and hygiene initiative operating across eight remote villages in Ladakh. It needed a name, an identity and a communication strategy that was sensitive to context and community.",
    challenge:
      "Create a brand and communication system for a community initiative that is respectful, clear and effective — without treating the community as a marketing backdrop.",
    thinking:
      "The work began with identity and naming, then moved into communication strategy and documentary content. Every decision was tested against the principle that the initiative serves the community, not the other way around.",
    workstreams: [
      {
        title: "Identity & naming",
        body: "Developing the name SHE and a visual identity that is simple, dignified and appropriate for a community health context.",
      },
      {
        title: "Communication strategy",
        body: "Mapping the audiences — community members, local institutions, donors — and creating content that serves each without losing the core message.",
      },
      {
        title: "Documentary content",
        body: "Filming and editing that documents the initiative's impact with honesty and respect, suitable for both internal and external use.",
      },
    ],
    proof:
      "A recognised identity and communication system for an eight-village initiative, with documentary content that accurately reflects the work and its context.",
    gallery: [
      { src: "/samples/work-she.jpg", alt: "SHE community work.", label: "Community / field still." },
      { src: "/samples/work-she.jpg", alt: "SHE health initiative.", label: "Health / initiative still." },
      { src: "/samples/work-she.jpg", alt: "SHE documentation.", label: "Documentary still." },
    ],
  },
  misu: {
    slug: "misu",
    client: "Misu",
    headline: "Hospitality thinking that goes beyond the dining room — concept, operations and the experience between them.",
    sector: "Hospitality & F&B",
    location: "Goa, India",
    engagement: "Hospitality consulting + digital execution",
    duration: "Ongoing",
    situation:
      "Misu is a restaurant and bar in Goa operating in a competitive market. The challenge was not just marketing, but the fundamentals of the hospitality business — concept, operations and experience.",
    challenge:
      "Build a hospitality business that is profitable, consistent and memorable — not just a venue that looks good on social media.",
    thinking:
      "We started with the operational fundamentals: menu engineering, food cost, service systems and kitchen control. Digital and creative work followed, grounded in a business that actually works.",
    workstreams: [
      {
        title: "Concept & menu",
        body: "Refining the menu, pricing and product mix to align with the target audience and operational capacity.",
      },
      {
        title: "Operational systems",
        body: "SOPs, kitchen control, staffing and service systems that make the business predictable and scalable.",
      },
      {
        title: "Digital presence",
        body: "Social media, content and campaigns that reflect the actual experience, not an aspirational version of it.",
      },
    ],
    proof:
      "A hospitality business with stronger fundamentals, clearer positioning and a digital presence that reflects the actual guest experience.",
    gallery: [
      { src: "/samples/work-misu.jpg", alt: "Misu restaurant.", label: "Hospitality / restaurant still." },
      { src: "/samples/work-misu.jpg", alt: "Misu menu.", label: "Menu / product still." },
      { src: "/samples/work-misu.jpg", alt: "Misu service.", label: "Service / operations still." },
    ],
  },
  "rr-skins": {
    slug: "rr-skins",
    client: "RR Skins",
    headline: "Making a specialised healthcare offering easier to understand and trust — clarity as a form of care.",
    sector: "Healthcare",
    location: "India",
    engagement: "Digital brand growth + content strategy",
    duration: "Project-based",
    situation:
      "RR Skins offers specialised skincare treatments. The challenge was that the offering is clinical and technical, which can feel distant or intimidating to potential patients.",
    challenge:
      "Translate a specialised healthcare service into communication that builds trust, educates the audience and makes the offering feel accessible — without oversimplifying or losing credibility.",
    thinking:
      "We treated the content strategy as an education problem, not a promotion problem. The goal was to make people feel informed and confident, not sold to.",
    workstreams: [
      {
        title: "Content strategy",
        body: "Mapping the patient journey and creating content that meets people at each stage — from curiosity to consultation to treatment.",
      },
      {
        title: "Brand clarity",
        body: "Simplifying the language, refining the visual identity and creating a digital presence that feels professional but approachable.",
      },
      {
        title: "Platform execution",
        body: "Social media, website and campaign content that builds trust through education rather than promotion.",
      },
    ],
    proof:
      "A clearer, more trusted digital presence for a specialised healthcare brand — with content that educates rather than just advertises.",
    gallery: [
      { src: "/samples/work-rrskins.jpg", alt: "RR Skins clinic.", label: "Healthcare / clinic still." },
      { src: "/samples/work-rrskins.jpg", alt: "RR Skins treatment.", label: "Treatment / service still." },
      { src: "/samples/work-rrskins.jpg", alt: "RR Skins brand.", label: "Brand / digital still." },
    ],
  },
};
