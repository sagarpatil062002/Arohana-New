import React from 'react';
import { notFound, redirect } from 'next/navigation';
import { CASE_STUDIES, getCaseStudyBySlug } from '@/data/case-studies';
import { getSectionContent } from '@/lib/cms/content-manager';
import CaseStudyDetailView from '@/components/work/CaseStudyDetailView';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

export async function generateStaticParams() {
  const params = CASE_STUDIES.map((cs) => ({
    slug: cs.slug,
  }));
  params.push({ slug: 'raysons' });
  params.push({ slug: 'the-she-project' });
  params.push({ slug: 'indian-army' });
  params.push({ slug: 'indian-army-projects' });
  return params;
}

export default function CaseStudyDetailPage({ params }: { params: { slug: string } }) {
  if (params.slug === 'indian-army' || params.slug === 'indian-army-projects') {
    redirect('/indian-army-projects');
  }

  // Handle redirects / aliases
  const targetSlug = params.slug === 'raysons' ? 'raysons-group' : params.slug === 'the-she-project' ? 'she' : params.slug;

  // 1. Fetch CMS content
  const workCms = getSectionContent<any>('work');
  const cmsStudy = workCms?.caseStudies?.find(
    (c: any) =>
      c.slug === targetSlug ||
      c.id === targetSlug ||
      (targetSlug === 'raysons-group' && (c.slug === 'raysons' || c.id === 'raysons-group')) ||
      (targetSlug === 'she' && (c.slug === 'the-she-project' || c.id === 'the-she-project'))
  );

  // If explicitly disabled in CMS, return 404
  if (cmsStudy && (cmsStudy.enabled === false || cmsStudy.published === false)) {
    notFound();
  }

  // 2. Fetch from hardcoded base if available
  const baseStudy = getCaseStudyBySlug(targetSlug);

  // If neither CMS nor base study exists, return 404
  if (!cmsStudy && !baseStudy) {
    notFound();
  }

  // Merge CMS overrides with base case study or create robust case study from CMS
  const rawMerged = cmsStudy
    ? {
        ...baseStudy,
        ...cmsStudy,
        snapshot: {
          ...(baseStudy?.snapshot || {}),
          ...(cmsStudy.snapshot || {}),
        },
        gallery: (Array.isArray(cmsStudy.gallery) && cmsStudy.gallery.length > 0) ? cmsStudy.gallery : (baseStudy?.gallery || []),
      }
    : baseStudy;

  if (!rawMerged) {
    notFound();
  }

  // Ensure all fields have safe defaults
  const caseStudy = {
    ...rawMerged,
    id: rawMerged.id || targetSlug,
    slug: rawMerged.slug || targetSlug,
    title: rawMerged.title || 'Case Study',
    subtitle: rawMerged.subtitle || rawMerged.desc || '',
    sector: rawMerged.sector || rawMerged.category || 'Case Study',
    heroImage: rawMerged.heroImage || rawMerged.image || '/images/case-studies/raysons/neora-1.jpg',
    heroImageCaption: rawMerged.heroImageCaption || '',
    snapshot: {
      location: rawMerged.snapshot?.location || '',
      engagementType: rawMerged.snapshot?.engagementType || '',
      duration: rawMerged.snapshot?.duration || '',
      coreCapabilities: Array.isArray(rawMerged.snapshot?.coreCapabilities)
        ? rawMerged.snapshot.coreCapabilities.filter(Boolean)
        : (typeof rawMerged.snapshot?.coreCapabilities === 'string' && rawMerged.snapshot.coreCapabilities.trim()
            ? [rawMerged.snapshot.coreCapabilities.trim()]
            : []),
    },
    situation: Array.isArray(rawMerged.situation)
      ? rawMerged.situation
      : (typeof rawMerged.situation === 'string' && rawMerged.situation.trim() ? [rawMerged.situation] : []),
    realChallenge: Array.isArray(rawMerged.realChallenge)
      ? rawMerged.realChallenge
      : (typeof rawMerged.realChallenge === 'string' && rawMerged.realChallenge.trim() ? [rawMerged.realChallenge] : []),
    thinking: Array.isArray(rawMerged.thinking)
      ? rawMerged.thinking
      : (typeof rawMerged.thinking === 'string' && rawMerged.thinking.trim() ? [rawMerged.thinking] : []),
    work: Array.isArray(rawMerged.work) ? rawMerged.work : [],
    gallery: Array.isArray(rawMerged.gallery) ? rawMerged.gallery : [],
    proof: {
      verifiedText: rawMerged.proof?.verifiedText || '',
      metricsNote: rawMerged.proof?.metricsNote || '',
    },
    closingQuote: rawMerged.closingQuote || '',
    closingText: rawMerged.closingText || '',
    layoutStyle: rawMerged.layoutStyle || rawMerged.layout || 'layout-1',
  };

  // Find next case study dynamically for smooth sequential navigation
  const validCases = (workCms?.caseStudies && workCms.caseStudies.length > 0)
    ? workCms.caseStudies.filter((c: any) => c && c.enabled !== false && c.published !== false && c.id !== 'xyz' && c.slug !== 'xyz' && c.title !== 'xyz')
    : CASE_STUDIES.filter((c: any) => c && c.id !== 'xyz' && c.slug !== 'xyz' && c.title !== 'xyz');

  const currentIndex = validCases.findIndex(
    (c: any) => c.slug === targetSlug || c.id === targetSlug
  );

  const nextCase = (currentIndex >= 0 && currentIndex < validCases.length - 1)
    ? validCases[currentIndex + 1]
    : null;

  return (
    <CaseStudyDetailView
      initialCaseStudy={caseStudy}
      targetSlug={targetSlug}
      nextCase={nextCase}
    />
  );
}
