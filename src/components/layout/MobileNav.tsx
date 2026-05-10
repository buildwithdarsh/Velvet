'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { HomeIcon, SparklesIcon, CalendarIcon, ImageIcon, PhoneIcon } from '@/components/ui/Icons';

const mobileLinks = [
  { label: 'Home', href: '/', Icon: HomeIcon },
  { label: 'Services', href: '/services', Icon: SparklesIcon },
  { label: 'Book', href: '/book', Icon: CalendarIcon, isBooking: true },
  { label: 'Gallery', href: '/gallery', Icon: ImageIcon },
  { label: 'Contact', href: '/contact', Icon: PhoneIcon },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-black/5 pb-[var(--safe-bottom)]">
      <div className="flex items-center justify-around h-16">
        {mobileLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 w-full h-full text-[10px] font-medium transition-colors',
                link.isBooking ? 'text-white' : isActive ? 'text-[var(--c-black)]' : 'text-[var(--c-white-muted)]'
              )}
            >
              {link.isBooking ? (
                <span className="bg-[var(--c-black)] rounded-full p-3 -mt-6 shadow-lg animate-pulse-glow">
                  <link.Icon size={20} className="text-[var(--c-gold)]" />
                </span>
              ) : (
                <link.Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
              )}
              <span className={cn(link.isBooking && 'text-[var(--c-black)]')}>{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
