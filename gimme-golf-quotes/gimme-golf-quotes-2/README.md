# Gimme Golf — Interactive Quote Builder

A premium interactive quote builder for Gimme Golf simulator installations. Build quotes, preview what clients see, and manage everything from a clean dashboard.

## Features
- **Dashboard** — See all your quotes at a glance with status tracking (draft, sent, accepted, declined)
- **Quote Builder** — Add client details, line items from presets or custom, personal notes
- **Client Preview** — Polished, animated quote page your clients will love
- **Full Legal Agreement** — Your complete 16-section service & payment agreement with expandable sections and signature block
- **Auto-Save** — Quotes persist in browser localStorage

## Quick Deploy Options

### Vercel (Recommended — free, 2 minutes)
1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "New Project" → Import your repo
4. Framework preset: **Vite** (auto-detected)
5. Click Deploy — done. You'll get a URL like `gimme-golf-quotes.vercel.app`
6. Optional: Add a custom domain like `quotes.gimmegolfsimulators.com`

### Netlify (Also free, also 2 minutes)
1. Push to GitHub
2. Go to [netlify.com](https://netlify.com) → "Add New Site" → "Import from Git"
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy

### Lovable.dev or Bolt.new (No GitHub needed)
1. Paste the contents of `src/App.jsx` into the editor
2. It'll set up the project and give you a live URL

## Local Development
```bash
npm install
npm run dev
```
Opens at `http://localhost:5173`

## Build for Production
```bash
npm run build
```
Output goes to `dist/` folder — upload anywhere that serves static files.

## Customization
- **Company info**: Edit the `COMPANY` object at the top of `src/App.jsx`
- **Preset line items**: Edit the `PRESET_ITEMS` array
- **Agreement text**: Edit the `AGREEMENT_SECTIONS` array
- **Colors**: Search for `#1b4332` (dark green) and `#2d6a4f` (medium green) to adjust the palette
