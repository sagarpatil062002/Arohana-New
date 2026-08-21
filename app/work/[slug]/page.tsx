import type { Metadata } from "next";
import CaseStudyTemplate from "@/components/CaseStudyTemplate";
import { getCaseStudies, getCaseStudy } from "@/lib/content/server";

export async function generateStaticParams() {
  return Object.keys(getCaseStudies()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const study = getCaseStudy(params.slug);
  if (!study) {
    return {
      title: "Case Study | Ārohana Consultancy",
      alternates: { canonical: "/work" },
    };
  }
  return {
    title: `${study.client} | Ārohana Consultancy`,
    description: study.headline,
    alternates: { canonical: `/work/${study.slug}` },
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  return <CaseStudyTemplate slug={params.slug} />;
}
