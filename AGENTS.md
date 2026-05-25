<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# About this repo

This is the marketing site for **GetCracked.GG** — a Tauri-based League of Legends companion app. The desktop app lives at `../GetCracked.GG` (private repo); supporting services (including the update proxy this site depends on) live at `../GetCracked.GG/services`.

The site's job is small and stable: hero, feature grid, performance bench, comparison table, download CTA. It does **not** fetch live game data or talk to Riot. The only runtime dependency is the update proxy (for version + download links).

## OS support

The desktop app ships for **Windows** and **macOS** (Apple Silicon + Intel) only. No Linux. Don't reintroduce Linux UI without an artifact existing in the proxy first.

# Architecture

```
src/
  app/               Next.js App Router entry (page.tsx is server-rendered)
  components/
    landing/         Page sections — each one is its own component
    Button.tsx       Shared <Button> / <ButtonLink>
    Logo.tsx         Crest mark + wordmark
    icons.tsx        Inline SVG icon set
  content/           Editable site content data (features, comparison rows, etc.)
  lib/
    releases.ts      Server-side fetcher for the update proxy
    platform.ts      Browser OS detection helper
    cn.ts            classnames helper
```

**Server components by default.** Anything that hits the proxy or reads env vars is server-only. Only the platform-detected CTA (`landing/PrimaryDownload.tsx`) is `"use client"`, and only because it reads `navigator`.

## The update proxy contract

Live version + per-platform download URLs come from `https://update.getcracked.gg` (Rust service in `../GetCracked.GG/services/update-proxy`). The site never talks to GitHub directly.

- `GET /releases/latest` → `ReleaseManifest` (version, tag, notes, downloads keyed by `windows | macArm64 | macIntel`)
- `GET /download/<slug>` → 302 to a short-lived GitHub-signed URL. Slugs: `windows`, `mac-arm64`, `mac-intel`

All proxy access goes through `src/lib/releases.ts::getLatestRelease()`. It's wrapped in `React.cache` (per-request memoization) and the underlying `fetch` is revalidated every 5 minutes (matches the proxy's own cache TTL). If the proxy is unreachable, the helper returns a `FALLBACK` that points at the friendly-slug URLs — the page still renders, just without a real version.

### Env

| Var                | Default                            | Notes                                                |
| ------------------ | ---------------------------------- | ---------------------------------------------------- |
| `UPDATE_PROXY_URL` | `https://update.getcracked.gg`     | Server-only. Set in `.env.local` to point at a local proxy during dev. |

# Making the site reflect new app features

The whole point of the content/ + lib/ split is that **adding an app feature is a one-file edit** on the marketing side.

All landing-page copy and numbers live in `src/content/`. Each section's component is just rendering — touch the content file, not the component.

| Section            | Content file                | What lives there                                  |
| ------------------ | --------------------------- | ------------------------------------------------- |
| Features grid      | `content/features.tsx`      | Feature cards (icon, title, body, chips)          |
| Trust strip        | `content/trust.tsx`         | The 4 pillars under the hero                      |
| Performance bench  | `content/perf-bench.ts`     | Bar rows + the 4-claim bullet list                |
| Comparison matrix  | `content/comparison.tsx`    | Competitors + rows + cell helpers                 |
| Version + downloads | (live from update proxy)   | See "The update proxy contract" above             |

## To add a feature card

Edit `src/content/features.tsx`. Each entry is:

```ts
{
  id: "stable-kebab-id",   // used as React key + future deep-link anchor
  icon: <SomeIcon size={18} />,
  title: "Short headline",
  body: "One paragraph — sentence-case, second-person, no marketing fluff.",
  chips: ["short", "labels"],
  span?: 2,                 // optional — makes the card double-width on md+
}
```

Order in the array = display order in the grid. No code changes needed beyond importing the icon (add a new one to `src/components/icons.tsx` if needed — they're all inline SVGs sharing one `svg()` factory).

## To change a trust pillar

Edit `src/content/trust.tsx`. Keep it to ~4 pillars — the strip wraps awkwardly past that. Each pillar is `{ id, icon, lead, tail }` where `lead` renders bold and `tail` follows in normal weight.

## To update a perf-bench number or claim

Edit `src/content/perf-bench.ts`. Two arrays:

- `benchRows` — the animated bars. Within each `sub` group (e.g. "RAM at idle"), set `width` (0–100) proportionally so bars stay honest at a glance. Mark our row with `us: true`.
- `benchClaims` — the bullet list on the left panel. Lead is bold, tail is plain.

## To add a competitor or row to the comparison table

Edit `src/content/comparison.tsx`. To add a **competitor**: append a name to `competitors` and add one cell to every row's `cells` array (in the same position). To add a **row**: append `{ label, sub?, cells: [...] }` with one cell per competitor. Cell builders (`yes`, `no()`, `meh()`, `num()`, `bigNum()`, `word()`) live at the top of the same file — edit styling there once and every row picks it up.

> If you change `competitors.length`, bump the `1fr` count in `landing/Comparison.tsx`'s `gridCols` to match. (Tailwind needs static class strings, so the grid template can't be derived from data.)

## To bump the displayed version

Don't. The version pill and CTA labels read live from the proxy. Cut a release in `../GetCracked.GG`; the proxy serves it on the next 5-minute cache miss; the site picks it up on the next revalidation.

## To add or change a download target

Update the proxy first (`services/update-proxy/src/api.rs`'s slug map + the release pipeline that produces the artifact). Once `/releases/latest` returns the new `downloads.<key>`, expose it in `src/lib/releases.ts` (`ReleaseManifest` + `DIRECT_DOWNLOAD_URLS`) and render a button in `FinalCta.tsx`. Hero's primary CTA only branches Mac vs Windows — don't add a third branch there; surface extras in the download section instead.

## To add a new page section

Create `src/components/landing/<Section>.tsx` and import it into `src/app/page.tsx`. Sections are flat — no shared layout component between them. If the section needs release data, make it `async` and call `getLatestRelease()` directly; `React.cache` dedupes the call.

# Conventions

- **No GitHub link in the site.** The repo is private. Don't add a footer/nav link.
- **Tailwind v4 + custom design tokens** (in `src/app/globals.css` and via `glass-panel` / `text-muted-strong` / `bg-glass-bg` utility classes). Reuse tokens; don't introduce raw hex colors.
- **Icons are inline SVGs**, not an icon library. Add new ones to `src/components/icons.tsx` using the shared `svg()` factory.
- **No client components unless they need a browser API.** Default to server components so data fetching stays on the server.
