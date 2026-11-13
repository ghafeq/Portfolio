import Image from "next/image";
import NextLink from "next/link";
import { nextProject } from "../../projects";

export interface CaseStudyNextProps {
  /** The current case study's path, e.g. "/cekap". */
  current: string;
}

/**
 * Closes a case study with the next project in the landing page's order, set
 * as the same tile as a feature: cover image, then title and description. The
 * whole tile is the link.
 */
export function CaseStudyNext({ current }: CaseStudyNextProps) {
  const project = nextProject(current);

  return (
    <section aria-label="Next project" className="wrapper case-study-next px-6 pb-16 sm:px-10">
      <p className="case-study-eyebrow mb-4">Next project</p>
      <NextLink className="case-study-feature case-study-next-link tile-link" href={project.href}>
        {/* The landing page tile's hover: the card lifts and a centred
            prompt fades in over the cover. */}
        <div
          className="case-study-next-image tooltip-wrap tooltip-center"
          style={{ aspectRatio: project.aspect }}
        >
          <Image alt="" fill sizes="(max-width: 880px) 100vw, 880px" src={project.cover} />
          <span className="tooltip" role="tooltip">
            Click to read the study
          </span>
        </div>
        <div className="case-study-feature-body">
          <h3 className="case-study-card-title">{project.title}</h3>
          <p className="case-study-copy">{project.description}</p>
        </div>
      </NextLink>
    </section>
  );
}
