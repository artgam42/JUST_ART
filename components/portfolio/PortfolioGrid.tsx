'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Tag from '../ui/Tag';
import type { PortfolioImage } from '../../lib/portfolio-images';

type Category = { key: string; label: string };
type Brand = { slug: string; name: string; cover: PortfolioImage | null };

export default function PortfolioGrid({
  locale,
  categories,
  brands,
  categoryImages,
  emptyState,
}: {
  locale: string;
  categories: Category[];
  brands: Brand[];
  categoryImages: Record<string, PortfolioImage[]>;
  emptyState: string;
}) {
  const [active, setActive] = useState(categories[0]?.key ?? 'branding');
  const images = active !== 'branding' ? categoryImages[active] ?? [] : [];

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
              className="block bg-white text-navy hover:opacity-90"
            >
              {b.cover ? (
                <>
                  <div className="relative w-full aspect-square">
                    <Image
                      src={b.cover.src}
                      alt={b.cover.alt}
                      fill
                      sizes="(min-width: 768px) 25vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <p className="p-2 text-xs">{b.name}</p>
                </>
              ) : (
                <p className="p-4 text-sm">{b.name}</p>
              )}
            </Link>
          ))}
        </div>
      ) : images.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {images.map((img) => (
            <div key={img.src} className="relative w-full aspect-square bg-white/5">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover"
              />
            </div>
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
