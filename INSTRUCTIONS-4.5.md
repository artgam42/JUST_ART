# Etap 4.5 — Optimize Vitès Chajman

## 1. Konvèti font yo an .woff2

Mete `convert-fonts.py` nan rasin pwojè a, epi:

```
pip install fonttools brotli
python convert-fonts.py
```

Sa ap kreye 7 nouvo fichye `.woff2` anndan `public/fonts/` (Thin, Light, Regular, Medium, ExtraBold, Black, Waiting-on-the-Bridge). `.woff2` yo anjeneral **30-50% pi lejè** pase `.otf`/`.ttf` — sa vle di chajman pi rapid, sitou sou koneksyon mobil.

Apre konvèsyon an reyisi e w konfime sit la mache byen, ou ka **efase** ansyen fichye `.otf`/`.ttf` yo nan `public/fonts/` (yo pa itilize ankò).

## 2. Mete ajou 2 fichye kòd yo

- `app/globals.css` → **ranplase**, kounye a li rele `.woff2` yo olye `.otf`/`.ttf`
- `app/[locale]/layout.tsx` → **ranplase**, ajoute 2 `<link rel="preload">` pou Regular ak Medium (2 pwa ki pi itilize sou sit la) — sa fè navigatè a kòmanse telechaje yo pi bonè, anvan menm li fin li tout CSS la

## 3. Sa ki DEJA optimize (pa gen anyen pou fè)

- ✅ Tout paj yo jenere an **static** (`generateStaticParams`) — pa gen kalkil sèvè lè yon moun vizite yo, Vercel sèvi fichye HTML deja pare
- ✅ Sèlman 4 konpozan itilize `'use client'` (Header pou meni mobil, PortfolioGrid pou filtè, ak 2 fòmilè yo) — tout rès sit la se Server Components, kidonk trè piti JavaScript voye bay navigatè a
- ✅ `font-display: swap` deja aktive — tèks parèt imedyatman ak yon fon default pandan fon ou yo ap chaje, olye kite yon espas vid

## 4. Pou pita, lè vrè imaj yo rive (pòtfolyo, brand gallery)

Pa itilize `<img>` senp — itilize `<Image>` ki soti nan `next/image`. Li otomatikman:
- Konvèti imaj yo an WebP/AVIF (pi lejè pase JPG/PNG)
- Chaje sèlman gwosè ki nesesè a selon ekran an (mobil pa telechaje vèsyon dekstop la)
- Fè "lazy loading" otomatik (imaj ki pa vizib yo pa chaje toutswit)

Egzanp:
```tsx
import Image from 'next/image';

<Image src="/portfolio/big-logo.jpg" alt="Logo BIG" width={400} height={300} />
```
