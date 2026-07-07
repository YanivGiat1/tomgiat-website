'use client';

import { useLanguage } from '@/lib/i18n';

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div dir="ltr" className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => setLocale('he')}
        aria-pressed={locale === 'he'}
        className={`rounded px-2 py-1 text-xs transition-colors ${
          locale === 'he' ? 'bg-accent text-white' : 'text-zinc-400 hover:text-white'
        }`}
      >
        🇮🇱 {t.common.langHe}
      </button>
      <button
        type="button"
        onClick={() => setLocale('en')}
        aria-pressed={locale === 'en'}
        className={`rounded px-2 py-1 text-xs transition-colors ${
          locale === 'en' ? 'bg-accent text-white' : 'text-zinc-400 hover:text-white'
        }`}
      >
        🇬🇧 {t.common.langEn}
      </button>
    </div>
  );
}
