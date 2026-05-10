import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center px-5">
      <div className="text-center max-w-md">
        <h1 className="font-heading text-6xl font-bold text-[var(--c-black)] mb-4">404</h1>
        <p className="text-[var(--c-white-muted)] text-lg mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-8 py-3.5 text-[12px] font-semibold tracking-wider uppercase bg-[var(--c-black)] text-white hover:bg-[var(--c-gold)] hover:text-[var(--c-black)] transition-all"
          >
            Back to Home
          </Link>
          <Link
            href="/services"
            className="px-8 py-3.5 text-[12px] font-semibold tracking-wider uppercase border border-black/15 text-[var(--c-black)] hover:bg-[var(--c-black)] hover:text-white transition-all"
          >
            View Services
          </Link>
        </div>
      </div>
    </section>
  );
}
