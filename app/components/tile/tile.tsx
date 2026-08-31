"use client";

import NextLink from "next/link";
import type { ReactNode } from "react";
import { useStaggerReveal } from "../stagger-reveal";
import { Tag } from "../tags";
import { Tooltip } from "../tooltip";

export type TileInfo = "Professional" | "Concept";

/** What each info tag means, shown as its tooltip. */
const INFO_TAG_DESCRIPTION: Record<TileInfo, string> = {
  Professional: "Shipped company work",
  Concept: "Self-initiated UX explorations",
};

const INFO_TAG_TONE: Record<TileInfo, "info" | "neutral"> = {
  Professional: "info",
  Concept: "neutral",
};

// Same-origin routes navigate client-side, so the page is not torn down mid
// interaction (which would cut off the click sound).
const isInternalRoute = (href: string) => href.startsWith("/") && !href.startsWith("//");

export interface TileProps {
  title: string;
  description: string;
  banner?: ReactNode;
  tag?: ReactNode;
  /** Whether the work was shipped professionally or is a self-directed concept. */
  info?: TileInfo;
  href?: string;
  className?: string;
}

export function Tile({ title, description, banner, tag, info, href, className }: TileProps) {
  const revealRef = useStaggerReveal();

  const content = (
    <>
      <div
        className={[
          "tile-banner stagger-line stagger-line--1",
          // Only a linked tile is clickable, so only it gets the prompt.
          href && "tooltip-wrap tooltip-center",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {banner && (
          <span aria-hidden="true" className="tile-banner-art">
            {banner}
          </span>
        )}
        {info && (
          <span className="tile-info-tag">
            <Tooltip label={INFO_TAG_DESCRIPTION[info]} placement="below-start">
              <Tag showIcon={false} size="medium" tone={INFO_TAG_TONE[info]}>
                {info}
              </Tag>
            </Tooltip>
          </span>
        )}
        {tag && <span className="tile-tag">{tag}</span>}
        {href && (
          <span className="tooltip" role="tooltip">
            Click to read the study
          </span>
        )}
      </div>
      <div className="tile-content">
        <h3 className="tile-title stagger-line stagger-line--2">{title}</h3>
        <p className="tile-description stagger-line stagger-line--3">{description}</p>
      </div>
    </>
  );

  const classes = ["tile", "stagger", href && "tile-link", className].filter(Boolean).join(" ");

  if (href) {
    return isInternalRoute(href) ? (
      <NextLink className={classes} href={href} ref={revealRef}>
        {content}
      </NextLink>
    ) : (
      <a className={classes} href={href} ref={revealRef}>
        {content}
      </a>
    );
  }

  return (
    <article className={classes} ref={revealRef}>
      {content}
    </article>
  );
}
