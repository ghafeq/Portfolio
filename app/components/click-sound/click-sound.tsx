"use client";

import { useEffect } from "react";

const CLICK_SOUND_SRC = "/sound/click.mp3";

// Anything that behaves like a control. Clicking dead space stays silent.
const INTERACTIVE_SELECTOR = [
  "a[href]",
  "button",
  "summary",
  "label",
  "select",
  '[role="button"]',
  '[role="tab"]',
  '[role="link"]',
  'input[type="button"]',
  'input[type="submit"]',
  'input[type="checkbox"]',
  'input[type="radio"]',
].join(",");

// One shared element: the file is fetched once and only one click sound ever
// needs to play at a time.
let clickSound: HTMLAudioElement | null = null;

function ensureClickSound() {
  if (typeof Audio === "undefined") {
    return null;
  }

  if (!clickSound) {
    clickSound = new Audio(CLICK_SOUND_SRC);
    // Decode ahead of the first click. Without this the first play has to wait
    // on the network, which a navigation will outrun.
    clickSound.preload = "auto";
    clickSound.load();
  }

  return clickSound;
}

function playClickSound() {
  const audio = ensureClickSound();

  if (!audio) {
    return;
  }

  audio.currentTime = 0;
  // Rejects when a browser blocks playback; nothing to recover from.
  void audio.play().catch(() => {});
}

/** Plays a click sound for any control on the page. Renders nothing. */
export function ClickSound() {
  useEffect(() => {
    // Warm the file up on mount so the first click is instant.
    ensureClickSound();

    function handleClick(event: MouseEvent) {
      // Only the primary button, and not when a modifier is held (those open
      // tabs or menus rather than acting on the control).
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const control = target.closest(INTERACTIVE_SELECTOR);

      // A natively disabled button gets no click from a real mouse, but an
      // aria-disabled control does — neither should make a sound.
      if (!control || control.matches(':disabled, [aria-disabled="true"]')) {
        return;
      }

      playClickSound();
    }

    // Capture phase, so a handler calling stopPropagation cannot silence it.
    document.addEventListener("click", handleClick, true);

    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return null;
}
