import { ButtonLink } from "@/components/Button";
import { Apple, Windows } from "@/components/icons";
import { DIRECT_DOWNLOAD_URLS, getLatestRelease } from "@/lib/releases";

export async function FinalCta() {
  const release = await getLatestRelease();
  const version = release.version;

  const windowsUrl = release.downloads.windows?.url ?? DIRECT_DOWNLOAD_URLS.windows;
  const macArm64Url = release.downloads.macArm64?.url ?? DIRECT_DOWNLOAD_URLS.macArm64;
  const macIntelUrl = release.downloads.macIntel?.url ?? DIRECT_DOWNLOAD_URLS.macIntel;

  return (
    <section id="download" className="px-6">
      <div
        className="relative mx-auto my-20 max-w-[1200px] overflow-hidden rounded-[28px] border border-glass-border px-8 py-14 text-center backdrop-blur-[20px] backdrop-saturate-[140%]"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 50% 100%, oklch(0.78 0.12 250 / 0.25), transparent 70%), var(--color-glass-bg)",
          boxShadow:
            "0 8px 40px 0 oklch(0 0 0 / 0.25), inset 0 1px 0 0 var(--color-glass-highlight)",
        }}
      >
        <h2 className="display-type mb-4 text-[clamp(40px,5vw,64px)] leading-none tracking-[0.02em]">
          Drop in. <span className="text-primary">Climb out.</span>
        </h2>
        <p className="mx-auto mb-7 max-w-[540px] text-[15px] leading-[1.55] text-muted-strong">
          Free, open source, 18 megabytes. Next time champ select pops, your
          runes will already be there.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <ButtonLink variant="primary" size="lg" href={windowsUrl}>
            <Windows size={16} />
            Download for Windows
            <span className="ml-1 font-mono text-[11px] font-normal opacity-70">
              v{version}
            </span>
          </ButtonLink>
          <ButtonLink variant="glass" size="lg" href={macArm64Url}>
            <Apple size={16} />
            macOS (Apple Silicon)
          </ButtonLink>
          <ButtonLink variant="glass" size="lg" href={macIntelUrl}>
            <Apple size={16} />
            macOS (Intel)
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
