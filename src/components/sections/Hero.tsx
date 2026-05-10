'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronDownIcon } from '@/components/ui/Icons';
import { HairBackground } from '@/components/ui/HairBackground';
import { configVal } from '@/lib/data';
import type { OrgConfig } from '@/lib/data';

interface HeroProps {
  config: OrgConfig;
}

export function Hero({ config }: HeroProps) {
  const name = configVal(config, 'branding', 'name', 'Glamour Waves');
  const tagline = configVal(config, 'branding', 'tagline', 'Unisex Salon');
  const city = configVal(config, 'contact', 'city', '');

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-[var(--c-black)]">
      <Image
        src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=80&auto=format"
        alt={`${name} salon — hair and beauty services in ${city || 'Gwalior'}`}
        fill
        priority
        className="object-cover opacity-40"
        sizes="100vw"
      />
      <HairBackground variant="dark" density="dense" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />

      <div className="relative z-10 max-w-4xl mx-auto px-5 text-center">
        <div className="animate-fade-in-up">
          <p className="text-[var(--c-gold)] text-[11px] md:text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            {city ? `${city}'s Premier ` : ''}Unisex Salon
          </p>
        </div>

        <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tight animate-fade-in-up delay-100">
          {name.split(' ').map((word, i) => (
            <span key={i}>
              {i > 0 && <br />}
              <span className={i > 0 ? 'gold-text' : ''}>{word}</span>
            </span>
          ))}
        </h1>

        <p className="text-white/50 text-base md:text-lg mt-6 mb-10 max-w-md mx-auto leading-relaxed animate-fade-in-up delay-200">
          {tagline}. Premium hair, skin &amp; beauty services crafted for you.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
          <Link
            href="/book"
            className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 text-[13px] font-semibold tracking-widest uppercase bg-[var(--c-gold)] text-[var(--c-black)] hover:bg-[var(--c-gold-light)] transition-colors"
          >
            Book Appointment
          </Link>
          <Link
            href="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 text-[13px] font-semibold tracking-widest uppercase border border-white/25 text-white hover:bg-white/10 transition-colors"
          >
            Explore Services
          </Link>
        </div>
      </div>

      <button
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 hover:text-white/60 transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDownIcon size={28} />
      </button>
    </section>
  );
}
