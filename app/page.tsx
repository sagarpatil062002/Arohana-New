import React from "react";
import Link from "next/link";
import Image from "next/image";
import ThreeHeroObject from "@/components/ThreeHeroObject";
import { servicesData } from "@/data/services";
import { featuredProjects, clientEcosystem } from "@/data/projects";
import { ArrowRight, ArrowDown } from "lucide-react";

export default function HomePage() {
  const figmaCreamCards = [
    {
      index: "01",
      title: "DIGITAL BRAND GROWTH",
      href: "/services/digital-brand-growth",
      image: "/assets/cream-card-digital.png",
      summary: "Strategy-led digital presence, content, campaigns and performance systems."
    },
    {
      index: "02",
      title: "HOSPITALITY CONSULTING",
      href: "/services/hospitality-consulting",
      image: "/assets/cream-card-hospitality.png",
      summary: "From concept to operations — designing and streamlining hospitality businesses."
    },
    {
      index: "03",
      title: "CONTENT & BRAND PRODUCTION",
      href: "/services/content-brand-production",
      image: "/assets/cream-card-camera.png",
      summary: "Films, brand stories and visual content that communicate clearly and create impact."
    }
  ];

  const figmaWorkCards = [
    {
      index: "01",
      title: "RAYSONS GROUP",
      category: "Real Estate",
      href: "/work/raysons-group",
      image: "/assets/work-raysons.png"
    },
    {
      index: "02",
      title: "LOOM CRAFTS",
      category: "Interiors",
      href: "/work/loom-crafts",
      image: "/assets/work-loom.png"
    },
    {
      index: "03",
      title: "PICTURETIME",
      category: "Entertainment",
      href: "/work/picturetime",
      image: "/assets/work-picturetime.png"
    },
    {
      index: "04",
      title: "SHE",
      category: "Community Initiative",
      href: "/work/project-she",
      image: "/assets/work-she.png"
    },
    {
      index: "05",
      title: "MISU",
      category: "F&B / Cafe",
      href: "/work/misu",
      image: "/assets/work-misu.png"
    },
    {
      index: "06",
      title: "RR SKINS",
      category: "Healthcare",
      href: "/work/rr-skins",
      image: "/assets/work-rrskins.png"
    }
  ];

  return (
    <div className="w-full text-white bg-[#0D1524]">
      {/* ==================== 1. HERO SECTION (Figma Screen 02) ==================== */}
      <section className="relative min-h-[92vh] flex items-center pt-32 pb-20 overflow-hidden bg-gradient-to-b from-[#080E18] via-[#0D1524] to-[#0A0F14]">
        {/* Ambient golden & navy glow behind 3D object */}
        <div
          className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[550px] h-[550px] pointer-events-none rounded-full blur-[140px] opacity-25"
          style={{
            background: "radial-gradient(circle, rgba(197,164,109,0.3) 0%, rgba(13,21,36,0) 70%)"
          }}
        />

        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Editorial Content */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <h1 className="font-clash text-4xl sm:text-6xl md:text-[4.5rem] lg:text-[5.2rem] font-bold tracking-[-0.02em] uppercase leading-[0.98] text-white">
              <span className="block">WE BUILD</span>
              <span className="block">BRANDS,</span>
              <span className="block">BUSINESSES &amp;</span>
              <span className="block text-white">EXPERIENCES.</span>
            </h1>

            <p className="text-sm sm:text-base text-[#8A919D] max-w-lg font-normal leading-relaxed pt-2">
              Business thinking, creative execution and sector experience — brought together around what the business actually needs.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="btn-solid group"
              >
                <span>START A CONVERSATION</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/work"
                className="btn-primary group"
              >
                <span>SEE OUR WORK</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Scroll Indicator matching Figma */}
            <div className="pt-12">
              <a
                href="#what-we-do"
                className="inline-flex items-center gap-2 font-mono text-[11px] text-[#8A919D] hover:text-[#C5A46D] transition-colors uppercase tracking-[0.2em]"
              >
                <span>SCROLL</span>
                <ArrowDown className="w-3 h-3 text-[#C5A46D] animate-bounce" />
              </a>
            </div>
          </div>

          {/* Right 3D Interactive Sculpture */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <div className="w-full max-w-[480px] aspect-square relative">
              <ThreeHeroObject />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 2. WHAT WE DO (IVORY CONTRAST SECTION - Figma Screen 02) ==================== */}
      <section
        id="what-we-do"
        className="w-full py-28 bg-[#F5F2EC] text-[#121215] relative"
      >
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl space-y-3">
              <span className="block font-mono text-xs font-semibold text-[#5A616C] tracking-[0.2em] uppercase">
                WHAT WE DO
              </span>
              <h2 className="font-clash text-3xl sm:text-5xl md:text-[3.2rem] font-bold uppercase leading-[1.06] tracking-tight text-[#121215]">
                WHAT WE DO DEPENDS ON WHAT THE BUSINESS ACTUALLY NEEDS.
              </h2>
            </div>
            <div>
              <Link
                href="/services"
                className="btn-ivory group whitespace-nowrap"
              >
                <span>EXPLORE ALL SERVICES</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* 3 Figma Ivory Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {figmaCreamCards.map((card) => (
              <Link
                key={card.index}
                href={card.href}
                className="group flex flex-col justify-between p-7 bg-[#FFFFFF] border border-[#121215]/10 rounded-sm hover:border-[#121215]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="space-y-3 mb-6">
                  <span className="block font-mono text-xs font-bold text-[#8A919D]">
                    {card.index}
                  </span>
                  <h3 className="font-clash text-lg sm:text-xl font-bold uppercase tracking-tight text-[#121215] group-hover:text-black">
                    {card.title}
                  </h3>
                </div>
                <div className="relative w-full aspect-[16/10] overflow-hidden rounded-sm bg-[#0A0F14]">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 3. ABOUT TEASER SECTION (THE ROAD TO AROHANA) ==================== */}
      <section className="w-full py-28 border-b border-white/10 bg-[#080E18]">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-7 space-y-6">
              <span className="eyebrow-label">ABOUT</span>
              <h2 className="font-clash text-3xl sm:text-5xl md:text-6xl font-bold uppercase leading-[1.04] tracking-tight text-white">
                <span className="block">THE ROAD TO</span>
                <span className="block">ĀROHANA WAS</span>
                <span className="block">ANYTHING BUT</span>
                <span className="block">STRAIGHT.</span>
              </h2>
              <p className="text-base sm:text-lg text-[#8A919D] max-w-xl leading-relaxed">
                I built it after spending years inside businesses — learning what makes them work, what makes them struggle, and what people see only after they become responsible for the whole thing.
              </p>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="btn-primary group"
                >
                  <span>READ FULL STORY</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C5A46D] group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative w-full aspect-[4/4.5] rounded-sm overflow-hidden border border-white/10">
                <Image
                  src="/assets/about-mountain.png"
                  alt="The Road to Ārohana"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080E18]/90 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="block font-clash text-sm font-bold uppercase text-white">
                    Madhura Hawal
                  </span>
                  <span className="font-mono text-xs text-[#8A919D]">
                    Founder &amp; Principal Consultant
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Milestones Horizontal Bar matching Figma Screen 03 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t border-white/10">
            <div className="space-y-2">
              <span className="font-mono text-xs text-[#C5A46D] font-bold block">
                01
              </span>
              <h4 className="font-clash text-sm font-bold uppercase tracking-wider text-white">
                IT STARTED WITH HOSPITALITY
              </h4>
              <p className="text-xs text-[#8A919D] leading-relaxed">
                From Muscat to Goa, hospitality taught me the meaning of people, operations and detail.
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-mono text-xs text-[#C5A46D] font-bold block">
                02
              </span>
              <h4 className="font-clash text-sm font-bold uppercase tracking-wider text-white">
                THERE WERE A FEW UNEXPECTED DETOURS
              </h4>
              <p className="text-xs text-[#8A919D] leading-relaxed">
                COVID changed the direction of things. The real test of clarity began.
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-mono text-xs text-[#C5A46D] font-bold block">
                03
              </span>
              <h4 className="font-clash text-sm font-bold uppercase tracking-wider text-white">
                AND THEN, THE WORK GOT INTERESTING
              </h4>
              <p className="text-xs text-[#8A919D] leading-relaxed">
                New sectors. New challenges. New perspectives. High-altitude operations in Ladakh.
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-mono text-xs text-[#C5A46D] font-bold block">
                04
              </span>
              <h4 className="font-clash text-sm font-bold uppercase tracking-wider text-white">
                WHERE ĀROHANA STANDS TODAY
              </h4>
              <p className="text-xs text-[#8A919D] leading-relaxed">
                Strategy. Communication. Creativity. Execution. For businesses serious about what they build.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 4. OUR WORK SECTION (Figma Screen 05) ==================== */}
      <section className="w-full py-28 border-b border-white/10 bg-[#0A0F14]">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <div>
              <span className="eyebrow-label">OUR WORK</span>
              <h2 className="font-clash text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-white">
                THE WORK IS THE PROOF.
              </h2>
            </div>
            <div>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 font-mono text-xs text-[#8A919D] hover:text-[#C5A46D] uppercase tracking-[0.16em] transition-colors"
              >
                <span>VIEW ALL PROJECTS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 6 Case Study Cards Grid matching Figma Screen 05 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {figmaWorkCards.map((proj) => (
              <Link
                key={proj.index}
                href={proj.href}
                className="group flex flex-col bg-[#101622] border border-white/10 hover:border-[#C5A46D]/50 rounded-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="relative w-full aspect-[16/11] overflow-hidden bg-black">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101622] via-transparent to-transparent opacity-80" />
                </div>
                <div className="p-6 flex flex-col justify-between flex-grow space-y-3">
                  <div>
                    <span className="font-mono text-xs text-[#C5A46D] font-bold block mb-1">
                      {proj.index}
                    </span>
                    <h3 className="font-clash text-lg sm:text-xl font-bold uppercase tracking-tight text-white group-hover:text-[#C5A46D] transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs font-mono text-[#8A919D] pt-0.5">
                      {proj.category}
                    </p>
                  </div>
                  <div className="pt-2 flex items-center gap-1.5 font-mono text-[11px] text-[#8A919D] group-hover:text-white transition-colors">
                    <span>VIEW CASE STUDY</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform text-[#C5A46D]" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Across Sectors Client Showcase matching Figma */}
          <div className="mt-24 pt-16 border-t border-white/10">
            <h3 className="font-clash text-xl sm:text-2xl font-bold uppercase tracking-wide text-white mb-8">
              ACROSS SECTORS. ACROSS STORIES.
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-px bg-white/10 border border-white/10">
              {clientEcosystem.map((client) => (
                <div
                  key={client.name}
                  className="p-4 bg-[#0D1524] hover:bg-[#142036] flex flex-col items-center justify-center text-center min-h-[90px] transition-colors group"
                >
                  <span className="font-clash text-xs font-bold tracking-wider text-white/80 group-hover:text-[#C5A46D] uppercase">
                    {client.name}
                  </span>
                  <span className="text-[9px] font-mono text-[#8A919D] mt-1">
                    {client.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 5. TOURIN SECTION (Figma Screen 08) ==================== */}
      <section className="w-full py-28 bg-[#080E18]">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10">
          <div className="relative rounded-sm overflow-hidden border border-white/15 min-h-[480px] flex items-center">
            {/* Background Motorcycle Image */}
            <div className="absolute inset-0">
              <Image
                src="/assets/tourin-ladakh-motorcycle.png"
                alt="Tourin Ladakh Himalayan Motorcycle Expedition"
                fill
                sizes="100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#080E18] via-[#080E18]/85 to-transparent" />
            </div>

            {/* Content Panel */}
            <div className="relative z-10 p-8 sm:p-14 max-w-xl space-y-6 text-left">
              <span className="eyebrow-label">TOURIN BY ĀROHANA</span>
              <h2 className="font-clash text-3xl sm:text-5xl font-bold uppercase leading-[1.08] tracking-tight text-white">
                <span className="block">TRAVEL BEYOND</span>
                <span className="block">THE ITINERARY.</span>
              </h2>
              <p className="text-sm sm:text-base text-[#8A919D] leading-relaxed">
                The Ladakh people experience and the Ladakh most itineraries sell are not always the same. Ladakh is the beginning, not the boundary.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/tourin"
                  className="btn-solid group"
                >
                  <span>EXPLORE EXPERIENCES</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="btn-primary group"
                >
                  <span>TALK TO US</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C5A46D] group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 6. CALL TO ACTION SECTION ==================== */}
      <section className="w-full py-28 border-t border-white/10 bg-[#0A0F14] text-center">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 space-y-6">
          <span className="eyebrow-label mx-auto">INITIATE AN ENGAGEMENT</span>
          <h2 className="font-clash text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-white">
            START A CONVERSATION.
          </h2>
          <p className="text-sm sm:text-base text-[#8A919D] max-w-xl mx-auto leading-relaxed">
            Tell us what you are trying to build, fix or change. We structure hybrid teams around what the business actually needs.
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="btn-solid group shadow-xl"
            >
              <span>START A CONVERSATION</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

