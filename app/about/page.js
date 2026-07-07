import PlaceholderImage from '@/components/PlaceholderImage';

export const metadata = {
  title: 'About',
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <p className="text-xs uppercase tracking-[0.3em] text-accent-light">About</p>
      <h1 className="mt-3 font-display text-5xl tracking-wide text-white">Tom Giat</h1>

      <div className="mt-10 grid gap-10 sm:grid-cols-[200px_1fr]">
        <PlaceholderImage
          src="/images/tom-giat.jpg"
          alt="Tom Giat"
          label="Portrait"
          className="aspect-square w-full"
        />
        <div className="space-y-5 text-lg leading-relaxed text-zinc-300">
          <p>
            Tom Giat is an Israeli documentary filmmaker. Raised within a religious-Zionist
            community, questions of faith, duty, and belonging run through his work long
            before they became the subject of a film.
          </p>
          <p>
            In the aftermath of October 7th, Tom was called up for reserve duty along
            Israel&apos;s northern border. Between long stretches of waiting and the sudden
            fear of rocket fire, he began filming himself, a private record that would
            become his debut feature documentary, <em>One Eye Open</em>.
          </p>
          <p>
            The film premiered at Docaviv 2026 and won the Weil-Bloch Film Award.
          </p>
        </div>
      </div>
    </section>
  );
}
