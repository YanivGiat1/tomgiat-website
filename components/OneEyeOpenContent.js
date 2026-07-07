'use client';

import PlaceholderImage from '@/components/PlaceholderImage';
import TrailerEmbed from '@/components/TrailerEmbed';
import FilmFacts from '@/components/FilmFacts';
import PressList from '@/components/PressList';
import ScreeningsTable from '@/components/ScreeningsTable';
import SocialLinks from '@/components/SocialLinks';
import { useLanguage } from '@/lib/i18n';

// TODO: replace with the real YouTube video ID once the trailer is live.
const YOUTUBE_ID = '';

export default function OneEyeOpenContent() {
  const { t, locale } = useLanguage();
  const oeo = t.oneEyeOpen;
  const secondaryDir = locale === 'he' ? 'ltr' : 'rtl';
  const secondaryLang = locale === 'he' ? 'en' : 'he';

  return (
    <>
      <section className="relative flex min-h-[85vh] items-end overflow-hidden border-b border-zinc-800">
        <PlaceholderImage
          src="/images/hero-eye.jpg"
          alt=""
          showLabel={false}
          className="absolute inset-0 -z-10 h-full w-full"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal-950 via-charcoal-950/70 to-charcoal-950/20" />

        <div className="mx-auto max-w-4xl px-4 pb-16 pt-32 sm:px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-accent-light">{oeo.filmBy}</p>
          <h1 className="mt-4 font-display text-5xl leading-none tracking-wide text-white sm:text-7xl">
            {oeo.title}
          </h1>
          <p
            dir={secondaryDir}
            lang={secondaryLang}
            className="mt-2 font-display text-2xl tracking-wide text-zinc-300 sm:text-3xl"
          >
            {oeo.titleSecondary}
          </p>
          <p className="mt-6 max-w-xl text-lg text-zinc-200 sm:text-xl">{oeo.tagline}</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <TrailerEmbed youtubeId={YOUTUBE_ID} />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <h2 className="font-display text-3xl tracking-wide text-white">{oeo.synopsisHeading}</h2>
        <div className="mt-6 space-y-5 text-lg leading-relaxed text-zinc-300">
          {oeo.synopsis.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[280px_1fr]">
          <PlaceholderImage
            src="/images/poster.jpg"
            alt="One Eye Open poster"
            label={oeo.posterLabel}
            className="aspect-[2/3] w-full"
          />
          <div>
            <h2 className="font-display text-3xl tracking-wide text-white">{oeo.factsHeading}</h2>
            <div className="mt-6">
              <FilmFacts />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl tracking-wide text-white">{oeo.stillsHeading}</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {oeo.stillLabels.map((label, i) => (
            <PlaceholderImage
              key={label}
              src={`/images/still-${i + 1}.jpg`}
              alt="Film still"
              label={label}
              className="aspect-video"
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl tracking-wide text-white">{oeo.awardsHeading}</h2>

        <div className="mt-8 border border-accent/40 bg-accent/10 p-6">
          <p className="font-display text-2xl tracking-wide text-white">{oeo.awardTitle}</p>
          <p className="mt-2 text-sm text-zinc-300">{oeo.awardBody}</p>
        </div>

        <div className="mt-8">
          <PressList />
        </div>
      </section>

      <section id="screenings" className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl tracking-wide text-white">{oeo.screeningsHeading}</h2>
        <div className="mt-8">
          <ScreeningsTable />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
        <h2 className="font-display text-3xl tracking-wide text-white">{oeo.followHeading}</h2>
        <div className="mt-6 flex justify-center">
          <SocialLinks className="text-base" />
        </div>
      </section>
    </>
  );
}
