import type { Metadata } from "next";
import Image from "next/image";
import {
  CaseStudyIndex,
  CaseStudyNext,
  CaseStudyMeta,
  CaseStudySection,
  ImageLightbox,
  ScrollReveal,
  projectAsset,
} from "../components";

export const metadata: Metadata = {
  title: "Gain Secure Brand Identity — Shafiq Efféndy",
};

const asset = (file: string) => projectAsset("Gain-Secure", file);

const meta: [string, string][] = [
  ["Role", "Sole graphic designer, Lead"],
  ["Design", "Adobe Illustrator"],
  ["Status", "Currently used since 2025"],
];

// Every swatch card is exported at the same size.
const SWATCH = { width: 440, height: 660 };

const palette = [
  { code: "2727 C", description: "bright blue" },
  { code: "368 C", description: "lime green" },
  { code: "532 C", description: "deep navy" },
  { code: "419 C", description: "near black" },
];

const symbolVariations = [
  { file: "Symbol Colour.png", alt: "The Gain Secure symbol in full colour: blue colon and slash, green slash, on white." },
  { file: "Symbol Black.png", alt: "The Gain Secure symbol in solid black on white." },
  { file: "Symbol Reversed.png", alt: "The Gain Secure symbol reversed in white on black." },
];

export default function GainSecurePage() {
  return (
    <main className="case-study flex-1 bg-(--app-layer-background) text-(--text-primary)">
      <div className="wrapper px-6 pt-16 pb-16 sm:px-10">
        {/* The wordmark is the title, so it breaks out as wide as the design
            sets it and carries the page's heading through its alt text. */}
        <ScrollReveal className="case-study-wide">
          <h1>
            <Image
              alt="Gain Secure"
              className="block h-auto w-full"
              height={848}
              preload
              sizes="100vw"
              src={asset("Logo.png")}
              width={4096}
            />
          </h1>
        </ScrollReveal>

        <CaseStudyMeta columns={3} items={meta} />

        <CaseStudySection
          copy="It is signifying the bridge between human insight and machine intelligence. The vibrant blue and green reflect innovation, connectivity, and growth. Paired with Plus Jakarta Sans in bold black, the design embodies our identity as a modern, AI-driven company committed to shaping a human-centred technological future."
          title="The mark is built on “://”, the part of a URL nobody reads and everybody recognises."
        />

        <CaseStudySection
          copy="Both lockups are set on a unit, a. The symbol sits in a 6a square, and the full logo adds a 28.5a wordmark beside it. Each keeps 1a of clear space on every side."
          title="Construction grid"
        >
          {/* Columns sized by each image's ratio, so the two lockups share a
              height side by side. Stacked on phones. */}
          <div className="grid items-end gap-4 sm:grid-cols-[1520fr_384fr]">
            <ImageLightbox
              alt="Construction grid for the full Gain Secure logo: the symbol in a 6a square, the wordmark across 28.5a, with 1a of clear space around both."
              height={384}
              sizes="(max-width: 640px) 100vw, 640px"
              src={asset("Construction Grid Full.png")}
              width={1520}
            />
            <ImageLightbox
              alt="Construction grid for the Gain Secure symbol alone: the colon and two slashes in a 6a square, with 1a of clear space on every side."
              height={400}
              sizes="(max-width: 640px) 100vw, 200px"
              src={asset("Construction Grid Symbol.png")}
              width={400}
            />
          </div>
        </CaseStudySection>

        <CaseStudySection
          copy="The symbol stands alone in full colour, in black for one-colour print, and reversed in white on black for dark backgrounds."
          title="Symbol-only lock-up variations"
        >
          {/* Three across at every width. */}
          <ul className="grid grid-cols-3 gap-4">
            {symbolVariations.map(({ file, alt }) => (
              <li className="case-study-swatch-tile" key={file}>
                <ImageLightbox
                  alt={alt}
                  height={400}
                  sizes="(max-width: 640px) 33vw, 260px"
                  src={asset(file)}
                  width={400}
                />
              </li>
            ))}
          </ul>
        </CaseStudySection>

        <CaseStudySection title="Colour palette" wide>
          {/* Butted together with no gap, as one strip, so the colours read
              against each other. Two by two on phones. */}
          <ul className="grid grid-cols-2 sm:grid-cols-4">
            {palette.map(({ code, description }) => (
              <li key={code}>
                <Image
                  alt={`Pantone ${code}, ${description}`}
                  className="block h-auto w-full"
                  height={SWATCH.height}
                  sizes="(max-width: 640px) 50vw, 25vw"
                  src={asset(`Pantone ${code}.png`)}
                  width={SWATCH.width}
                />
              </li>
            ))}
          </ul>
        </CaseStudySection>

        <CaseStudySection title="Typography" wide>
          <ImageLightbox
            alt="Plus Jakarta Sans specimen: a large ABC in the brand blue, green and navy, with the alphabet and numerals at 24 Medium, and at 14 in Light, Regular and Bold."
            height={532}
            sizes="100vw"
            src={asset("Typography.png")}
            width={1588}
          />
        </CaseStudySection>
      </div>
      <CaseStudyNext current="/gain-secure" />
      <CaseStudyIndex />
    </main>
  );
}
