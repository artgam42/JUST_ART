export type SocialLink = {
  name: string;
  href: string;
  /** Si défini, le lien n'apparaît que pour ces langues. Sinon : toutes les langues. */
  locales?: string[];
};

export const socialLinks: SocialLink[] = [
  { name: 'Facebook', href: 'https://www.facebook.com/share/1Dc45vY5xv/' },
  { name: 'Instagram', href: 'https://www.instagram.com/just.art.agency' },
  { name: 'TikTok', href: 'https://www.tiktok.com/@just.art.agency' },
  // Kwai : disponible seulement sur la version portugaise (Brésil)
  { name: 'Kwai', href: 'https://k.kwai.com/u/@just.art.agency/CmKFGdbJ', locales: ['pt-br'] },
];

export function getSocialLinks(locale: string): SocialLink[] {
  return socialLinks.filter((s) => !s.locales || s.locales.includes(locale));
}
