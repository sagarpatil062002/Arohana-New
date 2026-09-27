import {
  CaseStudyItem,
  WorkDirectoryItem,
  TourinPackageItem,
  ArmyProjectItem,
  ClientLogoItem,
  HomePageSingleton,
  AboutPageSingleton,
  ServicesPageSingleton,
  SeoMetadataCollection,
  CrmInquiry,
} from '@/types/cms';

export const SEED_CASE_STUDIES: CaseStudyItem[] = [
  {
    clientName: 'Raysons Group',
    slug: 'raysons-group',
    heroBusinessStatement: 'One relationship. Three very different businesses.',
    heroMedia: '/images/case-studies/raysons/neora-1.jpg',
    heroMediaCaption: 'Neora Deck rooftop hospitality & on-ground execution — the origin of Ārohana’s partnership with Raysons Group.',
    snapshot: {
      sector: 'Multi-Entity Group (Hospitality, Real Estate & Casting)',
      location: 'Kolhapur & Western Maharashtra',
      engagementType: 'Relationship-Led Multi-Entity Partnership',
      duration: 'Ongoing Retainers + Specialised Production Project',
      coreCapabilities: [
        'Content Strategy & Planning',
        'Full-Scope Social Media Management',
        'Architectural & Lifestyle Shoots',
        'Technical Scripting & Video Direction',
        'Corporate Presentation Film',
      ],
    },
    theSituation: [
      'Ārohana’s relationship with Raysons Group began with Neora Deck, the group’s hospitality business.',
      'What started there grew into a broader engagement with the group’s real-estate business, where we manage the complete social-media presence — from strategy and content planning to shoots, scripting, design, editing and publishing.',
      'The third assignment was different again: a corporate film for the group’s casting business, created for prospective clients.',
    ],
    theRealChallenge: [
      'The value of the relationship is not a single campaign. It is the confidence to bring the same strategic and creative partner into businesses with completely different audiences and communication needs.',
      'The story is not ‘one client, one brief’. It is a relationship that expanded across three very different businesses within the Raysons Group, demonstrating trust, range and long-term execution without making unsupported claims.',
    ],
    theThinking: [
      'Lead with the relationship story, not a generic service list.',
      'Different businesses require different communication approaches: Neora Deck demanded vibrant experiential lifestyle content, Raysons Real Estate required credibility, architecture and development quality, while the Casting vertical required a focused corporate industrial film.',
      'Maintain strategy-led execution across all touchpoints rather than forcing every business into the same generic social-media template.',
    ],
    theWork: [
      {
        workstreamTitle: 'Neora Deck (Hospitality)',
        workstreamDetails:
          'For Neora Deck, Ārohana handles the complete social-media function — content calendar, concepts, creative direction, shoots, scripting, graphic design, video editing, posting and ongoing communication.',
        bullets: [
          'Content calendar & monthly concepts',
          'Creative direction & live shoots',
          'Scripting & graphic design',
          'Video editing & community publishing',
        ],
      },
      {
        workstreamTitle: 'Raysons Real Estate',
        workstreamDetails:
          'The real-estate brief required a different communication language built around projects, credibility, architecture, development and business quality. Ārohana manages the complete social-media process: strategy, calendars, concepts, shoots, scripts, design, editing and publishing.',
        bullets: [
          'Complete social-media process & strategy',
          'Architectural & development site shoots',
          'Professional representation for target property buyers',
          'Consistent digital presence across milestones',
        ],
      },
      {
        workstreamTitle: 'Casting / Industrial Film',
        workstreamDetails:
          'A focused corporate film for presentations to prospective clients in the casting industry. Ārohana handled the concept, scripting and production direction through to final post-production.',
        bullets: [
          'Focused B2B client presentation film',
          'Concept, technical scripting & narrative',
          'Factory floor & molten casting shoot direction',
          'End-to-end post-production & sound design',
        ],
      },
    ],
    proofOutcomes: [
      {
        metricOrChange: 'Long-Term Relationship Growth',
        description: 'Expanded organically from hospitality into group real estate and specialized industrial production.',
      },
      {
        metricOrChange: 'Tailored Communication Systems',
        description: 'Distinct digital languages built specifically around how each business’s target audience evaluates and buys.',
      },
      {
        metricOrChange: 'Agile Execution Capacity',
        description: 'Seamless capability to manage ongoing social retainers as well as focused corporate film production.',
      },
    ],
    gallery: [
      {
        src: '/images/case-studies/raysons/neora-1.jpg',
        caption: 'Neora Deck: Rooftop ambiance and experiential dining environment.',
        alt: 'Neora Deck rooftop space and guest ambiance',
      },
      {
        src: '/images/case-studies/raysons/realestate-1.jpg',
        caption: 'Raysons Real Estate: Architectural scale and project credibility.',
        alt: 'Raysons Real Estate architectural development',
      },
      {
        src: '/images/case-studies/raysons/casting-hero.jpg',
        caption: 'Casting Film: Molten casting and foundry floor cinematography.',
        alt: 'Raysons casting facility and industrial production',
      },
    ],
    seo: {
      metaTitle: 'Raysons Group Case Study | One Relationship. Three Very Different Businesses.',
      metaDescription:
        'How Ārohana’s relationship with Raysons Group expanded across Neora Deck, real estate, and casting film production.',
      ogImage: '/images/case-studies/raysons/neora-1.jpg',
    },
    tags: ['Relationship-Led Strategy', 'Hospitality Ecosystem', 'Real Estate Communication', 'Industrial Film Production'],
  },
  {
    clientName: 'Loom Crafts',
    slug: 'loom-crafts',
    heroBusinessStatement: 'One brand. Two businesses. A communication system built around how people actually buy.',
    heroMedia: '/images/case-studies/loom/loom-hero.jpg',
    heroMediaCaption: 'Loom Crafts dual ecosystem — outdoor luxury furniture & high-performance prefab modular architecture.',
    snapshot: {
      sector: 'Luxury Outdoor Furniture & Modular Prefab Living',
      location: 'Delhi NCR, Bangalore & Pan-India',
      engagementType: 'Ongoing Digital Partnership',
      duration: 'Multi-year engagement',
      coreCapabilities: [
        'Content Strategy & Calendars',
        'Creative Direction & Graphic Design',
        'Reels & Video Production',
        'Instagram, Facebook, LinkedIn & YouTube',
        'Exhibition & Open-House Communication',
      ],
    },
    theSituation: [
      'Loom Crafts operates across premium furniture and prefab/modular homes. Both sit under one brand, but the customer questions are different.',
      'Ārohana manages the digital communication across Instagram, Facebook, LinkedIn and YouTube, alongside content strategy, design, scripting, reels, posting and production coordination.',
    ],
    theRealChallenge: [
      'Furniture needs to create desire while communicating design, material, quality and how a piece lives in a space. Prefab needs to reduce uncertainty around a more technical purchase: what is possible, how it works, how long it takes and what the finished result looks like.',
      'The common mistake would be to make both verticals product catalogues. The stronger opportunity was to make the content help people understand the category and imagine themselves buying into it.',
    ],
    theThinking: [
      'Furniture communication leans into spaces, lifestyle, design details, materials, product stories and the finished experience.',
      'Prefab communication leans into projects, on-site construction, factory processes, installation, educational content and answers to practical buyer questions. Internal monthly reporting supports this direction: project walkthroughs, on-site construction videos and educational prefab content were identified as stronger content, while feature/specification-only posts were less effective.',
      'Events as part of the system: D-ARC Bengaluru and the Raipur Open House are not the case study themselves. They are examples of how the ongoing system expands when the brand has an important physical moment.',
    ],
    theWork: [
      {
        workstreamTitle: 'Furniture Desire & Lifestyle Narrative',
        workstreamDetails:
          'Space-led storytelling, material tactile close-ups, weather-testing proofs, and lifestyle designer showcases across Instagram & Facebook.',
        bullets: [
          'Spatial daylight and twilight staging',
          'Material provenance & weave craftsmanship',
          'Lifestyle and residential space integration',
        ],
      },
      {
        workstreamTitle: 'Prefab Technical & Educational Storytelling',
        workstreamDetails:
          'On-site installation documentation, factory walkthroughs, construction timeline breakdowns, and buyer FAQ demystification.',
        bullets: [
          'On-site rapid assembly walkthroughs',
          'Structural engineering & insulation clarity',
          'Solution-led answers to practical buyer questions',
        ],
      },
      {
        workstreamTitle: 'Events as Part of the System (D-ARC & Raipur)',
        workstreamDetails:
          'End-to-end anticipation, photographer coordination, on-ground direction and post-event storytelling for D-ARC Bengaluru and Raipur Open House.',
        bullets: [
          'D-ARC Bengaluru furniture activation & designer capture',
          'Raipur Open House prefab walkthrough & client engagement',
          'Multi-channel post-event editorial distribution',
        ],
      },
      {
        workstreamTitle: 'Multi-Platform Communication Roles',
        workstreamDetails:
          'Tailored platform execution optimizing visual allure on Instagram, B2B architecture authority on LinkedIn, and deep project tours on YouTube.',
        bullets: [
          'B2B architect & developer outreach on LinkedIn',
          'High-engagement reels on Instagram & Facebook',
          'Long-form project walkthroughs on YouTube',
        ],
      },
    ],
    proofOutcomes: [
      {
        metricOrChange: 'Differentiated Category Perception',
        description: 'Successfully gave two distinct verticals room to speak differently while reinforcing brand quality and manufacturing capability.',
      },
      {
        metricOrChange: 'Solution-Led Content Pivot',
        description: 'Shifted engagement from feature-heavy product specs to project stories, educational videos, and human process footage.',
      },
      {
        metricOrChange: 'Integrated Event Expansion',
        description: 'Expanded ongoing social architecture seamlessly across flagship physical activations at D-ARC Bengaluru and Raipur Open House.',
      },
    ],
    gallery: [
      {
        src: '/images/case-studies/loom/loom-hero.jpg',
        caption: 'Loom Crafts dual ecosystem: Luxury woven outdoor collection alongside modular prefab structures.',
        alt: 'Loom Crafts furniture and prefab architecture',
      },
      {
        src: '/images/case-studies/loom/furniture-1.jpg',
        caption: 'Spaces & lifestyle: Outdoor collection integrated into luxury residential architecture.',
        alt: 'Loom Crafts luxury outdoor seating in living space',
      },
      {
        src: '/images/case-studies/loom/furniture-2.jpg',
        caption: 'Material & detail: Tactile weave craftsmanship and all-weather resilience.',
        alt: 'Loom Crafts woven material close-up',
      },
      {
        src: '/images/case-studies/loom/prefab-1.jpg',
        caption: 'Prefab projects: On-site assembly, structural engineering, and finished living pods.',
        alt: 'Loom Prefab modular living pod installation',
      },
      {
        src: '/images/case-studies/loom/prefab-2.jpg',
        caption: 'Factory & process: Precision manufacturing of high-performance architectural modules.',
        alt: 'Loom Prefab factory manufacturing and assembly',
      },
      {
        src: '/images/case-studies/loom/event-darc.jpg',
        caption: 'D-ARC Bengaluru: On-ground event direction and architect community engagement.',
        alt: 'Loom Crafts at D-ARC Bengaluru exhibition',
      },
      {
        src: '/images/case-studies/loom/event-raipur.jpg',
        caption: 'Raipur Open House: Physical walkthrough and client engagement for modular homes.',
        alt: 'Loom Prefab Raipur open house walkthrough',
      },
    ],
    seo: {
      metaTitle: 'Loom Crafts Case Study | Ārohana Consultancy',
      metaDescription:
        'How Ārohana built a differentiated digital communication system for Loom Crafts across premium furniture and prefab/modular homes.',
      ogImage: '/images/case-studies/loom/loom-hero.jpg',
    },
    tags: ['Category Education', 'Dual-Journey Architecture', 'On-Site Projects', 'Event Expansion'],
  },
  {
    clientName: 'PictureTime',
    slug: 'picturetime',
    heroBusinessStatement: 'From promoting cinema to building a broader story around what PictureTime is building.',
    heroMedia: '/images/case-studies/picturetime/picturetime-hero.jpg',
    heroMediaCaption: 'PictureTime mobile digital cinema deployed at flagship film festivals and remote cultural hubs.',
    snapshot: {
      sector: 'Mobile Cinema, Cultural Infrastructure & Media',
      location: 'Ladakh, Goa (IFFI), Pan-India',
      engagementType: 'Ongoing Digital Partnership + Project Work',
      duration: '1+ Year Strategic Engagement',
      coreCapabilities: [
        'Digital Strategy & Social Management',
        'Creative Direction & Campaign Systems',
        'Festival & High-Altitude Filming',
        'Filmmaker Interviews & PR Assets',
        'Theatrical Film Promotion Assets',
      ],
    },
    theSituation: [
      'When Ārohana began working with PictureTime, the digital presence lacked consistency, creative direction and stronger storytelling.',
      'The business itself had a larger story: PictureTime was not simply asking audiences to visit a theatre; it was building a distinctive cinema model and needed communication that could speak to both audiences and business stakeholders.',
    ],
    theRealChallenge: [
      'The content needed to perform two jobs without confusing either audience: make the brand relevant to people who experience its theatres, while also communicating a larger business and investor-facing narrative.',
      'That meant changing the design philosophy, strengthening the content system and making individual events and film moments serve the larger brand rather than becoming isolated posts.',
    ],
    theThinking: [
      'Ārohana manages Instagram, Facebook and LinkedIn, covering strategy, calendars, creative direction, content, campaigns, promotional communication and platform execution.',
      'The content direction increasingly combines consumer-facing cinema stories with founder-led and investment-oriented communication.',
      'Cultural moments like IFFI and DIFF were treated as strategic narrative anchors rather than transient updates.',
    ],
    theWork: [
      {
        workstreamTitle: 'Consumer & Investor Narrative System',
        workstreamDetails:
          'Structured design philosophy pairing consumer-facing movie enthusiasm with founder-led and investment-oriented communication on LinkedIn.',
        bullets: [
          'Unified design and editorial tone',
          'Founder vision and business model storytelling',
          'Regular audience engagement formats',
        ],
      },
      {
        workstreamTitle: 'IFFI (International Film Festival of India)',
        workstreamDetails:
          'Handled as a dedicated festival communication opportunity, planning communication before and after the festival to build anticipation and extend presence beyond the event.',
        bullets: [
          'Pre-festival anticipation builds',
          'On-site screening infrastructure showcases',
          'Post-festival recap and industry impact',
        ],
      },
      {
        workstreamTitle: 'DIFF (Dharamshala International Film Festival)',
        workstreamDetails:
          'Separate on-ground content assignment. Madhura worked with the team on location, creating content and interviewing filmmakers/directors including Kiran Rao, Jim Sarbh and Rohan Kanawade.',
        bullets: [
          'On-location film festival creative direction',
          'High-profile filmmaker & director interviews',
          'Placing PictureTime inside live cultural cinema dialogues',
        ],
      },
      {
        workstreamTitle: '120 Bahadur Film Promotion',
        workstreamDetails:
          'Separate promotional requirement delivering creatives, reels, announcements and theatre-related promotional assets connected with military history documentation.',
        bullets: [
          'Theatrical promotional reels and trailers',
          'Announcement creative suite',
          'Authentic historical grounding to Rezang La documentation',
        ],
      },
    ],
    proofOutcomes: [
      {
        metricOrChange: 'Strategic Narrative Evolution',
        description: 'Over 1+ year, transformed communication from isolated updates into a cohesive investor-conscious cultural infrastructure brand.',
      },
      {
        metricOrChange: 'High-Level Industry Credibility',
        description: 'Generated authentic access to prominent filmmakers and actors across prestigious cultural platforms such as IFFI and DIFF.',
      },
      {
        metricOrChange: 'Full-Scope Digital & Promotional Delivery',
        description: 'Continuous retainer delivery combined with agile campaigns for theatrical releases and festival activations.',
      },
    ],
    gallery: [
      {
        src: '/images/case-studies/picturetime/picturetime-hero.jpg',
        caption: 'Festival & field deployment: PictureTime mobile theatre structure under Himalayan skies.',
        alt: 'PictureTime mobile cinema theatre',
      },
      {
        src: '/images/case-studies/picturetime/digital-1.jpg',
        caption: 'Digital presence: Structured social creatives and founder-led communication.',
        alt: 'PictureTime digital content and social creatives',
      },
      {
        src: '/images/case-studies/picturetime/iffi-1.jpg',
        caption: 'IFFI Goa: Mobile digital screening domes deployed for global film festival audiences.',
        alt: 'PictureTime screening theatres at IFFI Goa',
      },
      {
        src: '/images/case-studies/picturetime/diff-1.jpg',
        caption: 'DIFF on-ground: Capturing live conversations and filmmaker interviews on location.',
        alt: 'PictureTime at Dharamshala International Film Festival',
      },
      {
        src: '/images/case-studies/picturetime/diff-2.jpg',
        caption: 'Industry dialogues: In-depth interviews placing PictureTime in cultural cinema conversations.',
        alt: 'Filmmaker interview series at DIFF',
      },
      {
        src: '/images/case-studies/picturetime/bahadur-1.jpg',
        caption: '120 Bahadur: Dedicated theatrical promotion assets and film announcement creatives.',
        alt: '120 Bahadur theatrical campaign creative',
      },
    ],
    seo: {
      metaTitle: 'PictureTime Case Study | Ārohana Consultancy',
      metaDescription:
        'How Ārohana helped PictureTime build a more structured digital story across consumer, film-festival and investor-facing communication.',
      ogImage: '/images/case-studies/picturetime/picturetime-hero.jpg',
    },
    tags: ['Brand Narrative', 'Festival Communication', 'On-Ground Direction', 'Investor Storytelling'],
  },
  {
    clientName: 'SHE — Sustainable Health Empowerment',
    slug: 'she',
    heroBusinessStatement: 'Designing a sensitive health initiative for communities where communication had to begin with trust.',
    heroMedia: '/images/case-studies/she/she-hero.jpg',
    heroMediaCaption: 'SHE community workshops with local Ladakhi women across remote Himalayan villages.',
    snapshot: {
      sector: 'Community Healthcare & Women’s Hygiene',
      location: '8 Remote Border Villages, Ladakh',
      engagementType: 'Indian Army-supported project under Operation Sadbhavana',
      duration: 'Field-based initiative',
      coreCapabilities: [
        'Concept & Naming',
        'Campaign Identity & Mascot',
        'Bilingual Illustrated Collateral',
        'On-Ground Field Facilitation',
        'Documentary Production & Voice-Over',
      ],
    },
    theSituation: [
      'SHE — Sustainable Health Empowerment was created as a health, hygiene and sustainability initiative for remote communities in Ladakh, aligned with the objectives of Operation Sadbhavana.',
      'The Army had the programme; Ārohana was brought in for the identity, communication and execution. The name SHE was developed by Ārohana.',
    ],
    theRealChallenge: [
      'The project was not a conventional awareness campaign. The audience needed information from the ground up, and the subject required cultural sensitivity and trust.',
      'Reusable sanitary pads and menstrual cups were introduced not only as products, but as part of a longer-term approach to menstrual health, dignity and reduction of waste.',
    ],
    theThinking: [
      'Because Madhura had lived in Ladakh and understood the local context, the communication was designed to be accessible and locally appropriate rather than imported from a generic urban campaign.',
      'The identity, mascot and supporting material were developed to make the initiative approachable and recognisable across the communities involved.',
      'The work ran from concept and naming through visual identity, mascot, brochures, standees, scripting, shooting, documentary production, voice-over, editing and social content.',
    ],
    theWork: [
      {
        workstreamTitle: 'Concept, Naming & Mascot Identity',
        workstreamDetails:
          'Developed the name SHE, designed warm approachable emblems and an empathetic cultural mascot removing medical taboo.',
        bullets: [
          'Sensitive naming and bilingual identity',
          'Relatable mascot illustration',
          'Kit packaging for reusable products',
        ],
      },
      {
        workstreamTitle: 'Bilingual Educational Collateral',
        workstreamDetails:
          'Designed simplified, illustrated health education materials, brochures and standees explaining hygiene clearly without language barriers.',
        bullets: [
          'Step-by-step illustrated care booklets',
          'Local-context workshop standees',
          'Menstrual cup usage and care guides',
        ],
      },
      {
        workstreamTitle: 'On-Ground Field Presence & Facilitation',
        workstreamDetails:
          'Madhura was personally present on ground across eight remote villages, interacting directly with village women and explaining the use of menstrual cups.',
        bullets: [
          'Eight remote villages reached',
          'Direct personal facilitation with village elders & women',
          'Safe, culturally respectful learning spaces',
        ],
      },
      {
        workstreamTitle: 'Documentary Production & Multi-Platform Delivery',
        workstreamDetails:
          'Created two complete documentary videos from shoot through voice-over, editing, and post-production, used by the Army across social platforms.',
        bullets: [
          'Two full-scope documentary films produced',
          'Voice-over and local language subtitling',
          'Broadcast across Indian Army Instagram, YouTube and X',
        ],
      },
    ],
    proofOutcomes: [
      {
        metricOrChange: '8 Remote Border Villages Reached',
        description: 'Successfully reached eight remote villages with active participation from local women and community leaders under Operation Sadbhavana.',
      },
      {
        metricOrChange: 'Indian Army Institutional Feature',
        description: 'Appreciated by the Indian Army leadership and featured extensively in official military magazines and verified digital channels.',
      },
      {
        metricOrChange: 'Regional Community Demand',
        description: 'Generated strong demand from neighboring Himalayan valleys for extended health empowerment and sustainability workshops.',
      },
    ],
    gallery: [
      {
        src: '/images/case-studies/she/she-hero.jpg',
        caption: 'Field engagement: Madhura facilitating menstrual health sessions with Ladakhi village women.',
        alt: 'SHE community session in Ladakh',
      },
      {
        src: '/images/case-studies/she/identity-1.jpg',
        caption: 'Visual system: SHE campaign identity, mascot, brochures and bilingual illustrated collateral.',
        alt: 'SHE educational booklet and design collateral',
      },
      {
        src: '/images/case-studies/she/field-1.jpg',
        caption: 'Community dialogue: Interactive health and hygiene workshops in remote mountain settlements.',
        alt: 'Community discussion during SHE workshop',
      },
      {
        src: '/images/case-studies/she/field-2.jpg',
        caption: 'Sustainable hygiene: Introducing reusable solutions with dignity and cultural respect.',
        alt: 'Women participating in health awareness workshop',
      },
      {
        src: '/images/case-studies/she/film-1.jpg',
        caption: 'Documentary production: Respectful field cinematography chronicling community impact.',
        alt: 'Filming on-ground for SHE documentary',
      },
      {
        src: '/images/case-studies/she/film-2.jpg',
        caption: 'Institutional release: Master documentary stills adopted by Indian Army digital channels.',
        alt: 'Indian Army social platform adoption of SHE documentary',
      },
    ],
    seo: {
      metaTitle: 'SHE Sustainable Health Empowerment Case Study | Ārohana Consultancy',
      metaDescription:
        'How Ārohana developed the identity, communication and on-ground documentation for a menstrual-health and sustainability initiative in remote Ladakh.',
      ogImage: '/images/case-studies/she/she-hero.jpg',
    },
    tags: ['Concept & Naming', 'Community Sensitivity', 'Documentary Production', 'Field Execution'],
  },
  {
    clientName: 'Misu',
    slug: 'misu',
    heroBusinessStatement: 'Turning a restaurant from a collection of moving parts into a more considered hospitality business.',
    heroMedia: '/images/case-studies/misu/misu-hero.jpg',
    heroMediaCaption: 'Misu Pan-Asian dining experience: interior ambiance, culinary craft, and service choreography.',
    snapshot: {
      sector: 'Contemporary Pan-Asian Restaurant & Bar',
      location: 'Goa & Regional Expansion',
      engagementType: 'Consulting + Ongoing Digital Communication',
      duration: 'Nearly 2-Year Full-Scope Operational Engagement',
      coreCapabilities: [
        'Food-Cost Control & Pricing',
        'Menu Engineering & Margin Optimisation',
        'Kitchen SOPs & Staff Training',
        'Revenue Optimisation & Floor Systems',
        'Social Media & Culinary Content',
      ],
    },
    theSituation: [
      'Misu came to Ārohana with a business that needed more than marketing. The restaurant had issues around systems, standardisation, food control, staff capability and direction, alongside an inconsistent digital presence.',
      'Ārohana therefore approached the engagement as a hospitality business problem rather than a social-media problem.',
    ],
    theRealChallenge: [
      'The business was losing money and lacked consistent food-cost control and standardisation. Staff required training, operational systems needed structure, and the menu and beverage offering needed fresh thinking.',
      'At the same time, the digital presence needed to communicate the restaurant more consistently.',
    ],
    theThinking: [
      'Ārohana placed a dedicated person into the business to work across operations and supported the engagement over almost two years before handing the business back to the client.',
      'Misu was not treated as ‘a restaurant client’ who needed posts. The work connected the guest-facing brand to the systems behind the guest experience.',
      'That is the basis of Ārohana’s hospitality consulting: the menu, kitchen, people, cost structure, revenue and communication need to support the same business.',
    ],
    theWork: [
      {
        workstreamTitle: 'Operational Systems & On-Ground Placement',
        workstreamDetails:
          'Placed a dedicated person into the business for nearly two years to establish kitchen control, standard operating procedures, and staff training.',
        bullets: [
          'Embedded on-ground operational management',
          'Standardised kitchen prep and line SOPs',
          'Staff service and hygiene training',
        ],
      },
      {
        workstreamTitle: 'Food Cost Control & Menu Engineering',
        workstreamDetails:
          'Complete recipe costing, portioning standardization, and new food/beverage concept development to protect kitchen gross margins.',
        bullets: [
          'Recipe and ingredient yield standardization',
          'High-margin beverage and cocktail program',
          'Pricing restructuring and margin enhancement',
        ],
      },
      {
        workstreamTitle: 'Service Flow & Revenue Optimisation',
        workstreamDetails:
          'Refined front-of-house service choreography, table turn-time workflows, and guest interaction protocols.',
        bullets: [
          'Service choreography and floor communication',
          'Weekday dining and lunch revenue optimization',
          'Guest feedback and service quality control',
        ],
      },
      {
        workstreamTitle: 'Integrated Digital & Sensory Storytelling',
        workstreamDetails:
          'Executed monthly content, shoots, creative direction, video editing, posting, and ongoing social communication.',
        bullets: [
          'Monthly food and beverage shoots',
          'Dynamic culinary reels and signature dish features',
          'Ongoing digital guest communication',
        ],
      },
    ],
    proofOutcomes: [
      {
        metricOrChange: 'Operational Sustainability Handover',
        description: 'Successfully handed back a profitable, structured business operating under standardized kitchen and floor SOPs after nearly two years.',
      },
      {
        metricOrChange: 'Food-Cost & Gross Margin Control',
        description: 'Stabilized kitchen food cost baseline and ingredient yields without compromising culinary excellence.',
      },
      {
        metricOrChange: 'Revenue & Guest Visibility Growth',
        description: 'Achieved improved market reputation, organic reservation demand, and consistent dining footfall.',
      },
    ],
    gallery: [
      {
        src: '/images/case-studies/misu/misu-hero.jpg',
        caption: 'Interior atmosphere: Balancing bold contemporary lighting with energetic dining comfort.',
        alt: 'Misu restaurant dining room interior',
      },
      {
        src: '/images/case-studies/misu/kitchen-1.jpg',
        caption: 'Kitchen operations: On-ground standardisation, prep systems, and line choreography.',
        alt: 'Misu kitchen operations and chef line',
      },
      {
        src: '/images/case-studies/misu/menu-1.jpg',
        caption: 'Menu engineering: Signature dim sum and dishes engineered for optimal contribution margins.',
        alt: 'Misu culinary plating and menu development',
      },
      {
        src: '/images/case-studies/misu/bar-1.jpg',
        caption: 'Beverage concepts: Curating craft cocktails designed for high margins and visual appeal.',
        alt: 'Misu craft cocktail bar and beverage program',
      },
      {
        src: '/images/case-studies/misu/digital-1.jpg',
        caption: 'Digital communication: High-impact social media creatives and monthly culinary content.',
        alt: 'Misu social media content and photography',
      },
      {
        src: '/images/case-studies/misu/closing-1.jpg',
        caption: 'Guest experience: A vibrant, profitable dining room backed by solid operational fundamentals.',
        alt: 'Misu guests dining in restaurant',
      },
    ],
    seo: {
      metaTitle: 'Misu Restaurant Case Study | Ārohana Consultancy',
      metaDescription:
        'How Ārohana combined restaurant consulting, operational systems, menu engineering and digital communication to strengthen Misu as a hospitality business.',
      ogImage: '/images/case-studies/misu/misu-hero.jpg',
    },
    tags: ['Hospitality Consulting', 'Food Cost Control', 'Kitchen SOPs', 'Revenue Optimisation'],
  },
  {
    clientName: 'RR Skins',
    slug: 'rr-skins',
    heroBusinessStatement: 'Making a specialised healthcare offering easier to understand — and easier to trust.',
    heroMedia: '/images/case-studies/rrskins/rrskins-hero.jpg',
    heroMediaCaption: 'RR Skins clinical dermatology consultation: patient-first medical communication.',
    snapshot: {
      sector: 'Specialised Clinical Dermatology & Aesthetic Healthcare',
      location: 'Leh, Ladakh & Regional Healthcare Hub',
      engagementType: 'Ongoing Digital Partnership',
      duration: 'Ongoing Strategic Retainer',
      coreCapabilities: [
        'Healthcare Content Strategy',
        'Doctor-Led Video Series',
        'Treatment & Skincare Explainers',
        'Graphic Design & Reels Editing',
        'Education-Led Storytelling',
      ],
    },
    theSituation: [
      'RR Skins is a distinctive clinic in Ladakh. When Ārohana began working with the brand, the social page had very little content or clear communication structure.',
      'The opportunity was not simply to make the page look active. The audience needed to understand what the clinic offered and why it could be trusted.',
    ],
    theRealChallenge: [
      'Healthcare is a high-trust category. Skin and aesthetic concerns are personal, and people often need education before they are ready to enquire.',
      'The communication therefore had to be informative and genuine rather than overly promotional or trend-led.',
    ],
    theThinking: [
      'Ārohana built the page from the ground up: content strategy, calendar, shoot coordination, content writing, graphic design, editing and publishing.',
      'The creative direction prioritised genuine stories and informative content. AI-generated content and artificial follower growth were deliberately avoided.',
      'The objective was to make treatment and skincare information understandable while building confidence in the clinic and its people.',
    ],
    theWork: [
      {
        workstreamTitle: 'Education-Led Content Architecture',
        workstreamDetails:
          'Developed recurring educational series covering skin concerns, treatment science, and FAQs to provide ongoing value.',
        bullets: [
          'Educational series on common skin concerns',
          'Treatment breakdowns demystifying clinical procedures',
          'Accessible FAQ graphics and video scripts',
        ],
      },
      {
        workstreamTitle: 'Doctor-Led Informative Storytelling',
        workstreamDetails:
          'Coordinated physician-led explainers addressing real patient concerns with medical integrity, removing procedural fear.',
        bullets: [
          'Doctor-led video explainers',
          'Evidence-based skincare advice',
          'Transparent consultation expectation setting',
        ],
      },
      {
        workstreamTitle: 'Clean, Reassuring Visual Identity',
        workstreamDetails:
          'Created a calm, clean, and reassuring visual system that prioritized clinical hygiene, scientific credibility, and patient comfort.',
        bullets: [
          'Standardised patient informational assets',
          'Clean treatment walkthrough reels',
          'Empathetic tone of voice across all touchpoints',
        ],
      },
      {
        workstreamTitle: 'Organic Trust & Patient Confidence',
        workstreamDetails:
          'Deliberately avoided AI-generated content and artificial growth hacks in favor of authentic, human clinic interactions.',
        bullets: [
          'Real clinic and team interactions',
          'High non-follower organic educational reach',
          'Long-term patient relationship nurturing',
        ],
      },
    ],
    proofOutcomes: [
      {
        metricOrChange: 'High-Intent Patient Consultation Inflow',
        description: 'Shifted perception from an inactive channel to a credible educational resource, generating increased enquiries and clinic visits.',
      },
      {
        metricOrChange: 'Strong Organic Reach Among Non-Followers',
        description: 'Series-based treatment content demonstrated high non-follower reach in monthly reporting through educational value.',
      },
      {
        metricOrChange: 'Authentic Clinical Reputation',
        description: 'Cultivated deep medical trust and patient loyalty without resorting to discount tactics or artificial growth hacks.',
      },
    ],
    gallery: [
      {
        src: '/images/case-studies/rrskins/rrskins-hero.jpg',
        caption: 'Doctor consultation: Fostering doctor-patient trust through empathetic, evidence-based dialogue.',
        alt: 'RR Skins clinical consultation with dermatologist',
      },
      {
        src: '/images/case-studies/rrskins/education-1.jpg',
        caption: 'Patient education: Demystifying skincare science, common conditions, and treatment timelines.',
        alt: 'RR Skins patient educational content series',
      },
      {
        src: '/images/case-studies/rrskins/education-2.jpg',
        caption: 'Treatment transparency: Reassuring procedure walkthroughs removing fear of clinical lasers.',
        alt: 'RR Skins laser treatment procedure walkthrough',
      },
      {
        src: '/images/case-studies/rrskins/trust-1.jpg',
        caption: 'Human trust: Doctor and clinic team interactions highlighting genuine patient care.',
        alt: 'RR Skins clinic team and medical consultation',
      },
      {
        src: '/images/case-studies/rrskins/trust-2.jpg',
        caption: 'Clinical environment: Clean, sophisticated spaces designed for patient privacy and medical excellence.',
        alt: 'RR Skins clinic interior and treatment rooms',
      },
    ],
    seo: {
      metaTitle: 'RR Skins Case Study | Ārohana Consultancy',
      metaDescription:
        'How Ārohana built an education-led digital presence for RR Skins, helping a specialised healthcare brand communicate with greater clarity and trust.',
      ogImage: '/images/case-studies/rrskins/rrskins-hero.jpg',
    },
    tags: ['Medical Trust', 'Patient Education', 'Doctor Positioning', 'Ethical Storytelling'],
  },
  {
    clientName: 'Western Command — Indian Army',
    slug: 'western-command',
    heroBusinessStatement: 'Ceremonial investiture documentation & institutional film production.',
    heroMedia: '/images/case-studies/western-command-hero.jpg',
    heroMediaCaption: 'Western Command Investiture Ceremony video direction and honors documentation.',
    snapshot: {
      sector: 'Defence, Institutional & Commemorative Media',
      location: 'Chandimandir & Northern Command',
      engagementType: 'High-Security Shoot Direction & Rapid Post-Production',
      duration: 'Specialized Production Commission',
      coreCapabilities: [
        'Multi-Camera Protocol Shoot Direction',
        'Rapid Turnaround Post-Production',
        'Ceremonial Sound Choreography',
        'Archival Master Delivery',
      ],
    },
    theSituation: [
      'The Western Command Investiture Ceremony in February 2026 honored gallantry awardees, distinguished service medal recipients, and unit citations.',
    ],
    theRealChallenge: [
      'In military investiture ceremonies, there are no retakes. Every salute, medal pinning, and ceremonial march happens once in real time under strict protocol constraints.',
    ],
    theThinking: [
      'Ārohana deployed an elite multi-camera production crew briefed on army protocol, capturing multi-angle coverage followed by expedited broadcast-grade editing.',
    ],
    theWork: [
      {
        workstreamTitle: 'Protocol Shoot Direction & Film Editing',
        workstreamDetails:
          'Flawless live multi-camera coverage followed by master color grading and archival package delivery.',
      },
    ],
    proofOutcomes: [
      {
        metricOrChange: 'Zero-Error Protocol Execution',
        description: 'Delivered ceremonial highlight films and master archive approved by Western Command leadership.',
      },
    ],
    gallery: [
      {
        src: '/images/army/western-command-1.jpg',
        caption: 'Multi-camera protocol coverage of honors and awards presentation.',
        alt: 'Western Command Investiture ceremony honors presentation',
      },
    ],
    seo: {
      metaTitle: 'Western Command Case Study | Indian Army Investiture Ceremony Production',
      metaDescription: 'Ceremonial documentation and institutional video production for Western Command Indian Army.',
      ogImage: '/images/case-studies/western-command-hero.jpg',
    },
    tags: ['Shoot Direction', 'Video Production', 'Post-Production', 'Ceremonial Film'],
  },
];

export const SEED_WORK_DIRECTORY: WorkDirectoryItem[] = [
  // Hospitality & F&B
  {
    id: 'misu',
    projectTitle: 'Misu Pan-Asian',
    client: 'Misu Hospitality Group',
    sector: 'Hospitality & F&B',
    shortDescription: 'Contemporary Pan-Asian dining brand. Kitchen operations, menu margin engineering, and integrated visual storytelling.',
    thumbnail: '/images/work/misu-thumb.jpg',
    tags: ['Hospitality Consulting', 'Menu Engineering', 'Digital Execution'],
    caseStudyLink: '/work/misu',
  },
  {
    id: 'neora-deck',
    projectTitle: 'Neora Deck',
    client: 'Neora Hospitality',
    sector: 'Hospitality & F&B',
    shortDescription: 'High-end experiential rooftop dining space. Concept positioning, menu communication, and luxury guest acquisition.',
    thumbnail: '/images/work/neora-thumb.jpg',
    tags: ['Brand Concept', 'Digital Marketing', 'Launch Strategy'],
  },
  {
    id: 'blu-resorts',
    projectTitle: 'Blu Resorts',
    client: 'Blu Leisure Group',
    sector: 'Hospitality & F&B',
    shortDescription: 'Destination leisure resort. F&B revenue optimization, guest stay communication, and multi-season brand campaigns.',
    thumbnail: '/images/work/blu-thumb.jpg',
    tags: ['Resort Hospitality', 'F&B Operations', 'Digital Strategy'],
  },
  {
    id: 'qubice',
    projectTitle: 'Qubice Lounge & Dine',
    client: 'Qubice Hospitality',
    sector: 'Hospitality & F&B',
    shortDescription: 'Modern lounge and urban dining format. Bar concepting, menu engineering, and local customer acquisition.',
    thumbnail: '/images/work/misu-thumb.jpg',
    tags: ['Lounge Concept', 'Menu Engineering', 'Digital Marketing'],
  },
  {
    id: 'kanopy',
    projectTitle: 'Kanopy Cafe & Bistro',
    client: 'Kanopy Dining',
    sector: 'Hospitality & F&B',
    shortDescription: 'Boutique garden café. Menu development, kitchen pass systems, and visual identity rollout.',
    thumbnail: '/images/about/mother-india-cafe.jpg',
    tags: ['Café Consulting', 'Kitchen Systems', 'Brand Direction'],
  },
  {
    id: 'sorriso',
    projectTitle: 'Sorriso Gourmet',
    client: 'Sorriso Hospitality',
    sector: 'Hospitality & F&B',
    shortDescription: 'Artisanal Italian dining. Food cost controls, recipe standardization, and digital storytelling.',
    thumbnail: '/images/about/passcode-ops.jpg',
    tags: ['Culinary Advisory', 'Food Cost Control', 'Content Direction'],
  },
  {
    id: 'spice-goa',
    projectTitle: 'Spice Goa',
    client: 'Spice Goa Culinary',
    sector: 'Hospitality & F&B',
    shortDescription: 'Authentic coastal culinary institution. Brand positioning, kitchen workflow, and digital engagement.',
    thumbnail: '/images/about/hospitality-muscat.jpg',
    tags: ['Culinary Legacy', 'Workflow Systems', 'Digital Growth'],
  },
  {
    id: 'khana-khazana',
    projectTitle: 'Khana Khazana',
    client: 'Khana Khazana Dining',
    sector: 'Hospitality & F&B',
    shortDescription: 'Multi-cuisine family dining. Kitchen pass SOPs, portion control, and local dining marketing.',
    thumbnail: '/images/work/misu-thumb.jpg',
    tags: ['Kitchen SOPs', 'Portion Control', 'Local Marketing'],
  },
  {
    id: 'khau-gali',
    projectTitle: 'Khau Gali Street Food',
    client: 'Khau Gali Concepts',
    sector: 'Hospitality & F&B',
    shortDescription: 'Curated street food destination. QSR operational systems, franchise SOPs, and visual branding.',
    thumbnail: '/images/work/neora-thumb.jpg',
    tags: ['QSR Systems', 'Franchise SOPs', 'Brand Rollout'],
  },

  // Real Estate & Built Environment
  {
    id: 'raysons-realty',
    projectTitle: 'Raysons Group — Built Environment',
    client: 'Raysons Group',
    sector: 'Real Estate & Built Environment',
    shortDescription: 'One group. Multiple businesses. Different communication needs across commercial realty, casting and hospitality.',
    thumbnail: '/images/work/raysons-realty-thumb.jpg',
    tags: ['Brand Strategy', 'Corporate Communication', 'Digital Retainer'],
    caseStudyLink: '/work/raysons-group',
  },
  {
    id: 'citron-spaces',
    projectTitle: 'Citron Commercial & Workspaces',
    client: 'Citron Living & Commercial',
    sector: 'Real Estate & Built Environment',
    shortDescription: 'Contemporary commercial spaces and lifestyle developments. Positioning, sales collateral, and campaign rollout.',
    thumbnail: '/images/work/raysons-realty-thumb.jpg',
    tags: ['Commercial Realty', 'Sales Collateral', 'Digital Presence'],
  },
  {
    id: 'loom-crafts-pods',
    projectTitle: 'Loom Crafts Extreme Habitats & Living',
    client: 'Loom Crafts Luxury Outdoors',
    sector: 'Real Estate & Built Environment',
    shortDescription: 'One brand, two very different buying journeys across luxury outdoor furniture and high-altitude modular habitats.',
    thumbnail: '/images/work/loom-thumb.jpg',
    tags: ['Dual Buying Journey', 'Luxury Retail', 'High-Altitude Shoot'],
    caseStudyLink: '/work/loom-crafts',
  },

  // Healthcare
  {
    id: 'rr-skins',
    projectTitle: 'RR Skins Dermatology & Aesthetics',
    client: 'RR Skins Healthcare',
    sector: 'Healthcare',
    shortDescription: 'Making a specialised healthcare offering easier to understand and trust through clinical reputation and patient education.',
    thumbnail: '/images/case-studies/rr-skins-hero.jpg',
    tags: ['Healthcare Trust', 'Patient Education', 'Brand Positioning'],
    caseStudyLink: '/work/rr-skins',
  },

  // Lifestyle & Consumer
  {
    id: 'dtk-karekar',
    projectTitle: 'DTK Karekar Jewellery',
    client: 'DTK Karekar Jewellers',
    sector: 'Lifestyle & Consumer',
    shortDescription: 'Heritage fine jewellery brand. Digital brand storytelling, festive collection launches, and luxury visual direction.',
    thumbnail: '/images/about/arohana-today.jpg',
    tags: ['Luxury Retail', 'Heritage Brand', 'Collection Launches'],
  },
  {
    id: 'fraganta-perfumery',
    projectTitle: 'Fraganta Artisanal Fragrances',
    client: 'Fraganta Consumer Brands',
    sector: 'Lifestyle & Consumer',
    shortDescription: 'Niche fragrance and lifestyle brand. Packaging design, e-commerce brand presence, and visual campaigns.',
    thumbnail: '/images/about/passcode-ops.jpg',
    tags: ['Packaging Design', 'E-commerce Brand', 'Visual Direction'],
  },

  // Entertainment & Media
  {
    id: 'picturetime-leh',
    projectTitle: 'PictureTime — Cinema & Beyond',
    client: 'Picture Time Digiplex',
    sector: 'Entertainment & Media',
    shortDescription: 'From cinema promotion to a broader brand story. World’s highest digital cinema documentary and on-ground cultural documentation.',
    thumbnail: '/images/work/picturetime-thumb.jpg',
    tags: ['Brand Narrative', 'Documentary Production', 'On-Ground Content'],
    caseStudyLink: '/work/picturetime',
  },

  // Travel & Tourism
  {
    id: 'tourin-ladakh',
    projectTitle: 'Tourin — Experiential Ladakh',
    client: 'Ārohana Owned Venture',
    sector: 'Travel & Tourism',
    shortDescription: 'An experiential travel brand beginning with Ladakh — built from lived experience rather than a generic destination catalogue. Curated expeditions across high passes and valleys.',
    thumbnail: '/images/work/tourin-thumb.jpg',
    tags: ['Experiential Brand', 'Curated Journeys', 'Content Production'],
    caseStudyLink: '/tourin',
  },
  {
    id: 'holiday-village-resort',
    projectTitle: 'Holiday Village Resort',
    client: 'Holiday Village Hospitality',
    sector: 'Travel & Tourism',
    shortDescription: 'Eco-resort and experiential leisure getaway. Guest experience curation, digital distribution, and seasonal marketing.',
    thumbnail: '/images/work/blu-thumb.jpg',
    tags: ['Eco-Tourism', 'Guest Experience', 'Digital Distribution'],
  },

  // Institutional / Community
  {
    id: 'she-initiative',
    projectTitle: 'SHE — Women’s Health in Ladakh',
    client: 'SHE Foundation / Ladakh Outreach',
    sector: 'Institutional / Community',
    shortDescription: 'A community initiative built around health, dignity and sustainability across 8 remote villages in Ladakh.',
    thumbnail: '/images/case-studies/she-hero.jpg',
    tags: ['Institutional Communication', 'Remote Outreach', 'Documentary Film'],
    caseStudyLink: '/work/she',
  },
  {
    id: 'operation-sampark',
    projectTitle: 'Operation Sampark — Homestay Skill Development',
    client: 'Community & Tourism Development',
    sector: 'Institutional / Community',
    shortDescription: 'Hospitality training, sanitation standards, and operational coaching for remote Himalayan border homestays.',
    thumbnail: '/images/about/ladakh-field.jpg',
    tags: ['Homestay Training', 'Skill Development', 'Border Communities'],
  },
  {
    id: 'western-command-film',
    projectTitle: 'Western Command Investiture Ceremony',
    client: 'Western Command Indian Army',
    sector: 'Institutional / Community',
    shortDescription: 'Ceremonial video shoot, protocol direction, and rapid post-production for the prestigious 2026 investiture.',
    thumbnail: '/images/army/western-command-1.jpg',
    tags: ['Ceremonial Shoot', 'Protocol Film', 'Military Archive'],
    caseStudyLink: '/army-projects',
  },
];

export const SEED_TOURIN_PACKAGES: TourinPackageItem[] = [
  {
    id: 'slower-nubra-sham',
    title: 'The Slower Valley: Sham & Nubra Beyond Dunes',
    subtitle: '7 Days · Cultural Immersion, Apricot Orchards & High Passes',
    region: 'Sham Valley & Nubra (Turtuk / Hunder)',
    pacingStyle: 'Unhurried · Gentle Acclimatisation',
    overview:
      'A journey designed around gentle acclimatisation in lower Ladakh, moving through centuries-old apricot villages, historic monasteries, and the remote Balti culture of Turtuk.',
    itinerary: [
      { dayOrPhase: 'Day 1–2', title: 'Arrival in Leh & Lower Indus Valley', description: 'Rest, gentle walks through old town, and slow acclimatisation.' },
      { dayOrPhase: 'Day 3–4', title: 'Sham Valley Apricot Orchards', description: 'Homestays in Alchi, village heritage trails, and monastery frescoes.' },
      { dayOrPhase: 'Day 5–7', title: 'Across Khardung La to Turtuk', description: 'Crossing to Nubra Valley, staying with Balti custodians in Turtuk.' },
    ],
    gallery: ['/images/tourin/tourin-1.jpg', '/images/tourin/tourin-2.jpg'],
    displayOrder: 1,
  },
  {
    id: 'changthang-nomads',
    title: 'High Plains & Silent Lakes: Changthang & Hanle',
    subtitle: '8 Days · High-Altitude Wilderness & Dark Sky Sanctuary',
    region: 'Changthang Plateau, Tso Moriri & Hanle',
    pacingStyle: 'Deep Wilderness · High Altitude',
    overview:
      'An expedition into the raw windswept plateau of eastern Ladakh — home to Changpa nomads, cashmere goats, and India’s first Dark Sky Reserve in Hanle.',
    itinerary: [
      { dayOrPhase: 'Day 1–3', title: 'Acclimatisation & Indus Canyon', description: 'Preparation in Leh and travel through scenic Indus river canyons.' },
      { dayOrPhase: 'Day 4–5', title: 'Hanle Dark Sky Sanctuary', description: 'Stargazing at the high-altitude astronomical observatory at 14,764 ft.' },
      { dayOrPhase: 'Day 6–8', title: 'Tso Moriri & Changpa Settlements', description: 'High-altitude turquoise lake and encounters with nomadic herders.' },
    ],
    gallery: ['/images/tourin/tourin-2.jpg', '/images/tourin/tourin-1.jpg'],
    displayOrder: 2,
  },
];

export const SEED_ARMY_PROJECTS: ArmyProjectItem[] = [
  {
    id: 'western-command',
    title: 'Western Command — Investiture Ceremony',
    unitOrContext: 'Ceremonial Documentation & Post-Production',
    tags: ['Shoot', 'Production', 'Post-production'],
    narrative:
      'Ārohana handled the shoot and post-production for the Western Command Investiture Ceremony in February 2026.',
    gallery: [
      { image: '/images/army/western-command-1.jpg', caption: 'Ceremony still: Honors and awards presentation documentation at Western Command.', alt: 'Western Command Investiture Ceremony honors' },
      { image: '/images/army/western-command-2.jpg', caption: 'Production still: Post-production editing, ceremonial sound choreography and master film.', alt: 'Western Command ceremonial film editing' },
    ],
    isTextOnly: false,
  },
  {
    id: '14-corps-hq',
    title: '14 Corps Headquarters — Communication & Production',
    unitOrContext: 'HQ 14 Corps, Ladakh',
    tags: ['Visual Communication', 'Video Production', 'Scripting & Sound'],
    narrative:
      'Ārohana has undertaken communication, design and video-production work for 14 Corps Headquarters, including visual communication and films developed through scripting, voice-over, editing and sound.',
    gallery: [
      { image: '/images/army/14corps-1.jpg', caption: 'Visual communication: Institutional storytelling and graphic asset design.', alt: '14 Corps Headquarters visual communication' },
      { image: '/images/army/14corps-2.jpg', caption: 'Video still: High-altitude filming, professional narration, and master audio-visual editing.', alt: '14 Corps production in Ladakh' },
    ],
    isTextOnly: false,
  },
  {
    id: 'rezang-la',
    title: 'Rezang La War Memorial — Coffee-Table Book',
    unitOrContext: 'Fire & Fury Corps',
    tags: ['Publication Design', 'Coffee-Table Book', 'Visual Communication'],
    narrative:
      'Coffee-table book design and visual communication for the Rezang La War Memorial.',
    gallery: [
      { image: '/images/army/rezang-la-1.jpg', caption: 'Cover: Hardbound commemorative publication for Rezang La War Memorial.', alt: 'Rezang La commemorative book cover' },
      { image: '/images/army/rezang-la-2.jpg', caption: 'Interior spread: Archival curation, historical records, and battlefield chronicle layout.', alt: 'Rezang La book interior layout' },
    ],
    isTextOnly: false,
  },
  {
    id: '69-armoured',
    title: '69 Armoured Regiment — Coffee-Table Book',
    unitOrContext: 'Fire & Fury Corps',
    tags: ['Publication Design', 'Regimental History', 'Visual Communication'],
    narrative:
      'Coffee-table book design and visual communication for 69 Armoured Regiment.',
    gallery: [
      { image: '/images/army/69armoured-1.jpg', caption: 'Cover: Heritage coffee-table volume for 69 Armoured Regiment.', alt: '69 Armoured Regiment volume cover' },
      { image: '/images/army/69armoured-2.jpg', caption: 'Interior spread: Regimental heritage, chronicles, and armored vehicle photography.', alt: '69 Armoured Regiment interior spread' },
    ],
    isTextOnly: false,
  },
  {
    id: 'she-sadbhavana',
    title: 'SHE — Sustainable Health Empowerment',
    unitOrContext: 'Operation Sadbhavana / Fire & Fury Corps',
    tags: ['Operation Sadbhavana', 'Brand Identity', 'Documentary Film'],
    narrative:
      'A health and hygiene initiative developed in alignment with the objectives of Operation Sadbhavana and implemented across eight remote villages. Ārohana developed the initiative’s name and identity and worked across its communication and documentary content.',
    gallery: [
      { image: '/images/case-studies/she-hero.jpg', caption: 'SHE initiative: On-ground health workshops and hygiene education modules in remote Ladakh villages.', alt: 'SHE workshop in Ladakh' },
    ],
    isTextOnly: false,
  },
  {
    id: 'operation-sampark',
    title: 'Operation Sampark',
    unitOrContext: 'Fire & Fury Corps',
    tags: ['Hospitality Training', 'Border Communities', 'Social Video'],
    narrative:
      'Ārohana worked with homestay owners in border communities on practical hospitality, hygiene and guest relations. The engagement also included training material and a supporting video produced for Fire & Fury’s social media.',
    gallery: [
      { image: '/images/army/sampark-1.jpg', caption: 'On-ground training: Practical hospitality and guest relations workshop with border homestay hosts.', alt: 'Operation Sampark training workshop' },
    ],
    isTextOnly: false,
  },
  {
    id: 'vibrant-villages',
    title: 'Vibrant Villages Programme & Border Tourism',
    unitOrContext: 'Government of India Scheme / Ladakh Tourism',
    tags: ['Border Tourism', 'Scripting & Voice-over', 'Video Production'],
    narrative:
      'Ārohana contributed communication and video work connected with the Vibrant Villages Programme and border-tourism initiatives in Ladakh, including scripting, voice-over and production.',
    gallery: [
      { image: '/images/army/vibrant-villages-1.jpg', caption: 'Border tourism storytelling: Showcasing village community life, cultural landscapes, and sustainable local enterprise.', alt: 'Vibrant Villages border tourism' },
    ],
    isTextOnly: false,
  },
  {
    id: '12-rr-confidential',
    title: '12 Rashtriya Rifles / Delta Force — Selected Project Work',
    unitOrContext: '12 Rashtriya Rifles / Delta Force',
    tags: ['Operational Communication', 'Confidential Brief'],
    narrative:
      'Ārohana has also undertaken project work associated with 12 Rashtriya Rifles under Delta Force. No project details are to be published. Text-only mention under standard information security and clearance protocols.',
    gallery: [],
    isTextOnly: true,
  },
];

export const SEED_CLIENT_LOGOS: ClientLogoItem[] = [
  { id: '1', brandName: 'Raysons Group', logoFile: '/images/logos/raysons.svg', isPublicApproved: true, sector: 'Industry & Realty' },
  { id: '2', brandName: 'PictureTime', logoFile: '/images/logos/picturetime.svg', isPublicApproved: true, sector: 'Entertainment' },
  { id: '3', brandName: 'Loom Crafts', logoFile: '/images/logos/loom-crafts.svg', isPublicApproved: true, sector: 'Luxury & Architecture' },
  { id: '4', brandName: 'Neora Deck', logoFile: '/images/logos/neora.svg', isPublicApproved: true, sector: 'Hospitality' },
  { id: '5', brandName: 'Misu', logoFile: '/images/logos/misu.svg', isPublicApproved: true, sector: 'Hospitality' },
  { id: '6', brandName: 'RR Skins', logoFile: '/images/logos/rrskins.svg', isPublicApproved: true, sector: 'Healthcare' },
  { id: '7', brandName: 'Blu Resorts', logoFile: '/images/logos/blu.svg', isPublicApproved: true, sector: 'Hospitality' },
  { id: '8', brandName: 'Qubice', logoFile: '/images/logos/qubice.svg', isPublicApproved: true, sector: 'Design & Realty' },
  { id: '9', brandName: 'Kanopy', logoFile: '/images/logos/kanopy.svg', isPublicApproved: true, sector: 'Lifestyle' },
  { id: '10', brandName: 'Citron', logoFile: '/images/logos/citron.svg', isPublicApproved: true, sector: 'Hospitality' },
  { id: '11', brandName: 'DTK Karekar Jewellery', logoFile: '/images/logos/dtk.svg', isPublicApproved: true, sector: 'Luxury Retail' },
  { id: '12', brandName: 'Western Command', logoFile: '/images/logos/western-command.svg', isPublicApproved: true, sector: 'Defence' },
  { id: '13', brandName: '14 Corps', logoFile: '/images/logos/14-corps.svg', isPublicApproved: true, sector: 'Defence' },
  { id: '14', brandName: 'Fire & Fury', logoFile: '/images/logos/fire-fury.svg', isPublicApproved: true, sector: 'Defence' },
];

export const SEED_HOME_PAGE: HomePageSingleton = {
  heroVideoUrl: '/videos/hero-montage.mp4',
  heroFallbackImage: '/images/home/hero-poster.jpg',
  heroTagline: 'Brands, Businesses & Experiences',
  heroHeadline: 'We build brands, businesses & experiences.',
  heroDescription:
    'Ārohana brings together business thinking, creative communication and execution — from digital brand growth and content to hospitality consulting and complex on-ground projects.',
  heroPrimaryCtaText: 'Start a conversation',
  heroPrimaryCtaLink: '/contact',
  heroSecondaryCtaText: 'See our work',
  heroSecondaryCtaLink: '/work',
  povSection: {
    tag: 'A Point of View',
    headline: 'Some businesses need better marketing. Others need a better way of thinking about the business itself.',
    bodyNarrative1:
      'Ārohana works where those two things meet. We bring the commercial context, sector understanding and creative execution needed to move from an idea to something people can actually see, understand and act on.',
    bodyNarrative2:
      'We do not separate business strategy from creative execution. The team that defines your market positioning directs your video shoots, structures your operational SOPs, and manages your brand rollout.',
    portraitImage: '/images/home/madhura-editorial.jpg',
    portraitAlt: 'Madhura Hawal on-ground directing a project in Ladakh',
    portraitCaption: 'Madhura Hawal on-ground directing projects across Ladakh and regional commercial hubs.',
    founderBadge: 'Madhura Hawal · Founder',
  },
  featuredCaseStudySlugs: ['raysons-group', 'loom-crafts', 'picturetime', 'she', 'misu', 'rr-skins'],
  armyTeaserImages: ['/images/army/western-command-1.jpg', '/images/army/rezang-la-1.jpg'],
  tourinTeaserImages: ['/images/tourin/tourin-1.jpg', '/images/tourin/tourin-2.jpg'],
  contactDetails: {
    email: 'founder@byarohana.com',
    phone: '+918380092241',
    displayPhone: '+91 8380092241',
  },
};

export const SEED_ABOUT_PAGE: AboutPageSingleton = {
  heroQuote: 'The road to Ārohana was anything but straight. I built it after spending years inside businesses — learning what makes them work, what makes them struggle, and what people see only after they become responsible for the whole thing.',
  heroSubheadline: 'Founder Story & Philosophy · Madhura Hawal',
  founderStory: [
    {
      title: 'It Started With Hospitality',
      content:
        'My first world was hospitality. I studied Hospitality Management in Muscat before completing my degree in Goa. While I was studying in Goa, I was selected among the Top 13 finalists from the West Zone for Femina Miss India — an unexpected opportunity that took me into a completely different world and taught me a great deal about confidence, communication and being comfortable outside my comfort zone. Not long after, I was selected as one of just 16 students from across India for the Taj Management Training Programme.\n\nOver the years, I worked in Muscat, returned to Kolhapur and eventually decided to build something of my own — Mother India Cafe. Running a café teaches you things no business textbook can quite prepare you for. You learn about people, margins, suppliers, staff, customers, bad days, good days and the uncomfortable reality that every decision eventually shows up in the numbers.\n\nWhile the café was still running, another opportunity took me to Goa. I joined Passcode Hospitality as Operations Head and worked on two upcoming restaurants, Pings Bia Hoi and Jamun. That experience took me deeper into the machinery behind a hospitality business — not just how a brand looks, but how an experience is actually built.\n\nLater, I moved into institutional business and sales with Latambarcem Brewers Private Limited, working across Goa and Delhi. It gave me another perspective on business: relationships, commercial thinking, negotiation and growth.\n\nBy then, I had understood something that would eventually become central to Ārohana: a business can have a great-looking brand and still have a problem underneath it. And sometimes what looks like a marketing problem isn’t a marketing problem at all.',
    },
    {
      title: 'There Were a Few Unexpected Detours',
      content:
        'And then, like it did for so many people, COVID changed the direction of things. The café had to close. My work in hospitality was disrupted. What came next wasn’t a carefully planned five-year strategy. It was the beginning of a different kind of work. That work gradually became Ārohana.',
    },
    {
      title: 'And Then, The Work Got Interesting',
      content:
        'What began with digital marketing projects slowly expanded. We found ourselves working with restaurants and resorts, real-estate businesses, healthcare brands, consumer businesses and entertainment companies. Sometimes the requirement was a brand strategy. Sometimes it was a complete digital presence. Sometimes it was a campaign, a film, a new menu or an operational problem inside a restaurant.\n\nAnd sometimes the brief took us somewhere completely unexpected. My work in Ladakh became one of those chapters. There, I worked on projects associated with the Indian Army, including work connected with 14 Corps, Fire & Fury Corps, Operation Sadbhavana and Operation Sampark. That work eventually extended to other Army environments as well, including Western Command and 12 Rashtriya Rifles under Delta Force.\n\nThe environments were different. The audiences were different. The responsibility was different. And that experience reinforced something I had already learnt from hospitality: you cannot create meaningful communication without understanding the people, the environment and the reality behind it.',
    },
    {
      title: 'Where Ārohana Stands Today',
      content:
        'What remains constant is the standard: clear thinking, sector-aware strategy, strong creative work and disciplined execution — brought together to make the business more visible, more relevant and more valuable to the people it is trying to reach.\n\nThat is also why our work can move from a real-estate brand to a healthcare practice, from a restaurant to a consumer brand, or from a commercial campaign to a project in an entirely different environment. The category changes. The thinking has to change with it.\n\nThe work may begin with a brand question, a business challenge or simply the sense that something is not working as it should. From there, strategy, communication, creative and execution come together around what the business actually needs — rather than around a fixed list of deliverables.\n\nWe work with businesses at points where a standard agency approach is not enough — when a brand needs sharper positioning, a stronger market presence, a more deliberate digital strategy, or a hospitality business needs to rethink the experience it is creating.\n\nToday, Ārohana sits at the intersection of brand thinking, business understanding and execution.',
    },
  ],
  founderPortraits: [
    {
      src: '/images/about/madhura-portrait.jpg',
      alt: 'Madhura Hawal, Founder of Ārohana',
      caption: 'Madhura Hawal · Founder & Principal Consultant',
    },
    {
      src: '/images/about/mother-india-cafe.jpg',
      alt: 'Mother India Cafe in Kolhapur',
      caption: 'Mother India Cafe: Entrepreneurial operations on the ground.',
    },
    {
      src: '/images/about/hospitality-muscat.jpg',
      alt: 'Hospitality Management in Muscat & Goa',
      caption: 'Hospitality operations & guest experience management.',
    },
    {
      src: '/images/about/passcode-ops.jpg',
      alt: 'Passcode Hospitality operations',
      caption: 'Passcode Hospitality: Pre-opening and floor operations.',
    },
    {
      src: '/images/about/covid-pivot.jpg',
      alt: 'Transition during COVID period',
      caption: 'The pivot towards multi-sector creative consulting.',
    },
    {
      src: '/images/about/ladakh-field.jpg',
      alt: 'Ladakh on-ground project work',
      caption: 'High-altitude production and field execution in Ladakh.',
    },
    {
      src: '/images/about/arohana-today.jpg',
      alt: 'Ārohana today: Strategy & execution',
      caption: 'Where Ārohana stands today: Brand thinking & execution.',
    },
  ],
  pullQuotes: [
    '“A business can have a great-looking brand and still have a problem underneath it. And sometimes what looks like a marketing problem isn’t a marketing problem at all.”',
    '“You cannot create meaningful communication without understanding the people, the environment and the reality behind it.”',
    '“A brand is only as strong as the thinking behind it.”',
  ],
};

export const SEED_SERVICES_PAGE: ServicesPageSingleton = {
  digitalBrandGrowthItems: [
    'Brand Architecture & Identity Systems',
    'High-Velocity Digital Growth & Content Systems',
    'Go-To-Market & Commercial Launch Strategy',
    'Multi-Entity Corporate Communication Hierarchies',
    'Website & Digital Experience Direction',
  ],
  hospitalityConsultingItems: [
    'Pre-Opening F&B Concept & Space Positioning',
    'Menu Margin Engineering & Kitchen Recipe Costing',
    'Service SOPs & Operational Workflow Audits',
    'Guest Acquisition & Event Programming',
    'Staff Protocol & Service Choreography Training',
  ],
  contentProductionItems: [
    'Documentary & High-Altitude Film Production',
    'Industrial & Foundry Process Cinematography',
    'Protocol & Ceremonial Live Shoot Direction',
    'Coffee Table Books & Hardbound Publication Design',
    'Architectural, Drone & Interior Photography',
  ],
  engagementModels: [
    {
      modelName: 'Strategic Retainer Partnership',
      bestForDescription:
        'Ongoing end-to-end creative direction, monthly production shoots, digital growth management, and senior leadership advisory.',
      scopeSummary: 'Monthly Retainer · 6 or 12-Month Engagements',
    },
    {
      modelName: 'Standalone Project & Production Sprint',
      bestForDescription:
        'Fixed-scope deliverables such as documentary films, brand launches, commemorative publications, or operational F&B audits.',
      scopeSummary: 'Fixed-Scope Milestone Deliveries',
    },
    {
      modelName: 'Embedded Operational Consulting',
      bestForDescription:
        'Deep-dive on-ground hospitality consulting, menu engineering, and operational restructuring for resorts and dining brands.',
      scopeSummary: 'On-Site Diagnostic & Execution Phase',
    },
  ],
};

export const SEED_SEO_METADATA: SeoMetadataCollection = {
  home: {
    metaTitle: 'Ārohana Consultancy | Brand Strategy, Hospitality & Experience Design',
    metaDescription: 'Ārohana builds brands, businesses & experiences combining commercial strategy, culinary consulting, and disciplined production.',
    canonicalUrl: 'https://byarohana.com',
    ogImage: '/images/home/hero-poster.jpg',
  },
  about: {
    metaTitle: 'About Ārohana | Founder Story & Philosophy — Madhura Hawal',
    metaDescription: 'Discover the founder story, philosophy, and cross-sector capability behind Ārohana Consultancy.',
    canonicalUrl: 'https://byarohana.com/about',
    ogImage: '/images/home/madhura-editorial.jpg',
  },
  services: {
    metaTitle: 'Services & Capabilities | Ārohana Consultancy',
    metaDescription: 'Explore our core capability pillars: Brand Growth, Hospitality Consulting, and Film & Content Production.',
    canonicalUrl: 'https://byarohana.com/services',
    ogImage: '/images/case-studies/raysons-hero.jpg',
  },
  work: {
    metaTitle: 'Selected Work & Case Studies | Ārohana Consultancy',
    metaDescription: 'Explore six primary case studies and our project directory across hospitality, industry, defence, and travel.',
    canonicalUrl: 'https://byarohana.com/work',
    ogImage: '/images/case-studies/loom-hero.jpg',
  },
  tourin: {
    metaTitle: 'Tourin | Experiential Ladakh Travel & Journeys',
    metaDescription: 'Tourin creates thoughtful, experiential journeys beginning with Ladakh — for travellers who want to experience a place beyond the usual itinerary.',
    canonicalUrl: 'https://byarohana.com/tourin',
    ogImage: '/images/tourin/tourin-hero.jpg',
  },
  armyProjects: {
    metaTitle: 'Indian Army Projects | Ārohana Consultancy',
    metaDescription: 'Selected Indian Army projects by Ārohana across communication, design, publications, storytelling, video production and community-focused initiatives.',
    canonicalUrl: 'https://byarohana.com/indian-army-projects',
    ogImage: '/images/army/army-hero.jpg',
  },
  contact: {
    metaTitle: 'Contact Ārohana | Start a Conversation',
    metaDescription: 'Have a brand, hospitality, or production challenge? Connect directly with the founder.',
    canonicalUrl: 'https://byarohana.com/contact',
    ogImage: '/images/home/hero-poster.jpg',
  },
};

export const SEED_INQUIRIES: CrmInquiry[] = [
  {
    id: 'inq-1001',
    name: 'Vikramaditya Shinde',
    email: 'vikram@shindegroup.in',
    phone: '+91 98220 11445',
    company: 'Shinde Hospitality & Estates',
    service: 'Hospitality Operations & Consulting',
    message: 'Opening a 45-key boutique resort in Assagao, Goa. Require full pre-opening F&B concept design and operational SOPs.',
    status: 'new',
    createdAt: '2026-08-22T14:32:00.000Z',
    notes: 'Urgent inquiry. Target opening Q4 2026. Preliminary discovery call scheduled.',
  },
  {
    id: 'inq-1002',
    name: 'Col. Ranjit Verma (Retd.)',
    email: 'ranjit.verma@westerncommand-trust.org',
    phone: '+91 94191 88231',
    company: 'Western Command Heritage Cell',
    service: 'Content, Documentary & Film Production',
    message: 'Looking for documentary production and hardbound commemorative book for Corps Raising Day.',
    status: 'proposal_sent',
    createdAt: '2026-08-20T09:15:00.000Z',
    notes: 'Draft proposal and sample spreads submitted.',
  },
];
