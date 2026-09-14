'use client';

import { useState } from 'react';
import Link from 'next/link';
import Tag from '../ui/Tag';

type Category = { key: string; label: string };
type Brand = { slug: string; name: string };

export default function PortfolioGrid({
  locale,
  categories,
  brands,
  emptyState,
}: {
  locale: string;
  categories: Category[];
  brands: Brand[];
  emptyState: string;
}) {
  const [active, setActive] = useState(categories[0]?.key ?? 'branding');

  return (
    <div>
      <div className="flex gap-2 flex-wrap mb-8">
        {categories.map((cat) => (
          <button key={cat.key} type="button" onClick={() => setActive(cat.key)}>
            <Tag active={active === cat.key}>{cat.label}</Tag>
          </button>
        ))}
      </div>

      {active === 'branding' ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {brands.map((b) => (
            <Link
              key={b.slug}
              href={`/${locale}/portfolio/branding/${b.slug}`}
              className="bg-white text-navy p-4 text-sm hover:opacity-90"
            >
              {b.name}
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-sm text-blue-100 border border-white/15 p-6 text-center">
          {emptyState}
        </p>
      )}
    </div>
  );
}
