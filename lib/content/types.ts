export type MediaRef = {
  src: string;
  alt: string;
  label: string;
  poster?: string;
};

export type NavItem = { label: string; href: string };

export type SiteContent = {
  wordmark: string;
  nav: NavItem[];
  contact: {
    email: string;
    phone: string;
    phoneHref: string;
  };
};

export type HeroContent = {
  eyebrow: string;
  headline: string;
  supporting: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  media: MediaRef;
};

export type PointOfViewContent = {
  eyebrow: string;
  headline: string;
  body: string[];
  media: MediaRef;
};

export type Service = {
  number: string;
  title: string;
  description: string;
  media: MediaRef;
};

export type ServiceDetails = {
  [key: string]: {
    capabilities: string[];
    projects: string[];
  };
};

export type WorkProject = {
  slug: string;
  title: string;
  sector: string;
  description: string;
  image: string;
  alt: string;
  tags: string[];
  caseStudy: boolean;
  featured: boolean;
  size: "feature" | "standard";
  href: string;
};

export type CaseStudy = {
  slug: string;
  client: string;
  headline: string;
  sector: string;
  location: string;
  engagement: string;
  duration: string;
  situation: string;
  challenge: string;
  thinking: string;
  workstreams: { title: string; body: string }[];
  proof: string;
  gallery: { src: string; alt: string; label: string }[];
  hero: { image: string; alt: string };
  video: string | null;
  closing?: string;
};

export type ArmyProject = {
  id: string;
  title: string;
  body: string;
  tags: string[];
  media: MediaRef | null;
  confidential?: boolean;
};

export type TourinExperience = {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  duration: string;
  images: { src: string; alt: string; label: string }[];
  itinerary: any[];
  highlights: string[];
  inclusions: any[];
  exclusions: any[];
  cta: { label: string; href: string };
  published: boolean;
};

export type TourinData = {
  experiences: TourinExperience[];
  meta: {
    eyebrow: string;
    headline: string;
    body: string;
    stat: { value: string; label: string };
    why: string;
    whyBody: string;
    believe: string;
    believeBody: string;
    ladakh: string;
    ladakhBody: string;
    from: string;
    fromBody: string;
    next: string;
    nextBody: string;
    packagesHeading: string;
    packagesBody: string;
    cta: { label: string; href: string };
    closing: string;
  };
};

export type ArmyData = {
  projects: ArmyProject[];
  hero: {
    eyebrow: string;
    headline: string;
    supporting: string;
  };
  closing: {
    statement: string;
    cta: { label: string; href: string };
  };
};