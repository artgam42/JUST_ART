import fr from '../../../i18n/dictionaries/fr.json';
import en from '../../../i18n/dictionaries/en.json';
import ptBr from '../../../i18n/dictionaries/pt-br.json';
import type { Locale } from '../../../i18n/config';
import PageShell from '../../../components/ui/PageShell';
import Container from '../../../components/ui/Container';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import ApplicationForm from '../../../components/forms/ApplicationForm';

const dictionaries = { fr, en, 'pt-br': ptBr };

export default async function FormationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const localeKey = (['fr', 'en', 'pt-br'].includes(locale) ? locale : 'fr') as Locale;
  const dict = dictionaries[localeKey];
  const t = dict.trainingPage;

  return (
    <PageShell variant="dark">
      <Header locale={locale} nav={dict.nav} />

      <Container className="py-12">
        <h1 className="font-display text-xl font-medium mb-4">{t.title}</h1>
        <p className="text-sm text-blue-100 mb-10 max-w-md">{t.intro}</p>

        <p className="text-xs text-blue-100 mb-3 uppercase tracking-wide">
          {t.howItWorksTitle}
        </p>
        <ul className="text-sm space-y-2 mb-10 list-disc list-inside text-blue-100 max-w-md">
          {t.howItWorks.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <p className="text-xs text-blue-100 mb-3 uppercase tracking-wide">{t.whoTitle}</p>
        <p className="text-sm mb-10 max-w-md">{t.who}</p>

        <p className="text-xs text-blue-100 mb-4 uppercase tracking-wide">{t.form.submit}</p>
        <ApplicationForm dict={t.form} />
      </Container>

      <Footer locale={locale} nav={dict.nav} footer={dict.footer} />
    </PageShell>
  );
}
