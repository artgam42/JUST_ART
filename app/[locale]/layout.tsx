import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales } from '../../i18n/config';
import '../globals.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'JUST ART',
  description: "L'art parle là où les mots ne suffisent plus.",
};

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as (typeof locales)[number])) notFound();

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
