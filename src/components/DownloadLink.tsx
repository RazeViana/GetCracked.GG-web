"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import posthog from "posthog-js";
import { ButtonLink } from "@/components/Button";

export type DownloadPlatform = "windows" | "macArm64" | "macIntel";

type Props = {
  platform: DownloadPlatform;
  href: string;
  version?: string;
  source: "hero" | "final-cta";
  variant?: "primary" | "glass";
  size?: "md" | "lg";
  className?: string;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children">;

export function DownloadLink({
  platform,
  href,
  version,
  source,
  variant = "primary",
  size = "lg",
  className,
  children,
  ...rest
}: Props) {
  return (
    <ButtonLink
      variant={variant}
      size={size}
      href={href}
      className={className}
      onClick={() => {
        posthog.capture("app_download_clicked", {
          platform,
          source,
          version,
          href,
        });
      }}
      {...rest}
    >
      {children}
    </ButtonLink>
  );
}
