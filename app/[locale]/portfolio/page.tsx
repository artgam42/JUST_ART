import type { Metadata } from 'next';
import fr from '../../../i18n/dictionaries/fr.json';
import en from '../../../i18n/dictionaries/en.json';
import ptBr from '../../../i18n/dictionaries/pt-br.json';
import { brands, brandSlugs } from '../../../i18n/data/brands';
import { getBrandImages, getCategoryImages } from '../../../lib/portfolio-images';
import type { Locale } from '../../../i18n/config';
import PageShell from '../../../components/ui/PageShell';
import Container from '../../../components/ui/Container';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import PortfolioGrid from '../../../components/portfolio/PortfolioGrid';

const dictionaries = { fr, en, 'pt-br': ptBr };

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
    title: dict.seo.portfolio.title,
    description: dict.seo.portfolio.description,
    alternates: {
      languages: { fr: '/fr/portfolio', en: '/en/portfolio', 'pt-br': '/pt-br/portfolio' },
    },
    openGraph: {
      title: dict.seo.portfolio.title,
      description: dict.seo.portfolio.description,
      locale,
    },
  };
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const localeKey = (['fr', 'en', 'pt-br'].includes(locale) ? locale : 'fr') as Locale;
  const dict = dictionaries[localeKey];
  const localeBrands = brands[localeKey];

  const brandList = brandSlugs.map((slug) => {
    const images = getBrandImages(slug);
    return {
      slug,
      name: localeBrands[slug].name,
      cover: images[0] ? { src: images[0].src, alt: localeBrands[slug].name } : null,
    };
  });

  const categoryImages = {
    logo: getCategoryImages('logo'),
    flyer: getCategoryImages('flyer'),
    banner: getCategoryImages('banner'),
    autres: getCategoryImages('autres'),
  };

  return (
    <PageShell variant="dark">
      <Header locale={locale} nav={dict.nav} />

      <Container className="py-10 max-w-4xl">
        <h1 className="font-display text-xl sm:text-2xl font-medium mb-2">
          {dict.portfolioPage.title}
        </h1>
        <p className="text-sm text-blue-100 mb-8">{dict.portfolioPage.intro}</p>

        <PortfolioGrid
          locale={locale}
          categories={dict.portfolioPage.categories}
          brands={brandList}
          categoryImages={categoryImages}
          emptyState={dict.portfolioPage.emptyState}
        />
      </Container>

      <Footer locale={locale} nav={dict.nav} footer={dict.footer} />
    </PageShell>
  );
}
