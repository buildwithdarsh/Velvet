import { Hero } from '@/components/sections/Hero';
import { ServicesPreview } from '@/components/sections/ServicesPreview';
import { Testimonials } from '@/components/sections/Testimonials';
import { CTABanner } from '@/components/sections/CTABanner';
import { LocationPreview } from '@/components/sections/LocationPreview';
import { WaveDivider } from '@/components/ui/WaveDivider';
import { getOrgConfig, getCategories, getServices, getReviews, configVal } from '@/lib/data';
import type { OrgConfig } from '@/lib/data';
import { SITE_URL } from '@/lib/constants';

export default async function HomePage() {
  const [config, categories, services, reviews] = await Promise.all([
    getOrgConfig(),
    getCategories(),
    getServices(),
    getReviews(),
  ]);

  const name = configVal(config, 'branding', 'name', 'Glamour Waves');
  const phone = configVal(config, 'contact', 'whatsapp', '');
  const salonPhone = configVal(config, 'contact', 'phone', '');
  const address = configVal(config, 'contact', 'address', '');
  const email = configVal(config, 'contact', 'email', '');
  const city = configVal(config, 'contact', 'city', 'Gwalior');
  const googleMapsEmbed = configVal(config, 'contact', 'google_maps_embed', '');
  const instagram = configVal(config, 'contact', 'instagram', '');
  const facebook = configVal(config, 'contact', 'facebook', '');
  const hours = buildHours(config);

  const reviewCount = reviews.length;
  const avgRating =
    reviewCount > 0
      ? Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount) * 10) / 10
      : 0;

  const sameAs = [instagram, facebook].filter(Boolean);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: 'Glamour Waves Salon',
        url: SITE_URL,
      },
      {
        '@type': 'Organization',
        name,
        url: SITE_URL,
        ...(sameAs.length > 0 ? { sameAs } : {}),
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${SITE_URL}/#business`,
        name,
        description: 'Unisex salon offering hair, skin, makeup, and grooming services in Gwalior.',
        url: SITE_URL,
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
          .map((h) => ({
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: h.day,
            opens: to24h(parseOpenClose(h.hours).opens),
            closes: to24h(parseOpenClose(h.hours).closes),
          })),
        ...(reviewCount > 0 ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: avgRating,
            reviewCount,
            bestRating: 5,
            worstRating: 1,
          },
        } : {}),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero config={config} />
      <WaveDivider variant="dark-to-white" />
      <ServicesPreview categories={categories} services={services} />
      <WaveDivider variant="white-to-gray" />
      <Testimonials reviews={reviews} />
      <WaveDivider variant="gray-to-white" />
      <WaveDivider variant="white-to-dark-cta" />
      <CTABanner whatsapp={phone} />
      <WaveDivider variant="dark-cta-to-white" />
      <LocationPreview
        address={address}
        phone={salonPhone}
        email={email}
        googleMapsEmbed={googleMapsEmbed}
        hours={hours}
      />
    </>
  );
}

function buildHours(config: OrgConfig): { day: string; hours: string }[] {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  return days.map((d, i) => ({
    day: labels[i],
    hours: configVal(config, 'hours', d, 'Closed'),
  }));
}

function parseOpenClose(hoursStr: string): { opens: string; closes: string } {
  const parts = hoursStr.split(/\s*[–\-]\s*/);
  if (parts.length === 2) {
    return { opens: parts[0].trim(), closes: parts[1].trim() };
  }
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
