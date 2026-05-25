import { cache } from "react";

const PROXY_BASE = (
  process.env.UPDATE_PROXY_URL ?? "https://update.getcracked.gg"
).replace(/\/+$/, "");

const REVALIDATE_SECS = 300;

export type DownloadAsset = {
  url: string;
  filename: string;
  size: number;
  contentType: string;
};

export type ReleaseManifest = {
  version: string;
  tag: string;
  name: string;
  notes: string;
  publishedAt: string;
  downloads: Partial<{
    macArm64: DownloadAsset;
    macIntel: DownloadAsset;
    windows: DownloadAsset;
  }>;
};

export const DIRECT_DOWNLOAD_URLS = {
  windows: `${PROXY_BASE}/download/windows`,
  macArm64: `${PROXY_BASE}/download/mac-arm64`,
  macIntel: `${PROXY_BASE}/download/mac-intel`,
} as const;

const FALLBACK: ReleaseManifest = {
  version: "0.0.0",
  tag: "",
  name: "",
  notes: "",
  publishedAt: "",
  downloads: {
    windows: {
      url: DIRECT_DOWNLOAD_URLS.windows,
      filename: "",
      size: 0,
      contentType: "",
    },
    macArm64: {
      url: DIRECT_DOWNLOAD_URLS.macArm64,
      filename: "",
      size: 0,
      contentType: "",
    },
    macIntel: {
      url: DIRECT_DOWNLOAD_URLS.macIntel,
      filename: "",
      size: 0,
      contentType: "",
    },
  },
};

export const getLatestRelease = cache(async (): Promise<ReleaseManifest> => {
  try {
    const res = await fetch(`${PROXY_BASE}/releases/latest`, {
      next: { revalidate: REVALIDATE_SECS },
    });
    if (!res.ok) return FALLBACK;
    const json = (await res.json()) as ReleaseManifest;
    return {
      ...FALLBACK,
      ...json,
      downloads: { ...FALLBACK.downloads, ...json.downloads },
    };
  } catch {
    return FALLBACK;
  }
});
