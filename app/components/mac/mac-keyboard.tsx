import { MacApple } from "./mac-icons";
import { Ramp } from "./mac-ramp";

/**
 * The Apple Desktop Bus keyboard. Its layout is measured from a photograph taken
 * from straight above, so every key below is in that photo's pixels, and project
 * lays it down on the desk in front of the Mac as the eye would see it.
 */

const BODY = { back: 150, front: 425, left: 55, right: 930 };

// Where the body lands in the drawing: the front edge is this wide, and the back
// edge a little narrower, being further away.
const DESK = { back: 1195, centerX: 1300, depthRatio: 0.92, front: 1490, frontWidth: 1650 };

const SCALE = DESK.frontWidth / (BODY.right - BODY.left);
const BODY_CENTER = (BODY.left + BODY.right) / 2;
const HORIZON = (DESK.back - DESK.depthRatio * DESK.front) / (1 - DESK.depthRatio);

const KEY_HEIGHT = 11;
// How far a keycap's top sits inside its base: it narrows towards the top, and
// leans back so its front face is the one that shows.
const CAP_INSET = { back: 2, front: 9, side: 5 };

type Point = [x: number, y: number];

/** Nearness to the viewer: 1 at the front edge, less towards the back. */
function nearness(y: number) {
  const depth = (y - BODY.back) / (BODY.front - BODY.back);

  return 1 / (1 + (1 / DESK.depthRatio - 1) * (1 - depth));
}

function project(x: number, y: number, height = 0): Point {
  const near = nearness(y);

  return [
    DESK.centerX + (x - BODY_CENTER) * SCALE * near,
    HORIZON + (DESK.front - HORIZON) * near - height * SCALE * 0.72 * near,
  ];
}

const round = (value: number) => Math.round(value * 10) / 10;
const polygon = (points: Point[]) =>
  `M${points.map(([x, y]) => `${round(x)} ${round(y)}`).join("L")}Z`;

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
  const faces = { cap: "", front: "", left: "", legends: [] as Key[], right: "", rim: "" };

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
const BACK_PANEL = polygon([
  project(160, 102),
  project(822, 102),
  project(822, 160),
  project(160, 160),
]);
const PANEL_DOOR = polygon([
  project(267, 106),
  project(350, 106),
  project(350, 134),
  project(267, 134),
]);
const [APPLE_X, APPLE_Y] = project(201, 107);
const BODY_BACK_EDGE = `M${project(BODY.left + 6, BODY.back - 1).map(round).join(" ")}L${project(BODY.right - 6, BODY.back - 1).map(round).join(" ")}`;
const [FRONT_LEFT] = project(BODY.left, BODY.front);
const [FRONT_RIGHT] = project(BODY.right, BODY.front);
const LIP_BOTTOM = DESK.front + 42;

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
        <Ramp
          axis="x"
          id="mac-keyboard-top"
          stops={[
            [475, "#ece7dc"],
            [1300, "#e0dbcf"],
            [2125, "#d3cdc0"],
          ]}
        />
        <Ramp
          axis="y"
          id="mac-keyboard-lip"
          stops={[
            [DESK.front - 2, "#cfc9bb"],
            [DESK.front + 12, "#b9b3a4"],
            [LIP_BOTTOM - 6, "#a39d8e"],
            [LIP_BOTTOM, "#8a8476"],
          ]}
        />
        <Ramp
          axis="x"
          id="mac-keycap"
          stops={[
            [475, "#f2eee5"],
            [1300, "#ebe7dc"],
            [2125, "#e0dbcf"],
          ]}
        />
        <Ramp
          axis="x"
          id="mac-key-front"
          stops={[
            [475, "#a9a395"],
            [2125, "#958f80"],
          ]}
        />
      </defs>

      {/* The strip behind, with the socket door and the badge. */}
      <path d={BACK_PANEL} fill="#cdc8bb" stroke="#cdc8bb" strokeLinejoin="round" strokeWidth={8} />
      <path d={PANEL_DOOR} fill="none" stroke="#6e6a5f" strokeWidth={2.4} />
      <MacApple height={24} width={20} x={APPLE_X} y={APPLE_Y} />

      {/* The front lip, then the top. Rounded by a stroke of their own colour. */}
      <path
        d={`M${round(FRONT_LEFT)} ${DESK.front - 8}H${round(FRONT_RIGHT)}V${LIP_BOTTOM - 12}Q${round(FRONT_RIGHT)} ${LIP_BOTTOM} ${round(FRONT_RIGHT) - 12} ${LIP_BOTTOM}H${round(FRONT_LEFT) + 12}Q${round(FRONT_LEFT)} ${LIP_BOTTOM} ${round(FRONT_LEFT)} ${LIP_BOTTOM - 12}Z`}
        fill="url(#mac-keyboard-lip)"
      />
      <path
        d={BODY_TOP}
        fill="url(#mac-keyboard-top)"
        stroke="url(#mac-keyboard-top)"
        strokeLinejoin="round"
        strokeWidth={BODY_INSET * 2 * SCALE}
      />
      <path d={BODY_BACK_EDGE} stroke="#8d8778" strokeOpacity={0.55} strokeWidth={2} />
      <path d={`M${round(FRONT_LEFT) + 8} ${DESK.front}H${round(FRONT_RIGHT) - 8}`} stroke="#f7f4ec" strokeOpacity={0.8} strokeWidth={3} />

      {/* The two wells, with their rims. */}
      {[well(73, 697), well(732, 908)].map((path) => (
        <path d={path} fill="#2b2925" key={path} stroke="#a6a092" strokeWidth={2} />
      ))}

      {FACES.map(({ cap, front, left, legends, right, rim }, index) => (
        <g key={index}>
          <path d={left} fill="#c9c4b6" />
          <path d={right} fill="#736e62" />
          <path d={front} fill="url(#mac-key-front)" />
          <path
            d={cap}
            fill="url(#mac-keycap)"
            stroke="url(#mac-keycap)"
            strokeLinejoin="round"
            strokeWidth={3.5}
          />
          <path d={rim} stroke="#fff" strokeLinecap="round" strokeOpacity={0.6} strokeWidth={1.6} />
          {legends.map((key) => (
            <Legend {...key} key={`${key.left}-${key.back}`} />
          ))}
        </g>
      ))}
    </g>
  );
}
