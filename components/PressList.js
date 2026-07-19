'use client';

import { useEffect, useMemo, useState } from 'react';
import Papa from 'papaparse';
import { useLanguage } from '@/lib/i18n';

// Paste the published Google Sheet CSV URL here:
// Google Sheet > File > Share > Publish to web > select the press
// sheet/tab > format "Comma-separated values (.csv)" > Publish.
// Expected columns (header row): date (YYYY-MM-DD, optional), outlet_he,
// outlet_en, critic_he, critic_en (optional), group ("award" or "media"),
// summary_he, summary_en, href.
const PRESS_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vSsUd0h5YkG6pV2vzDB41Rd5hCC_45iB9PmNZbDrP0YtBTEWuUKnm0PiUHH06pf7V9W8MAAXaFp-DJU/pub?gid=662154318&single=true&output=csv';

function field(row, base, locale) {
  const localized = locale === 'he' ? row[`${base}_he`] : row[`${base}_en`];
  const fallback = row[`${base}_he`] || row[`${base}_en`];
  return localized || fallback || '';
}

function PressCard({ item, locale, t }) {
  const critic = field(item, 'critic', locale);

  return (
    <div className="flex h-full flex-col border border-ink-300 bg-cream-100 p-5">
      <span className="self-start text-xs uppercase tracking-widest text-sage-dark">
        {item.group === 'award' ? t.oneEyeOpen.pressAwardHeading : t.oneEyeOpen.pressMediaHeading}
      </span>
      <p className="mt-3 font-display text-xl tracking-wide text-ink-950">{field(item, 'outlet', locale)}</p>
      {critic && <p className="mt-1 text-xs uppercase tracking-widest text-ink-400">{critic}</p>}
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">{field(item, 'summary', locale)}</p>
      {item.href && (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1 self-start text-sm uppercase tracking-widest text-sage-dark hover:text-sage"
        >
          {t.oneEyeOpen.pressReadMore}
        </a>
      )}
    </div>
  );
}

export default function PressList() {
  const { locale, t } = useLanguage();
  const [status, setStatus] = useState('loading');
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (!PRESS_CSV_URL) {
      setStatus('error');
      return;
    }

    let cancelled = false;
    setStatus('loading');

    fetch(PRESS_CSV_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((csvText) => {
        if (cancelled) return;
        const parsed = Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (header) => header.trim(),
        });
        const cleaned = (parsed.data || [])
          .map((row, i) => ({
            order: i,
            date: (row.date || '').trim(),
            outlet_he: (row.outlet_he || '').trim(),
            outlet_en: (row.outlet_en || '').trim(),
            critic_he: (row.critic_he || '').trim(),
            critic_en: (row.critic_en || '').trim(),
            group: (row.group || '').trim().toLowerCase() === 'award' ? 'award' : 'media',
            summary_he: (row.summary_he || '').trim(),
            summary_en: (row.summary_en || '').trim(),
            href: (row.href || '').trim(),
          }))
          .filter((row) => row.outlet_he || row.outlet_en);

        setRows(cleaned);
        setStatus('ready');
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const sorted = useMemo(
    () =>
      [...rows].sort((a, b) => {
        if (a.date && b.date) return b.date.localeCompare(a.date);
        if (a.date !== b.date) return a.date ? -1 : 1;
        return a.order - b.order;
      }),
    [rows]
  );

  if (status === 'loading') {
    return <p className="text-ink-400">{t.press.loading}</p>;
  }

  if (status === 'error') {
    return <p className="text-ink-400">{t.press.error}</p>;
  }

  if (sorted.length === 0) {
    return <p className="text-ink-400">{t.press.empty}</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {sorted.map((item) => (
        <PressCard key={`${item.outlet_he}-${item.order}`} item={item} locale={locale} t={t} />
      ))}
    </div>
  );
}
