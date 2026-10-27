import type { Metadata } from 'next';
import fr from '../../../i18n/dictionaries/fr.json';
import en from '../../../i18n/dictionaries/en.json';
import ptBr from '../../../i18n/dictionaries/pt-br.json';
import type { Locale } from '../../../i18n/config';
import PageShell from '../../../components/ui/PageShell';
import Link from 'next/link';
import Container from '../../../components/ui/Container';
import Button from '../../../components/ui/Button';
import WhyChooseList from '../../../components/ui/WhyChooseList';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';

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
    title: dict.seo.about.title,
    description: dict.seo.about.description,
    alternates: {
      languages: {
        fr: '/fr/apropos',
        en: '/en/apropos',
        'pt-br': '/pt-br/apropos',
      },
    },
    openGraph: {
      title: dict.seo.about.title,
      description: dict.seo.about.description,
      locale,
    },
  };
}

export default async function AproposPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDict(locale);
  const t = dict.aboutPage;

  return (
    <PageShell variant="dark">
      <Header locale={locale} nav={dict.nav} />

      <Container className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wider text-[#0000ff] mb-6">
            {dict.nav.about}
          </h1>
          <p className="text-base sm:text-lg text-white leading-relaxed mb-14">{t.intro}</p>

          <h2 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wider text-[#0000ff] mb-4">
            {t.storyTitle}
          </h2>
          <p className="text-base text-blue-100 leading-relaxed mb-14">{t.story}</p>

          <h2 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wider text-[#0000ff] mb-6">
            {dict.whyChooseUs.title}
          </h2>
          <div className="mb-14">
            <WhyChooseList items={dict.whyChooseUs.items} />
          </div>

          <h2 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wider text-[#0000ff] mb-4">
            {t.modelTitle}
          </h2>
          <p className="text-base text-blue-100 mb-6">{t.modelIntro}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {t.levels.map((lvl) => (
              <div key={lvl.title} className="border border-white/25 p-5">
                <p className="font-display text-lg font-medium text-white mb-1">{lvl.title}</p>
                <p className="text-sm text-blue-100 leading-relaxed">{lvl.description}</p>
              </div>
            ))}
          </div>
          <p className="text-base text-blue-100 mb-14">{t.modelClosing}</p>

          <h2 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wider text-[#0000ff] mb-4">
            {t.commitmentTitle}
          </h2>
          <p className="text-base text-blue-100 leading-relaxed mb-4">{t.commitment}</p>
          <Link
            href={`/${locale}/portfolio`}
            className="inline-block text-sm font-medium text-white underline underline-offset-4 hover:opacity-80 transition-opacity"
          >
            {t.portfolioLink} →
          </Link>
        </div>
      </Container>

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
