'use client';

import Link from 'next/link';
import PlaceholderImage from '@/components/PlaceholderImage';
import { useLanguage } from '@/lib/i18n';

export default function HomeContent() {
  const { t } = useLanguage();
  const home = t.home;

  return (
    <>
      <section className="relative flex min-h-[80vh] items-center overflow-hidden border-b border-zinc-800">
        <PlaceholderImage
          src="/images/hero-eye.jpg"
          alt=""
          showLabel={false}
          className="absolute inset-0 -z-10 h-full w-full opacity-40"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-charcoal-950/40 via-charcoal-950/80 to-charcoal-950" />

        <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-accent-light">{home.eyebrow}</p>
          <h1 className="mt-4 font-display text-5xl leading-none tracking-wide text-white sm:text-6xl">
            {home.heading}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-zinc-300 sm:text-xl">{home.intro}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/one-eye-open"
              className="border border-accent bg-accent px-6 py-3 text-sm uppercase tracking-widest text-white transition-colors hover:bg-accent-dark"
            >
              {home.ctaFilm}
            </Link>
            <Link
              href="/about"
              className="border border-zinc-700 px-6 py-3 text-sm uppercase tracking-widest text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
            >
              {home.ctaAbout}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <p className="text-xs uppercase tracking-[0.3em] text-accent-light">{home.latestEyebrow}</p>
        <h2 className="mt-3 font-display text-4xl tracking-wide text-white">{home.latestHeading}</h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-300">{home.latestBody}</p>
        <Link
          href="/one-eye-open"
          className="mt-6 inline-block text-sm uppercase tracking-widest text-accent-light hover:text-accent"
        >
          {home.latestLink}
        </Link>
      </section>
    </>
  );
}
