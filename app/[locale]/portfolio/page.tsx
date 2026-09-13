import Link from 'next/link';
import { brands, brandSlugs } from '../../../i18n/data/brands';
import type { Locale } from '../../../i18n/config';
import PageShell from '../../../components/ui/PageShell';
import Container from '../../../components/ui/Container';
import Tag from '../../../components/ui/Tag';

const categories = ['Branding', 'Logo', 'Flyer', 'Banner', 'Autres designs'];

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const localeKey = (['fr', 'en', 'pt-br'].includes(locale) ? locale : 'fr') as Locale;
  const localeBrands = brands[localeKey];

  return (
    <PageShell variant="dark">
      <Container className="py-10">
        <h1 className="font-display text-xl font-medium mb-6">Portfolio</h1>

        <div className="flex gap-2 flex-wrap mb-8">
          {categories.map((cat, i) => (
            <Tag key={cat} active={i === 0}>
              {cat}
            </Tag>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {brandSlugs.map((slug) => {
            const brand = localeBrands[slug];
            return (
              <Link
                key={slug}
                href={`/${locale}/portfolio/branding/${slug}`}
                className="bg-white text-navy p-4 text-sm hover:opacity-90"
              >
                {brand.name}
              </Link>
            );
          })}
        </div>
      </Container>
    </PageShell>
  );
}
