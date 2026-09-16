import Image from "next/image";

// Each glyph's box within the 1440 × 758 cover frame, in percent, so the pair
// holds its composition at any size.
const GLYPHS = [
  { src: "/projects/Goshi/go-left.svg", left: 17.292, top: 21.458, width: 29.41, height: 78.542 },
  { src: "/projects/Goshi/go-right.svg", left: 52.047, top: 0, width: 30.635, height: 78.953 },
];

/**
 * The Gōshi cover: the "gō" letterforms on black, cropped by the frame edges.
 * Drawn from the two vectors rather than a flattened export, so it stays sharp
 * both as the case study cover and as the home page tile banner.
 */
export function GoshiCover({
  className,
  preload = false,
}: {
  className?: string;
  /** Set where the cover is the first thing on the page. */
  preload?: boolean;
}) {
  return (
    <span aria-hidden="true" className={["goshi-cover", className].filter(Boolean).join(" ")}>
      <span className="goshi-cover-art">
        {GLYPHS.map(({ src, left, top, width, height }) => (
          <Image
            alt=""
            className="goshi-cover-glyph"
            height={758}
            key={src}
            preload={preload}
            src={src}
            style={{ left: `${left}%`, top: `${top}%`, width: `${width}%`, height: `${height}%` }}
            unoptimized
            width={1440}
          />
        ))}
      </span>
    </span>
  );
}
