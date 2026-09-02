import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { AROHANA_MASTER_CONTENT } from "@/data/content";

export const metadata: Metadata = {
  title: "Services | Ārohana Consultancy",
  description: "Digital brand growth, content production and hospitality consulting for businesses across India and selected international markets.",
  openGraph: {
    title: "Services | Ārohana Consultancy",
    description: "Digital brand growth, content production and hospitality consulting for businesses across India and selected international markets.",
    images: [{ url: "/assets/raysons.jpg" }],
  },
};

export default function ServicesPage() {
  const { threeWaysWeWork } = AROHANA_MASTER_CONTENT;

  const engagementModels = [
    {
      name: "ONGOING DIGITAL PARTNERSHIP",
      bestFor: "Brands needing continuous strategy, content, creative direction and multi-platform growth.",
      deliverables: ["Dedicated strategic lead", "Monthly content shoots & execution", "Weekly performance reviews", "Continuous narrative optimization"]
    },
    {
      name: "HOSPITALITY CONSULTING",
      bestFor: "Restaurants, cafés, resorts and hospitality businesses needing operational or commercial intervention.",
      deliverables: ["Concept-to-launch roadmap", "Menu costing & kitchen SOPs", "Staff service training", "Operational handover"]
    },
    {
      name: "PROJECT PRODUCTION",
      bestFor: "Films, documentaries, launches, campaigns, exhibitions or other defined projects.",
      deliverables: ["Full script-to-screen production", "Remote terrain logistics capability", "High-spec cinematography", "Sound & color mastery"]
    },
    {
      name: "HYBRID ENGAGEMENT",
      bestFor: "Businesses where business consulting and digital communication need to move together in lockstep.",
      deliverables: ["Bridging internal operations with external marketing", "Direct founder advisory", "Bespoke resource deployment"]
    }
  ];

  return (
    <div className="bg-[#050505] text-white pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Section Indicator */}
        <div className="mb-12">
          <div className="section-indicator-line text-white/70">
            <span>SERVICES // CAPABILITIES</span>
          </div>
        </div>

        {/* Hero Banner */}
        <div className="max-w-4xl mb-24">
          <h1 className="font-display font-display-hero text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tight text-white mb-8">
            WHAT WE DO DEPENDS ON WHAT THE BUSINESS ACTUALLY NEEDS.
          </h1>
          <p className="text-lg md:text-xl text-[#BDBDBD] leading-relaxed font-sans">
            Ārohana can come in as an ongoing digital partner, a hospitality consultant, a content/production partner or a combination of these.
          </p>
        </div>

        {/* 3 Detailed Service Blocks */}
        <div className="space-y-16 mb-28">
          
          {/* 01 Digital Brand Growth */}
          <div className="bg-[#111116] border border-white/10 p-8 md:p-14 rounded-sm">
            <div className="flex items-center gap-4 text-xs font-mono text-[#FE320A] mb-4 uppercase">
              <span>(01) CORE CAPABILITY</span>
              <span>•</span>
              <span>TIMEFRAME: ONGOING OR TARGETED SPRINT</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-white uppercase mb-4">
              01 — DIGITAL BRAND GROWTH
            </h2>
            <p className="text-base text-[#CCCCCC] leading-relaxed font-sans max-w-3xl mb-4">
              For businesses that need a stronger brand presence, better communication and consistent execution — not just a schedule of posts.
            </p>
            <p className="text-xs font-mono text-text-muted mb-8 italic">
              Important: Performance marketing, SEO, websites and lead generation are specialized capabilities deployed when the brief demands them.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-6 border-t border-white/10">
              {threeWaysWeWork[0].scope.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-white/[0.02] text-sm text-white/90">
                  <Check className="w-4 h-4 text-[#FE320A] flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 02 Hospitality Consulting */}
          <div className="bg-[#111116] border border-white/10 p-8 md:p-14 rounded-sm">
            <div className="flex items-center gap-4 text-xs font-mono text-[#FE320A] mb-4 uppercase">
              <span>(02) OPERATIONAL MASTERY</span>
              <span>•</span>
              <span>TIMEFRAME: 3–6 MONTHS TURNAROUND</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-white uppercase mb-4">
              02 — HOSPITALITY CONSULTING
            </h2>
            <p className="text-base text-[#CCCCCC] leading-relaxed font-sans max-w-3xl mb-4">
              This is where Ārohana is different from a conventional marketing agency. Hospitality consulting comes from actual industry experience as well as consulting work.
            </p>
            <p className="text-xs font-mono text-text-muted mb-8">
              Relevant experience includes Misu, Spice Goa, Khana Khazana, Khau Gali, Resort Blu and Holiday Village, among other hospitality projects.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-6 border-t border-white/10">
              {threeWaysWeWork[1].scope.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-white/[0.02] text-sm text-white/90">
                  <Check className="w-4 h-4 text-[#FE320A] flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 03 Content & Brand Production */}
          <div className="bg-[#111116] border border-white/10 p-8 md:p-14 rounded-sm">
            <div className="flex items-center gap-4 text-xs font-mono text-[#FE320A] mb-4 uppercase">
              <span>(03) CINEMATIC PRODUCTION</span>
              <span>•</span>
              <span>TIMEFRAME: 4–8 WEEKS PRODUCTION</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-white uppercase mb-4">
              03 — CONTENT & BRAND PRODUCTION
            </h2>
            <p className="text-base text-[#CCCCCC] leading-relaxed font-sans max-w-3xl mb-4">
              When the story needs to be bigger than a post, Ārohana can take the idea through scripting, production and post-production.
            </p>
            <p className="text-xs font-mono text-text-muted mb-8">
              Proof: SHE documentary/content, Western Command Investiture Ceremony, Indian Army project videos, PictureTime festival/on-ground content, Raysons industrial/casting film.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-6 border-t border-white/10">
              {threeWaysWeWork[2].scope.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-white/[0.02] text-sm text-white/90">
                  <Check className="w-4 h-4 text-[#FE320A] flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* HOW ENGAGEMENTS CAN WORK */}
        <div className="bg-white text-black p-8 md:p-16 rounded-sm mb-20">
          <div className="max-w-4xl mx-auto mb-12">
            <div className="text-xs font-mono text-black/50 tracking-[0.2em] uppercase mb-2">
              COMMERCIAL MODELS
            </div>
            <h2 className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-black">
              HOW ENGAGEMENTS CAN WORK.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {engagementModels.map((model, idx) => (
              <div key={idx} className="p-8 bg-neutral-100 border border-neutral-200 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-2xl md:text-3xl text-black uppercase mb-3">
                    {model.name}
                  </h3>
                  <p className="text-sm text-black/75 font-sans leading-relaxed mb-6">
                    {model.bestFor}
                  </p>
                </div>
                <ul className="space-y-2 pt-4 border-t border-black/10">
                  {model.deliverables.map((d, i) => (
                    <li key={i} className="text-xs font-mono text-black/80 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-black" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* A Note on Team Structure */}
          <div className="mt-12 p-8 bg-neutral-200 border border-neutral-300 rounded-sm">
            <h4 className="font-display text-2xl uppercase text-black mb-2">
              A NOTE ON TEAM STRUCTURE
            </h4>
            <p className="text-sm text-black/80 font-sans leading-relaxed">
              Ārohana does not need to sell a fixed team chart on the website. The client should understand that the right specialists are assembled around the brief — strategy, design, editing, photography, videography, performance or hospitality specialists as required.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-12">
          <h3 className="font-display text-4xl sm:text-5xl uppercase tracking-tight text-white mb-4">
            DON'T START WITH A SERVICE. START WITH THE PROBLEM.
          </h3>
          <p className="text-base sm:text-lg text-text-secondary font-sans mb-8 max-w-xl mx-auto">
            Tell us what you are trying to build, fix or change.
          </p>
          <Link
            href="/contact"
            className="sundown-pill-btn bg-[#FE320A] border-[#FE320A] text-white"
          >
            <span>Start a conversation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
