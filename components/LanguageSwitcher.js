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
          locale === 'he' ? 'bg-sage text-cream-100' : 'text-ink-400 hover:text-ink-950'
        }`}
      >
        🇮🇱 {t.common.langHe}
      </button>
      <button
        type="button"
        onClick={() => setLocale('en')}
        aria-pressed={locale === 'en'}
        className={`rounded px-2 py-1 text-xs transition-colors ${
          locale === 'en' ? 'bg-sage text-cream-100' : 'text-ink-400 hover:text-ink-950'
        }`}
      >
        🇬🇧 {t.common.langEn}
      </button>
    </div>
  );
}
