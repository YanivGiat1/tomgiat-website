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
    <div className={`relative overflow-hidden bg-zinc-900 ${className}`}>
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
        <div className="absolute inset-0 flex items-center justify-center border border-zinc-800">
          <span className="px-4 text-center text-xs uppercase tracking-widest text-zinc-600">
            {label}
          </span>
        </div>
      )}
    </div>
  );
}
