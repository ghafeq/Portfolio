import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { presentationAsset } from "./assets";

/**
 * A length in slide pixels. Every slide is drawn on its Figma frame, 1440 wide,
 * and --u is one frame pixel at the current screen size, so numbers read off
 * the design go straight in.
 */
export const u = (pixels: number) => `calc(var(--u) * ${pixels})`;

const cx = (...names: (string | false | undefined)[]) => names.filter(Boolean).join(" ");

export interface SlideProps {
  /** Read out in place of the slide, which is mostly picture. */
  label: string;
  /** The Figma frame's height. Most are 1024; a few run taller. */
  height?: number;
  className?: string;
  /** Overrides on the slide's column, such as how its rows are spaced. */
  style?: CSSProperties;
  children?: ReactNode;
}

/** One frame of a deck, scaled to fit the screen and centred in it. */
export function Slide({ label, height = 1024, className, style, children }: SlideProps) {
  return (
    <section
      aria-label={label}
      className="deck-slide-frame"
      data-slide
      style={{ "--slide-h": height } as CSSProperties}
    >
      <div className={cx("deck-slide", className)} style={style}>
        {children}
      </div>
    </section>
  );
}

export interface SlideTitleProps {
  children: ReactNode;
  /** A line of supporting text under the title. */
  lead?: ReactNode;
  /** The 64px title that opens a deck, rather than a section's 48px one. */
  hero?: boolean;
  /** The page's first title is its h1; every later one is an h2. */
  as?: "h1" | "h2";
}

export function SlideTitle({ children, lead, hero = false, as: Tag = "h2" }: SlideTitleProps) {
  return (
    <header className="deck-head">
      <Tag className={cx("deck-title", hero && "deck-title-hero")}>{children}</Tag>
      {lead && <p className="deck-lead">{lead}</p>}
    </header>
  );
}

/** Plus Jakarta Sans, as every card heading in the decks is set. */
export function Heading({
  size,
  as: Tag = "h3",
  children,
}: {
  size: number;
  as?: "h3" | "p";
  children: ReactNode;
}) {
  return (
    <Tag className="deck-heading" style={{ fontSize: u(size) }}>
      {children}
    </Tag>
  );
}

/** Inter at a given size, for body copy. */
export function Text({ size, children }: { size: number; children: ReactNode }) {
  return (
    <p className="deck-text" style={{ fontSize: u(size) }}>
      {children}
    </p>
  );
}

/**
 * The near-black card the decks set their claims on. Spread pins the heading
 * to the top and the copy to the foot; centred stacks them in the middle.
 */
export function Panel({
  layout,
  style,
  children,
}: {
  layout: "spread" | "centred";
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div className={cx("deck-panel", `deck-panel-${layout}`)} style={style}>
      {children}
    </div>
  );
}

/** Role, stack and year, across the foot of a deck's opening slide. */
export function Meta({ items }: { items: [term: string, value: string][] }) {
  return (
    <dl className="deck-meta">
      {items.map(([term, value]) => (
        <div key={term}>
          <dt className="deck-meta-term">{term}</dt>
          <dd className="deck-meta-value">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export interface ShotProps {
  /** A file in /public/projects/Presentation, or a full public path. */
  src: string;
  /** Empty for a picture that only illustrates the text beside it. */
  alt?: string;
  /** Roughly how wide it renders, for the image optimiser. */
  sizes: string;
  /** Which part stays in view when the box crops the picture. */
  position?: string;
  /** Fetches it straight away, for a picture on screen as the page opens. */
  eager?: boolean;
  className?: string;
  style?: CSSProperties;
}

/** A picture filling the box it is given, cropped to it like a Figma fill. */
export function Shot({ src, alt = "", sizes, position, eager = false, className, style }: ShotProps) {
  return (
    <span className={cx("deck-shot", className)} style={style}>
      <Image
        alt={alt}
        fill
        loading={eager ? "eager" : "lazy"}
        quality={90}
        sizes={sizes}
        src={src.startsWith("/") ? src : presentationAsset(src)}
        style={position ? { objectPosition: position } : undefined}
      />
    </span>
  );
}

export interface StackedScreen {
  file: string;
  /** Offset of its centre from the middle of the box, in slide pixels. */
  dx: number;
  top: number;
  width: number;
  height: number;
}

/**
 * Screenshots stacked back to front, each centred on its box and dropped
 * further down. The box they sit in must be positioned.
 */
export function ScreenStack({ screens, sizes }: { screens: StackedScreen[]; sizes: string }) {
  return screens.map(({ file, dx, top, width, height }) => (
    <Shot
      className="deck-stacked"
      key={file}
      sizes={sizes}
      src={file}
      style={{
        height: u(height),
        left: `calc(50% + ${u(dx)})`,
        top: u(top),
        width: u(width),
      }}
    />
  ));
}
