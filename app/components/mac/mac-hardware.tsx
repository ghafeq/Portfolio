"use client";

import { Jersey_15 } from "next/font/google";
import { useEffect, useSyncExternalStore, type ReactNode, type Ref } from "react";
import { preloadClickSound } from "../click-sound";
import { MacArt } from "./mac-art";
import { MacPaint } from "./mac-paint";

const CLICK_SOUND_SRC = "/sound/mouseclick.mp3";

// The screen's own typeface. Set here, not in the root layout's font list, so
// the machine carries it wherever it is shown. latin-ext has the ō in Gōshi.
const jersey = Jersey_15({
  variable: "--font-jersey",
  weight: "400",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

interface MacHardwareProps {
  /** What the screen shows. */
  children: ReactNode;
}

/** The Macintosh, keyboard and mouse, with a live screen set into the glass. */
export function MacHardware({ children }: MacHardwareProps) {
  useEffect(() => {
    preloadClickSound(CLICK_SOUND_SRC);
  }, []);

  return (
    <div className={`mac ${jersey.variable}`}>
      <MacArt />
      {/* Everything clickable in here sounds like the Mac's mouse, not the site. */}
      <div className="mac-crt" data-click-sound={CLICK_SOUND_SRC}>
        {children}
      </div>
    </div>
  );
}

interface MacStartProps {
  onClick: () => void;
  ref?: Ref<HTMLButtonElement>;
  /** Go straight to the Click button, for a Mac that has already said hello. */
  skipHello?: boolean;
}

// Nothing to listen to: the answer changes once, when the page's script starts.
const subscribeToNothing = () => () => {};

/** False in the page as served and while it hydrates, true once its script runs. */
function useIsHydrated() {
  return useSyncExternalStore(subscribeToNothing, () => true, () => false);
}

/**
 * The screen at rest. The whole of it is the button, from the first frame. The
 * start-up plays silently.
 */
export function MacStart({ onClick, ref, skipHello = false }: MacStartProps) {
  // The start-up waits, dark, for the page's script, so it begins from its
  // first frame rather than partway through.
  const isHydrated = useIsHydrated();
  let hello = "waiting";

  if (skipHello) {
    hello = "false";
  } else if (isHydrated) {
    hello = "true";
  }

  return (
    <button
      aria-label="Click to open Shafiq Efféndy's portfolio"
      className="mac-start"
      data-hello={hello}
      onClick={onClick}
      ref={ref}
      type="button"
    >
      <MacPaint />
    </button>
  );
}
