import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, CheckCircle2 } from "lucide-react";
import { AROHANA_MASTER_CONTENT } from "@/data/content";

export const metadata: Metadata = {
  title: "Tourin | Experiential Ladakh Travel & Journeys",
  description: "Tourin creates thoughtful, experiential journeys beginning with Ladakh — for travellers who want to experience a place beyond the usual itinerary.",
  openGraph: {
    title: "Tourin | Experiential Ladakh Travel & Journeys",
    description: "Tourin creates thoughtful, experiential journeys beginning with Ladakh — for travellers who want to experience a place beyond the usual itinerary.",
    images: [{ url: "/assets/tourin_ladakh.jpg" }],
  },
};

export default function TourinPage() {
  const { tourin } = AROHANA_MASTER_CONTENT;

  return (
    <div className="bg-[#050505] text-white pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Section Indicator */}
        <div className="mb-12">
          <div className="section-indicator-line text-white/70">
            <span>TOURIN // OWNED BRAND PROPOSITION</span>
          </div>
        </div>

        {/* HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          
          <div className="lg:col-span-7">
            <span className="text-xs font-mono text-[#FE320A] tracking-[0.2em] uppercase block mb-4 flex items-center gap-2">
              <Compass className="w-4 h-4" /> 15+ VERIFIED EXPEDITIONS COMPLETED
            </span>
            <h1 className="font-display font-display-hero text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tight text-white mb-8">
              TRAVEL BEYOND<br />
              THE ITINERARY.
            </h1>
            <p className="text-xl md:text-2xl text-[#E0E0E0] font-light leading-relaxed mb-6 font-sans">
              Some places are better experienced when you stop trying to see everything.
            </p>
            <p className="text-base md:text-lg text-[#9E9E9E] font-sans leading-relaxed mb-10 max-w-2xl">
              Tourin creates experiential journeys for travellers who want more than a checklist of sights — beginning with Ladakh.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#journeys"
                className="sundown-pill-btn bg-[#FE320A] border-[#FE320A] text-white"
              >
                <span>View Ladakh experiences</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/contact"
                className="sundown-pill-btn hover:border-white"
              >
                <span>Talk to us about a journey</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative w-full aspect-[4/3] bg-neutral-900 overflow-hidden border border-white/20 rounded-sm shadow-2xl">
              <Image
                src="/assets/tourin_ladakh.jpg"
                alt="Tourin Ladakh Local Interaction & Starlit Homestay"
                fill
                priority
                className="object-cover img-editorial"
              />
              <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-4 py-2 border border-white/10 text-xs font-mono text-white">
                LADAKH // LIVED-IN SENSE OF PLACE
              </div>
            </div>
          </div>

        </div>

        {/* WHY TOURIN & WHAT WE BELIEVE (WHITE CONTRAST SECTION) */}
        <div className="bg-white text-black p-8 md:p-16 lg:p-20 rounded-sm mb-24">
          <div className="max-w-4xl mx-auto space-y-16">
            
            {/* Why Tourin */}
            <div>
              <div className="text-xs font-mono text-black/50 tracking-[0.2em] uppercase mb-2">
                ORIGIN STORY
              </div>
              <h2 className="font-display text-4xl sm:text-6xl text-black uppercase tracking-tight mb-6">
                WHY TOURIN.
              </h2>
              <p className="text-base sm:text-lg text-black/80 font-sans leading-relaxed">
                {tourin.whyTourin}
              </p>
            </div>

            {/* What We Believe */}
            <div className="pt-12 border-t border-black/10">
              <div className="text-xs font-mono text-black/50 tracking-[0.2em] uppercase mb-2">
                OUR PHILOSOPHY
              </div>
              <h2 className="font-display text-4xl sm:text-6xl text-black uppercase tracking-tight mb-6">
                WHAT WE BELIEVE.
              </h2>
              <p className="text-base sm:text-lg text-black/80 font-sans leading-relaxed mb-6">
                {tourin.whatWeBelieve}
              </p>
              <div className="p-6 bg-neutral-100 border-l-2 border-black text-sm font-mono text-black/80 uppercase">
                // TRAVEL THAT FEELS PERSONAL, CONSIDERED AND ROOTED — NOT TRAVEL SIMPLY PACKED WITH MORE STOPS.
              </div>
            </div>

            {/* Why Ladakh */}
            <div className="pt-12 border-t border-black/10">
              <div className="text-xs font-mono text-black/50 tracking-[0.2em] uppercase mb-2">
                HIGH ALTITUDE GROUNDING
              </div>
              <h2 className="font-display text-4xl sm:text-6xl text-black uppercase tracking-tight mb-6">
                WHY LADAKH.
              </h2>
              <p className="text-base sm:text-lg text-black/80 font-sans leading-relaxed mb-6">
                {tourin.whyLadakh}
              </p>
            </div>

            {/* Who is Tourin For */}
            <div className="pt-12 border-t border-black/10">
              <div className="text-xs font-mono text-black/50 tracking-[0.2em] uppercase mb-2">
                TRAVEL AUDIENCE
              </div>
              <h2 className="font-display text-4xl sm:text-6xl text-black uppercase tracking-tight mb-8">
                WHO IS TOURIN FOR?
              </h2>
              <ul className="space-y-4 font-sans text-base text-black/85">
                {tourin.whoIsItFor.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#FE320A] mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Proof That the Idea Works */}
            <div className="p-8 bg-neutral-100 border border-neutral-200 rounded-sm">
              <h3 className="font-display text-2xl uppercase text-black mb-2">
                PROOF THAT THE IDEA WORKS
              </h3>
              <p className="text-sm font-sans text-black/80 leading-relaxed">
                {tourin.proof}
              </p>
            </div>

          </div>
        </div>

        {/* THE EXPERIENCE & CURATED JOURNEYS */}
        <div id="journeys" className="mb-24">
          <div className="text-xs font-mono text-text-muted tracking-[0.2em] uppercase mb-4">
            CURATED JOURNEYS
          </div>
          <h2 className="font-display text-4xl sm:text-6xl text-white uppercase tracking-tight mb-12">
            EXPLORE OUR LADAKH EXPERIENCES.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tourin.experiences.map((exp, idx) => (
              <div key={idx} className="p-8 bg-[#111116] border border-white/10 flex flex-col justify-between hover:border-[#FE320A] transition-colors">
                <div>
                  <span className="text-xs font-mono text-[#FE320A] uppercase tracking-widest block mb-2">
                    {exp.duration}
                  </span>
                  <h3 className="font-display text-3xl text-white uppercase mb-4">
                    {exp.title}
                  </h3>
                  <p className="text-sm text-[#CCCCCC] font-sans leading-relaxed mb-8">
                    {exp.desc}
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-xs font-mono text-white uppercase tracking-widest hover:text-[#FE320A]"
                >
                  <span>INQUIRE THIS EXPEDITION</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* FROM ĀROHANA TO TOURIN & THE NEXT CHAPTER */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="p-8 md:p-12 bg-[#111116] border border-white/10">
            <h3 className="font-display text-2xl uppercase text-white mb-4">FROM ĀROHANA TO TOURIN</h3>
            <p className="text-sm text-text-secondary font-sans leading-relaxed">
              Tourin is an extension of the same instinct that sits behind Ārohana: create something with a clear point of view rather than simply offering what everyone else offers. Ārohana builds brands and businesses. Tourin applies that thinking to travel — turning a destination into an experience people can connect with.
            </p>
          </div>

          <div className="p-8 md:p-12 bg-[#111116] border border-white/10">
            <h3 className="font-display text-2xl uppercase text-white mb-4">THE NEXT CHAPTER</h3>
            <p className="text-sm text-text-secondary font-sans leading-relaxed">
              Ladakh is the beginning, not the boundary. As Tourin grows, the intention is to take the same approach to other destinations — places with enough character, culture and story to create journeys worth remembering.
            </p>
          </div>
        </div>

        {/* CLOSING */}
        <div className="text-center py-12">
          <h3 className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-white mb-4">
            COME TRAVEL DIFFERENTLY.
          </h3>
          <p className="text-base sm:text-lg text-text-secondary font-sans mb-8">
            Explore our Ladakh journeys or talk to us about a custom route.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/contact"
              className="sundown-pill-btn bg-[#FE320A] border-[#FE320A] text-white"
            >
              <span>Talk to us about a journey</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
