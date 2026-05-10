import type { Metadata } from 'next';
import { GalleryContent } from './GalleryContent';
import { HairBackground } from '@/components/ui/HairBackground';
import { getGalleryPosts } from '@/lib/data';
import { SITE_URL, OG_IMAGE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Browse our stunning portfolio of hair styling, makeup, skin treatments, and salon interiors. See the Glamour Waves difference in Gwalior.',
  alternates: { canonical: '/gallery' },
  openGraph: {
    title: 'Gallery | Glamour Waves Salon',
    description:
      'Portfolio of hair styling, makeup, skin treatments, and salon interiors at Glamour Waves, Gwalior.',
    url: `${SITE_URL}/gallery`,
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630, alt: 'Glamour Waves salon gallery' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gallery | Glamour Waves Salon',
    description:
      'Portfolio of hair styling, makeup, skin treatments, and salon interiors at Glamour Waves, Gwalior.',
    images: [OG_IMAGE_URL],
  },
};

export default async function GalleryPage() {
  const posts = await getGalleryPosts();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Gallery', item: `${SITE_URL}/gallery` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[var(--c-black)] overflow-hidden">
        <HairBackground variant="dark" density="normal" />
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--c-gold)]/5 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-5 text-center">
          <p className="text-[var(--c-gold)] text-[11px] font-semibold tracking-[0.3em] uppercase mb-5">Portfolio</p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white">Glamour Waves Gallery</h1>
          <p className="text-white/40 text-base md:text-lg mt-5 max-w-xl mx-auto">
            A glimpse into the transformations we create every day.
          </p>
        </div>
      </section>
      <GalleryContent posts={posts} />
    </>
  );
}
