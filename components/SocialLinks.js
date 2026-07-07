'use client';

import { useLanguage } from '@/lib/i18n';

const hrefs = {
  instagram: 'https://www.instagram.com/one_eye_open_film/',
  facebook: 'https://www.facebook.com/profile.php?id=61570643144493',
  linktree: 'https://linktr.ee/tomgiat',
};

export default function SocialLinks({ className = '' }) {
  const { t } = useLanguage();

  const links = [
    { key: 'instagram', label: t.social.instagram, href: hrefs.instagram },
    { key: 'facebook', label: t.social.facebook, href: hrefs.facebook },
    { key: 'linktree', label: t.social.linktree, href: hrefs.linktree },
  ];

  return (
    <div className={`flex gap-5 text-sm uppercase tracking-widest text-zinc-400 ${className}`}>
      {links.map((link) => (
        <a
          key={link.key}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-accent-light"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
