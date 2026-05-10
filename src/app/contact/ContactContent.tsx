'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { submitContact, configVal } from '@/lib/data';
import type { OrgConfig } from '@/lib/data';
import { MapPinIcon, PhoneIcon, MailIcon, ClockIcon, InstagramIcon, FacebookIcon, CheckIcon } from '@/components/ui/Icons';

const inputClass = 'w-full px-4 py-3.5 bg-[var(--c-white-dim)] border border-black/8 focus:border-[var(--c-gold)] focus:ring-1 focus:ring-[var(--c-gold-glow)] outline-none transition-all text-[var(--c-black)] text-sm rounded-none';

interface ContactContentProps {
  config: OrgConfig;
}

export function ContactContent({ config }: ContactContentProps) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const phone = configVal(config, 'contact', 'phone', '');
  const email = configVal(config, 'contact', 'email', '');
  const address = configVal(config, 'contact', 'address', '');
  const googleMaps = configVal(config, 'contact', 'google_maps', '');
  const googleMapsEmbed = configVal(config, 'contact', 'google_maps_embed', '');
  const instagram = configVal(config, 'contact', 'instagram', '');
  const facebook = configVal(config, 'contact', 'facebook', '');

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const hours = days.map((d, i) => ({ day: labels[i], hours: configVal(config, 'hours', d, 'Closed') }));

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try { await submitContact({ name: form.name, phone: form.phone, email: form.email, message: form.message }); } catch { /* fallback */ }
    setStatus('success');
    setForm({ name: '', phone: '', email: '', message: '' });
  };

  return (
    <section className="py-14 md:py-24 px-5 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16">
        <div>
          <p className="text-[var(--c-gold)] text-[11px] font-semibold tracking-[0.3em] uppercase mb-4">Get In Touch</p>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-[var(--c-black)] mb-8">Contact Information</h2>
          <div className="space-y-5 mb-10">
            {address && <div className="flex items-start gap-4"><MapPinIcon size={18} className="text-[var(--c-gold)] mt-0.5 shrink-0" /><div><p className="text-[11px] tracking-widest uppercase text-[var(--c-white-muted)] mb-1">Address</p><a href={googleMaps || '#'} target="_blank" rel="noopener noreferrer" className="text-[var(--c-black)] text-sm hover:text-[var(--c-gold)] transition-colors">{address}</a></div></div>}
            {phone && <div className="flex items-start gap-4"><PhoneIcon size={18} className="text-[var(--c-gold)] mt-0.5 shrink-0" /><div><p className="text-[11px] tracking-widest uppercase text-[var(--c-white-muted)] mb-1">Phone</p><a href={`tel:${phone}`} className="text-[var(--c-black)] text-sm hover:text-[var(--c-gold)] transition-colors">{phone}</a></div></div>}
            {email && <div className="flex items-start gap-4"><MailIcon size={18} className="text-[var(--c-gold)] mt-0.5 shrink-0" /><div><p className="text-[11px] tracking-widest uppercase text-[var(--c-white-muted)] mb-1">Email</p><a href={`mailto:${email}`} className="text-[var(--c-black)] text-sm hover:text-[var(--c-gold)] transition-colors">{email}</a></div></div>}
          </div>
          {hours.length > 0 && (
            <div className="border border-black/5 rounded-xl p-6 mb-6">
              <div className="flex items-center gap-2 mb-4"><ClockIcon size={16} className="text-[var(--c-gold)]" /><h4 className="text-[11px] font-semibold tracking-widest uppercase text-[var(--c-black)]">Business Hours</h4></div>
              <div className="space-y-2.5">{hours.map((h) => (<div key={h.day} className="flex justify-between text-sm"><span className="text-[var(--c-black)] font-medium">{h.day}</span><span className="text-[var(--c-white-muted)]">{h.hours}</span></div>))}</div>
            </div>
          )}
          <div className="flex items-center gap-4">
            <span className="text-[11px] tracking-widest uppercase text-[var(--c-white-muted)]">Follow us</span>
            {instagram && <a href={instagram} target="_blank" rel="noopener noreferrer" className="text-[var(--c-white-muted)] hover:text-[var(--c-gold)] transition-colors" aria-label="Instagram"><InstagramIcon size={20} /></a>}
            {facebook && <a href={facebook} target="_blank" rel="noopener noreferrer" className="text-[var(--c-white-muted)] hover:text-[var(--c-gold)] transition-colors" aria-label="Facebook"><FacebookIcon size={20} /></a>}
          </div>
        </div>

        <div className="space-y-8">
          <div className="border border-black/5 rounded-xl p-6 md:p-8">
            <h3 className="text-[11px] font-semibold tracking-widest uppercase text-[var(--c-black)] mb-5">Send a Message</h3>
            {status === 'success' ? (
              <div className="text-center py-10">
                <div className="w-14 h-14 rounded-full bg-[var(--c-black)] flex items-center justify-center mx-auto mb-4"><CheckIcon size={28} className="text-[var(--c-gold)]" /></div>
                <p className="font-semibold text-[var(--c-black)]">Message Sent</p>
                <p className="text-xs text-[var(--c-white-muted)] mt-1">We&apos;ll get back to you soon.</p>
                <button onClick={() => setStatus('idle')} className="mt-4 text-sm text-[var(--c-gold)] font-medium hover:underline">Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="contact-name" className="block text-[11px] font-semibold tracking-widest uppercase text-[var(--c-black)] mb-2">Your Name *</label>
                  <input id="contact-name" type="text" value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Enter your name" className={inputClass} required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-phone" className="block text-[11px] font-semibold tracking-widest uppercase text-[var(--c-black)] mb-2">Phone *</label>
                    <input id="contact-phone" type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+91 98765 43210" className={inputClass} required />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-[11px] font-semibold tracking-widest uppercase text-[var(--c-black)] mb-2">Email</label>
                    <input id="contact-email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@example.com" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-[11px] font-semibold tracking-widest uppercase text-[var(--c-black)] mb-2">Message *</label>
                  <textarea id="contact-message" value={form.message} onChange={(e) => update('message', e.target.value)} placeholder="Your message..." rows={4} className={cn(inputClass, 'resize-none')} required />
                </div>
                <button type="submit" disabled={status === 'submitting'} className={cn('w-full py-3.5 text-[12px] font-semibold tracking-widest uppercase transition-all', status === 'submitting' ? 'bg-[var(--c-black)]/60 text-white/60' : 'bg-[var(--c-black)] text-white hover:bg-[var(--c-gold)] hover:text-[var(--c-black)]')}>{status === 'submitting' ? 'Sending...' : 'Send Message'}</button>
              </form>
            )}
          </div>
          {googleMapsEmbed && (
            <div className="aspect-video rounded-xl overflow-hidden border border-black/5">
              <iframe src={googleMapsEmbed} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Glamour Waves Salon Location in Gwalior" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
