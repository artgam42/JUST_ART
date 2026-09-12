import { notFound } from 'next/navigation';
import { locales } from '../../../../../i18n/config';
import type { Locale } from '../../../../../i18n/config';
import { brands, brandSlugs, type BrandSlug } from '../../../../../i18n/data/brands';
import PageShell from '../../../../../components/ui/PageShell';
import Container from '../../../../../components/ui/Container';
import Button from '../../../../../components/ui/Button';

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    brandSlugs.map((slug) => ({ locale, slug }))
  );
}

export default function BrandDetailPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  const localeKey = (locales as readonly string[]).includes(locale)
    ? (locale as Locale)
    : 'fr';

  if (!brandSlugs.includes(slug as BrandSlug)) notFound();

  const brand = brands[localeKey][slug as BrandSlug];

  return (
    <PageShell variant="light">
      <div className="bg-navy text-white px-4 py-3 text-sm">
        <Button href={`/${locale}/portfolio`} variant="secondary">
          &larr; Voltar ao portfólio
        </Button>
      </div>

      <Container className="py-10">
        <h1 className="font-display text-xl font-medium mb-1">{brand.name}</h1>
        <p className="text-sm text-gray-500 mb-6">{brand.sector}</p>
        <p className="text-sm leading-relaxed mb-8">{brand.description}</p>

        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="bg-gray-100 h-24" />
          <div className="bg-gray-100 h-24" />
          <div className="bg-gray-100 h-24" />
          <div className="bg-gray-100 h-24" />
        </div>

        <Button href={`/${locale}/portfolio`} variant="secondary">
          Voltar ao portfólio
        </Button>
      </Container>
    </PageShell>
  );
}
