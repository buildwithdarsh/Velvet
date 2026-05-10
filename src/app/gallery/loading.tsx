import { PageBannerSkeleton, GallerySkeleton } from '@/components/ui/Skeletons';

export default function GalleryLoading() {
  return (
    <>
      <PageBannerSkeleton />
      <section className="py-14 md:py-24 px-5 bg-white">
        <div className="max-w-6xl mx-auto">
          <GallerySkeleton />
        </div>
      </section>
    </>
  );
}
