"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// Same feel as sanvithi.com, whose Framer "Smooth Scroll" component runs Lenis
// with duration = intensity / 10 at intensity 12.
const DURATION_S = 1.2;

/** Eases wheel scrolling on every page. Touch stays native. Renders nothing. */
export function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: DURATION_S,
      autoRaf: true,
      // Sideways-scrolling blocks (code specs, wide tables) keep their own wheel.
      allowNestedScroll: true,
      // A link to another page drops any leftover glide instead of carrying it
      // onto the new page.
      stopInertiaOnNavigate: true,
      // The lightbox is a modal <dialog>; leave wheel input over it native.
      prevent: (node) => node.nodeName === "DIALOG",
    });
    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    // Next has already moved the window for the new route (top, or the saved
    // position on back/forward). Adopt that position so an in-flight glide
    // can't drag the page back towards the old one.
    lenisRef.current?.scrollTo(window.scrollY, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
