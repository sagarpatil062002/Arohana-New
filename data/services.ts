export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  image: string;
  darkImage?: string;
  capabilities: string[];
  deliverables: string[];
  outcomes: string[];
}

export const servicesData: ServiceItem[] = [
  {
    id: "digital-brand-growth",
    index: "01",
    title: "Digital Brand Growth",
    slug: "digital-brand-growth",
    summary:
      "Strategy-led digital presence, content, campaigns and performance systems that build your brand and grow your business.",
    description:
      "Digital presence cannot exist in isolation from business economics. We engineer strategy-led digital ecosystems where positioning, editorial narrative, creative production, and revenue acquisition converge directly into commercial results.",
    image: "/images/services/digital-growth.jpg",
    darkImage: "/assets/service-digital-large.png",
    capabilities: [
      "Brand Strategy",
      "Market Positioning",
      "Strategic Communication",
      "Content Strategy",
      "Social Media Management",
      "Creative Direction",
      "Copywriting & Tone of Voice",
      "Graphic Design & Systems",
      "Photography & Visual Direction",
      "Videography & Production",
      "Campaign Development",
      "Meta Advertising (FB & IG)",
      "Google Search & Performance Max",
      "Search Engine Optimization (SEO)",
      "Website Strategy & Architecture",
      "High-Intent Lead Generation"
    ],
    deliverables: [
      "Full-Funnel Acquisition Architecture",
      "Omnichannel Editorial Calendar",
      "Creative Asset Production Pipeline",
      "Paid Performance Attribution Dashboard",
      "Brand Identity & Style Guidelines"
    ],
    outcomes: [
      "Sustainable customer acquisition velocity",
      "Distinct brand equity and premium market perception",
      "Direct conversion alignment between creative and ad spend"
    ]
  },
  {
    id: "hospitality-consulting",
    index: "02",
    title: "Hospitality Consulting",
    slug: "hospitality-consulting",
    summary:
      "From concept to operations — we design, streamline and optimize hospitality businesses for consistent experience and profitability.",
    description:
      "Hospitality is an unforgiving arena where margins compound shift-by-shift. Having built, operated, and managed dining establishments, standalone cafes, craft brewery sales, and luxury five-star operations, Ārohana delivers ground-level operational precision paired with commercial brand authority.",
    image: "/images/case-studies/misu/misu-hero.jpg",
    darkImage: "/assets/service-hospitality-large.png",
    capabilities: [
      "Concept Development & Feasibility",
      "Spatial & Customer Journey Mapping",
      "Menu Creation & Culinary Direction",
      "Menu Engineering & Margin Audits",
      "Recipe & Product Standardization",
      "Pricing & Food Cost Control",
      "Kitchen Systems & Workflow Layouts",
      "Standard Operating Procedures (SOPs)",
      "Front-of-House Staff Training",
      "Service Systems & Hospitality Etiquette",
      "Revenue Optimisation & Table Turnover",
      "Hyperlocal Digital Marketing",
      "Zomato & Swiggy Channel Management",
      "Online Travel Agency (OTA) Consulting",
      "Turnkey Operational Setup & Launch",
      "Structured Handover & Post-Launch Audits"
    ],
    deliverables: [
      "Comprehensive Kitchen & Service SOP Manuals",
      "Engineered Cost-Controlled Menu Matrix",
      "Staff Training & Guest Experience Playbooks",
      "Vendor & Supply Chain Procurement Protocols",
      "F&B Unit Economics Model & Margin Sheet"
    ],
    outcomes: [
      "Immediate reduction in food wastage & variance",
      "Consistent guest experience and repeatable reviews",
      "Maximized per-cover spend and accelerated break-even"
    ]
  },
  {
    id: "content-brand-production",
    index: "03",
    title: "Content & Brand Production",
    slug: "content-brand-production",
    summary:
      "Films, brand stories and visual content that communicate clearly and create impact.",
    description:
      "We produce cinematic moving images, institutional documentaries, and high-impact digital campaigns. From high-altitude military documentation at 14,000+ feet in the Himalayas to luxury architectural walkthroughs and brand manifestos, our production unit executes with technical rigor and storytelling nuance.",
    image: "/images/case-studies/raysons/casting-hero.jpg",
    darkImage: "/assets/service-camera-large.png",
    capabilities: [
      "Corporate Films & Institutional Manifestos",
      "Brand Films & Origin Story Documentaries",
      "High-Altitude & Demanding Field Documentaries",
      "Institutional & Defence Documentation",
      "Campaign Launch Films & Commercials",
      "Promotional Films & Product Showcases",
      "Vertical Video (Reels & Short Form)",
      "Narrative Scripting & Storyboarding",
      "Professional Voice-over & Scoring",
      "On-Ground Shoot Direction & Cinematography",
      "Technical Color Grading & Post-production",
      "Sound Design & Spatial Audio Mixing"
    ],
    deliverables: [
      "Master 4K/DCI Cinema Cuts",
      "Multi-Platform Social Cutdowns (9:16, 1:1, 16:9)",
      "High-Resolution Production Stills & BTS",
      "Complete Broadcast & Digital Licensing",
      "Archival-Grade Project Master Drives"
    ],
    outcomes: [
      "Emotional resonance and verified stakeholder credibility",
      "Uncompromising visual production quality",
      "Turnkey execution even in remote, high-risk environments"
    ]
  }
];
