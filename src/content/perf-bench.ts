export type BenchRow = {
  /** App / category name shown in the left column. */
  name: string;
  /** Smallcaps subline under the name. */
  sub: string;
  /** Bar width as a percentage of the row, 0–100. Scale all rows in a group together. */
  width: number;
  /** Numeric value rendered on the right. */
  value: number;
  unit: "MB";
  /** `true` highlights the row as the GetCracked.GG entry. */
  us?: boolean;
};

/**
 * Bars in the right-hand panel of the Performance section.
 * Within each `sub` group, set `width` proportionally so the bars are
 * visually honest at a glance. Numbers are indicative — the section
 * already labels them that way.
 */
export const benchRows: BenchRow[] = [
  { name: "Other apps",    sub: "RAM at idle",  width: 92, value: 320, unit: "MB" },
  { name: "Browser tab",   sub: "RAM at idle",  width: 48, value: 160, unit: "MB" },
  { name: "GetCracked.GG", sub: "RAM at idle",  width: 14, value: 42,  unit: "MB", us: true },
  { name: "Other apps",    sub: "Install size", width: 100, value: 210, unit: "MB" },
  { name: "GetCracked.GG", sub: "Install size", width: 9,   value: 18,  unit: "MB", us: true },
];

export type BenchClaim = {
  id: string;
  /** Bold lead — e.g. "42 MB idle." */
  lead: string;
  /** Plain follow-up sentence. */
  tail: string;
};

/**
 * Bullet list in the left-hand panel of the Performance section.
 * Keep each lead short — it's set in bold and sits on the same line as the tail.
 */
export const benchClaims: BenchClaim[] = [
  { id: "ram",     lead: "42 MB idle.",   tail: "Lighter than a single Chrome tab." },
  { id: "install", lead: "18 MB install.", tail: "Done downloading before the patcher finishes." },
  { id: "startup", lead: "Opens in 0.4s.", tail: "Not 6 seconds, not a splash screen — instant." },
  { id: "offline", lead: "Cached offline.", tail: "Works mid-flight, mid-LAN, mid-power-cut." },
];
