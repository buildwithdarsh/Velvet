import { IMAGES } from '@/lib/images';
import type {
  StorefrontConfig,
  CatalogCategory,
  CatalogItem,
  ContentPost,
  ReviewWithUser,
  ContactSubmission,
} from '@/types';

// ─── Org Config ──────────────────────────────────────────────────────────────

export const MOCK_CONFIG: StorefrontConfig = {
  branding: {
    name: 'Glamour Waves',
    tagline: 'Style That Speaks for You',
  },
  contact: {
    phone: '+91 98260 12345',
    email: 'hello@glamourwaves.in',
    whatsapp: '919826012345',
    address: 'Shop No. 12, City Center Mall, Near Phool Bagh, Gwalior 474001',
    city: 'Gwalior',
    google_maps: 'https://maps.google.com/?q=26.2183,78.1828',
    google_maps_embed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.364!2d78.1828!3d26.2183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDEzJzA2LjAiTiA3OMKwMTAnNTguMSJF!5e0!3m2!1sen!2sin!4v1',
    instagram: 'https://instagram.com/glamourwaves.gwalior',
    facebook: 'https://facebook.com/glamourwaves.gwalior',
  },
  hours: {
    monday: '10:00 AM – 8:00 PM',
    tuesday: '10:00 AM – 8:00 PM',
    wednesday: '10:00 AM – 8:00 PM',
    thursday: '10:00 AM – 8:00 PM',
    friday: '10:00 AM – 8:00 PM',
    saturday: '9:00 AM – 9:00 PM',
    sunday: '10:00 AM – 6:00 PM',
  },
};

// ─── Categories ──────────────────────────────────────────────────────────────

export const MOCK_CATEGORIES: CatalogCategory[] = [
  { id: 'cat-hair', name: 'Hair', slug: 'hair', imageUrl: IMAGES.services.hair, sortOrder: 1 },
  { id: 'cat-skin', name: 'Skin Care', slug: 'skin', imageUrl: IMAGES.services.skin, sortOrder: 2 },
  { id: 'cat-makeup', name: 'Makeup', slug: 'makeup', imageUrl: IMAGES.services.makeup, sortOrder: 3 },
  { id: 'cat-mens', name: "Men's Grooming", slug: 'mens', imageUrl: IMAGES.services.mens, sortOrder: 4 },
  { id: 'cat-packages', name: 'Packages', slug: 'packages', imageUrl: IMAGES.services.packages, sortOrder: 5 },
];

// ─── Services (catalog items) ────────────────────────────────────────────────

export const MOCK_SERVICES: CatalogItem[] = [
  // ── Hair ──
  {
    id: 'svc-hair-cut-w',
    slug: 'haircut-styling-women',
    categoryId: 'cat-hair',
    variants: [{ id: 'v1', name: 'Haircut & Styling', price: 500, compareAtPrice: 650 }],
    metadata: { gender: 'women', duration: '45 min' },
  },
  {
    id: 'svc-hair-color-w',
    slug: 'hair-coloring-women',
    categoryId: 'cat-hair',
    variants: [{ id: 'v2', name: 'Hair Coloring & Highlights', price: 2500 }],
    metadata: { gender: 'women', duration: '90–120 min' },
  },
  {
    id: 'svc-hair-spa-w',
    slug: 'hair-spa-women',
    categoryId: 'cat-hair',
    variants: [{ id: 'v3', name: 'Hair Spa & Deep Conditioning', price: 1200 }],
    metadata: { gender: 'women', duration: '60 min' },
  },
  {
    id: 'svc-keratin',
    slug: 'keratin-treatment',
    categoryId: 'cat-hair',
    variants: [{ id: 'v4', name: 'Keratin Treatment', price: 4500 }],
    metadata: { gender: 'women', duration: '150 min' },
  },
  {
    id: 'svc-smoothening',
    slug: 'hair-smoothening',
    categoryId: 'cat-hair',
    variants: [{ id: 'v5', name: 'Hair Smoothening', price: 3500 }],
    metadata: { gender: 'women', duration: '120 min' },
  },
  {
    id: 'svc-hair-cut-m',
    slug: 'haircut-men',
    categoryId: 'cat-hair',
    variants: [{ id: 'v6', name: 'Haircut & Beard Styling', price: 300 }],
    metadata: { gender: 'men', duration: '30 min' },
  },
  {
    id: 'svc-hair-color-m',
    slug: 'hair-coloring-men',
    categoryId: 'cat-hair',
    variants: [{ id: 'v7', name: 'Hair Coloring', price: 800 }],
    metadata: { gender: 'men', duration: '45 min' },
  },
  {
    id: 'svc-hair-spa-m',
    slug: 'head-massage-hair-spa',
    categoryId: 'cat-hair',
    variants: [{ id: 'v8', name: 'Head Massage & Hair Spa', price: 700 }],
    metadata: { gender: 'men', duration: '40 min' },
  },

  // ── Skin Care ──
  {
    id: 'svc-facial-gold',
    slug: 'gold-facial',
    categoryId: 'cat-skin',
    variants: [{ id: 'v9', name: 'Gold Facial', price: 1500 }],
    metadata: { gender: 'women', duration: '60 min' },
  },
  {
    id: 'svc-facial-diamond',
    slug: 'diamond-facial',
    categoryId: 'cat-skin',
    variants: [{ id: 'v10', name: 'Diamond Facial', price: 2000 }],
    metadata: { gender: 'women', duration: '75 min' },
  },
  {
    id: 'svc-cleanup-w',
    slug: 'cleanup-women',
    categoryId: 'cat-skin',
    variants: [{ id: 'v11', name: 'De-Tan & Cleanup', price: 800 }],
    metadata: { gender: 'women', duration: '40 min' },
  },
  {
    id: 'svc-waxing',
    slug: 'full-body-waxing',
    categoryId: 'cat-skin',
    variants: [{ id: 'v12', name: 'Full Body Waxing', price: 1800 }],
    metadata: { gender: 'women', duration: '60 min' },
  },
  {
    id: 'svc-threading',
    slug: 'threading',
    categoryId: 'cat-skin',
    variants: [{ id: 'v13', name: 'Eyebrow & Upper Lip Threading', price: 100 }],
    metadata: { gender: 'women', duration: '15 min' },
  },
  {
    id: 'svc-manicure',
    slug: 'manicure-pedicure',
    categoryId: 'cat-skin',
    variants: [{ id: 'v14', name: 'Manicure & Pedicure', price: 1200 }],
    metadata: { gender: 'unisex', duration: '60 min' },
  },
  {
    id: 'svc-facial-m',
    slug: 'facial-cleanup-men',
    categoryId: 'cat-skin',
    variants: [{ id: 'v15', name: 'Facial & Cleanup', price: 600 }],
    metadata: { gender: 'men', duration: '35 min' },
  },

  // ── Makeup ──
  {
    id: 'svc-bridal',
    slug: 'bridal-makeup',
    categoryId: 'cat-makeup',
    variants: [{ id: 'v16', name: 'Bridal Makeup', price: 15000, compareAtPrice: 18000 }],
    metadata: { gender: 'women', duration: '120 min' },
  },
  {
    id: 'svc-party-makeup',
    slug: 'party-makeup',
    categoryId: 'cat-makeup',
    variants: [{ id: 'v17', name: 'Party Makeup', price: 3500 }],
    metadata: { gender: 'women', duration: '60 min' },
  },
  {
    id: 'svc-mehendi',
    slug: 'bridal-mehendi',
    categoryId: 'cat-makeup',
    variants: [{ id: 'v18', name: 'Bridal Mehendi', price: 5000 }],
    metadata: { gender: 'women', duration: '90 min' },
  },
  {
    id: 'svc-engagement',
    slug: 'engagement-look',
    categoryId: 'cat-makeup',
    variants: [{ id: 'v19', name: 'Engagement Look', price: 8000 }],
    metadata: { gender: 'women', duration: '90 min' },
  },

  // ── Men's Grooming ──
  {
    id: 'svc-beard-sculpt',
    slug: 'beard-sculpting',
    categoryId: 'cat-mens',
    variants: [{ id: 'v20', name: 'Beard Sculpting & Trim', price: 200 }],
    metadata: { gender: 'men', duration: '20 min' },
  },
  {
    id: 'svc-detan-m',
    slug: 'detan-men',
    categoryId: 'cat-mens',
    variants: [{ id: 'v21', name: 'De-Tan Treatment', price: 500 }],
    metadata: { gender: 'men', duration: '30 min' },
  },
  {
    id: 'svc-groom-pkg',
    slug: 'grooming-package-men',
    categoryId: 'cat-mens',
    variants: [{ id: 'v22', name: 'Complete Grooming Package', price: 1500, compareAtPrice: 1800 }],
    metadata: { gender: 'men', duration: '90 min' },
  },

  // ── Packages ──
  {
    id: 'svc-bridal-pkg',
    slug: 'bridal-package',
    categoryId: 'cat-packages',
    variants: [{ id: 'v23', name: 'Bridal Package (Hair + Makeup + Draping)', price: 25000, compareAtPrice: 30000 }],
    metadata: { gender: 'women', duration: '4–5 hours' },
  },
  {
    id: 'svc-glow-pkg',
    slug: 'pre-wedding-glow',
    categoryId: 'cat-packages',
    variants: [{ id: 'v24', name: 'Pre-Wedding Glow (5 Sessions)', price: 8000 }],
    metadata: { gender: 'women', duration: '5 sessions' },
  },
  {
    id: 'svc-pamper-pkg',
    slug: 'pamper-day',
    categoryId: 'cat-packages',
    variants: [{ id: 'v25', name: 'Pamper Day (Facial + Hair Spa + Mani-Pedi)', price: 3500, compareAtPrice: 4200 }],
    metadata: { gender: 'unisex', duration: '3 hours' },
  },
];

// ─── Reviews ─────────────────────────────────────────────────────────────────

export const MOCK_REVIEWS: ReviewWithUser[] = [
  {
    id: 'rev-1',
    rating: 5,
    title: 'Best salon in Gwalior!',
    body: 'I got my bridal makeup done here and it was absolutely stunning. The team understood exactly what I wanted. Everyone at the wedding kept complimenting my look. Highly recommend for any bride-to-be!',
    helpfulCount: 24,
    createdAt: '2026-03-15T10:30:00Z',
    endUser: { id: 'u1', name: 'Priya Sharma' },
  },
  {
    id: 'rev-2',
    rating: 5,
    title: 'Amazing hair transformation',
    body: 'Got a keratin treatment and my hair has never looked this smooth and shiny. The stylist was very patient and explained every step. Worth every rupee!',
    helpfulCount: 18,
    createdAt: '2026-03-10T14:00:00Z',
    endUser: { id: 'u2', name: 'Neha Patel' },
  },
  {
    id: 'rev-3',
    rating: 4,
    title: 'Great grooming experience',
    body: "Clean and modern salon with skilled barbers. The beard sculpting was top-notch. Only reason for 4 stars is the wait time on weekends can be long, but quality is excellent.",
    helpfulCount: 11,
    createdAt: '2026-02-28T11:15:00Z',
    endUser: { id: 'u3', name: 'Rahul Verma' },
  },
  {
    id: 'rev-4',
    rating: 5,
    title: 'My go-to place for facials',
    body: 'The gold facial here is divine. My skin literally glows for days after each session. The ambiance is relaxing and the products they use are premium quality. Love this place!',
    helpfulCount: 15,
    createdAt: '2026-02-20T09:45:00Z',
    endUser: { id: 'u4', name: 'Anjali Gupta' },
  },
  {
    id: 'rev-5',
    rating: 5,
    title: 'Perfect party look',
    body: "Got ready for my engagement here and looked absolutely gorgeous. The makeup artist was incredibly talented and the hairstyling was magazine-worthy. Can't wait to book my bridal package!",
    helpfulCount: 20,
    createdAt: '2026-02-15T16:30:00Z',
    endUser: { id: 'u5', name: 'Kavita Singh' },
  },
  {
    id: 'rev-6',
    rating: 4,
    title: 'Solid men\'s grooming',
    body: 'Finally found a salon in Gwalior that takes men\'s grooming seriously. The complete grooming package is excellent value. Clean tools, good products, and the head massage is so relaxing.',
    helpfulCount: 9,
    createdAt: '2026-02-10T13:00:00Z',
    endUser: { id: 'u6', name: 'Arjun Tiwari' },
  },
];

// ─── Gallery ─────────────────────────────────────────────────────────────────

export const MOCK_GALLERY: ContentPost[] = [
  {
    id: 'gal-1',
    title: 'Layered Highlights',
    imageUrl: IMAGES.gallery.hair1,
    tags: ['gallery'],
    category: 'hair',
    createdAt: '2026-03-20T10:00:00Z',
  },
  {
    id: 'gal-2',
    title: 'Balayage Transformation',
    imageUrl: IMAGES.gallery.hair2,
    tags: ['gallery'],
    category: 'hair',
    createdAt: '2026-03-18T10:00:00Z',
  },
  {
    id: 'gal-3',
    title: 'Textured Bob Cut',
    imageUrl: IMAGES.gallery.hair3,
    tags: ['gallery'],
    category: 'hair',
    createdAt: '2026-03-15T10:00:00Z',
  },
  {
    id: 'gal-4',
    title: 'Classic Curls',
    imageUrl: IMAGES.gallery.hair4,
    tags: ['gallery'],
    category: 'hair',
    createdAt: '2026-03-12T10:00:00Z',
  },
  {
    id: 'gal-5',
    title: 'Bridal Makeup – Traditional Look',
    imageUrl: IMAGES.gallery.makeup1,
    tags: ['gallery'],
    category: 'makeup',
    createdAt: '2026-03-10T10:00:00Z',
  },
  {
    id: 'gal-6',
    title: 'Engagement Party Glam',
    imageUrl: IMAGES.gallery.makeup2,
    tags: ['gallery'],
    category: 'makeup',
    createdAt: '2026-03-08T10:00:00Z',
  },
  {
    id: 'gal-7',
    title: 'Soft Glam Everyday Look',
    imageUrl: IMAGES.gallery.makeup3,
    tags: ['gallery'],
    category: 'makeup',
    createdAt: '2026-03-05T10:00:00Z',
  },
  {
    id: 'gal-8',
    title: 'Dewy Skin Finish',
    imageUrl: IMAGES.gallery.makeup4,
    tags: ['gallery'],
    category: 'makeup',
    createdAt: '2026-03-03T10:00:00Z',
  },
  {
    id: 'gal-9',
    title: 'Gold Facial Glow',
    imageUrl: IMAGES.gallery.skin1,
    tags: ['gallery'],
    category: 'skin',
    createdAt: '2026-02-28T10:00:00Z',
  },
  {
    id: 'gal-10',
    title: 'Hydration Treatment Results',
    imageUrl: IMAGES.gallery.skin2,
    tags: ['gallery'],
    category: 'skin',
    createdAt: '2026-02-25T10:00:00Z',
  },
  {
    id: 'gal-11',
    title: 'Our Styling Stations',
    imageUrl: IMAGES.gallery.salon1,
    tags: ['gallery'],
    category: 'salon',
    createdAt: '2026-02-20T10:00:00Z',
  },
  {
    id: 'gal-12',
    title: 'Salon Interior – Wash Area',
    imageUrl: IMAGES.gallery.salon2,
    tags: ['gallery'],
    category: 'salon',
    createdAt: '2026-02-18T10:00:00Z',
  },
];

// ─── Mock Service (simulates async API with realistic latency) ───────────────

/** Random delay between min–max ms, simulating real network + server time. */
function apiDelay(minMs: number, maxMs: number): Promise<void> {
  const ms = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  return new Promise((r) => setTimeout(r, ms));
}

export const MockService = {
  async getConfig(): Promise<StorefrontConfig> {
    await apiDelay(120, 350);
    return MOCK_CONFIG;
  },

  async getCategories(): Promise<CatalogCategory[]> {
    await apiDelay(80, 250);
    return MOCK_CATEGORIES;
  },

  async getServices(): Promise<CatalogItem[]> {
    await apiDelay(150, 400);
    return MOCK_SERVICES;
  },

  async getReviews(): Promise<ReviewWithUser[]> {
    await apiDelay(100, 300);
    return MOCK_REVIEWS;
  },

  async getGalleryPosts(): Promise<ContentPost[]> {
    await apiDelay(200, 500);
    return MOCK_GALLERY;
  },

  async submitContact(data: ContactSubmission): Promise<{ success: boolean }> {
    await apiDelay(400, 1200);
    console.log('[MockService] Contact submitted:', data);
    return { success: true };
  },
};
