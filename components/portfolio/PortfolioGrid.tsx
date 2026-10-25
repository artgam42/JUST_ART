'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Tag from '../ui/Tag';
import ImageLightbox from '../ui/ImageLightbox';
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
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const images = active !== 'branding' ? categoryImages[active] ?? [] : [];

  return (
    <div>
      <div className="flex gap-2 flex-wrap mb-8">
        {categories.map((cat) => (
          <button
            key={cat.key}
            type="button"
            onClick={() => {
              setActive(cat.key);
              setSelectedImageIndex(null);
            }}
          >
            <Tag active={active === cat.key}>{cat.label}</Tag>
          </button>
        ))}
      </div>

      {active === 'branding' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {brands.map((b) => (
            <Link
              key={b.slug}
              href={`/${locale}/portfolio/branding/${b.slug}`}
              className="group block"
            >
              {b.cover ? (
                <div className="overflow-hidden bg-white/5 border border-white/10 group-hover:border-white/30 transition-all duration-300">
                  <Image
                    src={b.cover.src}
                    alt={b.cover.alt}
                    width={800}
                    height={500}
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              ) : (
                <div className="p-12 border border-white/10 bg-white/5 flex items-center justify-center">
                  <span className="text-white/60 text-sm">JUST ART</span>
                </div>
              )}
              <p className="mt-3 text-base sm:text-lg font-medium text-white group-hover:text-blue-200 transition-colors">
                {b.name}
              </p>
            </Link>
          ))}
        </div>
      ) : images.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {images.map((img, idx) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setSelectedImageIndex(idx)}
              className="relative w-full aspect-square bg-white/5 cursor-zoom-in group overflow-hidden block focus:outline-none"
              aria-label={`Agrandir ${img.alt || 'l\'image'}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors pointer-events-none" />
            </button>
          ))}
        </div>
      ) : (
        <p className="text-sm text-blue-100 border border-white/15 p-6 text-center">
          {emptyState}
        </p>
      )}

      {/* Lightbox Modal preview */}
      <ImageLightbox
        images={images}
        currentIndex={selectedImageIndex ?? 0}
        isOpen={selectedImageIndex !== null}
        onClose={() => setSelectedImageIndex(null)}
        onNavigate={(nextIdx) => setSelectedImageIndex(nextIdx)}
      />
    </div>
  );
}
