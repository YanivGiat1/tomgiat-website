'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/one-eye-open', label: 'One Eye Open' },
  { href: '/about', label: 'About' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-charcoal-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="font-display text-2xl tracking-wider text-white"
        >
          TOM GIAT
        </Link>

        <nav className="hidden gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm uppercase tracking-widest transition-colors hover:text-accent-light ${
                pathname === link.href ? 'text-accent-light' : 'text-zinc-300'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="flex flex-col gap-1.5 md:hidden"
        >
          <span className={`block h-0.5 w-6 bg-white transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-6 bg-white transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-white transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-zinc-800 bg-charcoal-950 px-4 pb-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`rounded px-2 py-3 text-sm uppercase tracking-widest ${
                pathname === link.href ? 'text-accent-light' : 'text-zinc-300'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
