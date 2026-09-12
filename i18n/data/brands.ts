export type BrandSlug = 'big' | 'marica' | 'strive' | 'red-designer';

export const brandSlugs: BrandSlug[] = ['big', 'marica', 'strive', 'red-designer'];

type BrandContent = {
  name: string;
  sector: string;
  description: string;
};

type Locale = 'fr' | 'en' | 'pt-br';

export const brands: Record<Locale, Record<BrandSlug, BrandContent>> = {
  fr: {
    big: {
      name: 'BIG (Best Impact Group)',
      sector: 'Technologie & accessoires connectés',
      description:
        "BIG (Best Impact Group) est votre allié technologique de confiance, spécialisé dans les appareils et accessoires qui rendent votre quotidien plus fluide et connecté. Nous avons conçu une identité chaleureuse et dynamique qui place l'utilisateur au cœur de l'innovation, transformant chaque achat en une expérience simple, humaine et accessible.",
    },
    marica: {
      name: 'MARICA',
      sector: 'Agroalimentaire & gastronomie haïtienne',
      description:
        "MARICA est une entreprise d'excellence dédiée à l'art culinaire et à la valorisation des saveurs authentiques haïtiennes. Notre mission a consisté à professionnaliser l'image de produits traditionnels pour les propulser vers un marché haut de gamme, en fusionnant l'esthétique artisanale avec un design institutionnel moderne.",
    },
    strive: {
      name: 'STRIVE',
      sector: 'Développement web & marketing digital',
      description:
        "STRIVE est une agence de pointe spécialisée dans le développement web et le marketing digital, conçue pour transformer l'ambition en résultats concrets. Nous avons bâti une identité visuelle forte et institutionnelle qui reflète la puissance de l'innovation.",
    },
    'red-designer': {
      name: 'RÈD DESIGNER',
      sector: 'E-commerce / Textile — Print on Demand',
      description:
        "RÈD DESIGNER est une plateforme e-commerce lancée en avril 2026, spécialisée dans le textile et les accessoires en Print On Demand. Ce système, porté par l'énergie du rouge, assure une cohérence de marque percutante, du catalogue numérique jusqu'au packaging final.",
    },
  },
  en: {
    big: {
      name: 'BIG (Best Impact Group)',
      sector: 'Technology & connected accessories',
      description:
        'BIG (Best Impact Group) is your trusted technology partner, specializing in devices and accessories that make everyday life smoother and more connected. We designed a warm, dynamic identity that puts the user at the heart of innovation, turning every purchase into a simple, human, and accessible experience.',
    },
    marica: {
      name: 'MARICA',
      sector: 'Food & Haitian gastronomy',
      description:
        'MARICA is a company of excellence dedicated to culinary art and the celebration of authentic Haitian flavors. Our mission was to professionalize the image of traditional products to elevate them to a premium market, blending artisanal aesthetics with modern institutional design.',
    },
    strive: {
      name: 'STRIVE',
      sector: 'Web development & digital marketing',
      description:
        'STRIVE is a cutting-edge agency specializing in web development and digital marketing, built to turn ambition into concrete results. We built a strong, institutional visual identity that reflects the power of innovation.',
    },
    'red-designer': {
      name: 'RÈD DESIGNER',
      sector: 'E-commerce / Textile — Print on Demand',
      description:
        'RÈD DESIGNER is an e-commerce platform launched in April 2026, specializing in Print on Demand apparel and accessories. Driven by the energy of red, this system ensures striking brand consistency, from the digital catalog to the final packaging.',
    },
  },
  'pt-br': {
    big: {
      name: 'BIG (Best Impact Group)',
      sector: 'Tecnologia e acessórios conectados',
      description:
        'A BIG (Best Impact Group) é sua parceira tecnológica de confiança, especializada em dispositivos e acessórios que tornam o dia a dia mais fluido e conectado. Desenvolvemos uma identidade calorosa e dinâmica que coloca o usuário no centro da inovação.',
    },
    marica: {
      name: 'MARICA',
      sector: 'Alimentação e gastronomia haitiana',
      description:
        'A MARICA é uma empresa de excelência dedicada à arte culinária e à valorização dos sabores autênticos haitianos. Nossa missão foi profissionalizar a imagem de produtos tradicionais para projetá-los a um mercado premium.',
    },
    strive: {
      name: 'STRIVE',
      sector: 'Desenvolvimento web e marketing digital',
      description:
        'A STRIVE é uma agência de ponta especializada em desenvolvimento web e marketing digital, criada para transformar ambição em resultados concretos. Construímos uma identidade visual forte e institucional.',
    },
    'red-designer': {
      name: 'RÈD DESIGNER',
      sector: 'E-commerce / Têxtil — Print on Demand',
      description:
        'A RÈD DESIGNER é uma plataforma de e-commerce lançada em abril de 2026, especializada em têxteis e acessórios em Print on Demand. Impulsionado pela energia do vermelho, esse sistema garante consistência de marca do catálogo até a embalagem final.',
    },
  },
};
