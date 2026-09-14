import fr from '../../i18n/dictionaries/fr.json';
import en from '../../i18n/dictionaries/en.json';
import ptBr from '../../i18n/dictionaries/pt-br.json';
import { brands, brandSlugs } from '../../i18n/data/brands';
import type { Locale } from '../../i18n/config';
import PageShell from '../../components/ui/PageShell';
import Container from '../../components/ui/Container';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import PackageCard from '../../components/ui/PackageCard';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Link from 'next/link';

const dictionaries = { fr, en, 'pt-br': ptBr };

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

      <Container className="text-center py-16">
        <h1 className="font-display text-2xl font-medium mb-4">{dict.hero.title}</h1>
        <p className="text-sm text-blue-100 mb-6">{dict.hero.subtitle}</p>
        <Button variant="primary">{dict.hero.cta}</Button>
      </Container>

      <Container className="pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {dict.pillars.map((p) => (
            <Card key={p.title} title={p.title} description={p.description} />
          ))}
        </div>
      </Container>

      <Container className="pb-12">
        <p className="text-xs text-blue-100 mb-3 uppercase tracking-wide">
          {dict.services.title}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {dict.services.items.map((s) => (
            <Card key={s.title} title={s.title} description={s.description} />
          ))}
        </div>
      </Container>

      <Container className="pb-12">
        <p className="text-xs text-blue-100 mb-3 uppercase tracking-wide">
          {dict.whyChooseUs.title}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {dict.whyChooseUs.items.map((w) => (
            <Card key={w.title} title={w.title} description={w.description} />
          ))}
        </div>
      </Container>

      <Container className="pb-12">
        <p className="text-xs text-blue-100 mb-3 uppercase tracking-wide">
          {dict.portfolioTeaser.title}
        </p>
        <p className="text-sm mb-4">{dict.portfolioTeaser.intro}</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {featuredSlugs.map((slug) => (
            <Link
              key={slug}
              href={`/${locale}/portfolio/branding/${slug}`}
              className="bg-white text-navy p-4 text-xs hover:opacity-90"
            >
              {localeBrands[slug].name}
            </Link>
          ))}
        </div>
        <Button href={`/${locale}/portfolio`} variant="secondary">
          {dict.portfolioTeaser.cta}
        </Button>
      </Container>

      <Container className="pb-12">
        <p className="text-xs text-blue-100 mb-1 uppercase tracking-wide">
          {dict.packages.title}
        </p>
        <p className="text-xs text-blue-100/70 mb-4">{dict.packages.note}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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

      <div className="bg-accent text-white text-center py-10 px-4">
        <p className="text-sm mb-4">{dict.finalCta.title}</p>
        <Button href={`/${locale}/contact`} variant="secondary">
          {dict.finalCta.cta}
        </Button>
      </div>

      <Footer locale={locale} nav={dict.nav} footer={dict.footer} />
    </PageShell>
  );
}
