import Image from 'next/image';

type Item = { title: string; description: string };

// Icônes dans /public (même ordre que whyChooseUs.items dans les dictionnaires)
const icons = [
  '/multidisci.png', // Multidisciplinarité
  '/collab.png', // Collaboration d'experts
  '/artistique.png', // Originalité artistique
  '/profession.png', // Professionnalisme
];

export default function WhyChooseList({ items }: { items: Item[] }) {
  return (
    // Laptop (≥1024px) : bloc limité à 4xl (896px) et centré. Mobile/tablette : pleine largeur.
    <ul className="lg:max-w-4xl lg:mx-auto">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <li key={item.title} className="flex items-start gap-5 sm:gap-8">
            <Image
              src={icons[i]}
              alt=""
              width={60}
              height={60}
              className="h-12 w-12 sm:h-[60px] sm:w-[60px] shrink-0"
            />
            <div
              className={`flex-1 ${isLast ? '' : 'mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-white/40'
                }`}
            >
              <h3 className="font-display text-xl sm:text-2xl font-medium text-white leading-tight">
                {item.title}
              </h3>
              <p className="mt-1 text-sm sm:text-base font-light text-white">
                {item.description}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
