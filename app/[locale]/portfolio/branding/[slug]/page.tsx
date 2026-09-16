import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import fr from '../../../../../i18n/dictionaries/fr.json';
import en from '../../../../../i18n/dictionaries/en.json';
import ptBr from '../../../../../i18n/dictionaries/pt-br.json';
import { locales } from '../../../../../i18n/config';
import type { Locale } from '../../../../../i18n/config';
import { brands, brandSlugs, type BrandSlug } from '../../../../../i18n/data/brands';
import { getBrandImages } from '../../../../../lib/portfolio-images';
import PageShell from '../../../../../components/ui/PageShell';
import Container from '../../../../../components/ui/Container';
import Button from '../../../../../components/ui/Button';
import Header from '../../../../../components/layout/Header';
import Footer from '../../../../../components/layout/Footer';

const dictionaries = { fr, en, 'pt-br': ptBr };

export function generateStaticParams() {
  return locales.flatMap((locale) => brandSlugs.map((slug) => ({ locale, slug })));
}

function resolveLocale(locale: string): Locale {
  return (locales as readonly string[]).includes(locale) ? (locale as Locale) : 'fr';
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!brandSlugs.includes(slug as BrandSlug)) return {};

  const localeKey = resolveLocale(locale);
  const brand = brands[localeKey][slug as BrandSlug];
  const title = `${brand.name} — JUST ART`;

  return {
    title,
    description: brand.description.slice(0, 155),
    alternates: {
      languages: {
        fr: `/fr/portfolio/branding/${slug}`,
        en: `/en/portfolio/branding/${slug}`,
        'pt-br': `/pt-br/portfolio/branding/${slug}`,
      },
    },
    openGraph: { title, description: brand.description.slice(0, 155), locale },
  };
}

export default async function BrandDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const localeKey = resolveLocale(locale);

  if (!brandSlugs.includes(slug as BrandSlug)) notFound();

  const dict = dictionaries[localeKey];
  const brand = brands[localeKey][slug as BrandSlug];
  const images = getBrandImages(slug);

  return (
    <PageShell variant="light">
      <Header locale={locale} nav={dict.nav} variant="light" />

      <div className="bg-navy text-white px-4 py-3 text-sm">
        <Button href={`/${locale}/portfolio`} variant="secondary">
          &larr; Voltar ao portfólio
        </Button>
      </div>

      <Container className="py-10">
        <h1 className="font-display text-xl font-medium mb-1">{brand.name}</h1>
        <p className="text-sm text-gray-500 mb-6">{brand.sector}</p>
        <p className="text-sm leading-relaxed mb-8">{brand.description}</p>

        {images.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 mb-8">
            {images.map((img) => (
              <div key={img.src} className="relative w-full aspect-square bg-gray-100">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 640px) 50vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 border border-navy/10 p-6 text-center mb-8">
            {dict.portfolioPage.emptyState}
          </p>
        )}

        <Button href={`/${locale}/portfolio`} variant="secondary">
          Voltar ao portfólio
        </Button>
      </Container>

      <Footer locale={locale} nav={dict.nav} footer={dict.footer} variant="light" />
    </PageShell>
  );
}
