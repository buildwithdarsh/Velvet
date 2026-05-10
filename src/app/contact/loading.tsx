import { PageBannerSkeleton, ContactSkeleton } from '@/components/ui/Skeletons';

export default function ContactLoading() {
  return (
    <>
      <PageBannerSkeleton />
      <section className="py-14 md:py-24 px-5 bg-white">
        <ContactSkeleton />
      </section>
    </>
  );
}
