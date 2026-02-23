# Sovereign Compliance Systems FZCO website

## Run locally (PowerShell)
```powershell
cd sovereign-compliance-site
npm install
npm run dev
```

Open: http://localhost:3000

## Deploy
Recommended: Vercel

Animations: GSAP (hero motion, scroll reveals)

## Contact form
The `/api/contact` route currently returns success and logs the payload.
Connect it to your preferred email provider (Resend, SMTP, etc) using environment variables.


## Hero background choice
Edit `src/content/heroBackground.ts` and set `choice` to: car | skyline | abstract.
You can preview options at `/hero-options`.


## Sparkles and motion
Hero uses an animated WebP loop at `/public/hero/hero-loop.webp` plus a sparkle field overlay.

