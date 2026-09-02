export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  headline: string;
  sector: string;
  sectorId: string;
  location: string;
  duration: string;
  engagementType: string;
  image: string;
  summary: string;
  tags: string[];
  snapshot: {
    sector: string;
    location: string;
    engagement: string;
    duration: string;
  };
  situation: string;
  challenge: string;
  thinking: string;
  work: string[];
  proof: string;
  closing: string;
}

export interface JournalArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  summary: string;
  content: string[];
}

export interface DirectoryProject {
  name: string;
  sector: string;
  sectorId: string;
  scope: string;
}

export const AROHANA_MASTER_CONTENT = {
  brand: {
    name: "ĀROHANA",
    tagline: "We build brands, businesses & experiences.",
    positioning: "Ārohana works with businesses where communication cannot be separated from the business itself. We combine commercial thinking, sector experience and creative execution to help brands become clearer, more credible and more relevant to the people they need to reach. Depending on the brief, that can mean building a digital brand, running an ongoing social ecosystem, creating a film, fixing a restaurant’s menu and operating systems, or taking a project from an idea to on-ground execution.",
    email: "founder@byarohana.com",
    phone: "+91 8380092241",
    locations: ["Kolhapur", "Goa", "Ladakh", "Delhi NCR"],
  },

  pointOfView: {
    statement: "Some businesses need better marketing. Others need a better way of thinking about the business itself.",
    explanation: "Ārohana works where those two things meet. We bring the commercial context, sector understanding and creative execution needed to move from an idea to something people can actually see, understand and act on.",
    visualCaption: "Madhura Hawal directing on-ground project execution in Ladakh."
  },

  threeWaysWeWork: [
    {
      number: "01",
      id: "digital-brand-growth",
      title: "Digital Brand Growth",
      shortDesc: "Brand and communication strategy, social ecosystems, content, creative direction, production, performance and platform execution.",
      image: "/assets/raysons.jpg",
      scope: [
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
        "Lead generation"
      ],
      note: "Performance marketing, SEO, websites and lead generation are specialized capabilities deployed when the brief demands them."
    },
    {
      number: "02",
      id: "hospitality-consulting",
      title: "Hospitality Consulting",
      shortDesc: "Restaurant concept, menu development, food cost, pricing, SOPs, staffing, kitchen control, revenue optimisation and marketing.",
      image: "/assets/misu.jpg",
      scope: [
        "Restaurant / café concept development",
        "Menu creation and menu engineering",
        "Recipe and product development",
        "Pricing and food-cost control",
        "Kitchen and operational systems",
        "SOPs & standard operating checklists",
        "Staff training & front-of-house service",
        "Revenue optimisation & check uplift",
        "Social-media and digital marketing",
        "Zomato / Swiggy management where required",
        "OTA consulting and digital distribution",
        "Operational setup and handover"
      ],
      note: "Relevant experience includes Misu, Spice Goa, Khana Khazana, Khau Gali, Resort Blu and Holiday Village."
    },
    {
      number: "03",
      id: "content-production",
      title: "Content & Brand Production",
      shortDesc: "Films, documentaries, corporate/institutional videos, campaign content, scripting, shoots and post-production.",
      image: "/assets/army_projects.jpg",
      scope: [
        "Corporate films",
        "Brand films",
        "Documentaries",
        "Institutional films",
        "Campaign films",
        "Promotional films and reels",
        "Scripting",
        "Voice-over",
        "Shoot direction in complex terrains",
        "Editing",
        "Sound and post-production"
      ],
      note: "Proof: SHE documentary, Western Command Investiture Ceremony, Indian Army project videos, PictureTime festival content, Raysons industrial film."
    }
  ],

  caseStudies: [
    {
      id: "raysons-group",
      title: "Raysons Group",
      client: "RAYSONS GROUP",
      headline: "One group. Multiple businesses. Different communication needs.",
      sector: "Real Estate & Hospitality",
      sectorId: "realestate",
      location: "Maharashtra & Goa",
      duration: "3+ Years Multi-Year Partnership",
      engagementType: "Long-term Group Brand Architecture & Digital Operations",
      image: "/assets/raysons.jpg",
      summary: "Restructuring a diversified legacy group into a distinct, modern portfolio across luxury residential, commercial estates, and hospitality ventures.",
      tags: ["Real Estate", "Hospitality", "Brand Architecture", "Industrial Film"],
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
        "Redesigned group brand architecture, creating distinct visual guidelines for each division.",
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
      client: "LOOM CRAFTS",
      headline: "One brand, two very different buying journeys.",
      sector: "Luxury Lifestyle & Built Environment",
      sectorId: "lifestyle",
      location: "Pan-India & International",
      duration: "Strategic Consulting & Production",
      engagementType: "Brand Strategy, Buying Journey Architecture & Content",
      image: "/assets/loomcrafts.jpg",
      summary: "Bridging the gap between high-end architectural specifiers (architects, luxury resorts) and discerning retail homeowners across furniture and prefab structures.",
      tags: ["Luxury Outdoor", "Prefab Architecture", "Specifier Funnels", "Content"],
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
      client: "PICTURETIME",
      headline: "From cinema promotion to a broader brand story.",
      sector: "Entertainment & Media",
      sectorId: "entertainment",
      location: "Ladakh & Hinterland India",
      duration: "Ongoing Content & Narrative Direction",
      engagementType: "Brand Narrative, Documentary Production & Cultural Content",
      image: "/assets/picturetime.jpg",
      summary: "Positioning mobile digital inflatable theatres not just as entertainment booths, but as vital cultural and social infrastructure across remote India.",
      tags: ["Mobile Cinema", "Himalayas", "Documentary Film", "Event Content"],
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
      client: "SHE INITIATIVE",
      headline: "A community initiative built around health, dignity and sustainability.",
      sector: "Institutional & Community",
      sectorId: "lifestyle",
      location: "Ladakh & Remote Himalayan Villages",
      duration: "Documentary Film & Community Communications",
      engagementType: "Institutional Storytelling & Impact Campaign",
      image: "/assets/she.jpg",
      summary: "Documenting and elevating grassroots women's health, eco-friendly livelihood initiatives, and sustainable community empowerment in Ladakh.",
      tags: ["Grassroots", "Women Empowerment", "Documentary", "Sustainability"],
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
      client: "MISU",
      headline: "Hospitality thinking that goes beyond the dining room.",
      sector: "Hospitality & F&B Consulting",
      sectorId: "hospitality",
      location: "Goa & Bangalore",
      duration: "Full-Stack Hospitality & Brand Engagement",
      engagementType: "Concept Strategy, Kitchen SOPs, Menu Engineering & Digital",
      image: "/assets/misu.jpg",
      summary: "Transforming an ambitious Pan-Asian culinary concept into an impeccably engineered, profitable, and culturally buzzworthy dining experience.",
      tags: ["Hospitality Consulting", "Menu Engineering", "Kitchen SOPs", "Brand Direction"],
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
      client: "RR SKINS",
      headline: "Making a specialised healthcare offering easier to understand and trust.",
      sector: "Healthcare & Clinical Trust",
      sectorId: "healthcare",
      location: "Maharashtra",
      duration: "Strategic Positioning & Clinical Brand",
      engagementType: "Brand Strategy, Patient Education & Digital Ecosystem",
      image: "/assets/rrskins.jpg",
      summary: "Demystifying clinical dermatology and medical aesthetics through scientific clarity, dignified patient education, and tranquil luxury design.",
      tags: ["Healthcare Trust", "Dermatology", "Patient Education", "Medical Branding"],
      snapshot: {
        sector: "Dermatology, Trichology & Medical Aesthetics",
        location: "Medical Hub",
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

  clientDirectory: [
    { name: "Neora Deck", sector: "Hospitality & F&B", sectorId: "hospitality", scope: "Deck concept, dining experience & launch direction" },
    { name: "Blu Resorts", sector: "Hospitality & F&B", sectorId: "hospitality", scope: "Resort digital distribution, OTA consulting & content" },
    { name: "Qubice", sector: "Hospitality & F&B", sectorId: "hospitality", scope: "F&B branding, interior alignment & social rollout" },
    { name: "Kanopy", sector: "Hospitality & F&B", sectorId: "hospitality", scope: "Dining venue narrative, guest experience & launch" },
    { name: "Sorriso", sector: "Hospitality & F&B", sectorId: "hospitality", scope: "Italian dining positioning, menu engineering & visual identity" },
    { name: "Spice Goa", sector: "Hospitality & F&B", sectorId: "hospitality", scope: "Heritage culinary positioning & ongoing digital presence" },
    { name: "Khana Khazana", sector: "Hospitality & F&B", sectorId: "hospitality", scope: "Kitchen operating systems, recipe costing & staff training" },
    { name: "Khau Gali", sector: "Hospitality & F&B", sectorId: "hospitality", scope: "Street food collective concept & revenue systems" },
    { name: "Citron", sector: "Real Estate & Built", sectorId: "realestate", scope: "Architectural property branding & luxury investor collaterals" },
    { name: "DTK Karekar Jewellery", sector: "Lifestyle & Consumer", sectorId: "lifestyle", scope: "Fine jewelry luxury storytelling & digital ecosystem" },
    { name: "Fraganta", sector: "Lifestyle & Consumer", sectorId: "lifestyle", scope: "Artisanal perfumery positioning & packaging narrative" },
    { name: "Holiday Village", sector: "Travel & Tourism", sectorId: "travel", scope: "Destination resort positioning & guest journey design" },
    { name: "Operation Sampark", sector: "Institutional / Armed Forces", sectorId: "institutional", scope: "Border road infrastructure documentation & homestay training" },
    { name: "14 Corps Ladakh", sector: "Institutional / Armed Forces", sectorId: "institutional", scope: "High-altitude strategic documentary & operational milestones" }
  ],

  brandStrip: [
    "RAYSONS GROUP",
    "PICTURETIME",
    "LOOM CRAFTS",
    "NEORA DECK",
    "MISU",
    "RR SKINS",
    "BLU RESORTS",
    "QUBICE",
    "KANOPY",
    "CITRON",
    "DTK KAREKAR JEWELLERY",
    "SPICE GOA",
    "TOURIN LADAKH",
    "LATAMBARCEM BREWERS"
  ],

  specialProjects: {
    title: "The work that doesn't fit a standard agency box.",
    copy: "From remote-community initiatives in Ladakh to films and communication projects for the Indian Army, Ārohana has also worked on briefs where the environment, audience and responsibility demanded a different level of preparation.",
    images: [
      { url: "/assets/she.jpg", label: "SHE Initiative Ladakh", caption: "Community hygiene & livelihood training in high valleys" },
      { url: "/assets/army_projects.jpg", label: "14 Corps & Western Command", caption: "High-altitude military documentation & gallantry films" },
      { url: "/assets/tourin_ladakh.jpg", label: "Operation Sampark & Homestays", caption: "Remote border tourism infrastructure & community integration" }
    ],
    cta: "Explore selected projects"
  },

  tourin: {
    heroHeading: "Travel beyond the itinerary.",
    heroSubhead: "Some places are better experienced when you stop trying to see everything. Tourin creates experiential journeys for travellers who want more than a checklist of sights — beginning with Ladakh.",
    proof: "15+ separate bookings/trips so far (including a 20-biker expedition).",
    whyTourin: "Tourin came from a simple realisation: the Ladakh people experience and the Ladakh most itineraries sell are not always the same. There is the Ladakh of famous passes, lakes and photographs. And then there is the place behind them — its people, food, stories, homes, landscapes, silences and everyday life. Tourin was created to make space for the second one. Not by avoiding the places people want to see, but by changing the way the journey is experienced.",
    whatWeBelieve: "A good trip should leave you with more than photographs. It should give you a sense of where you were. That can mean eating something you have never tried, spending time with a local family, understanding a tradition, staying somewhere connected to its surroundings, taking a slower route, or simply having enough time to notice the place instead of rushing through it. We are interested in travel that feels personal, considered and rooted — not travel that is simply packed with more stops.",
    whyLadakh: "Ladakh is where Tourin begins because it is a place we know closely enough to design experiences around more than the obvious itinerary. The first journeys are built around exploration, culture, landscapes and meaningful encounters — with enough structure to make the trip comfortable and enough space for the unexpected.",
    whoIsItFor: [
      "Travellers who are curious rather than purely checklist-driven.",
      "Explorers who want to understand a destination, not only photograph it.",
      "People who value local experiences and thoughtful pacing.",
      "Small groups, couples, families or individual travellers looking for a more personal journey.",
      "Travellers who want professional planning without feeling like they are being moved through a fixed tourist circuit."
    ],
    experiences: [
      {
        title: "The High Valley Monastic Trail",
        duration: "7 Days / 6 Nights",
        desc: "Hidden Gompas, silent morning chants, Ladakhi culinary home visits & Hemis Shukpachan walks."
      },
      {
        title: "Nubra & Changthang High Plateau",
        duration: "8 Days / 7 Nights",
        desc: "Remote nomadic Changpa settlements, high-altitude salt lakes, starlit glamping & pristine passes."
      },
      {
        title: "Bespoke Cultural & Motor Expeditions",
        duration: "Custom Duration",
        desc: "Tailored private family journeys or group motorcycle expeditions with complete mechanical and medical backup."
      }
    ]
  },

  founderStory: {
    heroStatement: "The road to Ārohana was anything but straight.",
    heroSubtext: "I built it after spending years inside businesses — learning what makes them work, what makes them struggle, and what people see only after they become responsible for the whole thing. Today, Ārohana brings together that experience with strategy, communication, creativity and execution — for businesses that are serious about what they are building.",
    chapters: [
      {
        id: "hospitality",
        title: "IT STARTED WITH HOSPITALITY",
        text: [
          "My first world was hospitality.",
          "I studied Hospitality Management in Muscat before completing my degree in Goa. While I was studying in Goa, I was selected among the Top 13 finalists from the West Zone for Femina Miss India — an unexpected opportunity that took me into a completely different world and taught me a great deal about confidence, communication and being comfortable outside my comfort zone. Not long after, I was selected as one of just 16 students from across India for the Taj Management Training Programme.",
          "Over the years, I worked in Muscat, returned to Kolhapur and eventually decided to build something of my own — Mother India Cafe. Running a café teaches you things no business textbook can quite prepare you for. You learn about people, margins, suppliers, staff, customers, bad days, good days and the uncomfortable reality that every decision eventually shows up in the numbers.",
          "While the café was still running, another opportunity took me to Goa. I joined Passcode Hospitality as Operations Head and worked on two upcoming restaurants, Pings Bia Hoi and Jamun. That experience took me deeper into the machinery behind a hospitality business — not just how a brand looks, but how an experience is actually built.",
          "Later, I moved into institutional business and sales with Latambarcem Brewers Private Limited, working across Goa and Delhi. It gave me another perspective on business: relationships, commercial thinking, negotiation and growth.",
          "By then, I had understood something that would eventually become central to Ārohana: a business can have a great-looking brand and still have a problem underneath it. And sometimes what looks like a marketing problem isn't a marketing problem at all."
        ],
        image: "/assets/misu.jpg",
        caption: "Passcode Hospitality & restaurant operations in Goa"
      },
      {
        id: "detours",
        title: "THERE WERE A FEW UNEXPECTED DETOURS",
        text: [
          "And then, like it did for so many people, COVID changed the direction of things.",
          "The café had to close. My work in hospitality was disrupted. What came next wasn't a carefully planned five-year strategy. It was the beginning of a different kind of work.",
          "That work gradually became Ārohana."
        ],
        image: "/assets/founder_madhura.jpg",
        caption: "Madhura Hawal, Founder & Strategic Director"
      },
      {
        id: "army-chapter",
        title: "AND THEN, THE WORK GOT INTERESTING",
        text: [
          "What began with digital marketing projects slowly expanded.",
          "We found ourselves working with restaurants and resorts, real-estate businesses, healthcare brands, consumer businesses and entertainment companies. Sometimes the requirement was a brand strategy. Sometimes it was a complete digital presence. Sometimes it was a campaign, a film, a new menu or an operational problem inside a restaurant.",
          "And sometimes the brief took us somewhere completely unexpected.",
          "My work in Ladakh became one of those chapters.",
          "There, I worked on projects associated with the Indian Army, including work connected with 14 Corps, Fire & Fury Corps, Operation Sadbhavana and Operation Sampark. That work eventually extended to other Army environments as well, including Western Command and 12 Rashtriya Rifles under Delta Force.",
          "The environments were different. The audiences were different. The responsibility was different. And that experience reinforced something I had already learnt from hospitality: you cannot create meaningful communication without understanding the people, the environment and the reality behind it."
        ],
        image: "/assets/army_projects.jpg",
        caption: "14 Corps High-Altitude Operations & Field Documentation, Ladakh"
      },
      {
        id: "today",
        title: "WHERE ĀROHANA STANDS TODAY",
        text: [
          "What remains constant is the standard: clear thinking, sector-aware strategy, strong creative work and disciplined execution — brought together to make the business more visible, more relevant and more valuable to the people it is trying to reach.",
          "That is also why our work can move from a real-estate brand to a healthcare practice, from a restaurant to a consumer brand, or from a commercial campaign to a project in an entirely different environment. The category changes. The thinking has to change with it.",
          "The work may begin with a brand question, a business challenge or simply the sense that something is not working as it should. From there, strategy, communication, creative and execution come together around what the business actually needs — rather than around a fixed list of deliverables.",
          "We work with businesses at points where a standard agency approach is not enough — when a brand needs sharper positioning, a stronger market presence, a more deliberate digital strategy, or a hospitality business needs to rethink the experience it is creating.",
          "Today, Ārohana sits at the intersection of brand thinking, business understanding and execution."
        ],
        image: "/assets/raysons.jpg",
      }
    ]
  },

  stats: [
    { number: "15+", label: "EXPEDITIONS COMPLETED", sub: "TOURIN EXPERIENTIAL LADAKH" },
    { number: "6+", label: "CORE COMMERCIAL SECTORS", sub: "FROM F&B TO BUILT REAL ESTATE" },
    { number: "100%", label: "ON-GROUND REALITY", sub: "DIRECT STRATEGY & FIELDWORK" },
    { number: "5+", label: "YEARS OF PROVEN IMPACT", sub: "ACROSS HOSPITALITY & GROWTH" }
  ],

  journalArticles: [
    {
      id: "hospitality-fnb-profitability",
      title: "Why Most Restaurant Marketing Fails in the Kitchen",
      category: "HOSPITALITY",
      date: "MAY 06, 2024",
      readTime: "4 MIN READ",
      image: "/assets/misu.jpg",
      summary: "If your food cost is 38% and your table turns are 85 minutes, running Instagram ads won't save the quarter. Why operations and communication must move together.",
      content: [
        "In hospitality, marketing is the last mile, not the first.",
        "When an owner notices slow revenue, the reflexive move is to hire a social media agency to take prettier photographs. But if the kitchen ticket times are erratic or portion control is absent, marketing only accelerates guest disappointment.",
        "At Ārohana, we approach hospitality from the inside out: fixing menu engineering, kitchen SOPs, and service rhythm before turning on the brand megaphone."
      ]
    },
    {
      id: "high-altitude-communication",
      title: "High-Altitude Environments: Why Context Dictates Communication",
      category: "STRATEGY",
      date: "APR 24, 2024",
      readTime: "5 MIN READ",
      image: "/assets/army_projects.jpg",
      summary: "Working with 14 Corps and remote border communities taught us that communication cannot be separated from the terrain, the culture, and the operational reality.",
      content: [
        "When producing documentation in Ladakh at 14,000 ft, every assumption you made in a studio breaks down.",
        "The light behaves differently, the people communicate with different subtleties, and institutional credibility requires zero theatrical exaggeration.",
        "This level of discipline now informs everything we do for consumer and corporate brands alike."
      ]
    },
    {
      id: "tourin-ladakh-philosophy",
      title: "Tourin: Designing Travel Beyond the Generic Itinerary",
      category: "TRAVEL",
      date: "APR 12, 2024",
      readTime: "3 MIN READ",
      image: "/assets/tourin_ladakh.jpg",
      summary: "The Ladakh most tourists experience is a checklist of passes. How we built an experiential brand centered on lived moments and quiet encounters.",
      content: [
        "Tourin was born from a realization that travellers wanted depth over speed.",
        "By slowing down and introducing guests to local weavers, family kitchens, and silent monasteries, we transformed a commodity tour into an unforgettable emotional memory."
      ]
    }
  ]
};

export const AROHANA_CONTENT = AROHANA_MASTER_CONTENT;

