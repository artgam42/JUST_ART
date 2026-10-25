import type { Metadata } from 'next';
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
const WHATSAPP_NUMBER = '5511927282400';

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
    title: dict.seo.contact.title,
    description: dict.seo.contact.description,
    alternates: {
      languages: {
        fr: '/fr/contact',
        en: '/en/contact',
        'pt-br': '/pt-br/contact',
      },
    },
    openGraph: {
      title: dict.seo.contact.title,
      description: dict.seo.contact.description,
      locale,
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDict(locale);
  const t = dict.contactPage;

  return (
    <PageShell variant="light">
      <Header locale={locale} nav={dict.nav} variant="light" />

      <Container className="py-12">
        <h1 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wider text-[#0000ff] mb-2">{t.title}</h1>
        <p className="text-sm text-gray-600 mb-10">{t.intro}</p>

        <ContactForm dict={t.form} />

        <div className="mt-12 pt-8 border-t border-navy/10 flex flex-col md:flex-row items-center justify-center gap-20">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-xs text-gray-500 uppercase tracking-wide">
              {t.whatsapp.title} :
            </span>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors text-sm"
            >
              {t.whatsapp.button}
            </a>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-xs text-gray-500 uppercase tracking-wide">
              {t.social.title} :
            </span>
            <div className="flex gap-4 text-sm text-navy font-medium">
              <a
                href="https://www.facebook.com/share/1Dc45vY5xv/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com/just.art.agency"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://www.tiktok.com/@just.art.agency"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                TikTok
              </a>
            </div>
          </div>
        </div>
      </Container>

      <Footer locale={locale} nav={dict.nav} footer={dict.footer} variant="light" />
    </PageShell>
  );
}
