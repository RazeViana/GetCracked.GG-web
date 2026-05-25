"use client";

import { useEffect, useRef, useState } from "react";
import { benchClaims, benchRows } from "@/content/perf-bench";
import { cn } from "@/lib/cn";

export function PerformanceBench() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setArmed(true);
            obs.disconnect();
          }
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="performance"
      className="mx-auto max-w-[1200px] px-6 pb-6 pt-20"
    >
      <div className="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="mb-3.5 text-[11px] uppercase tracking-[0.18em] text-muted">
            Performance
          </div>
          <h2 className="display-type text-[clamp(34px,4vw,52px)] leading-none tracking-[0.02em]">
            Should run on a toaster.
          </h2>
        </div>
        <p className="max-w-[460px] text-[15px] leading-[1.55] text-muted-strong">
          One window. Less RAM than a Discord notification. Doesn&apos;t fight
          your game for resources during a teamfight.
        </p>
      </div>

      <div className="glass-panel-lg grid grid-cols-1 overflow-hidden rounded-[26px] md:grid-cols-[1.1fr_1fr]">
        <div className="border-b border-glass-border p-9 md:border-b-0 md:border-r">
          <h3 className="display-type mb-4 text-[clamp(32px,3.6vw,46px)] leading-[1.02] tracking-[0.02em]">
            Doesn&apos;t tank
            <br />
            your <em className="not-italic text-primary">frames.</em>
          </h3>
          <p className="max-w-[460px] text-[14.5px] leading-[1.6] text-muted-strong">
            Other companion apps stack a whole second browser onto your machine
            just to show you a build page. We don&apos;t — so the RAM goes back
            to your game where it belongs.
          </p>
          <ul className="mt-6 flex flex-col gap-3">
            {benchClaims.map((claim) => (
              <li
                key={claim.id}
                className="flex items-start gap-2.5 text-[13.5px] text-[oklch(0.88_0.01_250)]"
              >
                <span className="mt-px flex-shrink-0 text-primary">→</span>
                <span>
                  <b className="font-medium text-foreground">{claim.lead}</b>{" "}
                  {claim.tail}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div ref={ref} className="relative p-7">
          <div className="flex flex-col gap-[22px]">
            {benchRows.map((r, i) => (
              <div
                key={i}
                className="grid grid-cols-[130px_1fr_88px] items-center gap-3.5"
              >
                <div className={cn("text-[13px]", r.us ? "font-semibold text-foreground" : "text-[oklch(0.88_0.01_250)]")}>
                  {r.name}
                  <span className="mt-0.5 block text-[10.5px] uppercase tracking-[0.04em] text-muted">
                    {r.sub}
                  </span>
                </div>
                <div className="relative h-7 overflow-hidden rounded-lg border border-[oklch(1_0_0/0.1)] bg-[oklch(1_0_0/0.06)]">
                  <div
                    className={cn(
                      "absolute inset-y-0 left-0 rounded-[7px] [box-shadow:inset_0_1px_0_0_oklch(1_0_0/0.15)]",
                      "transition-[width] duration-[1400ms] [transition-timing-function:cubic-bezier(.2,.7,.2,1)]",
                      r.us
                        ? "bg-[linear-gradient(90deg,oklch(0.55_0.15_280/0.6),oklch(0.78_0.12_250/0.85))]"
                        : "bg-[linear-gradient(90deg,oklch(0.45_0.04_270/0.6),oklch(0.55_0.04_270/0.85))]",
                    )}
                    style={{ width: armed ? `${r.width}%` : "0%" }}
                  />
                </div>
                <div
                  className={cn(
                    "display-type text-right text-[22px] leading-none tracking-[0.02em]",
                    r.us ? "text-primary" : "text-foreground",
                  )}
                >
                  {r.value}
                  <span className="ml-0.5 font-mono text-[11px] text-muted">
                    {r.unit}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 font-mono text-[11px] tracking-[0.04em] text-muted">
            Indicative figures · your mileage may vary
          </div>
        </div>
      </div>
    </section>
  );
}
