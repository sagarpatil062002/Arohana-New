import React from 'react';
import { notFound, redirect } from 'next/navigation';
import { CASE_STUDIES, getCaseStudyBySlug } from '@/data/case-studies';
import { getSectionContent } from '@/lib/cms/content-manager';
import CaseStudyDetailView from '@/components/work/CaseStudyDetailView';

export const dynamic = 'force-dynamic';
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

  // 1. Fetch from hardcoded base
  const baseStudy = getCaseStudyBySlug(targetSlug);

  // 2. Fetch CMS content if available
  const workCms = getSectionContent<any>('work');
  const cmsStudy = workCms?.caseStudies?.find((c: any) => c.slug === targetSlug || c.id === targetSlug);

  // Merge CMS overrides with base case study
  const caseStudy = cmsStudy
    ? {
        ...baseStudy,
        ...cmsStudy,
        snapshot: {
          ...(baseStudy?.snapshot || {}),
          ...(cmsStudy.snapshot || {}),
        },
        gallery: (cmsStudy.gallery && cmsStudy.gallery.length > 0) ? cmsStudy.gallery : baseStudy?.gallery || [],
      }
    : baseStudy;

  if (!caseStudy) {
    notFound();
  }

  // Find next case study for smooth sequential navigation
  const currentIndex = CASE_STUDIES.findIndex((c) => c.slug === targetSlug);
  const nextCase = CASE_STUDIES[(currentIndex + 1) % CASE_STUDIES.length];

  return (
    <CaseStudyDetailView
      initialCaseStudy={caseStudy}
      targetSlug={targetSlug}
      nextCase={nextCase}
    />
  );
}
