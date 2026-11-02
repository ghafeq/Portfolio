/**
 * What every piece on the desk shares, so they read as one photograph: one
 * camera, one light and one plastic.
 *
 * The camera looks at the desk from the front, at about the height of the screen,
 * so the Mac's face is seen square on and anything lying on the desk is seen from
 * a little above. The light is high, to the left and a little behind: surfaces
 * that face up are brightest, faces turned left catch it, faces towards the camera
 * are a step darker, faces turned right darker again, and shadows fall forward and
 * to the right.
 */

type Point = [x: number, y: number];

/** In desk units: the drawing's 2600×1600 grid. */
export const CAMERA = {
  /** Straight ahead of the camera. */
  centerX: 1300,
  /** Where the keyboard's front edge meets the desk. */
  front: 1490,
  /** Where a line `depth` further back meets the desk. */
  back: 1195,
  /** How far back that line is, in desk units. */
  depth: 518.6,
  /** How much smaller things are on that line than at the front edge. */
  depthRatio: 0.92,
  /** How much a height rises on screen, seen from a little above. */
  rise: 0.72,
};

const HORIZON = (CAMERA.back - CAMERA.depthRatio * CAMERA.front) / (1 - CAMERA.depthRatio);

/** Nearness to the camera: 1 at the keyboard's front edge, less further back. */
export function nearness(depth: number) {
  return 1 / (1 + (1 / CAMERA.depthRatio - 1) * (depth / CAMERA.depth));
}

/**
 * Where a point on or above the desk lands in the drawing. `across` is from the
 * middle, `depth` back from the keyboard's front edge, and `height` above the
 * desk, all in desk units at that front edge.
 */
export function projectOnDesk(across: number, depth: number, height = 0): Point {
  const near = nearness(depth);

  return [
    CAMERA.centerX + across * near,
    HORIZON + (CAMERA.front - HORIZON) * near - height * CAMERA.rise * near,
  ];
}

export const round = (value: number) => Math.round(value * 10) / 10;

export const polygon = (points: Point[]) =>
  `M${points.map(([x, y]) => `${round(x)} ${round(y)}`).join("L")}Z`;

/** Platinum, the one plastic, by which way a surface faces the light. */
export const PLATINUM = {
  /** An edge catching the light. */
  highlight: "#fffdf8",
  /** Facing up. */
  top: "#efeadf",
  /** Facing the light: turned left, or sloping up towards it. */
  lit: "#e4ded1",
  /** Facing the camera. */
  front: "#d9d2c4",
  /** Turned right, away from the light. */
  shade: "#bdb5a5",
  /** Facing down, or tucked under something. */
  deep: "#958d7d",
  /** The line where a face turns away from the light. */
  edge: "#837c6e",
  /** The gaps between parts. */
  crevice: "#3a372f",
  /** The cables, a little greyer than the cases. */
  cable: "#b4ae9f",
};

export const SHADOW = "#23262b";
