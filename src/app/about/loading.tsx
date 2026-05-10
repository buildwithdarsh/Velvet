import { PageBannerSkeleton } from '@/components/ui/Skeletons';

export default function AboutLoading() {
  return (
    <>
      <PageBannerSkeleton />
      <section className="py-20 md:py-32 px-5 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20">
          <div className="aspect-[4/5] rounded-xl bg-black/[0.04] animate-pulse" />
          <div className="space-y-4">
            <div className="w-24 h-3 bg-black/[0.04] rounded animate-pulse" />
            <div className="w-64 h-8 bg-black/[0.04] rounded animate-pulse" />
            <div className="space-y-2 mt-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="w-full h-4 bg-black/[0.04] rounded animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
