import { ProjectDirectoryItem, BrandLogo, SectorType } from '@/types';

export const SECTORS: SectorType[] = [
  'Hospitality & F&B',
  'Real Estate & Built Environment',
  'Healthcare',
  'Lifestyle & Consumer',
  'Entertainment & Media',
  'Travel & Tourism',
  'Institutional / Community',
];

export const PROJECT_DIRECTORY: ProjectDirectoryItem[] = [
  // Hospitality & F&B
  {
    id: 'misu',
    name: 'Misu',
    sector: 'Hospitality & F&B',
    tags: ['Hospitality Consulting', 'Menu Engineering', 'Digital Execution'],
    description: 'Contemporary Pan-Asian dining brand. Kitchen operations, menu margin engineering, and integrated visual storytelling.',
    image: '/images/work/misu-thumb.jpg',
    caseStudySlug: 'misu',
  },
  {
    id: 'neora-deck',
    name: 'Neora Deck',
    sector: 'Hospitality & F&B',
    tags: ['Brand Concept', 'Digital Marketing', 'Launch Strategy'],
    description: 'High-end experiential rooftop dining space. Concept positioning, menu communication, and luxury guest acquisition.',
    image: '/images/work/neora-thumb.jpg',
  },
  {
    id: 'blu-resorts',
    name: 'Blu Resorts',
    sector: 'Hospitality & F&B',
    tags: ['Resort Hospitality', 'F&B Operations', 'Digital Strategy'],
    description: 'Destination leisure resort. F&B revenue optimization, guest stay communication, and multi-season brand campaigns.',
    image: '/images/work/blu-thumb.jpg',
  },
  {
    id: 'qubice',
    name: 'Qubice',
    sector: 'Hospitality & F&B',
    tags: ['Café Concept', 'Social Media', 'Visual Identity'],
    description: 'Artisanal modern café concept. Brand identity rollout, interior menu choreography, and youth-focused digital engagement.',
    image: '/images/work/qubice-thumb.jpg',
  },
  {
    id: 'kanopy',
    name: 'Kanopy',
    sector: 'Hospitality & F&B',
    tags: ['Dining Experience', 'Creative Direction', 'Content Production'],
    description: 'Nature-immersed dining property. Atmospheric video storytelling, seasonal menu promotion, and digital guest reservations.',
    image: '/images/work/kanopy-thumb.jpg',
  },
  {
    id: 'sorriso',
    name: 'Sorriso',
    sector: 'Hospitality & F&B',
    tags: ['Gourmet Dining', 'Menu Design', 'Brand Story'],
    description: 'Italian culinary dining experience. Menu curation communication, wine and beverage promotion, and digital retention.',
    image: '/images/work/sorriso-thumb.jpg',
  },
  {
    id: 'spice-goa',
    name: 'Spice Goa',
    sector: 'Hospitality & F&B',
    tags: ['Culinary Heritage', 'Kitchen Systems', 'Hospitality Consulting'],
    description: 'Iconic authentic Goan seafood institution. Operational workflow refinement, culinary legacy positioning, and digital reach.',
    image: '/images/work/spicegoa-thumb.jpg',
  },
  {
    id: 'khana-khazana',
    name: 'Khana Khazana',
    sector: 'Hospitality & F&B',
    tags: ['Menu Optimization', 'SOPs', 'Local Marketing'],
    description: 'High-volume family dining establishment. Kitchen pass SOPs, food costing discipline, and structured local dining campaigns.',
    image: '/images/work/khanakhazana-thumb.jpg',
  },
  {
    id: 'khau-gali',
    name: 'Khau Gali',
    sector: 'Hospitality & F&B',
    tags: ['Food Street Concept', 'Brand Identity', 'Operational Setup'],
    description: 'Multi-cuisine street food destination. Quick-service operational systems, brand identity, and footfall activation.',
    image: '/images/work/khaugali-thumb.jpg',
  },

  // Real Estate & Built Environment
  {
    id: 'raysons-group',
    name: 'Raysons Group',
    sector: 'Real Estate & Built Environment',
    tags: ['Group Architecture', 'Industrial Film', 'Real Estate Marketing'],
    description: 'Multi-business enterprise spanning industrial casting, residential developments, and hospitality assets.',
    image: '/images/work/raysons-thumb.jpg',
    caseStudySlug: 'raysons-group',
  },
  {
    id: 'citron',
    name: 'Citron',
    sector: 'Real Estate & Built Environment',
    tags: ['Real Estate Launch', 'Architectural Communication', 'Lead Campaigns'],
    description: 'Contemporary residential development. Architectural USP articulation, site walkthrough films, and targeted buyer communication.',
    image: '/images/work/citron-thumb.jpg',
  },
  {
    id: 'loom-crafts',
    name: 'Loom Crafts',
    sector: 'Real Estate & Built Environment',
    tags: ['Luxury Furniture', 'Modular Prefab', 'B2B Strategy'],
    description: 'Dual-journey brand architecture separating luxury all-weather furniture from modular architectural prefab living systems.',
    image: '/images/work/loom-thumb.jpg',
    caseStudySlug: 'loom-crafts',
  },

  // Healthcare
  {
    id: 'rr-skins',
    name: 'RR Skins',
    sector: 'Healthcare',
    tags: ['Medical Trust', 'Patient Education', 'Doctor Positioning'],
    description: 'Specialised clinical dermatology and aesthetics practice. Replacing commercial hype with medical trust and patient education.',
    image: '/images/work/rrskins-thumb.jpg',
    caseStudySlug: 'rr-skins',
  },

  // Lifestyle & Consumer
  {
    id: 'dtk-karekar',
    name: 'DTK Karekar Jewellery',
    sector: 'Lifestyle & Consumer',
    tags: ['Heritage Jewellery', 'Visual Identity', 'Campaign Films'],
    description: 'Generational fine jewellery house. Heritage craftsmanship narrative, festive collections, and elevated visual campaigns.',
    image: '/images/work/dtk-thumb.jpg',
  },
  {
    id: 'fraganta',
    name: 'Fraganta',
    sector: 'Lifestyle & Consumer',
    tags: ['Luxury Fragrance', 'Packaging Aesthetic', 'Digital Launch'],
    description: 'Artisanal luxury fragrance and olfactory brand. Sensory copywriting, aesthetic product styling, and direct-to-consumer digital presence.',
    image: '/images/work/fraganta-thumb.jpg',
  },

  // Entertainment & Media
  {
    id: 'picturetime',
    name: 'PictureTime',
    sector: 'Entertainment & Media',
    tags: ['Cultural Infrastructure', 'High-Altitude Cinema', 'Documentary'],
    description: 'Mobile digital cinema technology bringing theatrical releases, cultural access, and film festival infrastructure to remote India.',
    image: '/images/work/picturetime-thumb.jpg',
    caseStudySlug: 'picturetime',
  },

  // Travel & Tourism
  {
    id: 'tourin',
    name: 'Tourin',
    sector: 'Travel & Tourism',
    tags: ['Experiential Travel', 'Ladakh Journeys', 'Owned Brand'],
    description: 'Ārohana-owned experiential travel brand. Slower, lived-in journeys across Ladakh focusing on culture, people, and landscape.',
    image: '/images/work/tourin-thumb.jpg',
  },
  {
    id: 'holiday-village',
    name: 'Holiday Village',
    sector: 'Travel & Tourism',
    tags: ['Resort Destination', 'Guest Journey', 'Visual Identity'],
    description: 'Eco-resort and family retreat. Experience storytelling, family package communication, and direct booking campaigns.',
    image: '/images/work/holidayvillage-thumb.jpg',
  },

  // Institutional / Community
  {
    id: 'she-initiative',
    name: 'SHE — Sustainable Health Empowerment',
    sector: 'Institutional / Community',
    tags: ['Operation Sadbhavana', 'Community Health', 'Documentary Film'],
    description: 'High-altitude women’s health and hygiene initiative implemented across 8 remote villages in Ladakh.',
    image: '/images/work/she-thumb.jpg',
    caseStudySlug: 'she',
  },
  {
    id: 'operation-sampark',
    name: 'Operation Sampark',
    sector: 'Institutional / Community',
    tags: ['Border Tourism', 'Homestay Training', 'Hospitality Video'],
    description: 'Practical hospitality and hygiene training workshops for border village homestay hosts, supported by social media video content.',
    image: '/images/work/sampark-thumb.jpg',
  },
  {
    id: 'army-engagements',
    name: 'Selected Indian Army Projects',
    sector: 'Institutional / Community',
    tags: ['Publication Design', 'Military Filming', 'On-Ground Execution'],
    description: 'Communication, documentary production, and publication design across 14 Corps, Western Command, and regimental commemorations.',
    image: '/images/work/army-thumb.jpg',
  },
];

export const BRANDS_WORKED_WITH: BrandLogo[] = [
  { name: 'Raysons Group', sector: 'Industrial & Real Estate', initials: 'RG' },
  { name: 'PictureTime', sector: 'Entertainment & Cinema', initials: 'PT' },
  { name: 'Loom Crafts', sector: 'Luxury Furniture & Prefab', initials: 'LC' },
  { name: 'Neora Deck', sector: 'Hospitality & Dining', initials: 'ND' },
  { name: 'Misu', sector: 'Pan-Asian Dining', initials: 'MI' },
  { name: 'RR Skins', sector: 'Clinical Healthcare', initials: 'RR' },
  { name: 'Blu Resorts', sector: 'Leisure Hospitality', initials: 'BR' },
  { name: 'Qubice', sector: 'Artisanal Café', initials: 'QU' },
  { name: 'Kanopy', sector: 'Experiential F&B', initials: 'KN' },
  { name: 'Citron', sector: 'Residential Built Environment', initials: 'CT' },
  { name: 'DTK Karekar Jewellery', sector: 'Fine Jewellery', initials: 'DT' },
  { name: 'Sorriso', sector: 'Gourmet Italian Dining', initials: 'SR' },
  { name: 'Spice Goa', sector: 'Culinary Heritage', initials: 'SG' },
  { name: 'Fraganta', sector: 'Luxury Fragrance', initials: 'FG' },
  { name: 'Holiday Village', sector: 'Eco Tourism & Resorts', initials: 'HV' },
];
