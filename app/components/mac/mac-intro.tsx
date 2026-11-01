"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type TransitionEvent } from "react";
import { MacHardware, MacStart } from "./mac-hardware";

/**
 * Stands in front of the home page when a visit starts there. "Click" pushes in
 * through the Mac's screen, which shows a copy of the page behind it, sized so the
 * zoom lands exactly on the real thing and the Mac can simply be taken away. It
 * sits in the root layout, which outlives navigation, so coming back to the home
 * page later never shows it again; a reload does.
 */
export function MacIntro() {
  const pathname = usePathname();
  const [isShown, setIsShown] = useState(pathname === "/");
  const [isEntering, setIsEntering] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const siteRef = useRef<HTMLDivElement>(null);

  // The page is already there behind the Mac, so it has to be put out of reach
  // of the wheel and the Tab key until the Mac is out of the way.
  useEffect(() => {
    if (!isShown) {
      return;
    }

    const root = document.documentElement;
    const behind = Array.from(document.body.children).filter(
      (element): element is HTMLElement =>
        element instanceof HTMLElement && !element.contains(stageRef.current),
    );

    root.style.overflow = "hidden";
    behind.forEach((element) => {
      element.inert = true;
    });

    return () => {
      root.style.overflow = "";
      behind.forEach((element) => {
        element.inert = false;
      });
    };
  }, [isShown]);

  function enter() {
    const stage = stageRef.current;
    const screen = stage?.querySelector<HTMLElement>(".mac-crt");
    const site = siteRef.current;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isEntering) {
      return;
    }

    if (!stage || !screen || !site || isReduced) {
      setIsShown(false);
      return;
    }

    // Far enough in that the screen covers the viewport both ways.
    const { innerHeight, innerWidth } = window;
    const scale = Math.max(innerWidth / screen.offsetWidth, innerHeight / screen.offsetHeight);
    const page = document.body.querySelectorAll(":scope > .top-navigation, :scope > main");

    stage.style.setProperty("--mac-through-scale", String(scale));
    window.scrollTo({ behavior: "instant", top: 0 });
    site.replaceChildren();
    page.forEach((element) => {
      const copy = element.cloneNode(true) as HTMLElement;
      const canvases = element.querySelectorAll("canvas");

      // A clone keeps a canvas's size but not what is drawn on it.
      copy.querySelectorAll("canvas").forEach((canvas, index) => {
        canvas.getContext("2d")?.drawImage(canvases[index], 0, 0);
      });
      site.append(copy);
    });
    setIsEntering(true);
  }

  function handleTransitionEnd(event: TransitionEvent<HTMLDivElement>) {
    const isZoomDone =
      event.propertyName === "transform" && (event.target as Element).classList.contains("mac");

    if (isEntering && isZoomDone) {
      setIsShown(false);
    }
  }

  if (!isShown) {
    return null;
  }

  return (
    <div
      aria-label="Enter Shafiq Efféndy's portfolio"
      aria-modal="true"
      className="mac-stage mac-intro"
      data-entering={isEntering}
      data-lenis-prevent
      onTransitionEnd={handleTransitionEnd}
      ref={stageRef}
      role="dialog"
    >
      {/* Without scripts "Click" can do nothing, so the page simply shows. */}
      <noscript>
        <style>{".mac-intro { display: none; }"}</style>
      </noscript>
      <MacHardware>
        <MacStart onClick={enter} />
        <div aria-hidden="true" className="mac-site" inert ref={siteRef} />
      </MacHardware>
    </div>
  );
}
