import { MockService } from '@/lib/mock-data';
import type {
  StorefrontConfig,
  CatalogCategory,
  CatalogItem,
  ContentPost,
  ReviewWithUser,
  ContactSubmission,
} from '@/types';

// ─── Re-export types for consumers ───────────────────────────────────────────

export type OrgConfig = StorefrontConfig & Record<string, Record<string, unknown>>;
export type { CatalogCategory, CatalogItem, ContentPost, ReviewWithUser, ContactSubmission };

// ─── Config (org settings) ────────────────────────────────────────────────

let _configCache: OrgConfig | null = null;
let _configTime = 0;
const CONFIG_TTL = 60_000;

export async function getOrgConfig(): Promise<OrgConfig> {
  const now = Date.now();
  if (_configCache && now - _configTime < CONFIG_TTL) return _configCache;
  try {
    const config = await MockService.getConfig();
    _configCache = config as unknown as OrgConfig;
    _configTime = now;
    return _configCache;
  } catch {
    return _configCache ?? ({} as OrgConfig);
  }
}

export function configVal<T = string>(config: OrgConfig, group: string, key: string, fallback: T): T {
  const g = config[group] as Record<string, unknown> | undefined;
  if (!g || g[key] === undefined || g[key] === null || g[key] === '') return fallback;
  return g[key] as T;
}

// ─── Catalog (services) ───────────────────────────────────────────────────

export async function getCategories(): Promise<CatalogCategory[]> {
  try {
    return await MockService.getCategories();
  } catch {
    return [];
  }
}

export async function getServices(): Promise<CatalogItem[]> {
  try {
    return await MockService.getServices();
  } catch {
    return [];
  }
}

// ─── Reviews ──────────────────────────────────────────────────────────────

export async function getReviews(): Promise<ReviewWithUser[]> {
  try {
    return await MockService.getReviews();
  } catch {
    return [];
  }
}

// ─── Gallery (content posts tagged 'gallery') ────────────────────────────

export async function getGalleryPosts(): Promise<ContentPost[]> {
  try {
    return await MockService.getGalleryPosts();
  } catch {
    return [];
  }
}

// ─── Contact ─────────────────────────────────────────────────────────────

export async function submitContact(data: ContactSubmission): Promise<{ success: boolean }> {
  try {
    return await MockService.submitContact(data);
  } catch {
    return { success: false };
  }
}
