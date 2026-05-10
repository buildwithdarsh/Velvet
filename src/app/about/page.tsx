import type { Metadata } from 'next';
import { CTABanner } from '@/components/sections/CTABanner';
import { AboutContent } from './AboutContent';
import { HairBackground } from '@/components/ui/HairBackground';
import { SITE_URL, OG_IMAGE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Glamour Waves — a trusted unisex salon in Gwalior. Our story, our team, and our commitment to making you look and feel your best.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Us | Glamour Waves Salon',
    description:
      'The story behind Glamour Waves — Gwalior\'s trusted unisex salon for hair, skin, and beauty.',
    url: `${SITE_URL}/about`,
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630, alt: 'About Glamour Waves salon' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Glamour Waves Salon',
    description:
      'The story behind Glamour Waves — Gwalior\'s trusted unisex salon for hair, skin, and beauty.',
    images: [OG_IMAGE_URL],
  },
};

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'About Us', item: `${SITE_URL}/about` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[var(--c-black)] overflow-hidden">
        <HairBackground variant="dark" density="normal" />
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--c-gold)]/5 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-5 text-center">
          <p className="text-[var(--c-gold)] text-[11px] font-semibold tracking-[0.3em] uppercase mb-5">About Us</p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white">About Glamour Waves</h1>
          <p className="text-white/40 text-base md:text-lg mt-5 max-w-xl mx-auto leading-relaxed">
            From a small salon to Gwalior&apos;s trusted beauty destination.
          </p>
        </div>
      </section>
      <AboutContent />
      <CTABanner />
    </>
  );
}
