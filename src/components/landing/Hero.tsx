import { ButtonLink } from "@/components/Button";
import { PerfCard } from "@/components/landing/PerfCard";
import { PrimaryDownload } from "@/components/landing/PrimaryDownload";
import { DIRECT_DOWNLOAD_URLS, getLatestRelease } from "@/lib/releases";

export async function Hero() {
  const release = await getLatestRelease();
  const version = release.version;
  const windowsUrl = release.downloads.windows?.url ?? DIRECT_DOWNLOAD_URLS.windows;
  const macUrl = release.downloads.macArm64?.url ?? DIRECT_DOWNLOAD_URLS.macArm64;

  return (
    <header className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-14 px-6 pb-8 pt-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
      <div>
        <div className="mb-[22px] inline-flex items-center gap-2.5 rounded-full border border-glass-border bg-glass-bg px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-muted-strong backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-success shadow-[0_0_8px_var(--color-success)]" />
          v{version} · windows · macos
        </div>
        <h1 className="display-type mb-6 text-[clamp(48px,6vw,86px)] leading-[0.96] tracking-[0.02em]">
          Climb faster.
          <br />
          Run <span className="text-primary">lighter.</span>
        </h1>
        <p className="mb-8 max-w-[540px] text-[17px] leading-[1.55] text-muted-strong">
          The League companion that doesn&apos;t melt your PC. Runes locked in
          before the loading screen. Tierlist, builds, and global profiles in
          one window — running on a fraction of the RAM the other apps need.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <PrimaryDownload
            windowsUrl={windowsUrl}
            macUrl={macUrl}
            version={version}
          />
          <ButtonLink variant="glass" size="lg" href="#features">
            See what it does
          </ButtonLink>
          <div className="ml-1 text-xs leading-snug text-muted">
            <b className="font-medium text-[oklch(0.92_0.01_250)]">Free, open source.</b>
            <br />
            Windows · macOS · 18 MB installer
          </div>
        </div>
      </div>

      <PerfCard />
    </header>
  );
}
