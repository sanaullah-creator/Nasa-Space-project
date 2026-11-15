# COSMIC LOST & FOUND — NASA Space Apps Challenge Pitch

**Challenge:** Abandoned but not Forgotten
**Tagline:** Every Machine Has a Mission. Every Mission Has a Story.
**Format:** 3-minute pitch, 7 slides, plus a live demo link.

---

## Slide 1 — Title (0:00–0:15)
**COSMIC LOST & FOUND** · *Abandoned but not Forgotten* · team name · live URL / QR code

> "Right now, on the Moon, six spacecraft descent stages stand exactly where astronauts left them in 1972. On Mars, a helicopter that was designed to fly five times — and flew seventy-two — sits silently in the hills. And 26 billion kilometres away, Voyager 1 is still sending us data. These machines aren't junk. They're stories."

## Slide 2 — The problem (0:15–0:40)
- Students learn *that* missions launched — rarely what happened **after**.
- "Abandoned" is often misunderstood: some hardware was **left on purpose**, some is **silent**, some is **still active**.
- Mission information is spread across dozens of technical pages written for adults.

> "Kids hear 'abandoned' and think 'broken'. The real picture is far more interesting — and more accurate."

## Slide 3 — Our solution (0:40–1:05)
An **interactive space museum** for school-age visitors:
- **15 researched mission profiles** — Moon, Mars and Deep Space
- **Honest statuses:** Active · Mission ended · Inactive · Silent · Intentionally left behind · Still travelling
- **Robot's Last Message:** first-person storytelling, *clearly labelled as fiction*, with voice narration
- **Where Are They Now?** — every machine's current known location

## Slide 4 — Learn by exploring (1:05–1:45) → *live demo*
- **Interactive Space Map** — real (approximate) coordinates on illustrated Moon & Mars maps + a Deep Space distance chart
- **Mission Time Machine** — scrub from 1966 to 2026
- **Quiz** with explanations · **12 achievement badges** · **Build Your Own Mission Patch**
- Works on phones and Chromebooks, offline-friendly, **no logins and no API keys**

## Slide 5 — Scientific accuracy (1:45–2:10)
- Every fact is linked to **NASA Science, JPL, APL or NSSDCA** sources on the page.
- Statuses were checked in **November 2026**: Perseverance broke the off-world driving record on 11 Oct 2026; Voyager 1 reaches one light-day on 18 Nov 2026; New Horizons woke from a 321-day hibernation in June 2026.
- Coordinates are marked approximate; illustrations are labelled as artwork; nothing is presented as a real "robot message".

> "We built the storytelling on top of the science, never instead of it."

## Slide 6 — Impact & technology (2:10–2:35)
- **Audience:** ages 9–16, classrooms, museums, science clubs
- **Classroom use:** a 30-minute lesson → explore 3 missions → map them → take the quiz → design a patch
- **Tech:** React + TypeScript + Vite + Tailwind; all mission content lives in typed data files, so teachers or students can add a mission without touching the UI
- **Accessible:** keyboard navigation, screen-reader labels, reduced-motion support

## Slide 7 — What's next & close (2:35–3:00)
- Add credited NASA photography and real lunar/Mars map tiles (Leaflet-ready coordinates)
- More hardware: Viking landers, Curiosity, Lunar Orbiters, Mars orbiters
- Teacher mode with printable worksheets; translations

> "Every machine we sent into space had a mission. Every mission has a story. **COSMIC LOST & FOUND makes sure those stories are never forgotten.** Thank you!"

---

### Q&A preparation
- **"Is NASA involved?"** — No. This is an independent educational project built from public NASA information; it states that clearly on every page.
- **"Are the robot messages real?"** — No, and the site says so. Spacecraft send telemetry, not sentences; the stories are creative writing grounded in real mission facts.
- **"How do you keep it current?"** — Statuses live in one data file (`src/data/missions.ts`) with `statusNote` and `whereNow` fields that can be updated in minutes.
- **"Why not Leaflet maps?"** — Reliable public planetary tiles aren't guaranteed, so we built an illustrated equirectangular map that uses the same lat/long data and could be swapped into Leaflet later.
