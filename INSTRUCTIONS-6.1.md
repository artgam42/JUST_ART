# Etap 6.1 — Google Analytics 4

## 1. Enstale pakè a

```
npm install @next/third-parties@latest
```

## 2. Kreye pwopriyete GA4 la

1. Ale sou https://analytics.google.com
2. Kreye yon kont (si w poko genyen) → "Admin" (gwo wou anba goch) → "Create Property"
3. Non pwopriyete: **JUST ART**, chwazi fizo orè/peyi (Haïti) ak lajan (HTG oswa USD)
4. Lè w kreye "Data Stream" la, chwazi **Web**, mete URL sit la (`justart-agency.vercel.app`)
5. GA4 ap bay ou yon **Measurement ID** ki gen fòma `G-XXXXXXXXXX` — kopye l

## 3. Ranpli varyab anviwonman an

Nan `.env.local`:
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Epi ajoute **menm varyab la** sou Vercel (Settings → Environment Variables → Production), menm jan nou te fè pou EmailJS yo.

## 4. Ranplase `app/[locale]/layout.tsx`

Vèsyon ki nan zip la deja gen entegrasyon an — li chaje GA4 sèlman si varyab la egziste, kidonk sit la kontinye mache nòmalman menm anvan w fin konfigire l.

## 5. Teste

Apre `npm run dev` (oswa deplwaman), louvri GA4 → "Reports" → "Realtime". Vizite sit la nan yon lòt onglè — ou dwe wè yon vizitè aktif parèt nan rapò a apre kèk segond.

## Nòt sou vi prive (RGPD/konsantman)

GA4 kolekte done vizitè yo (paj yo vizite, aparèy, peyi apwoksimatif). Si w gen vizitè Ewopeyen, lwa RGPD ka mande yon bannyè konsantman anvan chajman GA4 la. Pou yon ti sit ajans an Ayiti/Karayib, sa pa yon obligasyon lejal dirèk, men se yon bon pratik mansyone itilizasyon analytics la nan yon ti "politik konfidansyalite" si w vle ajoute youn pita.
