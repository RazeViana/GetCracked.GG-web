export function Footer() {
  return (
    <footer className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-3 border-t border-glass-border px-6 py-8 text-xs text-muted sm:flex-row sm:items-center">
      <div>© {new Date().getFullYear()} GetCracked.GG · Not endorsed by Riot Games.</div>
    </footer>
  );
}
