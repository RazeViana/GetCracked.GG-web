export type DetectedPlatform = "windows" | "mac" | "unknown";

/**
 * Best-effort OS detection from the browser. Returns "unknown" on the server
 * or on platforms we don't ship for (Linux, mobile, etc.). Mac arm64 vs Intel
 * isn't reliably detectable from the UA string, so callers default to arm64
 * and surface Intel as a secondary option in the download section.
 */
export function detectPlatform(): DetectedPlatform {
  if (typeof navigator === "undefined") return "unknown";

  const uaDataPlatform = (
    navigator as Navigator & {
      userAgentData?: { platform?: string };
    }
  ).userAgentData?.platform;

  const source = (uaDataPlatform ?? navigator.userAgent ?? "").toLowerCase();

  if (source.includes("win")) return "windows";
  if (source.includes("mac") || source.includes("darwin")) return "mac";
  return "unknown";
}
