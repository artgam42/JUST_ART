import fs from 'fs';
import path from 'path';

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

export type PortfolioImage = {
  src: string;
  alt: string;
};

function isImageFile(filename: string): boolean {
  return IMAGE_EXTENSIONS.includes(path.extname(filename).toLowerCase());
}

// "mockup-1.jpg" -> "Mockup 1" — itilize kòm alt-text pa defo si youn pa espesifye
function filenameToAlt(filename: string): string {
  const base = filename.replace(/\.[^/.]+$/, '');
  return base.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function getImagesInFolder(relativeFolder: string): PortfolioImage[] {
  const fullPath = path.join(process.cwd(), 'public', relativeFolder);
  if (!fs.existsSync(fullPath)) return [];

  return fs
    .readdirSync(fullPath)
    .filter(isImageFile)
    .sort()
    .map((filename) => ({
      src: `/${relativeFolder}/${filename}`,
      alt: filenameToAlt(filename),
    }));
}

const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.mov'];

export type PortfolioVideo = {
  src: string;
  name: string;
};

function isVideoFile(filename: string): boolean {
  return VIDEO_EXTENSIONS.includes(path.extname(filename).toLowerCase());
}

export function getBrandVideos(slug: string): PortfolioVideo[] {
  const relativeFolder = `portfolio/branding/${slug}`;
  const fullPath = path.join(process.cwd(), 'public', relativeFolder);
  if (!fs.existsSync(fullPath)) return [];

  return fs
    .readdirSync(fullPath)
    .filter(isVideoFile)
    .sort()
    .map((filename) => ({
      src: `/${relativeFolder}/${filename}`,
      name: filenameToAlt(filename),
    }));
}

export function getBrandImages(slug: string): PortfolioImage[] {
  return getImagesInFolder(`portfolio/branding/${slug}`);
}

export function getCategoryImages(
  category: 'logo' | 'flyer' | 'banner' | 'autres'
): PortfolioImage[] {
  return getImagesInFolder(`portfolio/${category}`);
}
