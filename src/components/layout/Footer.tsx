import Link from 'next/link';
import { NAV_LINKS, SALON_NAME } from '@/lib/constants';
import { configVal } from '@/lib/data';
import type { OrgConfig } from '@/lib/data';
import { InstagramIcon, FacebookIcon } from '@/components/ui/Icons';
import { HairBackground } from '@/components/ui/HairBackground';

interface FooterProps {
  config: OrgConfig;
}

export function Footer({ config }: FooterProps) {
  const name = configVal(config, 'branding', 'name', SALON_NAME);
  const tagline = configVal(config, 'branding', 'tagline', '');
  const phone = configVal(config, 'contact', 'phone', '');
  const email = configVal(config, 'contact', 'email', '');
  const address = configVal(config, 'contact', 'address', '');
  const instagram = configVal(config, 'contact', 'instagram', '');
  const facebook = configVal(config, 'contact', 'facebook', '');

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const hours = days.map((d, i) => ({ day: labels[i], hours: configVal(config, 'hours', d, 'Closed') }));

  return (
    <footer className="hidden md:block relative bg-[var(--c-black)] text-white overflow-hidden">
      <HairBackground variant="dark" density="sparse" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="font-heading text-2xl font-bold text-white mb-3">{name}</h3>
            {tagline && <p className="text-white/40 text-sm leading-relaxed">{tagline}</p>}
            <div className="flex gap-4 mt-6">
              {instagram && <a href={instagram} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-[var(--c-gold)] transition-colors" aria-label="Instagram"><InstagramIcon size={18} /></a>}
              {facebook && <a href={facebook} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-[var(--c-gold)] transition-colors" aria-label="Facebook"><FacebookIcon size={18} /></a>}
            </div>
          </div>
          <div>
            <h4 className="text-[11px] font-semibold tracking-widest uppercase text-white/50 mb-5">Navigate</h4>
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (<Link key={link.href} href={link.href} className="text-white/50 text-sm hover:text-[var(--c-gold)] transition-colors">{link.label}</Link>))}
              <Link href="/book" className="text-[var(--c-gold)] text-sm font-medium hover:underline">Book Appointment</Link>
            </nav>
          </div>
          {hours.length > 0 && (
            <div>
              <h4 className="text-[11px] font-semibold tracking-widest uppercase text-white/50 mb-5">Hours</h4>
              <ul className="space-y-2.5">
                {hours.map((h) => (<li key={h.day} className="flex justify-between text-sm text-white/40"><span>{h.day}</span><span className="text-white/60">{h.hours}</span></li>))}
              </ul>
            </div>
          )}
          <div>
            <h4 className="text-[11px] font-semibold tracking-widest uppercase text-white/50 mb-5">Contact</h4>
            <div className="space-y-3 text-sm text-white/40">
              {phone && <a href={`tel:${phone}`} className="block hover:text-[var(--c-gold)] transition-colors">{phone}</a>}
              {email && <a href={`mailto:${email}`} className="block hover:text-[var(--c-gold)] transition-colors">{email}</a>}
              {address && <p className="leading-relaxed">{address}</p>}
            </div>
          </div>
        </div>
        <div className="border-t border-white/8 mt-14 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-white/25">
          <span>&copy; {new Date().getFullYear()} {name}. All rights reserved.</span>
          <span className="mt-2 md:mt-0">Built by <a href="https://build.withdarsh.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[var(--c-gold)] transition-colors">Darsh Gupta</a></span>
        </div>
      </div>
    </footer>
  );
}
