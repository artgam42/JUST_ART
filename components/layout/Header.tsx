'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type NavDict = {
  home: string;
  portfolio: string;
  training: string;
  about: string;
  contact: string;
};

const languages = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
  { code: 'pt-br', label: 'PT' },
];

export default function Header({
  locale,
  nav,
  variant = 'dark',
}: {
  locale: string;
  nav: NavDict;
  variant?: 'dark' | 'light';
}) {
  const [open, setOpen] = useState(false);
  const border = variant === 'dark' ? 'border-white/10' : 'border-black/10';
  const bg = variant === 'dark' ? 'bg-navy' : 'bg-white';

  // Fon fonse (navy) → logo an blan. Fon blan → logo an navy.
  const logoSrc = variant === 'dark' ? '/logo-white.svg' : '/logo-navy.svg';

  const links = [
    { href: `/${locale}`, label: nav.home },
    { href: `/${locale}/portfolio`, label: nav.portfolio },
    { href: `/${locale}/formation`, label: nav.training },
    { href: `/${locale}/apropos`, label: nav.about },
    { href: `/${locale}/contact`, label: nav.contact },
  ];

  return (
    <header className={`relative border-b ${border} text-sm`}>
      <div className="flex items-center justify-between px-4 py-3">
        <Link href={`/${locale}`} onClick={() => setOpen(false)}>
          <Image
            src={logoSrc}
            alt="JUST ART"
            width={120}
            height={32}
            priority
            className="h-8 w-auto"
          />
        </Link>

        <nav className="hidden sm:flex gap-4 text-xs">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex gap-2 text-xs">
            {languages.map((l) => (
              <Link
                key={l.code}
                href={`/${l.code}`}
                className={l.code === locale ? 'font-medium' : 'opacity-60'}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            className="sm:hidden text-xs border border-current px-2 py-1"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Menu"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {open && (
        <nav className={`sm:hidden flex flex-col border-t ${border} ${bg} text-xs`}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-4 py-3 border-b border-current/10"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
