export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function getWhatsAppLink(phone: string, message?: string): string {
  const base = `https://wa.me/${phone}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function getWhatsAppBookingLink(phone: string, service?: string): string {
  const msg = service
    ? `Hi! I'd like to book an appointment for ${service} at Glamour Waves.`
    : `Hi! I'd like to book an appointment at Glamour Waves.`;
  return getWhatsAppLink(phone, msg);
}
