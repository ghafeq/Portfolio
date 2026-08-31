"use client";

import { useCallback, useRef, type ReactNode } from "react";

/**
 * Returns a callback ref that plays the staggered entrance when the element
 * scrolls into view, then stops observing. Attach it to an element you are
 * already rendering rather than adding a wrapper.
 */
export function useStaggerReveal() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  return useCallback((node: HTMLElement | null) => {
    // React calls the ref with null on unmount.
    if (!node) {
      observerRef.current?.disconnect();
      observerRef.current = null;
      return;
    }

    // Nothing to ease into if motion is reduced; land on the resting state.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.classList.add("is-shown");
      return;
    }

    // Commit the starting state before observing, so entering view transitions.
    void node.offsetWidth;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Reveal when in view, and also when the element is already above the
          // viewport: a jump (anchor link, scroll restoration, scrollTo) can
          // carry the page past an element without it ever intersecting, which
          // would otherwise leave it invisible for good.
          const alreadyPassed = entry.boundingClientRect.bottom < 0;

          if (!entry.isIntersecting && !alreadyPassed) {
            return;
          }

          entry.target.classList.add("is-shown");
          observer.unobserve(entry.target);
        });
      },
      {
        // The root is extended far upward so anything at or above the viewport
        // counts as intersecting. Without it a jump (anchor link, scroll
        // restoration, scrollTo) can carry the page from below an element to
        // above it, crossing no threshold, firing no callback, and leaving the
        // element invisible for good. Nothing is added below the viewport, so
        // content still waits until it is actually reached.
        rootMargin: "100000px 0px 0px 0px",
        threshold: 0,
      },
    );

    observer.observe(node);
    observerRef.current = observer;
  }, []);
}

export interface StaggerRevealProps {
  children: ReactNode;
  /** Fades every line out in place, decoupled from the entrance stagger. */
  hiding?: boolean;
  className?: string;
}

export function StaggerReveal({ children, hiding = false, className }: StaggerRevealProps) {
  const revealRef = useStaggerReveal();
  const classes = ["stagger", hiding && "is-hiding", className].filter(Boolean).join(" ");

  return (
    <div className={classes} ref={revealRef}>
      {children}
    </div>
  );
}

export interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
}

/** Reveals its whole subtree as one block when it scrolls into view. */
export function ScrollReveal({ children, className }: ScrollRevealProps) {
  const revealRef = useStaggerReveal();
  const classes = ["stagger", "stagger-block", className].filter(Boolean).join(" ");

  return (
    <div className={classes} ref={revealRef}>
      {children}
    </div>
  );
}
