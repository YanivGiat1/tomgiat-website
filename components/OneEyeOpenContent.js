'use client';

import PlaceholderImage from '@/components/PlaceholderImage';
import CornerFrame from '@/components/CornerFrame';
import TrailerEmbed from '@/components/TrailerEmbed';
import FilmFacts from '@/components/FilmFacts';
import AwardsTimeline from '@/components/AwardsTimeline';
import PressList from '@/components/PressList';
import ScreeningsTable from '@/components/ScreeningsTable';
import SocialLinks from '@/components/SocialLinks';
import { useLanguage } from '@/lib/i18n';

// Trailer source: prefer YOUTUBE_ID once the trailer is live on YouTube;
// falls back to the Google Drive file below in the meantime.
const YOUTUBE_ID = '';
const DRIVE_FILE_ID = '1JmBR9DFz68Besr-l23gDfC46m4DD38RR';

export default function OneEyeOpenContent() {
  const { t, locale } = useLanguage();
  const oeo = t.oneEyeOpen;
  const secondaryDir = locale === 'he' ? 'ltr' : 'rtl';
  const secondaryLang = locale === 'he' ? 'en' : 'he';

  return (
    <>
      <section className="mx-auto max-w-5xl px-4 pb-4 pt-20 sm:px-6 sm:pt-28">
        <div className="grid gap-10 sm:grid-cols-[1.1fr_1fr] sm:items-center">
          <div>
            <CornerFrame>
              <p className="text-xs uppercase tracking-[0.3em] text-sage-dark">{oeo.filmBy}</p>
              <h1 className="mt-4 font-display text-5xl leading-tight tracking-wide text-ink-950 sm:text-6xl">
                {oeo.title}
              </h1>
              <p
                dir={secondaryDir}
                lang={secondaryLang}
                className="mt-2 font-display text-2xl tracking-wide text-ink-600 sm:text-3xl"
              >
                {oeo.titleSecondary}
              </p>
            </CornerFrame>
            <p className="mt-6 max-w-xl text-lg text-ink-600 sm:text-xl">{oeo.tagline}</p>
            <div className="mt-6 inline-flex items-center gap-2 border border-sage/50 bg-sage/10 px-4 py-2">
              <span className="text-xs uppercase tracking-[0.2em] text-sage-dark">{oeo.awardHeroBadge}</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 -z-10 bg-sage/25 sm:-inset-6" />
            <PlaceholderImage src="/images/hero-eye.jpg" alt="" showLabel={false} priority className="aspect-[4/3] w-full" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <TrailerEmbed youtubeId={YOUTUBE_ID} driveFileId={DRIVE_FILE_ID} />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <h2 className="font-display text-3xl tracking-wide text-ink-950">{oeo.synopsisHeading}</h2>
        <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-600">
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
            <h2 className="font-display text-3xl tracking-wide text-ink-950">{oeo.factsHeading}</h2>
            <div className="mt-6">
              <FilmFacts />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl tracking-wide text-ink-950">{oeo.stillsHeading}</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <PlaceholderImage
            src="/images/still-1.jpg"
            alt="Film still"
            label={oeo.stillLabels[0]}
            className="aspect-[4/3] sm:row-span-2 sm:aspect-auto sm:h-full"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-rows-2">
            <PlaceholderImage
              src="/images/still-2.jpg"
              alt="Film still"
              label={oeo.stillLabels[1]}
              className="aspect-video"
            />
            <PlaceholderImage
              src="/images/still-3.jpg"
              alt="Film still"
              label={oeo.stillLabels[2]}
              className="aspect-video"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl tracking-wide text-ink-950">{oeo.awardsHeading}</h2>

        <div className="mt-10">
          <p className="text-xs uppercase tracking-[0.3em] text-sage-dark">{oeo.awardsSubheading}</p>
          <div className="mt-6">
            <AwardsTimeline />
          </div>
        </div>

        <div className="mt-10">
          <p className="text-xs uppercase tracking-[0.3em] text-sage-dark">{oeo.pressSubheading}</p>
          <div className="mt-6">
            <PressList />
          </div>
        </div>
      </section>

      <section id="screenings" className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl tracking-wide text-ink-950">{oeo.screeningsHeading}</h2>
        <div className="mt-8">
          <ScreeningsTable />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
        <h2 className="font-display text-3xl tracking-wide text-ink-950">{oeo.followHeading}</h2>
        <div className="mt-6 flex justify-center">
          <SocialLinks className="text-base" />
        </div>
      </section>
    </>
  );
}
