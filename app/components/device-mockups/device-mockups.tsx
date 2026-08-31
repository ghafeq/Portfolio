import Image from "next/image";
import type { CSSProperties } from "react";

/**
 * Positions taken from the Cover1 reference: an arc with the largest screen
 * upright in the middle, flanking screens rotated and dropped, and the outer
 * pair rotated hardest and lowest. x/y are percentages of the banner box and
 * mark each screen's centre; scale is relative to the middle screen.
 */
const LAYOUT = [
  { x: 20, y: 76, rotation: -25, scale: 0.75, depth: 1 },
  { x: 33, y: 62, rotation: -15, scale: 0.75, depth: 2 },
  { x: 50, y: 62, rotation: 0, scale: 1, depth: 3 },
  { x: 67, y: 62, rotation: 15, scale: 0.75, depth: 2 },
  { x: 80, y: 76, rotation: 30, scale: 0.75, depth: 1 },
];

export interface DeviceMockupsProps {
  /** Ordered left to right; the middle one sits centred, upright and largest. */
  images: string[];
  className?: string;
}

/**
 * A fanned arc of phone screens. Hovering one lifts it slightly and brings it
 * in front of the others.
 */
export function DeviceMockups({ images, className }: DeviceMockupsProps) {
  return (
    <span className={["device-mockups", className].filter(Boolean).join(" ")}>
      {images.map((src, index) => {
        const place = LAYOUT[index % LAYOUT.length];

        return (
          <span
            className="device-mockup"
            key={src}
            style={
              {
                "--x": `${place.x}%`,
                "--y": `${place.y}%`,
                "--rotation": `${place.rotation}deg`,
                "--scale": place.scale,
                "--depth": place.depth,
              } as CSSProperties
            }
          >
            <Image alt="" fill sizes="(max-width: 720px) 30vw, 200px" src={src} />
          </span>
        );
      })}
    </span>
  );
}
