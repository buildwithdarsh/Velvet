import { PageBannerSkeleton, BookingFormSkeleton } from '@/components/ui/Skeletons';

export default function BookLoading() {
  return (
    <>
      <PageBannerSkeleton />
      <section className="py-14 md:py-24 px-5 bg-white">
        <BookingFormSkeleton />
      </section>
    </>
  );
}
