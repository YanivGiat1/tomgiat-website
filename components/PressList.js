'use client';

import { useLanguage } from '@/lib/i18n';

function TimelineItem({ item, isLast }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <span className="mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-accent" />
        {!isLast && <span className="mt-1 w-px flex-1 bg-zinc-800" />}
      </div>
      <div className="pb-10">
        <p className="font-display text-xl tracking-wide text-white">{item.outlet}</p>
        {item.critic && (
          <p className="mt-1 text-xs uppercase tracking-widest text-zinc-500">{item.critic}</p>
        )}
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-300">{item.summary}</p>
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1 text-sm uppercase tracking-widest text-accent-light hover:text-accent"
        >
          {item.pressReadMore}
        </a>
      </div>
    </div>
  );
}

export default function PressList() {
  const { t } = useLanguage();
  const oeo = t.oneEyeOpen;
  const press = oeo.press.map((item) => ({ ...item, pressReadMore: oeo.pressReadMore }));

  const awardCoverage = press.filter((item) => item.group === 'award');
  const media = press.filter((item) => item.group !== 'award');

  return (
    <div>
      {awardCoverage.map((item, i) => (
        <TimelineItem
          key={item.outlet}
          item={item}
          isLast={i === awardCoverage.length - 1 && media.length === 0}
        />
      ))}

      {media.length > 0 && (
        <>
          <p className="mb-6 text-xs uppercase tracking-[0.3em] text-gold">{oeo.pressMediaHeading}</p>
          {media.map((item, i) => (
            <TimelineItem key={item.outlet} item={item} isLast={i === media.length - 1} />
          ))}
        </>
      )}
    </div>
  );
}
