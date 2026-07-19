'use client';

import Link from 'next/link';
import PlaceholderImage from '@/components/PlaceholderImage';
import CornerFrame from '@/components/CornerFrame';
import { useLanguage } from '@/lib/i18n';

export default function HomeContent() {
  const { t } = useLanguage();
  const home = t.home;

  return (
    <>
      <section className="mx-auto max-w-4xl px-4 pb-12 pt-20 text-center sm:px-6 sm:pt-28">
        <CornerFrame className="inline-block">
          <p className="text-xs uppercase tracking-[0.3em] text-sage-dark">{home.eyebrow}</p>
          <h1 className="mt-4 font-display text-5xl leading-tight tracking-wide text-ink-950 sm:text-6xl">
            {home.heading}
          </h1>
        </CornerFrame>
        <p className="mx-auto mt-6 max-w-xl text-lg text-ink-600 sm:text-xl">{home.intro}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/one-eye-open"
            className="border border-sage bg-sage px-6 py-3 text-sm uppercase tracking-widest text-cream-100 transition-colors hover:bg-sage-dark hover:border-sage-dark"
          >
            {home.ctaFilm}
          </Link>
          <Link
            href="/about"
            className="border border-ink-300 px-6 py-3 text-sm uppercase tracking-widest text-ink-600 transition-colors hover:border-ink-600 hover:text-ink-950"
          >
            {home.ctaAbout}
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-[1fr_1.15fr] sm:items-center">
          <div className="relative">
            <div className="absolute -inset-4 -z-10 bg-sage/25 sm:-inset-6" />
            <PlaceholderImage
              src="/images/hero-eye.jpg"
              alt=""
              label={home.latestHeading}
              className="aspect-[4/3] w-full"
            />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-sage-dark">{home.latestEyebrow}</p>
            <h2 className="mt-3 font-display text-4xl tracking-wide text-ink-950">{home.latestHeading}</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-600">{home.latestBody}</p>
            <Link
              href="/one-eye-open"
              className="mt-6 inline-block text-sm uppercase tracking-widest text-sage-dark hover:text-sage"
            >
              {home.latestLink}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
