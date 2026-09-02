import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { AROHANA_MASTER_CONTENT } from "@/data/content";

export async function generateStaticParams() {
  return AROHANA_MASTER_CONTENT.caseStudies.map((cs) => ({
    id: cs.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cs = AROHANA_MASTER_CONTENT.caseStudies.find((item) => item.id === id);

  if (!cs) {
    return {
      title: "Case Study Not Found | Ārohana Consultancy",
    };
  }

  return {
    title: `${cs.title} Case Study | Ārohana Consultancy`,
    description: `${cs.headline} — ${cs.summary}`,
    openGraph: {
      title: `${cs.title} — ${cs.headline}`,
      description: cs.summary,
      images: [{ url: cs.image }],
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const caseStudies = AROHANA_MASTER_CONTENT.caseStudies;
  const csIndex = caseStudies.findIndex((item) => item.id === id);

  if (csIndex === -1) {
    notFound();
  }

  const cs = caseStudies[csIndex];
  const prevCs = csIndex > 0 ? caseStudies[csIndex - 1] : caseStudies[caseStudies.length - 1];
  const nextCs = csIndex < caseStudies.length - 1 ? caseStudies[csIndex + 1] : caseStudies[0];

  return (
    <div className="bg-[#050505] text-white pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-[1100px] mx-auto">
        
        {/* Back Navigation & Breadcrumb */}
        <div className="mb-12 flex items-center justify-between">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-xs font-mono text-text-muted hover:text-white uppercase tracking-widest transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO ALL WORK</span>
          </Link>

          <div className="text-xs font-mono text-[#FE320A] tracking-widest uppercase">
            CASE STUDY 0{csIndex + 1} / 0{caseStudies.length}
          </div>
        </div>

        {/* Hero Headline Section */}
        <div className="mb-12">
          <div className="text-xs font-mono text-text-muted tracking-[0.2em] uppercase mb-4">
            {cs.client} // {cs.sector.toUpperCase()}
          </div>
          <h1 className="font-display font-display-hero text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight text-white mb-6 leading-[0.92]">
            {cs.headline}
          </h1>
          <p className="text-lg md:text-xl text-[#BDBDBD] font-sans leading-relaxed max-w-3xl">
            {cs.summary}
          </p>
        </div>

        {/* Snapshot 4-Column Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-[#111116] border border-white/10 rounded-sm mb-12 font-mono text-xs">
          <div>
            <span className="text-text-muted block text-[10px] uppercase tracking-wider mb-1">SECTOR</span>
            <span className="text-white font-semibold">{cs.snapshot.sector}</span>
          </div>
          <div>
            <span className="text-text-muted block text-[10px] uppercase tracking-wider mb-1">LOCATION</span>
            <span className="text-white font-semibold">{cs.snapshot.location}</span>
          </div>
          <div>
            <span className="text-text-muted block text-[10px] uppercase tracking-wider mb-1">ENGAGEMENT</span>
            <span className="text-white font-semibold">{cs.snapshot.engagement}</span>
          </div>
          <div>
            <span className="text-text-muted block text-[10px] uppercase tracking-wider mb-1">DURATION</span>
            <span className="text-white font-semibold">{cs.snapshot.duration}</span>
          </div>
        </div>

        {/* Hero Visual Image */}
        <div className="relative w-full aspect-[16/9] bg-neutral-900 overflow-hidden border border-white/15 rounded-sm mb-16 shadow-2xl">
          <Image
            src={cs.image}
            alt={cs.title}
            fill
            priority
            className="object-cover img-editorial"
          />
          <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-4 py-2 border border-white/10 text-xs font-mono text-white">
            {cs.title.toUpperCase()} // ACTUAL WORK IN CONTEXT
          </div>
        </div>

        {/* Structured Editorial Narrative */}
        <div className="space-y-16">
          
          {/* Block 1: The Situation */}
          <div className="border-t border-white/10 pt-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-4">
                <span className="text-xs font-mono text-[#FE320A] tracking-widest uppercase block mb-1">
                  01 // CONTEXT
                </span>
                <h2 className="font-display text-3xl uppercase text-white">
                  THE SITUATION
                </h2>
              </div>
              <div className="md:col-span-8">
                <p className="text-base sm:text-lg text-[#CCCCCC] font-sans leading-relaxed">
                  {cs.situation}
                </p>
              </div>
            </div>
          </div>

          {/* Block 2: The Real Challenge */}
          <div className="border-t border-white/10 pt-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-4">
                <span className="text-xs font-mono text-[#FE320A] tracking-widest uppercase block mb-1">
                  02 // PROBLEM
                </span>
                <h2 className="font-display text-3xl uppercase text-white">
                  THE REAL CHALLENGE
                </h2>
              </div>
              <div className="md:col-span-8">
                <p className="text-base sm:text-lg text-[#CCCCCC] font-sans leading-relaxed">
                  {cs.challenge}
                </p>
              </div>
            </div>
          </div>

          {/* Block 3: The Thinking */}
          <div className="border-t border-white/10 pt-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-4">
                <span className="text-xs font-mono text-[#FE320A] tracking-widest uppercase block mb-1">
                  03 // STRATEGY
                </span>
                <h2 className="font-display text-3xl uppercase text-white">
                  THE THINKING
                </h2>
              </div>
              <div className="md:col-span-8">
                <p className="text-base sm:text-lg text-[#CCCCCC] font-sans leading-relaxed mb-6">
                  {cs.thinking}
                </p>
                <div className="p-6 bg-white/[0.03] border-l-2 border-[#FE320A] text-sm md:text-base text-white font-mono uppercase tracking-wide">
                  // DECISION RATIONALE: ROOTED IN COMMERCIAL REALITY RATHER THAN GENERIC TEMPLATES.
                </div>
              </div>
            </div>
          </div>

          {/* Block 4: The Work (Grouped Workstreams) */}
          <div className="border-t border-white/10 pt-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-4">
                <span className="text-xs font-mono text-[#FE320A] tracking-widest uppercase block mb-1">
                  04 // EXECUTION
                </span>
                <h2 className="font-display text-3xl uppercase text-white">
                  THE WORK
                </h2>
              </div>
              <div className="md:col-span-8">
                <div className="space-y-4">
                  {cs.work.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-[#111116] border border-white/10 rounded-sm text-sm sm:text-base text-white/90">
                      <Check className="w-5 h-5 text-[#FE320A] mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Block 5: Proof & Verified Outcomes */}
          <div className="border-t border-white/10 pt-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-4">
                <span className="text-xs font-mono text-[#FE320A] tracking-widest uppercase block mb-1">
                  05 // EVIDENCE
                </span>
                <h2 className="font-display text-3xl uppercase text-white">
                  PROOF & OUTCOMES
                </h2>
              </div>
              <div className="md:col-span-8">
                <div className="p-8 bg-gradient-to-r from-white/[0.07] to-white/[0.02] border border-white/15 rounded-sm">
                  <h3 className="font-display text-2xl uppercase tracking-wide text-white mb-3">
                    VERIFIED BUSINESS IMPACT
                  </h3>
                  <p className="text-base sm:text-lg text-white/90 font-sans leading-relaxed">
                    {cs.proof}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Block 6: Closing & Call to Action */}
          <div className="p-10 md:p-14 bg-[#111116] border border-white/10 rounded-sm">
            <div className="max-w-2xl">
              <span className="text-xs font-mono text-text-muted tracking-widest uppercase block mb-2">
                WHAT THIS DEMONSTRATES
              </span>
              <h3 className="font-display text-3xl sm:text-4xl uppercase text-white mb-4">
                {cs.closing}
              </h3>
              <p className="text-sm text-text-secondary font-sans leading-relaxed mb-8">
                Have a similar business challenge? Let's start with the context, not a template.
              </p>
              <Link
                href="/contact"
                className="sundown-pill-btn bg-[#FE320A] border-[#FE320A] text-white"
              >
                <span>Discuss a similar brief</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

        {/* Previous & Next Case Study Navigation */}
        <div className="mt-20 pt-12 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            href={`/work/${prevCs.id}`}
            className="group p-6 bg-[#111116] border border-white/10 hover:border-white/30 transition-colors flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest flex items-center gap-1.5 mb-2">
                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> PREVIOUS CASE STUDY
              </span>
              <h4 className="font-display text-2xl uppercase text-white group-hover:text-[#FE320A] transition-colors">
                {prevCs.title}
              </h4>
            </div>
            <p className="text-xs text-text-secondary line-clamp-2 mt-2 font-sans">
              {prevCs.headline}
            </p>
          </Link>

          <Link
            href={`/work/${nextCs.id}`}
            className="group p-6 bg-[#111116] border border-white/10 hover:border-white/30 transition-colors flex flex-col justify-between text-right"
          >
            <div>
              <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest flex items-center justify-end gap-1.5 mb-2">
                NEXT CASE STUDY <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
              <h4 className="font-display text-2xl uppercase text-white group-hover:text-[#FE320A] transition-colors">
                {nextCs.title}
              </h4>
            </div>
            <p className="text-xs text-text-secondary line-clamp-2 mt-2 font-sans">
              {nextCs.headline}
            </p>
          </Link>
        </div>

      </div>
    </div>
  );
}
