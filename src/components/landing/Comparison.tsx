import { competitors, comparisonRows } from "@/content/comparison";
import { cn } from "@/lib/cn";

// Tailwind needs static class strings, so the grid template is fixed here for
// the current count of 5 competitors. If you add or remove a competitor in
// src/content/comparison.tsx, bump the number of `1fr` columns below to match.
// (1.4fr = label column, 1.1fr = us column, then one `1fr` per other competitor.)
const gridCols = "grid-cols-[1.4fr_1.1fr_1fr_1fr_1fr_1fr]";

export function Comparison() {
  return (
    <section id="compare" className="mx-auto max-w-[1200px] px-6 pb-6 pt-20">
      <div className="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="mb-3.5 text-[11px] uppercase tracking-[0.18em] text-muted">
            Vs. the rest
          </div>
          <h2 className="display-type text-[clamp(34px,4vw,52px)] leading-none tracking-[0.02em]">
            Same features.
            <br />
            None of the bloat.
          </h2>
        </div>
        <p className="max-w-[460px] text-[15px] leading-[1.55] text-muted-strong">
          Honest comparison with the apps you&apos;ve probably already tried. We
          left out the ones we don&apos;t ship — there&apos;s no overlay, no
          coaching, no premium tier. That&apos;s the point.
        </p>
      </div>

      <div className="glass-panel overflow-hidden rounded-[22px]">
        {/* Desktop header */}
        <div
          className={cn(
            "hidden border-b border-glass-border bg-[oklch(1_0_0/0.04)]",
            "px-5 py-3.5 md:grid",
            gridCols,
            "items-center gap-3 text-[11px] uppercase tracking-[0.14em] text-muted",
          )}
        >
          <div />
          <div className="rounded-md border-x border-[oklch(0.78_0.12_250/0.2)] bg-[oklch(0.78_0.12_250/0.08)] py-1 text-center text-primary">
            {competitors[0]}
          </div>
          {competitors.slice(1).map((h) => (
            <div key={h} className="text-center">
              {h}
            </div>
          ))}
        </div>

        {comparisonRows.map((r, i) => (
          <div
            key={r.label}
            className={cn(
              "px-5 py-4 md:grid",
              gridCols,
              "items-center gap-3",
              i < comparisonRows.length - 1 && "border-b border-[oklch(1_0_0/0.06)]",
              "grid grid-cols-[1.2fr_1fr] md:gap-3",
            )}
          >
            <div className="text-sm font-medium text-foreground">
              {r.label}
              {r.sub && (
                <span className="mt-0.5 block text-[10.5px] font-normal uppercase tracking-[0.04em] text-muted">
                  {r.sub}
                </span>
              )}
            </div>
            <div className="-my-4 flex items-center justify-center self-stretch border-x border-[oklch(0.78_0.12_250/0.2)] bg-[oklch(0.78_0.12_250/0.08)] px-2 py-4 text-center text-sm text-muted-strong">
              {r.cells[0]}
            </div>
            {r.cells.slice(1).map((c, idx) => (
              <div
                key={idx}
                className="hidden text-center text-sm text-muted-strong md:block"
              >
                {c}
              </div>
            ))}
          </div>
        ))}
      </div>
      <p className="mt-4 px-2 font-mono text-[11px] tracking-[0.04em] text-muted">
        Numbers above are observed approximations on Windows 11, idle. Other-app
        figures vary with overlays enabled.
      </p>
    </section>
  );
}
