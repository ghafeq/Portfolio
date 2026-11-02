import { CAMERA, PLATINUM, nearness as nearnessAt, polygon, projectOnDesk, round } from "./mac-desk";
import { MacApple } from "./mac-icons";
import { Ramp } from "./mac-ramp";

/**
 * The Apple Desktop Bus keyboard. Its layout is measured from a photograph taken
 * from straight above, so every key below is in that photo's pixels, and project
 * lays it down on the desk in front of the Mac as the shared camera sees it.
 */

const BODY = { back: 150, front: 425, left: 55, right: 930 };

// The body's front edge is this wide in the drawing, on the camera's front line.
const FRONT_WIDTH = 1650;

const SCALE = FRONT_WIDTH / (BODY.right - BODY.left);
const BODY_CENTER = (BODY.left + BODY.right) / 2;

const KEY_HEIGHT = 11;
// How far a keycap's top sits inside its base: it narrows towards the top, and
// leans back so its front face is the one that shows.
const CAP_INSET = { back: 2, front: 9, side: 5 };

/** Nearness to the camera of a line across the photo, at its y. */
const nearness = (y: number) => nearnessAt((BODY.front - y) * SCALE);

/** A point in the photo's pixels, lifted `height` pixels off the desk. */
const project = (x: number, y: number, height = 0) =>
  projectOnDesk((x - BODY_CENTER) * SCALE, (BODY.front - y) * SCALE, height * SCALE);

interface Key {
  back: number;
  front: number;
  left: number;
  legend?: string;
  right: number;
}

type Span = Omit<Key, "back" | "front">;

/** A run of ordinary keys, one for each character of `legends`. */
const typingKeys = (legends: string, start: number): Span[] =>
  Array.from(legends, (legend, index) => ({
    left: start + index * 41.5,
    legend,
    right: start + index * 41.5 + 40,
  }));

const pad = (left: number, right: number, legend: string): Span => ({ left, legend, right });

const COLUMNS = [735, 777, 779, 819, 821, 862, 864, 905];

// Each row of the keyboard, back to front, from left to right across both wells.
const ROWS: { back: number; front: number; keys: Span[] }[] = [
  {
    back: 188,
    front: 228,
    keys: [
      { left: 76, legend: "~", right: 119 },
      ...typingKeys("1234567890-=", 122),
      { left: 622, legend: "delete", right: 694 },
      pad(COLUMNS[0], COLUMNS[1], "clear"),
      pad(COLUMNS[2], COLUMNS[3], "="),
      pad(COLUMNS[4], COLUMNS[5], "/"),
      pad(COLUMNS[6], COLUMNS[7], "*"),
    ],
  },
  {
    back: 230,
    front: 271,
    keys: [
      { left: 76, legend: "tab", right: 144 },
      ...typingKeys("QWERTYUIOP[]", 146),
      { left: 643, legend: "\\", right: 694 },
      pad(COLUMNS[0], COLUMNS[1], "7"),
      pad(COLUMNS[2], COLUMNS[3], "8"),
      pad(COLUMNS[4], COLUMNS[5], "9"),
      pad(COLUMNS[6], COLUMNS[7], "−"),
    ],
  },
  {
    back: 272,
    front: 312,
    keys: [
      { left: 76, legend: "caps lock", right: 156 },
      ...typingKeys("ASDFGHJKL;'", 158),
      { left: 612, legend: "return", right: 694 },
      pad(COLUMNS[0], COLUMNS[1], "4"),
      pad(COLUMNS[2], COLUMNS[3], "5"),
      pad(COLUMNS[4], COLUMNS[5], "6"),
      pad(COLUMNS[6], COLUMNS[7], "+"),
    ],
  },
  {
    back: 314,
    front: 353,
    keys: [
      { left: 76, legend: "shift", right: 176 },
      ...typingKeys("ZXCVBNM,./", 178),
      { left: 592, legend: "shift", right: 694 },
      pad(COLUMNS[0], COLUMNS[1], "1"),
      pad(COLUMNS[2], COLUMNS[3], "2"),
      pad(COLUMNS[4], COLUMNS[5], "3"),
    ],
  },
  {
    back: 355,
    front: 396,
    keys: [
      { left: 76, legend: "ctrl", right: 113 },
      { left: 116, legend: "option", right: 165 },
      { left: 168, legend: "⌘", right: 237 },
      { left: 240, right: 485 },
      { left: 488, legend: "esc", right: 527 },
      { left: 530, legend: "←", right: 569 },
      { left: 572, legend: "→", right: 611 },
      { left: 613, legend: "↓", right: 652 },
      { left: 655, legend: "↑", right: 694 },
      pad(COLUMNS[0], COLUMNS[3], "0"),
      pad(COLUMNS[4], COLUMNS[5], "."),
    ],
  },
];

// The tall enter key is the one that crosses rows. It is drawn with the last, in
// front of what it passes.
const ENTER: Key = { back: 314, front: 396, left: COLUMNS[6], legend: "enter", right: COLUMNS[7] };

/** One row's faces, each kind merged into a single path. */
function rowFaces(keys: Key[]) {
  const faces = { cap: "", front: "", left: "", legends: [] as Key[], right: "", rim: "", skirt: "" };

  for (const key of keys) {
    const { back, front, left, right } = key;
    const capBack = back + CAP_INSET.back;
    const capFront = front - CAP_INSET.front;
    const capLeft = left + CAP_INSET.side;
    const capRight = right - CAP_INSET.side;
    const topBackLeft = project(capLeft, capBack, KEY_HEIGHT);
    const topBackRight = project(capRight, capBack, KEY_HEIGHT);
    const topFrontRight = project(capRight, capFront, KEY_HEIGHT);
    const topFrontLeft = project(capLeft, capFront, KEY_HEIGHT);
    const baseFrontLeft = project(left, front);
    const baseFrontRight = project(right, front);

    // The key's whole outline, under its faces, so its corners can be rounded.
    faces.skirt += polygon([
      baseFrontLeft,
      baseFrontRight,
      project(right, back),
      topBackRight,
      topBackLeft,
      project(left, back),
    ]);
    faces.left += polygon([topBackLeft, topFrontLeft, baseFrontLeft, project(left, back)]);
    faces.right += polygon([topBackRight, project(right, back), baseFrontRight, topFrontRight]);
    faces.front += polygon([topFrontLeft, topFrontRight, baseFrontRight, baseFrontLeft]);
    faces.cap += polygon([topBackLeft, topBackRight, topFrontRight, topFrontLeft]);
    faces.rim += `M${round(topFrontLeft[0])} ${round(topFrontLeft[1])}L${round(topFrontRight[0])} ${round(topFrontRight[1])}`;
    faces.legends.push(key);
  }

  return faces;
}

const FACES = ROWS.map(({ back, front, keys }, index) =>
  rowFaces([
    ...keys.map((key) => ({ ...key, back, front })),
    ...(index === ROWS.length - 1 ? [ENTER] : []),
  ]),
);

const well = (left: number, right: number) =>
  polygon([
    project(left, 183),
    project(right, 183),
    project(right, 399),
    project(left, 399),
  ]);

const BODY_INSET = 8;
const BODY_TOP = polygon([
  project(BODY.left + BODY_INSET, BODY.back + BODY_INSET),
  project(BODY.right - BODY_INSET, BODY.back + BODY_INSET),
  project(BODY.right - BODY_INSET, BODY.front - BODY_INSET),
  project(BODY.left + BODY_INSET, BODY.front - BODY_INSET),
]);
// The raised strip along the back: its top, and the short face it steps up by.
const STRIP_HEIGHT = 7;
const BACK_PANEL = polygon([
  project(160, 102, STRIP_HEIGHT),
  project(822, 102, STRIP_HEIGHT),
  project(822, 152, STRIP_HEIGHT),
  project(160, 152, STRIP_HEIGHT),
]);
const BACK_PANEL_STEP = polygon([
  project(160, 152, STRIP_HEIGHT),
  project(822, 152, STRIP_HEIGHT),
  project(822, 152),
  project(160, 152),
]);
const BACK_PANEL_EDGE = `M${project(162, 152, STRIP_HEIGHT).map(round).join(" ")}L${project(820, 152, STRIP_HEIGHT).map(round).join(" ")}`;
const PANEL_DOOR = polygon([
  project(267, 108, STRIP_HEIGHT),
  project(350, 108, STRIP_HEIGHT),
  project(350, 136, STRIP_HEIGHT),
  project(267, 136, STRIP_HEIGHT),
]);
const [APPLE_X, APPLE_Y] = project(201, 109, STRIP_HEIGHT);
const BODY_BACK_EDGE = `M${project(BODY.left + 6, BODY.back - 1).map(round).join(" ")}L${project(BODY.right - 6, BODY.back - 1).map(round).join(" ")}`;
const [FRONT_LEFT] = project(BODY.left, BODY.front);
const [FRONT_RIGHT] = project(BODY.right, BODY.front);
const LIP_BOTTOM = CAMERA.front + 42;

/** A key's legend, set at its front left and laid flat with the keytop. */
function Legend({ back, front, left, legend, right }: Key) {
  if (!legend) {
    return null;
  }

  const isWord = legend.length > 1;
  const x = isWord ? left + 8 : (left + right) / 2 - 7;
  const y = (back + front) / 2 + 7;
  const [screenX, screenY] = project(x, y, KEY_HEIGHT);
  const near = nearness(y) * SCALE;

  return (
    <text
      className="mac-art-legend"
      transform={`translate(${round(screenX)} ${round(screenY)}) scale(${round(near)} ${round(near * 0.56)}) skewX(-10)`}
    >
      {legend}
    </text>
  );
}

export function MacKeyboard() {
  return (
    <g>
      <defs>
        {/* Surfaces facing up fall away from the light, left to right. */}
        <Ramp
          axis="x"
          id="mac-keyboard-top"
          stops={[
            [475, PLATINUM.top],
            [1300, "#e6e0d4"],
            [2125, "#d8d1c4"],
          ]}
        />
        <Ramp
          axis="x"
          id="mac-keyboard-strip"
          stops={[
            [560, "#e8e2d6"],
            [2040, "#d6cfc2"],
          ]}
        />
        {/* The front faces the camera, and darkens as it tucks under. */}
        <Ramp
          axis="y"
          id="mac-keyboard-lip"
          stops={[
            [CAMERA.front - 2, PLATINUM.front],
            [CAMERA.front + 14, "#c9c1b2"],
            [LIP_BOTTOM - 6, "#aea696"],
            [LIP_BOTTOM, PLATINUM.deep],
          ]}
        />
        <Ramp
          axis="x"
          id="mac-keycap"
          stops={[
            [475, "#f3efe6"],
            [1300, "#ece7dc"],
            [2125, "#e2dcd0"],
          ]}
        />
        {/* Each face of a key shades smoothly from the cap down into the well.
            Sized to each row, which runs the same height all the way across. */}
        <linearGradient id="mac-key-front" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#d6cfc0" />
          <stop offset="1" stopColor="#b1a999" />
        </linearGradient>
        <linearGradient id="mac-key-left" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={PLATINUM.lit} />
          <stop offset="1" stopColor="#cdc5b6" />
        </linearGradient>
        <linearGradient id="mac-key-right" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#bfb7a7" />
          <stop offset="1" stopColor="#a59d8d" />
        </linearGradient>
        {/* The well: in shadow at the back, under the keys, lifting towards the front. */}
        <linearGradient id="mac-key-well" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#6f685b" />
          <stop offset="1" stopColor="#7d7669" />
        </linearGradient>
      </defs>

      {/* The raised strip behind, with the socket door and the badge. */}
      <path d={BACK_PANEL_STEP} fill={PLATINUM.front} stroke={PLATINUM.front} strokeLinejoin="round" strokeWidth={6} />
      <path d={BACK_PANEL} fill="url(#mac-keyboard-strip)" stroke="url(#mac-keyboard-strip)" strokeLinejoin="round" strokeWidth={6} />
      <path d={BACK_PANEL_EDGE} filter="url(#mac-blur-soft)" stroke={PLATINUM.highlight} strokeLinecap="round" strokeOpacity={0.9} strokeWidth={2.4} />
      <path d={PANEL_DOOR} fill="#d6cfc1" stroke="#d6cfc1" strokeLinejoin="round" strokeWidth={5} />
      <path d={PANEL_DOOR} fill="none" filter="url(#mac-blur-soft)" stroke={PLATINUM.shade} strokeLinejoin="round" strokeWidth={2} />
      <MacApple height={24} width={20} x={APPLE_X} y={APPLE_Y} />

      {/* The front lip, then the top. Rounded by a stroke of their own colour. */}
      <path
        d={`M${round(FRONT_LEFT)} ${CAMERA.front - 8}H${round(FRONT_RIGHT)}V${LIP_BOTTOM - 12}Q${round(FRONT_RIGHT)} ${LIP_BOTTOM} ${round(FRONT_RIGHT) - 12} ${LIP_BOTTOM}H${round(FRONT_LEFT) + 12}Q${round(FRONT_LEFT)} ${LIP_BOTTOM} ${round(FRONT_LEFT)} ${LIP_BOTTOM - 12}Z`}
        fill="url(#mac-keyboard-lip)"
      />
      <path
        d={BODY_TOP}
        fill="url(#mac-keyboard-top)"
        stroke="url(#mac-keyboard-top)"
        strokeLinejoin="round"
        strokeWidth={BODY_INSET * 2 * SCALE}
      />
      <path d={BODY_BACK_EDGE} filter="url(#mac-blur-soft)" stroke={PLATINUM.edge} strokeOpacity={0.4} strokeWidth={2.4} />
      <path d={`M${round(FRONT_LEFT) + 10} ${CAMERA.front}H${round(FRONT_RIGHT) - 10}`} filter="url(#mac-blur-soft)" stroke={PLATINUM.highlight} strokeLinecap="round" strokeOpacity={0.9} strokeWidth={3.4} />

      {/* The two wells, rounded at their corners, with a soft rim of light along
          the front where the top turns down into them. */}
      {[well(73, 697), well(732, 908)].map((path) => (
        <g key={path}>
          <path d={path} fill="url(#mac-key-well)" stroke="url(#mac-key-well)" strokeLinejoin="round" strokeWidth={8} />
          <path d={path} fill="none" filter="url(#mac-blur-soft)" stroke={PLATINUM.shade} strokeLinejoin="round" strokeOpacity={0.7} strokeWidth={3} />
        </g>
      ))}

      {FACES.map(({ cap, front, left, legends, right, rim, skirt }, index) => (
        <g key={index}>
          {/* Faces stroked in their own colour, which rounds every corner. */}
          <path d={skirt} fill="#b9b1a1" stroke="#b9b1a1" strokeLinejoin="round" strokeWidth={3} />
          <path d={left} fill="url(#mac-key-left)" stroke="url(#mac-key-left)" strokeLinejoin="round" strokeWidth={1.5} />
          <path d={right} fill="url(#mac-key-right)" stroke="url(#mac-key-right)" strokeLinejoin="round" strokeWidth={1.5} />
          <path d={front} fill="url(#mac-key-front)" stroke="url(#mac-key-front)" strokeLinejoin="round" strokeWidth={1.5} />
          <path
            d={cap}
            fill="url(#mac-keycap)"
            stroke="url(#mac-keycap)"
            strokeLinejoin="round"
            strokeWidth={5}
          />
          <path d={rim} filter="url(#mac-blur-soft)" stroke={PLATINUM.highlight} strokeLinecap="round" strokeOpacity={0.85} strokeWidth={2} />
          {legends.map((key) => (
            <Legend {...key} key={`${key.left}-${key.back}`} />
          ))}
        </g>
      ))}
    </g>
  );
}
