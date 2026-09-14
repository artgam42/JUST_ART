import fr from '../../../i18n/dictionaries/fr.json';
import en from '../../../i18n/dictionaries/en.json';
import ptBr from '../../../i18n/dictionaries/pt-br.json';
import type { Locale } from '../../../i18n/config';
import PageShell from '../../../components/ui/PageShell';
import Container from '../../../components/ui/Container';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import ContactForm from '../../../components/forms/ContactForm';

const dictionaries = { fr, en, 'pt-br': ptBr };

// ⚠️ Ranplase nimewo sa a ak vrè nimewo WhatsApp JUST ART la (fòma: kòd peyi + nimewo, san + ni espas)
const WHATSAPP_NUMBER = '50931274800';

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const localeKey = (['fr', 'en', 'pt-br'].includes(locale) ? locale : 'fr') as Locale;
  const dict = dictionaries[localeKey];
  const t = dict.contactPage;

  return (
    <PageShell variant="light">
      <Header locale={locale} nav={dict.nav} variant="light" />

      <Container className="py-12">
        <h1 className="font-display text-xl font-medium mb-2 text-navy">{t.title}</h1>
        <p className="text-sm text-gray-600 mb-10 max-w-md">{t.intro}</p>

        <ContactForm dict={t.form} />

        <div className="mt-12 pt-8 border-t border-navy/10">
          <p className="text-xs text-gray-500 mb-3 uppercase tracking-wide">
            {t.whatsapp.title}
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-accent text-white px-6 py-3 text-sm mb-8"
          >
            {t.whatsapp.button}
          </a>

          <p className="text-xs text-gray-500 mb-3 uppercase tracking-wide">
            {t.social.title}
          </p>
          <div className="flex gap-4 text-sm text-navy">
            <a
              href="https://www.facebook.com/share/1Dc45vY5xv/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/just.art.agency"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              href="https://www.tiktok.com/@just.art.agency"
              target="_blank"
              rel="noopener noreferrer"
            >
              TikTok
            </a>
          </div>
        </div>
      </Container>

      <Footer locale={locale} nav={dict.nav} footer={dict.footer} variant="light" />
    </PageShell>
  );
}
