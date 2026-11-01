type Stop = [position: number, color: string];

interface RampProps {
  axis: "x" | "y";
  id: string;
  stops: Stop[];
}

/** A linear gradient whose stops are given in the drawing's own coordinates. */
export function Ramp({ axis, id, stops }: RampProps) {
  const start = stops[0][0];
  const end = stops[stops.length - 1][0];
  const line =
    axis === "x" ? { x1: start, x2: end, y1: 0, y2: 0 } : { x1: 0, x2: 0, y1: start, y2: end };

  return (
    <linearGradient gradientUnits="userSpaceOnUse" id={id} {...line}>
      {stops.map(([position, color]) => (
        <stop key={position} offset={(position - start) / (end - start)} stopColor={color} />
      ))}
    </linearGradient>
  );
}

/**
 * A blur over the whole drawing. Its area is fixed, not relative to the shape: a
 * thin shadow would otherwise be cut off square at the edge of a small one.
 */
export function Blur({ deviation, id }: { deviation: number; id: string }) {
  return (
    <filter
      filterUnits="userSpaceOnUse"
      height={2600}
      id={id}
      width={3400}
      x={-400}
      y={-400}
    >
      <feGaussianBlur stdDeviation={deviation} />
    </filter>
  );
}
