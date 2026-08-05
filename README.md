# Try-On Prototype — Decart-powered

Real garments, live camera, AI-generated try-on. No garment presets — you
upload a photo of the actual item and it's applied to the live video feed.

## What "the backend" actually is

Just one small file: `api/tokens.js`. It holds your secret Decart API key
(as an environment variable, never in code) and hands out short-lived
10-minute tokens to the browser. You are not managing a server — Vercel
runs this function on demand and turns it off when idle.

## 1. Get a Decart API key

1. Go to https://platform.decart.ai and sign up
2. Create an API key (starts with `dct_`)
3. Keep it somewhere safe — you'll paste it into Vercel in step 3, never into this code

## 2. Get a Vercel account (free tier is enough for a prototype)

1. Go to https://vercel.com and sign up (GitHub login is easiest)
2. Install the CLI: `npm install -g vercel` (needs Node.js installed — https://nodejs.org)

## 3. Deploy

From inside this folder:

```
vercel
```

Follow the prompts (accept the defaults). When it asks about the project,
say yes to link/create it. Once it finishes, it gives you a live HTTPS URL.

Then set your API key as an environment variable:

```
vercel env add DECART_API_KEY
```

Paste your `dct_...` key when prompted, select all environments
(Production, Preview, Development).

Redeploy so the function picks up the new variable:

```
vercel --prod
```

## 4. Open it

Open the `https://your-project.vercel.app` URL Vercel gave you — on your
phone, in a real browser (Safari/Chrome), not an embedded preview. Tap
"Start camera," allow camera + mic access, then tap "+" to upload a
garment photo.

## Garment photo tips (from Decart's docs)

- Plain background, just the item — not a photo of someone wearing it
- At least 512×512px
- Pair it with a short, specific description: color, material, fit
  (e.g. "black leather bomber jacket with ribbed cuffs") — this matters
  more for quality than the image alone

## Cost note

This is a real-time generative video model, billed per second of output
while connected — not free to leave running. Worth checking current
pricing at https://platform.decart.ai before sharing this with more than
a couple of testers.
