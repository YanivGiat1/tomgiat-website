'use client';

import { useEffect, useState } from 'react';
import screenings from '@/data/screenings.json';

function parseDateTime(date, time) {
  return new Date(`${date}T${time || '00:00'}:00`);
}

function formatDate(dateStr) {
  const [y, m, d] = dateStr.split('-');
  return `${d}.${m}.${y}`;
}

function TicketAction({ ticketUrl }) {
  const hasTicket = typeof ticketUrl === 'string' && ticketUrl.startsWith('http');

  if (!hasTicket) {
    return <span className="text-xs uppercase tracking-widest text-zinc-600">בקרוב</span>;
  }

  return (
    <a
      href={ticketUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block whitespace-nowrap border border-accent px-4 py-1.5 text-xs uppercase tracking-widest text-accent-light transition-colors hover:bg-accent hover:text-white"
    >
      כרטיסים
    </a>
  );
}

function ScreeningsList({ list, faded }) {
  return (
    <>
      <table className="hidden w-full border-collapse text-right md:table">
        <thead>
          <tr className="border-b border-zinc-800 text-xs uppercase tracking-widest text-zinc-500">
            <th className="py-3 font-normal">עיר</th>
            <th className="py-3 font-normal">מקום</th>
            <th className="py-3 font-normal">תאריך</th>
            <th className="py-3 font-normal">שעה</th>
            <th className="py-3 font-normal">הערה</th>
            <th className="py-3 font-normal">כרטיסים</th>
          </tr>
        </thead>
        <tbody>
          {list.map((s, i) => (
            <tr key={`${s.date}-${s.venue}-${i}`} className={`border-b border-zinc-900 ${faded ? 'opacity-50' : ''}`}>
              <td className="py-4 font-display text-lg text-white">{s.city}</td>
              <td className="py-4 text-zinc-300">{s.venue}</td>
              <td className="py-4 text-zinc-400">{formatDate(s.date)}</td>
              <td className="py-4 text-zinc-400">{s.time || '—'}</td>
              <td className="py-4 text-sm text-zinc-500">{s.note}</td>
              <td className="py-4"><TicketAction ticketUrl={s.ticketUrl} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="space-y-4 md:hidden">
        {list.map((s, i) => (
          <div
            key={`${s.date}-${s.venue}-${i}`}
            className={`border border-zinc-800 bg-zinc-900/50 p-4 ${faded ? 'opacity-50' : ''}`}
          >
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-display text-xl text-white">{s.city}</span>
              <span className="whitespace-nowrap text-sm text-zinc-400">
                {formatDate(s.date)}
                {s.time ? ` · ${s.time}` : ''}
              </span>
            </div>
            <p className="mt-1 text-sm text-zinc-300">{s.venue}</p>
            {s.note && <p className="mt-1 text-xs text-zinc-500">{s.note}</p>}
            <div className="mt-3">
              <TicketAction ticketUrl={s.ticketUrl} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default function ScreeningsTable() {
  const [now, setNow] = useState(null);
  const [showPast, setShowPast] = useState(false);

  useEffect(() => {
    setNow(new Date());
  }, []);

  const sorted = [...screenings].sort(
    (a, b) => parseDateTime(a.date, a.time) - parseDateTime(b.date, b.time)
  );

  const upcoming = now ? sorted.filter((s) => parseDateTime(s.date, s.time) >= now) : sorted;
  const past = now ? sorted.filter((s) => parseDateTime(s.date, s.time) < now) : [];

  return (
    <div dir="rtl" lang="he">
      {upcoming.length > 0 ? (
        <ScreeningsList list={upcoming} faded={false} />
      ) : (
        <p className="text-zinc-500">אין הקרנות קרובות כרגע — עקבו אחרינו לעדכונים.</p>
      )}

      {past.length > 0 && (
        <div className="mt-8">
          <button
            type="button"
            onClick={() => setShowPast(!showPast)}
            className="text-xs uppercase tracking-widest text-zinc-500 hover:text-zinc-300"
          >
            {showPast ? 'הסתר הקרנות שעברו' : `הצג הקרנות שעברו (${past.length})`}
          </button>
          {showPast && (
            <div className="mt-4">
              <ScreeningsList list={past} faded />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
