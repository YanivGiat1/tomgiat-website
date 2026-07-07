const items = [
  {
    outlet: 'Haaretz',
    critic: 'Pablo Utin',
    summary:
      "Describes it as an intimate documentary debut about a soldier's moral doubt — not a conventional war film, but an inward journey of self-questioning.",
    href: 'https://www.haaretz.co.il/gallery/cinema/docaviv/2026-05-30/ty-article-review/.premium/0000019e-7753-dd51-affe-ff5b7a6b0000',
  },
  {
    outlet: 'Mako',
    critic: 'Zohar Tzelach',
    summary:
      'Names it a must-see film about the quiet burnout reserve soldiers have carried since October 7th.',
    href: 'https://www.mako.co.il/culture-movies/Article-13891c4a5ce3e91026.htm',
  },
  {
    outlet: 'Srita',
    critic: 'Ofer Liebergall',
    summary:
      "Calls it emotionally devastating, built from Giat's own diary recordings and his worried calls home to his mother.",
    href: 'https://srita.net/2026/05/31/docaviv_2026_1st_report',
  },
  {
    outlet: 'Docaviv',
    critic: null,
    summary:
      'Official festival listing with synopsis and screening details from Docaviv, the Tel Aviv International Documentary Film Festival.',
    href: 'https://www.docaviv.co.il/films/one-eye-open/',
  },
];

export default function PressList() {
  return (
    <ul className="grid gap-6 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item.outlet} className="flex flex-col justify-between border border-zinc-800 bg-zinc-900/50 p-6">
          <div>
            <p className="font-display text-xl tracking-wide text-white">{item.outlet}</p>
            {item.critic && (
              <p className="mt-1 text-xs uppercase tracking-widest text-zinc-500">{item.critic}</p>
            )}
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">{item.summary}</p>
          </div>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1 text-sm uppercase tracking-widest text-accent-light hover:text-accent"
          >
            Read more ↗
          </a>
        </li>
      ))}
    </ul>
  );
}
