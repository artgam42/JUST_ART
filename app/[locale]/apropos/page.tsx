import type { Metadata } from 'next';
import fr from '../../../i18n/dictionaries/fr.json';
import en from '../../../i18n/dictionaries/en.json';
import ptBr from '../../../i18n/dictionaries/pt-br.json';
import type { Locale } from '../../../i18n/config';
import PageShell from '../../../components/ui/PageShell';
import Container from '../../../components/ui/Container';
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

      <Container className="py-12 max-w-2xl">
        <p className="text-sm sm:text-base text-blue-100 mb-8 leading-relaxed">{t.intro}</p>

        {/* 3 poto mitan (Pillars) */}
        <div className="space-y-4 mb-12">
          {dict.pillars.map((p) => (
            <div key={p.title} className="border border-white/15 p-5">
              <h3 className="font-display text-base sm:text-lg font-bold uppercase text-[#0000ff] mb-2">
                {p.title}
              </h3>
              <p className="text-sm text-blue-100 leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>

        <h2 className="font-display text-lg sm:text-xl font-bold uppercase tracking-wider text-[#0000ff] mb-3">{t.goalsTitle}</h2>
        <p className="text-sm mb-3">{t.goalsIntro}</p>
        <ul className="text-sm space-y-2 mb-4 list-disc list-inside text-blue-100">
          {t.goals.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
        <p className="text-sm mb-10">{t.goalsClosing}</p>

        <h2 className="font-display text-lg sm:text-xl font-bold uppercase tracking-wider text-[#0000ff] mb-3">{t.storyTitle}</h2>
        <p className="text-sm mb-10 leading-relaxed">{t.story}</p>

        <h2 className="font-display text-lg sm:text-xl font-bold uppercase tracking-wider text-[#0000ff] mb-3">{t.modelTitle}</h2>
        <p className="text-sm mb-3">{t.modelIntro}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {t.levels.map((lvl) => (
            <div key={lvl.title} className="border border-white/15 p-4">
              <p className="text-sm font-medium mb-1">{lvl.title}</p>
              <p className="text-xs text-blue-100">{lvl.description}</p>
            </div>
          ))}
        </div>
        <p className="text-sm mb-10">{t.modelClosing}</p>

        <h2 className="font-display text-lg sm:text-xl font-bold uppercase tracking-wider text-[#0000ff] mb-3">{t.commitmentTitle}</h2>
        <p className="text-sm leading-relaxed">{t.commitment}</p>
      </Container>

      <Footer locale={locale} nav={dict.nav} footer={dict.footer} />
    </PageShell>
  );
}
