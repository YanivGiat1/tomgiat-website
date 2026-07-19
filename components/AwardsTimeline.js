'use client';

import { useEffect, useMemo, useState } from 'react';
import Papa from 'papaparse';
import { useLanguage } from '@/lib/i18n';

// Paste the published Google Sheet CSV URL here:
// Google Sheet > File > Share > Publish to web > select the awards
// sheet/tab > format "Comma-separated values (.csv)" > Publish.
// Expected columns (header row): year, award_he, award_en, status_he,
// status_en, presenter_he, presenter_en, amount, description_he,
// description_en, href, featured ("yes" on the one row to highlight).
const AWARDS_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vSsUd0h5YkG6pV2vzDB41Rd5hCC_45iB9PmNZbDrP0YtBTEWuUKnm0PiUHH06pf7V9W8MAAXaFp-DJU/pub?gid=1727794486&single=true&output=csv';

function field(row, base, locale) {
  const localized = locale === 'he' ? row[`${base}_he`] : row[`${base}_en`];
  const fallback = row[`${base}_he`] || row[`${base}_en`];
  return localized || fallback || '';
}

function AwardEntry({ item, locale, isLast }) {
  const status = field(item, 'status', locale);
  const presenter = field(item, 'presenter', locale);
  const description = field(item, 'description', locale);
  const meta = [status, presenter].filter(Boolean).join(' — ');

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <span
          className={`mt-1.5 flex-shrink-0 rounded-full ${
            item.featured ? 'h-3.5 w-3.5 bg-sage-dark' : 'h-2.5 w-2.5 bg-sage'
          }`}
        />
        {!isLast && <span className="mt-1 w-px flex-1 bg-ink-300" />}
      </div>
      <div className={`pb-10 ${item.featured ? 'border border-sage/40 bg-sage/10 p-5' : ''}`}>
        {item.year && <p className="text-xs uppercase tracking-widest text-sage-dark">{item.year}</p>}
        <p className="mt-1 font-display text-2xl tracking-wide text-ink-950">{field(item, 'award', locale)}</p>
        {(meta || item.amount) && (
          <p className="mt-1 text-sm text-ink-600">
            {meta}
            {item.amount ? (meta ? ` (${item.amount})` : item.amount) : ''}
          </p>
        )}
        {description && <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-600">{description}</p>}
        {item.href && (
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-sm uppercase tracking-widest text-sage-dark hover:text-sage"
          >
            ↗
          </a>
        )}
      </div>
    </div>
  );
}

export default function AwardsTimeline() {
  const { locale, t } = useLanguage();
  const [status, setStatus] = useState('loading');
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (!AWARDS_CSV_URL) {
      setStatus('error');
      return;
    }

    let cancelled = false;
    setStatus('loading');

    fetch(AWARDS_CSV_URL)
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
          .map((row) => ({
            year: (row.year || '').trim(),
            award_he: (row.award_he || '').trim(),
            award_en: (row.award_en || '').trim(),
            status_he: (row.status_he || '').trim(),
            status_en: (row.status_en || '').trim(),
            presenter_he: (row.presenter_he || '').trim(),
            presenter_en: (row.presenter_en || '').trim(),
            amount: (row.amount || '').trim(),
            description_he: (row.description_he || '').trim(),
            description_en: (row.description_en || '').trim(),
            href: (row.href || '').trim(),
            featured: (row.featured || '').trim().toLowerCase() === 'yes',
          }))
          .filter((row) => row.award_he || row.award_en);

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
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return (Number(b.year) || 0) - (Number(a.year) || 0);
      }),
    [rows]
  );

  if (status === 'loading') {
    return <p className="text-ink-400">{t.awards.loading}</p>;
  }

  if (status === 'error') {
    return <p className="text-ink-400">{t.awards.error}</p>;
  }

  if (sorted.length === 0) {
    return <p className="text-ink-400">{t.awards.empty}</p>;
  }

  return (
    <div>
      {sorted.map((item, i) => (
        <AwardEntry
          key={`${item.year}-${item.award_he || item.award_en}-${i}`}
          item={item}
          locale={locale}
          isLast={i === sorted.length - 1}
        />
      ))}
    </div>
  );
}
