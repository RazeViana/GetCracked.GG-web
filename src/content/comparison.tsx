import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Comparison-matrix content. To add a competitor, append to `competitors` AND
 * append one cell to every row's `cells` tuple. To add a row, append to `rows`
 * with one cell per competitor. The component derives its grid layout from
 * `competitors.length`, so no layout edits needed.
 */

export const competitors = [
  "GetCracked.GG", // index 0 — always us
  "Porofessor",
  "U.GG",
  "Blitz",
  "Mobalytics",
] as const;

type Cell = ReactNode;

export type ComparisonRow = {
  label: string;
  /** Smallcaps subline under the label, e.g. "lower is better". */
  sub?: string;
  /** One cell per competitor, in the same order as `competitors`. */
  cells: Cell[];
};

// --- Cell builders ----------------------------------------------------------
// These are tiny JSX helpers used to keep the rows below readable. Edit styles
// here once; every row picks them up.

const yes = <span className="text-base font-semibold text-success-soft">✓</span>;

const no = (label: string = "—") => (
  <span className="text-xs text-[oklch(0.55_0.02_260)]">{label}</span>
);

const meh = (label: string) => (
  <span className="text-xs text-warning">{label}</span>
);

const num = (n: string, unit?: string, bad = false) => (
  <span
    className={cn(
      "font-mono text-[13px]",
      bad ? "text-[oklch(0.78_0.01_250)]" : "text-muted-strong",
    )}
  >
    {n}
    {unit && <span className="ml-0.5 text-[10px] text-muted">{unit}</span>}
  </span>
);

const bigNum = (n: string, unit?: string) => (
  <b className="display-type text-[22px] leading-none tracking-[0.02em] text-primary">
    {n}
    {unit && (
      <span className="ml-[3px] font-mono text-[11px] tracking-normal text-muted">
        {unit}
      </span>
    )}
  </b>
);

const word = (text: string) => (
  <b className="display-type text-[22px] leading-none tracking-[0.02em] text-primary">
    {text}
  </b>
);

// --- Rows -------------------------------------------------------------------

export const comparisonRows: ComparisonRow[] = [
  {
    label: "RAM at idle",
    sub: "lower is better",
    cells: [
      bigNum("42", "MB"),
      num("~280", "MB", true),
      num("~250", "MB", true),
      num("~340", "MB", true),
      num("~310", "MB", true),
    ],
  },
  {
    label: "Install size",
    cells: [
      bigNum("18", "MB"),
      num("~180", "MB", true),
      num("web only", undefined, true),
      num("~210", "MB", true),
      num("~200", "MB", true),
    ],
  },
  {
    label: "Auto-import runes",
    cells: [yes, no(), yes, yes, yes],
  },
  {
    label: "All 16 regions",
    cells: [yes, yes, yes, meh("most"), meh("most")],
  },
  {
    label: "No account required",
    cells: [yes, yes, yes, no("login"), no("login")],
  },
  {
    label: "No ads or upsells",
    cells: [yes, no("ads"), no("ads"), no("premium"), no("premium")],
  },
  {
    label: "Open source",
    cells: [yes, no(), no(), no(), no()],
  },
  {
    label: "Price",
    cells: [
      word("Free"),
      num("Free / $$"),
      num("Free"),
      num("Free / $$"),
      num("Free / $$"),
    ],
  },
];
