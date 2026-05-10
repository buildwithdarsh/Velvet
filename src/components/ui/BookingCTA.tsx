import Link from 'next/link';
import { cn } from '@/lib/utils';

interface BookingCTAProps {
  className?: string;
  variant?: 'primary' | 'outline' | 'white';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

export function BookingCTA({ className, variant = 'primary', size = 'md', children = 'Book Appointment' }: BookingCTAProps) {
  const base = 'inline-flex items-center justify-center font-semibold tracking-wider uppercase transition-all';
  const sizes = {
    sm: 'px-5 py-2 text-[11px]',
    md: 'px-8 py-3.5 text-[12px]',
    lg: 'px-10 py-4 text-[13px]',
  };
  const variants = {
    primary: 'bg-[var(--c-black)] text-white hover:bg-[var(--c-gold)] hover:text-[var(--c-black)]',
    outline: 'border border-black/15 text-[var(--c-black)] hover:bg-[var(--c-black)] hover:text-white',
    white: 'bg-white text-[var(--c-black)] hover:bg-[var(--c-gold)]',
  };

  return (
    <Link href="/book" className={cn(base, sizes[size], variants[variant], className)}>
      {children}
    </Link>
  );
}
