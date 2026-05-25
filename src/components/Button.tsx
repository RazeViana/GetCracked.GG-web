import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "glass";
type Size = "md" | "lg";

const base =
  "inline-flex items-center gap-2.5 font-medium select-none cursor-pointer " +
  "transition-[background-color,border-color,transform] duration-200 " +
  "active:translate-y-px border";

const sizes: Record<Size, string> = {
  md: "text-sm px-[18px] py-3 rounded-[18px]",
  lg: "text-[15px] px-[22px] py-4 rounded-[22px]",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground border-transparent font-semibold " +
    "[box-shadow:0_2px_8px_0_oklch(0.78_0.12_250/0.25),inset_0_1px_0_0_oklch(1_0_0/0.25)] " +
    "hover:bg-[oklch(0.82_0.12_250)]",
  glass:
    "text-foreground glass-panel hover:bg-[var(--color-glass-bg-heavy)]",
};

const lgPrimaryShadow =
  "[box-shadow:0_4px_24px_0_oklch(0.78_0.12_250/0.35),inset_0_1px_0_0_oklch(1_0_0/0.25)]";

type Common = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        base,
        sizes[size],
        variants[variant],
        size === "lg" && variant === "primary" && lgPrimaryShadow,
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn(
        base,
        sizes[size],
        variants[variant],
        size === "lg" && variant === "primary" && lgPrimaryShadow,
        className,
      )}
      {...rest}
    >
      {children}
    </a>
  );
}
