'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS, SALON_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { MenuIcon, XIcon } from '@/components/ui/Icons';

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isDark = !scrolled && !menuOpen;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled || menuOpen
          ? 'bg-white/95 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)]'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <span
              className={cn(
                'text-xl md:text-2xl font-heading font-bold tracking-tight transition-colors duration-500',
                isDark ? 'text-white' : 'text-[var(--c-black)]'
              )}
            >
              {SALON_NAME}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 text-[13px] font-medium tracking-wide uppercase transition-colors duration-300',
                  pathname === link.href
                    ? 'text-[var(--c-gold)]'
                    : isDark
                      ? 'text-white/70 hover:text-white'
                      : 'text-[var(--c-white-muted)] hover:text-[var(--c-black)]'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <Link
            href="/book"
            className={cn(
              'hidden md:inline-flex items-center px-6 py-2.5 text-[13px] font-semibold tracking-wide uppercase rounded-none transition-all duration-300',
              isDark
                ? 'border border-white/30 text-white hover:bg-white hover:text-[var(--c-black)]'
                : 'bg-[var(--c-black)] text-white hover:bg-[var(--c-gold)] hover:text-[var(--c-black)]'
            )}
          >
            Book Now
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={cn('md:hidden p-2 transition-colors', isDark ? 'text-white' : 'text-[var(--c-black)]')}
            aria-label="Toggle menu"
          >
            {menuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-6 animate-fade-in">
            <nav className="flex flex-col gap-1 pt-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    'px-4 py-3.5 text-[15px] font-medium tracking-wide transition-colors border-b border-[var(--c-border-light)]',
                    pathname === link.href
                      ? 'text-[var(--c-gold)]'
                      : 'text-[var(--c-black)]'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/book"
                onClick={() => setMenuOpen(false)}
                className="mt-4 bg-[var(--c-black)] text-white text-center py-4 text-[13px] font-semibold tracking-widest uppercase"
              >
                Book Appointment
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
