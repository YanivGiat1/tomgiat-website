'use client';

import { useLanguage } from '@/lib/i18n';

export default function FilmFacts() {
  const { t } = useLanguage();

  return (
    <dl className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
      {t.oneEyeOpen.facts.map(([term, value]) => (
        <div key={term} className="border-b border-zinc-800 pb-3">
          <dt className="text-xs uppercase tracking-widest text-zinc-500">{term}</dt>
          <dd className="mt-1 text-lg text-zinc-100">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
