import Button from './Button';

type Props = {
  name: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
};

export default function PackageCard({ name, features, cta, highlighted = false }: Props) {
  return (
    <div
      className={`p-6 flex flex-col bg-white text-navy ${
        highlighted ? 'border-2 border-accent shadow-sm' : 'border border-black/15'
      }`}
    >
      <p className="text-base font-bold mb-4 uppercase tracking-wide">{name}</p>
      <ul className="text-xs text-gray-600 mb-6 space-y-2 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <span className="text-[#0000ff] font-bold">•</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <Button variant={highlighted ? 'primary' : 'secondary'}>{cta}</Button>
    </div>
  );
}
