export default function Card({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="border border-white/15 p-4 text-center">
      <p className="text-sm font-medium mb-1">{title}</p>
      <p className="text-xs text-blue-100">{description}</p>
    </div>
  );
}
