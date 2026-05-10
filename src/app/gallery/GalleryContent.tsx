'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { ContentPost } from '@/types';
import { useReveal } from '@/hooks/useReveal';
import { cn } from '@/lib/utils';
import { XIcon, ExpandIcon } from '@/components/ui/Icons';

const FILTER_TABS = [
  { id: 'all', label: 'All' },
  { id: 'hair', label: 'Hair' },
  { id: 'makeup', label: 'Makeup' },
  { id: 'skin', label: 'Skin Care' },
  { id: 'salon', label: 'Our Salon' },
];

interface GalleryContentProps {
  posts: ContentPost[];
}

export function GalleryContent({ posts }: GalleryContentProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeCategory === 'all' ? posts : posts.filter((p) => p.category === activeCategory);

  return (
    <section className="py-14 md:py-24 px-5 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-2 flex-wrap mb-12 sticky top-16 md:top-20 z-20 bg-white/95 backdrop-blur-sm py-4">
          {FILTER_TABS.map((tab) => (
            <button key={tab.id} onClick={() => setActiveCategory(tab.id)} className={cn('px-5 py-2 text-[12px] font-semibold tracking-wider uppercase transition-all', activeCategory === tab.id ? 'bg-[var(--c-black)] text-white' : 'text-[var(--c-white-muted)] border border-black/10 hover:border-black/20')}>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {filtered.map((post, i) => (
            <GalleryItem key={post.id} post={post} index={i} onClick={() => setLightboxIndex(i)} />
          ))}
        </div>

        {filtered.length === 0 && <p className="text-center text-[var(--c-white-muted)] py-16">No images in this category yet.</p>}
      </div>

      {lightboxIndex !== null && (
        <Lightbox posts={filtered} currentIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} onPrev={() => setLightboxIndex(Math.max(0, lightboxIndex - 1))} onNext={() => setLightboxIndex(Math.min(filtered.length - 1, lightboxIndex + 1))} />
      )}
    </section>
  );
}

function GalleryItem({ post, index, onClick }: { post: ContentPost; index: number; onClick: () => void }) {
  const [ref, visible] = useReveal<HTMLButtonElement>();

  if (!post.imageUrl) return null;

  return (
    <button ref={ref} onClick={onClick} className={cn('reveal-scale group relative aspect-square rounded-lg overflow-hidden bg-[var(--c-black)]', visible && 'visible')} style={{ transitionDelay: `${index * 40}ms` }}>
      <Image src={post.imageUrl} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 50vw, 25vw" />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
        <ExpandIcon size={22} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </button>
  );
}

function Lightbox({ posts, currentIndex, onClose, onPrev, onNext }: { posts: ContentPost[]; currentIndex: number; onClose: () => void; onPrev: () => void; onNext: () => void }) {
  const current = posts[currentIndex];
  if (!current?.imageUrl) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center animate-fade-in">
      <button onClick={onClose} className="absolute top-5 right-5 text-white/60 hover:text-white p-2 z-10" aria-label="Close"><XIcon size={28} /></button>
      {currentIndex > 0 && <button onClick={onPrev} className="absolute left-3 md:left-8 text-white/40 hover:text-white p-2" aria-label="Previous"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M15 18l-6-6 6-6" /></svg></button>}
      {currentIndex < posts.length - 1 && <button onClick={onNext} className="absolute right-3 md:right-8 text-white/40 hover:text-white p-2" aria-label="Next"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M9 18l6-6-6-6" /></svg></button>}
      <div className="max-w-4xl max-h-[80vh] w-full mx-6">
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
          <Image src={current.imageUrl} alt={current.title} fill className="object-cover" sizes="90vw" />
        </div>
        <p className="text-center text-white/40 text-sm mt-4">{current.title}</p>
        <p className="text-center text-white/20 text-xs mt-1">{currentIndex + 1} / {posts.length}</p>
      </div>
    </div>
  );
}
