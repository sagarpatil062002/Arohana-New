import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Ārohana | Madhura Hawal, Founder',
  description:
    'Meet Madhura Hawal, founder of Ārohana Consultancy. From hospitality and entrepreneurship to brand strategy, digital growth and complex on-ground projects.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
