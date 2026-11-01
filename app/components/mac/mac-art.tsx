import { APPLE_PATH, MacApple } from "./mac-icons";
import { MacKeyboard } from "./mac-keyboard";
import { Blur, Ramp } from "./mac-ramp";

/**
 * The desk: a Macintosh Classic II from the front, with its keyboard and mouse,
 * drawn from photographs of each. The screen is left out; MacHardware sets it
 * into the dark glass, at the position marked in app.css.
 *
 * The monitor is drawn from (0, 0) at its top left and moved into place, and the
 * mouse is drawn in the pixels of its own photo, scaled down.
 */

const MONITOR_X = 850;
const MONITOR_Y = 50;

const SHADOW = "#23262b";
const MOUSE_CABLE =
  "M2234 1314C2224 1262 2208 1212 2160 1190 2112 1170 2062 1196 2076 1236 2088 1270 2140 1262 2136 1296 2133 1318 2104 1322 2076 1316";
const COILED_LEAD = "M1950 1262C1984 1176 1858 1098 1650 1096";

const SLAB =
  "M30 0H870Q899 0 900 30L892 852Q892 862 882 862H18Q8 862 8 852L0 30Q1 0 30 0Z";
const PANEL =
  "M12 858H888V1000Q888 1038 848 1041Q450 1056 52 1041Q12 1038 12 1000Z";
const BASE =
  "M58 1020H842V1084Q842 1101 822 1102Q450 1114 78 1102Q58 1101 58 1084Z";
const GLASS =
  "M146 169H754Q792 169 792 207L795 420 792 634Q792 672 754 672H146Q108 672 108 634L105 420 108 207Q108 169 146 169Z";

function Monitor() {
  return (
    <g transform={`translate(${MONITOR_X} ${MONITOR_Y})`}>
      <defs>
        <Ramp
          axis="y"
          id="mac-slab"
          stops={[
            [0, "#eae5da"],
            [120, "#e3ddd0"],
            [500, "#dcd5c8"],
            [860, "#d0c9ba"],
          ]}
        />
        <Ramp
          axis="x"
          id="mac-slab-falloff"
          stops={[
            [0, "#ffffff"],
            [450, "#f9f7f3"],
            [900, "#e2ded5"],
          ]}
        />
        <Ramp
          axis="y"
          id="mac-recess-top"
          stops={[
            [129, "#74695a"],
            [169, "#918778"],
          ]}
        />
        <Ramp
          axis="y"
          id="mac-recess-left"
          stops={[
            [129, "#cdc6b7"],
            [320, "#ddd6c8"],
            [729, "#d6cfc0"],
          ]}
        />
        <Ramp
          axis="y"
          id="mac-recess-right"
          stops={[
            [129, "#a2988a"],
            [420, "#b3a999"],
            [729, "#aaa090"],
          ]}
        />
        <Ramp
          axis="x"
          id="mac-recess-ledge"
          stops={[
            [72, "#f1ece0"],
            [450, "#eee8dc"],
            [828, "#f4efe3"],
          ]}
        />
        <radialGradient cx="0.46" cy="0.42" id="mac-glass" r="0.72">
          <stop offset="0" stopColor="#333e39" />
          <stop offset="0.62" stopColor="#262f2b" />
          <stop offset="1" stopColor="#111513" />
        </radialGradient>
        <Ramp
          axis="y"
          id="mac-panel"
          stops={[
            [884, "#dcd5c7"],
            [960, "#d6cfc1"],
            [1006, "#cac3b4"],
            [1050, "#a8a192"],
          ]}
        />
        <Ramp
          axis="x"
          id="mac-panel-falloff"
          stops={[
            [12, "#ffffff"],
            [888, "#e3dfd6"],
          ]}
        />
        <Ramp
          axis="y"
          id="mac-base"
          stops={[
            [1034, "#5f5a4e"],
            [1058, "#8f8879"],
            [1082, "#b4ad9e"],
            [1108, "#c6bfb0"],
          ]}
        />
        <clipPath id="mac-recess-shape">
          <rect height={600} rx={32} width={756} x={72} y={129} />
        </clipPath>
        <clipPath id="mac-glass-shape">
          <path d={GLASS} />
        </clipPath>
        <clipPath id="mac-slab-shape">
          <path d={SLAB} />
        </clipPath>
      </defs>

      <path d={BASE} fill="url(#mac-base)" />

      <g style={{ isolation: "isolate" }}>
        <path d={PANEL} fill="url(#mac-panel)" />
        <path d={PANEL} fill="url(#mac-panel-falloff)" style={{ mixBlendMode: "multiply" }} />
      </g>
      {/* The bottom of the panel rolls under, with a rim of reflected light. */}
      <path d="M40 1040Q450 1055 860 1040" fill="none" stroke="#fff" strokeOpacity={0.3} strokeWidth={1.5} />

      <g style={{ isolation: "isolate" }}>
        <path d={SLAB} fill="url(#mac-slab)" />
        <path d={SLAB} fill="url(#mac-slab-falloff)" style={{ mixBlendMode: "multiply" }} />
      </g>
      {/* The slab's edges roll away: lit along the top and left, in shade down the
          right, and darkening towards the seam where it turns under. */}
      <g clipPath="url(#mac-slab-shape)">
        <path d="M904 0L896 870" fill="none" filter="url(#mac-blur-near)" stroke="#6b6557" strokeOpacity={0.5} strokeWidth={30} />
        <path d="M0 856H900" fill="none" filter="url(#mac-blur-near)" stroke="#6b6557" strokeOpacity={0.4} strokeWidth={18} />
      </g>
      <path d="M22 3H878" stroke="#fff" strokeLinecap="round" strokeOpacity={0.75} strokeWidth={2.4} />
      <path d="M3 34L10 846" stroke="#fff" strokeOpacity={0.5} strokeWidth={2.4} />
      <path d="M897 34L889 846" stroke="#8d8676" strokeOpacity={0.4} strokeWidth={3} />

      {/* The recess. Each wall takes a different light, and they meet softly. */}
      <g clipPath="url(#mac-recess-shape)">
        <g filter="url(#mac-blur-soft)">
          <path d="M72 129L108 169V672L72 729Z" fill="url(#mac-recess-left)" />
          <path d="M828 129L792 169V672L828 729Z" fill="url(#mac-recess-right)" />
          <path d="M72 729L108 672H792L828 729Z" fill="url(#mac-recess-ledge)" />
          <path d="M62 119H838V129L792 169H108L72 129Z" fill="url(#mac-recess-top)" />
        </g>
      </g>
      <rect fill="none" height={600} rx={32} stroke="#5f5648" strokeOpacity={0.3} strokeWidth={1.6} width={756} x={72} y={129} />
      <path d="M100 730Q450 733 800 730" fill="none" stroke="#fff" strokeOpacity={0.55} strokeWidth={2} />

      <path d={GLASS} fill="url(#mac-glass)" />
      {/* The tube's dark rim, with the display's glow caught in it. */}
      <g clipPath="url(#mac-glass-shape)">
        <path d={GLASS} fill="none" filter="url(#mac-blur-glass)" stroke="#000" strokeOpacity={0.85} strokeWidth={14} />
        <rect fill="#19c9e0" filter="url(#mac-blur-glass)" height={494} opacity={0.34} rx={30} width={676} x={112} y={173} />
      </g>

      {/* The seam under the slab, and the ridge that runs beneath the slot. */}
      <path d="M12 862.5H888" stroke="#74705f" strokeOpacity={0.75} strokeWidth={2} />
      <path d="M12 888H888" stroke="#faf7ef" strokeWidth={3.4} />
      <path d="M12 890.5H888" stroke="#9e9788" strokeOpacity={0.4} strokeWidth={1.4} />

      {/* The floppy slot, cut into the band, with the drive's workings behind. */}
      <path d="M438 863H780V887H438Z" fill="#141311" />
      <path d="M441 866H470V884H441Z" fill="#2c2b27" />
      <path d="M738 866H748V884H738Z" fill="#46453e" />
      <path d="M752 869H776V878H752Z" fill="#35342e" />
      <path d="M438 887H780" stroke="#efebe0" strokeWidth={1.4} />
      <path d="M780 863L788 868V889L780 887Z" fill="#e6e0d3" />
      <circle cx={804} cy={875} fill="#1b1a17" r={2.8} />
      <circle cx={804} cy={875} fill="none" r={4.2} stroke="#fff" strokeOpacity={0.45} strokeWidth={1} />

      {/* The badge sits proud of the plastic, with a line of light round it. */}
      <path d={APPLE_PATH} fill="none" stroke="#fff" strokeWidth={0.9} transform="translate(86 942) scale(1.9)" />
      <MacApple height={45.6} width={38} x={86} y={942} />
      <text className="mac-art-wordmark" lengthAdjust="spacingAndGlyphs" textLength={206} x={155} y={986}>
        Macintosh Classic II
      </text>
    </g>
  );
}

const MOUSE_OUTLINE =
  "M60 195C55 215 58 262 72 296L640 722C660 740 685 745 705 738L1050 510C1066 498 1068 480 1066 445 1080 410 1080 390 1065 370L850 165C835 150 820 145 800 140L430 48C410 42 395 42 380 48L75 170C62 176 58 185 60 195Z";
const MOUSE_SHELL =
  "M60 195C55 215 60 225 75 232L430 395C470 420 520 520 640 640 660 660 680 665 700 655L1060 425C1080 410 1080 390 1065 370L850 165C835 150 820 145 800 140L430 48C410 42 395 42 380 48L75 170C62 176 58 185 60 195Z";

function Mouse() {
  return (
    <g className="mac-art-mouse">
      <g transform="translate(2165 1270) scale(.3)">
        <defs>
          <Ramp
            axis="y"
            id="mac-mouse-shell"
            stops={[
              [45, "#e5e0d3"],
              [260, "#ebe6da"],
              [660, "#ddd7c9"],
            ]}
          />
          <Ramp
            axis="x"
            id="mac-mouse-side"
            stops={[
              [62, "#bdb7a7"],
              [420, "#a9a393"],
              [660, "#9b9585"],
            ]}
          />
          <Ramp
            axis="x"
            id="mac-mouse-skirt"
            stops={[
              [640, "#c0baab"],
              [1068, "#d2ccbd"],
            ]}
          />
        </defs>

        <path d={MOUSE_OUTLINE} fill={SHADOW} filter="url(#mac-blur-far)" opacity={0.42} transform="translate(44 62)" />
        <path d={MOUSE_OUTLINE} fill="#16171a" filter="url(#mac-blur-near)" opacity={0.5} transform="translate(8 14)" />
        <path d="M66 234L436 398C500 470 570 570 648 662L640 722 72 296C60 275 60 250 66 234Z" fill="url(#mac-mouse-side)" />
        <path d="M640 662L1066 442C1068 480 1066 498 1050 510L705 738C685 745 660 740 640 722Z" fill="url(#mac-mouse-skirt)" />
        <path d={MOUSE_SHELL} fill="url(#mac-mouse-shell)" />
        <ellipse cx={540} cy={215} fill="#fbf9f3" filter="url(#mac-blur-far)" opacity={0.9} rx={150} ry={46} transform="rotate(-20 540 215)" />
        <clipPath id="mac-mouse-shape">
          <path d={MOUSE_SHELL} />
        </clipPath>
        <g clipPath="url(#mac-mouse-shape)">
          <path d="M60 225L430 395C470 420 520 520 640 640 660 660 680 665 700 655L1060 425 1072 380" fill="none" filter="url(#mac-blur-near)" stroke="#bcb6a7" strokeOpacity={0.75} strokeWidth={26} />
        </g>
        <path d="M66 234L436 398C500 470 570 570 646 664 666 672 684 672 702 660L1066 440" fill="none" stroke="#8d8676" strokeLinejoin="round" strokeWidth={4.5} />
        <path d="M150 172L400 68 555 112 300 228Z" fill="#e6e1d4" stroke="#b1aa99" strokeLinejoin="round" strokeWidth={4} />
        <path d="M152 174L300 231 557 114" fill="none" stroke="#fff" strokeOpacity={0.6} strokeWidth={2.4} />
        <path d={APPLE_PATH} fill="none" stroke="#fff" strokeOpacity={0.8} strokeWidth={0.8} transform="translate(642 432) rotate(-8) scale(3.8)" />
        <path d={APPLE_PATH} fill="none" stroke="#a9a290" strokeWidth={0.8} transform="translate(639 429) rotate(-8) scale(3.8)" />
      </g>
    </g>
  );
}

/**
 * What the set throws on the desk, with the light high up to the left: a soft
 * pool under everything, the computer's shadow falling away to the right, and a
 * tight dark line wherever something actually touches the surface.
 */
function Shadows() {
  return (
    <>
      <defs>
        <Ramp
          axis="x"
          id="mac-cast"
          stops={[
            [1670, "rgba(35, 38, 43, 0.5)"],
            [1880, "rgba(35, 38, 43, 0.3)"],
            [2300, "rgba(35, 38, 43, 0)"],
          ]}
        />
      </defs>

      <ellipse cx={1330} cy={1530} fill={SHADOW} filter="url(#mac-blur-far)" opacity={0.2} rx={1040} ry={58} />

      {/* The computer, very softly on the backdrop behind it, then across the desk. */}
      <g filter="url(#mac-blur-far)" opacity={0.2} transform={`translate(${MONITOR_X + 46} ${MONITOR_Y + 30})`}>
        <path d={SLAB} fill={SHADOW} />
        <path d={PANEL} fill={SHADOW} />
      </g>
      <path d="M1670 1122L2020 1112 2300 1176 1900 1214 1670 1196Z" fill="url(#mac-cast)" filter="url(#mac-blur-mid)" />
      <ellipse cx={1300} cy={1156} fill={SHADOW} filter="url(#mac-blur-mid)" opacity={0.34} rx={520} ry={40} />

      {/* Deep in under the panel, where it overhangs the base. */}
      <path d="M866 1094H1734L1752 1170H852Z" fill={SHADOW} filter="url(#mac-blur-near)" opacity={0.56} />

      {/* The keyboard: soft beyond its right end, tight along its front edge. */}
      <path d="M2100 1496L2200 1484 2252 1546 2100 1556Z" fill={SHADOW} filter="url(#mac-blur-mid)" opacity={0.3} />
      <rect fill={SHADOW} filter="url(#mac-blur-mid)" height={30} opacity={0.3} width={1640} x={490} y={1532} />
      <rect fill="#16171a" filter="url(#mac-blur-near)" height={14} opacity={0.66} width={1636} x={482} y={1527} />
    </>
  );
}

/** Everything but the screen. Purely decorative. */
export function MacArt() {
  return (
    <svg aria-hidden="true" className="mac-art" viewBox="0 0 2600 1600">
      <defs>
        <Blur deviation={1.5} id="mac-blur-soft" />
        <Blur deviation={8} id="mac-blur-glass" />
        <Blur deviation={8} id="mac-blur-near" />
        <Blur deviation={22} id="mac-blur-mid" />
        <Blur deviation={60} id="mac-blur-far" />
      </defs>

      <Shadows />

      {/* ─── Cables, behind everything they plug into ─── */}
      <path className="mac-art-cable-tall" d="M1830 1586C1828 1566 1822 1548 1816 1530" fill="none" stroke="#a7a193" strokeLinecap="round" strokeWidth={7} />
      <g className="mac-art-cable-wide" fill="none" strokeLinecap="round">
        <path d={MOUSE_CABLE} filter="url(#mac-blur-near)" stroke={SHADOW} strokeOpacity={0.22} strokeWidth={9} transform="translate(8 16)" />
        <path d={MOUSE_CABLE} stroke="#a7a193" strokeWidth={7} />
        <path d="M2233 1312C2223 1260 2207 1210 2159 1188 2111 1168 2061 1194 2075 1234 2087 1268 2139 1260 2135 1294 2132 1316 2103 1320 2075 1314" stroke="#ece8dd" strokeWidth={2.6} />
      </g>

      {/* The keyboard's coiled lead, ribbed by a dash of its lighter colour. */}
      <g fill="none">
        <path d={COILED_LEAD} filter="url(#mac-blur-near)" stroke={SHADOW} strokeOpacity={0.36} strokeWidth={30} transform="translate(10 22)" />
        <path d={COILED_LEAD} stroke="#6f6b62" strokeWidth={30} />
        <path d={COILED_LEAD} stroke="#c9c4b7" strokeDasharray="10 4.5" strokeWidth={28} />
        <path d="M1944 1256C1978 1172 1856 1092 1648 1090" stroke="#f3f0e7" strokeDasharray="10 4.5" strokeOpacity={0.75} strokeWidth={8} />
      </g>

      <Monitor />
      <MacKeyboard />
      <Mouse />
    </svg>
  );
}
