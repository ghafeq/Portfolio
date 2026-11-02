"use client";

import { Jersey_15 } from "next/font/google";
import { useEffect, useRef, useSyncExternalStore, type ReactNode, type Ref } from "react";
import { preloadClickSound } from "../click-sound";
import { MacArt } from "./mac-art";
import { MacPaint } from "./mac-paint";

const HELLO_SOUND_SRC = "/sound/macintosh.mp3";
const CLICK_SOUND_SRC = "/sound/mouseclick.mp3";
const STATIC_SOUND_SRC = "/sound/staticnoise.mp3";

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

// Fades the static out over this long rather than cutting it mid-crackle.
const STATIC_FADE_MS = 150;

// Nothing to listen to: the answer changes once, when the page's script starts.
const subscribeToNothing = () => () => {};

/** False in the page as served and while it hydrates, true once its script runs. */
function useIsHydrated() {
  return useSyncExternalStore(subscribeToNothing, () => true, () => false);
}

// Browsers block sound until the visitor has clicked or pressed a key on the
// page, and play() rejects. There is nothing to recover: that moment just stays
// silent.
function play(sound: HTMLAudioElement | null) {
  void sound?.play().catch(() => {});
}

/**
 * The screen at rest. The whole of it is the button, from the first frame. Static
 * plays while the screen starts up, cut when the start-up ends, and the Mac's
 * chime as "hello." is written. Browsers only allow either once the visitor has
 * clicked or pressed a key on the page, and a reload starts that over, so a
 * start-up that runs by itself is silent in most browsers.
 */
export function MacStart({ onClick, ref, skipHello = false }: MacStartProps) {
  const helloSoundRef = useRef<HTMLAudioElement>(null);
  const staticSoundRef = useRef<HTMLAudioElement>(null);
  const hasClickedRef = useRef(false);
  // The sounds are cued by the start-up's animations, so it waits, dark, for the
  // page's script. Started from the page as served, it could pass a cue before
  // anything was listening, and the static would never play.
  const isHydrated = useIsHydrated();
  let hello = "waiting";

  if (skipHello) {
    hello = "false";
  } else if (isHydrated) {
    hello = "true";
  }

  function stopStatic() {
    const sound = staticSoundRef.current;

    if (!sound || sound.paused) {
      return;
    }

    const volume = sound.volume;
    // Timed from its own first frame: a frame's time can be a little earlier
    // than performance.now(), which would push the volume above 1 and throw.
    let start: number | null = null;

    function fade(now: number) {
      start ??= now;

      const progress = Math.min(1, Math.max(0, (now - start) / STATIC_FADE_MS));

      sound!.volume = volume * (1 - progress);

      if (progress < 1) {
        requestAnimationFrame(fade);
      } else {
        sound!.pause();
        sound!.volume = volume;
      }
    }

    requestAnimationFrame(fade);
  }

  function handleClick() {
    hasClickedRef.current = true;
    stopStatic();
    onClick();
  }

  return (
    <>
      <button
        aria-label="Click to open Shafiq Efféndy's portfolio"
        className="mac-start"
        data-hello={hello}
        onClick={handleClick}
        ref={ref}
        type="button"
      >
        <MacPaint
          onHello={() => !hasClickedRef.current && play(helloSoundRef.current)}
          onPowerOn={() => !hasClickedRef.current && play(staticSoundRef.current)}
          onStarted={stopStatic}
        />
      </button>
      {/* In the page as served, so they start loading with it and are ready on
          cue. Taking them out of the page, as leaving does, stops them. */}
      {!skipHello && (
        <>
          <audio preload="auto" ref={staticSoundRef} src={STATIC_SOUND_SRC} />
          <audio preload="auto" ref={helloSoundRef} src={HELLO_SOUND_SRC} />
        </>
      )}
    </>
  );
}
