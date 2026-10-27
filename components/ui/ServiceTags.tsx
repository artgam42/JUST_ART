export default function ServiceTags({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2.5 sm:gap-3">
      {items.map((item) => (
        <li
          key={item}
          className="grow border border-white/25 px-3 py-1.5 sm:px-4 sm:py-2 text-center whitespace-nowrap text-sm sm:text-base md:text-lg font-medium text-white leading-tight"
        >
          {item}
        </li>
      ))}
      {/* Remplisseur invisible : absorbe l'espace libre de la dernière ligne,
          donc les tags de cette ligne gardent leur taille naturelle. */}
      <li
        aria-hidden="true"
        className="grow-[999] basis-0 -ml-2.5 sm:-ml-3 p-0"
      />
    </ul>
  );
}
