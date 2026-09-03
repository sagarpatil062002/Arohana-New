import React from "react";
import Hero3DExperience from "@/components/hero-3d/Hero3DExperience";
import BrandsMarquee from "@/components/home/BrandsMarquee";
import PositioningSection from "@/components/home/PositioningSection";
import VisualWorldTransition from "@/components/home/VisualWorldTransition";
import ProofOfWork from "@/components/home/ProofOfWork";
import ArmySpecialProjects from "@/components/home/ArmySpecialProjects";
import FounderSection from "@/components/home/FounderSection";
import ServicesSpatial from "@/components/home/ServicesSpatial";
import StandardsIndex from "@/components/home/StandardsIndex";
import SelectedWorkViewer from "@/components/home/SelectedWorkViewer";
import SectorDepthIndex from "@/components/home/SectorDepthIndex";
import TourinFeature from "@/components/home/TourinFeature";
import Final3DCTA from "@/components/home/Final3DCTA";

export default function HomePage() {
  return (
    <main className="w-full min-h-screen bg-[#050811] text-white overflow-hidden">
      {/* 01. 3D WebGL Opening Experience & 3D Hero */}
      <Hero3DExperience />

      {/* 02. Brands & Organisations Horizontal Marquee */}
      <BrandsMarquee />

      {/* 03. Strategic Positioning + Subtle 3D Spatial Geometry */}
      <PositioningSection />

      {/* 04. Ladakh · Foundries · Dining · Films Spatial World Transition */}
      <VisualWorldTransition />

      {/* 05. Proof of Work (Editorial Metric Wall) */}
      <ProofOfWork />

      {/* 06. Selected Special Projects: Indian Army (2.5D Showcase) */}
      <ArmySpecialProjects />

      {/* 07. Founder Credibility & Operational Leadership */}
      <FounderSection />

      {/* 08. Services & Practice Areas (3D Spatial Layered Planes) */}
      <ServicesSpatial />

      {/* 09. The Standard (01 to 06 Interactive Principle Index) */}
      <StandardsIndex />

      {/* 10. Selected Work (Cinematic Case-Study Viewer) */}
      <SelectedWorkViewer />

      {/* 11. Sector Depth (6-Sector Interactive Index) */}
      <SectorDepthIndex />

      {/* 12. Tourin Experiential Travel Unit (Himalayan Transition) */}
      <TourinFeature />

      {/* 13. Final Call to Action (3D WebGL Callback) */}
      <Final3DCTA />
    </main>
  );
}
