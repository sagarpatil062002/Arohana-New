import ServicesHero from '@/components/services/ServicesHero';
import DigitalGrowthSection from '@/components/services/DigitalGrowthSection';
import HospitalitySection from '@/components/services/HospitalitySection';
import ProductionSection from '@/components/services/ProductionSection';
import EngagementModels from '@/components/services/EngagementModels';
import TeamStructure from '@/components/services/TeamStructure';
import ServicesCTA from '@/components/services/ServicesCTA';
import { SERVICES_PILLARS } from '@/data/services-content';

export default function ServicesPage() {
  return (
    <div className="svc-page">
      {/* 01 — Editorial hero */}
      <ServicesHero />

      {/* 02 — Digital Brand Growth (light, cinematic index) */}
      <DigitalGrowthSection pillar={SERVICES_PILLARS[0]} sectionId="digital-growth" />

      {/* 03 — Hospitality Consulting (dark spec plate + ticker) */}
      <HospitalitySection pillar={SERVICES_PILLARS[1]} sectionId="hospitality-consulting" />

      {/* 04 — Content & Brand Production (asymmetric overlap) */}
      <ProductionSection pillar={SERVICES_PILLARS[2]} sectionId="brand-production" />

      {/* 05 — How engagements work */}
      <EngagementModels />

      {/* 06 — Team structure */}
      <TeamStructure />

      {/* 07 — Final CTA */}
      <ServicesCTA />
    </div>
  );
}