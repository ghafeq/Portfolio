"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

const NEXT_KEYS = new Set(["ArrowRight", "ArrowDown", "PageDown", " "]);
const PREVIOUS_KEYS = new Set(["ArrowLeft", "ArrowUp", "PageUp"]);

// "#last" opens a deck on its final slide, for stepping back into it from the
// deck after.
const LAST_SLIDE_HASH = "#last";

export interface DeckProps {
  /** Where Escape takes the presenter: the page this deck was opened from. */
  backHref: string;
  /** Where stepping back from the first slide goes. */
  previousHref?: string;
  /** Where stepping on from the last slide goes. */
  nextHref?: string;
  children: ReactNode;
}

/** Which slide a deck opens on: "#3" is the third, "#last" the last. */
function slideFromHash(count: number) {
  const { hash } = window.location;

  if (hash === LAST_SLIDE_HASH) {
    return count - 1;
  }

  const number = Number.parseInt(hash.slice(1), 10);
  return Number.isNaN(number) ? 0 : Math.max(0, Math.min(count - 1, number - 1));
}

/**
 * Shows one slide at a time, full screen. The arrow keys, Page Up and Down,
 * Space or a clicker step through them, and stepping past either end carries
 * on to the page before or after, so the whole presentation runs as one deck.
 * Home and End jump to either end; Escape steps back out. The current slide is
 * kept in the address, so a reload stays on it.
 */
export function Deck({ backHref, previousHref, nextHref, children }: DeckProps) {
  const router = useRouter();
  const deckRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const deck = deckRef.current;

    if (!deck) {
      return;
    }

    const slides = Array.from(deck.querySelectorAll<HTMLElement>("[data-slide]"));
    let current = 0;

    // Shown by toggling classes rather than re-rendering, so the slides stay
    // server-rendered. The hidden ones leave the tab order and the a11y tree.
    function show(index: number, direction: "forward" | "back") {
      current = index;
      deck!.dataset.direction = direction;
      slides.forEach((slide, position) => {
        const isCurrent = position === index;
        slide.classList.toggle("is-current", isCurrent);
        slide.inert = !isCurrent;
      });
      // Keeps Next's own history state, so back and forward still work.
      const hash = index === 0 ? "" : `#${index + 1}`;
      window.history.replaceState(window.history.state, "", `${window.location.pathname}${hash}`);
    }

    show(slideFromHash(slides.length), "forward");
    deck.classList.add("is-ready");

    for (const href of [backHref, previousHref, nextHref]) {
      if (href) {
        router.prefetch(href.split("#")[0]);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) {
        return;
      }

      const goBack = PREVIOUS_KEYS.has(event.key) || (event.key === " " && event.shiftKey);
      const goOn = !goBack && NEXT_KEYS.has(event.key);

      if (event.key === "Escape") {
        router.push(backHref);
      } else if (goBack) {
        if (current > 0) {
          show(current - 1, "back");
        } else if (previousHref) {
          router.push(previousHref);
        }
      } else if (goOn) {
        if (current < slides.length - 1) {
          show(current + 1, "forward");
        } else if (nextHref) {
          router.push(nextHref);
        }
      } else if (event.key === "Home") {
        show(0, "back");
      } else if (event.key === "End") {
        show(slides.length - 1, "forward");
      } else {
        return;
      }

      // Space and the arrows would otherwise scroll the window as well.
      event.preventDefault();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [backHref, previousHref, nextHref, router]);

  return (
    // .stagger lends the slide change the site's reveal: its ease and blur.
    <main className="deck stagger" ref={deckRef}>
      {children}
    </main>
  );
}
