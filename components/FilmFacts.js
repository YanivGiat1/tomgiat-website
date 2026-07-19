'use client';

import { useLanguage } from '@/lib/i18n';

export default function FilmFacts() {
  const { t } = useLanguage();

  return (
    <dl className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
      {t.oneEyeOpen.facts.map(([term, value]) => (
        <div key={term} className="border-b border-ink-300 pb-3">
          <dt className="text-xs uppercase tracking-widest text-ink-400">{term}</dt>
          <dd className="mt-1 font-display text-lg text-ink-950">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
