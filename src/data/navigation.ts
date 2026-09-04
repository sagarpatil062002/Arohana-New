export interface NavItem {
  label: string;
  href: string;
  badge?: string;
  number?: string;
}

export const MAIN_NAVIGATION: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work', number: '06' },
  { label: 'Army Projects', href: '/indian-army-projects' },
  { label: 'Tourin', href: '/tourin' },
  { label: 'Contact', href: '/contact' },
];

export const FOOTER_NAVIGATION = {
  primary: [
    { label: 'Home', href: '/' },
    { label: 'About Ārohana', href: '/about' },
    { label: 'Services & Capabilities', href: '/services' },
    { label: 'Selected Work', href: '/work' },
    { label: 'Indian Army Projects', href: '/indian-army-projects' },
    { label: 'Tourin Experiential Travel', href: '/tourin' },
    { label: 'Contact & Inquiry', href: '/contact' },
  ],
  caseStudies: [
    { label: 'Raysons Group', href: '/work/raysons-group' },
    { label: 'Loom Crafts', href: '/work/loom-crafts' },
    { label: 'PictureTime', href: '/work/picturetime' },
    { label: 'SHE Initiative', href: '/work/she' },
    { label: 'Misu Pan-Asian', href: '/work/misu' },
    { label: 'RR Skins Dermatology', href: '/work/rr-skins' },
  ],
  sectors: [
    { label: 'Hospitality & F&B', href: '/work#hospitality' },
    { label: 'Real Estate & Built Environment', href: '/work#real-estate' },
    { label: 'Healthcare & Clinical', href: '/work#healthcare' },
    { label: 'Lifestyle & Consumer', href: '/work#lifestyle' },
    { label: 'Entertainment & Media', href: '/work#entertainment' },
    { label: 'Travel & Tourism', href: '/work#travel' },
    { label: 'Institutional / Community', href: '/work#institutional' },
  ],
};

export const SITE_METADATA = {
  name: 'Ārohana Consultancy',
  masterHeadline: 'We build brands, businesses & experiences.',
  tagline: 'Business thinking, brand strategy, creative communication & execution.',
  contact: {
    email: 'founder@byarohana.com',
    phone: '+91 8380092241',
    displayPhone: '+91 83800 92241',
    presence: 'Goa · Kolhapur · Delhi · Ladakh',
    hours: 'Mon – Sat: 09:30 AM – 06:30 PM IST',
  },
  seo: {
    home: {
      title: 'Ārohana Consultancy | Brands, Businesses & Experiences',
      description:
        'Ārohana combines business thinking, creative communication and execution across digital brand growth, hospitality consulting and content production.',
      h1: 'We build brands, businesses & experiences.',
    },
    about: {
      title: 'About Ārohana | Madhura Hawal, Founder',
      description:
        'Meet Madhura Hawal, founder of Ārohana Consultancy. From hospitality and entrepreneurship to brand strategy, digital growth and complex on-ground projects.',
      h1: "I didn't plan to build Ārohana.",
    },
    services: {
      title: 'Services | Ārohana Consultancy',
      description:
        'Digital brand growth, content production and hospitality consulting for businesses across India and selected international markets.',
      h1: 'What we do depends on what the business actually needs.',
    },
    work: {
      title: 'Our Work | Ārohana Consultancy',
      description:
        'Selected work across hospitality, real estate, healthcare, consumer brands, entertainment, travel and complex institutional projects.',
      h1: 'The work is the proof.',
    },
    army: {
      title: 'Indian Army Projects | Ārohana Consultancy',
      description:
        'Selected Indian Army projects by Ārohana across communication, design, publications, storytelling, video production and community-focused initiatives.',
      h1: 'Selected Indian Army Projects',
    },
    tourin: {
      title: 'Tourin | Experiential Ladakh Travel & Journeys',
      description:
        'Tourin creates thoughtful, experiential journeys beginning with Ladakh — for travellers who want to experience a place beyond the usual itinerary.',
      h1: 'Travel beyond the itinerary.',
    },
    contact: {
      title: 'Contact Ārohana Consultancy',
      description:
        'Make it easy to start a conversation. Reach out via email, phone, or direct inquiry.',
      h1: "Let's start a conversation.",
    },
  },
};
