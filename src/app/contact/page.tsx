import type { Metadata } from 'next';
import { ContactContent } from './ContactContent';
import { HairBackground } from '@/components/ui/HairBackground';
import { getOrgConfig, configVal } from '@/lib/data';
import { SITE_URL, OG_IMAGE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Glamour Waves salon in Gwalior. Find our address, phone number, business hours, and reach out easily.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Us | Glamour Waves Salon',
    description:
      'Find the address, phone number, and business hours for Glamour Waves salon in Gwalior.',
    url: `${SITE_URL}/contact`,
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630, alt: 'Contact Glamour Waves salon' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Glamour Waves Salon',
    description:
      'Find the address, phone number, and business hours for Glamour Waves salon in Gwalior.',
    images: [OG_IMAGE_URL],
  },
};

export default async function ContactPage() {
  const config = await getOrgConfig();

  const salonPhone = configVal(config, 'contact', 'phone', '');
  const email = configVal(config, 'contact', 'email', '');
  const address = configVal(config, 'contact', 'address', '');
  const city = configVal(config, 'contact', 'city', 'Gwalior');

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;
  const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const hours = days.map((d, i) => ({ day: labels[i], hours: configVal(config, 'hours', d, 'Closed') }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': `${SITE_URL}/#business`,
        name: 'Glamour Waves',
        ...(salonPhone ? { telephone: salonPhone } : {}),
        ...(email ? { email } : {}),
        ...(address ? {
          address: {
            '@type': 'PostalAddress',
            streetAddress: address,
            addressLocality: city,
            addressCountry: 'IN',
          },
        } : {}),
        openingHoursSpecification: hours
          .filter((h) => h.hours !== 'Closed')
          .map((h) => {
            const parsed = parseOpenClose(h.hours);
            return {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: h.day,
              opens: to24h(parsed.opens),
              closes: to24h(parsed.closes),
            };
          }),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Contact Us', item: `${SITE_URL}/contact` },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-[var(--c-black)] overflow-hidden">
        <HairBackground variant="dark" density="normal" />
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--c-gold)]/5 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-5 text-center">
          <p className="text-[var(--c-gold)] text-[11px] font-semibold tracking-[0.3em] uppercase mb-5">Reach Out</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white">Contact Glamour Waves</h1>
          <p className="text-white/40 text-base mt-4 max-w-md mx-auto">
            Have a question? We&apos;d love to hear from you.
          </p>
        </div>
      </section>
      <ContactContent config={config} />
    </>
  );
}

function parseOpenClose(hoursStr: string): { opens: string; closes: string } {
  const parts = hoursStr.split(/\s*[–\-]\s*/);
  if (parts.length === 2) return { opens: parts[0].trim(), closes: parts[1].trim() };
  return { opens: '09:00', closes: '21:00' };
}

function to24h(time: string): string {
  const match = time.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
  if (!match) return time.trim();
  let h = parseInt(match[1]);
  const m = match[2];
  const ampm = match[3]?.toUpperCase();
  if (ampm === 'PM' && h < 12) h += 12;
  if (ampm === 'AM' && h === 12) h = 0;
  return `${h.toString().padStart(2, '0')}:${m}`;
}
