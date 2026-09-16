import Image from "next/image";
import type { ReactNode } from "react";
import { ImageLightbox } from "../image-lightbox";
import { ScrollReveal } from "../stagger-reveal";

/** A file under /public/projects, with its size so nothing is cropped. */
export interface CaseStudyImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/**
 * Builds the public URL for a project asset. Filenames stay readable in the
 * page source and are encoded here, so hosts that do not normalise spaces
 * still resolve them.
 */
export const projectAsset = (folder: string, file: string) =>
  `/projects/${folder}/${encodeURIComponent(file)}`;

// Rendered height of the client logo, in px. The width follows each file's own
// ratio, so wide and square marks sit at the same visual weight.
const LOGO_HEIGHT = 80;

// Images inside the reading measure never render wider than the wrapper.
const MEASURE_SIZES = "(max-width: 660px) 100vw, 600px";

export interface CaseStudyHeroProps {
  /** Left out for self-initiated work with no client mark. */
  logo?: CaseStudyImage;
  title: string;
  lede: string;
}

export function CaseStudyHero({ logo, title, lede }: CaseStudyHeroProps) {
  return (
    <header>
      {logo && (
        <Image
          alt={logo.alt}
          className="case-study-logo mb-6"
          height={LOGO_HEIGHT}
          loading="eager"
          src={logo.src}
          width={Math.round((logo.width * LOGO_HEIGHT) / logo.height)}
        />
      )}
      <h1 className="display">{title}</h1>
      <p className="case-study-lede">{lede}</p>
    </header>
  );
}

export function CaseStudyMeta({
  items,
  columns = 2,
}: {
  items: [term: string, value: string][];
  /** Three suits a short list that would otherwise leave one item alone. */
  columns?: 2 | 3;
}) {
  return (
    <ScrollReveal className="case-study-meta">
      <dl className={`grid gap-3 ${columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
        {items.map(([term, value]) => (
          <div key={term}>
            <dt className="case-study-meta-term">{term}</dt>
            <dd className="case-study-meta-value mt-1">{value}</dd>
          </div>
        ))}
      </dl>
    </ScrollReveal>
  );
}

export interface CaseStudySectionProps {
  title: string;
  /** Prose under the heading. An array renders as separate paragraphs. */
  copy?: string | string[];
  /** Breaks out of the reading measure, for grids that need the width. */
  wide?: boolean;
  children?: ReactNode;
}

/** A URL fragment from a heading, so every section can be linked to and the
    floating index has something to jump to. */
const headingId = (title: string) =>
  title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export function CaseStudySection({ title, copy, wide = false, children }: CaseStudySectionProps) {
  const paragraphs = copy === undefined ? [] : [copy].flat();

  return (
    <article className={`case-study-section${wide ? " case-study-wide" : ""}`}>
      <ScrollReveal>
        <h2 className="case-study-heading" id={headingId(title)}>
          {title}
        </h2>
        {paragraphs.map((paragraph) => (
          <p className="case-study-copy mt-6" key={paragraph}>
            {paragraph}
          </p>
        ))}
      </ScrollReveal>
      {children && <div className="mt-6">{children}</div>}
    </article>
  );
}

export function CaseStudyCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <ScrollReveal className="case-study-card">
      <h3 className="case-study-card-title">{title}</h3>
      <p className="case-study-copy">{children}</p>
    </ScrollReveal>
  );
}

export interface CaseStudyFeatureProps {
  title: string;
  /** Left out while a screenshot is still being made; the slot stays open and
      is labelled, so it reads as reserved rather than broken. */
  image?: CaseStudyImage;
  children: ReactNode;
}

export function CaseStudyFeature({ title, image, children }: CaseStudyFeatureProps) {
  return (
    <ScrollReveal className="case-study-feature">
      {image ? (
        <ImageLightbox
          alt={image.alt}
          className="case-study-feature-image"
          height={image.height}
          sizes={MEASURE_SIZES}
          src={image.src}
          width={image.width}
        />
      ) : (
        <div className="case-study-placeholder case-study-feature-placeholder">
          <span className="case-study-placeholder-label">{title}</span>
          <span className="caption">Screenshot in progress</span>
        </div>
      )}
      <div className="case-study-feature-body">
        <h3 className="case-study-subhead">{title}</h3>
        <p className="case-study-copy">{children}</p>
      </div>
    </ScrollReveal>
  );
}

export interface CaseStudyStatProps {
  value: string;
  title: string;
  /** Sets the card a step darker, for the one number the rest should be read
      against. */
  emphasis?: boolean;
  children: ReactNode;
}

export function CaseStudyStat({ value, title, emphasis = false, children }: CaseStudyStatProps) {
  return (
    <ScrollReveal className={`case-study-card${emphasis ? " case-study-card-emphasis" : ""}`}>
      <p className="case-study-stat-value">{value}</p>
      <div>
        <h3 className="case-study-card-title">{title}</h3>
        <p className="case-study-stat-body mt-2">{children}</p>
      </div>
    </ScrollReveal>
  );
}
