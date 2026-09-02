import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Shield, Award, Check } from "lucide-react";
import { AROHANA_MASTER_CONTENT } from "@/data/content";

export const metadata: Metadata = {
  title: "Special Projects & Indian Army | Ārohana Consultancy",
  description: "Specialised project experience across high-altitude military documentation, 14 Corps, Western Command, Operation Sadbhavana and community initiatives.",
  openGraph: {
    title: "Special Projects & Indian Army | Ārohana Consultancy",
    description: "Specialised project experience across high-altitude military documentation, 14 Corps, Western Command, Operation Sadbhavana and community initiatives.",
    images: [{ url: "/assets/army_projects.jpg" }],
  },
};

export default function IndianArmyProjectsPage() {
  const { specialProjects } = AROHANA_MASTER_CONTENT;

  const armyFormations = [
    {
      name: "14 Corps / Fire & Fury Corps",
      role: "High-Altitude Institutional Storytelling",
      desc: "Operating in the world's highest active battlefields across Ladakh, documenting strategic civil-military initiatives, high-altitude logistics, and gallantry milestones."
    },
    {
      name: "Operation Sadbhavana",
      role: "Community Integration & Education",
      desc: "Documenting grassroots welfare programs, Army Goodwill Schools, women's medical empowerment, and border-area development in Ladakh & Kargil."
    },
    {
      name: "Operation Sampark & Homestay Training",
      role: "Border Tourism Infrastructure",
      desc: "Training local Ladakhi villagers in homestay hospitality and developing communications for border road infrastructure initiatives."
    },
    {
      name: "Western Command Investiture Ceremony",
      role: "Ceremonial & Institutional Production",
      desc: "Producing ceremonial film documentation, gallantry citation storytelling, and official historical archives for Western Command headquarters."
    },
    {
      name: "12 Rashtriya Rifles (Delta Force)",
      role: "Operational Ground Communications",
      desc: "Field-level communication initiatives with counter-insurgency formations, ensuring dignity, trust, and community understanding."
    }
  ];

  return (
    <div className="bg-[#050505] text-white pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Section Indicator */}
        <div className="mb-12">
          <div className="section-indicator-line text-white/70">
            <span>SPECIAL PROJECTS // INSTITUTIONAL</span>
          </div>
        </div>

        {/* Hero Banner Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          
          <div className="lg:col-span-7">
            <span className="text-xs font-mono text-[#FE320A] tracking-[0.2em] uppercase block mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4" /> SPECIALISED HIGH-RESPONSIBILITY EXPERIENCE
            </span>
            <h1 className="font-display font-display-hero text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tight text-white mb-8">
              THE WORK THAT DOESN'T FIT A STANDARD AGENCY BOX.
            </h1>
            <p className="text-lg md:text-xl text-[#BDBDBD] leading-relaxed font-sans max-w-2xl mb-8">
              From remote-community initiatives in Ladakh to films and communication projects for the Indian Army, Ārohana has also worked on briefs where the environment, audience and responsibility demanded a different level of preparation.
            </p>
            <div className="p-6 bg-white/[0.03] border-l-2 border-[#FE320A] text-sm md:text-base text-white font-sans italic max-w-2xl">
              "And that experience reinforced something I had already learnt from hospitality: you cannot create meaningful communication without understanding the people, the environment and the reality behind it."
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative w-full aspect-[4/3] bg-neutral-900 overflow-hidden border border-white/20 rounded-sm shadow-2xl">
              <Image
                src="/assets/army_projects.jpg"
                alt="Indian Army High Altitude Projects in Ladakh"
                fill
                priority
                className="object-cover img-editorial"
              />
              <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-4 py-2 border border-white/10 text-xs font-mono text-white">
                HIGH ALTITUDE MILITARY // 14 CORPS LADAKH
              </div>
            </div>
          </div>

        </div>

        {/* Formations Engaged Grid (White Contrast) */}
        <div className="bg-white text-black p-8 md:p-16 rounded-sm mb-20">
          <div className="max-w-4xl mx-auto mb-12">
            <div className="text-xs font-mono text-black/50 tracking-[0.2em] uppercase mb-2">
              INSTITUTIONAL ENGAGEMENTS
            </div>
            <h2 className="font-display text-4xl sm:text-6xl text-black uppercase tracking-tight">
              DIVISIONS & FORMATIONS ENGAGED.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {armyFormations.map((div, idx) => (
              <div key={idx} className="p-6 bg-neutral-100 border border-neutral-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-[#FE320A]">
                    <Award className="w-4 h-4" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-black/60">
                      {div.role}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl uppercase tracking-wide mb-3 text-black">
                    {div.name}
                  </h3>
                  <p className="text-xs font-sans text-black/75 leading-relaxed">
                    {div.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing Action */}
        <div className="text-center py-12">
          <h3 className="font-display text-3xl md:text-5xl uppercase tracking-tight text-white mb-6">
            HAVE A COMPLEX OR INSTITUTIONAL BRIEF?
          </h3>
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
