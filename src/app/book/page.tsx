import type { Metadata } from 'next';
import { BookingForm } from './BookingForm';
import { HairBackground } from '@/components/ui/HairBackground';
import { SITE_URL, OG_IMAGE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Book Appointment',
  description:
    'Book your salon appointment online at Glamour Waves, Gwalior. Quick and easy booking for hair, skin, makeup, and grooming services.',
  alternates: { canonical: '/book' },
  openGraph: {
    title: 'Book an Appointment | Glamour Waves Salon',
    description:
      'Book your salon appointment online at Glamour Waves, Gwalior. Quick and easy booking.',
    url: `${SITE_URL}/book`,
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630, alt: 'Book an appointment at Glamour Waves' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book an Appointment | Glamour Waves Salon',
    description:
      'Book your salon appointment online at Glamour Waves, Gwalior. Quick and easy booking.',
    images: [OG_IMAGE_URL],
  },
};

export default function BookPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Book Appointment', item: `${SITE_URL}/book` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-[var(--c-black)] overflow-hidden">
        <HairBackground variant="dark" density="normal" />
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--c-gold)]/5 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-5 text-center">
          <p className="text-[var(--c-gold)] text-[11px] font-semibold tracking-[0.3em] uppercase mb-5">Appointment</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white">Book at Glamour Waves</h1>
          <p className="text-white/40 text-base mt-4 max-w-md mx-auto">
            Fill the form below and we&apos;ll confirm your booking via WhatsApp or call.
          </p>
        </div>
      </section>
      <BookingForm />
    </>
  );
}
