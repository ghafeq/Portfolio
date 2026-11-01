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

// A region can swap the sound for the controls inside it by naming a file in
// this attribute, in place of the default rather than on top of it.
const SOUND_OVERRIDE_SELECTOR = "[data-click-sound]";

// One shared element per file: each is fetched once and only one click sound
// ever needs to play at a time.
const clickSounds = new Map<string, HTMLAudioElement>();

function ensureClickSound(src: string) {
  if (typeof Audio === "undefined") {
    return null;
  }

  let clickSound = clickSounds.get(src);

  if (!clickSound) {
    clickSound = new Audio(src);
    // Decode ahead of the first click. Without this the first play has to wait
    // on the network, which a navigation will outrun.
    clickSound.preload = "auto";
    clickSound.load();
    clickSounds.set(src, clickSound);
  }

  return clickSound;
}

/** Warms up a `data-click-sound` file so its first click is instant. */
export function preloadClickSound(src: string) {
  ensureClickSound(src);
}

function playClickSound(src: string) {
  const audio = ensureClickSound(src);

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
    ensureClickSound(CLICK_SOUND_SRC);

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

      const override = control.closest(SOUND_OVERRIDE_SELECTOR)?.getAttribute("data-click-sound");

      playClickSound(override || CLICK_SOUND_SRC);
    }

    // Capture phase, so a handler calling stopPropagation cannot silence it.
    document.addEventListener("click", handleClick, true);

    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return null;
}
