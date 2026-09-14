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
      className={`p-4 flex flex-col ${
        highlighted ? 'border-2 border-accent' : 'border border-white/15'
      }`}
    >
      <p className="text-sm font-medium mb-3">{name}</p>
      <ul className="text-xs text-blue-100 mb-4 space-y-1 flex-1">
        {features.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      <Button variant={highlighted ? 'primary' : 'secondary'}>{cta}</Button>
    </div>
  );
}
