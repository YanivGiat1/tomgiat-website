'use client';

import { useLanguage } from '@/lib/i18n';

export default function TrailerEmbed({ youtubeId, driveFileId }) {
  const { t } = useLanguage();

  if (!youtubeId && !driveFileId) {
    return (
      <div className="flex aspect-video w-full items-center justify-center border border-zinc-800 bg-zinc-900">
        <div className="text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-zinc-700 text-zinc-500">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 translate-x-0.5">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <p className="text-xs uppercase tracking-widest text-zinc-500">{t.oneEyeOpen.trailerComingSoon}</p>
        </div>
      </div>
    );
  }

  const src = youtubeId
    ? `https://www.youtube.com/embed/${youtubeId}`
    : `https://drive.google.com/file/d/${driveFileId}/preview`;

  return (
    <div className="aspect-video w-full overflow-hidden border border-zinc-800">
      <iframe
        className="h-full w-full"
        src={src}
        title="One Eye Open — Official Trailer"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
