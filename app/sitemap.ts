import type { MetadataRoute } from 'next';
import { locales } from '../i18n/config';
import { brandSlugs } from '../i18n/data/brands';

const SITE_URL = 'https://justart-agency.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ['', '/portfolio', '/formation', '/apropos', '/contact'];
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: new Date(),
      });
    }
    for (const slug of brandSlugs) {
      entries.push({
        url: `${SITE_URL}/${locale}/portfolio/branding/${slug}`,
        lastModified: new Date(),
      });
    }
  }

  return entries;
}
