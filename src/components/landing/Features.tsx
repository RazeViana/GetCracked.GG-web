import type { ReactNode } from "react";
import { features } from "@/content/features";
import { cn } from "@/lib/cn";

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-[oklch(1_0_0/0.1)] bg-[oklch(1_0_0/0.06)] px-2.5 py-1 font-mono text-[10.5px] text-muted-strong">
      {children}
    </span>
  );
}

export function Features() {
  return (
    <section
      id="features"
      className="mx-auto max-w-[1200px] px-6 pb-6 pt-20"
    >
      <div className="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="mb-3.5 text-[11px] uppercase tracking-[0.18em] text-muted">
            What it does
          </div>
          <h2 className="display-type text-[clamp(34px,4vw,52px)] leading-none tracking-[0.02em]">
            Everything you need.
            <br />
            Nothing you don&apos;t.
          </h2>
        </div>
        <p className="max-w-[460px] text-[15px] leading-[1.55] text-muted-strong">
          Pick a champ. Lock in. Climb. The companion handles the rest while you
          focus on the game.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {features.map((f) => (
          <article
            key={f.id}
            className={cn(
              "glass-panel flex min-h-[220px] flex-col gap-3 rounded-[22px] p-[22px]",
              f.span === 2 && "md:col-span-2",
            )}
          >
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] border border-[oklch(0.78_0.12_250/0.3)] bg-[oklch(0.78_0.12_250/0.15)] text-primary">
              {f.icon}
            </div>
            <h3 className="text-[17px] font-semibold tracking-[-0.01em]">
              {f.title}
            </h3>
            <p className="text-[13.5px] leading-[1.55] text-[oklch(0.78_0.01_250)]">
              {f.body}
            </p>
            <div className="mt-auto flex flex-wrap gap-2.5">
              {f.chips.map((c) => (
                <Chip key={c}>{c}</Chip>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
