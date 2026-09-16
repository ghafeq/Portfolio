import type { Metadata } from "next";
import Image from "next/image";
import {
  CaseStudyIndex,
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

export default function GainSecurePage() {
  return (
    <main className="case-study flex-1 bg-(--white) text-(--text-primary)">
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
      <CaseStudyIndex />
    </main>
  );
}
