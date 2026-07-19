'use client';

import { useState } from 'react';

export default function PlaceholderImage({
  src,
  alt = '',
  label = 'Image',
  className = '',
  showLabel = true,
  priority = false,
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-cream-300 ${className}`}>
      {!failed && src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {(failed || !src) && showLabel && (
        <div className="absolute inset-0 flex items-center justify-center border border-ink-300">
          <span className="px-4 text-center text-xs uppercase tracking-widest text-ink-400">
            {label}
          </span>
        </div>
      )}
    </div>
  );
}
