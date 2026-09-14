import fr from '../../../i18n/dictionaries/fr.json';
import en from '../../../i18n/dictionaries/en.json';
import ptBr from '../../../i18n/dictionaries/pt-br.json';
import { brands, brandSlugs } from '../../../i18n/data/brands';
import type { Locale } from '../../../i18n/config';
import PageShell from '../../../components/ui/PageShell';
import Container from '../../../components/ui/Container';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import PortfolioGrid from '../../../components/portfolio/PortfolioGrid';

const dictionaries = { fr, en, 'pt-br': ptBr };

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const localeKey = (['fr', 'en', 'pt-br'].includes(locale) ? locale : 'fr') as Locale;
  const dict = dictionaries[localeKey];
  const localeBrands = brands[localeKey];

  const brandList = brandSlugs.map((slug) => ({
    slug,
    name: localeBrands[slug].name,
  }));

  return (
    <PageShell variant="dark">
      <Header locale={locale} nav={dict.nav} />

      <Container className="py-10">
        <h1 className="font-display text-xl font-medium mb-2">
          {dict.portfolioPage.title}
        </h1>
        <p className="text-sm text-blue-100 mb-8">{dict.portfolioPage.intro}</p>

        <PortfolioGrid
          locale={locale}
          categories={dict.portfolioPage.categories}
          brands={brandList}
          emptyState={dict.portfolioPage.emptyState}
        />
      </Container>

      <Footer locale={locale} nav={dict.nav} footer={dict.footer} />
    </PageShell>
  );
}
