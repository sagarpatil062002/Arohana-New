/**
 * Ārohana Consultancy - Master Data Source
 * Contains all structured brand strategy, case studies, services, founder narrative, and Tourin data.
 */

const AROHANA_DATA = {
  brand: {
    name: "Ārohana",
    tagline: "We build brands, businesses & experiences.",
    positioning: "Ārohana works with businesses where communication cannot be separated from the business itself. We combine commercial thinking, sector experience and creative execution to help brands become clearer, more credible and more relevant to the people they need to reach. Depending on the brief, that can mean building a digital brand, running an ongoing social ecosystem, creating a film, fixing a restaurant’s menu and operating systems, or taking a project from an idea to on-ground execution.",
    email: "founder@byarohana.com",
    phone: "+91 8380092241",
    locations: ["Kolhapur", "Goa", "Ladakh", "Delhi NCR"],
    stats: [
      { number: "15+", label: "Tourin Expeditions", sub: "Curated bespoke Ladakh journeys" },
      { number: "6+", label: "Core Industry Sectors", sub: "Hospitality, Real Estate, Healthcare & more" },
      { number: "100%", label: "Contextual Execution", sub: "From strategy to on-ground reality" },
      { number: "06", label: "Special Institutional Engagements", sub: "Indian Army & High-Altitude Initiatives" }
    ]
  },

  sectors: [
    {
      id: "hospitality",
      name: "Hospitality & F&B",
      desc: "Restaurant concepts, menu engineering, kitchen SOPs, guest journey and revenue optimisation.",
      icon: "utensils",
      clients: "Misu, Spice Goa, Passcode Hospitality, Passcode (Pings & Jamun), Resort Blu, Holiday Village"
    },
    {
      id: "realestate",
      name: "Real Estate & Built Environment",
      desc: "High-value property positioning, buyer journey architecture, lifestyle narrative and investor collateral.",
      icon: "building-2",
      clients: "Raysons Group, Loom Crafts, Architectural Developments"
    },
    {
      id: "healthcare",
      name: "Healthcare & Clinical Trust",
      desc: "Clinical communication built around patient education, professional credibility and empathetic design.",
      icon: "activity",
      clients: "RR Skins, Specialty Medical Practices"
    },
    {
      id: "lifestyle",
      name: "Lifestyle & Consumer Brands",
      desc: "Distinct product narratives, luxury craft storytelling, e-commerce ecosystems and creative direction.",
      icon: "sparkles",
      clients: "Loom Crafts Luxury Outdoor, Artisanal Brands"
    },
    {
      id: "entertainment",
      name: "Entertainment & Media",
      desc: "Cultural storytelling, cinema innovation, festival production, event narratives and digital campaigns.",
      icon: "film",
      clients: "PictureTime, Cultural Festivals & Mobile Theatres"
    },
    {
      id: "travel",
      name: "Travel & Tourism",
      desc: "Experiential tourism development, remote community roots, storytelling and high-altitude exploration.",
      icon: "compass",
      clients: "Tourin Ladakh, Experiential Journeys"
    }
  ],

  services: [
    {
      number: "01",
      id: "digital-brand-growth",
      title: "Digital Brand Growth",
      subtitle: "For businesses needing a stronger brand presence, sharper communication and consistent execution — not just a schedule of posts.",
      scope: [
        "Brand Strategy & Market Positioning",
        "Strategic Brand Communication",
        "Content Strategy & Narrative Architecture",
        "Social Media Ecosystem Management",
        "Creative Direction & Visual Identity",
        "Copywriting, Scripting & Thought Leadership",
        "Commercial Photography & High-End Videography",
        "Campaign Development & Launch Rollouts",
        "Meta & Google Performance Advertising",
        "Search Engine Optimization (SEO)",
        "Website Strategy, UI/UX & Execution",
        "High-Intent Lead Generation Systems"
      ],
      timeframe: "Ongoing Partnership or 6–12 Week Sprint",
      deliverableSummary: "Cohesive digital dominance aligning commercial business objectives with cultural brand appeal."
    },
    {
      number: "02",
      id: "hospitality-consulting",
      title: "Hospitality Consulting",
      subtitle: "Where Ārohana departs from conventional agencies: hands-on F&B mastery from operational floors to boardrooms.",
      scope: [
        "Restaurant & Café Concept Development",
        "Menu Engineering & Recipe Standardisation",
        "Pricing & Food-Cost Control Architecture",
        "Kitchen Control & Back-of-House Systems",
        "Standard Operating Procedures (SOPs)",
        "Front-of-House Service & Staff Training",
        "Revenue Optimisation & Average Check Uplift",
        "Zomato & Swiggy Marketplace Optimisation",
        "OTA & Direct Booking Strategy for Resorts",
        "Pre-Launch Setup, Dry Runs & Handover"
      ],
      timeframe: "3–6 Months Sprint or Retainer",
      deliverableSummary: "Profitable, systematically engineered hospitality models that convert guests into brand evangelists."
    },
    {
      number: "03",
      id: "content-production",
      title: "Content & Brand Production",
      subtitle: "When the story needs to be bigger than a post: cinematic institutional films, corporate documentaries and campaign shoots.",
      scope: [
        "Cinematic Corporate & Brand Films",
        "Feature Documentaries & Community Stories",
        "Institutional & Armed Forces Media",
        "Campaign Films & High-Impact Reels",
        "Scriptwriting, Narrative Voice & Treatments",
        "Voice-Over Casting & Audio Direction",
        "On-Ground Shoot Direction in Complex Terrains",
        "Post-Production, Color Grading & Sound Design"
      ],
      timeframe: "Project-based (4–8 Weeks per production)",
      deliverableSummary: "End-to-end production capable of operating in high-pressure institutional and remote terrains."
    }
  ],

  engagementModels: [
    {
      name: "Ongoing Digital Partnership",
      bestFor: "Brands needing continuous strategy, high-grade content, creative direction and multi-platform growth.",
      commitment: "Retainer (Monthly / Annual)",
      keyHighlights: ["Dedicated strategic lead", "Monthly content shoots & execution", "Weekly performance reviews", "Continuous narrative optimization"]
    },
    {
      name: "Hospitality Consulting",
      bestFor: "Restaurants, cafés, resorts and F&B groups needing operational, culinary or commercial intervention.",
      commitment: "Project or Fixed Period",
      keyHighlights: ["Concept-to-launch roadmap", "Menu costing & kitchen SOPs", "Staff service training", "Operational handover"]
    },
    {
      name: "Project Production",
      bestFor: "Films, documentaries, product launches, exhibitions or defined milestone campaigns.",
      commitment: "Milestone-based",
      keyHighlights: ["Full script-to-screen production", "Remote terrain logistics capability", "High-spec cinematography", "Sound & color mastery"]
    },
    {
      name: "Hybrid Engagement",
      bestFor: "Enterprises where deep business consulting and digital communication must move together in lockstep.",
      commitment: "Custom Strategic Alignment",
      keyHighlights: ["Bridging internal operations with external marketing", "Direct founder advisory", "Bespoke resource deployment"]
    }
  ],

  caseStudies: [
    {
      id: "raysons-group",
      title: "Raysons Group",
      headline: "One group. Multiple businesses. Different communication needs.",
      sector: "Real Estate & Hospitality",
      sectorId: "realestate",
      location: "Maharashtra & Goa",
      duration: "Long-term Multi-Year Partnership",
      engagementType: "Ongoing Strategic Brand & Digital Ecosystem",
      image: "assets/raysons.jpg",
      summary: "Restructuring a diversified legacy group into a distinct, modern portfolio across luxury residential, commercial estates, and hospitality ventures.",
      snapshot: {
        sector: "Real Estate, Hospitality & Infrastructure",
        location: "Kolhapur & Goa, India",
        engagement: "Comprehensive Group Brand Architecture & Digital Operations",
        duration: "3+ Years Active Partnership"
      },
      situation: "Raysons Group had built decades of deep commercial goodwill across real estate, industrial infrastructure, and hospitality properties. However, as the group diversified into ultra-luxury residential projects and boutique hospitality assets, their unified communication was fragmenting. High-net-worth homebuyers, business tenants, and hospitality guests were encountering the same legacy corporate voice without tailored distinction.",
      challenge: "The challenge was not simply making newer brochures or running digital ads. It required establishing a clear corporate umbrella that preserved institutional gravitas while giving each vertical—from premium gated enclaves to boutique hotel ventures—its own distinct tone, visual sophistication, and high-conversion customer journey.",
      thinking: "Ārohana restructured the communication hierarchy from the ground up. We separated the parent corporate entity from consumer-facing lifestyle developments. For luxury residential buyers, the messaging pivoted from generic square footage metrics to architectural permanence, privacy, and long-term legacy value. For hospitality assets, we engineered distinct experiential narratives.",
      work: [
        "Redesigned the group brand architecture, creating distinct visual guidelines for each division.",
        "Produced architectural films and lifestyle photo essays focusing on light, materiality, and environment.",
        "Built focused digital lead acquisition funnels targeting qualified high-intent property investors.",
        "Orchestrated ongoing executive communication and quarterly investor reporting narratives."
      ],
      proof: "Achieved seamless group-wide narrative coherence across 4 distinct business verticals. Property launch campaigns reached record organic inquiries from target Tier-1 and regional high-net-worth buyers without relying on discount-led marketing.",
      closing: "Demonstrates how diversified enterprise groups can unify their corporate authority while allowing individual consumer verticals to communicate with emotional precision."
    },
    {
      id: "loom-crafts",
      title: "Loom Crafts",
      headline: "One brand, two very different buying journeys.",
      sector: "Luxury Lifestyle & Built Environment",
      sectorId: "lifestyle",
      location: "Pan-India & International",
      duration: "Strategic Consulting & Production",
      engagementType: "Brand Strategy, Buying Journey Architecture & Content",
      image: "assets/loomcrafts.jpg",
      summary: "Bridging the gap between high-end architectural specifiers (architects, luxury resorts) and discerning retail homeowners.",
      snapshot: {
        sector: "Luxury Outdoor Furniture & Architectural Interiors",
        location: "Pan-India & International Distribution",
        engagement: "Brand Strategy, Specifier Funnels & High-Craft Content",
        duration: "Comprehensive Strategic Engagement"
      },
      situation: "Loom Crafts designs and manufactures world-class outdoor and bespoke architectural furniture engineered to withstand extreme climates without sacrificing refined aesthetics. While their manufacturing prowess was indisputable, their market faced two fundamentally divergent customer mindsets: institutional architects specifying for 5-star resorts, and luxury villa owners seeking curated personal statements.",
      challenge: "A single generic catalogue or social feed failed both audiences. Architects needed material certifications, weather-resistance specifications, CAD compatibility, and institutional proof. Private homeowners needed emotional inspiration, tactile luxury, bespoke finishes, and immediate prestige reassurance.",
      thinking: "Ārohana split the brand engagement into two synchronized pathways. For the B2B architectural world, we developed an editorial design-specifier portal and technical case studies highlighting hotel installations. For the private consumer, we created cinematic lifestyle films showcasing outdoor living as an art form.",
      work: [
        "Created an architectural lookbook and technical specification framework for leading interior designers.",
        "Directed high-end location shoots capturing bespoke outdoor collections in luxury villa settings.",
        "Redesigned digital touchpoints to branch seamlessly into 'Specifier Catalogues' vs 'Private Residence Inquiries'.",
        "Streamlined the consultation and sample-kit fulfillment process for interior designers."
      ],
      proof: "Shortened the specification review cycle with leading hospitality design firms by over 35%. Increased direct private homeowner inquiries for custom residential outdoor suites significantly.",
      closing: "Shows how luxury lifestyle brands can master dual B2B and B2C sales funnels without compromising on singular brand prestige."
    },
    {
      id: "picturetime",
      title: "PictureTime",
      headline: "From cinema promotion to a broader brand story.",
      sector: "Entertainment, Media & Remote Reach",
      sectorId: "entertainment",
      location: "Ladakh, Tribal Belts & Pan-India",
      duration: "Ongoing Content & Narrative Direction",
      engagementType: "Brand Narrative, Documentary Production & Cultural Content",
      image: "assets/picturetime.jpg",
      summary: "Positioning mobile digital inflatable theatres not just as entertainment booths, but as vital cultural and social infrastructure across remote India.",
      snapshot: {
        sector: "Mobile Digital Theatres & Cultural Media",
        location: "High-Altitude Himalayas & Hinterland India",
        engagement: "Strategic Brand Positioning & High-Altitude Documentary",
        duration: "Multi-Campaign Production"
      },
      situation: "PictureTime pioneered the world's highest-altitude mobile inflatable cinema theatres, bringing theatrical releases and government awareness content to Ladakh, remote border regions, and underserved rural geographies. However, industry observers often misconstrued them merely as a novelty projection tent company.",
      challenge: "The brand needed to communicate its true scale: a transformative social infrastructure enterprise delivering entertainment equity, educational reach, and emergency communications to geographies conventional multiplexes could never reach.",
      thinking: "We shifted the focus from 'inflatable screens' to the human spectacle of shared communal joy under starlit Himalayan skies. We produced documentary stories celebrating local communities seeing films in their own valleys, alongside institutional capability demonstrations for state governments and corporate CSR partners.",
      work: [
        "Produced on-ground documentary films capturing the world's highest cinema screening in Ladakh at 11,562 ft.",
        "Developed institutional pitch decks and impact reports for government departments and corporate partners.",
        "Curated cultural storytelling across social and national media outlets celebrating cinema accessibility.",
        "Built event-focused communication ecosystems for film festival integrations in remote locations."
      ],
      proof: "Positioned PictureTime in national and global media conversations as a vital cultural lifeline. Strengthened institutional partnerships with state bodies for public health screenings and educational broadcasts.",
      closing: "Illustrates the power of documentary storytelling in elevating a hardware innovation into an undeniable cultural and social mission."
    },
    {
      id: "she-initiative",
      title: "SHE Initiative",
      headline: "A community initiative built around health, dignity and sustainability.",
      sector: "Institutional & Community",
      sectorId: "lifestyle",
      location: "Ladakh & Remote Himalayan Villages",
      duration: "Documentary Film & Community Communications",
      engagementType: "Institutional Storytelling & Impact Campaign",
      image: "assets/she.jpg",
      summary: "Documenting and elevating grassroots women's health, eco-friendly livelihood initiatives, and sustainable community empowerment in Ladakh.",
      snapshot: {
        sector: "Grassroots Healthcare, Women's Empowerment & Sustainability",
        location: "Leh, Kargil & High Himalayan Villages",
        engagement: "Documentary Production, Community Engagement & Impact Collateral",
        duration: "Field Production & Strategic Outreach"
      },
      situation: "In the fragile ecological and social fabric of remote Ladakh villages, women face unique health, hygiene, and economic challenges during harsh sub-zero winters. The SHE initiative was established to provide organic, biodegradable hygiene solutions alongside skill workshops for women weavers and community leaders.",
      challenge: "Community initiatives often suffer from condescending, pity-driven communication that strips participants of agency. The mandate was to create a dignified, deeply rooted narrative that honored Ladakhi traditions while articulating the vital importance of women's healthcare and sustainable economics.",
      thinking: "Ārohana embedded directly within village community centers to understand the lived reality before picking up a camera. We framed the initiative through resilience, indigenous craft, and inter-generational knowledge rather than deficit.",
      work: [
        "Directed an intimate documentary film in Ladakhi and Hindi highlighting grassroots health ambassadors.",
        "Designed culturally resonant visual education materials explaining sustainable hygiene practices.",
        "Created institutional impact documentation for global humanitarian grants and government bodies.",
        "Orchestrated village-level photo documentation honoring traditional Ladakhi women artisans."
      ],
      proof: "The documentary served as the central centerpiece for expanding the initiative into 12 additional remote villages, securing multi-year backing from institutional foundations.",
      closing: "Demonstrates that empathetic, grounded communication can bridge sensitive community realities with institutional stakeholders without sensationalism."
    },
    {
      id: "misu",
      title: "Misu",
      headline: "Hospitality thinking that goes beyond the dining room.",
      sector: "Hospitality & F&B Consulting",
      sectorId: "hospitality",
      location: "Goa & Bangalore",
      duration: "Full-Stack Hospitality & Brand Engagement",
      engagementType: "Concept Strategy, Kitchen SOPs, Menu Engineering & Digital",
      image: "assets/misu.jpg",
      summary: "Transforming an ambitious Pan-Asian culinary concept into an impeccably engineered, profitable, and culturally buzzworthy dining experience.",
      snapshot: {
        sector: "Contemporary Pan-Asian Dining & Bar",
        location: "Urban Hospitality Hubs",
        engagement: "Turnkey F&B Consulting, Kitchen SOPs & Digital Direction",
        duration: "Comprehensive 9-Month Overhaul & Ongoing Retainer"
      },
      situation: "Misu possessed exceptional culinary ambition, but like many fast-growing contemporary dining concepts, experienced operational friction: fluctuating food costs, kitchen bottlenecks during peak services, inconsistent plating standards, and a social presence that looked like every other sushi restaurant.",
      challenge: "Hospitality cannot be solved with pretty photos alone. If the kitchen ticket times are slow or the food cost exceeds 32%, marketing will only accelerate guest disappointment. The entire ecosystem—from prep checklists to table turns and brand aura—demanded unified engineering.",
      thinking: "Drawing from founder Madhura Hawal's operational heritage at Taj Management Training and Passcode Hospitality (Pings Bia Hoi, Jamun), Ārohana tackled the back-of-house first. Once the kitchen was streamlined and menu yields were locked, we built a magnetic, mood-drenched brand persona.",
      work: [
        "Re-engineered the menu hierarchy, repositioning high-margin signature dim sum and artisanal cocktails.",
        "Created strict kitchen SOPs, portion control sheets, and speed-of-service bar protocols.",
        "Trained service staff on conversational upselling and dish storytelling.",
        "Directed editorial mood-drenched food and cocktail photography highlighting steam, sizzle, and ceramic craftsmanship.",
        "Revamped Zomato/Swiggy packaging to preserve temperature and aesthetic presentation in transit."
      ],
      proof: "Food cost reduced by 4.2% within 90 days while average check per cover increased by 18%. Guest retention and table turnover during weekend peak hours improved by 22%.",
      closing: "Proves that true hospitality consulting requires deep operational grit inside the kitchen combined with effortless visual charisma on the floor."
    },
    {
      id: "rr-skins",
      title: "RR Skins",
      headline: "Making a specialised healthcare offering easier to understand and trust.",
      sector: "Healthcare & Clinical Trust",
      sectorId: "healthcare",
      location: "Maharashtra",
      duration: "Strategic Positioning & Clinical Brand",
      engagementType: "Brand Strategy, Patient Education & Digital Ecosystem",
      image: "assets/rrskins.jpg",
      summary: "Demystifying clinical dermatology and medical aesthetics through scientific clarity, dignified patient education, and tranquil luxury design.",
      snapshot: {
        sector: "Dermatology, Trichology & Medical Aesthetics",
        location: "Tier-1 / Tier-2 Medical Hub",
        engagement: "Medical Trust Positioning, Patient Journey & Digital Presence",
        duration: "Brand Architecture & Ongoing Digital Growth"
      },
      situation: "Medical dermatology and aesthetic clinics often face severe consumer skepticism due to aggressive commercial sales tactics in the beauty industry. RR Skins operated with exceptional clinical ethics, state-of-the-art laser technology, and board-certified medical doctors, yet their prospective patients felt overwhelmed by medical jargon.",
      challenge: "How do you communicate advanced clinical procedures—from fractional CO2 lasers to medical peels—without either sounding cold and intimidating, or cheapening the medical practice into a generic salon spa?",
      thinking: "We anchored RR Skins on the pillar of 'Clinical Trust & Transparent Science'. We replaced fear-based marketing with clear, calm educational breakdowns of skin physiology, realistic treatment timelines, and ethical consultations.",
      work: [
        "Developed a serene visual identity utilizing warm travertine tones, minimalist typography, and clinical precision.",
        "Created an educational video series featuring the doctors explaining procedures in simple, honest terminology.",
        "Restructured the appointment booking journey to emphasize personalized skin diagnostics over rushed packages.",
        "Designed hygienic, elegant patient post-procedure care cards and digital follow-up communication."
      ],
      proof: "Consultation appointment bookings grew by 45% within 4 months, with over 68% of new patients specifically citing the clinic's educational videos as the reason for choosing RR Skins over competitors.",
      closing: "Highlights how healthcare communication thrives when clinical authority is translated through transparent empathy and serene aesthetic design."
    }
  ],

  specialProjects: {
    headline: "Indian Army & Institutional Projects",
    body: "From remote-community initiatives in Ladakh to films and communication projects for the Indian Army, Ārohana has also worked on briefs where the environment, audience and responsibility demanded a different level of preparation.",
    image: "assets/army_projects.jpg",
    divisions: [
      { name: "14 Corps (Fire & Fury Corps)", desc: "High-altitude strategic documentary & operational milestone documentation in Ladakh." },
      { name: "Operation Sadbhavana", desc: "Community bridge initiatives, rural welfare documentation and civic-military integration media." },
      { name: "Operation Sampark", desc: "Border road infrastructure storytelling, engineering triumphs in hostile terrain." },
      { name: "Western Command Investiture Ceremony", desc: "Official ceremony media production, gallantry citation narratives and institutional films." },
      { name: "12 Rashtriya Rifles (Delta Force)", desc: "High-responsibility institutional communication under specialized operational environments." }
    ],
    principle: "The environments were different. The audiences were different. The responsibility was different. And that experience reinforced something we already knew: you cannot create meaningful communication without understanding the people, the environment and the reality behind it."
  },

  tourin: {
    title: "Tourin",
    tagline: "Travel beyond the itinerary.",
    subhead: "An experiential travel brand beginning with Ladakh — built from lived experience rather than a generic destination catalogue.",
    image: "assets/tourin_ladakh.jpg",
    stats: "15+ verified journeys completed (individuals, private groups, and a 20-biker expedition)",
    whyTourin: "Tourin came from a simple realisation: the Ladakh people experience and the Ladakh most itineraries sell are not always the same. There is the Ladakh of famous passes, lakes and photographs. And then there is the place behind them — its people, food, stories, homes, landscapes, silences and everyday life. Tourin was created to make space for the second one.",
    beliefs: [
      "A good trip should leave you with more than photographs — it should give you an intimate sense of where you were.",
      "Eating local meals you have never tried, staying in rooted architecture, and spending time with local families.",
      "Taking slower, deliberate routes and allowing space for the unexpected rather than racing through tick-boxes.",
      "Respecting high-altitude pacing, community dignity, and Himalayan environmental fragility."
    ],
    experiences: [
      {
        title: "The High Valley Monastic Trail",
        days: "7 Days / 6 Nights",
        focus: "Hidden Gompas, silent morning chants, Ladakhi culinary home visits & Hemis Shukpachan walks."
      },
      {
        title: "Nubra & Changthang High Plateau",
        days: "8 Days / 7 Nights",
        focus: "Remote nomadic Changpa settlements, high-altitude salt lakes, starlit glamping & pristine passes."
      },
      {
        title: "Bespoke Cultural & Motor Expeditions",
        days: "Custom Duration",
        focus: "Tailored private family journeys or group motorcycle expeditions with complete mechanical and medical backup."
      }
    ]
  },

  founder: {
    name: "Madhura Hawal",
    role: "Founder & Strategic Director",
    image: "assets/founder_madhura.jpg",
    headline: "I didn't plan to build Ārohana.",
    intro: "The road to Ārohana was anything but straight. I built it after spending years inside businesses — learning what makes them work, what makes them struggle, and what people see only after they become responsible for the whole thing. Today, Ārohana brings together that experience with strategy, communication, creativity and execution — for businesses that are serious about what they are building.",
    milestones: [
      {
        phase: "01",
        year: "Early Foundation",
        title: "Hospitality in Muscat & Goa",
        content: "My first world was hospitality. I studied Hospitality Management in Muscat before completing my degree in Goa. While I was studying in Goa, I was selected among the Top 13 finalists from the West Zone for Femina Miss India — an unexpected opportunity that took me into a completely different world and taught me a great deal about confidence, communication and being comfortable outside my comfort zone."
      },
      {
        phase: "02",
        year: "Executive Rigor",
        title: "Taj Management Training & Mother India Cafe",
        content: "Not long after, I was selected as one of just 16 students from across India for the prestigious Taj Management Training Programme. Over the years, I worked in Muscat, returned to Kolhapur and eventually decided to build something of my own — Mother India Cafe. Running a café teaches you things no business textbook can quite prepare you for. You learn about people, margins, suppliers, staff, customers, bad days, good days and the uncomfortable reality that every decision eventually shows up in the numbers."
      },
      {
        phase: "03",
        year: "Operations at Scale",
        title: "Passcode Hospitality & Latambarcem Brewers",
        content: "While the café was still running, another opportunity took me to Goa. I joined Passcode Hospitality as Operations Head and worked on two upcoming restaurants, Pings Bia Hoi and Jamun. That experience took me deeper into the machinery behind a hospitality business — not just how a brand looks, but how an experience is actually built. Later, I moved into institutional business and sales with Latambarcem Brewers Private Limited, working across Goa and Delhi. It gave me another perspective on business: relationships, commercial thinking, negotiation and growth."
      },
      {
        phase: "04",
        year: "The Pivot",
        title: "COVID Detour & The Birth of Ārohana",
        content: "And then, like it did for so many people, COVID changed the direction of things. The café had to close. My work in hospitality was disrupted. What came next wasn't a carefully planned five-year strategy. It was the beginning of a different kind of work. That work gradually became Ārohana. What began with digital marketing projects slowly expanded across resorts, real estate, healthcare, and consumer businesses."
      },
      {
        phase: "05",
        year: "High Responsibility",
        title: "High-Altitude Institutional Work in Ladakh",
        content: "And sometimes the brief took us somewhere completely unexpected. My work in Ladakh became one of those chapters. There, I worked on projects associated with the Indian Army, including work connected with 14 Corps, Fire & Fury Corps, Operation Sadbhavana and Operation Sampark. That work eventually extended to Western Command and 12 Rashtriya Rifles under Delta Force. That experience reinforced something I had already learnt from hospitality: you cannot create meaningful communication without understanding the people, the environment and the reality behind it."
      },
      {
        phase: "06",
        year: "Today",
        title: "Where Ārohana Stands",
        content: "A brand is only as strong as the thinking behind it. That thinking comes from years of being inside businesses — building, running, selling, solving and starting again. Today, it is what we bring to the businesses we work with. If you're building something worth building, let's talk."
      }
    ]
  }
};

// Make accessible to window
if (typeof window !== 'undefined') {
  window.AROHANA_DATA = AROHANA_DATA;
}
