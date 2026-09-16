import type { Metadata } from "next";
import Image from "next/image";
import {
  CaseStudyHero,
  CaseStudyIndex,
  CaseStudyMeta,
  CaseStudySection,
  FigmaEmbed,
  GoshiCover,
  ScrollReveal,
} from "../components";

export const metadata: Metadata = {
  title: "Gōshi Design System — Shafiq Efféndy",
};

const meta: [string, string][] = [
  ["Role", "Sole designer"],
  ["Timeline", "Started on 6 September 2025"],
  ["Team", "Self-initiated project"],
  ["Status", "In progress"],
  ["Design", "Figma, Iconoir"],
  ["Build", "Code framework and markdown specs"],
];

// Share links to the working files, embedded live so a reviewer can open the
// real tokens and components rather than screenshots of them.
const FIGMA = {
  typeSet:
    "https://www.figma.com/design/jTSshQ2rAWNqYzn7y5qRyG/G%C5%8Dshi-Type-Set-_Enterprise?node-id=0-1",
  colourPalette:
    "https://www.figma.com/design/BOyUIrMprCdEVlZg3ySkkD/G%C5%8Dshi-Colour-Palette-v.1?node-id=34-2",
  enterprise:
    "https://www.figma.com/design/BXylJabPq2Q3w2ZDSm8qpO/G%C5%8Dshi-Design-System-v.1-_Enterprise?node-id=348-172803",
};

type SpecLine =
  | { kind: "title" | "heading" | "text" | "rule"; text: string }
  /** A key and value set in two aligned columns. */
  | { kind: "entry" | "implementation"; name: string; value: string }
  /** The blank line that separates two blocks. */
  | { kind: "gap" };

// Wide enough for the longest key, so every value starts in the same column.
const KEY_COLUMN = 15;

// One component spec, end to end: the name, the vocabulary, the rules that
// cannot be breached, and the implementation notes.
const BUTTON_SPEC: SpecLine[] = [
  { kind: "title", text: "# Button" },
  { kind: "gap" },
  { kind: "heading", text: "## Dictionary" },
  { kind: "entry", name: "variant", value: "primary | secondary | tertiary | ghost | danger" },
  { kind: "entry", name: "size", value: "sm | md | lg" },
  { kind: "entry", name: "state", value: "default | hover | focus | active | disabled | loading" },
  { kind: "gap" },
  { kind: "heading", text: "## Vocabulary" },
  { kind: "text", text: "Label, never text. Leading icon, never left icon." },
  { kind: "text", text: "Destructive is danger. It is never warning." },
  { kind: "gap" },
  { kind: "heading", text: "## Rules, do not breach" },
  { kind: "rule", text: "- One primary action per view. No exceptions." },
  { kind: "rule", text: "- Label is a verb. \"Save\", not \"OK\"." },
  { kind: "rule", text: "- Focus ring binds to a token, never a raw shadow." },
  { kind: "rule", text: "- Disabled is never the only signal. Say why." },
  { kind: "rule", text: "- Target 24px enterprise, 48px kiosk. Same component." },
  { kind: "gap" },
  { kind: "heading", text: "## Implementation" },
  { kind: "implementation", name: "token", value: "--goshi-button-primary-bg  ->  color/action/primary" },
  { kind: "implementation", name: "props", value: "variant, size, iconStart, loading, disabled" },
  { kind: "implementation", name: "a11y", value: "aria-busy while loading. Never aria-disabled alone." },
];

const WINDOW_DOTS = ["red", "yellow", "green"];

/**
 * A spec file shown as it reads in an editor. Real text rather than a
 * screenshot, so it stays sharp and can be read, selected and copied. Keys are
 * padded with spaces, not laid out with CSS, so the columns survive a copy.
 */
function MarkdownSpec({ file, lines }: { file: string; lines: SpecLine[] }) {
  return (
    <figure className="markdown-spec">
      <figcaption className="markdown-spec-bar">
        {WINDOW_DOTS.map((colour) => (
          <Image
            alt=""
            className="markdown-spec-dot"
            height={10}
            key={colour}
            src={`/projects/Goshi/window-dot-${colour}.svg`}
            unoptimized
            width={10}
          />
        ))}
        <span className="markdown-spec-file">{file}</span>
      </figcaption>
      {/* Focusable, because on a narrow screen the lines scroll sideways and
          keyboard users need a way to reach the end of them. */}
      <pre aria-label={`Contents of ${file}`} className="markdown-spec-body" role="region" tabIndex={0}>
        <code>
          {lines.map((line, index) => {
            if (line.kind === "gap") {
              return <span aria-hidden="true" className="markdown-spec-gap" key={index} />;
            }

            if ("name" in line) {
              return (
                <span className="markdown-spec-line" key={index}>
                  <span className={`markdown-spec-${line.kind}`}>{line.name.padEnd(KEY_COLUMN)}</span>
                  {line.value}
                </span>
              );
            }

            return (
              <span className={`markdown-spec-line markdown-spec-${line.kind}`} key={index}>
                {line.text}
              </span>
            );
          })}
        </code>
      </pre>
    </figure>
  );
}

export default function GoshiDesignSystemPage() {
  return (
    <main className="case-study flex-1 bg-(--white) text-(--text-primary)">
      {/* Outside the wrapper, so the cover runs the full width of the page. */}
      <GoshiCover className="goshi-cover-banner" preload />

      <div className="wrapper px-6 pt-16 pb-16 sm:px-10">
        <CaseStudyHero
          lede="A component library and UI framework engineered to span enterprise, consumer and physical products. Enterprise is the tier I am building first."
          title="Gōshi Design System"
        />

        <CaseStudyMeta items={meta} />

        <CaseStudySection
          copy={[
            "I have been the sole designer at a technology-focused vendor company since August 2023. Three clients, three projects running in parallel, no shared design layer underneath any of them.",
            "In that setup the system is whatever the last project needed. Patterns get redrawn, decisions get remade, and nothing accumulates. It holds at three projects. It does not hold at ten.",
            "Gōshi is that missing layer, built on my own time and in the open. The products I ship are covered by NDA. The reasoning does not have to be.",
          ]}
          title="Why this exists."
        />

        <CaseStudySection
          copy={[
            "Gōshi is scoped wider than a single library. Enterprise portals, consumer apps, and physical interfaces like kiosks, handheld terminals and home appliances all sit inside it, because they can share a foundation even when they cannot share a component.",
            "Enterprise is the tier I am building first, and this case study covers that one.",
          ]}
          title="One framework, several kinds of product."
        />

        <CaseStudySection
          copy={[
            "The Figma library is where the design work happens. The code framework is what engineering consumes. Between those two sits the gap where most systems quietly drift apart.",
            "So there is a third artefact, and it is written. Markdown specs carrying the naming dictionary, the vocabulary each component is described in, the rules that cannot be breached, and how a design decision is expected to arrive in implementation.",
            "A component is not finished when it looks right in a frame. It is finished when the name, the states, the constraints and the implementation notes agree in all three places.",
            "The specs are written to be read by a person and by a coding agent. I am the only one maintaining this, so the handoff has to survive without me in the room.",
          ]}
          title="Three artefacts, not one."
        >
          {/* grid-cols-1 is minmax(0, 1fr): without it the spec's unwrapped
              lines would stretch the column past a phone's width instead of
              scrolling inside their own frame. */}
          <div className="grid grid-cols-1 gap-8">
            <ScrollReveal className="grid gap-6">
              <FigmaEmbed title="Foundation library — Type Set" url={FIGMA.typeSet} />
              <FigmaEmbed title="Foundation library — Colour Palette" url={FIGMA.colourPalette} />
            </ScrollReveal>

            <ScrollReveal>
              <FigmaEmbed title="_Enterprise Design System" url={FIGMA.enterprise} />
            </ScrollReveal>

            <ScrollReveal>
              <MarkdownSpec file="goshi/specs/button.md" lines={BUTTON_SPEC} />
            </ScrollReveal>
          </div>
        </CaseStudySection>

        <CaseStudySection
          copy={[
            "Foundations version separately from components, because a colour change should not force a component release.",
            "Icons are borrowed, not drawn. A bespoke icon library is the fastest way to stall a system built by one person.",
            "Each platform gets its own package rather than one library stretched thin. A kiosk pressed with a gloved finger needs 48 to 64px targets and 7:1 contrast against glare. An enterprise table read across an eight-hour shift needs 24px targets, 4.5:1 text, and density a kiosk would never survive. Same foundation, different rulebook.",
          ]}
          title="Three rules I gave it."
        />

        <CaseStudySection
          copy={[
            "Inside a project, it removes the part of the work that should never be redesigned. Inputs, tables, navigation and their states arrive already decided, so the time goes to the actual problem instead of the primitives.",
            "Across projects, it gives parallel clients one vocabulary. A pattern proven on one job is available to the next without being redrawn from memory.",
            "Across platforms, it is the reason a kiosk and an enterprise portal can share a foundation without sharing a component set.",
            "And for anyone reviewing my work, it is the part that is visible. The products are under NDA. The thinking behind them does not have to be.",
          ]}
          title="What it helps with."
        />

        <CaseStudySection
          copy={[
            "The system is still in progress. Foundations are set and the component library is filling out, with spacing and utilities still open.",
            "The honest gap is that Gōshi has not yet carried a product end to end. The real test is whether it survives contact with a deadline, and that has not happened.",
            "So I am not waiting for the other tiers before writing code. The enterprise components go into development now, alongside the design work rather than after it. A system that only exists in Figma has not been tested, and the fastest way to find out what is wrong with a component is to build it.",
          ]}
          title="What is next."
        />
      </div>
      <CaseStudyIndex />
    </main>
  );
}
