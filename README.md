# JUST ART — Pwojè Next.js (scaffold 3.3)

## Estrikti pwojè a

```
just-art-website/
├── app/
│   ├── globals.css          → Tailwind + police yo (Creato Display, Waiting for the Bridge)
│   └── [locale]/
│       ├── layout.tsx       → layout ki chaje selon lang lan (fr / en / pt-br)
│       └── page.tsx         → paj Akèy placeholder
├── i18n/
│   ├── config.ts            → lis lang yo + lang pa defo (fr)
│   └── dictionaries/
│       ├── fr.json
│       ├── en.json
│       └── pt-br.json
├── public/
│   └── fonts/                → METE dosye .woff2 police yo la (gade anba)
├── middleware.ts             → detekte lang navigatè a, redirije /fr, /en, oswa /pt-br
├── tailwind.config.ts        → koulè (navy #000028, accent #0000ff) + border-radius: 0
└── package.json
```

## Etap pou lanse l lokalman

1. `npm install`
2. `npm run dev`
3. Louvri `http://localhost:3000` — li dwe redirije otomatikman sou `/fr`

## Enpòtan — Fonts

Mete dosye police ou yo (konvèti an `.woff2` pou pi bon pèfòmans web) nan `public/fonts/`:
- `CreatoDisplay-Regular.woff2`
- `CreatoDisplay-Medium.woff2`
- `WaitingForTheBridge.woff2`

`app/globals.css` deja konfigire pou li chaje yo otomatikman.

## Pwochèn etap (Phase 3 nan feuille de route a)

- **3.4** — Routing dinamik pou Brand Detail (`/[locale]/portfolio/branding/[slug]`)
- **3.5** — Fini entegrasyon koulè/police (deja kòmanse isit la)
- **3.6+** — Bati chak paj (Akèy konplè, Pòtfolyo, Fòmasyon, Apwopo, Kontak) ak tout kontni ki nan dokiman FR/EN/PT-BR yo

## Nòt sou "san radius"

`tailwind.config.ts` ranplase eskal `borderRadius` Tailwind la pou tout valè yo egal `0px` (sof `full`, rezève pou bagay tankou pwen estati si nesesè pita). Sa vle di `rounded`, `rounded-lg`, `rounded-xl` elatriye ap toujou bay kwen kare san w pa bezwen sonje mete `rounded-none` chak fwa.
