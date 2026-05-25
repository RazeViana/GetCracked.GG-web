"use client";

import { useSyncExternalStore } from "react";
import { ButtonLink } from "@/components/Button";
import { Apple, Windows } from "@/components/icons";
import { detectPlatform } from "@/lib/platform";

type Props = {
  windowsUrl: string;
  macUrl: string;
  version: string;
};

const subscribe = () => () => {};
const getClientSnapshot = () => detectPlatform();
const getServerSnapshot = () => "windows" as const;

/**
 * Renders the hero's primary download CTA, adapting to the visitor's OS.
 * Pre-hydration HTML shows the Windows variant (largest segment); the Mac
 * variant swaps in on hydration if the client is a Mac.
 */
export function PrimaryDownload({ windowsUrl, macUrl, version }: Props) {
  const platform = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  const isMac = platform === "mac";
  const url = isMac ? macUrl : windowsUrl;
  const label = isMac ? "Download for macOS" : "Download for Windows";
  const Icon = isMac ? Apple : Windows;

  return (
    <ButtonLink variant="primary" size="lg" href={url}>
      <Icon size={18} />
      {label}
      {version && (
        <span className="ml-1 font-mono text-[11px] font-normal opacity-70">
          v{version}
        </span>
      )}
    </ButtonLink>
  );
}
