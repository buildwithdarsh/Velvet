import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { InitialLoader } from '@/components/ui/InitialLoader';
import { getOrgConfig } from '@/lib/data';
import { SITE_URL, OG_IMAGE_URL } from '@/lib/constants';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Glamour Waves — Best Unisex Salon in Gwalior',
    template: '%s | Glamour Waves Salon',
  },
  description:
    'Glamour Waves is a trusted unisex salon in Gwalior offering haircuts, styling, facials, bridal makeup, grooming services, and more. Book your appointment today!',
  keywords: [
    'salon in Gwalior',
    'best salon Gwalior',
    'unisex salon Gwalior',
    'bridal makeup Gwalior',
    'hair salon Gwalior',
    'beauty parlour Gwalior',
    'men grooming Gwalior',
    'facial Gwalior',
    'hair spa Gwalior',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Glamour Waves — Hair, Skin & Beauty Services in Gwalior',
    description:
      'Trusted hair, skin, makeup, and grooming services for men and women. Visit Glamour Waves in Gwalior.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Glamour Waves Salon',
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'Glamour Waves — Unisex Salon in Gwalior',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Glamour Waves — Hair, Skin & Beauty Services in Gwalior',
    description:
      'Trusted hair, skin, makeup, and grooming services for men and women. Visit Glamour Waves in Gwalior.',
    images: [OG_IMAGE_URL],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const config = await getOrgConfig();

  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="min-h-screen flex flex-col">
        <InitialLoader />
        <Header />
        <main className="flex-1 pb-mobile-nav md:pb-0">{children}</main>
        <Footer config={config} />
        <MobileNav />
        <WhatsAppButton />
      </body>
    </html>
  );
}
