import PlaceholderImage from '@/components/PlaceholderImage';
import TrailerEmbed from '@/components/TrailerEmbed';
import FilmFacts from '@/components/FilmFacts';
import PressList from '@/components/PressList';
import ScreeningsTable from '@/components/ScreeningsTable';
import SocialLinks from '@/components/SocialLinks';

export const metadata = {
  title: 'One Eye Open',
  description:
    "A state coming apart, seen through the moral doubt in a soldier's eyes. A documentary by Tom Giat.",
};

// TODO: replace with the real YouTube video ID once the trailer is live.
const YOUTUBE_ID = '';

export default function OneEyeOpenPage() {
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
          <p className="text-xs uppercase tracking-[0.3em] text-accent-light">A film by Tom Giat</p>
          <h1 className="mt-4 font-display text-5xl leading-none tracking-wide text-white sm:text-7xl">
            ONE EYE OPEN
          </h1>
          <p dir="rtl" lang="he" className="mt-2 font-display text-2xl tracking-wide text-zinc-300 sm:text-3xl">
            עין אחת פקוחה
          </p>
          <p className="mt-6 max-w-xl text-lg text-zinc-200 sm:text-xl">
            A state coming apart, seen through the moral doubt in a soldier&apos;s eyes.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <TrailerEmbed youtubeId={YOUTUBE_ID} />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <h2 className="font-display text-3xl tracking-wide text-white">Synopsis</h2>
        <div className="mt-6 space-y-5 text-lg leading-relaxed text-zinc-300">
          <p>
            In the aftermath of October 7th, filmmaker Tom Giat was called up for reserve duty
            along Israel&apos;s northern border. He expected to face combat; instead, he found
            himself suspended in the strange rhythm of military bureaucracy, long, uneventful
            days broken only by the sudden fear of incoming rockets. Camera in hand, he began
            recording his own mind as it unraveled in real time, weaving together footage from
            home, private diary entries spoken to the lens, and phone calls with his mother, who
            could not hide her worry.
          </p>
          <p>
            What emerges is not a war film in any conventional sense. It is a young reservist&apos;s
            interior reckoning with faith, obligation, and an identity shaped by a
            religious-Zionist upbringing that suddenly feels harder to reconcile. Giat wanted,
            more than once, to go home. But something kept him in place: a sense of duty he
            couldn&apos;t shake, and a quiet fear of what leaving might do to his mother&apos;s fragile
            calm. Offered leave, and later a replacement, he turned both down again and again,
            and even after someone finally took his place, he couldn&apos;t fully let himself
            relax.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[280px_1fr]">
          <PlaceholderImage
            src="/images/poster.jpg"
            alt="One Eye Open poster"
            label="Poster"
            className="aspect-[2/3] w-full"
          />
          <div>
            <h2 className="font-display text-3xl tracking-wide text-white">Film Facts</h2>
            <div className="mt-6">
              <FilmFacts />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl tracking-wide text-white">Stills</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <PlaceholderImage src="/images/still-1.jpg" alt="Film still" label="Still 1" className="aspect-video" />
          <PlaceholderImage src="/images/still-2.jpg" alt="Film still" label="Still 2" className="aspect-video" />
          <PlaceholderImage src="/images/still-3.jpg" alt="Film still" label="Still 3" className="aspect-video" />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl tracking-wide text-white">Awards &amp; Press</h2>

        <div className="mt-8 border border-accent/40 bg-accent/10 p-6">
          <p className="font-display text-2xl tracking-wide text-white">
            Weil-Bloch Film Award — Winner ($50,000)
          </p>
          <p className="mt-2 text-sm text-zinc-300">
            World premiere at Docaviv 2026, screened in the festival&apos;s Israeli competition.
          </p>
        </div>

        <div className="mt-8">
          <PressList />
        </div>
      </section>

      <section id="screenings" className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl tracking-wide text-white">Screenings</h2>
        <div className="mt-8">
          <ScreeningsTable />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
        <h2 className="font-display text-3xl tracking-wide text-white">Follow the Film</h2>
        <div className="mt-6 flex justify-center">
          <SocialLinks className="text-base" />
        </div>
      </section>
    </>
  );
}
