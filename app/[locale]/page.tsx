import fr from '../../i18n/dictionaries/fr.json';
import en from '../../i18n/dictionaries/en.json';
import ptBr from '../../i18n/dictionaries/pt-br.json';
import PageShell from '../../components/ui/PageShell';
import Container from '../../components/ui/Container';
import Button from '../../components/ui/Button';

const dictionaries = { fr, en, 'pt-br': ptBr };

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const dict =
    dictionaries[locale as keyof typeof dictionaries] ?? dictionaries.fr;

  return (
    <PageShell variant="dark">
      <Container className="text-center py-16">
        <h1 className="font-display text-2xl font-medium mb-4">
          {dict.hero.title}
        </h1>
        <p className="text-sm text-blue-100 mb-6">{dict.hero.subtitle}</p>
        <Button variant="primary">{dict.hero.cta}</Button>
      </Container>
    </PageShell>
  );
}
