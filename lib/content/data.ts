import siteData from "@/content/site.json";
import heroData from "@/content/hero.json";
import povData from "@/content/point-of-view.json";
import servicesData from "@/content/services.json";
import finalCtaData from "@/content/final-cta.json";
import complexProjectsData from "@/content/complex-projects.json";
import caseStudiesRaw from "@/content/case-studies/raysons.json";
import loomRaw from "@/content/case-studies/loom-crafts.json";
import picturetimeRaw from "@/content/case-studies/picturetime.json";
import sheRaw from "@/content/case-studies/she.json";
import misuRaw from "@/content/case-studies/misu.json";
import rrSkinsRaw from "@/content/case-studies/rr-skins.json";
import workRaw from "@/content/work/projects.json";
import tourinRaw from "@/content/tourin/experiences.json";
import armyRaw from "@/content/army/projects.json";

export const site = siteData;
export const hero = heroData;
export const pointOfView = povData;
export const services = servicesData.services;
export const serviceDetails = servicesData.serviceDetails;
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

export const caseStudies = {
  "raysons-group": caseStudiesRaw,
  "loom-crafts": loomRaw,
  "picturetime": picturetimeRaw,
  "she": sheRaw,
  "misu": misuRaw,
  "rr-skins": rrSkinsRaw,
};

export const workProjects = workRaw;
export const tourinData = tourinRaw;
export const armyData = armyRaw;