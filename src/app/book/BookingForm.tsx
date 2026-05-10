'use client';

import { useState, useEffect } from 'react';
import type { CatalogCategory, CatalogItem } from '@/types';
import { getWhatsAppBookingLink, cn } from '@/lib/utils';
import { getCategories, getServices, getOrgConfig, configVal, submitContact } from '@/lib/data';
import { CheckIcon, WhatsAppIcon } from '@/components/ui/Icons';

type FormState = { name: string; phone: string; date: string; time: string; serviceType: string; notes: string };
const initialForm: FormState = { name: '', phone: '', date: '', time: '', serviceType: '', notes: '' };

const timeSlots = ['10:00 AM','10:30 AM','11:00 AM','11:30 AM','12:00 PM','12:30 PM','1:00 PM','1:30 PM','2:00 PM','2:30 PM','3:00 PM','3:30 PM','4:00 PM','4:30 PM','5:00 PM','5:30 PM','6:00 PM','6:30 PM','7:00 PM','7:30 PM'];
const inputClass = 'w-full px-4 py-3.5 bg-[var(--c-white-dim)] border border-black/8 focus:border-[var(--c-gold)] focus:ring-1 focus:ring-[var(--c-gold-glow)] outline-none transition-all text-[var(--c-black)] text-sm rounded-none';

export function BookingForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [serviceOptions, setServiceOptions] = useState<string[]>([]);
  const [whatsapp, setWhatsapp] = useState('');

  useEffect(() => {
    Promise.all([getCategories(), getServices(), getOrgConfig()]).then(([cats, items, config]) => {
      const options = cats.flatMap((cat: CatalogCategory) => {
        const catItems = items.filter((s: CatalogItem) => s.categoryId === cat.id);
        return catItems.map((s: CatalogItem) => {
          const name = s.variants?.[0]?.name || s.slug;
          return `${name} (${cat.name})`;
        });
      });
      setServiceOptions(options);
      setWhatsapp(configVal(config, 'contact', 'whatsapp', ''));
    });
  }, []);

  const update = (field: keyof FormState, value: string) => setForm((prev) => ({ ...prev, [field]: value }));
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');
    if (!form.name || !form.phone || !form.date || !form.time || !form.serviceType) {
      setErrorMsg('Please fill all required fields.');
      setStatus('error');
      return;
    }
    try {
      await submitContact({ name: form.name, phone: form.phone, email: '', message: `Appointment Request:\nDate: ${form.date}\nTime: ${form.time}\nService: ${form.serviceType}\nNotes: ${form.notes || 'None'}` });
    } catch { /* fallback */ }
    setStatus('success');
    setForm(initialForm);
  };

  if (status === 'success') {
    return (
      <section className="py-20 md:py-28 px-5 bg-white">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-[var(--c-black)] flex items-center justify-center mx-auto mb-6"><CheckIcon size={32} className="text-[var(--c-gold)]" /></div>
          <h2 className="font-heading text-2xl font-bold text-[var(--c-black)] mb-3">Booking Request Sent</h2>
          <p className="text-[var(--c-white-muted)] text-sm mb-8">Our team will confirm your booking via phone or WhatsApp shortly.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {whatsapp && <a href={getWhatsAppBookingLink(whatsapp)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white text-[12px] font-semibold tracking-wider uppercase"><WhatsAppIcon size={16} /> Chat on WhatsApp</a>}
            <button onClick={() => setStatus('idle')} className="text-[var(--c-black)] text-sm font-medium hover:text-[var(--c-gold)] transition-colors">Book Another</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-14 md:py-24 px-5 bg-white">
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div><label htmlFor="name" className="block text-[11px] font-semibold tracking-widest uppercase text-[var(--c-black)] mb-2">Full Name *</label><input id="name" type="text" value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Enter your name" className={inputClass} required /></div>
          <div><label htmlFor="phone" className="block text-[11px] font-semibold tracking-widest uppercase text-[var(--c-black)] mb-2">Phone Number *</label><input id="phone" type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+91 98765 43210" className={inputClass} required /></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div><label htmlFor="date" className="block text-[11px] font-semibold tracking-widest uppercase text-[var(--c-black)] mb-2">Preferred Date *</label><input id="date" type="date" value={form.date} min={today} onChange={(e) => update('date', e.target.value)} className={inputClass} required /></div>
            <div><label htmlFor="time" className="block text-[11px] font-semibold tracking-widest uppercase text-[var(--c-black)] mb-2">Preferred Time *</label><select id="time" value={form.time} onChange={(e) => update('time', e.target.value)} className={cn(inputClass, 'bg-[var(--c-white-dim)]')} required><option value="">Select time</option>{timeSlots.map((t) => <option key={t} value={t}>{t}</option>)}</select></div>
          </div>
          <div><label htmlFor="service" className="block text-[11px] font-semibold tracking-widest uppercase text-[var(--c-black)] mb-2">Service *</label><select id="service" value={form.serviceType} onChange={(e) => update('serviceType', e.target.value)} className={cn(inputClass, 'bg-[var(--c-white-dim)]')} required><option value="">Select a service</option>{serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}</select></div>
          <div><label htmlFor="notes" className="block text-[11px] font-semibold tracking-widest uppercase text-[var(--c-black)] mb-2">Special Notes</label><textarea id="notes" value={form.notes} onChange={(e) => update('notes', e.target.value)} placeholder="Any special requests..." rows={3} className={cn(inputClass, 'resize-none')} /></div>
          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
          <button type="submit" disabled={status === 'submitting'} className={cn('w-full py-4 text-[13px] font-semibold tracking-widest uppercase transition-all', status === 'submitting' ? 'bg-[var(--c-black)]/60 text-white/60 cursor-not-allowed' : 'bg-[var(--c-black)] text-white hover:bg-[var(--c-gold)] hover:text-[var(--c-black)]')}>{status === 'submitting' ? 'Sending...' : 'Confirm Booking'}</button>
          {whatsapp && <p className="text-center text-xs text-[var(--c-white-muted)]">Or book directly via <a href={getWhatsAppBookingLink(whatsapp)} target="_blank" rel="noopener noreferrer" className="text-[#25D366] font-medium hover:underline">WhatsApp</a></p>}
        </form>
      </div>
    </section>
  );
}
