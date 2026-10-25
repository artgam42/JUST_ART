import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import fr from '../../../../../i18n/dictionaries/fr.json';
import en from '../../../../../i18n/dictionaries/en.json';
import ptBr from '../../../../../i18n/dictionaries/pt-br.json';
import { locales } from '../../../../../i18n/config';
import type { Locale } from '../../../../../i18n/config';
import { brands, brandSlugs, type BrandSlug } from '../../../../../i18n/data/brands';
import { getBrandImages, getBrandVideos } from '../../../../../lib/portfolio-images';
import PageShell from '../../../../../components/ui/PageShell';
import Container from '../../../../../components/ui/Container';
import Header from '../../../../../components/layout/Header';
import Footer from '../../../../../components/layout/Footer';
import BrandGallery from '../../../../../components/portfolio/BrandGallery';

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
  const videos = getBrandVideos(slug);

  return (
    <PageShell variant="light">
      <Header locale={locale} nav={dict.nav} variant="light" />

      {/* Sou-meni navigasyon brand yo */}
      <div className="bg-navy text-white border-b border-white/10">
        <Container className="py-3 flex items-center gap-4 sm:gap-6">
          {/* Ti flèch retour vè portfolio */}
          <Link
            href={`/${locale}/portfolio`}
            className="inline-flex items-center justify-center text-white/80 hover:text-[#0000ff] transition-colors shrink-0"
            aria-label={dict.portfolioPage.backToPortfolio}
            title={dict.portfolioPage.backToPortfolio}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </Link>

          <span className="w-px h-4 bg-white/20 shrink-0" aria-hidden="true" />

          {/* Lis brand yo kòm lyen dirèk */}
          <nav className="flex items-center gap-4 sm:gap-6 overflow-x-auto py-1">
            {brandSlugs.map((bSlug) => {
              const isActive = bSlug === slug;
              return (
                <Link
                  key={bSlug}
                  href={`/${locale}/portfolio/branding/${bSlug}`}
                  className={`whitespace-nowrap transition-colors tracking-wide text-xs sm:text-sm font-medium ${
                    isActive
                      ? 'text-[#0000ff]'
                      : 'text-white/70 hover:text-white'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {bSlug === 'big' ? (
                    <>
                      <span className="hidden sm:inline">BIG (Best Impact Group)</span>
                      <span className="sm:hidden">BIG</span>
                    </>
                  ) : (
                    brands[localeKey][bSlug].name
                  )}
                </Link>
              );
            })}
          </nav>
        </Container>
      </div>

      <Container className="py-10">
        <h1 className="font-display text-xl font-medium mb-1">{brand.name}</h1>
        <p className="text-sm text-gray-500 mb-6">{brand.sector}</p>
        <p className="text-sm leading-relaxed mb-8">{brand.description}</p>

        {images.length > 0 && <BrandGallery images={images} />}

        {videos.length > 0 && (
          <div className="flex flex-col gap-8 mb-12">
            {videos.map((vid) => (
              <div key={vid.src} className="w-full bg-black border border-black/10 overflow-hidden shadow-sm">
                <video
                  src={vid.src}
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full h-auto block"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            ))}
          </div>
        )}

        {images.length === 0 && videos.length === 0 && (
          <p className="text-sm text-gray-500 border border-navy/10 p-6 text-center mb-8">
            {dict.portfolioPage.emptyState}
          </p>
        )}
      </Container>

      <Footer locale={locale} nav={dict.nav} footer={dict.footer} variant="light" />
    </PageShell>
  );
}
