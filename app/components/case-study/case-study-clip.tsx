"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ScrollReveal } from "../stagger-reveal";

/** A screen recording under /public/projects, with a still for before it plays. */
export interface CaseStudyClipVideo {
  src: string;
  poster: string;
  /** What the recording shows, read out in place of the moving picture. */
  label: string;
  width: number;
  height: number;
}

export interface CaseStudyClipProps {
  title: string;
  video: CaseStudyClipVideo;
  children: ReactNode;
}

/**
 * A phone recording beside its note, as one bordered unit like
 * CaseStudyFeature. Plays muted and looped only while on screen, so three of
 * them never decode at once. With reduced motion it waits on the still and
 * hands the reader the controls instead.
 */
export function CaseStudyClip({ title, video, children }: CaseStudyClipProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const node = videoRef.current;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!node) {
      return;
    }

    if (query.matches) {
      // Deferred like the index's first read, so the render is not synchronous
      // with the effect.
      const initial = window.setTimeout(() => setReduceMotion(true), 0);
      return () => window.clearTimeout(initial);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Autoplay can still be refused (low power mode); the still stays.
          node.play().catch(() => {});
        } else {
          node.pause();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <ScrollReveal className="case-study-feature case-study-clip">
      <div className="case-study-clip-screen">
        <video
          aria-label={video.label}
          controls={reduceMotion}
          height={video.height}
          loop
          muted
          playsInline
          poster={video.poster}
          preload="metadata"
          ref={videoRef}
          width={video.width}
        >
          <source src={video.src} type="video/mp4" />
        </video>
      </div>
      <div className="case-study-feature-body">
        <h3 className="case-study-subhead">{title}</h3>
        <p className="case-study-copy">{children}</p>
      </div>
    </ScrollReveal>
  );
}
