'use client';

import Link from 'next/link';
import { useReveal } from '@/hooks/useReveal';
import { cn, getWhatsAppBookingLink } from '@/lib/utils';
import { WhatsAppIcon } from '@/components/ui/Icons';
import { HairBackground } from '@/components/ui/HairBackground';

interface CTABannerProps {
  whatsapp?: string;
}

export function CTABanner({ whatsapp }: CTABannerProps) {
  const [ref, visible] = useReveal();

  return (
    <section ref={ref} className="relative py-20 md:py-28 bg-[var(--c-black)] overflow-hidden">
      <HairBackground variant="dark" density="normal" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--c-gold)]/30 to-transparent" />

      <div className={cn('reveal relative max-w-3xl mx-auto px-5 text-center', visible && 'visible')}>
        <p className="text-[var(--c-gold)] text-[11px] font-semibold tracking-[0.3em] uppercase mb-5">Ready?</p>
        <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
          Your transformation
          <br />
          <span className="gold-text">starts here.</span>
        </h2>
        <p className="text-white/40 text-base md:text-lg mt-5 mb-10 max-w-lg mx-auto leading-relaxed">
          Book your appointment today and let our experts craft your perfect look.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/book" className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 text-[13px] font-semibold tracking-widest uppercase bg-[var(--c-gold)] text-[var(--c-black)] hover:bg-[var(--c-gold-light)] transition-colors">
            Book Online
          </Link>
          {whatsapp && (
            <a href={getWhatsAppBookingLink(whatsapp)} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 text-[13px] font-semibold tracking-widest uppercase border border-white/15 text-white hover:bg-white/5 transition-colors">
              <WhatsAppIcon size={16} /> WhatsApp
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
