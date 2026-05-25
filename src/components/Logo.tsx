type LogoProps = {
  size?: number;
  className?: string;
};

export function CrestMark({ size = 32, className }: LogoProps) {
  const uid = "crest";
  return (
    <svg
      viewBox="0 0 256 256"
      width={size}
      height={size}
      aria-hidden="true"
      className={className}
    >
      <defs>
        <clipPath id={`${uid}-clip`}>
          <rect width="256" height="256" rx="58" />
        </clipPath>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="oklch(0.24 0.10 280)" />
          <stop offset="1" stopColor="oklch(0.08 0.02 270)" />
        </linearGradient>
        <linearGradient id={`${uid}-peak`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="oklch(0.88 0.10 250)" />
          <stop offset="1" stopColor="oklch(0.55 0.15 260)" />
        </linearGradient>
      </defs>
      <g clipPath={`url(#${uid}-clip)`}>
        <rect width="256" height="256" fill={`url(#${uid}-bg)`} />
        <g transform="translate(128 142)">
          <path
            d="M -84 50 L 0 -78 L 84 50 L 56 50 L 0 -34 L -56 50 Z"
            fill="white"
            fillOpacity="0.92"
          />
          <path
            d="M -36 30 L 0 -28 L 36 30 Z"
            fill={`url(#${uid}-peak)`}
          />
          <rect
            x="-84"
            y="56"
            width="168"
            height="6"
            rx="3"
            fill="oklch(0.78 0.12 250)"
          />
        </g>
      </g>
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={`font-display text-[22px] uppercase tracking-[0.04em] leading-none ${className ?? ""}`}
    >
      GetCracked<span className="text-primary">.GG</span>
    </span>
  );
}

export function Lockup({
  size = 32,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      <CrestMark size={size} />
      <Wordmark />
    </span>
  );
}
