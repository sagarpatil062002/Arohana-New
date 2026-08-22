import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tourin | Experiential Ladakh Travel & Journeys",
  description:
    "Tourin creates thoughtful, experiential journeys beginning with Ladakh — for travellers who want to experience a place beyond the usual itinerary.",
  alternates: { canonical: "/tourin" },
  openGraph: {
    title: "Tourin | Experiential Ladakh Travel & Journeys",
    description:
      "Tourin creates thoughtful, experiential journeys beginning with Ladakh — for travellers who want to experience a place beyond the usual itinerary.",
    url: "https://byarohana.com/tourin",
  },
};

export default function TourinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
