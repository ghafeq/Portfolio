"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";

interface Section {
  id: string;
  title: string;
}

// How far short of landing a heading at its scroll margin the page can be and
// still count that section as the one being read. Kept small: measured against
// a line far down the screen, a short section's heading lands at the top while
// the next heading is already past the line, and the index marks the wrong one.
const READING_BUFFER = 64;

// With no scroll events for this long, a jump from the index has finished.
const SETTLE_MS = 150;

/**
 * A floating index of the page's case study headings: a rail of ticks that
 * opens into their titles on hover or focus. The current section is marked,
 * and choosing one scrolls to it. Reads the headings from the page, so every
 * CaseStudySection is listed without being passed in.
 */
export function CaseStudyIndex() {
  const [sections, setSections] = useState<Section[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  // The section chosen from the index, held as current until the scroll it
  // started settles. Geometry alone cannot always agree: the closing sections
  // may never reach the top because the page ends first.
  const pinnedId = useRef<string | null>(null);
  const settleTimer = useRef<number | undefined>(undefined);

  function settleSoon() {
    window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(() => {
      // Only releases the pin; the marker stays put until the reader next
      // scrolls, rather than jumping the moment the page comes to rest.
      pinnedId.current = null;
    }, SETTLE_MS);
  }

  useEffect(() => {
    const headings = [...document.querySelectorAll<HTMLElement>(".case-study-heading[id]")];
    let frame = 0;

    function update() {
      frame = 0;

      if (headings.length === 0) {
        return;
      }

      const scroll = window.scrollY;
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

      // The scroll position that lands each heading at its scroll margin, the
      // same spot a jump from the index takes it to. Measured on every update,
      // since images loading above can move them.
      const landings = headings.map(
        (heading) =>
          heading.getBoundingClientRect().top +
          scroll -
          (parseFloat(getComputedStyle(heading).scrollMarginTop) || 0),
      );

      // Closing sections can sit below the last scrollable position, so they
      // would never become current by landing. The distance left after the
      // last heading that can land is shared out evenly between them instead,
      // with the final one taking the very bottom of the page.
      const reachable = landings.filter((landing) => landing <= maxScroll).length;
      const unreachable = headings.length - reachable;
      const lastLanding = reachable > 0 ? landings[reachable - 1] : 0;

      const thresholds = landings.map((landing, index) =>
        index < reachable
          ? landing - READING_BUFFER
          : lastLanding + ((maxScroll - lastLanding) * (index - reachable + 1)) / unreachable,
      );

      let current: string | null = null;

      for (const [index, threshold] of thresholds.entries()) {
        // A pixel of slack for fractional scroll positions.
        if (scroll < threshold - 1) {
          break;
        }
        current = headings[index].id;
      }

      setActiveId(current);
    }

    function handleScroll() {
      // A jump from the index is still moving the page; keep its section
      // marked and wait for the movement to stop.
      if (pinnedId.current) {
        settleSoon();
        return;
      }

      if (!frame) {
        frame = requestAnimationFrame(update);
      }
    }

    // Deferred out of the effect itself, but on a timer rather than a frame:
    // frames pause in a background tab, and the list should be ready the
    // moment the tab is shown.
    const initial = window.setTimeout(() => {
      setSections(headings.map(({ id, textContent }) => ({ id, title: textContent ?? "" })));
      update();
    }, 0);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.clearTimeout(initial);
      window.clearTimeout(settleTimer.current);
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  function jumpTo(event: MouseEvent<HTMLAnchorElement>, id: string) {
    const target = document.getElementById(id);

    if (!target) {
      return;
    }

    event.preventDefault();

    // Mark the choice straight away, and hold it through the scroll. Started
    // here as well as on scroll, so a jump that moves nothing (already there,
    // or no page left to scroll) still releases.
    pinnedId.current = id;
    setActiveId(id);
    settleSoon();

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    // Keep the fragment shareable without adding a history entry per click.
    history.replaceState(null, "", `#${id}`);
    // Move keyboard and screen reader focus along with the view.
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  }

  // One section needs no index.
  if (sections.length < 2) {
    return null;
  }

  return (
    <nav aria-label="On this page" className="case-study-index">
      <ol className="case-study-index-list">
        {sections.map(({ id, title }) => (
          <li key={id}>
            <a
              aria-current={id === activeId ? "location" : undefined}
              className="case-study-index-link"
              href={`#${id}`}
              onClick={(event) => jumpTo(event, id)}
            >
              <span aria-hidden="true" className="case-study-index-tick" />
              <span className="case-study-index-label">{title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
