# Námsleikurinn (StudyGame)

A gamified learning website for kids (ages ~10–12): math practice, Danish reading & vocabulary, Icelandic and English reading comprehension. Kids earn points (*stig*) for completed tasks and redeem them for real-world rewards that a parent defines and approves. UI is entirely in Icelandic.

**Live site:** https://gudjonhl.github.io/StudyGame/ (after GitHub Pages is enabled — see Deployment)

## Features

- **Math** — endlessly generated problems in 8 categories (addition/subtraction, multiplication tables, long multiplication, division, fractions, decimals, percentages, equations) at 3 difficulty levels
- **Danish** — 12 short reading texts with tappable glossary words and Icelandic comprehension questions, plus ~120 Danish↔Icelandic vocabulary pairs in multiple-choice and matching modes
- **Icelandic & English** — short reading texts with comprehension questions
- **Gamification** — points ledger, daily streaks (7-day bonus), levels, 11 badges, confetti on perfect sessions
- **Rewards** — kids request redemptions; points are held until a parent approves or rejects (rejection auto-refunds)
- **Parent area (PIN-protected)** — progress stats per child and subject, 7-day activity chart, rewards management, redemption approvals, difficulty settings, manual point adjustments, full data export/import
- Works on phones, tablets and desktops; no backend — everything is stored in the browser

## Running locally

```bash
npm install
npm run dev        # development server
npm test           # unit tests (math generators, points, reducer, export/import)
npm run build      # type-check + production build to dist/
npm run preview    # serve the production build locally
```

## Deployment (GitHub Pages)

The repo ships with `.github/workflows/deploy.yml`, which builds and deploys on every push to `main`.

One-time setup:

1. Create the repository `gudjonhl/StudyGame` on GitHub (public).
2. Push this project to it (`git push -u origin main`).
3. On GitHub: **Settings → Pages → Source: GitHub Actions**.
4. After the action finishes, the site is live at `https://gudjonhl.github.io/StudyGame/`.

If you rename the repo, update `base` in `vite.config.ts` to match (`/<repo-name>/`).

## How data is stored

All data (profiles, points, history, rewards, PIN) lives in `localStorage` under the key `studygame.v1` — per browser, per device. To move progress to another device: **Foreldrasvæði → Stillingar → Afrit og flutningur**, export on the old device and import on the new one.

Notes:

- Clearing the browser's site data erases everything — export a backup occasionally.
- The parent PIN keeps kids out of the parent area; it is not real security (a tech-savvy person can edit localStorage). It's a motivation system, not a vault.
- If both the PIN and the recovery code are lost, the only way back in is to delete site data (or import a backup over it).

## Adding your own content

All learning content lives in typed TypeScript files in `src/content/`. Each file starts with a commented example — copy an entry, edit it, and the TypeScript compiler will flag any mistakes. After editing, commit and push; the site redeploys automatically.

| File | What's in it |
|---|---|
| `src/content/danishTexts.ts` | Danish reading texts + Icelandic questions + glossary |
| `src/content/danishVocab.ts` | Danish↔Icelandic word pairs |
| `src/content/icelandicTexts.ts` | Icelandic reading texts + questions |
| `src/content/englishTexts.ts` | English reading texts + questions |
| `src/content/badges.ts` | Badge definitions |

Other things you might want to tweak:

- **Point values** — in each engine file (`src/engine/math/generator.ts`, `src/engine/reading.ts`, `src/engine/vocab.ts`) and `src/engine/points.ts` (streak bonus, level step)
- **UI texts** — all in `src/i18n/strings.ts`
- **Colors** — `src/styles/tokens.css`
- **Math difficulty ranges** — `src/engine/math/generator.ts`

## Project structure

```
src/
├── App.tsx, main.tsx, router.ts   # app shell + tiny hash router
├── i18n/strings.ts                # all Icelandic UI strings
├── storage/                       # schema, reducer/store, migrations, PIN, export/import
├── engine/                        # math generators, reading/vocab session builders, points/badges logic
├── content/                       # editable learning content (see above)
├── components/                    # keypad, choice buttons, matching grid, dialogs...
├── screens/                       # one file per screen; screens/parent/ for the parent area
└── styles/                        # design tokens + global styles
```
