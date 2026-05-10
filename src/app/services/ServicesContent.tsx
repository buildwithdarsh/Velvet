'use client';

import { useState } from 'react';
import type { CatalogCategory, CatalogItem } from '@/types';
import { useReveal } from '@/hooks/useReveal';
import { SERVICE_ICONS } from '@/components/ui/Icons';
import { formatPrice, cn } from '@/lib/utils';
import { BookingCTA } from '@/components/ui/BookingCTA';

type GenderFilter = 'all' | 'women' | 'men';

interface ServicesContentProps {
  categories: CatalogCategory[];
  services: CatalogItem[];
}

export function ServicesContent({ categories, services }: ServicesContentProps) {
  const [genderFilter, setGenderFilter] = useState<GenderFilter>('all');

  return (
    <section className="py-14 md:py-24 px-5 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-12 sticky top-16 md:top-20 z-20 bg-white/95 backdrop-blur-sm py-4 -mx-5 px-5">
          {(['all', 'women', 'men'] as GenderFilter[]).map((g) => (
            <button key={g} onClick={() => setGenderFilter(g)} className={cn('px-6 py-2.5 text-[12px] font-semibold tracking-wider uppercase transition-all', genderFilter === g ? 'bg-[var(--c-black)] text-white' : 'bg-transparent text-[var(--c-white-muted)] border border-black/10 hover:border-black/20')}>
              {g === 'all' ? 'All' : g === 'women' ? 'Women' : 'Men'}
            </button>
          ))}
        </div>
        <div className="space-y-16">
          {categories.map((cat) => {
            const catServices = services.filter((s) => s.categoryId === cat.id);
            return <CategorySection key={cat.id} category={cat} services={catServices} genderFilter={genderFilter} />;
          })}
        </div>
      </div>
    </section>
  );
}

function CategorySection({ category, services, genderFilter }: { category: CatalogCategory; services: CatalogItem[]; genderFilter: GenderFilter }) {
  const [ref, visible] = useReveal({ threshold: 0.05 });
  const IconComponent = SERVICE_ICONS[category.slug] || SERVICE_ICONS.hair;

  const filtered = services.filter((s) => {
    const gender = (s.metadata as Record<string, string> | null)?.gender;
    if (genderFilter === 'all') return true;
    return gender === genderFilter || gender === 'unisex';
  });

  if (filtered.length === 0) return null;

  return (
    <div ref={ref} id={category.slug} className={cn('reveal scroll-mt-32', visible && 'visible')}>
      <div className="flex items-center gap-3 mb-6">
        <IconComponent size={24} className="text-[var(--c-gold)]" />
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-[var(--c-black)]">{category.name}</h2>
      </div>
      <div className="border border-black/5 rounded-xl overflow-hidden">
        {filtered.map((item, i) => {
          const variant = item.variants?.[0];
          const gender = (item.metadata as Record<string, string> | null)?.gender;
          const duration = (item.metadata as Record<string, string> | null)?.duration;
          return (
            <div key={item.id} className={cn('flex items-center justify-between px-5 py-4 md:px-6 hover:bg-[var(--c-white-dim)] transition-colors', i !== filtered.length - 1 && 'border-b border-black/5')}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-[var(--c-black)] text-sm md:text-[15px]">{variant?.name || item.slug}</h3>
                  {gender && gender !== 'unisex' && (
                    <span className={cn('text-[10px] px-1.5 py-0.5 font-medium tracking-wide uppercase', gender === 'women' ? 'bg-pink-50 text-pink-500' : 'bg-blue-50 text-blue-500')}>
                      {gender === 'women' ? 'W' : 'M'}
                    </span>
                  )}
                </div>
                {duration && <p className="text-xs text-[var(--c-white-muted)] mt-0.5">{duration}</p>}
              </div>
              <span className="font-heading font-bold text-[var(--c-black)] text-sm md:text-base shrink-0 ml-4">
                {variant ? formatPrice(Number(variant.price)) : ''}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-4 text-right">
        <BookingCTA variant="outline" size="sm">Book {category.name}</BookingCTA>
      </div>
    </div>
  );
}
