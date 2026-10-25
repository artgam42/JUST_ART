'use client';

import { useState } from 'react';
import Image from 'next/image';
import ImageLightbox from '../ui/ImageLightbox';
import type { PortfolioImage } from '../../lib/portfolio-images';

export default function BrandGallery({ images }: { images: PortfolioImage[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="flex flex-col gap-8 mb-12">
        {images.map((img, idx) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setSelectedIndex(idx)}
            className="w-full text-left bg-gray-50 border border-black/5 overflow-hidden group cursor-zoom-in relative focus:outline-none focus:ring-2 focus:ring-navy/50"
            aria-label={`Agrandir ${img.alt || 'l\'image'}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={1400}
              height={900}
              sizes="(min-width: 1280px) 1152px, 100vw"
              className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.01]"
            />
            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none flex items-end justify-end p-4">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-navy/85 text-white px-2.5 py-1 tracking-wider uppercase">
                Zoom ⤢
              </span>
            </div>
          </button>
        ))}
      </div>

      <ImageLightbox
        images={images}
        currentIndex={selectedIndex ?? 0}
        isOpen={selectedIndex !== null}
        onClose={() => setSelectedIndex(null)}
        onNavigate={(nextIdx) => setSelectedIndex(nextIdx)}
      />
    </>
  );
}
