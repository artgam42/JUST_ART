// ⚠️ Mete isit la vrè nimewo WhatsApp JUST ART la (kòd peyi + nimewo, san + ni espas).
// Se SÈL kote nimewo a ye: PackageCard ak paj Contact itilize l tou de.
export const WHATSAPP_NUMBER = '5511927282400';

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
