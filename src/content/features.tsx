import type { ReactNode } from "react";
import {
  BuildIcon,
  ChartIcon,
  PulseIcon,
  RunesIcon,
  SearchGlobeIcon,
} from "@/components/icons";

export type FeatureSpan = 1 | 2;

export type Feature = {
  /** Stable id — used as React key and as a hash anchor if we ever deep-link. */
  id: string;
  icon: ReactNode;
  title: string;
  body: string;
  chips: string[];
  /** Column span on md+ grids. Defaults to 1. */
  span?: FeatureSpan;
};

/**
 * Single source of truth for what the desktop companion does.
 * Add a feature → it shows up on the landing page. Order = display order.
 */
export const features: Feature[] = [
  {
    id: "runes",
    icon: <RunesIcon size={18} />,
    title: "Runes set themselves",
    body: "Pick your champ — the best runes and summoner spells appear in your client before lock-in. Solo, flex, or practice tool. No more “wait, what page do I use?”",
    chips: ["solo queue", "flex", "practice tool"],
  },
  {
    id: "live-pill",
    icon: <PulseIcon size={18} />,
    title: "Live game pill",
    body: "A glowing badge in the corner lights up the second champ select pops. One click takes you to your live match. Stays out of the way the rest of the time.",
    chips: ["always-on", "one-click"],
  },
  {
    id: "tierlist",
    icon: <ChartIcon size={18} />,
    title: "Live tier list",
    body: "Who’s broken this patch? Filter by your role and rank. Updates throughout the day so you’re never reading week-old data.",
    chips: ["all roles", "by rank"],
  },
  {
    id: "lookup",
    icon: <SearchGlobeIcon size={18} />,
    title: "Look up anyone, anywhere",
    body: "Type a name, pick a region, see everything: rank, recent matches, KDA, mastery. Works for every server Riot runs — not just NA and EUW. Smurf hunting? Friend on KR? Got you covered.",
    chips: ["NA", "EUW", "EUNE", "KR", "BR", "JP", "OCE", "LAN", "+ 8 more"],
    span: 2,
  },
  {
    id: "builds",
    icon: <BuildIcon size={18} />,
    title: "Builds that work",
    body: "Items, runes, summs, skill order — the highest-winrate build for every champ in every lane. Synced with the tierlist so they always match.",
    chips: ["items", "skills"],
  },
];
