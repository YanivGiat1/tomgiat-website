'use client';

import Link from 'next/link';
import SocialLinks from './SocialLinks';
import { useLanguage } from '@/lib/i18n';

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-300 bg-cream-200">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="font-display text-xl tracking-wider text-ink-950">{t.common.siteTitle}</p>
            <p className="mt-1 text-sm text-ink-400">{t.footer.tagline}</p>
          </div>

          <nav className="flex gap-6 text-sm uppercase tracking-widest text-ink-600">
            <Link href="/" className="hover:text-sage-dark">{t.nav.home}</Link>
            <Link href="/one-eye-open" className="hover:text-sage-dark">{t.nav.film}</Link>
            <Link href="/about" className="hover:text-sage-dark">{t.nav.about}</Link>
          </nav>

          <SocialLinks />
        </div>

        <p className="mt-8 border-t border-ink-300 pt-6 text-xs text-ink-400">
          © {year} {t.common.siteTitle}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
