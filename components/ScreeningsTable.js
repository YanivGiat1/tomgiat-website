'use client';

import { useEffect, useMemo, useState } from 'react';
import Papa from 'papaparse';
import { useLanguage } from '@/lib/i18n';

// Paste the published Google Sheet CSV URL here:
// Google Sheet > File > Share > Publish to web > select the screenings
// sheet/tab > format "Comma-separated values (.csv)" > Publish.
// Expected columns (header row): city_he, city_en, venue_he, venue_en,
// date (YYYY-MM-DD), time (HH:MM, optional), note_he, note_en, ticketUrl.
const SHEET_CSV_URL = '';

function parseDateTime(dateStr, timeStr) {
  return new Date(`${dateStr}T${timeStr || '00:00'}:00`);
}

function isValidDateTime(d) {
  return d instanceof Date && !Number.isNaN(d.getTime());
}

function formatDate(dateStr) {
  const [y, m, d] = (dateStr || '').split('-');
  if (!y || !m || !d) return dateStr || '';
  return `${d}.${m}.${y}`;
}

function TicketAction({ ticketUrl, t }) {
  const hasTicket = typeof ticketUrl === 'string' && ticketUrl.startsWith('http');

  if (!hasTicket) {
    return <span className="text-xs uppercase tracking-widest text-zinc-600">{t.screenings.comingSoon}</span>;
  }

  return (
    <a
      href={ticketUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block whitespace-nowrap border border-accent px-4 py-1.5 text-xs uppercase tracking-widest text-accent-light transition-colors hover:bg-accent hover:text-white"
    >
      {t.screenings.ticketsCta}
    </a>
  );
}

function ScreeningsList({ list, faded, locale, t }) {
  const field = (row, base) => {
    const localized = locale === 'he' ? row[`${base}_he`] : row[`${base}_en`];
    const fallback = row[`${base}_he`] || row[`${base}_en`];
    return localized || fallback || '';
  };

  return (
    <>
      <table className="hidden w-full border-collapse md:table">
        <thead>
          <tr className="border-b border-zinc-800 text-xs uppercase tracking-widest text-zinc-500">
            <th className="py-3 text-start font-normal">{t.screenings.headers.city}</th>
            <th className="py-3 text-start font-normal">{t.screenings.headers.venue}</th>
            <th className="py-3 text-start font-normal">{t.screenings.headers.date}</th>
            <th className="py-3 text-start font-normal">{t.screenings.headers.time}</th>
            <th className="py-3 text-start font-normal">{t.screenings.headers.note}</th>
            <th className="py-3 text-start font-normal">{t.screenings.headers.tickets}</th>
          </tr>
        </thead>
        <tbody>
          {list.map((s, i) => (
            <tr key={`${s.date}-${s.venue_he}-${i}`} className={`border-b border-zinc-900 ${faded ? 'opacity-50' : ''}`}>
              <td className="py-4 font-display text-lg text-white">{field(s, 'city')}</td>
              <td className="py-4 text-zinc-300">{field(s, 'venue')}</td>
              <td className="py-4 text-zinc-400">{formatDate(s.date)}</td>
              <td className="py-4 text-zinc-400">{s.time || '—'}</td>
              <td className="py-4 text-sm text-zinc-500">{field(s, 'note')}</td>
              <td className="py-4"><TicketAction ticketUrl={s.ticketUrl} t={t} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="space-y-4 md:hidden">
        {list.map((s, i) => (
          <div
            key={`${s.date}-${s.venue_he}-${i}`}
            className={`border border-zinc-800 bg-zinc-900/50 p-4 ${faded ? 'opacity-50' : ''}`}
          >
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-display text-xl text-white">{field(s, 'city')}</span>
              <span className="whitespace-nowrap text-sm text-zinc-400">
                {formatDate(s.date)}
                {s.time ? ` · ${s.time}` : ''}
              </span>
            </div>
            <p className="mt-1 text-sm text-zinc-300">{field(s, 'venue')}</p>
            {field(s, 'note') && <p className="mt-1 text-xs text-zinc-500">{field(s, 'note')}</p>}
            <div className="mt-3">
              <TicketAction ticketUrl={s.ticketUrl} t={t} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default function ScreeningsTable() {
  const { locale, t } = useLanguage();
  const [status, setStatus] = useState('loading');
  const [rows, setRows] = useState([]);
  const [now, setNow] = useState(null);
  const [showPast, setShowPast] = useState(false);

  useEffect(() => {
    setNow(new Date());
  }, []);

  useEffect(() => {
    if (!SHEET_CSV_URL) {
      setStatus('error');
      return;
    }

    let cancelled = false;
    setStatus('loading');

    fetch(SHEET_CSV_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((csvText) => {
        if (cancelled) return;
        const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });
        const cleaned = (parsed.data || [])
          .map((row) => ({
            city_he: (row.city_he || '').trim(),
            city_en: (row.city_en || '').trim(),
            venue_he: (row.venue_he || '').trim(),
            venue_en: (row.venue_en || '').trim(),
            date: (row.date || '').trim(),
            time: (row.time || '').trim(),
            note_he: (row.note_he || '').trim(),
            note_en: (row.note_en || '').trim(),
            ticketUrl: (row.ticketUrl || '').trim(),
          }))
          .filter((row) => row.date && isValidDateTime(parseDateTime(row.date, row.time)));

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
    () => [...rows].sort((a, b) => parseDateTime(a.date, a.time) - parseDateTime(b.date, b.time)),
    [rows]
  );

  const upcoming = now ? sorted.filter((r) => parseDateTime(r.date, r.time) >= now) : sorted;
  const past = now ? sorted.filter((r) => parseDateTime(r.date, r.time) < now) : [];

  if (status === 'loading') {
    return <p className="text-zinc-500">{t.screenings.loading}</p>;
  }

  if (status === 'error') {
    return <p className="text-zinc-500">{t.screenings.error}</p>;
  }

  return (
    <div>
      {upcoming.length > 0 ? (
        <ScreeningsList list={upcoming} faded={false} locale={locale} t={t} />
      ) : (
        <p className="text-zinc-500">{t.screenings.noneUpcoming}</p>
      )}

      {past.length > 0 && (
        <div className="mt-8">
          <button
            type="button"
            onClick={() => setShowPast(!showPast)}
            className="text-xs uppercase tracking-widest text-zinc-500 hover:text-zinc-300"
          >
            {showPast ? t.screenings.hidePast : t.screenings.showPast.replace('{count}', String(past.length))}
          </button>
          {showPast && (
            <div className="mt-4">
              <ScreeningsList list={past} faded locale={locale} t={t} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
