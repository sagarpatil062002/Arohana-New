import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services | Ārohana Consultancy',
  description:
    'Digital brand growth, content production and hospitality consulting for businesses across India and selected international markets.',
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
