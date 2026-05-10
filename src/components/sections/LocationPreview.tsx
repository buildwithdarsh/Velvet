'use client';

import { useReveal } from '@/hooks/useReveal';
import { cn } from '@/lib/utils';
import { MapPinIcon, PhoneIcon, MailIcon, ClockIcon } from '@/components/ui/Icons';
import Link from 'next/link';

interface LocationPreviewProps {
  address: string;
  phone: string;
  email: string;
  googleMapsEmbed: string;
  hours: { day: string; hours: string }[];
}

export function LocationPreview({ address, phone, email, googleMapsEmbed, hours }: LocationPreviewProps) {
  const [ref, visible] = useReveal({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-20 md:py-32 px-5 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className={cn('reveal-left', visible && 'visible')}>
            <p className="text-[var(--c-gold)] text-[11px] font-semibold tracking-[0.3em] uppercase mb-4">Find Us</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--c-black)] mb-8">Visit Our Salon</h2>
            <div className="space-y-5 mb-8">
              {address && (
                <div className="flex items-start gap-4">
                  <MapPinIcon size={18} className="text-[var(--c-gold)] mt-0.5 shrink-0" />
                  <p className="text-[var(--c-white-muted)] text-sm leading-relaxed">{address}</p>
                </div>
              )}
              {phone && (
                <div className="flex items-center gap-4">
                  <PhoneIcon size={18} className="text-[var(--c-gold)] shrink-0" />
                  <a href={`tel:${phone}`} className="text-[var(--c-white-muted)] text-sm hover:text-[var(--c-black)] transition-colors">{phone}</a>
                </div>
              )}
              {email && (
                <div className="flex items-center gap-4">
                  <MailIcon size={18} className="text-[var(--c-gold)] shrink-0" />
                  <a href={`mailto:${email}`} className="text-[var(--c-white-muted)] text-sm hover:text-[var(--c-black)] transition-colors">{email}</a>
                </div>
              )}
            </div>
            {hours.length > 0 && (
              <div className="bg-[var(--c-white-dim)] rounded-xl p-5 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <ClockIcon size={16} className="text-[var(--c-gold)]" />
                  <h4 className="text-[11px] font-semibold tracking-widest uppercase text-[var(--c-black)]">Business Hours</h4>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {hours.slice(0, 4).map((h) => (
                    <div key={h.day} className="flex justify-between text-[var(--c-white-muted)]">
                      <span>{h.day.slice(0, 3)}</span>
                      <span className="text-xs">{h.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <Link href="/contact" className="text-[var(--c-black)] text-sm font-medium hover:text-[var(--c-gold)] transition-colors">
              See full contact details &rarr;
            </Link>
          </div>
          <div className={cn('reveal-right aspect-square md:aspect-[4/3] rounded-xl overflow-hidden border border-black/5', visible && 'visible')}>
            {googleMapsEmbed ? (
              <iframe src={googleMapsEmbed} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Salon Location" />
            ) : (
              <div className="w-full h-full bg-[var(--c-white-dim)] flex items-center justify-center text-[var(--c-white-muted)]">Map coming soon</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
