import Link from 'next/link';
import SocialLinks from './SocialLinks';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-charcoal-950">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="font-display text-xl tracking-wider text-white">TOM GIAT</p>
            <p className="mt-1 text-sm text-zinc-500">Documentary filmmaker</p>
          </div>

          <nav className="flex gap-6 text-sm uppercase tracking-widest text-zinc-400">
            <Link href="/" className="hover:text-accent-light">Home</Link>
            <Link href="/one-eye-open" className="hover:text-accent-light">One Eye Open</Link>
            <Link href="/about" className="hover:text-accent-light">About</Link>
          </nav>

          <SocialLinks />
        </div>

        <p className="mt-8 border-t border-zinc-900 pt-6 text-xs text-zinc-600">
          © {new Date().getFullYear()} Tom Giat. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
