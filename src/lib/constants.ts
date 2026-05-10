// Static navigation — this is app structure, not data
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
] as const;

// Fallback salon info — used only when config.get() hasn't loaded yet
export const SALON_NAME = 'Glamour Waves';
export const SALON_TAGLINE = 'Unisex Salon';
export const SALON_PHONE = '';
export const SALON_WHATSAPP = '';
export const SALON_EMAIL = '';
export const SALON_ADDRESS = '';

// Site-wide SEO constants
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://glamourwaves.in';
export const OG_IMAGE_URL = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&h=630&fit=crop&auto=format';

// Icon mapping for service category slugs
export const CATEGORY_ICON_MAP: Record<string, string> = {
  hair: 'scissors',
  skin: 'droplet',
  makeup: 'palette',
  mens: 'user',
  packages: 'gift',
} as const;
