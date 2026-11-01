import { MacApple } from "./mac-icons";

const INK = "var(--mac-ink)";
const PAPER = "var(--mac-phosphor)";
const DITHER = "var(--mac-phosphor-deep)";

// The word, in the order a pen writes it: up through the h and down its stem;
// back up into the arch and on through "ello"; then the flick off the o. Traced
// from a photograph, on a 512×342 grid.
const HELLO_STEM =
  "M114.4 196.8C116.8 195.9 123.9 193.6 128.8 191.1C133.7 188.7 138.9 185.7 143.9 182.1C148.9 178.4 154.2 174 159 169.3C163.7 164.7 168 159.3 172.3 154.2C176.6 149.2 181.1 143.9 184.7 139.1C188.3 134.4 191.7 129.8 194.1 125.7C196.5 121.7 198.7 118.1 199.1 115C199.6 111.9 198.4 108.6 196.8 107.3C195.1 106 191.6 106.2 189.1 107.3C186.5 108.4 183.6 110.6 181.4 114C179.1 117.4 177.6 121.8 175.7 127.4C173.8 133 172.1 140.5 170 147.5C167.9 154.5 165.3 162.3 163.3 169.3C161.3 176.3 159.3 183.3 158 189.4C156.6 195.6 155.2 201.7 154.9 206.2C154.7 210.7 156.1 214.6 156.3 216.3";
const HELLO_BODY =
  "M161.6 178C162.7 176.5 164.7 171.2 168 168.7C171.3 166.1 177 163 181.4 162.6C185.7 162.3 190.7 164.1 194.1 166.6C197.4 169.2 200.1 173.6 201.5 177.7C202.8 181.8 202 186.6 202.5 191.1C202.9 195.6 202.6 200.7 204.1 204.5C205.6 208.3 208.1 211.9 211.5 213.9C214.8 216 219.9 217.2 224.2 216.9C228.6 216.7 233.4 215.1 237.6 212.2C241.8 209.3 246 203.9 249.3 199.5C252.7 195.1 256.1 190.3 257.7 186.1C259.2 181.9 259.8 177.7 258.7 174.4C257.6 171 254.2 167.6 251 166C247.7 164.3 242.6 163.5 239.3 164.6C235.9 165.7 232.7 169.1 230.9 172.7C229.1 176.3 228.3 181.3 228.6 186.1C228.8 190.8 230.2 196.8 232.6 201.2C234.9 205.5 238.4 209.7 242.6 212.2C246.8 214.8 252.9 216.3 257.7 216.3C262.4 216.3 266.6 215.6 271.1 212.2C275.5 208.9 280 202.7 284.4 196.1C288.9 189.6 293.8 180.8 297.8 172.7C301.8 164.6 306 155.4 308.5 147.5C311.1 139.7 312.9 131.6 313.2 125.7C313.6 119.9 312.4 115.3 310.5 112.3C308.7 109.4 304.8 108 301.8 108C298.9 108 295.3 109.1 292.8 112.3C290.4 115.6 288.6 120.7 287.1 127.4C285.6 134.1 284.6 144.5 283.8 152.6C282.9 160.7 282.1 168.8 282.1 176C282.1 183.3 282.3 190.4 283.8 196.1C285.3 201.8 287.7 207.2 291.1 210.2C294.6 213.3 300.1 214.6 304.5 214.6C309 214.6 313.4 213.3 317.9 210.2C322.4 207.2 326.6 202.1 331.3 196.1C336 190.2 341.6 182.5 346.4 174.4C351.1 166.3 356.2 155.6 359.7 147.5C363.3 139.4 366.7 131.6 367.4 125.7C368.2 119.9 366.1 115.4 364.1 112.3C362.1 109.3 358.5 107 355.4 107.3C352.3 107.6 348 109.5 345.3 114C342.7 118.5 341.2 126.6 339.7 134.1C338.1 141.7 336.8 151.7 336 159.3C335.1 166.8 334.4 173 334.6 179.4C334.9 185.8 335.4 192.5 337.3 197.8C339.3 203.1 342.3 208.3 346.4 211.2C350.4 214.2 356.7 215.6 361.4 215.6C366.2 215.6 371.3 213.6 374.8 211.2C378.3 208.8 380.6 205.1 382.2 201.2C383.7 197.3 382.9 192.2 384.2 187.8C385.5 183.3 387 178 389.9 174.4C392.8 170.7 397.4 167.6 401.6 166C405.8 164.3 410.8 163.5 415 164.6C419.1 165.7 424.3 168.8 426.7 172.7C429.1 176.5 429.9 182.5 429.3 187.8C428.8 193.1 426.6 200.1 423.3 204.5C420.1 209 414.4 212.6 409.9 214.6C405.5 216.5 400.6 217.1 396.5 216.3C392.5 215.4 387.7 212.1 385.5 209.6C383.3 207 383.6 202.6 383.2 201.2";
const HELLO_FLICK =
  "M429.3 176.7C430.8 176.5 435.5 176.5 438.4 175.4C441.3 174.2 444.2 171.7 446.7 170C449.3 168.3 452.3 166.1 453.4 165.3";

const MENUS = [
  ["File", 58],
  ["Edit", 95],
  ["Goodies", 134],
  ["Font", 198],
  ["FontSize", 240],
  ["Style", 308],
] as const;

interface Tool {
  d: string;
  dashed?: boolean;
  filled?: boolean;
}

// The tool palette, left column then right, on a 26×25 cell. A filled shape is
// the same outline with its inside painted.
const TOOLS: Tool[][] = [
  [
    { d: "M6 9c0-4 14-5 14 0s-9 5-10 3 3 5 1 6" },
    { d: "M6 5h14v12H6z", dashed: true },
  ],
  [{ d: "M9 17V9h2v5-6h2v6-7h2v7-6h2v9l-2 2H11z" }, { d: "M8 17l5-12 5 12M10 13h6" }],
  [{ d: "M7 10l6-5 7 7-6 5zM19 13c2 2 2 4 1 5" }, { d: "M8 12h6v6H8zM10 12V9h2v3M17 8h1M19 11h1M17 13h1" }],
  [{ d: "M9 17l2-5 3 2-2 3zM12 12l6-7 1 1-6 8z" }, { d: "M7 17l2-4 8-8 2 2-8 8z" }],
  [{ d: "M7 17L19 5" }, { d: "M7 12l5-6h8l-5 6zM7 12v4h8l5-6V6" }],
  [{ d: "M6 6h14v11H6z" }, { d: "M6 6h14v11H6z", filled: true }],
  [
    { d: "M9 6h8q3 0 3 3v5q0 3-3 3H9q-3 0-3-3V9q0-3 3-3z" },
    { d: "M9 6h8q3 0 3 3v5q0 3-3 3H9q-3 0-3-3V9q0-3 3-3z", filled: true },
  ],
  [
    { d: "M13 6c9 0 9 11 0 11S4 6 13 6z" },
    { d: "M13 6c9 0 9 11 0 11S4 6 13 6z", filled: true },
  ],
  [
    { d: "M7 14c2-8 6-8 7-4s5 3 5 6-8 3-12-2z" },
    { d: "M7 14c2-8 6-8 7-4s5 3 5 6-8 3-12-2z", filled: true },
  ],
  [{ d: "M7 16l3-10 9 3-3 8z" }, { d: "M7 16l3-10 9 3-3 8z", filled: true }],
];
const SELECTED_TOOL = [3, 0];

// MacPaint's fill patterns, as eight rows of eight bits.
const PATTERNS = [
  "ffffffffffffffff",
  "ddffddffddffddff",
  "dd77dd77dd77dd77",
  "aa55aa55aa55aa55",
  "8822882288228822",
  "8800220088002200",
  "8000080080000800",
  "8000000008000000",
  "ff808080ff080808",
  "8040201008040201",
  "0102040810204080",
  "f0f0f0f00f0f0f0f",
  "ff00ff00ff00ff00",
  "aaaaaaaaaaaaaaaa",
  "8142241818244281",
  "1010ff1010101010",
];
const PATTERN_ROWS = [
  [0, 1, 2, 3, 2, 3, 4, 5, 6, 7, 5, 6, 8, 9, 12, 13, 14, 11, 15],
  [7, 6, 5, 4, 5, 6, 7, 5, 4, 6, 9, 10, 8, 15, 13, 12, 11, 14, 3],
];

/** Draws an 8×8 bitmap as a path: one square per set bit. */
function bitmapPath(hex: string) {
  let path = "";

  for (let row = 0; row < 8; row++) {
    const byte = Number.parseInt(hex.slice(row * 2, row * 2 + 2), 16);

    for (let column = 0; column < 8; column++) {
      if (byte & (0x80 >> column)) {
        path += `M${column} ${row}h1v1h-1z`;
      }
    }
  }

  return path;
}

interface MacPaintProps {
  /** Called as the pen touches down on the first stroke of "hello.". */
  onHello: () => void;
}

/**
 * The screen at rest: MacPaint, where "hello." is written on the page and then
 * wiped away for the Click button. All of that timing is in CSS (.mac-paint-*),
 * so it needs no script, and anything that stops it, such as reduced motion,
 * leaves the button in place.
 */
export function MacPaint({ onHello }: MacPaintProps) {
  return (
    <svg aria-hidden="true" className="mac-paint" viewBox="0 0 512 373">
      <defs>
        {PATTERNS.map((bits, index) => (
          <pattern
            height={8}
            id={`mac-pattern-${index}`}
            key={bits}
            patternUnits="userSpaceOnUse"
            width={8}
          >
            <path d={bitmapPath(bits)} fill={INK} />
          </pattern>
        ))}
      </defs>

      <g shapeRendering="crispEdges">
        <rect fill={DITHER} height={373} width={512} />

        <rect fill={PAPER} height={19} width={512} />
        <MacApple height={13} width={11} x={30} y={3} />
        {MENUS.map(([label, x]) => (
          <text className="mac-paint-text" key={label} x={x} y={14}>
            {label}
          </text>
        ))}

        {/* Tools */}
        <rect fill={PAPER} height={250} width={54} x={17} y={30} />
        <path d="M44 30v250" stroke={DITHER} />
        {TOOLS.map((row, rowIndex) =>
          row.map(({ d, dashed, filled }, column) => {
            const x = 18 + column * 26;
            const y = 30 + rowIndex * 25;
            const isSelected = rowIndex === SELECTED_TOOL[0] && column === SELECTED_TOOL[1];
            const stroke = isSelected ? PAPER : INK;

            return (
              <g key={`${rowIndex}-${column}`} transform={`translate(${x} ${y})`}>
                {isSelected && <rect fill={INK} height={25} width={26} />}
                <path
                  d={d}
                  transform="translate(0 1.5)"
                  fill={filled ? stroke : "none"}
                  stroke={stroke}
                  strokeDasharray={dashed ? "2 2" : undefined}
                />
              </g>
            );
          }),
        )}

        {/* Line widths */}
        <rect fill={PAPER} height={73} width={54} x={17} y={290} />
        <path d="M21 310l2 3 4-7" fill="none" stroke={INK} />
        <path d="M32 310h34" stroke={INK} strokeDasharray="2 2" />
        {[
          [322, 1],
          [333, 2],
          [346, 5],
        ].map(([y, width]) => (
          <path d={`M32 ${y}h34`} key={y} stroke={INK} strokeWidth={width} />
        ))}

        {/* Page */}
        <rect fill={PAPER} height={292} width={414} x={82} y={30} />
        <path d="M82 48h414" stroke={DITHER} />
        <text className="mac-paint-text" textAnchor="middle" x={289} y={44}>
          Shafiq Efféndy
        </text>

        {/* Patterns */}
        <rect fill={PAPER} height={35} width={418} x={82} y={330} />
        <rect fill={INK} height={20} width={30} x={88} y={338} />
        {PATTERN_ROWS.map((row, rowIndex) =>
          row.map((pattern, column) => (
            <rect
              fill={`url(#mac-pattern-${pattern})`}
              height={15}
              key={`${rowIndex}-${column}`}
              stroke={DITHER}
              strokeWidth={0.5}
              width={19.8}
              x={124 + column * 19.8}
              y={332 + rowIndex * 16}
            />
          )),
        )}
      </g>

      {/* Enlarged from the trace to fill the page. The strokes share one pen width. */}
      <g transform="translate(289 186) scale(1.14) translate(-284 -162)">
        <g fill="none" stroke={INK} strokeLinecap="round" strokeLinejoin="round" strokeWidth={11}>
          <path
            className="mac-paint-stroke mac-paint-stem"
            d={HELLO_STEM}
            onAnimationStart={onHello}
            pathLength={1}
          />
          <path className="mac-paint-stroke mac-paint-body" d={HELLO_BODY} pathLength={1} />
          <path className="mac-paint-stroke mac-paint-flick" d={HELLO_FLICK} pathLength={1} />
        </g>
        <circle className="mac-paint-dot" cx={445.1} cy={212.2} fill={INK} r={6.2} />
      </g>
      <rect className="mac-paint-eraser" fill={PAPER} height={170} width={408} x={85} y={100} />

      {/* The ring is the classic mark of a default button. */}
      <g className="mac-paint-click">
        <rect fill={PAPER} height={116} rx={34} stroke={INK} strokeWidth={8} width={272} x={153} y={128} />
        <rect className="mac-paint-click-face" height={92} rx={23} stroke={INK} strokeWidth={3.5} width={248} x={165} y={140} />
        <text className="mac-paint-click-label" textAnchor="middle" x={289} y={214}>
          Click
        </text>
      </g>
    </svg>
  );
}
