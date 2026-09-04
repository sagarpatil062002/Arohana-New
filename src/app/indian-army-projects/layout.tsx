import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Indian Army Projects | Ārohana Consultancy',
  description:
    'Selected Indian Army projects by Ārohana across communication, design, publications, storytelling, video production and community-focused initiatives.',
  alternates: {
    canonical: 'https://byarohana.com/indian-army-projects',
  },
  openGraph: {
    title: 'Indian Army Projects | Ārohana Consultancy',
    description:
      'Selected Indian Army projects by Ārohana across communication, design, publications, storytelling, video production and community-focused initiatives.',
    url: 'https://byarohana.com/indian-army-projects',
    images: [{ url: '/images/army/army-hero.jpg', width: 1200, height: 630, alt: 'Selected Indian Army Projects by Ārohana' }],
  },
};

export default function IndianArmyProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
