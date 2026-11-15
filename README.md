<<<<<<< HEAD
# COSMIC LOST & FOUND

> **Abandoned but not Forgotten.**
> *Every Machine Has a Mission. Every Mission Has a Story.*

An interactive, cinematic space museum for school-age visitors and young space fans, built for the **NASA Space Apps Challenge** theme *"Abandoned but not Forgotten"*. It tells the stories of 15 NASA machines on the Moon, on Mars and in deep space: what each one was, why it was sent, what it found, how its mission ended, where it is now, and why it still matters.

> Independent educational project — not affiliated with, sponsored by or endorsed by NASA.

---

## ✨ Features

| Area | What it does |
|---|---|
| **Home** | Cinematic hero with a glowing Mars and orbit animations, live mission statistics, featured exhibits, educational highlights and a rotating *Did You Know?* panel |
| **Explore Missions** | Search by name; filter by world (Moon / Mars / Deep Space) and by status (Active, Mission ended, Inactive, Silent, Intentionally left behind, Still travelling); sort by date or name. Filters are kept in the URL, so filtered views can be shared |
| **Mission details** (×15) | What it was, why NASA sent it, objectives, story, discoveries, achievements, challenges, how it ended, *Where is it now?*, its own timeline, official NASA source links and facts |
| **Robot's Last Message** | First-person creative story with a typewriter reveal, **clearly labelled as fiction**, plus **voice narration** (browser text-to-speech) |
| **Interactive Space Map** | Illustrated latitude/longitude maps of the Moon and Mars with clickable, keyboard-accessible markers, popups, zoom and drag-to-pan, plus a **Deep Space** distance chart (Voyagers, Pioneers, New Horizons) |
| **Timeline + Mission Time Machine** | 67 dated events with world/type filters and expandable details; a year slider (1966–2026) shows what happened, what was operating and what was already resting |
| **Where Are They Now?** | Every machine grouped by status or world, with its current known location |
| **Quiz** | 14 multiple-choice questions, instant feedback with explanations, scoring, ranks, answer review, restart; progress **saved in localStorage** |
| **Achievements** | 12 badges (Moon Explorer, Mars Explorer, Mission Historian, Space Knowledge Expert…) with progress bars, unlock toasts and reset |
| **Patch Lab** | Design a mission patch (shape, colours, emblem, names, stars), save it, and download it as **SVG or PNG** |
| **Accounts** | Register, Login (with "keep me logged in"), Log out page, Profile with **Overview / Edit profile / Security** tabs (change name, avatar colour, favourite mission, bio, password, delete account). Header shows the signed-in user with a dropdown menu. Each user's badges, quiz progress and patch are saved separately |
| **Credits** | Team page with photos, roles, contributions and skills for all 4 members (edit them in `src/data/team.ts`, photos in `public/team/`) |
| **About & Sources** | Purpose, educational goals, Space Apps connection, accuracy promise, image credits, general and per-mission references |

**Accessibility:** skip link, semantic landmarks, keyboard-operable map markers, `aria-pressed`/`aria-expanded`/live regions, visible focus rings and `prefers-reduced-motion` support.

---

## 🔐 About the login system

There is no backend, so accounts are stored **only in the visitor's own browser** (`localStorage`). Passwords are salted and hashed with SHA-256 before saving, but this is a **demo login for the museum experience, not real security**: anyone with access to that browser could clear or copy the data. For real accounts, connect a service such as Firebase Auth, Supabase or Clerk and replace `src/hooks/AuthContext.tsx`; the pages and header menu can stay as they are.

---

## 🧱 Tech stack

- **React 19** + **TypeScript** (strict)
- **Vite 6**
- **Tailwind CSS v4** (via `@tailwindcss/vite`, design tokens in `src/styles/index.css`)
- **React Router v7** (`HashRouter`, so it works on any static host)
- **Lucide React** icons
- **LocalStorage** for quiz progress, achievements and patches
- No backend and **no API keys**

> **Why no Leaflet?** The brief says: *"If reliable planetary map tiles are unavailable, create an illustrated planetary map instead."* Public Moon/Mars tile servers can be slow or change their URLs, so the map is a custom, dependency-free SVG equirectangular projection (`src/components/map/PlanetMap.tsx`). Markers are placed by real latitude/longitude, so the data could be dropped into Leaflet later without changes.

---

## 🚀 Getting started

Requirements: **Node.js 18.18+** (Node 20 or 22 recommended) and npm.

```bash
cd cosmic-lost-and-found
npm install        # install dependencies
npm run images     # download the 15 NASA mission photos (recommended, once)
npm run dev        # start the dev server → http://localhost:5173
npm run build      # type-check + production build → dist/
npm run preview    # serve the production build locally
```

---

## 🗂️ Project structure

```
cosmic-lost-and-found/
├── index.html
├── package.json · vite.config.ts · tsconfig*.json · vercel.json
├── public/
│   └── favicon.svg
├── docs/
│   ├── DEPLOYMENT.md       # Vercel deployment guide
│   ├── DEMO_SCRIPT.md      # 1–2 minute demo video script
│   └── PITCH.md            # Space Apps presentation pitch
└── src/
    ├── main.tsx · App.tsx  # entry + routes
    ├── types/              # TypeScript interfaces (Mission, QuizQuestion, Achievement…)
    ├── data/               # ALL content: missions, quiz, achievements, facts, sources
    ├── hooks/              # ProgressContext (badges), useQuiz, useSpeech, useLocalStorage…
    ├── utils/              # status metadata, formatting, timeline, storage, SVG export
    ├── components/
    │   ├── layout/         # Navbar, Footer, Layout
    │   ├── ui/             # StatusBadge, Starfield, DidYouKnow, MissionPatch, toasts…
    │   ├── missions/       # MissionCard, MissionArt (illustrations), RobotLastMessage…
    │   └── map/            # PlanetMap, DeepSpaceChart, basemap features
    ├── pages/              # one file per page
    ├── styles/index.css    # Tailwind v4 theme + custom utilities
    └── assets/             # place for local images/fonts (see below)
```

Mission content lives in `src/data` and is completely separate from the UI. To add a mission, add a `Mission` object to `src/data/missions.ts`: the catalogue, map, timeline, *Where now?* page, facts and achievements pick it up automatically.

---

## 🖼️ Images & credits

Every mission shows a **credited NASA photo or NASA artist's concept** (listed in `src/data/missionImages.json`, with credits on each mission page and on About & Sources). Team portraits are in `public/team/`.

**Recommended once, after `npm install`:**

```bash
npm run images
```

This downloads all 15 NASA photos into `public/images/` so they're bundled with the site (faster, works offline, and doesn't depend on NASA's servers once deployed). If you skip it, the site loads the photos straight from NASA. If a photo can't be loaded at all, the site shows an original illustration instead (`src/components/missions/MissionArt.tsx`).

To change a mission photo, edit its entry in `src/data/missionImages.json` (`src`, `alt`, `credit`, `sourceUrl`), delete `public/images/<mission-id>.jpg`, and run `npm run images` again (or `npm run images -- --force` to re-download everything). Keep NASA's credit line and don't imply NASA endorsement.

---

## 🔬 Accuracy notes

- Facts were checked against NASA Science, JPL, Johns Hopkins APL and NSSDCA pages, linked on every mission page. Current statuses were checked in **November 2026** (for example, Perseverance passing Opportunity's driving record on 11 Oct 2026; Voyager 1 reaching one light-day on 18 Nov 2026; New Horizons leaving hibernation on 23 Jun 2026).
- Statuses are deliberately nuanced: **Active, Mission ended, Inactive, Silent, Intentionally left behind**, plus a separate **Still travelling** flag.
- Coordinates are approximate and rounded; basemap features are simplified illustrations.
- *Robot's Last Message* texts are creative writing, labelled as such everywhere. Opportunity's famous "my battery is low" line is explained as a journalist's paraphrase, not a real message.
- Some statuses change over time (Voyager instruments, New Horizons hibernation). Review `statusNote`, `whereNow` and `deepSpace` in `missions.ts` before each event.

---

## ☁️ Deployment

See **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)**. Short version: push to GitHub → import into Vercel → framework **Vite**, build `npm run build`, output `dist` → Deploy.

---

## 📄 License & attribution

Code: MIT (or your team's choice). Mission facts come from public NASA sources; please keep the source links and the non-endorsement disclaimer.
=======
# Nasa-Space-project
Project purpose To tell the stories of NASA machines left on the Moon, on Mars and in deep space — what they were, what they found, how they ended and where they are now.
>>>>>>> 120cdf3be54f587849828e5b95e135e0d1dceeca
