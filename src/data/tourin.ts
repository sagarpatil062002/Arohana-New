export interface TourinGalleryImage {
  src: string;
  caption: string;
  category: 'People & Living Culture' | 'Heritage Stays' | 'Native Culinary' | 'Mountain Trails' | 'High Plateaus' | 'Expeditions';
  alt: string;
}

export interface TourinExperienceItem {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  region: string;
  pacing: string;
  elevation: string;
  bestSeason: string;
  idealFor: string;
  overview: string;
  highlights: string[];
  includedFeatures: string[];
  itineraryPhases: {
    phase: string;
    title: string;
    description: string;
  }[];
  image: string;
  priceIndicator?: string;
  sampleNotice: string;
}

export interface TravelerReflection {
  id: string;
  quote: string;
  author: string;
  journeyType: string;
  location: string;
  year: string;
}

export interface Destination {
  id: string;
  name: string;
  tagline: string;
  state: string;
  status: 'active' | 'coming-soon';
  season: string;
  badge: string;
  description: string;
  highlights: string[];
  image: string;
  alt: string;
}

export interface ExperienceCategory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tag: string;
}

export const DESTINATIONS_DATA: Destination[] = [
  {
    id: 'ladakh',
    name: 'Ladakh',
    tagline: 'The First Journey',
    state: 'UT of Ladakh',
    status: 'active',
    season: 'May — October',
    badge: 'AVAILABLE NOW',
    description:
      'Ancient cliffside monasteries, high-altitude passes, starlit dark sky reserves, and secluded village cultures nestled between the Karakoram and Great Himalaya.',
    highlights: [
      'Hanle Dark Sky Reserve at 14,764 ft',
      'Ancient Hemis & Alchi 11th-century fresco libraries',
      'Changthang high plateaus & nomadic grasslands',
      'Living Silk Route heritage in Turtuk & Nubra',
    ],
    image: '/images/tourin/tourin-hero.jpg',
    alt: 'Dramatic mountains and high altitude landscapes of Ladakh',
  },
  {
    id: 'kashmir',
    name: 'Kashmir',
    tagline: 'Valleys & Living Craft',
    state: 'Jammu & Kashmir',
    status: 'coming-soon',
    season: 'April — November',
    badge: 'COMING SOON',
    description:
      'Meadows of wild flora, centuries of walnut woodcarving and Pashmina weaving, slow cedar houseboat living, and silent alpine glacial trails.',
    highlights: [
      'Dachigam sanctuary & Himalayan black bear trails',
      'Old Srinagar artisan guilds & papier-mâché ateliers',
      'Gurez border valley & pristine Kishanganga river',
      'Aru alpine meadows & secluded shepherd paths',
    ],
    image: '/images/tourin/tourin-gallery-3.jpg',
    alt: 'Scenic valley road and pines in Kashmir',
  },
  {
    id: 'himachal-pradesh',
    name: 'Himachal Pradesh',
    tagline: 'High Passes & Cedar Forests',
    state: 'Himachal Pradesh',
    status: 'coming-soon',
    season: 'Year Round (Regional)',
    badge: 'COMING SOON',
    description:
      'Ancient deodar forests, traditional Kath-Kuni timber architecture, Spiti high desert monastic traditions, and trans-Himalayan shepherd routes.',
    highlights: [
      'Spiti Valley cliffside 1000-year-old gompas',
      'Kinnaur heritage apple valleys & wooden temples',
      'Kath-Kuni stone & timber architectural stays',
      'Pin Valley snow leopard habitat trails',
    ],
    image: '/images/tourin/tourin-1.jpg',
    alt: 'Himalayan architectural heritage and mountain valleys',
  },
  {
    id: 'uttarakhand',
    name: 'Uttarakhand',
    tagline: 'Sacred Confluences & Ridge Trails',
    state: 'Uttarakhand',
    status: 'coming-soon',
    season: 'March — June, Sept — Nov',
    badge: 'COMING SOON',
    description:
      'High oak forests, sacred glacial headwaters, Kumaoni stone hamlets, and silent ridge trails looking out over Nanda Devi and Trishul.',
    highlights: [
      'Nanda Devi biosphere buffer trails',
      'Kumaoni heritage stone village homestays',
      'Alaknanda & Mandakini dramatic river canyons',
      'Chopta & Tungnath high alpine meadows',
    ],
    image: '/images/tourin/tourin-2.jpg',
    alt: 'Vast alpine mountain vistas and ridges in Uttarakhand',
  },
];

export const TOURIN_EXPERIENCES: ExperienceCategory[] = [
  {
    id: 'expeditions',
    title: 'High-Pass Expeditions',
    subtitle: 'Khardung La, Chang La & Remote Passes',
    description:
      'Traverse some of the world’s most dramatic high-altitude motorable passes with engineered logistical support, medical acclimatisation, and seasoned local pilots.',
    image: '/images/tourin/tourin-3.jpg',
    tag: 'Mountain Roads',
  },
  {
    id: 'culture',
    title: 'Living Monastic & Artisan Culture',
    subtitle: 'Ancient Frescoes & Living Faith',
    description:
      'Step into centuries-old prayer halls with resident custodians, witness sacred morning rituals, and spend unhurried hours with traditional wool and woodcraft masters.',
    image: '/images/tourin/tourin-gallery-4.jpg',
    tag: 'Heritage',
  },
  {
    id: 'homestays',
    title: 'Heritage Village Stays',
    subtitle: 'Rammed Earth & Poplar Manors',
    description:
      'Slow down in authentic family-run manor houses in secluded valleys. Wake to woodsmoke, orchard vistas, and stories shared over the hearth.',
    image: '/images/tourin/tourin-1.jpg',
    tag: 'Immersion',
  },
  {
    id: 'culinary',
    title: 'Native High-Altitude Cuisine',
    subtitle: 'Buckwheat, Apricots & Mountain Tea',
    description:
      'Savour organic, indigenous farm gastronomy — sun-dried apricot sauces, freshly kneaded buckwheat noodles, Tsampa porridges, and herbal wild thyme teas.',
    image: '/images/tourin/tourin-gallery-2.jpg',
    tag: 'Gastronomy',
  },
  {
    id: 'darksky',
    title: 'Dark Sky & Astronomical Reserves',
    subtitle: 'Hanle Sanctuary at 14,764 FT',
    description:
      'Experience India’s premier designated Dark Sky Reserve under crystal-clear high-altitude atmosphere, observing the Milky Way core and distant nebulae.',
    image: '/images/tourin/tourin-2.jpg',
    tag: 'Night Sky',
  },
  {
    id: 'people',
    title: 'Pastoral & Community Encounters',
    subtitle: 'Changpa Pastoralists & Balti Hamlets',
    description:
      'Meaningful, respectful time spent with nomadic pastoral communities on high grasslands and Silk Route villages, listening to everyday lived experiences.',
    image: '/images/tourin/tourin-hero.jpg',
    tag: 'People',
  },
];

export const TOURIN_CONTENT = {
  hero: {
    badge: 'Bespoke Experiential Travel',
    headline: 'Travel Beyond The Ordinary.',
    subheadlineLead: 'Immersive, slow-paced journeys designed for travellers seeking deep connection, living culture, and untamed mountain frontiers.',
    subheadlineBody:
      'From secluded heritage homestays in orchard valleys to starlit dark-sky sanctuaries and ancient monastery trails — we design travel that leaves you with more than photographs.',
    heroVisual: {
      image: '/images/tourin/tourin-hero.jpg',
      alt: 'Local human interaction and lived-in moments in high Himalayas',
      caption: 'Lived moments: Unhurried morning conversations in quiet Himalayan hamlets.',
    },
    quickStats: [
      { value: '15+', label: 'Curated Expeditions Completed' },
      { value: '100%', label: 'Individually Paced Routes' },
      { value: '14.7K', label: 'FT Dark Sky Sanctuaries' },
      { value: 'Zero', label: 'Rushed Tourist Circuits' },
    ],
  },

  travelPillars: {
    tag: 'Our Travel Philosophy',
    title: 'Why Travel With Tourin',
    subtitle: 'We craft journeys centered on depth, comfort, and authenticity — stripping away standard tourist rushed itineraries.',
    pillars: [
      {
        number: '01',
        title: 'Unhurried Pacing & Acclimatisation',
        subtitle: 'Time to breathe and absorb',
        description:
          'We calibrate every route for gentle acclimatisation and mindful exploration. Spend two to three nights in single valleys rather than packing bags every morning.',
      },
      {
        number: '02',
        title: 'Heritage Stays & Eco-Lodges',
        subtitle: 'Rooted in local soil',
        description:
          'From earthen family-run manor houses in ancient villages to boutique riverside retreats and luxury wilderness camps under dark-sky reserves.',
      },
      {
        number: '03',
        title: 'Native Culinary & Living Culture',
        subtitle: 'Direct local connection',
        description:
          'Share home-cooked buckwheat meals with village elders, explore centuries-old monastery fresco archives with resident lamas, and understand indigenous mountain ecology.',
      },
      {
        number: '04',
        title: 'Silent Trails & Secluded Frontiers',
        subtitle: 'Far from tourist choke-points',
        description:
          'Experience high-altitude turquoise lakes, dramatic river gorges, and nomadic goat herder settlements along routes known only to local custodians.',
      },
    ],
  },

  proof: {
    tag: 'Visual Dispatch',
    title: 'Moments from the Journey',
    subtitle: 'A glimpse into the lived experiences, silent landscapes, and genuine encounters curated by Tourin.',
    gallery: [
      {
        src: '/images/tourin/tourin-hero.jpg',
        caption: 'Morning conversations with village custodians in tranquil apricot valleys.',
        category: 'People & Living Culture',
        alt: 'Local elder in traditional attire in village courtyard',
      },
      {
        src: '/images/tourin/tourin-gallery-1.jpg',
        caption: 'Cultural dialogue and time spent with traditional woodcraft and wool artisans.',
        category: 'People & Living Culture',
        alt: 'Cultural interaction with Himalayan family',
      },
      {
        src: '/images/tourin/tourin-1.jpg',
        caption: 'Architectural serenity: Boutique earthen retreats built with rammed earth and poplar timbers.',
        category: 'Heritage Stays',
        alt: 'Traditional earthen architecture and boutique stay',
      },
      {
        src: '/images/tourin/tourin-gallery-2.jpg',
        caption: 'Authentic mountain gastronomy: organic buckwheat, fresh apricot preserves, and herbal infusions.',
        category: 'Native Culinary',
        alt: 'Authentic traditional food and dining table',
      },
      {
        src: '/images/tourin/tourin-gallery-3.jpg',
        caption: 'Mountain transit: Slower scenic roads through dramatic geological formations.',
        category: 'Mountain Trails',
        alt: 'Scenic mountain road curving through Himalayan valleys',
      },
      {
        src: '/images/tourin/tourin-2.jpg',
        caption: 'Silent frontiers: Crystal alpine lakes reflecting vast, unpolluted skies.',
        category: 'High Plateaus',
        alt: 'Vast high-altitude lake and mountain landscape',
      },
      {
        src: '/images/tourin/tourin-3.jpg',
        caption: 'Custom group rides and bespoke expedition logistics managed end-to-end.',
        category: 'Expeditions',
        alt: 'Tourin expedition group travellers traversing mountain pass',
      },
      {
        src: '/images/tourin/tourin-gallery-4.jpg',
        caption: 'Ancient sanctuaries: Monastic silence, brass prayer wheels, and centuries of contemplative heritage.',
        category: 'People & Living Culture',
        alt: 'Monastery prayer wheels and living heritage',
      },
    ] as TourinGalleryImage[],
  },

  reflections: [
    {
      id: 'ref-1',
      quote:
        'Tourin changed the way we experience the mountains. Instead of racing between checklist tourist spots, we spent days sitting with orchard farmers, watching the stars in Hanle, and truly breathing.',
      author: 'Sameer & Radhika M.',
      journeyType: 'Private Couple Expedition',
      location: 'Nubra & Hanle Dark Sky',
      year: '2024',
    },
    {
      id: 'ref-2',
      quote:
        'The operational planning was immaculate. At 14,000 feet, you realize how crucial acclimatization and local relationships are. Tourin gave our 20-rider group an unforgettable, safe, and soulful journey.',
      author: 'Vikramaditya S.',
      journeyType: 'High-Pass Motorcycle Expedition',
      location: 'Zanskar & Changthang',
      year: '2024',
    },
    {
      id: 'ref-3',
      quote:
        'The stays were breathtaking — tucked away in tiny heritage villages with genuine home-cooked meals. It felt like traveling with lifelong local friends rather than a commercial travel agency.',
      author: 'Ananya K.',
      journeyType: 'Solo Cultural Immersion',
      location: 'Sham Valley & Indus River',
      year: '2023',
    },
  ] as TravelerReflection[],

  experiences: [
    {
      id: 'slower-nubra-sham',
      title: 'The Slower Valley: Orchards, Monasteries & Silk Trails',
      subtitle: '7 Days · Cultural Immersion, Apricot Hamlets & High Passes',
      duration: '7 Days / 6 Nights',
      region: 'Sham Valley & Nubra (Alchi, Hunder & Turtuk)',
      pacing: 'Gentle Pacing · Ideal Acclimatisation',
      elevation: '9,000 — 11,500 FT',
      bestSeason: 'May to October',
      idealFor: 'Couples, Families & Cultural Explorers',
      overview:
        'Designed around gentle ascent in lower Himalayan valleys, this journey explores centuries-old apricot orchards, 11th-century monastery fresco libraries, and the secluded Balti culture of Turtuk along the ancient Silk Route.',
      highlights: [
        'Stays in traditional heritage homestays and riverside boutique eco-lodges',
        'Private walking trails along ancient stone irrigation channels and monastery archives',
        'Culinary sessions with local family kitchens in Alchi and Turtuk',
        'Unhurried scenic crossing of Khardung La with calibrated rest stops',
      ],
      includedFeatures: [
        'Bespoke private 4x4 vehicle & dedicated local driver-guide',
        'Curated boutique heritage accommodations & daily farm-fresh meals',
        'All inner-line clearances and regional environmental permits',
        'Comprehensive 24/7 medical and high-altitude emergency briefing',
      ],
      itineraryPhases: [
        { phase: 'Days 1–2', title: 'Arrival in Leh & Lower Indus Valley', description: 'Gentle old town walk, rest, hydration, and monastery tea.' },
        { phase: 'Days 3–4', title: 'Sham Valley Apricot Orchards', description: 'Homestay in Alchi, village heritage trails, and rock-carved sanctuaries.' },
        { phase: 'Days 5–7', title: 'Across High Passes to Turtuk & Nubra', description: 'Crossing into Nubra valley, exploring Balti heritage in Turtuk.' },
      ],
      image: '/images/tourin/tourin-1.jpg',
      priceIndicator: 'Custom Quotation',
      sampleNotice:
        'Every Tourin journey is completely customized around your preferred dates, group size, and pacing requirements.',
    },
    {
      id: 'changthang-high-lakes',
      title: 'Silent Frontiers: High Plateaus & Dark Sky Sanctuaries',
      subtitle: '8 Days · Nomadic Plains, Turquoise Lakes & Star Gazing',
      duration: '8 Days / 7 Nights',
      region: 'Changthang Plateau, Pangong Tso & Hanle Sanctuary',
      pacing: 'High-Altitude Wilderness · Deep Immersion',
      elevation: '13,500 — 14,764 FT',
      bestSeason: 'June to late September',
      idealFor: 'Stargazers, Photographers & Wilderness Seekers',
      overview:
        'Venture into the silent, dramatic plateaus of Eastern Ladakh. Experience the pristine shoreline of Pangong Tso away from crowded zones, spend time with Changpa Pashmina nomadic pastoralists, and stargaze at India’s premier Dark Sky Reserve in Hanle.',
      highlights: [
        'Private lakeside eco-camps on secluded meadow shores away from tourist crowds',
        'Warm encounters with Changpa Pashmina nomadic herders on high grasslands',
        'Night-sky astronomy and telescope stargazing in the Hanle Dark Sky Reserve',
        'Cross-country drives through dramatic, vast windswept geological plains',
      ],
      includedFeatures: [
        'High-clearance expedition 4x4 with oxygen support systems',
        'Curated dark-sky homestays & private heated wilderness dome tents',
        'Special restricted border passes & inner-line permits',
        'Dedicated wilderness guide with specialized regional astronomy briefing',
      ],
      itineraryPhases: [
        { phase: 'Days 1–3', title: 'Leh Acclimatisation & Indus Valley', description: 'Calibrated ascent, monastery libraries, and medical briefing.' },
        { phase: 'Days 4–5', title: 'Hanle Dark Sky Sanctuary (14,764 ft)', description: 'Stargazing at the high-altitude astronomical reserve.' },
        { phase: 'Days 6–8', title: 'Pangong Tso & Changpa Pastoral Plains', description: 'Secluded turquoise lake shores and nomadic pastoral encounters.' },
      ],
      image: '/images/tourin/tourin-2.jpg',
      priceIndicator: 'Custom Quotation',
      sampleNotice:
        'High-altitude permits and dark-sky bookings are handled end-to-end by our concierge.',
    },
    {
      id: 'zanskar-traverse',
      title: 'The Ancient Kingdom: Zanskar Expedition Traverse',
      subtitle: '9 Days · Cliffside Cave Monasteries, Gorges & Living Faith',
      duration: '9 Days / 8 Nights',
      region: 'Suru Valley, Padum & Zanskar Gorge',
      pacing: 'Adventurous · Expedition Scale',
      elevation: '11,000 — 14,500 FT',
      bestSeason: 'June to October',
      idealFor: 'Adventurers, Small Groups & Trekkers',
      overview:
        'An extraordinary traverse into one of the Himalayas’ most secluded valleys. Journey under the shadow of the Nun-Kun glacial peaks, hike to cliffside cave monasteries carved directly into rock faces, and experience ancient Buddhist rituals.',
      highlights: [
        'Hike to the legendary cliff-embedded cave monastery of Phugtal Gompa',
        'Dramatic vistas of the twin glacial peaks of Mount Nun and Mount Kun',
        'Stays in family-run Zanskari guest lodges with warm wood-stove hospitality',
        'Spectacular photographic routes through untamed river canyons',
      ],
      includedFeatures: [
        'Heavy-duty expedition 4x4 vehicle with certified mountain pilot',
        'Authentic Zanskari homestays & boutique eco-lodges with regional meals',
        'Special inner-pass clearances and village custodian fees',
        'Local trekking guide for monastery cave trail hikes',
      ],
      itineraryPhases: [
        { phase: 'Days 1–2', title: 'Suru Valley & Nun-Kun Glacier Views', description: 'Traversing lush green valleys towards glacial peaks.' },
        { phase: 'Days 3–6', title: 'Heart of Zanskar & Phugtal Cave Monastery', description: 'Hike to the cliffside monastery of Phugtal and Karsha Gompa.' },
        { phase: 'Days 7–9', title: 'Padum Fortress Ruins & High Pass Return', description: 'Ancient palace ruins, local feast, and return traverse.' },
      ],
      image: '/images/tourin/tourin-3.jpg',
      priceIndicator: 'Custom Quotation',
      sampleNotice:
        'Recommended for travellers comfortable with mountain road travel and adventurous pacing.',
    },
  ] as TourinExperienceItem[],
};
