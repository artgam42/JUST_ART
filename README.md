# JUST ART — Sit Wèb Ajans lan

Sit ofisyèl **JUST ART**, yon ajans kreyatif miltidisiplinè (design, videyo, digital, fòmasyon & mentorat).
Sit la gen 3 lang (🇫🇷 Fransè, 🇬🇧 Anglè, 🇧🇷 Pòtigè Brezil) e li deplwaye otomatikman sou Vercel.

> *« L'art parle là où les mots ne suffisent plus. »*

- **Sit an liy:** https://justart-agency.vercel.app
- **Depo:** https://github.com/artgam42/JUST_ART

---

## 1. Teknoloji yo

| Eleman | Vèsyon / Zouti |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19 |
| Lang | TypeScript 5 |
| Style | Tailwind CSS v4 (via `@tailwindcss/postcss`) — **pa gen `tailwind.config.ts`**, tout konfigirasyon an nan `@theme` anndan `app/globals.css` |
| Fòm | EmailJS (`@emailjs/browser`) |
| Analytics | Google Analytics 4 (`@next/third-parties`) |
| Deplwaman | GitHub → Vercel |

---

## 2. Kijan pou kouri sit la lokal

```bash
npm install
npm run dev
```

Louvri http://localhost:3000 — sit la redirije otomatikman sou `/fr` (oswa `/en`, `/pt-br` selon lang navigatè a).

Lòt kòmand itil:

```bash
npm run build   # build pwodiksyon (teste sa anvan w push si w chanje anpil bagay)
npm run lint    # tcheke kalite kòd la
```

---

## 3. Estrikti pwojè a

```
.
├── app/
│   ├── globals.css                  → Tailwind v4, @theme (koulè/font), @font-face, reset border-radius
│   ├── robots.ts                    → robots.txt
│   ├── sitemap.ts                   → sitemap.xml (3 lang)
│   └── [locale]/
│       ├── layout.tsx               → layout global (metadata, hreflang, GA4, preload font)
│       ├── page.tsx                 → Akèy
│       ├── portfolio/
│       │   ├── page.tsx             → Pòtfolyo (kategori yo)
│       │   └── branding/[slug]/page.tsx   → Brand Detail (BIG, MARICA, STRIVE, RÈD DESIGNER)
│       ├── formation/page.tsx       → Fòmasyon & Mentorship (fòm aplikasyon)
│       ├── apropos/page.tsx         → À propos
│       └── contact/page.tsx         → Kontak (fòm + WhatsApp + rezo sosyal)
├── components/
│   ├── layout/    → Header, Footer
│   ├── ui/        → Button, Card, Container, PackageCard, PageShell, Tag, ImageLightbox
│   ├── portfolio/ → PortfolioGrid, BrandGallery
│   └── forms/     → ContactForm, ApplicationForm
├── i18n/
│   ├── config.ts                    → lang yo (fr, en, pt-br) + lang pa defo (fr)
│   ├── dictionaries/                → fr.json, en.json, pt-br.json (tout tèks sit la)
│   └── data/brands.ts               → 4 mak yo + kontni yo nan 3 lang
├── lib/
│   └── portfolio-images.ts          → li imaj/videyo nan public/portfolio otomatikman
├── proxy.ts                         → deteksyon lang + redireksyon (ranplase middleware.ts nan Next 16)
└── public/
    ├── fonts/                       → fichye .woff2 yo (gade seksyon 6)
    ├── logo-white.png, logo-navy.png
    └── portfolio/                   → imaj ak videyo pòtfolyo
```

---

## 4. Varyab anviwònman (`.env.local`)

Kreye yon fichye `.env.local` nan rasin pwojè a (li **pa janm** komite sou GitHub — `.gitignore` bloke `.env*`) :

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID=...
NEXT_PUBLIC_EMAILJS_APPLICATION_TEMPLATE_ID=...   # poko konfigire
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

| Varyab | Sèvi pou |
|---|---|
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | Sèvis imel EmailJS la |
| `NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID` | Template fòm Kontak |
| `NEXT_PUBLIC_EMAILJS_APPLICATION_TEMPLATE_ID` | Template fòm Aplikasyon (Fòmasyon) — **an atant** |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | Kle piblik EmailJS |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 — si l pa defini, analytics pa chaje |

**Sou Vercel:** Project → Settings → Environment Variables → ajoute menm 5 varyab yo (Production).

⚠️ Varyab `NEXT_PUBLIC_*` yo **entegre nan build la**. Si w chanje youn, ou dwe **redeplwaye** (push oswa Redeploy) pou chanjman an pran efè.

---

## 5. Règ design (pa vyole yo)

- **Koulè:** `#000028` (fon prensipal) · `#ffffff` (tèks) · `#0000ff` (aksan)
- **Pa gen kwen awondi** okenn kote — `border-radius: 0 !important` global nan `globals.css`
- **Fon:** ble fonse `#000028` sou tout paj, **eksepte** *Brand Detail* ak *Contact* ki gen fon **blan**
- **Pa gen non kliyan ni sitasyon** sou sit la
- **Pa gen pri afiche** — pakè yo (Start / Build / Grow) mande "Demann devis"
- **Font:** Creato Display = font prensipal · Waiting on the Bridge = aksan sèlman (mo « JUST » nan logo a)

---

## 6. Font yo

Fichye yo dwe nan `public/fonts/` an fòma **`.woff2`**, ak non egzak sa yo (`globals.css` rele yo konsa):

```
CreatoDisplay-Thin.woff2
CreatoDisplay-Light.woff2
CreatoDisplay-Regular.woff2
CreatoDisplay-Medium.woff2
CreatoDisplay-ExtraBold.woff2
CreatoDisplay-Black.woff2
Waiting-on-the-Bridge.woff2
```

`CreatoDisplay-Regular` ak `CreatoDisplay-Medium` preload nan `layout.tsx`. Tout `@font-face` itilize `font-display: swap`.

**Verifikasyon:** DevTools → Network → filtre **Font** → chak fichye dwe retounen **200**. Si w wè **404**, fichye a pa push sou GitHub oswa non an pa egzak.

Pou konvèti yon nouvo `.otf`/`.ttf` an woff2 (si nesesè) :

```bash
pip install fonttools brotli
python -c "from fontTools.ttLib import TTFont; f=TTFont('Font.otf'); f.flavor='woff2'; f.save('Font.woff2')"
```

> Gade lisans font yo (Creato Display, Waiting on the Bridge) separeman — se font lisansye.

---

## 7. Pòtfolyo — kijan pou ajoute imaj ak videyo

Sit la **li dosye yo otomatikman** (`lib/portfolio-images.ts`). Ou pa bezwen modifye kòd la pou ajoute travay.

```
public/portfolio/
├── logo/         → kategori Logo
├── flyer/        → kategori Flyer
├── banner/       → kategori Banner
├── autres/       → kategori Autres Designs
└── branding/
    ├── big/
    ├── marica/
    ├── strive/
    └── red-designer/
```

- **Imaj aksepte:** `.jpg` `.jpeg` `.png` `.webp`
- **Videyo aksepte:** `.mp4` `.webm` `.mov` (nan Brand Detail)
- **Tay rekòmande:** imaj **≤ 500 KB** chak (konprese anvan w mete yo — ex. Squoosh)
- **Videyo:** eseye rete anba ~10 MB (konprese si nesesè) pou sit la rete rapid
- Mete fichye a nan bon dosye a → `git add . && git commit -m "Nouvo travay" && git push` → Vercel redeplwaye.

### Ajoute yon nouvo mak (Branding)

1. Kreye dosye `public/portfolio/branding/<slug>/` epi mete imaj yo.
2. Nan `i18n/data/brands.ts`, ajoute `<slug>` nan `brandSlugs` epi ajoute kontni mak la nan **3 lang** (non, sektè, deskripsyon).
3. Push — paj Brand Detail la kreye otomatikman (`generateStaticParams`).

---

## 8. Lang yo (i18n)

- Lang yo: `fr` (defo), `en`, `pt-br` — defini nan `i18n/config.ts`
- Tèks jeneral yo: `i18n/dictionaries/{fr,en,pt-br}.json`
- Kontni mak yo: `i18n/data/brands.ts`
- `proxy.ts` detekte lang navigatè a epi redirije sou `/fr`, `/en` oswa `/pt-br`
- SEO: `hreflang` nan `layout.tsx`, `sitemap.ts` ak `robots.ts`

Si w chanje yon tèks, **modifye l nan 3 fichye JSON yo** pou 3 lang yo rete senkronize.

> Nòt Next.js 15/16 : `params` nan paj ak layout se yon **Promise** (`const { locale } = await params`).

---

## 9. Deplwaman (GitHub → Vercel)

1. Fè chanjman lokalman, teste ak `npm run dev` (epi `npm run build` si chanjman an gwo).
2. `git add . && git commit -m "..." && git push`
3. Vercel bati e deplwaye otomatikman.
4. Si yon deplwaman kraze sit la: Vercel → **Deployments** → chwazi yon ansyen vèsyon → **Promote to Production**.

⚠️ Plan **Vercel Hobby** se pou itilizasyon **non-komèsyal** selon tèm yo. Si sit la sèvi pou biznis ajans lan, panse pase sou plan **Pro** oswa chwazi yon lòt òtèl.

---

## 10. Domèn final (lè w achte l)

Sit la itilize `https://justart-agency.vercel.app` kòm adrès tanporè nan **3 kote**. Lè w gen domèn final la, ranplase l la:

| Fichye | Ki liy |
|---|---|
| `app/[locale]/layout.tsx` | `metadataBase: new URL('...')` |
| `app/sitemap.ts` | `const SITE_URL = '...'` |
| `app/robots.ts` | `sitemap: '.../sitemap.xml'` |

Epi:
- Ajoute domèn nan Vercel (Settings → Domains) ak DNS registrar la.
- Mete ajou **Allowed Origins** nan EmailJS (Account → Security) pou ajoute domèn nan.
- Mete ajou pwopriyete GA4 si nesesè.

---

## 11. Tèt kale ak dosye ki pa dwe efase

- `CLAUDE.md` ak `AGENTS.md` — soti nan `create-next-app`, kite yo.
- `.env.local` — **pa janm** komite l.
- Fichye `INSTRUCTIONS-*.md` ak `convert-fonts.py` se zouti tanporè — ou ka efase yo san danje.

---

## 12. Rès pou fè (opsyonèl)

- [ ] Konfigire template EmailJS pou fòm **Aplikasyon** (`NEXT_PUBLIC_EMAILJS_APPLICATION_TEMPLATE_ID`)
- [ ] Konprese gwo videyo yo (`red-designer/redvid1.mp4` ~16.8 MB) ak imaj > 500 KB
- [ ] Konekte domèn final la (gade seksyon 10)
- [ ] Aktive 2FA sou GitHub, Vercel, EmailJS
- [ ] Limite domèn ki ka itilize kle EmailJS la (Allowed Origins)

---

*JUST ART © 2025 — Tout dwa rezève.*
