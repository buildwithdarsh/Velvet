'use client';

import { useRef } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { cn } from '@/lib/utils';
import { StarIcon } from '@/components/ui/Icons';
import { HairBackground } from '@/components/ui/HairBackground';
import type { ReviewWithUser } from '@/lib/data';

interface TestimonialsProps {
  reviews: ReviewWithUser[];
}

export function Testimonials({ reviews }: TestimonialsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [headingRef, headingVisible] = useReveal();

  if (reviews.length === 0) return null;

  return (
    <section className="relative py-20 md:py-32 px-5 bg-[var(--c-white-dim)] overflow-hidden">
      <HairBackground variant="light" density="sparse" />
      <div className="relative max-w-7xl mx-auto">
        <div ref={headingRef} className={cn('reveal text-center mb-14', headingVisible && 'visible')}>
          <p className="text-[var(--c-gold)] text-[11px] font-semibold tracking-[0.3em] uppercase mb-4">Testimonials</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-[var(--c-black)]">What Our Clients Say</h2>
          <div className="section-divider mx-auto mt-5" />
        </div>

        <div ref={scrollRef} className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory -mx-5 px-5 md:mx-0 md:px-0 md:overflow-visible">
          {reviews.map((r, i) => (
            <ReviewCard key={r.id} review={r} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review, index }: { review: ReviewWithUser; index: number }) {
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      className={cn('reveal flex-shrink-0 w-[85vw] md:w-auto snap-center bg-white rounded-xl p-6 md:p-8 border border-black/5', visible && 'visible')}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} size={14} filled={i < review.rating} className={i < review.rating ? 'text-[var(--c-gold)]' : 'text-gray-200'} />
        ))}
      </div>
      {review.title && <p className="font-semibold text-sm text-[var(--c-black)] mb-2">{review.title}</p>}
      <p className="text-sm md:text-[15px] text-[var(--c-black)] leading-relaxed mb-6">
        &ldquo;{review.body}&rdquo;
      </p>
      <div className="border-t border-black/5 pt-4">
        <p className="font-semibold text-sm text-[var(--c-black)]">{review.endUser?.name || 'Anonymous'}</p>
      </div>
    </div>
  );
}
