"use client";

import { useEffect, useRef, useState } from "react";

const N = 60;
const W = 600;
const H = 100;

function seed(): { us: number[]; them: number[] } {
  const us: number[] = [];
  const them: number[] = [];
  for (let i = 0; i < N; i++) {
    us.push(70 + Math.sin(i * 0.4) * 4 + (Math.random() - 0.5) * 4);
    them.push(22 + Math.sin(i * 0.25 + 1) * 5 + (Math.random() - 0.5) * 6);
  }
  return { us, them };
}

function toPath(arr: number[], close = false) {
  let d = "";
  for (let i = 0; i < arr.length; i++) {
    const x = (i / (N - 1)) * W;
    const y = arr[i];
    d += (i === 0 ? "M " : "L ") + x.toFixed(1) + " " + y.toFixed(1) + " ";
  }
  if (close) d += `L ${W} ${H} L 0 ${H} Z`;
  return d;
}

export function PerfCard() {
  const [ram, setRam] = useState(42);
  const usPath = useRef<SVGPathElement | null>(null);
  const usFill = useRef<SVGPathElement | null>(null);
  const themFill = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    let { us, them } = seed();
    if (usPath.current) usPath.current.setAttribute("d", toPath(us));
    if (usFill.current) usFill.current.setAttribute("d", toPath(us, true));
    if (themFill.current) themFill.current.setAttribute("d", toPath(them, true));

    const chartId = setInterval(() => {
      us = [...us.slice(1)];
      them = [...them.slice(1)];
      const t = Date.now() / 1000;
      us.push(70 + Math.sin(t * 0.6) * 5 + (Math.random() - 0.5) * 6);
      them.push(22 + Math.sin(t * 0.4) * 4 + (Math.random() - 0.5) * 5);
      usPath.current?.setAttribute("d", toPath(us));
      usFill.current?.setAttribute("d", toPath(us, true));
      themFill.current?.setAttribute("d", toPath(them, true));
    }, 700);

    const ramId = setInterval(() => {
      setRam(41 + Math.round(Math.random() * 4));
    }, 1300);

    return () => {
      clearInterval(chartId);
      clearInterval(ramId);
    };
  }, []);

  return (
    <div className="glass-panel relative overflow-hidden rounded-[22px] p-[22px]">
      {/* aurora blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-[200px] w-[200px] rounded-full bg-[oklch(0.78_0.12_250/0.3)] blur-[40px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -left-20 h-[200px] w-[200px] rounded-full bg-[oklch(0.55_0.15_280/0.25)] blur-[40px]"
      />

      <div className="relative mb-4 flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-[0.14em] text-muted">
          Live · resource monitor
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[oklch(0.6_0.12_155/0.3)] bg-[oklch(0.6_0.12_155/0.15)] px-2.5 py-1 text-[11px] text-success-soft">
          <span className="pulse-soft h-[5px] w-[5px] rounded-full bg-success-soft" />
          idle
        </span>
      </div>

      <div className="relative mb-4 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.04)] p-4">
          <div className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-[0.12em] text-muted">
            <span>Memory</span>
            <span className="font-mono text-[10px]">RSS</span>
          </div>
          <div className="display-type text-[38px] leading-none tabular-nums">
            {ram}
            <span className="ml-1 font-mono text-base text-muted">MB</span>
          </div>
          <div className="mt-1 font-mono text-[11px] text-success-soft">▼ 87% lighter than Electron baseline</div>
        </div>
        <div className="rounded-2xl border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.04)] p-4">
          <div className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-[0.12em] text-muted">
            <span>Cold start</span>
            <span className="font-mono text-[10px]">avg</span>
          </div>
          <div className="display-type text-[38px] leading-none">
            0.4
            <span className="ml-1 font-mono text-base text-muted">s</span>
          </div>
          <div className="mt-1 font-mono text-[11px] text-success-soft">▼ to interactive</div>
        </div>
      </div>

      <div className="relative h-[150px] overflow-hidden rounded-2xl border border-[oklch(1_0_0/0.06)] bg-[oklch(0_0_0/0.25)] p-3.5">
        <div className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-[0.12em] text-muted">
          <span>RAM · last 60s</span>
          <span className="flex gap-3 text-[10px] normal-case tracking-normal text-muted-strong">
            <span className="inline-flex items-center gap-1.5 font-mono">
              <i className="inline-block h-2 w-2 rounded-[2px] bg-primary" />
              GetCracked.GG
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono">
              <i className="inline-block h-2 w-2 rounded-[2px] bg-[oklch(0.55_0.04_270/0.7)]" />
              Typical Electron
            </span>
          </span>
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-3.5 bottom-3.5 top-9 bg-[linear-gradient(to_right,oklch(1_0_0/0.04)_1px,transparent_1px),linear-gradient(to_bottom,oklch(1_0_0/0.04)_1px,transparent_1px)] bg-[size:12.5%_25%]"
        />
        <svg
          className="absolute inset-x-3.5 bottom-3.5 top-9 h-[calc(100%-50px)] w-[calc(100%-28px)]"
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="usFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="oklch(0.78 0.12 250 / 0.4)" />
              <stop offset="1" stopColor="oklch(0.78 0.12 250 / 0)" />
            </linearGradient>
            <linearGradient id="themFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="oklch(0.55 0.04 270 / 0.3)" />
              <stop offset="1" stopColor="oklch(0.55 0.04 270 / 0)" />
            </linearGradient>
          </defs>
          <path
            d="M 0 22 L 600 22"
            fill="none"
            stroke="oklch(0.55 0.04 270 / 0.7)"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          <path ref={themFill} d="" fill="url(#themFill)" />
          <path ref={usFill} d="" fill="url(#usFill)" />
          <path
            ref={usPath}
            d=""
            fill="none"
            stroke="oklch(0.78 0.12 250)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
