import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Work | Ārohana Consultancy',
  description:
    'Selected work across hospitality, real estate, healthcare, consumer brands, entertainment, travel and complex institutional projects.',
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
