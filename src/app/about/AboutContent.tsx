'use client';

import Image from 'next/image';
import { useReveal } from '@/hooks/useReveal';
import { cn } from '@/lib/utils';
// About page image — from Unsplash (will be replaced when salon provides photos)
const ABOUT_IMAGE = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=80&auto=format';

const values = [
  { title: 'Precision & Quality', desc: 'Every service is delivered with meticulous attention to detail using premium products.' },
  { title: 'Hygiene First', desc: 'Sterilized tools, fresh towels, and a spotlessly clean salon for every single customer.' },
  { title: 'Customer Happiness', desc: "Your satisfaction is our priority. We don't stop until you love what you see." },
  { title: 'Continuous Learning', desc: 'Our team regularly trains in the latest techniques and trends from the beauty industry.' },
];

const milestones = [
  { year: '2014', text: 'Founded Glamour Waves with a vision to bring world-class salon services to Gwalior' },
  { year: '2016', text: 'Expanded to a full unisex salon with dedicated sections for men and women' },
  { year: '2019', text: 'Became one of the highly rated salons on Google Maps in Gwalior' },
  { year: '2022', text: 'Introduced advanced treatments: keratin, airbrush makeup, and hair rebonding' },
  { year: '2024', text: 'Served 5,000+ happy customers and counting' },
];

export function AboutContent() {
  const [storyRef, storyVisible] = useReveal({ threshold: 0.1 });
  const [valuesRef, valuesVisible] = useReveal({ threshold: 0.1 });

  return (
    <>
      {/* Story */}
      <section ref={storyRef} className="py-20 md:py-32 px-5 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className={cn('reveal-left', storyVisible && 'visible')}>
            <div className="aspect-[4/5] relative rounded-xl overflow-hidden">
              <Image src={ABOUT_IMAGE} alt="Glamour Waves salon interior showing styling stations and warm lighting" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          </div>
          <div className={cn('reveal-right', storyVisible && 'visible')}>
            <p className="text-[var(--c-gold)] text-[11px] font-semibold tracking-[0.3em] uppercase mb-4">Our Story</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--c-black)] mb-6">Where Style Meets Elegance</h2>
            <div className="space-y-4 text-[var(--c-white-muted)] text-[15px] leading-relaxed">
              <p>Glamour Waves was born from a simple dream — to give every person in Gwalior access to premium salon services without the premium price tag.</p>
              <p>Our team of trained stylists and beauty professionals bring years of experience and a genuine passion for their craft. Whether it&apos;s a simple haircut or a complete bridal transformation, we treat every service with the same dedication.</p>
              <p>We believe beauty is for everyone. That&apos;s why we operate as a unisex salon — a welcoming space where men, women, and families can experience professional grooming under one roof.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={valuesRef} className="py-20 md:py-32 px-5 bg-[var(--c-white-dim)]">
        <div className="max-w-5xl mx-auto">
          <div className={cn('reveal text-center mb-14', valuesVisible && 'visible')}>
            <p className="text-[var(--c-gold)] text-[11px] font-semibold tracking-[0.3em] uppercase mb-4">Our Values</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--c-black)]">What Sets Us Apart</h2>
            <div className="section-divider mx-auto mt-5" />
          </div>
          <div className={cn('stagger-children grid grid-cols-1 sm:grid-cols-2 gap-5', valuesVisible && 'visible')}>
            {values.map((v) => (
              <div key={v.title} className="p-6 md:p-8 bg-white rounded-xl border border-black/5">
                <h3 className="font-heading text-lg font-bold text-[var(--c-black)] mb-2">{v.title}</h3>
                <p className="text-sm text-[var(--c-white-muted)] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-32 px-5 bg-white">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="text-[var(--c-gold)] text-[11px] font-semibold tracking-[0.3em] uppercase mb-4">Milestones</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--c-black)]">Our Journey</h2>
          <div className="section-divider mx-auto mt-5" />
        </div>
        <div className="max-w-2xl mx-auto space-y-0">
          {milestones.map((m, i) => (
            <MilestoneItem key={m.year} milestone={m} index={i} isLast={i === milestones.length - 1} />
          ))}
        </div>
      </section>
    </>
  );
}

function MilestoneItem({ milestone, index, isLast }: { milestone: { year: string; text: string }; index: number; isLast: boolean }) {
  const [ref, visible] = useReveal({ threshold: 0.3 });

  return (
    <div ref={ref} className={cn('reveal flex gap-6', visible && 'visible')} style={{ transitionDelay: `${index * 100}ms` }}>
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-[var(--c-gold)] ring-4 ring-[var(--c-gold-glow)]" />
        {!isLast && <div className="w-px flex-1 bg-black/8 my-1" />}
      </div>
      <div className="pb-10">
        <span className="text-[var(--c-gold)] text-sm font-bold">{milestone.year}</span>
        <p className="text-[var(--c-white-muted)] text-sm mt-1 leading-relaxed">{milestone.text}</p>
      </div>
    </div>
  );
}
