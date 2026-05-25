# GetCracked.GG — Landing Page

The marketing site for [GetCracked.GG](https://getcracked.gg), a fast, low-RAM League of Legends companion app for Windows and macOS.

[![Live site](https://img.shields.io/badge/live-getcracked.gg-3b82f6)](https://getcracked.gg)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

![Hero — Climb faster. Run lighter.](./docs/screenshots/hero.png)

![Performance section — Should run on a toaster.](./docs/screenshots/performance.png)

![Comparison table — Same features. None of the bloat.](./docs/screenshots/comparison.png)

---

## What this is

A small Next.js 16 marketing site. Single page: hero, trust strip, feature grid, performance benchmark, competitor comparison, download CTA, footer. No CMS, no database, no analytics.

The desktop app it advertises is a separate (currently private) Tauri project. This repo only holds the public landing page — not the app. It's public as a showcase, not as something to clone and run.

## What makes it interesting

- **Server-rendered, zero client JS for most of the page.** Only the platform-detected download button and the bar-chart intersection observer are client components.
- **Live downloads, live version.** The version pill and "Download for Windows / macOS" links come from a self-hosted update proxy (`https://update.getcracked.gg`) that fronts a private GitHub Releases repo. Cut a release in the app repo → the site picks up the new version on the next 5-minute revalidation. No site redeploy needed.
- **Adaptive primary CTA.** The hero's download button reads `navigator.userAgentData` / `navigator.userAgent` at hydration and swaps between "Download for Windows" and "Download for macOS". The download section always shows both Mac (Apple Silicon + Intel) and Windows so nobody has to scroll.
- **Content is data, not code.** Every section's copy + numbers live in `src/content/`. Adding a feature card, bumping a perf number, or adding a competitor column is a one-file edit — the React components only render.

## How it was built

- **Next.js 16** (App Router, server components, Turbopack)
- **React 19**
- **Tailwind CSS v4** with a custom design-token layer (glassmorphism panels, OKLCH color space, no third-party UI kit)
- **TypeScript**
- **Inline SVG icon set** — no icon library
- No database, no auth, no CMS, no analytics

The site is one server-rendered page composed of flat section components in `src/components/landing/`. Marketing copy and numbers live in `src/content/`. Release metadata is fetched server-side from the Rust update proxy and memoized per-request with `React.cache`, then revalidated every 5 minutes via Next's `fetch` cache.

## Project layout

```
src/
  app/                Next.js App Router entry (page.tsx is server-rendered)
  components/
    landing/          Page sections — Hero, Features, Comparison, etc.
    Button.tsx        Shared <Button> / <ButtonLink>
    Logo.tsx          Crest mark + wordmark
    icons.tsx         Inline SVG icon set
  content/            Site content — features, trust, perf, comparison
  lib/
    releases.ts       Server-side fetcher for the update proxy
    platform.ts       Browser OS detection helper
    cn.ts             classnames helper
```

## License

[MIT](./LICENSE)
