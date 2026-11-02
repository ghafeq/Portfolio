import { PLATINUM, SHADOW, round } from "./mac-desk";
import { APPLE_PATH } from "./mac-icons";

/**
 * The Apple Desktop Bus mouse, to the right of the keyboard and turned towards it.
 * It is built as one solid, a box rounded at its corners and along its top edge
 * with a palm slope down to its low end, and every face that shows is shaded by
 * which way it faces the light. Corners, edges and faces therefore all agree.
 */

const YAW = (48 * Math.PI) / 180;
const COS = Math.cos(YAW);
const SIN = Math.sin(YAW);
// The desk's camera, as the keyboard has it: how much ground depth and height
// show on screen.
const DEPTH = 0.57;
const RISE = 0.75;
// Where its middle sits on the desk.
const CENTER = { x: 2335, y: 1405 };

// In desk units. The button end is at -LENGTH / 2 and the low end at +LENGTH / 2.
const LENGTH = 280;
const WIDTH = 165;
const HEIGHT = 64;
// Fractions of HEIGHT and LENGTH: the low end's height, the seam's height, and
// where the slope begins.
const NOSE = 0.5;
const BAND = 0.26;
const PLATEAU = 0.45;
// Rounding: the corners seen from above, and the edge where the top turns down.
const CORNER = 26;
const FILLET = 8;

type Vec3 = [x: number, y: number, z: number];
type Point = [x: number, y: number];

const normalize = ([x, y, z]: Vec3): Vec3 => {
  const length = Math.hypot(x, y, z);

  return [x / length, y / length, z / length];
};

// Towards the light, in the scene's terms: x right, y up, z towards the camera.
// High, to the left and a little in front, so faces turned left are lit, faces
// towards the camera a step darker, and faces turned right in shade.
const LIGHT = normalize([-0.45, 0.8, 0.25]);

const toRgb = (hex: string) => [1, 3, 5].map((index) => Number.parseInt(hex.slice(index, index + 2), 16));
const SHADE_RGB = toRgb(PLATINUM.shade);
const TOP_RGB = toRgb(PLATINUM.top);

/** The plastic's colour on a face with this world normal. */
function tone([x, y, z]: Vec3, darken = 0) {
  const lit = x * LIGHT[0] + y * LIGHT[1] + z * LIGHT[2];
  // 0 for a face turned right, 1 for one facing straight up.
  const amount = Math.min(1, Math.max(0, (lit - LIGHT[0]) / (LIGHT[1] - LIGHT[0])));

  return `#${SHADE_RGB.map((channel, index) =>
    Math.round((channel + (TOP_RGB[index] - channel) * amount) * (1 - darken))
      .toString(16)
      .padStart(2, "0"),
  ).join("")}`;
}

/** A normal in the mouse's own terms (along, up, across) turned into the scene's. */
const world = (along: number, up: number, across: number): Vec3 => [
  along * COS - across * SIN,
  up,
  along * SIN + across * COS,
];

/** Where a point on the mouse lands in the drawing. */
const at = (u: number, v: number, h: number): Point => [
  CENTER.x + u * COS - v * SIN,
  CENTER.y + (u * SIN + v * COS) * DEPTH - h * RISE,
];

const path = (points: Point[]) =>
  `M${points.map(([x, y]) => `${round(x)} ${round(y)}`).join("L")}Z`;

/** The height of the top, and its slope, at a point along the mouse. */
function profile(u: number) {
  const t = (u + LENGTH / 2) / LENGTH;

  if (t <= PLATEAU) {
    return { height: HEIGHT, slope: 0 };
  }

  const k = (t - PLATEAU) / (1 - PLATEAU);
  const drop = HEIGHT * (1 - NOSE);

  return {
    height: HEIGHT * NOSE + (drop * (1 + Math.cos(Math.PI * k))) / 2,
    slope: (-drop * Math.PI * Math.sin(Math.PI * k)) / (2 * (1 - PLATEAU) * LENGTH),
  };
}

interface Edge {
  u: number;
  v: number;
  /** The outward normal, along and across. */
  nu: number;
  nv: number;
}

/** Points round the footprint, a rounded rectangle, with their outward normals. */
function footprint(inset = 0): Edge[] {
  const a = LENGTH / 2 - CORNER;
  const b = WIDTH / 2 - CORNER;
  const radius = CORNER - inset;
  const edges: Edge[] = [];
  // Each straight run, then the corner after it, going round.
  const runs: [Point, Point, Point, number][] = [
    [[-a, b], [a, b], [0, 1], 90],
    [[a, b], [a, -b], [1, 0], 0],
    [[a, -b], [-a, -b], [0, -1], -90],
    [[-a, -b], [-a, b], [-1, 0], -180],
  ];

  runs.forEach(([[u0, v0], [u1, v1], [nu, nv], startAngle], index) => {
    const steps = Math.max(1, Math.round(Math.hypot(u1 - u0, v1 - v0) / 10));

    for (let step = 0; step < steps; step++) {
      const f = step / steps;

      edges.push({ u: u0 + (u1 - u0) * f + nu * radius, v: v0 + (v1 - v0) * f + nv * radius, nu, nv });
    }

    const [cu, cv] = [u1, v1];

    for (let step = 0; step < 9; step++) {
      const angle = ((startAngle - step * 10) * Math.PI) / 180;
      const [cos, sin] = [Math.cos(angle), Math.sin(angle)];

      edges.push({ u: cu + cos * radius, v: cv + sin * radius, nu: cos, nv: sin });
    }

    if (index === runs.length - 1) {
      edges.push(edges[0]);
    }
  });

  return edges;
}

const OUTLINE = footprint();
const facing = ({ nu, nv }: Edge) => nu * SIN + nv * COS;

// The faces, back to front: walls, the seam, the rounded top edge, then the top.
const walls: { d: string; fill: string }[] = [];
const fillets: { d: string; fill: string }[] = [];
const seam: Point[][] = [[]];
const FILLET_ANGLES = [0, 30, 60, 90].map((degrees) => (degrees * Math.PI) / 180);

OUTLINE.slice(0, -1).forEach((edge, index) => {
  const next = OUTLINE[index + 1];

  if (facing(edge) <= 0 && facing(next) <= 0) {
    if (seam.at(-1)!.length) {
      seam.push([]);
    }

    return;
  }

  const nu = (edge.nu + next.nu) / 2;
  const nv = (edge.nv + next.nv) / 2;
  const top = (e: Edge) => profile(e.u).height - FILLET;
  const band = HEIGHT * BAND;

  walls.push({
    d: path([at(edge.u, edge.v, 0), at(next.u, next.v, 0), at(next.u, next.v, band), at(edge.u, edge.v, band)]),
    fill: tone(world(nu, 0, nv), 0.05),
  });
  walls.push({
    d: path([at(edge.u, edge.v, band), at(next.u, next.v, band), at(next.u, next.v, top(next)), at(edge.u, edge.v, top(edge))]),
    fill: tone(world(nu, 0, nv)),
  });
  seam.at(-1)!.push(at(edge.u, edge.v, band), at(next.u, next.v, band));

  // The quarter round between the wall and the top, in three bands.
  const point = (e: Edge, angle: number): Point =>
    at(
      e.u - e.nu * FILLET * (1 - Math.cos(angle)),
      e.v - e.nv * FILLET * (1 - Math.cos(angle)),
      profile(e.u).height - FILLET * (1 - Math.sin(angle)),
    );

  FILLET_ANGLES.slice(0, -1).forEach((angle, band) => {
    const after = FILLET_ANGLES[band + 1];
    const middle = (angle + after) / 2;

    fillets.push({
      d: path([point(edge, angle), point(next, angle), point(next, after), point(edge, after)]),
      fill: tone(world(nu * Math.cos(middle), Math.sin(middle), nv * Math.cos(middle))),
    });
  });
});

// The top: one shape exactly inside the rounded edge, so they meet without a gap,
// then shaded in strips across that are clipped to it.
const TOP_SHAPE = path(
  footprint(FILLET).map(({ u, v }) => at(u, v, profile(u).height)),
);
const tops: { d: string; fill: string }[] = [];
const TOP_HALF_LENGTH = LENGTH / 2 - FILLET;

/** How far across the top reaches at a point along it. */
function topReach(u: number) {
  const straight = LENGTH / 2 - CORNER;
  const radius = CORNER - FILLET;
  const into = Math.max(0, Math.abs(u) - straight);

  return WIDTH / 2 - CORNER + Math.sqrt(Math.max(0, radius * radius - into * into));
}

const TOP_STEPS = 40;

for (let step = 0; step < TOP_STEPS; step++) {
  const u0 = -TOP_HALF_LENGTH + (2 * TOP_HALF_LENGTH * step) / TOP_STEPS;
  const u1 = -TOP_HALF_LENGTH + (2 * TOP_HALF_LENGTH * (step + 1)) / TOP_STEPS;
  const [p0, p1] = [profile(u0), profile(u1)];
  // A little past the edge each side: the clip trims them to it.
  const [r0, r1] = [topReach(u0) + 4, topReach(u1) + 4];
  const slope = profile((u0 + u1) / 2).slope;
  const length = Math.hypot(slope, 1);

  tops.push({
    d: path([at(u0, -r0, p0.height), at(u0, r0, p0.height), at(u1, r1, p1.height), at(u1, -r1, p1.height)]),
    fill: tone(world(-slope / length, 1 / length, 0)),
  });
}

const SHADOW_SHAPE = path(OUTLINE.map(({ u, v }) => at(u, v, 0)));

// The button: a rounded panel across the high end, just proud of the top.
const BUTTON = (() => {
  const [u0, u1] = [-LENGTH / 2 + 0.07 * LENGTH, -LENGTH / 2 + 0.41 * LENGTH];
  const half = WIDTH * 0.35;
  const radius = 9;
  const points: Point[] = [];
  // Counter-clockwise round the panel, each corner turning a quarter.
  const corners: [number, number, number][] = [
    [u1 - radius, half - radius, 0],
    [u0 + radius, half - radius, 90],
    [u0 + radius, -half + radius, 180],
    [u1 - radius, -half + radius, 270],
  ];

  corners.forEach(([cu, cv, start]) => {
    for (let step = 0; step <= 6; step++) {
      const angle = ((start + step * 15) * Math.PI) / 180;

      points.push(at(cu + Math.cos(angle) * radius, cv + Math.sin(angle) * radius, HEIGHT + 0.2));
    }
  });

  return path(points);
})();

// The logo, laid on the slope near the low end, upright to someone sitting at it.
const LOGO = (() => {
  const u0 = -LENGTH / 2 + 0.76 * LENGTH;
  const { height, slope } = profile(u0);
  const size = 0.95;
  const [x0, y0] = at(u0, 0, height);
  const a = size * SIN;
  const b = -size * COS * DEPTH;
  const c = size * COS;
  const d = size * (SIN * DEPTH - RISE * slope);

  return {
    fill: tone(world(-slope, 1, 0), 0.07),
    transform: `matrix(${[a, b, c, d, x0 - 10 * a - 12 * c, y0 - 10 * b - 12 * d].map((n) => round(n * 10) / 10).join(" ")})`,
  };
})();

// The high end, where its lead comes out, for drawing the lead to.
export const MOUSE_LEAD_START = at(-LENGTH / 2 - 2, 0, HEIGHT * 0.45);

const [LEAD_X, LEAD_Y] = MOUSE_LEAD_START.map(round);

/** From the mouse's high end, round in a loop, into the keyboard's right side. */
export const MOUSE_CABLE = `M${LEAD_X} ${LEAD_Y}C${LEAD_X - 8} ${LEAD_Y - 52} 2208 1212 2160 1190 2112 1170 2062 1196 2076 1236 2088 1270 2140 1262 2136 1296 2133 1318 2104 1322 2076 1316`;

const [SHEEN_X, SHEEN_Y] = at(-LENGTH * 0.12, -WIDTH * 0.12, HEIGHT);

export function MacMouse() {
  return (
    <g className="mac-art-mouse">
      {/* Its shadow: soft, a little to the right, and tight where it sits. */}
      <path d={SHADOW_SHAPE} fill={SHADOW} filter="url(#mac-blur-mid)" opacity={0.3} transform="translate(14 7)" />
      <path d={SHADOW_SHAPE} fill="#16171a" filter="url(#mac-blur-near)" opacity={0.42} transform="translate(2 3)" />

      <defs>
        <clipPath id="mac-mouse-top">
          <path d={TOP_SHAPE} />
        </clipPath>
      </defs>

      {/* Each face stroked in its own colour, so neighbours meet without a gap. */}
      <g strokeLinejoin="round" strokeWidth={0.8}>
        {[...walls, ...fillets].map(({ d, fill }) => (
          <path d={d} fill={fill} key={d} stroke={fill} />
        ))}
        <path d={TOP_SHAPE} fill={tops[0].fill} stroke={tops[0].fill} />
        <g clipPath="url(#mac-mouse-top)">
          {tops.map(({ d, fill }) => (
            <path d={d} fill={fill} key={d} stroke={fill} />
          ))}
        </g>
      </g>

      {/* Where the shell sits on its base. */}
      <g fill="none" filter="url(#mac-blur-soft)" strokeLinecap="round" strokeLinejoin="round">
        {seam
          .filter((points) => points.length)
          .map((points) => {
            const line = `M${points.map(([x, y]) => `${round(x)} ${round(y)}`).join("L")}`;

            return (
              <g key={line}>
                <path d={line} stroke={PLATINUM.edge} strokeOpacity={0.5} strokeWidth={1.6} />
                <path d={line} stroke={PLATINUM.highlight} strokeOpacity={0.45} strokeWidth={1.2} transform="translate(0 1.6)" />
              </g>
            );
          })}
      </g>

      {/* The light catching the top. */}
      <ellipse
        cx={round(SHEEN_X)}
        cy={round(SHEEN_Y)}
        fill={PLATINUM.highlight}
        filter="url(#mac-blur-mid)"
        opacity={0.45}
        rx={70}
        ry={26}
        transform={`rotate(${round((Math.atan2(SIN * DEPTH, COS) * 180) / Math.PI)} ${round(SHEEN_X)} ${round(SHEEN_Y)})`}
      />

      <path d={BUTTON} fill="#e8e2d6" stroke={PLATINUM.shade} strokeLinejoin="round" strokeWidth={2.2} />
      <path d={BUTTON} fill="none" filter="url(#mac-blur-soft)" stroke={PLATINUM.highlight} strokeLinejoin="round" strokeOpacity={0.6} strokeWidth={1.2} transform="translate(0.6 1)" />

      {/* The logo, moulded into the slope. */}
      <path d={APPLE_PATH} fill={PLATINUM.highlight} fillOpacity={0.6} transform={`translate(0.6 0.9) ${LOGO.transform}`} />
      <path d={APPLE_PATH} fill={LOGO.fill} transform={LOGO.transform} />
    </g>
  );
}
