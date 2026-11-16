"use client";

import { useSyncExternalStore } from "react";
import { STORAGE_KEY } from "./theme-script";

export type Theme = "light" | "dark";

// Colours ease across for this long when the theme changes, then stop
// transitioning so hovers and the like stay as quick as before.
const FADE_MS = 400;

function read(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);

  observer.observe(document.documentElement, { attributeFilter: ["data-theme"] });

  return () => observer.disconnect();
}

let fade = 0;

export function setTheme(theme: Theme) {
  const root = document.documentElement;

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.clearTimeout(fade);
    root.classList.add("theme-fade");
    fade = window.setTimeout(() => root.classList.remove("theme-fade"), FADE_MS);
  }

  root.dataset.theme = theme;

  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Private windows can refuse storage; the theme still applies to this visit.
  }
}

/** The page's current theme. The server renders light; the client reads the real one. */
export function useTheme() {
  return useSyncExternalStore<Theme>(subscribe, read, () => "light");
}
