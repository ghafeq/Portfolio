import { useId, type SVGProps } from "react";

// Drawn on a 32px grid with hard edges, the way the Finder's icons were.
const ICON = { "aria-hidden": true, shapeRendering: "crispEdges", viewBox: "0 0 32 32" } as const;
const INK = { fill: "none", stroke: "var(--mac-ink)", strokeWidth: 2 } as const;

export const APPLE_PATH =
  "M10 7C8 5.6 4.5 5.4 2.6 8c-2.2 3-1.2 8.6 1.2 12 1.2 1.7 2.4 2.6 3.8 2.2 1-.3 1.6-.8 2.8-.8s1.8.5 2.8.8c1.4.4 2.6-.8 3.8-2.6.8-1.2 1.4-2.4 1.7-3.4-2.1-1-3.3-2.8-3.3-4.8 0-1.8 1-3.2 2.4-4-1.2-1.6-3.2-2-4.8-1.7C11.8 5.9 10.8 6.6 10 7ZM10 5.4C10 3 11.8 1 14.2.8c.2 2.4-1.8 4.4-4.2 4.6Z";

/** The rainbow badge, on the case and at the left of the menu bars. */
export function MacApple(props: SVGProps<SVGSVGElement>) {
  const stripes = useId();

  return (
    <svg aria-hidden="true" viewBox="0 0 20 24" {...props}>
      <defs>
        <linearGradient id={stripes} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0.3" stopColor="var(--mac-stripe-1)" />
          <stop offset="0.3" stopColor="var(--mac-stripe-2)" />
          <stop offset="0.45" stopColor="var(--mac-stripe-2)" />
          <stop offset="0.45" stopColor="var(--mac-stripe-3)" />
          <stop offset="0.57" stopColor="var(--mac-stripe-3)" />
          <stop offset="0.57" stopColor="var(--mac-stripe-4)" />
          <stop offset="0.69" stopColor="var(--mac-stripe-4)" />
          <stop offset="0.69" stopColor="var(--mac-stripe-5)" />
          <stop offset="0.82" stopColor="var(--mac-stripe-5)" />
          <stop offset="0.82" stopColor="var(--mac-stripe-6)" />
        </linearGradient>
      </defs>
      <path d={APPLE_PATH} fill={`url(#${stripes})`} />
    </svg>
  );
}

export function FolderIcon() {
  return (
    <svg {...ICON}>
      <path d="M3 8h10l2 3h14v17H3z" fill="var(--yellow-20)" stroke="var(--mac-ink)" strokeWidth={2} />
    </svg>
  );
}

export function DocumentIcon() {
  return (
    <svg {...ICON}>
      <path d="M6 3h14l6 6v20H6z" fill="var(--mac-paper)" stroke="var(--mac-ink)" strokeWidth={2} />
      <path d="M20 3v6h6M10 14h12M10 18h12M10 22h8" {...INK} />
    </svg>
  );
}

export function DiskIcon() {
  return (
    <svg {...ICON}>
      <path d="M3 9h26v15H3z" fill="var(--mac-paper)" stroke="var(--mac-ink)" strokeWidth={2} />
      <path d="M7 14h18M7 18h12M23 19h2" {...INK} />
    </svg>
  );
}

export function TrashIcon() {
  return (
    <svg {...ICON}>
      <path d="M8 8h16l-2 21H10z" fill="var(--mac-paper)" stroke="var(--mac-ink)" strokeWidth={2} />
      <path d="M5 8h22M12 8V4h8v4M13 12v13M16 12v13M19 12v13" {...INK} />
    </svg>
  );
}

/** Points up. CSS turns it for the other three scroll arrows. */
export function ScrollArrow() {
  return (
    <svg aria-hidden="true" className="mac-scroll-arrow" shapeRendering="crispEdges" viewBox="0 0 16 16">
      <path d="M8 2l6 6h-3v5H5V8H2z" fill="var(--mac-paper)" stroke="var(--mac-ink)" />
    </svg>
  );
}
