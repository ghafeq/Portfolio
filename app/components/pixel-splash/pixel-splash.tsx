"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// Modelled on the pixel transition at sanvithi.com (a Framer code component):
// a grid of blocks sweeps in to cover the screen, then sweeps out the same way.
const BLOCK_SIZE = 2;
const SPEED = 1.2;
const PHASE_MS = 800 / SPEED;
const NOISE_SEED = 2;
const MAX_FRAME_MS = 1000 / 30;
const BLEED = 1;
const FALLBACK_COLOR = "#0f62fe";

// Cheap deterministic hash in [0, 1), so each block keeps its place in the
// order between frames.
function hash(x: number, y: number, seed: number) {
  const n = Math.sin(x * 374761393 + y * 668265263 + seed * 1013904223) * 43758.5453;
  return n - Math.floor(n);
}

function easeInOutQuad(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
}

/** Plays a pixel-block wipe over the page on every load and route change. Renders a canvas. */
export function PixelSplash() {
  const pathname = usePathname();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const color =
      getComputedStyle(document.documentElement).getPropertyValue("--gray-100").trim() ||
      FALLBACK_COLOR;

    function resize() {
      const ratio = Math.max(1, Math.round(window.devicePixelRatio || 1));
      canvas!.width = window.innerWidth * ratio;
      canvas!.height = window.innerHeight * ratio;
      context!.setTransform(ratio, 0, 0, ratio, 0, 0);
      context!.imageSmoothingEnabled = false;
    }

    function draw(progress: number, revealing: boolean) {
      const { innerWidth: width, innerHeight: height } = window;
      // Fewer blocks on low-core machines keeps the frame budget.
      const columns =
        navigator.hardwareConcurrency <= 4 ? 40 : Math.max(1, Math.round(100 / BLOCK_SIZE));
      const rows = Math.max(1, Math.round((height / width) * columns));
      const cellWidth = Math.ceil(width / columns);
      const cellHeight = Math.ceil(height / rows);
      const threshold = easeInOutQuad(progress);

      context!.clearRect(0, 0, width, height);
      context!.fillStyle = color;

      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
          const across = column / (columns - 1 || 1);
          const down = row / (rows - 1 || 1);
          // Mostly left to right, leaning top to bottom, roughened by noise.
          // The weights sum to 2.4, so the score lands in [0, 1].
          const score = (hash(column, row, NOISE_SEED) * 0.8 + down * 0.6 + across) / 2.4;
          const visible = revealing ? score >= threshold : score < threshold;

          if (visible) {
            context!.fillRect(
              column * cellWidth - BLEED,
              row * cellHeight - BLEED,
              cellWidth + BLEED * 2,
              cellHeight + BLEED * 2,
            );
          }
        }
      }
    }

    let frame = 0;
    let elapsed = 0;
    let previous: number | null = null;

    function tick(now: number) {
      // Advance by capped frame deltas, not wall-clock time: a route change can
      // block the main thread for a second, and the wipe should pause through
      // that stall rather than jump past the covered state.
      elapsed += Math.min(now - (previous ?? now), MAX_FRAME_MS);
      previous = now;

      if (elapsed >= PHASE_MS * 2) {
        context!.clearRect(0, 0, window.innerWidth, window.innerHeight);
        canvas!.style.display = "none";
        return;
      }

      if (elapsed < PHASE_MS) {
        draw(elapsed / PHASE_MS, false);
      } else {
        draw((elapsed - PHASE_MS) / PHASE_MS, true);
      }

      frame = requestAnimationFrame(tick);
    }

    resize();
    canvas.style.display = "block";
    frame = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      canvas.style.display = "none";
    };
  }, [pathname]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 2147483647,
        pointerEvents: "none",
        display: "none",
      }}
    />
  );
}
