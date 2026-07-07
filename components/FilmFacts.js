const facts = [
  ['Director', 'Tom Giat'],
  ['Producer', 'Ohad Milstein'],
  ['Runtime', '55 min'],
  ['Genre', 'Documentary'],
  ['Country', 'Israel'],
  ['Year', '2026'],
  ['Language', 'Hebrew (English subtitles)'],
];

export default function FilmFacts() {
  return (
    <dl className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
      {facts.map(([term, value]) => (
        <div key={term} className="border-b border-zinc-800 pb-3">
          <dt className="text-xs uppercase tracking-widest text-zinc-500">{term}</dt>
          <dd className="mt-1 text-lg text-zinc-100">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
