export type SectorType =
  | 'Hospitality & F&B'
  | 'Real Estate & Built Environment'
  | 'Healthcare'
  | 'Lifestyle & Consumer'
  | 'Entertainment & Media'
  | 'Travel & Tourism'
  | 'Institutional / Community';

export type InquiryStatus = 'new' | 'contacted' | 'proposal_sent' | 'closed' | 'archived';

export interface CrmInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  status: InquiryStatus;
  createdAt: string;
  notes?: string;
}

// 1. REUSABLE / DYNAMIC COLLECTIONS

// A. Case Studies (/work/[slug])
export interface WorkstreamItem {
  workstreamTitle: string;
  workstreamDetails: string;
  bullets?: string[];
}

export interface ProofOutcomeItem {
  metricOrChange: string;
  description: string;
}

export interface GalleryImageItem {
  src: string;
  caption: string;
  alt: string;
}

export interface CaseStudySeo {
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  canonicalUrl?: string;
}

export interface CaseStudyItem {
  clientName: string;
  slug: string;
  heroBusinessStatement: string;
  heroMedia: string;
  heroMediaCaption?: string;
  snapshot: {
    sector: string;
    location: string;
    engagementType: string;
    duration: string;
    coreCapabilities?: string[];
  };
  theSituation: string[];
  theRealChallenge: string[];
  theThinking: string[];
  theWork: WorkstreamItem[];
  proofOutcomes: ProofOutcomeItem[];
  gallery: GalleryImageItem[];
  seo: CaseStudySeo;
  tags?: string[];
}

// B. Work Directory Grid (/work)
export interface WorkDirectoryItem {
  id: string;
  projectTitle: string;
  client: string;
  sector: SectorType;
  shortDescription: string;
  thumbnail: string;
  tags: string[];
  caseStudyLink?: string;
}

// C. Tourin Packages & Itineraries (/tourin)
export interface ItineraryStep {
  dayOrPhase: string;
  title: string;
  description: string;
}

export interface TourinPackageItem {
  id: string;
  title: string;
  pacingStyle: string;
  overview: string;
  itinerary: ItineraryStep[];
  gallery: string[];
  displayOrder: number;
  region?: string;
  subtitle?: string;
}

// D. Indian Army Projects (/indian-army-projects)
export interface ArmyProjectImage {
  image: string;
  caption: string;
  alt?: string;
}

export interface ArmyProjectItem {
  id: string;
  title: string;
  tags: string[];
  narrative: string;
  gallery: ArmyProjectImage[];
  isTextOnly: boolean;
  unitOrContext?: string;
}

// E. Logo Strip / Client Grid
export interface ClientLogoItem {
  id: string;
  brandName: string;
  logoFile: string;
  isPublicApproved: boolean;
  sector?: string;
}

// 2. PAGE-LEVEL SINGLETONS

// Home Page Singleton
export interface HomePageSingleton {
  heroVideoUrl: string;
  heroFallbackImage: string;
  heroTagline: string;
  heroHeadline: string;
  heroDescription: string;
  heroPrimaryCtaText: string;
  heroPrimaryCtaLink: string;
  heroSecondaryCtaText: string;
  heroSecondaryCtaLink: string;
  povSection: {
    tag: string;
    headline: string;
    bodyNarrative1: string;
    bodyNarrative2: string;
    portraitImage: string;
    portraitAlt: string;
    portraitCaption: string;
    founderBadge: string;
  };
  featuredCaseStudySlugs: string[];
  armyTeaserImages: string[];
  tourinTeaserImages: string[];
  contactDetails: {
    email: string;
    phone: string;
    displayPhone: string;
  };
}

// About Page Singleton
export interface FounderStorySection {
  title: string;
  content: string;
}

export interface FounderPortraitItem {
  src: string;
  alt: string;
  caption: string;
}

export interface AboutPageSingleton {
  heroQuote: string;
  heroSubheadline: string;
  founderStory: FounderStorySection[];
  founderPortraits: FounderPortraitItem[];
  pullQuotes: string[];
}

// Services Page Singleton
export interface EngagementModelItem {
  modelName: string;
  bestForDescription: string;
  scopeSummary?: string;
}

export interface ServicesPageSingleton {
  digitalBrandGrowthItems: string[];
  hospitalityConsultingItems: string[];
  contentProductionItems: string[];
  engagementModels: EngagementModelItem[];
}

// 3. GLOBAL SEO & METADATA
export interface PageSeoItem {
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  ogImage: string;
}

export interface SeoMetadataCollection {
  home: PageSeoItem;
  about: PageSeoItem;
  services: PageSeoItem;
  work: PageSeoItem;
  tourin: PageSeoItem;
  armyProjects: PageSeoItem;
  contact: PageSeoItem;
}

// MASTER CMS STATE
export interface FullCmsState {
  caseStudies: CaseStudyItem[];
  workDirectory: WorkDirectoryItem[];
  tourinPackages: TourinPackageItem[];
  armyProjects: ArmyProjectItem[];
  clientLogos: ClientLogoItem[];
  home: HomePageSingleton;
  about: AboutPageSingleton;
  services: ServicesPageSingleton;
  seo: SeoMetadataCollection;
  inquiries: CrmInquiry[];
  lastUpdated: string;
}
