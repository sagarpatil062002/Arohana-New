import type { SiteContent, HeroContent, PointOfViewContent, Service, ServiceDetails, NavItem, MediaRef } from "./types";
import siteData from "@/content/site.json";
import heroData from "@/content/hero.json";
import povData from "@/content/point-of-view.json";
import servicesData from "@/content/services.json";
import finalCtaData from "@/content/final-cta.json";
import complexProjectsData from "@/content/complex-projects.json";

export const site: SiteContent = siteData as SiteContent;
export const hero: HeroContent = heroData as HeroContent;
export const pointOfView: PointOfViewContent = povData as PointOfViewContent;
export const services: Service[] = servicesData.services as Service[];
export const serviceDetails: ServiceDetails = servicesData.serviceDetails as ServiceDetails;

export const finalCta = {
  eyebrow: finalCtaData.eyebrow,
  headline: finalCtaData.headline,
  primaryCta: finalCtaData.primaryCta,
  contact: finalCtaData.contact,
};

export const complexProjects = {
  eyebrow: complexProjectsData.eyebrow,
  headline: complexProjectsData.headline,
  body: complexProjectsData.body,
  cta: complexProjectsData.cta,
  items: complexProjectsData.items,
};