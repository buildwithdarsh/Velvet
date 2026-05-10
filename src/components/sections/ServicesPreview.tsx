'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { CatalogCategory, CatalogItem } from '@/types';
import { useReveal } from '@/hooks/useReveal';
import { cn } from '@/lib/utils';
import { SERVICE_ICONS, ArrowRightIcon } from '@/components/ui/Icons';
import { HairBackground } from '@/components/ui/HairBackground';

// Fallback images for service categories (Unsplash)
const CATEGORY_IMAGES: Record<string, string> = {
  hair: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&q=80&auto=format',
  skin: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80&auto=format',
  makeup: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=600&q=80&auto=format',
  mens: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80&auto=format',
  packages: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&q=80&auto=format',
};

interface ServicesPreviewProps {
  categories: CatalogCategory[];
  services: CatalogItem[];
}

export function ServicesPreview({ categories }: ServicesPreviewProps) {
  const [headingRef, headingVisible] = useReveal();
  const [gridRef, gridVisible] = useReveal({ threshold: 0.05 });

  return (
    <section className="relative py-20 md:py-32 px-5 bg-white overflow-hidden">
      <HairBackground variant="light" density="sparse" />
      <div className="relative max-w-7xl mx-auto">
        <div ref={headingRef} className={cn('reveal text-center mb-16 md:mb-20', headingVisible && 'visible')}>
          <p className="text-[var(--c-gold)] text-[11px] font-semibold tracking-[0.3em] uppercase mb-4">What We Offer</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-[var(--c-black)]">Our Services</h2>
          <div className="section-divider mx-auto mt-5" />
        </div>

        <div ref={gridRef} className={cn('stagger-children grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5', gridVisible && 'visible')}>
          {categories.map((cat) => {
            const IconComponent = SERVICE_ICONS[cat.slug] || SERVICE_ICONS.hair;
            const bgImage = cat.imageUrl || CATEGORY_IMAGES[cat.slug] || CATEGORY_IMAGES.hair;
            return (
              <Link
                key={cat.id}
                href={`/services#${cat.slug}`}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-[var(--c-black)]"
              >
                <Image src={bgImage} alt={`${cat.name} services at Glamour Waves salon`} fill className="object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700" sizes="(max-width: 768px) 50vw, 20vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                  <div className="text-[var(--c-gold)] mb-2"><IconComponent size={22} /></div>
                  <h3 className="font-heading text-sm md:text-base font-semibold text-white leading-tight">{cat.name}</h3>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/services" className="inline-flex items-center gap-2 text-[var(--c-black)] text-sm font-medium hover:text-[var(--c-gold)] transition-colors group">
            View All Services & Pricing
            <ArrowRightIcon size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
