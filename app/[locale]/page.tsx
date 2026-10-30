import { Fragment } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import fr from '../../i18n/dictionaries/fr.json';
import en from '../../i18n/dictionaries/en.json';
import ptBr from '../../i18n/dictionaries/pt-br.json';
import { brands, brandSlugs } from '../../i18n/data/brands';
import { getBrandImages } from '../../lib/portfolio-images';
import type { Locale } from '../../i18n/config';
import PageShell from '../../components/ui/PageShell';
import Container from '../../components/ui/Container';
import Button from '../../components/ui/Button';
import ServiceTags from '../../components/ui/ServiceTags';
import WhyChooseList from '../../components/ui/WhyChooseList';
import PackageCard from '../../components/ui/PackageCard';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

const dictionaries = { fr, en, 'pt-br': ptBr };

const pillarTitles: Record<Locale, Array<{ line1: string; line2: string }>> = {
  fr: [
    { line1: 'Soutien digital &', line2: 'création de contenu' },
    { line1: 'Accompagnement', line2: 'des entreprises' },
    { line1: 'Formation &', line2: 'mentorat' },
  ],
  en: [
    { line1: 'Digital support &', line2: 'content creation' },
    { line1: 'Business', line2: 'support' },
    { line1: 'Training &', line2: 'mentorship' },
  ],
  'pt-br': [
    { line1: 'Suporte digital &', line2: 'criação de conteúdo' },
    { line1: 'Acompanhamento', line2: 'empresarial' },
    { line1: 'Capacitação &', line2: 'mentoria' },
  ],
};

function getDict(locale: string) {
  const localeKey = (['fr', 'en', 'pt-br'].includes(locale) ? locale : 'fr') as Locale;
  return dictionaries[localeKey];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDict(locale);
  return {
    title: dict.seo.home.title,
    description: dict.seo.home.description,
    alternates: {
      languages: { fr: '/fr', en: '/en', 'pt-br': '/pt-br' },
    },
    openGraph: {
      title: dict.seo.home.title,
      description: dict.seo.home.description,
      locale,
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const localeKey = (['fr', 'en', 'pt-br'].includes(locale) ? locale : 'fr') as Locale;
  const dict = dictionaries[localeKey];
  const localeBrands = brands[localeKey];
  const featuredSlugs = brandSlugs.slice(0, 4);

  return (
    <PageShell variant="dark">
      <Header locale={locale} nav={dict.nav} />

      <Container className="text-center py-20 sm:py-28 lg:py-30 max-w-4xl mx-auto">
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase text-[#0000ff] tracking-tight leading-tight mb-6">
          {localeKey === 'fr' ? (
            <>
              L&apos;art parle<br className="sm:hidden" /> là où les mots<br />ne suffisent plus.
            </>
          ) : localeKey === 'pt-br' ? (
            <>
              A arte fala<br className="sm:hidden" /> onde as palavras<br />já não bastam.
            </>
          ) : (
            <>
              Art speaks<br className="sm:hidden" /> where words<br />no longer suffice.
            </>
          )}
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
          {dict.hero.subtitle}
        </p>
      </Container>

      <Container className="pb-16 sm:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-28">
          {dict.pillars.map((p, index) => (
            <div
              key={p.title}
              className="flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-3"
            >
              {/* Blue line */}
              <div
                className={`bg-[#1D00FF] shrink-0 order-2 md:order-1
            w-[80px] h-[6px] md:w-[6px] md:h-[40px]
            ${index === dict.pillars.length - 1 ? "hidden md:block" : ""}`}
              />

              {/* Title */}
              <h2 className="order-1 md:order-2 font-display text-xl sm:text-1xl font-bold uppercase tracking-wide text-[#ffffff] text-center md:text-left leading-snug">
                {p.title}
              </h2>
            </div>
          ))}
        </div>
      </Container>

      <Container className="py-16 sm:py-20 border-t border-white/10">
        <h2 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wider text-[#0000ff] mb-6">
          {dict.services.title}
        </h2>
        <ServiceTags items={dict.services.items} />
      </Container>

      <Container className="pb-16 sm:pb-20">
        <h2 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wider text-[#0000ff] mb-6">
          {dict.whyChooseUs.title}
        </h2>
        <WhyChooseList items={dict.whyChooseUs.items} />
      </Container>

      <Container className="pb-16 sm:pb-24">
        <h2 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wider text-[#0000ff] mb-2">
          {dict.portfolioTeaser.title}
        </h2>
        <p className="text-sm text-blue-100 mb-6">{dict.portfolioTeaser.intro}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {featuredSlugs.map((slug) => {
            const firstImage = getBrandImages(slug)[0];
            const brandName = localeBrands[slug].name;
            return (
              <Link
                key={slug}
                href={`/${locale}/portfolio/branding/${slug}`}
                className="group block bg-white text-navy overflow-hidden hover:opacity-95 transition-all duration-300"
              >
                <div className="relative aspect-[4/3] w-full bg-navy/5 overflow-hidden">
                  {firstImage ? (
                    <Image
                      src={firstImage.src}
                      alt={firstImage.alt || brandName}
                      fill
                      sizes="(min-width: 768px) 25vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-navy/40">
                      JUST ART
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-xs font-semibold truncate group-hover:text-[#0000ff] transition-colors">
                    {slug === 'big' ? 'BIG' : brandName}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
        <Button href={`/${locale}/portfolio`} variant="secondary">
          Portfolio
        </Button>
      </Container>

      <section className="bg-white text-navy py-16 sm:py-20 mb-0">
        <Container>
          <h2 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wider text-[#0000ff] mb-2">
            {dict.packages.title}
          </h2>
          <p className="text-xs text-gray-500 mb-8">{dict.packages.note}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dict.packages.items.map((pkg, i) => (
              <PackageCard
                key={pkg.name}
                name={pkg.name}
                features={pkg.features}
                cta={dict.packages.cta}
                highlighted={i === 1}
              />
            ))}
          </div>
        </Container>
      </section>

      <div className="bg-accent text-white py-8 px-4">
        <Container className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8 text-center">
          <p className="text-[17px] font-medium">{dict.finalCta.title}</p>
          <Button href={`/${locale}/contact`} variant="secondary" className="shrink-0">
            {dict.finalCta.cta}
          </Button>
        </Container>
      </div>

      <Footer locale={locale} nav={dict.nav} footer={dict.footer} />
    </PageShell>
  );
}
