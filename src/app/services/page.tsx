import type { Metadata } from 'next';
import { CTABanner } from '@/components/sections/CTABanner';
import { ServicesContent } from './ServicesContent';
import { HairBackground } from '@/components/ui/HairBackground';
import { getCategories, getServices, getOrgConfig, configVal } from '@/lib/data';
import { SITE_URL, OG_IMAGE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Services & Pricing',
  description:
    'Explore our full range of hair, skin, makeup, and grooming services with transparent pricing. Glamour Waves — professional unisex salon in Gwalior.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Services & Pricing | Glamour Waves Salon',
    description:
      'Full menu of hair, skin, makeup, and grooming services with transparent pricing at Glamour Waves, Gwalior.',
    url: `${SITE_URL}/services`,
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630, alt: 'Glamour Waves salon services' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services & Pricing | Glamour Waves Salon',
    description:
      'Full menu of hair, skin, makeup, and grooming services with transparent pricing at Glamour Waves, Gwalior.',
    images: [OG_IMAGE_URL],
  },
};

export default async function ServicesPage() {
  const [categories, services, config] = await Promise.all([
    getCategories(),
    getServices(),
    getOrgConfig(),
  ]);

  const whatsapp = configVal(config, 'contact', 'whatsapp', '');

  const serviceItems = categories.flatMap((cat) => {
    const catServices = services.filter((s) => s.categoryId === cat.id);
    return catServices.map((s) => {
      const variant = s.variants?.[0];
      return {
        '@type': 'Service' as const,
        name: variant?.name || s.slug,
        category: cat.name,
        provider: { '@type': 'LocalBusiness' as const, name: 'Glamour Waves' },
        ...(variant?.price && {
          offers: {
            '@type': 'Offer' as const,
            price: Number(variant.price),
            priceCurrency: 'INR',
          },
        }),
      };
    });
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Services & Pricing', item: `${SITE_URL}/services` },
        ],
      },
      ...serviceItems,
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[var(--c-black)] overflow-hidden">
        <HairBackground variant="dark" density="normal" />
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--c-gold)]/5 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-5 text-center">
          <p className="text-[var(--c-gold)] text-[11px] font-semibold tracking-[0.3em] uppercase mb-5">Our Menu</p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white">Services & Pricing</h1>
          <p className="text-white/40 text-base md:text-lg mt-5 max-w-xl mx-auto">
            Premium beauty services at honest prices.
          </p>
        </div>
      </section>
      <ServicesContent categories={categories} services={services} />
      <CTABanner whatsapp={whatsapp} />
    </>
  );
}
