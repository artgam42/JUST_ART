import Link from 'next/link';

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
  const border = variant === 'dark' ? 'border-white/10' : 'border-black/10';

  return (
    <header className={`flex items-center justify-between px-4 py-3 border-b ${border} text-sm`}>
      <Link href={`/${locale}`} className="font-display font-medium">
        JUST ART
      </Link>
      <nav className="hidden sm:flex gap-4 text-xs">
        <Link href={`/${locale}`}>{nav.home}</Link>
        <Link href={`/${locale}/portfolio`}>{nav.portfolio}</Link>
        <Link href={`/${locale}/formation`}>{nav.training}</Link>
        <Link href={`/${locale}/apropos`}>{nav.about}</Link>
        <Link href={`/${locale}/contact`}>{nav.contact}</Link>
      </nav>
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
    </header>
  );
}
