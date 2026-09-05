import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Ārohana Consultancy',
  description:
    'Start a conversation about your brand, business or project. Tell us what you\'re trying to build, fix or change.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
