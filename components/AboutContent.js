'use client';

import PlaceholderImage from '@/components/PlaceholderImage';
import CornerFrame from '@/components/CornerFrame';
import { useLanguage } from '@/lib/i18n';

export default function AboutContent() {
  const { t } = useLanguage();
  const about = t.about;

  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <CornerFrame>
        <p className="text-xs uppercase tracking-[0.3em] text-gold">{about.eyebrow}</p>
        <h1 className="mt-3 font-display text-5xl tracking-wide text-white">{about.heading}</h1>
      </CornerFrame>

      <div className="mt-10 grid gap-10 sm:grid-cols-[200px_1fr]">
        <PlaceholderImage
          src="/images/tom-giat.jpg"
          alt={about.heading}
          label={about.portraitLabel}
          className="aspect-square w-full"
        />
        <div className="space-y-5 text-lg leading-relaxed text-zinc-300">
          {about.bio.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
