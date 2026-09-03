export interface CaseStudyData {
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  category: string;
  location: string;
  engagementModel: string;
  duration: string;
  heroImage: string;
  capabilities: string[];
  situation: {
    heading: string;
    description: string;
    points: string[];
  };
  challenge: {
    heading: string;
    description: string;
  };
  thinking: {
    heading: string;
    description: string;
    quote?: string;
  };
  work: {
    heading: string;
    description: string;
    deliverables: string[];
  };
  proof: {
    heading: string;
    description: string;
    stats: { label: string; value: string }[];
  };
  outcome: {
    heading: string;
    description: string;
  };
  gallery: {
    src: string;
    caption: string;
  }[];
  nextSlug: string;
  nextTitle: string;
}

export const caseStudiesRecord: Record<string, CaseStudyData> = {
  "raysons-group": {
    slug: "raysons-group",
    index: "01",
    title: "Raysons Group",
    subtitle: "Real Estate & Heavy Engineering",
    category: "Real Estate, Industrial Castings & Corporate Media",
    location: "Kolhapur & Regional Industrial Hubs",
    engagementModel: "Relationship-Led Multi-Entity Partnership",
    duration: "Ongoing Retainers + Project-Based Film",
    heroImage: "/images/case-studies/raysons/casting-hero.jpg",
    capabilities: [
      "Content Strategy & Planning",
      "Full-Scope Social Media Management",
      "Architectural & Lifestyle Shoots",
      "Technical Scripting & Video Direction",
      "Corporate Presentation Film",
      "Foundry Production & Industrial Documentation"
    ],
    situation: {
      heading: "How one assignment expanded into a multi-entity partnership",
      description:
        "Ārohana’s relationship with Raysons Group began with Neora Deck, a standalone lifestyle hospitality development. The client needed communication that could convey the distinctive quality of the space without resorting to generic luxury hospitality tropes.",
      points: [
        "Rapidly growing regional conglomerate with distinct verticals",
        "Legacy real estate reputation needed modern architectural credibility",
        "High-precision engineering casting foundry needed global B2B corporate authority"
      ]
    },
    challenge: {
      heading: "Multiple businesses, wildly different audiences",
      description:
        "The central challenge was managing communication for entities operating at opposite ends of commerce: high-end hospitality and premium residential buyers on one side, and tier-1 heavy engineering OEM buyers on the other. A generic agency model would apply the same digital playbook to both."
    },
    thinking: {
      heading: "Different businesses require fundamentally different voices",
      description:
        "Rather than treating Raysons Group as a monolithic corporate brand, Ārohana designed distinct communication engines: experiential narrative for Neora Deck, lifestyle architectural authority for residential real estate, and technical industrial precision for the foundry operations.",
      quote:
        "Industrial foundry communication cannot be made of stock slogans. It requires understanding metallurgical precision, tooling lead times, and certified quality control on the shop floor."
    },
    work: {
      heading: "Full-spectrum creative execution across three entities",
      description:
        "Over an ongoing relationship, Ārohana directed architectural photography, industrial shop-floor film production, weekly social communication, and an overarching corporate presentation film.",
      deliverables: [
        "Corporate Presentation Film covering heavy casting capabilities",
        "Neora Deck spatial photography and launch campaigns",
        "Technical scriptwriting and on-ground foundry filming",
        "Ongoing social management across real estate and engineering divisions"
      ]
    },
    proof: {
      heading: "Verified milestones across real estate and manufacturing",
      description:
        "The work directly bridged client perception, driving verified commercial bookings and high-value OEM manufacturing inquiries.",
      stats: [
        { label: "Entity Partnerships", value: "3 Divisions" },
        { label: "Shop Floor Filming", value: "Full-Scale Foundry" },
        { label: "Commercial Engagement", value: "Multi-Year" }
      ]
    },
    outcome: {
      heading: "A unified standard across distinct business pillars",
      description:
        "Raysons Group now commands consistent visual authority across every touchpoint — from residential home buyers inspecting floorplans to global automotive and engineering executives evaluating casting capabilities."
    },
    gallery: [
      { src: "/images/case-studies/raysons/neora-1.jpg", caption: "Neora Deck: Sunset ambiance and spatial architectural framing." },
      { src: "/images/case-studies/raysons/casting-1.jpg", caption: "Heavy foundry shop floor: High-temperature molten casting documentation." },
      { src: "/images/case-studies/raysons/neora-2.jpg", caption: "Neora Deck: Interior design and contemporary seating choreography." },
      { src: "/images/case-studies/raysons/casting-2.jpg", caption: "Precision machine tooling and metallurgical inspection." },
      { src: "/images/case-studies/raysons/realestate-1.jpg", caption: "Residential tower development: Facade and community spaces." }
    ],
    nextSlug: "loom-crafts",
    nextTitle: "Loom Crafts"
  },

  "loom-crafts": {
    slug: "loom-crafts",
    index: "02",
    title: "Loom Crafts",
    subtitle: "Luxury Outdoor Furniture & Modular Prefab Living",
    category: "Luxury Living, Architecture & Prefab Systems",
    location: "Delhi NCR, Bangalore & Pan-India",
    engagementModel: "Ongoing Digital Partnership",
    duration: "Multi-Year Retainer",
    heroImage: "/images/case-studies/loom/loom-hero.jpg",
    capabilities: [
      "Content Strategy & Editorial Calendars",
      "Creative Direction & Graphic Design",
      "Reels & Video Production",
      "Omnichannel Digital Management",
      "Exhibition & Open-House Collaterals"
    ],
    situation: {
      heading: "One brand, two businesses, distinct buyer psychology",
      description:
        "Loom Crafts operates across two premium verticals: handcrafted luxury outdoor furniture and high-performance modular prefab architectural homes. While both sit under one brand umbrella, the buyer journey and purchase friction are completely different.",
      points: [
        "Outdoor furniture buyers evaluate ergonomics, weather-resistant weaving, and aesthetic luxury",
        "Prefab modular home buyers evaluate structural steel engineering, thermal insulation, permits, and timelines",
        "Social channels were mixing both without clear customer segmentation"
      ]
    },
    challenge: {
      heading: "Addressing architect skepticism and consumer trust",
      description:
        "Modular architecture in India faces widespread skepticism regarding durability and longevity. Meanwhile, luxury outdoor furniture requires conveying tactile craftsmanship on small digital mobile screens."
    },
    thinking: {
      heading: "A dual-journey communication architecture",
      description:
        "Ārohana restructured digital content into two distinct narrative streams: tactile material luxury for outdoor collections, and engineering rigour, site installations, and architectural walkthroughs for prefab structures.",
      quote:
        "A homeowner buying outdoor loungers wants to see relaxed resort living. A client commissioning a prefab villa wants to see foundation engineering and load-bearing specifications."
    },
    work: {
      heading: "Consistent creative direction across all touchpoints",
      description:
        "We instituted disciplined content production covering factory craftsmanship, modular assembly time-lapses, customer open houses, and digital storytelling.",
      deliverables: [
        "Modular assembly documentation and site progress reels",
        "Outdoor luxury furniture design catalogues and digital campaigns",
        "Architect-focused thought leadership content",
        "Exhibition coverage at D/ARC and regional design expos"
      ]
    },
    proof: {
      heading: "Documented reach across high-net-worth audiences",
      description:
        "Clear demarcation between furniture and prefab streams significantly increased qualified architect inquiries and private residential consultations.",
      stats: [
        { label: "Verticals Structured", value: "2 Separate Funnels" },
        { label: "Geographic Coverage", value: "Pan-India Presence" },
        { label: "Channel Architecture", value: "4 Active Platforms" }
      ]
    },
    outcome: {
      heading: "Market leadership in outdoor living and modern prefab",
      description:
        "Loom Crafts established authority as India’s premier outdoor furniture maker while building undeniable credibility for its modular housing arm."
    },
    gallery: [
      { src: "/images/case-studies/loom/furniture-1.jpg", caption: "Handwoven weather-resistant outdoor lounge setting." },
      { src: "/images/case-studies/loom/prefab-1.jpg", caption: "Modular prefab living villa: Structural installation and floor-to-ceiling glass." },
      { src: "/images/case-studies/loom/furniture-2.jpg", caption: "Tactile weave detailing and high-grade aluminum frame finish." },
      { src: "/images/case-studies/loom/event-darc.jpg", caption: "Loom Crafts showcase at national architectural design exposition." }
    ],
    nextSlug: "picturetime",
    nextTitle: "PictureTime"
  },

  "picturetime": {
    slug: "picturetime",
    index: "03",
    title: "PictureTime",
    subtitle: "Mobile Cinema, Cultural Infrastructure & Media",
    category: "Entertainment, High-Altitude Media & Digital Cinema",
    location: "Ladakh, Goa (IFFI) & Pan-India",
    engagementModel: "Ongoing Digital Partnership + Field Projects",
    duration: "1+ Year Strategic Engagement",
    heroImage: "/images/case-studies/picturetime/picturetime-hero.jpg",
    capabilities: [
      "Digital Strategy & Social Management",
      "Creative Direction & Campaign Systems",
      "High-Altitude & Festival Filming",
      "Filmmaker Interviews & PR Assets",
      "Theatrical Release Promotion"
    ],
    situation: {
      heading: "A revolutionary cinema model with an underdeveloped story",
      description:
        "PictureTime developed inflatable, state-of-the-art mobile digital cinema theatres capable of bringing DCI-compliant first-day-first-show releases to remote border regions, high-altitude passes, and major film festivals. However, public communication treated it primarily as a simple movie ticket seller.",
      points: [
        "Inflatable theatres operated at 11,500+ feet in Ladakh where no permanent cinema exists",
        "Featured prominently at prestigious events like the International Film Festival of India (IFFI)",
        "Needed communication that resonated with film industry studios, government bodies, and remote communities"
      ]
    },
    challenge: {
      heading: "Elevating from local film exhibitor to national cultural infrastructure",
      description:
        "The digital narrative needed to shift from 'watch a film today' to 'PictureTime is democratizing cinema access across India’s most inaccessible geographies.'"
    },
    thinking: {
      heading: "Documenting human wonder and technical tenacity",
      description:
        "Ārohana centered the narrative around the sheer operational feat of screening movies at sub-zero temperatures, the reactions of border communities experiencing big-screen cinema for the first time, and the technological robustness of the mobile inflatable enclosures.",
      quote:
        "When an audience in a remote Himalayan valley watches a film in 4K with Dolby 5.1 sound in -15°C, that is not entertainment — that is cultural infrastructure."
    },
    work: {
      heading: "Ground-level festival coverage and high-altitude campaigns",
      description:
        "Ārohana deployed production teams to Leh and Goa, capturing filmmaker interviews, behind-the-scenes engineering setups, and community reactions.",
      deliverables: [
        "IFFI Goa festival live documentation and celebrity director interviews",
        "High-altitude Ladakh winter screening campaigns",
        "Theatrical promotion campaigns for major studio releases",
        "B2B investor and governmental showcase collateral"
      ]
    },
    proof: {
      heading: "Verified footprint across national cultural hubs",
      description:
        "PictureTime's transformed presence captured national media attention, reinforcing its positioning with film distribution bodies and cultural ministries.",
      stats: [
        { label: "Operating Elevation", value: "11,500+ FT" },
        { label: "Festival Deployments", value: "IFFI & DIFF" },
        { label: "Community Access", value: "Frontier Regions" }
      ]
    },
    outcome: {
      heading: "A recognized pioneer in democratic cinema access",
      description:
        "PictureTime is now recognized not just as an exhibitor, but as a pioneering cultural infrastructure platform celebrated by filmmakers, government bodies, and rural audiences alike."
    },
    gallery: [
      { src: "/images/case-studies/picturetime/diff-1.jpg", caption: "PictureTime inflatable dome theatre under Himalayan evening skies." },
      { src: "/images/case-studies/picturetime/iffi-1.jpg", caption: "Official mobile cinema partner at International Film Festival of India, Goa." },
      { src: "/images/case-studies/picturetime/bahadur-1.jpg", caption: "Special screening and director panel discussion at Leh hub." },
      { src: "/images/case-studies/picturetime/diff-2.jpg", caption: "Packed audience experience inside high-performance mobile cinema." }
    ],
    nextSlug: "she",
    nextTitle: "SHE"
  },

  "she": {
    slug: "she",
    index: "04",
    title: "SHE",
    subtitle: "Sustainable Health Empowerment",
    category: "Community Healthcare, Women's Hygiene & Defence Initiative",
    location: "8 Remote Border Villages, Ladakh",
    engagementModel: "Indian Army-Supported Project under Operation Sadbhavana",
    duration: "Field-Based Initiative",
    heroImage: "/images/case-studies/she/she-hero.jpg",
    capabilities: [
      "Concept & Project Naming",
      "Campaign Identity & Mascot Design",
      "Bilingual Illustrated Educational Collateral",
      "On-Ground Field Facilitation",
      "Documentary Film Production & Voice-Over"
    ],
    situation: {
      heading: "Designing a sensitive health initiative where communication begins with trust",
      description:
        "Under Operation Sadbhavana, the Indian Army sought to launch a targeted menstrual health, hygiene, and sustainability campaign for women in remote, culturally conservative border villages in Ladakh. Ārohana was entrusted with naming, visual identity, educational materials, and field documentary production.",
      points: [
        "Taboo subject in traditional remote communities with significant communication barriers",
        "High rates of feminine hygiene infections caused by lack of access and awareness",
        "Need for non-clinical, empathetic, culturally respectful materials in local languages"
      ]
    },
    challenge: {
      heading: "Overcoming stigma without condescension",
      description:
        "Standard medical brochures failed to connect with local women. The project needed an approach that was gentle, culturally native, and grounded in mutual respect between village elders, local women, and facilitators."
    },
    thinking: {
      heading: "Empathy, illustrated storytelling, and local champions",
      description:
        "Ārohana conceived the name **SHE — Sustainable Health Empowerment**. Rather than clinical pamphlets, we designed warm, illustrated bilingual storybooks and relatable visual guides in Ladakhi and Hindi, delivered through interactive village circles.",
      quote:
        "Health communication in isolated communities cannot arrive as an external lecture. It must arrive as a conversation between sisters, accompanied by warm tea and shared trust."
    },
    work: {
      heading: "Field facilitation and verified educational distribution",
      description:
        "Our team travelled across 8 remote border villages alongside medical officers, conducting workshops, distributing reusable sanitary products, and capturing moving documentary footage.",
      deliverables: [
        "Brand identity, iconography, and educational mascot",
        "Illustrated bilingual hygiene guidebooks in Ladakhi & Hindi",
        "On-ground workshop facilitation across 8 border villages",
        "Official documentary film documenting village impact for Army records"
      ]
    },
    proof: {
      heading: "Direct grassroots impact in remote Himalayan villages",
      description:
        "100% participation across target communities, with local village sarpanches commending the sensitivity and lasting impact of the programme.",
      stats: [
        { label: "Border Villages", value: "8 Communities" },
        { label: "Direct Participation", value: "Hundreds of Women" },
        { label: "Army Programme", value: "Op Sadbhavana" }
      ]
    },
    outcome: {
      heading: "A lasting model for sensitive grassroots empowerment",
      description:
        "SHE proved that thoughtful creative strategy and on-ground cultural empathy can break decades of silence on critical healthcare topics, creating an enduring operational model for future community health campaigns."
    },
    gallery: [
      { src: "/images/case-studies/she/field-1.jpg", caption: "Community workshop circle with village women and facilitators." },
      { src: "/images/case-studies/she/identity-1.jpg", caption: "Illustrated bilingual health guidebooks designed for local resonance." },
      { src: "/images/case-studies/she/film-1.jpg", caption: "Documentary filming in high-altitude Himalayan valley." },
      { src: "/images/case-studies/she/field-2.jpg", caption: "Interactive Q&A session with village elders and young mothers." }
    ],
    nextSlug: "misu",
    nextTitle: "Misu"
  },

  "misu": {
    slug: "misu",
    index: "05",
    title: "Misu",
    subtitle: "Contemporary Pan-Asian Restaurant & Bar",
    category: "Hospitality Consulting, Menu Engineering & F&B Branding",
    location: "Goa & Regional Expansion",
    engagementModel: "Consulting + Ongoing Digital Communication",
    duration: "Nearly 2-Year Full-Scope Operational Engagement",
    heroImage: "/images/case-studies/misu/misu-hero.jpg",
    capabilities: [
      "Food-Cost Control & Pricing",
      "Menu Engineering & Margin Audits",
      "Kitchen SOPs & Staff Training",
      "Revenue Optimisation & Floor Systems",
      "Social Media & Culinary Content Direction"
    ],
    situation: {
      heading: "Turning a restaurant from moving operational parts into an engineered business",
      description:
        "Misu approached Ārohana with a dining business that needed much more than marketing. Despite strong culinary concepts, the restaurant struggled with kitchen consistency, inventory leakage, food cost variance, and uneven floor service.",
      points: [
        "Uncontrolled food costs eating away bottom-line operating margins",
        "High staff turnover causing frequent plate presentation discrepancies",
        "Digital presence was sporadic and disconnected from culinary strengths"
      ]
    },
    challenge: {
      heading: "Solving operational dysfunction before marketing the brand",
      description:
        "Marketing a restaurant with inconsistent kitchen output only accelerates customer dissatisfaction. Ārohana insisted on auditing kitchen economics, recipes, and service systems before ramping up public campaigns."
    },
    thinking: {
      heading: "Hospitality economics start behind the kitchen pass",
      description:
        "We treated Misu as a holistic operational system: standardizing recipe sheets down to the gram, retraining kitchen and front-of-house teams, eliminating low-margin items, and designing a cohesive brand experience on the dining floor.",
      quote:
        "A restaurant's brand is not its Instagram feed. Its brand is whether the ramen broth tastes identical at 1 PM on a Tuesday and 9 PM on a packed Saturday night."
    },
    work: {
      heading: "Full-scale operational and creative overhaul",
      description:
        "Over nearly two years, Ārohana led kitchen SOP standardization, introduced inventory tracking metrics, reorganized floor service choreography, and drove culinary content production.",
      deliverables: [
        "Standardized culinary recipes and food cost variance matrices",
        "Front-of-house service protocols and upselling playbooks",
        "Revamped cocktail and dining menu layout engineered for profitability",
        "Curated photography, reels, and digital brand management"
      ]
    },
    proof: {
      heading: "Documented margin recovery and guest satisfaction",
      description:
        "Strict portioning and kitchen SOPs brought food costs directly into target margins, while floor consistency earned top-tier customer reviews.",
      stats: [
        { label: "Operational Retainer", value: "Nearly 2 Years" },
        { label: "Cost Optimization", value: "Verified Margin Shift" },
        { label: "Service Standards", value: "100% SOP Codified" }
      ]
    },
    outcome: {
      heading: "A sustainable, scalable, and profitable dining destination",
      description:
        "Misu transformed into a disciplined, high-performing hospitality enterprise with healthy operating margins, loyal repeat patronage, and ready systems for multi-location expansion."
    },
    gallery: [
      { src: "/images/case-studies/misu/kitchen-1.jpg", caption: "Kitchen pass standardisation: Recipe fidelity and prep station organization." },
      { src: "/images/case-studies/misu/bar-1.jpg", caption: "Craft cocktail bar program: High-margin bespoke mixology." },
      { src: "/images/case-studies/misu/menu-1.jpg", caption: "Engineered dining menu: Strategic visual anchors and portion clarity." },
      { src: "/images/case-studies/misu/digital-1.jpg", caption: "Editorial food photography capturing fresh Asian ingredients." }
    ],
    nextSlug: "rr-skins",
    nextTitle: "RR Skins"
  },

  "rr-skins": {
    slug: "rr-skins",
    index: "06",
    title: "RR Skins",
    subtitle: "Specialised Clinical Dermatology & Aesthetic Healthcare",
    category: "Clinical Dermatology, Healthcare Storytelling & Medical Authority",
    location: "Leh, Ladakh & Regional Healthcare Hub",
    engagementModel: "Ongoing Digital Partnership",
    duration: "Ongoing Strategic Retainer",
    heroImage: "/images/case-studies/rrskins/rrskins-hero.jpg",
    capabilities: [
      "Healthcare Content Strategy",
      "Doctor-Led Video Series",
      "Treatment & Skincare Explainers",
      "Graphic Design & Reels Editing",
      "Education-Led Storytelling"
    ],
    situation: {
      heading: "Making specialized clinical dermatology intuitive and trusted",
      description:
        "RR Skins is a specialized clinical dermatology practice serving patients in Ladakh and beyond. When Ārohana began the engagement, the clinic had immense clinical expertise but an underdeveloped communication channel that failed to convey the breadth of specialized dermatological care.",
      points: [
        "Unique high-altitude climate challenges (extreme UV exposure, dry cold, compromised skin barriers)",
        "General public often confused medical dermatology with commercial beauty salons",
        "Need for credible, doctor-led clinical authority that debunked viral internet skincare myths"
      ]
    },
    challenge: {
      heading: "Maintaining medical rigor while remaining approachable",
      description:
        "Healthcare communication must adhere to strict ethical guidelines. It cannot over-promise, cannot rely on clickbait, and must build patient confidence through calm, accurate medical guidance."
    },
    thinking: {
      heading: "Education as the highest form of marketing",
      description:
        "Ārohana developed an education-first digital architecture: putting the dermatologist at the center to explain complex skin conditions, high-altitude UV protection, and evidence-based treatments in simple, empathetic terms.",
      quote:
        "In healthcare, patients don't buy aesthetic promises. They buy reassurance, clarity, and certified clinical authority."
    },
    work: {
      heading: "Doctor-led content production and patient guidance collateral",
      description:
        "We produce short-form explainer reels, detailed treatment carousels, and patient consultation guides that deconstruct misconceptions around dermatological treatments.",
      deliverables: [
        "Weekly doctor-led video production addressing common high-altitude skin conditions",
        "Clinical treatment explainer carousels and procedure guides",
        "Brand visual language reflecting cleanliness, calm, and scientific authority",
        "Patient-friendly post-treatment care communications"
      ]
    },
    proof: {
      heading: "Verified patient trust and clinical appointment growth",
      description:
        "The educational approach firmly established RR Skins as the leading clinical authority in the region, driving steady, pre-educated consultation bookings.",
      stats: [
        { label: "Content Approach", value: "100% Doctor-Led" },
        { label: "Audience Trust", value: "Regional Authority" },
        { label: "Engagement Type", value: "Strategic Retainer" }
      ]
    },
    outcome: {
      heading: "The gold standard in patient-first dermatological communication",
      description:
        "RR Skins has built a reputational moat anchored in medical integrity, patient trust, and verified clinical results across Ladakh."
    },
    gallery: [
      { src: "/images/case-studies/rrskins/trust-1.jpg", caption: "Clinical consultation environment: Calm, hygienic, patient-first care." },
      { src: "/images/case-studies/rrskins/education-1.jpg", caption: "Doctor-led educational video discussing high-altitude barrier repair." },
      { src: "/images/case-studies/rrskins/trust-2.jpg", caption: "Dermatological diagnostic tools and patient examination setup." },
      { src: "/images/case-studies/rrskins/education-2.jpg", caption: "Custom infographic series debunking common skincare misconceptions." }
    ],
    nextSlug: "raysons-group",
    nextTitle: "Raysons Group"
  }
};
