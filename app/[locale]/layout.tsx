import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GoogleAnalytics } from '@next/third-parties/google';
import { locales } from '../../i18n/config';
import '../globals.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// ⚠️ Ranplase ak domèn final la lè w achte l (egzanp: https://justart.agency)
export const metadata: Metadata = {
  metadataBase: new URL('https://justart-agency.vercel.app'),
  title: 'JUST ART',
  description: "L'art parle là où les mots ne suffisent plus.",
};

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// export default function LocaleLayout({
//   children,
//   params: { locale },
// }: {
//   children: React.ReactNode;
//   params: { locale: string };
// }) {
//   if (!locales.includes(locale as (typeof locales)[number])) notFound();

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as (typeof locales)[number])) notFound();

  return (
    <html lang={locale}>
      <head>
        <link
          rel="preload"
          href="/fonts/CreatoDisplay-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/CreatoDisplay-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
      {/* Si varyab la pa configire, GA pa chaje ditou — pa gen erè */}
      {GA_MEASUREMENT_ID && <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />}
    </html>
  );
}
