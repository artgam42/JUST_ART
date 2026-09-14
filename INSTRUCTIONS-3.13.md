# Etap 3.13 — Konekte fòmilè yo ak EmailJS

## 1. Enstale pakè a

Nan tèminal ou, nan rasin pwojè a:

```
npm install @emailjs/browser
```

## 2. Kreye 2 template sou dashboard EmailJS la

Ou di w deja gen yon kont EmailJS. Sou https://dashboard.emailjs.com/admin/templates, kreye:

- **Yon template pou Kontak** — varyab pou itilize nan tanplè a: `{{user_name}}`, `{{user_email}}`, `{{subject}}`, `{{message}}`
- **Yon template pou Fòmasyon (aplikasyon)** — varyab: `{{user_name}}`, `{{user_email}}`, `{{phone}}`, `{{interest}}`, `{{portfolio_link}}`, `{{message}}`

(Non varyab yo dwe matche EGZAKTEMAN ak atribi `name="..."` ki nan chak `<input>`/`<textarea>` nan fòmilè yo — mwen deja mete yo korèkteman nan kòd la.)

## 3. Jwenn 3 valè yo

- **Service ID** → Email Services, nan dashboard la
- **Template ID** (2 diferan, youn pou chak fòmilè)
- **Public Key** → Account > General

## 4. Kreye fichye `.env.local`

Kopye `.env.local.example` ki nan zip la, renome l `.env.local`, epi mete 4 valè yo ladan l.

⚠️ `.env.local` deja nan `.gitignore` pa defo nan Next.js — li PAP monte sou GitHub. Se nòmal, se konsa sa dwe ye (kle yo pa dwe nan repo piblik la, menm si yo "public key").

## 5. Ajoute menm 4 varyab yo sou Vercel

Sou vercel.com → pwojè w la → Settings → Environment Variables, ajoute menm 4 varyab yo (Production + Preview). San sa, fòmilè yo ap mache lokalman men PAP mache sou sit deplwaye a.

## 6. Teste

Apre ou fè `npm run dev`, ranpli fòmilè Kontak la epi soumèt li. Si tout bagay byen konfigire, ou dwe resevwa yon imèl, epi mesaj siksè a parèt nan sit la.
