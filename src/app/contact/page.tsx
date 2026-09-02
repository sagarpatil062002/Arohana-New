import type { Metadata } from "next";
import ContactClient from "@/components/ContactClient";

export const metadata: Metadata = {
  title: "Contact | Ārohana Consultancy",
  description: "Start a conversation with Ārohana Consultancy. Let's talk about what your business actually needs.",
  openGraph: {
    title: "Contact | Ārohana Consultancy",
    description: "Start a conversation with Ārohana Consultancy. Let's talk about what your business actually needs.",
    images: [{ url: "/assets/founder_madhura.jpg" }],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
