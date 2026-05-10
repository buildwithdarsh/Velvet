// ─── Local types (replaces @buildwithdarsh/sdk imports) ────────────────────────

export interface StorefrontConfig {
  branding: {
    name: string;
    tagline: string;
    [key: string]: unknown;
  };
  contact: {
    phone: string;
    email: string;
    whatsapp: string;
    address: string;
    city: string;
    google_maps: string;
    google_maps_embed: string;
    instagram: string;
    facebook: string;
    [key: string]: unknown;
  };
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
    [key: string]: unknown;
  };
  [key: string]: Record<string, unknown>;
}

export interface CatalogCategory {
  id: string;
  name: string;
  slug: string;
  imageUrl?: string;
  sortOrder?: number;
}

export interface CatalogItemVariant {
  id: string;
  name: string;
  price: number;
  compareAtPrice?: number;
}

export interface CatalogItem {
  id: string;
  slug: string;
  categoryId: string;
  variants: CatalogItemVariant[];
  metadata?: Record<string, string>;
}

export interface ContentPost {
  id: string;
  title: string;
  imageUrl: string;
  tags?: string[];
  category?: string;
  body?: string;
  createdAt?: string;
}

export interface ReviewWithUser {
  id: string;
  rating: number;
  title: string | null;
  body: string | null;
  helpfulCount: number;
  createdAt: string;
  endUser?: { id: string; name: string | null };
}

export interface ContactSubmission {
  name: string;
  phone: string;
  email: string;
  message: string;
}
