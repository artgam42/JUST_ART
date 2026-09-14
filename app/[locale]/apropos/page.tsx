import fr from '../../../i18n/dictionaries/fr.json';
import en from '../../../i18n/dictionaries/en.json';
import ptBr from '../../../i18n/dictionaries/pt-br.json';
import type { Locale } from '../../../i18n/config';
import PageShell from '../../../components/ui/PageShell';
import Container from '../../../components/ui/Container';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';

const dictionaries = { fr, en, 'pt-br': ptBr };

export default async function AproposPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const localeKey = (['fr', 'en', 'pt-br'].includes(locale) ? locale : 'fr') as Locale;
  const dict = dictionaries[localeKey];
  const t = dict.aboutPage;

  return (
    <PageShell variant="dark">
      <Header locale={locale} nav={dict.nav} />

      <Container className="py-12 max-w-xl">
        <p className="text-sm text-blue-100 mb-10">{t.intro}</p>

        <p className="text-xs text-blue-100 mb-3 uppercase tracking-wide">{t.goalsTitle}</p>
        <p className="text-sm mb-3">{t.goalsIntro}</p>
        <ul className="text-sm space-y-2 mb-4 list-disc list-inside text-blue-100">
          {t.goals.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
        <p className="text-sm mb-10">{t.goalsClosing}</p>

        <p className="text-xs text-blue-100 mb-3 uppercase tracking-wide">{t.storyTitle}</p>
        <p className="text-sm mb-10">{t.story}</p>

        <p className="text-xs text-blue-100 mb-3 uppercase tracking-wide">{t.modelTitle}</p>
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

        <p className="text-xs text-blue-100 mb-3 uppercase tracking-wide">{t.commitmentTitle}</p>
        <p className="text-sm">{t.commitment}</p>
      </Container>

      <Footer locale={locale} nav={dict.nav} footer={dict.footer} />
    </PageShell>
  );
}
