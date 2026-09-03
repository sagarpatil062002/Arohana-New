export interface ProjectOverview {
  id: string;
  index: string;
  title: string;
  slug: string;
  category: string;
  sectorTag: string;
  description: string;
  thumbnail: string;
  location: string;
}

export const featuredProjects: ProjectOverview[] = [
  {
    id: "raysons-group",
    index: "01",
    title: "Raysons Group",
    slug: "raysons-group",
    category: "Real Estate & Heavy Engineering",
    sectorTag: "real-estate",
    description:
      "A multi-entity partnership spanning luxury residential developments, industrial engineering, foundry operations, and corporate presentation films.",
    thumbnail: "/images/case-studies/raysons/neora-1.jpg",
    location: "Kolhapur & Regional Industrial Hubs"
  },
  {
    id: "loom-crafts",
    index: "02",
    title: "Loom Crafts",
    slug: "loom-crafts",
    category: "Luxury Outdoor Furniture & Modular Prefab Living",
    sectorTag: "lifestyle",
    description:
      "One brand. Two high-value businesses. A dual-journey communication architecture built around how architects and high-net-worth buyers actually evaluate.",
    thumbnail: "/images/case-studies/loom/loom-hero.jpg",
    location: "Delhi NCR, Bangalore & Pan-India"
  },
  {
    id: "picturetime",
    index: "03",
    title: "PictureTime",
    slug: "picturetime",
    category: "Mobile Cinema, Cultural Infrastructure & Media",
    sectorTag: "entertainment",
    description:
      "Shifting communication from conventional cinema visits to a national cultural infrastructure model deployed across high-altitude Ladakh and premier film festivals.",
    thumbnail: "/images/case-studies/picturetime/picturetime-hero.jpg",
    location: "Ladakh, Goa (IFFI) & Pan-India"
  },
  {
    id: "she",
    index: "04",
    title: "SHE",
    slug: "she",
    category: "Community Healthcare & Women's Hygiene",
    sectorTag: "institutional",
    description:
      "A sensitive health and hygiene initiative designed for 8 remote border villages in Ladakh, supported by the Indian Army under Operation Sadbhavana.",
    thumbnail: "/images/case-studies/she/she-hero.jpg",
    location: "8 Remote Border Villages, Ladakh"
  },
  {
    id: "misu",
    index: "05",
    title: "Misu",
    slug: "misu",
    category: "Contemporary Pan-Asian Restaurant & Bar",
    sectorTag: "hospitality",
    description:
      "Transforming a restaurant from moving operational parts into an engineered hospitality asset through food cost audits, kitchen SOPs, and floor choreography.",
    thumbnail: "/images/case-studies/misu/misu-hero.jpg",
    location: "Goa & Regional Expansion"
  },
  {
    id: "rr-skins",
    index: "06",
    title: "RR Skins",
    slug: "rr-skins",
    category: "Specialised Clinical Dermatology & Aesthetic Healthcare",
    sectorTag: "healthcare",
    description:
      "Making specialized healthcare intuitive and trusted through doctor-led education, ethical skincare storytelling, and clinical credibility.",
    thumbnail: "/images/case-studies/rrskins/rrskins-hero.jpg",
    location: "Leh, Ladakh & Regional Healthcare Hub"
  }
];

export const clientEcosystem = [
  { name: "Raysons Group", sector: "real-estate", label: "Industry & Realty" },
  { name: "PictureTime", sector: "entertainment", label: "Entertainment & Media" },
  { name: "Loom Crafts", sector: "lifestyle", label: "Luxury & Architecture" },
  { name: "Neora Deck", sector: "hospitality", label: "Hospitality & Dining" },
  { name: "Misu", sector: "hospitality", label: "Pan-Asian Restaurant" },
  { name: "RR Skins", sector: "healthcare", label: "Clinical Dermatology" },
  { name: "Blu Resorts", sector: "hospitality", label: "Luxury Resorts" },
  { name: "Qubice", sector: "real-estate", label: "Design & Realty" },
  { name: "Kanopy", sector: "lifestyle", label: "Bespoke Lifestyle" },
  { name: "Citron", sector: "hospitality", label: "Boutique Hospitality" },
  { name: "DTK Karekar", sector: "lifestyle", label: "Luxury Retail" },
  { name: "Western Command", sector: "defence", label: "Indian Army Headquarters" },
  { name: "14 Corps", sector: "defence", label: "Fire & Fury Corps" },
  { name: "Fire & Fury", sector: "defence", label: "Northern High-Altitude Theatre" }
];
