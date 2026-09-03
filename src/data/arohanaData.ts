// src/data/arohanaData.ts
export interface RealmItem {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  location: string;
  description: string;
  themeColor: string;
  bgAtmosphere: string;
}

export interface ProofItem {
  number: string;
  label: string;
  title: string;
  headline: string;
  description: string;
  metric: string;
  metricLabel: string;
}

export interface ArmyProject {
  id: string;
  number: string;
  formation: string;
  title: string;
  elevation: string;
  theatre: string;
  description: string;
  protocols: string[];
}

export interface CaseStudy {
  id: string;
  number: string;
  name: string;
  category: string;
  sector: string;
  location: string;
  headline: string;
  summary: string;
  impactMetrics: { label: string; value: string }[];
  tag: string;
}

export interface Capability {
  id: string;
  number: string;
  title: string;
  summary: string;
  tags: string[];
}

export interface Principle {
  number: string;
  title: string;
  category: string;
  description: string;
  quote: string;
}

export const AROHANA_DATA = {
  meta: {
    name: 'ĀROHANA CONSULTANCY',
    descriptor: 'BRAND · BUSINESS · EXPERIENCE',
    archiveCode: 'SPATIAL ARCHIVE // EST. 2020',
    coordinates: '16°41\'N 74°14\'E',
    territories: 'MUMBAI · GOA · LADAKH',
    contactEmail: 'connect@arohana.co.in',
    directEmail: 'madhura@arohana.co.in',
  },

  hero: {
    tagline: 'BRAND · BUSINESS · EXPERIENCE',
    mainHeading: ['WE BUILD BRANDS,', 'BUSINESSES &', 'EXPERIENCES.'],
    subtext: 'A strategic creative practice for ambitious enterprises.',
    cta: 'Start a conversation',
  },

  positioning: {
    kicker: 'POSITIONING // STRATEGIC DISCIPLINE',
    statementPrimary: 'Some businesses need better marketing.',
    statementSecondary: 'Others need a better way of thinking about the business itself.',
    intersection: {
      title: 'THE INTERSECTION',
      text: 'Ārohana operates at the convergence of commercial strategy, creative architecture, and boots-on-the-ground operational execution. We do not separate brand perception from balance sheet unit economics.',
    },
    reality: {
      title: 'THE REALITY',
      text: 'Whether restructuring a multi-entity industrial group, launching a high-altitude cinema network in Ladakh, or auditing restaurant kitchen margins, our work produces verified, repeatable outcomes.',
    },
  },

  realms: [
    {
      id: 'ladakh',
      number: '01',
      name: 'LADAKH',
      subtitle: 'HIGH-ALTITUDE FRONTIERS',
      location: 'Leh, Nubra, Chushul & Changthang',
      description: 'High-altitude operations, border village healthcare, and raw Himalayan expeditions at 14,000+ ft.',
      themeColor: '#C5A46D',
      bgAtmosphere: '#050c1e',
    },
    {
      id: 'foundries',
      number: '02',
      name: 'FOUNDRIES',
      subtitle: 'HEAVY INDUSTRY & REALTY',
      location: 'Kolhapur & Regional Industrial Corridors',
      description: 'Engineering conglomerates, foundry clusters, architectural prefab systems, and multi-entity governance.',
      themeColor: '#B87333',
      bgAtmosphere: '#140c06',
    },
    {
      id: 'dining',
      number: '03',
      name: 'DINING',
      subtitle: 'HOSPITALITY ARCHITECTURE',
      location: 'Goa, Bangalore & Western Hubs',
      description: 'Culinary concepts, pass SOPs, beverage distribution, kitchen margins, and experiential guest acquisition.',
      themeColor: '#8E9E82',
      bgAtmosphere: '#07120e',
    },
    {
      id: 'films',
      number: '04',
      name: 'FILMS',
      subtitle: 'DOCUMENTARY & INSTITUTIONAL',
      location: 'Northern Frontiers & National Broadcasters',
      description: 'High-impact 4K institutional documentaries, military legacy documentation, and cinematic brand narratives.',
      themeColor: '#A85A48',
      bgAtmosphere: '#12080a',
    },
  ] as RealmItem[],

  proof: {
    headline: 'Real-world execution.',
    subline: 'Not theoretical decks.',
    overview: 'The rare combination of business-side hospitality leadership, digital creative capability, and boots-on-the-ground delivery.',
    items: [
      {
        number: '01',
        label: 'GOVERNANCE',
        title: 'FOUNDER & EXECUTIVE ENGAGEMENT',
        headline: 'Direct strategic partnership with zero outsourced agency bureaucracy.',
        description: 'Every brief is directed by principal leadership with real operational P&L accountability, ensuring that high-level strategy never dissolves in execution.',
        metric: '100%',
        metricLabel: 'PRINCIPAL INVOLVEMENT',
      },
      {
        number: '02',
        label: 'SECTOR DEPTH',
        title: 'CORE INDUSTRY VERTICALS',
        headline: 'Hospitality · Real Estate · Healthcare · Luxury · Defence · Travel.',
        description: 'Deep domain immersion across complex operating models. We don\'t apply consumer app marketing templates to high-stakes industrial or institutional briefs.',
        metric: '06',
        metricLabel: 'INDUSTRY VERTICALS',
      },
      {
        number: '03',
        label: 'FIELD RIGOR',
        title: 'FT OPERATIONAL ELEVATIONS',
        headline: 'Zero-failure execution under severe Himalayan winter field conditions.',
        description: 'From producing documentaries for 14 Corps in Leh to mobile digital cinema networks across Ladakh, we deliver where conventional agencies cannot mobilize.',
        metric: '14K+',
        metricLabel: 'ELEVATION CAPABILITY',
      },
      {
        number: '04',
        label: 'EXECUTION',
        title: 'CAPABILITY INTEGRATION',
        headline: 'Commercial Strategy → Creative Direction → Floor Execution.',
        description: 'From culinary menu engineering and pass SOPs to 4K cinematic origin films and full-funnel acquisition, we own the complete lifecycle.',
        metric: 'Turnkey',
        metricLabel: 'END-TO-END DELIVERY',
      },
    ] as ProofItem[],
  },

  armyProjects: [
    {
      id: 'western-command',
      number: '01',
      formation: 'Western Command Headquarters',
      title: 'Command History & Institutional Documentation',
      elevation: 'Field Formations',
      theatre: 'Chandimandir & Operational Formations',
      description: 'Specialized visual documentation, commemorative print collaterals, and high-impact retrospective media produced for Western Command, capturing institutional heritage and operational readiness.',
      protocols: ['Official Military Clearance', 'Historical Verification', 'Archival-Grade Print Production'],
    },
    {
      id: '14-corps',
      number: '02',
      formation: '14 Corps — Fire & Fury',
      title: 'High-Altitude Operational & Logistics Documentation',
      elevation: '11,500 to 18,380 FT',
      theatre: 'Leh, Ladakh & Line of Actual Control',
      description: 'Zero-degree cinematic origin documentation of winter supply lines, air maintenance corridors, and forward post sustaining operations across extreme Himalayan terrain.',
      protocols: ['Sub-Zero Field Rig', 'Tactical Escort Protocols', 'Confidential Handling Standards'],
    },
    {
      id: '69-armoured',
      number: '03',
      formation: '69 Armoured Regiment',
      title: 'Armoured Cavalry & Battle Traditions',
      elevation: 'Tactical Maneuver Zones',
      theatre: 'Western Forward Fronts',
      description: 'Archival chronicle capturing regiment battle honours, tank formations in forward deployment, and ceremonial regimental legacy collaterals.',
      protocols: ['Regimental Archive Access', 'Mechanised Formations Clearance'],
    },
    {
      id: 'rezang-la',
      number: '04',
      formation: 'Rezang La Memorial Documentation',
      title: 'Battlefield Memorial & Legacy Preservation',
      elevation: '16,404 FT',
      theatre: 'Chushul Sector, Eastern Ladakh',
      description: 'Documenting the sacred 1962 battlefield memorial at 16,400 ft, capturing both architectural restoration and immortal sacrifice through austere photographic and documentary media.',
      protocols: ['High-Altitude Acclimatisation', 'Sacred Memorial Protocols', 'Ceremonial Archive'],
    },
    {
      id: 'bro-sampark',
      number: '05',
      formation: 'Project Sampark — Border Roads Organisation',
      title: 'Strategic Highway Engineering & Mountain Passes',
      elevation: 'Mountain Passes & Tunnels',
      theatre: 'Jammu & Kashmir Frontiers',
      description: 'Documenting high-risk bridge construction, all-weather avalanche gallerie cutting, and vital strategic road infrastructure keeping border zones accessible year-round.',
      protocols: ['Blasting Zone Clearance', 'Engineering Terrain Mapping', 'Infrastructure Retrospective'],
    },
  ] as ArmyProject[],

  founder: {
    name: 'MADHURA HAWAL',
    role: 'FOUNDER & PRINCIPAL CONSULTANT',
    subrole: 'COMMERCIAL STRATEGY · HOSPITALITY OPERATIONS · SPECIAL PROJECTS',
    quote: '“The road to Ārohana was built inside businesses — learning what makes them struggle, and what you see only when you are accountable for the whole thing.”',
    story: [
      'Having trained inside luxury five-star operations with the prestigious Taj Management Training Programme, founded and operated Mother India Cafe from scratch, directed craft beverage distribution in Goa, and managed high-altitude field logistics for the Indian Army in Ladakh, Madhura brings uncommon ground reality to executive consulting.',
      'We reject the agency echo chamber where vanity awards are celebrated while business owners grapple with unit economics, kitchen variance, and fragmented digital acquisition.',
    ],
    pillars: [
      { number: '01', title: 'TAJ MANAGEMENT', detail: '1 of 16 Selected Nationwide', note: 'Five-star luxury operations & culinary standards' },
      { number: '02', title: 'CAFE OPERATOR', detail: 'Mother India Cafe', note: 'Hands-on P&L, pass SOPs & staff management' },
      { number: '03', title: 'LADAKH EXPEDITIONS', detail: '14,000+ FT Defence Ops', note: 'Extreme field logistics & remote deployments' },
    ],
  },

  capabilities: [
    {
      id: 'digital-brand-growth',
      number: '01',
      title: 'Digital Brand Growth',
      summary: 'Strategy-led digital presence, content, campaigns and performance systems that build your brand and grow your business.',
      tags: [
        'Brand Strategy', 'Market Positioning', 'Strategic Communication', 
        'Content Strategy', 'Social Media Management', 'Creative Direction', 
        'Copywriting & Voice', 'Graphic Design Systems', 'Acquisition Systems'
      ],
    },
    {
      id: 'hospitality-consulting',
      number: '02',
      title: 'Hospitality Consulting',
      summary: 'From concept to operations — we design, streamline and optimize hospitality businesses for consistent experience and profitability.',
      tags: [
        'Concept & Menu Design', 'Margin & Food Cost Engineering', 'Kitchen Pass SOPs', 
        'Staff Training Frameworks', 'Beverage Program Architecture', 'Guest Acquisition',
        'Interior Narrative Alignment', 'Audit & Variance Control'
      ],
    },
    {
      id: 'content-production',
      number: '03',
      title: 'Content & Brand Production',
      summary: 'Films, brand stories and visual content that communicate clearly and create impact.',
      tags: [
        '4K Cinematic Origin Films', 'High-Altitude Field Documentaries', 'Architectural Stills',
        'Packaging & Print Architecture', 'Brand Heritage Books', 'Executive Video Collaterals'
      ],
    },
  ] as Capability[],

  caseStudies: [
    {
      id: 'raysons-group',
      number: '01',
      name: 'Raysons Group',
      category: 'Real Estate & Heavy Engineering',
      sector: 'Foundry & High-End Realty',
      location: 'Kolhapur & Regional Hubs',
      headline: 'Multi-entity corporate architecture and luxury residential brand positioning.',
      summary: 'A multi-entity partnership spanning luxury residential developments, industrial engineering, foundry operations, and corporate presentation films.',
      impactMetrics: [
        { label: 'Entities Integrated', value: '4 Major Units' },
        { label: 'Film & Print Collateral', value: 'Complete Overhaul' },
      ],
      tag: 'INDUSTRIAL CONGLOMERATE',
    },
    {
      id: 'loom-crafts',
      number: '02',
      name: 'Loom Crafts',
      category: 'Prefab Architecture & Outdoor Living',
      sector: 'Luxury Outdoor & Modular Architecture',
      location: 'Pan-India & International',
      headline: 'Positioning modular architectural living for ultra-luxury residential and resort sectors.',
      summary: 'Positioning high-end all-weather architectural living systems, modular prefab villas, and luxury outdoor furniture across architects, developers, and premium homeowners.',
      impactMetrics: [
        { label: 'Catalog Redesign', value: 'Architectural Grade' },
        { label: 'High-Ticket Enquiries', value: '+42% Uplift' },
      ],
      tag: 'ARCHITECTURAL PREFAB',
    },
    {
      id: 'picturetime',
      number: '03',
      name: 'PictureTime Entertainment',
      category: 'Inflatable Cinema & High-Altitude Media',
      sector: 'Entertainment Tech & Mobile Theatres',
      location: 'Ladakh, Leh, Nubra & Remote Frontiers',
      headline: 'Deploying high-altitude cinema network at 11,500 ft in Leh.',
      summary: 'Documenting and expanding mobile digital cinema networks across Ladakh and remote border terrains, bringing world cinema premieres to sub-zero high-altitude regions.',
      impactMetrics: [
        { label: 'Operational Elevation', value: '11,562 FT' },
        { label: 'Cinema Network Reach', value: 'Remote Frontier' },
      ],
      tag: 'MOBILE CINEMA TECH',
    },
    {
      id: 'project-she',
      number: '04',
      name: 'Project SHE',
      category: 'Healthcare & Border Village Welfare',
      sector: 'Institutional Welfare & Documentary',
      location: 'Remote Ladakh Communities',
      headline: 'Documenting women’s menstrual health and clinical access across remote Himalayan valleys.',
      summary: 'Cinematic visual documentation and strategic media coverage of essential health initiatives delivered to remote villages across Nubra, Zanskar, and Changthang.',
      impactMetrics: [
        { label: 'Himalayan Communities', value: '24+ Hamlets' },
        { label: 'Documentary Impact', value: 'State Level' },
      ],
      tag: 'HUMANITARIAN DOC',
    },
    {
      id: 'misu',
      number: '05',
      name: 'Misu Pan-Asian',
      category: 'Hospitality Architecture & F&B Operations',
      sector: 'Contemporary Asian Culinary Brand',
      location: 'Bangalore Western Hubs',
      headline: 'End-to-end guest experience, food cost margin engineering, and acquisition.',
      summary: 'Balancing kitchen pass rhythm, margin engineering, culinary presentation, and digital acquisition for high-volume contemporary Asian dining destinations.',
      impactMetrics: [
        { label: 'Food Cost Margin', value: 'Controlled <28%' },
        { label: 'Footfall Velocity', value: '+35% Consistent' },
      ],
      tag: 'HOSPITALITY F&B',
    },
    {
      id: 'rr-skins',
      number: '06',
      name: 'RR Skins',
      category: 'Clinical Dermatology & Aesthetics',
      sector: 'Medical Aesthetics & Skincare Clinic',
      location: 'Western India Hubs',
      headline: 'Elevating aesthetic clinic perception and consultation conversion architecture.',
      summary: 'Transforming clinical dermatology from routine appointments into high-trust aesthetic consultation and client retention systems.',
      impactMetrics: [
        { label: 'Consultation Conversion', value: '+48%' },
        { label: 'Brand Trust Score', value: 'Premium Grade' },
      ],
      tag: 'AESTHETIC CLINICAL',
    },
  ] as CaseStudy[],

  principles: [
    {
      number: '01',
      title: 'Thinking Beyond Posts',
      category: 'COMMERCIAL STRATEGY',
      description: 'We do not view marketing as a calendar of social posts. Every communication initiative is tied to positioning, commercial clarity and real business outcomes.',
      quote: 'Brand assets and social presence must serve bottom-line economics, not arbitrary vanity engagement.',
    },
    {
      number: '02',
      title: 'Sector Depth Over Templates',
      category: 'DOMAIN RIGOR',
      description: 'We reject cookie-cutter agency templates. Understanding foundry heat cycles, hotel kitchen food costs, or high-altitude logistics requires genuine sector immersion.',
      quote: 'You cannot solve real enterprise problems with generic social media checklists.',
    },
    {
      number: '03',
      title: 'Owning Ground Execution',
      category: 'OPERATIONAL ACCOUNTABILITY',
      description: 'A strategy on paper is only as good as the floor implementation. We stand beside our clients on the manufacturing floor, in the kitchen pass, and on Himalayan passes.',
      quote: 'Strategy without boots on the ground is merely an expensive hallucination.',
    },
    {
      number: '04',
      title: 'Complex & Long-Term Partnerships',
      category: 'RELATIONSHIP MODEL',
      description: 'Our deepest client partnerships span multiple years across multiple group entities. We become an embedded strategic arm, not a revolving vendor.',
      quote: 'We work best when stakes are high and mutual trust is absolute.',
    },
    {
      number: '05',
      title: 'Real, Hard-to-Replicate Proof',
      category: 'EMPIRICAL EVIDENCE',
      description: 'From Indian Army citations to verified P&L turnarounds in commercial hospitality, our portfolio consists of engagements that cannot be faked or easily duplicated.',
      quote: 'Proof is what remains when theoretical presentations are stripped away.',
    },
    {
      number: '06',
      title: 'Direct Decision-Maker Access',
      category: 'ZERO BUREAUCRACY',
      description: 'Clients work directly with principal leaders who have the authority and expertise to make rapid strategic decisions without junior account-manager filters.',
      quote: 'Speed, clarity, and uncompromising accountability at the highest level.',
    },
  ] as Principle[],

  tourin: {
    title: 'AND THEN THERE IS TOURIN.',
    descriptor: 'THE EXPERIENTIAL TRAVEL UNIT // LADAKH',
    quote: '“The Ladakh people experience and the Ladakh most itineraries sell are not always the same.”',
    description: 'Tourin is our experiential curation unit — exploring raw frontiers, remote Himalayan communities, and mindful expeditions. From secluded heritage homestays in orchard valleys to starlit dark-sky sanctuaries and ancient monastery trails, we design travel that leaves you with more than photographs.',
    stats: [
      { value: '15+', label: 'Curated Expeditions' },
      { value: '100%', label: 'Local Mountain Respect' },
      { value: '14,000+', label: 'Mean Altitude FT' },
      { value: 'Zero', label: 'Mass-Market Itineraries' },
    ],
  },
};
