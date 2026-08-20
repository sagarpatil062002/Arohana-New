import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PointOfView from "@/components/PointOfView";
import ThreeWays from "@/components/ThreeWays";
import SelectedWork from "@/components/SelectedWork";
import SectorBand from "@/components/SectorBand";
import LogoStrip from "@/components/LogoStrip";
import ComplexProjects from "@/components/ComplexProjects";
import TourinSection from "@/components/TourinSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PointOfView />
        <ThreeWays />
        <SelectedWork />
        <SectorBand />
        <LogoStrip />
        <ComplexProjects />
        <TourinSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
