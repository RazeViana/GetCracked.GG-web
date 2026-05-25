import { CrestMark, Wordmark } from "@/components/Logo";

const links = [
  { href: "#features", label: "Features" },
  { href: "#performance", label: "Performance" },
  { href: "#compare", label: "Compare" },
  { href: "#download", label: "Download" },
];

export function TopNav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-glass-border bg-[oklch(0.1_0.02_270/0.6)] backdrop-blur-[20px] backdrop-saturate-[140%]">
      <div className="mx-auto flex max-w-[1200px] items-center gap-6 px-6 py-3.5">
        <a href="#" className="inline-flex items-center gap-3" aria-label="GetCracked.GG home">
          <CrestMark size={32} />
          <Wordmark />
        </a>
        <div className="ml-auto flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hidden rounded-full px-3.5 py-2 text-sm text-muted-strong transition-colors duration-200 hover:bg-glass-bg-heavy hover:text-foreground sm:inline-block"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
