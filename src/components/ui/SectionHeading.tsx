'use client';

import { useReveal } from '@/hooks/useReveal';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export function SectionHeading({ label, title, subtitle, centered = true, light = false }: SectionHeadingProps) {
  const [ref, visible] = useReveal();

  return (
    <div ref={ref} className={cn('reveal mb-12 md:mb-16', centered && 'text-center', visible && 'visible')}>
      {label && (
        <p className="text-[var(--c-gold)] text-[11px] font-semibold tracking-[0.3em] uppercase mb-4">{label}</p>
      )}
      <h2
        className={cn(
          'font-heading text-3xl md:text-5xl font-bold',
          light ? 'text-white' : 'text-[var(--c-black)]'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn('mt-4 text-base md:text-lg max-w-2xl leading-relaxed', centered && 'mx-auto', light ? 'text-white/50' : 'text-[var(--c-white-muted)]')}>
          {subtitle}
        </p>
      )}
      <div className={cn('section-divider mt-5', centered && 'mx-auto')} />
    </div>
  );
}
