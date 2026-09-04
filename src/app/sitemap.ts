import { MetadataRoute } from 'next';
import { CASE_STUDIES } from '@/data/case-studies';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://byarohana.com';

  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/work',
    '/tourin',
    '/indian-army-projects',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const caseStudyRoutes = CASE_STUDIES.map((cs) => ({
    url: `${baseUrl}/work/${cs.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...caseStudyRoutes];
}
