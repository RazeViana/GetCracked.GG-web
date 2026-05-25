import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function svg(
  { size = 16, strokeWidth = 2, ...rest }: IconProps,
  path: React.ReactNode,
) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      {path}
    </svg>
  );
}

export const Shield = (p: IconProps) =>
  svg(
    p,
    <>
      <path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>,
  );

export const Clock = (p: IconProps) =>
  svg(
    p,
    <>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </>,
  );

export const Globe = (p: IconProps) =>
  svg(
    p,
    <>
      <path d="M2 12h2M22 12h-2M12 2v2M12 22v-2M4.93 4.93l1.41 1.41M19.07 19.07l-1.41-1.41M19.07 4.93l-1.41 1.41M6.34 17.66l-1.41 1.41" />
      <circle cx="12" cy="12" r="4" />
    </>,
  );

export const Check = (p: IconProps) =>
  svg(p, <polyline points="20 6 9 17 4 12" />);

export const RunesIcon = (p: IconProps) =>
  svg(
    p,
    <>
      <path d="M12 3v12" />
      <path d="m17 10-5 5-5-5" />
      <path d="M3 21h18" />
    </>,
  );

export const PulseIcon = (p: IconProps) =>
  svg(
    p,
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 5V3M12 21v-2M5 12H3M21 12h-2" />
    </>,
  );

export const ChartIcon = (p: IconProps) =>
  svg(
    p,
    <>
      <path d="M3 3v18h18" />
      <path d="M7 16l4-4 4 4 6-6" />
    </>,
  );

export const SearchGlobeIcon = (p: IconProps) =>
  svg(
    p,
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </>,
  );

export const BuildIcon = (p: IconProps) =>
  svg(
    p,
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
    </>,
  );

export const Windows = ({ size = 16, ...rest }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    {...rest}
  >
    <path d="M3 12V6.75L9 5.43v6.16L3 12zm17-9L11 4.9v7.1L20 12V3zM3 13l6 .58V19l-6-1.32V13zm17 .25L11 14v7l9-1.5v-6.25z" />
  </svg>
);

export const Apple = ({ size = 16, ...rest }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    {...rest}
  >
    <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.495 0-2.55-1.32-3.6-2.95C2.85 17.74 2 14.49 2 11.39c0-4.99 3.27-7.65 6.5-7.65 1.428 0 2.6.94 3.495.94.93 0 2.273-1 3.96-1 .638 0 2.91.06 4.43 2.21-.13.08-2.6 1.5-2.578 4.51.039 3.59 3.183 4.78 3.222 4.79z" />
  </svg>
);

