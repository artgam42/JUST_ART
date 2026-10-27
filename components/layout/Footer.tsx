import Link from 'next/link';
import { getSocialLinks } from '../../lib/social';

type NavDict = {
  home: string;
  portfolio: string;
  training: string;
  about: string;
  contact: string;
};

type FooterDict = {
  tagline: string;
  copyright: string;
};

export default function Footer({
  locale,
  nav,
  footer,
  variant = 'dark',
}: {
  locale: string;
  nav: NavDict;
  footer: FooterDict;
  variant?: 'dark' | 'light';
}) {
  const border = variant === 'dark' ? 'border-white/10' : 'border-black/10';
  const muted = variant === 'dark' ? 'text-blue-100' : 'text-gray-500';

  return (
    <footer className={`border-t ${border} px-4 py-10 text-center text-xs ${muted}`}>
      <p className="mb-4 uppercase tracking-wider font-medium">{footer.tagline}</p>
      <nav className="flex justify-center gap-4 sm:gap-6 mb-4 flex-wrap font-medium">
        <Link href={`/${locale}`} className="text-[#0000ff] hover:opacity-80 transition-opacity">
          {nav.home}
        </Link>
        <Link href={`/${locale}/portfolio`} className="text-[#0000ff] hover:opacity-80 transition-opacity">
          {nav.portfolio}
        </Link>
        <Link href={`/${locale}/apropos`} className="text-[#0000ff] hover:opacity-80 transition-opacity">
          {nav.about}
        </Link>
        <Link href={`/${locale}/contact`} className="text-[#0000ff] hover:opacity-80 transition-opacity">
          {nav.contact}
        </Link>
      </nav>
      <div className="flex justify-center gap-3 mb-4">
        {getSocialLinks(locale).map((s) => (
          <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer">
            {s.name}
          </a>
        ))}
      </div>
      <p>{footer.copyright}</p>
    </footer>
  );
}
