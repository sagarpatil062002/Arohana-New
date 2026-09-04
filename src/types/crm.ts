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

export interface HeroContent {
  tagline: string;
  estBadge: string;
  systemBadge: string;
  headline: string;
  description: string;
  videoSrc: string;
  poster: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  tag1: string;
  tag2: string;
  tag3: string;
  footageContext: string;
}

export interface PovContent {
  sectionNumber: string;
  tag: string;
  quote: string;
  paragraph1: string;
  paragraph2: string;
  ctaText: string;
  ctaLink: string;
  founderBadge: string;
  founderCaption: string;
  founderImage: string;
}

export interface OfferingsContent {
  sectionNumber: string;
  tag: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

export interface ProofContent {
  sectionNumber: string;
  tag: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

export interface DefenceContent {
  sectionNumber: string;
  tag: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  contextPill: string;
}

export interface TourinContent {
  sectionNumber: string;
  tag: string;
  title: string;
  description: string;
  differenceTitle: string;
  differenceText: string;
  cta1Text: string;
  cta1Link: string;
  cta2Text: string;
  cta2Link: string;
}

export interface FinalCtaContent {
  tag: string;
  title: string;
  description: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  phone: string;
  displayPhone: string;
  email: string;
  badge1: string;
  badge2: string;
  badge3: string;
}

export interface CrmStoreState {
  hero: HeroContent;
  pov: PovContent;
  offerings: OfferingsContent;
  proof: ProofContent;
  defence: DefenceContent;
  tourin: TourinContent;
  finalCta: FinalCtaContent;
  inquiries: CrmInquiry[];
  lastUpdated: string;
}
