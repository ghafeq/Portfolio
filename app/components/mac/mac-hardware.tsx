"use client";

import { Jersey_15 } from "next/font/google";
import { useEffect, useRef, type ReactNode, type Ref } from "react";
import { preloadClickSound } from "../click-sound";
import { MacArt } from "./mac-art";
import { MacPaint } from "./mac-paint";

const HELLO_SOUND_SRC = "/sound/macintosh.mp3";
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

/**
 * The screen at rest. The whole of it is the button, from the first frame, and
 * it plays the Mac's startup sound as "hello." is written.
 */
export function MacStart({ onClick, ref, skipHello = false }: MacStartProps) {
  const helloSoundRef = useRef<HTMLAudioElement>(null);
  const hasClickedRef = useRef(false);

  useEffect(() => {
    if (skipHello) {
      return;
    }

    // Fetched ahead of time, so it lands on the pen's first stroke.
    const sound = new Audio(HELLO_SOUND_SRC);

    sound.preload = "auto";
    sound.load();
    helloSoundRef.current = sound;
  }, [skipHello]);

  function playHelloSound() {
    if (!hasClickedRef.current) {
      // Browsers block sound until a visitor has interacted with the site, and
      // this rejects. There is nothing to recover: "hello." just stays silent.
      void helloSoundRef.current?.play().catch(() => {});
    }
  }

  function handleClick() {
    hasClickedRef.current = true;
    onClick();
  }

  return (
    <button
      aria-label="Click to open Shafiq Efféndy's portfolio"
      className="mac-start"
      data-hello={!skipHello}
      onClick={handleClick}
      ref={ref}
      type="button"
    >
      <MacPaint onHello={playHelloSound} />
    </button>
  );
}
