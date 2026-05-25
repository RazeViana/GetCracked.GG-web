const links = [
  { href: "#", label: "Changelog" },
  { href: "#", label: "Privacy" },
  { href: "#", label: "Discord" },
];

export function Footer() {
  return (
    <footer className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-3 border-t border-glass-border px-6 py-8 text-xs text-muted sm:flex-row sm:items-center">
      <div>© {new Date().getFullYear()} GetCracked.GG · Not endorsed by Riot Games.</div>
      <div className="flex gap-[18px]">
        {links.map((l) => (
          <a key={l.label} href={l.href} className="transition-colors hover:text-foreground">
            {l.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
