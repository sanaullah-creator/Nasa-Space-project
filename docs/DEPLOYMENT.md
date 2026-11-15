# Deploying COSMIC LOST & FOUND to Vercel

The site is a static single-page app (Vite build → `dist/`). It needs **no environment variables and no API keys**.

## Option A — Vercel dashboard (recommended)

1. **Check the build locally first**
   ```bash
   npm install
   npm run build      # should finish with "✓ built in …"
   npm run preview    # open the printed URL and click around
   ```
2. **Push the project to GitHub**
   ```bash
   git init
   git add .
   git commit -m "COSMIC LOST & FOUND"
   git branch -M main
   git remote add origin https://github.com/<your-username>/cosmic-lost-and-found.git
   git push -u origin main
   ```
3. Go to <https://vercel.com/new>, sign in with GitHub and **Import** the repository.
4. Vercel detects **Vite** automatically. Confirm:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
   - Root Directory: the folder containing `package.json`
5. Click **Deploy**. After about a minute you get a URL like `https://cosmic-lost-and-found.vercel.app`.
6. Every later `git push` to `main` redeploys automatically, and pull requests get preview URLs.

## Option B — Vercel CLI

```bash
npm i -g vercel
vercel login
vercel           # first deploy (answers: link to new project, defaults are fine)
vercel --prod    # production deploy
```

## Routing note

The app uses `HashRouter` (URLs look like `/#/missions/voyager-1`), so deep links work on any static host with no server configuration. `vercel.json` also includes an SPA rewrite, so you can switch `HashRouter` to `BrowserRouter` in `src/App.tsx` for clean URLs and deep links will still work on Vercel.

## Custom domain

Vercel → Project → **Settings → Domains** → add your domain and follow the DNS instructions.

## Troubleshooting

| Problem | Fix |
|---|---|
| `tsc` errors during build | Run `npm run typecheck` locally and fix the reported file/line |
| Blank page after deploy | Make sure Output Directory is `dist` and the Root Directory points to the folder with `package.json` |
| Fonts look different | Google Fonts are loaded from `fonts.googleapis.com`; if blocked (e.g. school networks), the system font fallback is used automatically |
| Voice narration is silent | Text-to-speech depends on the device's installed voices; the site shows a message if none are available |
| Progress missing on another device | Progress is stored in that browser's localStorage by design (no accounts or backend) |

## Other hosts

- **Netlify:** build `npm run build`, publish directory `dist`.
- **GitHub Pages:** set `base: '/<repo-name>/'` in `vite.config.ts`, build, and publish `dist` (HashRouter already handles routing).
