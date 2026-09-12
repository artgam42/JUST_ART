import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales } from '../../i18n/config';
import React from 'react';
import '../globals.css';

// 1️⃣  FUNCTION: pa async → Next.js espere yon array senkron
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// 2️⃣  METADATA (pa chanje)
export const metadata: Metadata = {
  title: 'JUST ART',
  description: "L'art parle là où les mots ne suffisent plus.",
};

// 3️⃣  LAYOUT COMPONENT – dwe tip `LayoutProps<"/[locale]">`
//    • Pran `children` + `params`.
//    • Dekonstrui `locale` soti nan `params`.
//    • Verifiye ke `locale` egziste nan `locales` sinon `notFound()`.
export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  // Asire locale valab
  if (!locales.includes(locale as (typeof locales)[number])) notFound();

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
