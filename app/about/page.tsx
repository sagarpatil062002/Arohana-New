import React from "react";
import Link from "next/link";
import Image from "next/image";
import { aboutData } from "@/data/about";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "The road to Ārohana was anything but straight. Meet our leadership collective and discover our journey across hospitality, military campaigns, and commercial strategy."
};

export default function AboutPage() {
  const figmaMilestones = [
    {
      index: "01",
      title: "IT STARTED WITH HOSPITALITY",
      copy: "From Muscat to Goa, hospitality taught me the meaning of people, operations and detail."
    },
    {
      index: "02",
      title: "THERE WERE A FEW UNEXPECTED DETOURS",
      copy: "COVID changed the direction of things. The real test of clarity began."
    },
    {
      index: "03",
      title: "AND THEN, THE WORK GOT INTERESTING",
      copy: "New sectors. New challenges. New perspectives. High-altitude operations in Ladakh."
    },
    {
      index: "04",
      title: "WHERE ĀROHANA STANDS TODAY",
      copy: "Strategy. Communication. Creativity. Execution. For businesses serious about what they build."
    }
  ];

  return (
    <div className="w-full bg-[#0D1524] text-white">
      {/* ==================== 1. HERO (Figma Screen 03) ==================== */}
      <section className="relative min-h-[85vh] flex flex-col justify-end pt-36 pb-20 overflow-hidden bg-[#080E18]">
        {/* Mountain Backdrop with Hiker Silhouette */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/about-mountain.png"
            alt="The Road to Ārohana"
            fill
            sizes="100vw"
            priority
            className="object-cover object-center opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080E18] via-[#080E18]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080E18]/90 via-[#080E18]/40 to-transparent" />
        </div>

        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 relative z-10 w-full">
          <div className="max-w-3xl space-y-6 mb-16">
            <span className="font-mono text-xs text-[#C5A46D] font-semibold tracking-[0.2em] uppercase block">
              03 ABOUT
            </span>
            <h1 className="font-clash text-4xl sm:text-6xl md:text-[4.5rem] font-bold uppercase leading-[0.98] tracking-tight text-white">
              <span className="block">THE ROAD TO</span>
              <span className="block">ĀROHANA WAS</span>
              <span className="block">ANYTHING BUT</span>
              <span className="block text-white">STRAIGHT.</span>
            </h1>
            <p className="text-base sm:text-xl text-[#8A919D] font-normal leading-relaxed pt-2 max-w-2xl">
              I built it after spending years inside businesses — learning what makes them work, what makes them struggle, and what people see only after they become responsible for the whole thing.
            </p>
          </div>

          {/* 4 Horizontal Milestones (Figma Screen 03) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10 border-t border-white/10">
            {figmaMilestones.map((m) => (
              <div key={m.index} className="space-y-2 p-4 rounded-sm bg-[#101622]/60 backdrop-blur-sm border border-white/5 hover:border-[#C5A46D]/40 transition-colors">
                <span className="font-mono text-xs text-[#C5A46D] font-bold block">
                  {m.index}
                </span>
                <h3 className="font-clash text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                  {m.title}
                </h3>
                <p className="text-xs text-[#8A919D] leading-relaxed">
                  {m.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 2. IVORY CONTRAST SECTION (Figma Screen 03) ==================== */}
      <section className="w-full py-28 bg-[#F5F2EC] text-[#121215] relative overflow-hidden">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="block font-mono text-xs font-semibold text-[#5A616C] tracking-[0.2em] uppercase">
                PHILOSOPHY
              </span>
              <h2 className="font-clash text-3xl sm:text-5xl md:text-[3.2rem] font-bold uppercase leading-[1.04] tracking-tight text-[#121215]">
                THE CATEGORY CHANGES. THE THINKING HAS TO CHANGE WITH IT.
              </h2>
              <p className="text-base sm:text-lg text-[#555860] leading-relaxed max-w-xl">
                Every business has its own operating reality. We don&apos;t apply templates — we structure hybrid teams around what the business actually needs to grow.
              </p>
              <div className="pt-2">
                <a
                  href="#founder-narrative"
                  className="btn-ivory group"
                >
                  <span>READ FULL STORY</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden border border-[#121215]/10 shadow-lg bg-[#EAE5DC]">
                <Image
                  src="/images/about/mother-india-cafe.jpg"
                  alt="Operating Architecture & Experience"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 3. FOUNDER IMMERSION ==================== */}
      <section id="founder-narrative" className="py-28 border-b border-white/10 bg-[#080E18]">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="relative w-full aspect-[4/5] rounded-sm overflow-hidden border border-white/15">
                <Image
                  src="/images/about/madhura-portrait.jpg"
                  alt="Madhura Hawal"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <span className="eyebrow-label">PRINCIPAL LEADERSHIP</span>
              <h2 className="font-clash text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
                Madhura Hawal
              </h2>
              <p className="font-mono text-xs text-[#C5A46D] uppercase tracking-[0.16em]">
                Founder &amp; Principal Consultant · Kolhapur · Goa · Delhi · Ladakh
              </p>
              <p className="text-sm sm:text-base text-[#8A919D] leading-relaxed">
                Madhura brings hands-on entrepreneurial expertise and strategic insight to every client brief. With credentials spanning luxury hospitality management in Muscat and Goa, the Taj Management Training Programme, standalone cafe ownership, craft brewery sales, and field logistics for Indian Army campaigns in Northern India, her consultative framework is rooted in ground execution.
              </p>
              <p className="text-sm sm:text-base text-[#8A919D] leading-relaxed">
                At Ārohana, she works directly with business owners, hospitality founders, and institutional leadership teams to eliminate vanity noise and link brand positioning directly to operational ledgers.
              </p>

              {/* Philosophy Quote Box */}
              <div className="p-6 rounded-sm bg-[#101622] border-l-2 border-[#C5A46D] space-y-2 mt-4">
                <p className="font-clash text-base sm:text-lg text-white font-semibold uppercase tracking-wide">
                  &ldquo;{aboutData.philosophy.statement}&rdquo;
                </p>
                <p className="text-xs font-mono text-[#8A919D]">
                  {aboutData.philosophy.subtext}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 4. 4-CHAPTER JOURNEY TIMELINE ==================== */}
      <section className="py-28 border-b border-white/10 bg-[#0A0F14]">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10">
          <div className="max-w-2xl mb-16">
            <span className="eyebrow-label">NARRATIVE TIMELINE</span>
            <h2 className="font-clash text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white">
              FROM LUXURY TAJ FLOORS TO 14,000 FT HIMALAYAN SECTORS.
            </h2>
          </div>

          <div className="space-y-16">
            {aboutData.milestones.map((ms, idx) => (
              <div
                key={ms.period}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-10 border-t border-white/10 items-start"
              >
                <div className="lg:col-span-3 space-y-1">
                  <span className="font-mono text-2xl font-bold text-white block">
                    {ms.period}
                  </span>
                  <span className="font-mono text-xs text-[#8A919D] block">
                    {ms.locations}
                  </span>
                  <span className="font-mono text-xs text-[#C5A46D] font-bold block pt-1">
                    [ CHAPTER 0{idx + 1} ]
                  </span>
                </div>

                <div className="lg:col-span-9 space-y-4">
                  <h3 className="font-clash text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
                    {ms.title}
                  </h3>
                  <p className="text-xs font-mono text-[#8A919D]">
                    {ms.subtitle}
                  </p>
                  <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-3xl">
                    {ms.narrative}
                  </p>
                  <div className="pt-2">
                    <span className="block font-mono text-xs text-[#8A919D] uppercase tracking-widest mb-2">
                      CORE TAKEAWAYS
                    </span>
                    <ul className="space-y-1.5 text-xs text-white/70">
                      {ms.takeaways.map((point) => (
                        <li key={point} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A46D] flex-shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 5. LEADERSHIP COLLECTIVE ==================== */}
      <section className="py-28 border-b border-white/10 bg-[#080E18]">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10">
          <div className="max-w-2xl mb-16">
            <span className="eyebrow-label">LEADERSHIP COLLECTIVE</span>
            <h2 className="font-clash text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white">
              BRAND IS ONLY AS STRONG AS THE THINKING BEHIND IT.
            </h2>
            <p className="text-sm sm:text-base text-[#8A919D] pt-2 leading-relaxed">
              Behind Ārohana is an interdisciplinary collective of operators, commercial strategists, filmmakers, and creative architects who have built, run, and scaled systems on the ground.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutData.team.map((member) => (
              <div
                key={member.name}
                className="bg-[#101622] border border-white/10 rounded-sm overflow-hidden flex flex-col justify-between p-6 space-y-4 hover:border-[#C5A46D]/40 transition-colors"
              >
                <div className="space-y-3">
                  <div className="relative w-full aspect-[4/4.5] rounded-sm bg-black overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover object-top"
                    />
                  </div>
                  <div>
                    <span className="font-mono text-xs text-[#C5A46D] font-bold block">
                      {member.prefix}
                    </span>
                    <h3 className="font-clash text-lg font-bold uppercase text-white">
                      {member.name}
                    </h3>
                    <p className="text-xs font-mono text-[#8A919D]">
                      {member.role}
                    </p>
                  </div>
                  <p className="text-xs text-[#8A919D] leading-relaxed line-clamp-4">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10">
                  <div className="flex flex-wrap gap-1">
                    {member.competencies.map((comp) => (
                      <span
                        key={comp}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/70"
                      >
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 6. CTA ==================== */}
      <section className="py-24 text-center bg-[#0A0F14]">
        <div className="max-w-2xl mx-auto px-6 sm:px-10 space-y-6">
          <h2 className="font-clash text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white">
            READY TO BUILD TOGETHER?
          </h2>
          <p className="text-sm sm:text-base text-[#8A919D] leading-relaxed">
            Let&apos;s structure an engagement tailored to your specific commercial milestones.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="btn-solid group"
            >
              <span>START A CONVERSATION</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

