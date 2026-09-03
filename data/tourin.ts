export interface TourinExperience {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  highlights: string[];
}

export const tourinConfig = {
  title: "Tourin by Ārohana",
  eyebrow: "BESPOKE EXPERIENTIAL TRAVEL",
  headline: "TRAVEL BEYOND THE ITINERARY.",
  leadParagraph:
    "The Ladakh people experience and the Ladakh most itineraries sell are not always the same. Tourin is our experiential curation unit — exploring raw frontiers, remote Himalayan communities, and mindful expeditions.",
  extendedCopy:
    "From secluded heritage homestays in orchard valleys to starlit dark-sky sanctuaries and ancient monastery trails — we design travel that leaves you with more than photographs. Deep connection, slow pace, and total respect for indigenous mountain cultures.",
  heroImage: "/images/tourin/tourin-hero.jpg",
  motorcycleImage: "/assets/tourin-ladakh-motorcycle.png",
  stats: [
    { value: "15+", label: "Curated Expeditions Completed" },
    { value: "100%", label: "Individually Paced Routes" },
    { value: "14.7K", label: "FT Dark Sky Sanctuaries" },
    { value: "Zero", label: "Rushed Tourist Circuits" }
  ],
  pillars: [
    {
      id: "frontiers",
      title: "Raw Expedition Routes",
      description:
        "Traversing lesser-known high-altitude passes beyond commercial tourist corridors, supported by experienced local drivers, mechanics, and satellite communication.",
      image: "/images/tourin/tourin-1.jpg"
    },
    {
      id: "culture",
      title: "Living Himalayan Culture",
      description:
        "Staying in family-run earthen homestays in Nubra, Sham, and Changthang. Sharing home-cooked Ladakhi meals and participating in traditional orchard harvests.",
      image: "/images/tourin/tourin-2.jpg"
    },
    {
      id: "mindful",
      title: "Bespoke & Motorcycle Formats",
      description:
        "From our signature 20-biker Enfield expeditions over Chang La and Khardung La to quiet high-altitude writer retreats and dark-sky astrophotography camps.",
      image: "/images/tourin/tourin-3.jpg"
    }
  ],
  gallery: [
    { src: "/images/tourin/tourin-gallery-1.jpg", caption: "High mountain pass crossing under vast Himalayan skies." },
    { src: "/images/tourin/tourin-gallery-2.jpg", caption: "Traditional Ladakhi earthen village architecture and apricot orchards." },
    { src: "/images/tourin/tourin-gallery-3.jpg", caption: "Dark sky stargazing and Milky Way arc over Hanle valley." },
    { src: "/images/tourin/tourin-gallery-4.jpg", caption: "Biker convoy winding along glacial rivers in Zanskar." }
  ]
};
