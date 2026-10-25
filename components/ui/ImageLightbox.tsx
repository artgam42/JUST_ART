'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';

export type LightboxImage = {
  src: string;
  alt?: string;
};

export default function ImageLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: {
  images: LightboxImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (index: number) => void;
}) {
  const currentImage = images[currentIndex];

  const handlePrev = useCallback(() => {
    if (!onNavigate || images.length <= 1) return;
    onNavigate((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (!onNavigate || images.length <= 1) return;
    onNavigate((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  // Keyboard navigation (Escape, ArrowLeft, ArrowRight)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentImage) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image Preview"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 sm:p-8 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Top bar: counter & close button */}
      <div
        className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between text-white z-10 pointer-events-none"
      >
        <span className="text-xs sm:text-sm font-mono tracking-wider opacity-75 pointer-events-auto">
          {images.length > 1 ? `${currentIndex + 1} / ${images.length}` : ''}
        </span>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="pointer-events-auto p-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors border border-white/20 text-sm sm:text-base px-3 py-1.5"
        >
          ✕
        </button>
      </div>

      {/* Prev button */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          aria-label="Previous image"
          className="absolute left-2 sm:left-6 z-10 p-3 sm:p-4 text-white/80 hover:text-white bg-black/40 hover:bg-black/80 border border-white/15 transition-all text-lg sm:text-xl"
        >
          ‹
        </button>
      )}

      {/* Image container */}
      <div
        className="relative max-w-full max-h-[88vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={currentImage.src}
          alt={currentImage.alt || 'Preview'}
          width={1800}
          height={1200}
          priority
          className="max-h-[85vh] max-w-[92vw] w-auto h-auto object-contain select-none shadow-2xl"
        />
      </div>

      {/* Next button */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          aria-label="Next image"
          className="absolute right-2 sm:right-6 z-10 p-3 sm:p-4 text-white/80 hover:text-white bg-black/40 hover:bg-black/80 border border-white/15 transition-all text-lg sm:text-xl"
        >
          ›
        </button>
      )}
    </div>
  );
}
