import { PLATINUM, SHADOW } from "./mac-desk";
import { APPLE_PATH, MacApple } from "./mac-icons";
import { MacKeyboard } from "./mac-keyboard";
import { MOUSE_CABLE, MacMouse } from "./mac-mouse";
import { Blur, Ramp } from "./mac-ramp";

/**
 * The desk: a Macintosh Classic II from the front, with its keyboard and mouse,
 * drawn from photographs of each and lit and coloured from mac-desk.ts, so they
 * agree. The screen is left out; MacHardware sets it into the dark glass, at the
 * position marked in app.css.
 *
 * The monitor is drawn from (0, 0) at its top left and moved into place.
 */

const MONITOR_X = 850;
const MONITOR_Y = 50;

const COILED_LEAD = "M1950 1262C1984 1176 1858 1098 1650 1096";
// One ring of the coil, then the gap to the next.
const COIL_DASH = "7.5 3.5";

// One moulding: its sides taper in by 10 from top to bottom, all four corners are
// rounded alike, and the seam at 862 is only a groove across it. The slab and
// the panel below the seam share those sides, so there is no step between them.
const SLAB = "M30 0H870Q900 0 900 30L891.8 862H8.2L0 30Q0 0 30 0Z";
const PANEL = "M8.2 856H891.8L890 1016Q890 1046 860 1046H40Q10 1046 10 1016Z";
// The foot, set in from the sides and tucked under the panel.
const BASE = "M60 1030H840V1090Q840 1104 826 1104H74Q60 1104 60 1090Z";
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
            [129, "#958d7e"],
            [169, "#aea697"],
          ]}
        />
        <Ramp
          axis="y"
          id="mac-recess-left"
          stops={[
            [129, "#aaa292"],
            [420, "#b9b1a1"],
            [729, "#b2aa9a"],
          ]}
        />
        <Ramp
          axis="y"
          id="mac-recess-right"
          stops={[
            [129, "#d6cfc1"],
            [320, "#e2dbce"],
            [729, "#dad3c5"],
          ]}
        />
        <Ramp
          axis="x"
          id="mac-recess-ledge"
          stops={[
            [72, "#f2ede3"],
            [450, "#ece6da"],
            [828, "#e4ded2"],
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
            [884, "#d7d0c2"],
            [990, "#d1c9bb"],
            [1022, "#c4bcad"],
            [1046, "#a19a8b"],
          ]}
        />
        <Ramp
          axis="x"
          id="mac-panel-falloff"
          stops={[
            [10, "#ffffff"],
            [890, "#e3dfd6"],
          ]}
        />
        <Ramp
          axis="y"
          id="mac-base"
          stops={[
            [1030, "#5c564a"],
            [1050, "#8a8374"],
            [1074, "#b0a899"],
            [1104, "#c6beae"],
          ]}
        />
        <Ramp
          axis="x"
          id="mac-base-falloff"
          stops={[
            [60, "#ffffff"],
            [450, "#f2efe9"],
            [840, "#d6d1c6"],
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
        <clipPath id="mac-plastic-shape">
          <path d={SLAB} />
          <path d={PANEL} />
        </clipPath>
        {/* The faint grain of moulded plastic, so it does not read as flat colour. */}
        <filter height="100%" id="mac-grain" width="100%" x="0" y="0">
          <feTurbulence baseFrequency="0.8" numOctaves={2} seed={4} type="fractalNoise" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <Ramp
          axis="y"
          id="mac-slot-bevel"
          stops={[
            [864, "#8f887a"],
            [870, "#b8b1a2"],
            [880, "#ddd7ca"],
            [887, "#f6f2e8"],
          ]}
        />
      </defs>

      {/* The base: deep in shade under the panel, lit down its left side and
          falling away to the right, with a rim of light where it meets the desk. */}
      <g style={{ isolation: "isolate" }}>
        <path d={BASE} fill="url(#mac-base)" />
        <path d={BASE} fill="url(#mac-base-falloff)" style={{ mixBlendMode: "multiply" }} />
      </g>
      <g fill="none" filter="url(#mac-blur-edge)">
        <path d="M61.5 1046V1090Q61.5 1102.5 74 1102.5" stroke="#fff" strokeOpacity={0.4} strokeWidth={3} />
        <path d="M838.5 1046V1090Q838.5 1102.5 826 1102.5" stroke="#5b5649" strokeOpacity={0.4} strokeWidth={4} />
        <path d="M74 1103H826" stroke="#f4efe3" strokeOpacity={0.6} strokeWidth={2.4} />
      </g>

      <g style={{ isolation: "isolate" }}>
        <path d={PANEL} fill="url(#mac-panel)" />
        <path d={PANEL} fill="url(#mac-panel-falloff)" style={{ mixBlendMode: "multiply" }} />
      </g>
      {/* The bottom of the panel rolls under, with a rim of reflected light. */}
      <path d="M42 1043.5H858" fill="none" filter="url(#mac-blur-soft)" stroke="#fff" strokeOpacity={0.35} strokeWidth={2} />

      <g style={{ isolation: "isolate" }}>
        <path d={SLAB} fill="url(#mac-slab)" />
        <path d={SLAB} fill="url(#mac-slab-falloff)" style={{ mixBlendMode: "multiply" }} />
      </g>
      <rect
        clipPath="url(#mac-plastic-shape)"
        filter="url(#mac-grain)"
        height={1060}
        opacity={0.07}
        style={{ mixBlendMode: "multiply" }}
        width={900}
      />
      {/* The slab's edges roll away: lit along the top and left, in shade down the
          right, and darkening towards the seam where it turns under. */}
      <g clipPath="url(#mac-slab-shape)">
        <path d="M904 0L896 870" fill="none" filter="url(#mac-blur-near)" stroke="#6b6557" strokeOpacity={0.5} strokeWidth={30} />
        <path d="M0 856H900" fill="none" filter="url(#mac-blur-near)" stroke="#6b6557" strokeOpacity={0.4} strokeWidth={18} />
      </g>
      <g fill="none" filter="url(#mac-blur-edge)" strokeLinecap="round">
        <path d="M24 4H876" stroke="#fff" strokeOpacity={0.85} strokeWidth={4} />
        <path d="M4 34L13.6 1012" stroke="#fff" strokeOpacity={0.6} strokeWidth={4} />
        <path d="M896 34L886.4 1012" stroke="#8d8676" strokeOpacity={0.45} strokeWidth={5} />
      </g>

      {/* The recess. Each wall takes a different light, and they meet softly. */}
      <g clipPath="url(#mac-recess-shape)">
        <g filter="url(#mac-blur-wall)">
          <path d="M72 129L108 169V672L72 729Z" fill="url(#mac-recess-left)" />
          <path d="M828 129L792 169V672L828 729Z" fill="url(#mac-recess-right)" />
          <path d="M72 729L108 672H792L828 729Z" fill="url(#mac-recess-ledge)" />
          <path d="M62 119H838V129L792 169H108L72 129Z" fill="url(#mac-recess-top)" />
        </g>
      </g>
      <rect fill="none" filter="url(#mac-blur-soft)" height={600} rx={32} stroke="#5f5648" strokeOpacity={0.3} strokeWidth={1.6} width={756} x={72} y={129} />
      <path d="M100 730Q450 733 800 730" fill="none" filter="url(#mac-blur-edge)" stroke="#fff" strokeOpacity={0.7} strokeWidth={3} />

      <path d={GLASS} fill="url(#mac-glass)" />
      {/* The tube's dark rim, with the display's glow caught in it. */}
      <g clipPath="url(#mac-glass-shape)">
        <path d={GLASS} fill="none" filter="url(#mac-blur-glass)" stroke="#000" strokeOpacity={0.85} strokeWidth={14} />
        <rect fill="#19c9e0" filter="url(#mac-blur-glass)" height={494} opacity={0.34} rx={30} width={676} x={112} y={173} />
      </g>

      {/* The seam under the slab, and the ridge that runs beneath the slot. */}
      <path d="M8.2 862.5H891.8" filter="url(#mac-blur-soft)" stroke="#74705f" strokeOpacity={0.7} strokeWidth={2.4} />
      <path d="M8.5 888H891.5" filter="url(#mac-blur-soft)" stroke="#faf7ef" strokeWidth={3.4} />
      <path d="M8.5 891H891.5" filter="url(#mac-blur-soft)" stroke="#9e9788" strokeOpacity={0.4} strokeWidth={2} />

      {/* The floppy slot, cut into the band, with the drive's workings behind. */}
      {/* A shallow bevel, in shade at the top and catching light along its lip,
          around a narrow opening. */}
      <rect fill="url(#mac-slot-bevel)" height={23} rx={3} width={348} x={436} y={864} />
      <rect fill="#141311" height={9} rx={2} width={330} x={445} y={870} />
      <rect fill="#000" height={3} opacity={0.55} rx={1.5} width={330} x={445} y={870} />
      <rect fill="#2f2e29" height={4} rx={1} width={26} x={448} y={873.5} />
      <path d="M445 879.5H775" stroke="#fff" strokeOpacity={0.35} strokeWidth={1} />
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
        {/* Every edge that catches or loses the light is softened by this much. */}
        <Blur deviation={2.5} id="mac-blur-edge" />
        <Blur deviation={7} id="mac-blur-wall" />
        <Blur deviation={8} id="mac-blur-glass" />
        <Blur deviation={8} id="mac-blur-near" />
        <Blur deviation={22} id="mac-blur-mid" />
        <Blur deviation={60} id="mac-blur-far" />
      </defs>

      <Shadows />

      {/* ─── Cables, behind everything they plug into ─── */}
      <path className="mac-art-cable-tall" d="M1830 1586C1828 1566 1822 1548 1816 1530" fill="none" stroke={PLATINUM.cable} strokeLinecap="round" strokeWidth={7} />
      <g className="mac-art-cable-wide" fill="none" strokeLinecap="round">
        <path d={MOUSE_CABLE} filter="url(#mac-blur-near)" stroke={SHADOW} strokeOpacity={0.22} strokeWidth={9} transform="translate(8 16)" />
        <path d={MOUSE_CABLE} stroke={PLATINUM.cable} strokeWidth={7} />
        <path d={MOUSE_CABLE} stroke={PLATINUM.highlight} strokeOpacity={0.7} strokeWidth={2.2} transform="translate(-0.8 -1.6)" />
      </g>

      {/* The keyboard's coiled lead: a tube of rings, each catching light along its
          top and shaded underneath, with the gaps between them in shadow. */}
      <g fill="none">
        <path d={COILED_LEAD} filter="url(#mac-blur-near)" stroke={SHADOW} strokeOpacity={0.32} strokeWidth={30} transform="translate(10 22)" />
        <path d={COILED_LEAD} stroke="#a39b8b" strokeWidth={28} />
        <path d={COILED_LEAD} stroke={PLATINUM.cable} strokeDasharray={COIL_DASH} strokeWidth={26} />
        {/* Along each ring: lit where it turns towards the light, shaded where it
            turns away. On the lead's own path, so they stay on their ring. */}
        <g filter="url(#mac-blur-soft)">
          <path d={COILED_LEAD} stroke={PLATINUM.highlight} strokeDasharray="3 8" strokeOpacity={0.55} strokeWidth={24} />
          <path d={COILED_LEAD} stroke={PLATINUM.edge} strokeDasharray="2.5 8.5" strokeDashoffset={-5.5} strokeOpacity={0.3} strokeWidth={24} />
        </g>
        {/* Across the tube: round, so lit along its top and shaded beneath. */}
        <path d={COILED_LEAD} filter="url(#mac-blur-edge)" stroke="#fff" strokeOpacity={0.35} strokeWidth={8} transform="translate(0 -5)" />
        <path d={COILED_LEAD} filter="url(#mac-blur-edge)" stroke="#6f685a" strokeOpacity={0.25} strokeWidth={8} transform="translate(0 8)" />
      </g>

      <Monitor />
      <MacKeyboard />
      <MacMouse />
    </svg>
  );
}
