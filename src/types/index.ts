export type SectorType =
  | 'Hospitality & F&B'
  | 'Real Estate & Built Environment'
  | 'Healthcare'
  | 'Lifestyle & Consumer'
  | 'Entertainment & Media'
  | 'Travel & Tourism'
  | 'Institutional / Community';

export interface CaseStudySnapshot {
  sector: string;
  location: string;
  engagementType: string;
  duration: string;
  coreCapabilities: string[];
}

export interface CaseStudyWorkstream {
  title: string;
  description: string;
  bullets?: string[];
}

export interface CaseStudyGalleryItem {
  image: string;
  caption: string;
  alt: string;
}

export interface CaseStudyMediaLink {
  title: string;
  url: string;
  type: 'reel' | 'video' | 'post' | 'drive' | 'youtube' | 'tweet';
  caption?: string;
  thumbnail?: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
  heroImageCaption: string;
  sector: string;
  tags: string[];
  challenge?: string;
  whatWeDid?: string;
  theResult?: string;
  stillsSubtitle?: string;
  snapshot: CaseStudySnapshot;
  situation: string[];
  realChallenge: string[];
  thinking: string[];
  work: CaseStudyWorkstream[];
  proof: {
    verifiedText: string;
    metricsNote?: string;
  };
  gallery: CaseStudyGalleryItem[];
  videos?: CaseStudyMediaLink[];
  mediaLinks?: CaseStudyMediaLink[];
  closingQuote: string;
  closingText: string;
}

export interface ProjectDirectoryItem {
  id: string;
  name: string;
  sector: SectorType;
  tags: string[];
  description: string;
  image: string;
  caseStudySlug?: string;
  videoUrl?: string;
  socialUrl?: string;
}

export interface ServicePillar {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  capabilities: string[];
  proofReferences: string[];
  image: string;
  capabilityNotice?: string;
}

export interface RetainerComparisonRow {
  capability: string;
  category: string;
  inRetainer: boolean;
  notes: string;
}

export interface EngagementModel {
  name: string;
  bestFor: string;
  description: string;
}

export interface TourinExperience {
  id: string;
  title: string;
  subtitle: string;
  region: string;
  pacing: string;
  description: string;
  highlights: string[];
  image: string;
  sampleNotice: string;
}

export interface ArmyProject {
  id: string;
  title: string;
  unitOrContext?: string;
  description: string;
  tags: string[];
  images?: {
    image: string;
    caption: string;
  }[];
  linkToCaseStudy?: string;
  textOnly?: boolean;
  confidentialNotice?: string;
}

export interface BrandLogo {
  name: string;
  sector: string;
  initials: string;
}
