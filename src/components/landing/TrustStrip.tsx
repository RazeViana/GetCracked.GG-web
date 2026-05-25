import { trustPillars } from "@/content/trust";

export function TrustStrip() {
  return (
    <div className="mx-auto mt-6 max-w-[1200px] px-6">
      <div className="glass-panel flex flex-wrap items-center justify-between gap-3 rounded-[22px] px-5 py-4">
        {trustPillars.map((pillar, i) => (
          <div key={pillar.id} className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 text-sm text-muted-strong">
              <span className="inline-flex text-primary">{pillar.icon}</span>
              <span>
                <b className="font-medium text-foreground">{pillar.lead}</b>{" "}
                {pillar.tail}
              </span>
            </div>
            {i < trustPillars.length - 1 && (
              <div className="hidden h-[22px] w-px bg-glass-border md:block" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
