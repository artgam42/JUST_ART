'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

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

  const pathname = usePathname();

  // Lyen aktif : Akèy = egzak ; lòt yo = menm chemen oswa sou-paj (ex. /portfolio/branding/big)
  const isActive = (href: string) =>
    href === `/${locale}` ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  // Fon fonse (navy) → logo an blan. Fon blan → logo an navy.
  const logoSrc = variant === 'dark' ? '/logo-white.png' : '/logo-navy.png';

  const links = [
    { href: `/${locale}`, label: nav.home },
    { href: `/${locale}/portfolio`, label: nav.portfolio },
    { href: `/${locale}/apropos`, label: nav.about },
    { href: `/${locale}/contact`, label: nav.contact },
  ];

  return (
    <header className={`sticky top-0 z-50 border-b ${border} ${bg}`}>
      {/*
        Griy 3 kolòn : [1fr spacer] [auto logo+nav] [1fr lang/hamburger]
        Desktop : logo+nav santre, lang sou dwat
        Mobile  : spacer invisible (kenbe ekilib), logo santre, hamburger sou dwat
      */}
      <div className="relative flex items-center px-4 py-3">

        {/* Logo + Nav — absoliman santre (fonksyone sou tout taman) */}
        <div className="absolute inset-x-0 flex justify-center pointer-events-none">
          <div className="flex items-center gap-6 pointer-events-auto">
            <Link href={`/${locale}`} onClick={() => setOpen(false)}>
              <Image
                src={logoSrc}
                alt="JUST ART"
                width={98}
                height={26}
                priority
                className="h-[26px] w-auto object-contain"
              />
            </Link>

            <nav className="hidden sm:flex gap-6 text-base">
              {links.map((l) => (
                <Link key={l.href} href={l.href} className={isActive(l.href) ? 'text-[#0000ff]' : 'hover:opacity-75 transition-opacity'}>
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Mobile: spacer goch invisible — ekilib hamburger pou logo rete santre */}
        <div className="sm:hidden invisible text-sm border border-current px-2.5 py-1">
          ☰
        </div>

        {/* Lang switcher (desktop) + Hamburger (mobile) — toujou sou dwat */}
        <div className="ml-auto flex items-center gap-3">
          <div className="hidden sm:flex gap-2.5 text-sm font-medium">
            {languages.map((l) => (
              <Link
                key={l.code}
                href={`/${l.code}`}
                className={l.code === locale ? 'opacity-100 font-semibold' : 'opacity-60 hover:opacity-100 transition-opacity'}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            className="sm:hidden text-sm border border-current px-2.5 py-1"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Menu"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Meni mobile : lyen nav + lang switcher anba */}
      {open && (
        <nav className={`sm:hidden flex flex-col border-t ${border} ${bg} text-base`}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={`px-4 py-3 border-b border-current/10 ${isActive(l.href) ? 'text-[#0000ff]' : ''}`} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}

          {/* Lang switcher — anba lis la, nan menm meni hamburger a */}
          <div className="flex gap-5 px-4 py-3 text-sm font-medium">
            {languages.map((l) => (
              <Link
                key={l.code}
                href={`/${l.code}`}
                className={l.code === locale ? 'opacity-100 font-semibold' : 'opacity-60'}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
