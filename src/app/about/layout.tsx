import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Studio — Ārohana | The Arohana Story',
  description:
    'The Arohana story — from hospitality roots to strategy, creativity and execution. Meet the founder and the team behind possibilities.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
