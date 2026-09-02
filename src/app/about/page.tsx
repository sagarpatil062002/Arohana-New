import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Ārohana | Madhura Hawal, Founder",
  description: "Meet Madhura Hawal, founder of Ārohana Consultancy. From hospitality and entrepreneurship to brand strategy, digital growth and complex on-ground projects.",
  openGraph: {
    title: "About Ārohana | Madhura Hawal, Founder",
    description: "Meet Madhura Hawal, founder of Ārohana Consultancy. From hospitality and entrepreneurship to brand strategy, digital growth and complex on-ground projects.",
    images: [{ url: "/assets/founder_madhura.jpg" }],
  },
};

export default function AboutPage() {
  return (
    <div className="bg-[#050505] text-white pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-[1100px] mx-auto">
        
        {/* Eyebrow */}
        <div className="mb-12">
          <div className="section-indicator-line text-white/70">
            <span>ABOUT // FOUNDER STORY</span>
          </div>
        </div>

        {/* HERO */}
        <div className="mb-16">
          <h1 className="font-display font-display-hero text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tight text-white mb-8">
            THE ROAD TO ĀROHANA WAS ANYTHING BUT STRAIGHT.
          </h1>
          <p className="text-xl md:text-2xl text-[#E0E0E0] font-sans leading-relaxed mb-6 font-light">
            I built it after spending years inside businesses — learning what makes them work, what makes them struggle, and what people see only after they become responsible for the whole thing.
          </p>
          <p className="text-base md:text-lg text-[#9E9E9E] font-sans leading-relaxed">
            Today, Ārohana brings together that experience with strategy, communication, creativity and execution — for businesses that are serious about what they are building.
          </p>
        </div>

        {/* HERO IMAGE — One strong, natural portrait of Madhura */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[21/9] bg-neutral-900 border border-white/15 rounded-sm overflow-hidden mb-24 shadow-2xl">
          <Image
            src="/assets/founder_madhura.jpg"
            alt="Madhura Hawal, Founder of Ārohana Consultancy"
            fill
            priority
            className="object-cover img-editorial"
          />
          <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-4 py-2 border border-white/10 text-xs font-mono text-white">
            MADHURA HAWAL // FOUNDER & STRATEGIC DIRECTOR
          </div>
        </div>

        {/* CHAPTER 1 — IT STARTED WITH HOSPITALITY */}
        <div className="mb-24">
          <h2 className="font-display text-3xl sm:text-5xl uppercase tracking-tight text-white mb-8 border-b border-white/10 pb-4">
            IT STARTED WITH HOSPITALITY
          </h2>
          
          <div className="space-y-6 text-base sm:text-lg text-[#CCCCCC] font-sans leading-relaxed">
            <p>
              My first world was hospitality.
            </p>
            <p>
              I studied Hospitality Management in Muscat before completing my degree in Goa. While I was studying in Goa, I was selected among the Top 13 finalists from the West Zone for Femina Miss India — an unexpected opportunity that took me into a completely different world and taught me a great deal about confidence, communication and being comfortable outside my comfort zone. Not long after, I was selected as one of just 16 students from across India for the Taj Management Training Programme.
            </p>
            <p>
              Over the years, I worked in Muscat, returned to Kolhapur and eventually decided to build something of my own — Mother India Cafe.
            </p>

            {/* Pull Quote */}
            <div className="my-10 p-8 bg-white/[0.03] border-l-2 border-[#FE320A] text-xl md:text-2xl text-white font-display uppercase tracking-wide">
              "Running a café teaches you things no business textbook can quite prepare you for. You learn about people, margins, suppliers, staff, customers, bad days, good days and the uncomfortable reality that every decision eventually shows up in the numbers."
            </div>

            <p>
              While the café was still running, another opportunity took me to Goa. I joined Passcode Hospitality as Operations Head and worked on two upcoming restaurants, Pings Bia Hoi and Jamun.
            </p>
            <p>
              That experience took me deeper into the machinery behind a hospitality business — not just how a brand looks, but how an experience is actually built.
            </p>
            <p>
              Later, I moved into institutional business and sales with Latambarcem Brewers Private Limited, working across Goa and Delhi. It gave me another perspective on business: relationships, commercial thinking, negotiation and growth.
            </p>
            <p className="text-white font-medium">
              By then, I had understood something that would eventually become central to Ārohana: a business can have a great-looking brand and still have a problem underneath it. And sometimes what looks like a marketing problem isn't a marketing problem at all.
            </p>
          </div>

          {/* Visual Pause 1 */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative w-full aspect-[4/3] bg-neutral-900 overflow-hidden border border-white/10">
              <Image
                src="/assets/misu.jpg"
                alt="Hospitality Operations"
                fill
                className="object-cover img-editorial"
              />
              <div className="absolute bottom-3 left-3 text-[10px] font-mono text-white/80 bg-black/70 px-2 py-1">
                HOSPITALITY MACHINERY & OPERATIONS
              </div>
            </div>
            <div className="relative w-full aspect-[4/3] bg-neutral-900 overflow-hidden border border-white/10">
              <Image
                src="/assets/loomcrafts.jpg"
                alt="Commercial Design & Lifestyle"
                fill
                className="object-cover img-editorial"
              />
              <div className="absolute bottom-3 left-3 text-[10px] font-mono text-white/80 bg-black/70 px-2 py-1">
                COMMERCIAL THINKING & NEGOTIATION
              </div>
            </div>
          </div>
        </div>

        {/* CHAPTER 2 — THERE WERE A FEW UNEXPECTED DETOURS */}
        <div className="mb-24">
          <h2 className="font-display text-3xl sm:text-5xl uppercase tracking-tight text-white mb-8 border-b border-white/10 pb-4">
            THERE WERE A FEW UNEXPECTED DETOURS
          </h2>

          <div className="space-y-6 text-base sm:text-lg text-[#CCCCCC] font-sans leading-relaxed">
            <p>
              And then, like it did for so many people, COVID changed the direction of things.
            </p>
            <p>
              The café had to close. My work in hospitality was disrupted. What came next wasn't a carefully planned five-year strategy. It was the beginning of a different kind of work.
            </p>
            <p className="text-white text-xl font-display uppercase tracking-wide">
              That work gradually became Ārohana.
            </p>
          </div>
        </div>

        {/* CHAPTER 3 — AND THEN, THE WORK GOT INTERESTING */}
        <div className="mb-24">
          <h2 className="font-display text-3xl sm:text-5xl uppercase tracking-tight text-white mb-8 border-b border-white/10 pb-4">
            AND THEN, THE WORK GOT INTERESTING
          </h2>

          <div className="space-y-6 text-base sm:text-lg text-[#CCCCCC] font-sans leading-relaxed">
            <p>
              What began with digital marketing projects slowly expanded.
            </p>
            <p>
              We found ourselves working with restaurants and resorts, real-estate businesses, healthcare brands, consumer businesses and entertainment companies. Sometimes the requirement was a brand strategy. Sometimes it was a complete digital presence. Sometimes it was a campaign, a film, a new menu or an operational problem inside a restaurant.
            </p>
            <p>
              And sometimes the brief took us somewhere completely unexpected.
            </p>
            <p>
              My work in Ladakh became one of those chapters.
            </p>
            <p>
              There, I worked on projects associated with the Indian Army, including work connected with 14 Corps, Fire & Fury Corps, Operation Sadbhavana and Operation Sampark. That work eventually extended to other Army environments as well, including Western Command and 12 Rashtriya Rifles under Delta Force.
            </p>
            <p>
              The environments were different. The audiences were different. The responsibility was different.
            </p>

            {/* Pull Quote */}
            <div className="my-10 p-8 bg-white/[0.03] border-l-2 border-[#FE320A] text-xl md:text-2xl text-white font-display uppercase tracking-wide">
              "And that experience reinforced something I had already learnt from hospitality: you cannot create meaningful communication without understanding the people, the environment and the reality behind it."
            </div>
          </div>

          {/* Visual Pause 2 */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative w-full aspect-[4/3] bg-neutral-900 overflow-hidden border border-white/10">
              <Image
                src="/assets/army_projects.jpg"
                alt="14 Corps High Altitude Operations"
                fill
                className="object-cover img-editorial"
              />
              <div className="absolute bottom-3 left-3 text-[10px] font-mono text-white/80 bg-black/70 px-2 py-1">
                HIGH ALTITUDE OPERATIONS // LADAKH
              </div>
            </div>
            <div className="relative w-full aspect-[4/3] bg-neutral-900 overflow-hidden border border-white/10">
              <Image
                src="/assets/she.jpg"
                alt="SHE Initiative Community Fieldwork"
                fill
                className="object-cover img-editorial"
              />
              <div className="absolute bottom-3 left-3 text-[10px] font-mono text-white/80 bg-black/70 px-2 py-1">
                COMMUNITY ENGAGEMENT // FIELDWORK
              </div>
            </div>
          </div>
        </div>

        {/* CHAPTER 4 — WHERE ĀROHANA STANDS TODAY */}
        <div className="mb-24">
          <h2 className="font-display text-3xl sm:text-5xl uppercase tracking-tight text-white mb-8 border-b border-white/10 pb-4">
            WHERE ĀROHANA STANDS TODAY
          </h2>

          <div className="space-y-6 text-base sm:text-lg text-[#CCCCCC] font-sans leading-relaxed">
            <p>
              What remains constant is the standard: clear thinking, sector-aware strategy, strong creative work and disciplined execution — brought together to make the business more visible, more relevant and more valuable to the people it is trying to reach.
            </p>
            <p>
              That is also why our work can move from a real-estate brand to a healthcare practice, from a restaurant to a consumer brand, or from a commercial campaign to a project in an entirely different environment. The category changes. The thinking has to change with it.
            </p>
            <p>
              The work may begin with a brand question, a business challenge or simply the sense that something is not working as it should. From there, strategy, communication, creative and execution come together around what the business actually needs — rather than around a fixed list of deliverables.
            </p>
            <p>
              We work with businesses at points where a standard agency approach is not enough — when a brand needs sharper positioning, a stronger market presence, a more deliberate digital strategy, or a hospitality business needs to rethink the experience it is creating.
            </p>
            <p className="text-white font-medium">
              Today, Ārohana sits at the intersection of brand thinking, business understanding and execution.
            </p>
          </div>
        </div>

        {/* CLOSING */}
        <div className="p-10 md:p-14 bg-[#111116] border border-white/10 rounded-sm mb-16">
          <h3 className="font-display text-3xl sm:text-4xl uppercase text-white mb-4">
            A BRAND IS ONLY AS STRONG AS THE THINKING BEHIND IT.
          </h3>
          <p className="text-base sm:text-lg text-[#BDBDBD] font-sans leading-relaxed mb-8">
            That thinking comes from years of being inside businesses — building, running, selling, solving and starting again. Today, it is what we bring to the businesses we work with. If you're building something worth building, let's talk.
          </p>
          <div>
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
    </div>
  );
}
