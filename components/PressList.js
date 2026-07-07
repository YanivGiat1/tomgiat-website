'use client';

import { useLanguage } from '@/lib/i18n';

export default function PressList() {
  const { t } = useLanguage();

  return (
    <ul className="grid gap-6 sm:grid-cols-2">
      {t.oneEyeOpen.press.map((item) => (
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
            {t.oneEyeOpen.pressReadMore}
          </a>
        </li>
      ))}
    </ul>
  );
}
