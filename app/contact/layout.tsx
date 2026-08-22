import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Ārohana Consultancy",
  description:
    "Get in touch with Ārohana Consultancy for brand strategy, hospitality consulting, content production and experiential projects.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | Ārohana Consultancy",
    description:
      "For prospective clients, partners and collaborators — if you're building something serious, let's talk about what it actually needs.",
    url: "https://byarohana.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
