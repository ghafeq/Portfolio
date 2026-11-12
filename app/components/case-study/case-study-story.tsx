import type { ReactNode } from "react";
import { ImageLightbox } from "../image-lightbox";
import { ScrollReveal } from "../stagger-reveal";
import type { CaseStudyImage } from "./case-study";

/*
 * The story template: a long case study read as chapters. Each chapter opens
 * on a small label and a hairline, so the reader can see where one argument
 * ends, and the label doubles as its name in the sidebar index.
 */

// Story figures run the full text column, about 700px on a laptop.
const FIGURE_SIZES = "(max-width: 768px) 100vw, 50vw";

// Row images sit beside their note from 640px, taking three fifths of the
// column.
const ROW_SIZES = "(max-width: 640px) 100vw, 30vw";

/** A URL fragment from a label, so every chapter can be linked to. */
const chapterId = (label: string) =>
  label
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const paragraphsOf = (copy?: string | string[]) => (copy === undefined ? [] : [copy].flat());

export function CaseStudyStatement({ name, title }: { name: string; title: string }) {
  return (
    <header className="case-study-statement">
      <p className="case-study-eyebrow">{name}</p>
      <h1 className="case-study-statement-title">{title}</h1>
    </header>
  );
}

/** Project facts in three columns. Values can carry links. */
export function CaseStudyFacts({ items }: { items: [term: string, value: ReactNode][] }) {
  return (
    <ScrollReveal className="case-study-facts">
      <dl className="grid gap-x-4 gap-y-5 grid-cols-2 sm:grid-cols-3">
        {items.map(([term, value]) => (
          <div key={term}>
            <dt className="case-study-eyebrow">{term}</dt>
            <dd className="case-study-fact-value mt-1">{value}</dd>
          </div>
        ))}
      </dl>
    </ScrollReveal>
  );
}

export interface CaseStudyChapterProps {
  /** One or two words: the eyebrow above the heading and the index entry. */
  label: string;
  title: string;
  copy?: string | string[];
  children?: ReactNode;
}

export function CaseStudyChapter({ label, title, copy, children }: CaseStudyChapterProps) {
  return (
    <section className="case-study-chapter">
      <ScrollReveal>
        <p className="case-study-eyebrow">{label}</p>
        <h2 className="case-study-heading" data-index-label={label} id={chapterId(label)}>
          {title}
        </h2>
        {paragraphsOf(copy).map((paragraph) => (
          <p className="case-study-copy" key={paragraph}>
            {paragraph}
          </p>
        ))}
      </ScrollReveal>
      {children}
    </section>
  );
}

/** A titled step inside a chapter, such as the problem or the opportunity. */
export function CaseStudyTopic({
  title,
  copy,
  children,
}: {
  title: string;
  copy?: string | string[];
  children?: ReactNode;
}) {
  return (
    <div className="case-study-topic">
      <ScrollReveal>
        <h3 className="case-study-subhead">{title}</h3>
        {paragraphsOf(copy).map((paragraph) => (
          <p className="case-study-copy" key={paragraph}>
            {paragraph}
          </p>
        ))}
      </ScrollReveal>
      {children}
    </div>
  );
}

export interface CaseStudyPoint {
  title: string;
  body: ReactNode;
}

/** Short titled points side by side: three across, or two for pairs and
    fours, so no point is left on a row of its own. Four across would leave
    each column too narrow to read inside the measure. */
export function CaseStudyPoints({
  items,
  columns = 3,
}: {
  items: CaseStudyPoint[];
  columns?: 2 | 3;
}) {
  const grid = columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";

  return (
    <ScrollReveal className="case-study-block">
      <ul className={`case-study-points grid gap-x-6 gap-y-5 ${grid}`}>
        {items.map(({ title, body }) => (
          <li key={title}>
            <p className="case-study-point-title">{title}</p>
            <p className="case-study-point-body mt-1">{body}</p>
          </li>
        ))}
      </ul>
    </ScrollReveal>
  );
}

/** An image across the reading column. Click to open it full screen. */
export function CaseStudyStoryFigure({
  image,
  caption,
  preload,
}: {
  image: CaseStudyImage;
  caption?: string;
  preload?: boolean;
}) {
  return (
    <ScrollReveal className="case-study-story-figure">
      <figure>
        <div className="case-study-story-frame">
          <ImageLightbox
            alt={image.alt}
            height={image.height}
            preload={preload}
            sizes={FIGURE_SIZES}
            src={image.src}
            width={image.width}
          />
        </div>
        {caption && <figcaption className="case-study-media-caption">{caption}</figcaption>}
      </figure>
    </ScrollReveal>
  );
}

/** A screen beside its note, the image leading. Stacked below 640px. */
export function CaseStudyRow({
  image,
  title,
  children,
}: {
  image: CaseStudyImage;
  title: string;
  children: ReactNode;
}) {
  return (
    <ScrollReveal className="case-study-row">
      <div className="case-study-story-frame">
        <ImageLightbox
          alt={image.alt}
          height={image.height}
          sizes={ROW_SIZES}
          src={image.src}
          width={image.width}
        />
      </div>
      <div>
        <p className="case-study-point-title">{title}</p>
        <div className="case-study-point-body mt-2 grid gap-3">{children}</div>
      </div>
    </ScrollReveal>
  );
}

export function CaseStudyPullQuote({ children }: { children: ReactNode }) {
  return (
    <ScrollReveal className="case-study-block">
      <blockquote className="case-study-pull-quote">{children}</blockquote>
    </ScrollReveal>
  );
}

/** A plain table for evidence that reads across, such as a claim and how sure
    I am of it. Pans inside its own frame on a phone rather than squeezing. */
export function CaseStudyTable({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <ScrollReveal className="case-study-block case-study-table-frame">
      <table className="case-study-table">
        <thead>
          <tr>
            {head.map((cell) => (
              <th key={cell} scope="col">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </ScrollReveal>
  );
}
