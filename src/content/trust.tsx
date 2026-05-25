import type { ReactNode } from "react";
import { Check, Clock, Globe, Shield } from "@/components/icons";

export type TrustPillar = {
  id: string;
  icon: ReactNode;
  /** Bold lead sentence. Trailing period included. */
  lead: string;
  /** Short tail clause after the bold lead. */
  tail: string;
};

/**
 * The promises shown in the strip directly under the hero.
 * Order = display order. Keep it to ~4 — the strip wraps awkwardly past that.
 */
export const trustPillars: TrustPillar[] = [
  {
    id: "riot-safe",
    icon: <Shield size={16} />,
    lead: "Riot-safe.",
    tail: "Won’t get you banned.",
  },
  {
    id: "fast-runes",
    icon: <Clock size={16} />,
    lead: "Runes in <1s.",
    tail: "Done before lock-in.",
  },
  {
    id: "all-regions",
    icon: <Globe size={16} />,
    lead: "Every server.",
    tail: "NA, EUW, KR — all 16.",
  },
  {
    id: "no-login",
    icon: <Check size={16} />,
    lead: "No login.",
    tail: "No tracking. No ads.",
  },
];
