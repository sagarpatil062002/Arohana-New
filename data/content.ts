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
];

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
