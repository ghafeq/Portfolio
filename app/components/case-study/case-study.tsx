import Image from "next/image";
import type { ReactNode } from "react";
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
  logo: CaseStudyImage;
  title: string;
  lede: string;
}

export function CaseStudyHero({ logo, title, lede }: CaseStudyHeroProps) {
  return (
    <header>
      <Image
        alt={logo.alt}
        className="case-study-logo"
        height={LOGO_HEIGHT}
        loading="eager"
        src={logo.src}
        width={Math.round((logo.width * LOGO_HEIGHT) / logo.height)}
      />
      <h1 className="display mt-6">{title}</h1>
      <p className="case-study-lede mt-6">{lede}</p>
    </header>
  );
}

export function CaseStudyMeta({ items }: { items: [term: string, value: string][] }) {
  return (
    <ScrollReveal className="case-study-meta">
      <dl className="grid gap-3 sm:grid-cols-2">
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

export function CaseStudySection({ title, copy, wide = false, children }: CaseStudySectionProps) {
  const paragraphs = copy === undefined ? [] : [copy].flat();

  return (
    <article className={`case-study-section${wide ? " case-study-wide" : ""}`}>
      <ScrollReveal>
        <h2 className="case-study-heading">{title}</h2>
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
        <Image
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
  children: ReactNode;
}

export function CaseStudyStat({ value, title, children }: CaseStudyStatProps) {
  return (
    <ScrollReveal className="case-study-card">
      <p className="case-study-stat-value">{value}</p>
      <div>
        <h3 className="case-study-card-title">{title}</h3>
        <p className="case-study-stat-body mt-2">{children}</p>
      </div>
    </ScrollReveal>
  );
}
