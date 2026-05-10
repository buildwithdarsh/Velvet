import { PageBannerSkeleton, ServiceListSkeleton } from '@/components/ui/Skeletons';

export default function ServicesLoading() {
  return (
    <>
      <PageBannerSkeleton />
      <section className="py-14 md:py-24 px-5 bg-white">
        <div className="max-w-5xl mx-auto">
          <ServiceListSkeleton />
        </div>
      </section>
    </>
  );
}
