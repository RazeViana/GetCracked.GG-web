@AGENTS.md

# How to edit site content

Marketing copy and numbers are deliberately separated from rendering. To change what appears on the page, edit a file under `src/content/` — never edit the component itself unless you're changing layout or styling.

| To change…                            | Edit this file                       |
| ------------------------------------- | ------------------------------------ |
| A feature card (grid under the hero)  | `src/content/features.tsx`           |
| A trust pillar (strip below the hero) | `src/content/trust.tsx`              |
| A perf-bench bar or claim             | `src/content/perf-bench.ts`          |
| The competitor comparison table       | `src/content/comparison.tsx`         |
| Hero / section copy that isn't above  | the matching `src/components/landing/<Section>.tsx` |
| The displayed version + download URLs | Don't — cut a release in the app repo; the site picks it up on the next 5-min revalidation via the update proxy |

Each content file is the single source of truth for its section. Array order = display order. The full recipes (field-by-field, with caveats) are in [AGENTS.md](./AGENTS.md) under "Making the site reflect new app features".

If you find yourself editing a component file to change copy or numbers, stop — that content probably belongs in `src/content/` and isn't there yet. Promote it before changing it.
