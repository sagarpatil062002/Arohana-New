import type { Metadata } from "next";
import WorkClient from "@/components/WorkClient";

export const metadata: Metadata = {
  title: "Our Work | Ārohana Consultancy",
  description: "Selected work across hospitality, real estate, healthcare, consumer brands, entertainment, travel and complex institutional projects.",
  openGraph: {
    title: "Our Work | Ārohana Consultancy",
    description: "Selected work across hospitality, real estate, healthcare, consumer brands, entertainment, travel and complex institutional projects.",
    images: [{ url: "/assets/raysons.jpg" }],
  },
};

export default function WorkPage() {
  return <WorkClient />;
}
