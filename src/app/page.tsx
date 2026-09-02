"use client";

import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import StrategySection from "@/components/StrategySection";
import ExecutionSection from "@/components/ExecutionSection";
import ResultsSection from "@/components/ResultsSection";
import SpecialProjectsAndTourin from "@/components/SpecialProjectsAndTourin";
import CtaSection from "@/components/CtaSection";
import CaseStudyModal from "@/components/CaseStudyModal";
import VideoModal from "@/components/VideoModal";
import { CaseStudy } from "@/data/content";

export default function HomePage() {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      {/* 01. HERO */}
      <HeroSection />

      {/* 02. A POINT OF VIEW */}
      <StrategySection onOpenVideo={() => setIsVideoOpen(true)} />

      {/* 03. THREE WAYS WE WORK */}
      <ExecutionSection />

      {/* 04. SELECTED WORK & PRIMARY SECTORS & BRAND STRIP */}
      <ResultsSection onSelectCaseStudy={(cs) => setSelectedCaseStudy(cs)} />

      {/* 05. SPECIAL PROJECTS & 06. TOURIN */}
      <SpecialProjectsAndTourin />

      {/* 07. FINAL CTA */}
      <CtaSection />

      {/* Interactive Case Study Modal Reader */}
      <CaseStudyModal
        caseStudy={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />

      {/* Video Reel Modal */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
      />
    </>
  );
}
