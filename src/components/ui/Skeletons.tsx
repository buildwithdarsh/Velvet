import { cn } from '@/lib/utils';

function Bone({ className }: { className?: string }) {
  return (
    <div className={cn('bg-black/[0.04] rounded-md animate-pulse', className)} />
  );
}

function BoneDark({ className }: { className?: string }) {
  return (
    <div className={cn('bg-white/[0.06] rounded-md animate-pulse', className)} />
  );
}

// ─── Service Category Cards (Home preview) ────────────────────────────────

export function ServiceCategorySkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="aspect-[3/4] rounded-2xl bg-black/[0.03] overflow-hidden relative">
          <div className="absolute inset-x-0 bottom-0 p-5 space-y-2">
            <Bone className="w-6 h-6 rounded-full" />
            <Bone className="w-3/4 h-4" />
            <Bone className="w-1/2 h-3" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Service List (Services page) ─────────────────────────────────────────

export function ServiceListSkeleton() {
  return (
    <div className="space-y-16">
      {Array.from({ length: 3 }).map((_, ci) => (
        <div key={ci}>
          <div className="flex items-center gap-3 mb-6">
            <Bone className="w-6 h-6 rounded-full" />
            <Bone className="w-40 h-7" />
          </div>
          <div className="border border-black/5 rounded-xl overflow-hidden">
            {Array.from({ length: 5 }).map((_, si) => (
              <div key={si} className={cn('flex items-center justify-between px-5 py-4', si < 4 && 'border-b border-black/5')}>
                <div className="space-y-1.5 flex-1">
                  <Bone className="w-48 h-4" />
                  <Bone className="w-20 h-3" />
                </div>
                <Bone className="w-16 h-5 shrink-0" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Review Cards ─────────────────────────────────────────────────────────

export function ReviewsSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl p-6 md:p-8 border border-black/5">
          <div className="flex gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, s) => (
              <Bone key={s} className="w-3.5 h-3.5 rounded-full" />
            ))}
          </div>
          <div className="space-y-2 mb-6">
            <Bone className="w-full h-3.5" />
            <Bone className="w-full h-3.5" />
            <Bone className="w-3/4 h-3.5" />
          </div>
          <div className="border-t border-black/5 pt-4">
            <Bone className="w-28 h-4" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Gallery Grid ─────────────────────────────────────────────────────────

export function GallerySkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Bone key={i} className="aspect-square rounded-lg" />
      ))}
    </div>
  );
}

// ─── Booking Form ─────────────────────────────────────────────────────────

export function BookingFormSkeleton() {
  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i}>
          <Bone className="w-24 h-3 mb-2" />
          <Bone className="w-full h-12" />
        </div>
      ))}
      <div className="grid grid-cols-2 gap-5">
        <div><Bone className="w-24 h-3 mb-2" /><Bone className="w-full h-12" /></div>
        <div><Bone className="w-24 h-3 mb-2" /><Bone className="w-full h-12" /></div>
      </div>
      <Bone className="w-full h-14 mt-4" />
    </div>
  );
}

// ─── Contact Page ─────────────────────────────────────────────────────────

export function ContactSkeleton() {
  return (
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16">
      <div className="space-y-5">
        <Bone className="w-32 h-3" />
        <Bone className="w-52 h-8" />
        <div className="space-y-4 mt-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-start gap-4">
              <Bone className="w-5 h-5 rounded-full shrink-0" />
              <div className="space-y-1 flex-1"><Bone className="w-16 h-3" /><Bone className="w-48 h-4" /></div>
            </div>
          ))}
        </div>
        <Bone className="w-full h-48 rounded-xl mt-6" />
      </div>
      <div className="space-y-8">
        <Bone className="w-full h-80 rounded-xl" />
        <Bone className="w-full h-56 rounded-xl" />
      </div>
    </div>
  );
}

// ─── Page Banner (dark) ───────────────────────────────────────────────────

export function PageBannerSkeleton() {
  return (
    <div className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[var(--c-black)]">
      <div className="max-w-4xl mx-auto px-5 text-center space-y-4">
        <BoneDark className="w-28 h-3 mx-auto" />
        <BoneDark className="w-64 h-10 mx-auto" />
        <BoneDark className="w-80 h-4 mx-auto" />
      </div>
    </div>
  );
}
