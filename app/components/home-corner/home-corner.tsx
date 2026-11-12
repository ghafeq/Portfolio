"use client";

import { useEffect, useRef } from "react";

// Drawn at a fixed size and never scaled, so every square lands on whole pixels.
const SIZE = 804;
const PITCH = 12;
const CELL = 8;
const COUNT = SIZE / PITCH;
// Blocks of this many cells share a density, which clumps the squares.
const CLUMP = 3;
// Fixed, so every visit starts from the same pattern.
const SEED = 2117;
// How far the gradient reaches from the corner.
const REACH = SIZE * 0.8;
// Squares this far outside the box still feed the blur along its edges.
const BLUR_MARGIN = 40;
// The blurred copy is small and soft already, so it costs little to keep up.
const SOFT_SCALE = 6;
const SOFT_EVERY = 5;
// It moves too slowly to need more, and this leaves the main thread alone.
const FRAME_MS = 1000 / 15;
// Squares are lit in steps of opacity, one path per step.
const STEPS = 5;
// How sharply a square goes from out to fully lit.
const FADE = 6;

/** A small seeded random generator (mulberry32). */
function createRandom(seed: number) {
  let state = seed;

  return () => {
    state = (state + 0x6d2b79f5) | 0;

    let mixed = Math.imul(state ^ (state >>> 15), 1 | state);

    mixed = (mixed + Math.imul(mixed ^ (mixed >>> 7), 61 | mixed)) ^ mixed;

    return ((mixed ^ (mixed >>> 14)) >>> 0) / 4294967296;
  };
}

interface Square {
  /** How lit it tends to be, from its place and its clump. */
  density: number;
  /** Its own offset, so neighbours do not light as one. */
  jitter: number;
  x: number;
  y: number;
}

/** Every square within reach of the corner. */
function createSquares() {
  const random = createRandom(SEED);
  const clumpsAcross = Math.ceil(COUNT / CLUMP);
  const clumps = Array.from({ length: clumpsAcross ** 2 }, () => random());
  const squares: Square[] = [];

  for (let row = 0; row < COUNT; row++) {
    for (let column = 0; column < COUNT; column++) {
      const fromCorner = Math.hypot(COUNT - 1 - column, row) / COUNT;
      const clump = clumps[Math.floor(row / CLUMP) * clumpsAcross + Math.floor(column / CLUMP)];
      const jitter = random();

      if (fromCorner < 1) {
        squares.push({
          density: (1 - fromCorner) ** 1.3 * (0.35 + clump * 1.1),
          jitter,
          x: column * PITCH,
          y: row * PITCH,
        });
      }
    }
  }

  return squares;
}

/** Slow bands of light sliding diagonally across the corner, from 0 to 1. */
function lightAt(x: number, y: number, seconds: number) {
  const across = (x + y) * 0.0075 + seconds * 0.22;
  const along = (x - y) * 0.004 - seconds * 0.09;

  return 0.5 + 0.5 * Math.sin(across + 1.6 * Math.sin(along));
}

/** The moving pixel field in the home page's corner, in the design system's black. */
export function HomeCorner() {
  const sharpRef = useRef<HTMLCanvasElement>(null);
  const softRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const sharp = sharpRef.current;
    const soft = softRef.current;
    const context = sharp?.getContext("2d");
    const softContext = soft?.getContext("2d");

    if (!sharp || !soft || !context || !softContext) {
      return;
    }

    const color = (name: string) =>
      getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    // The design system's accent is black (--gray-100, as in the pixel wipe), so
    // the field runs from it out to the lightest greys.
    const colors = {
      ink: color("--gray-100"),
      navy: color("--gray-90"),
      deep: color("--gray-80"),
      primary: color("--gray-60"),
      light: color("--gray-40"),
      tint: color("--gray-20"),
    };
    const squares = createSquares();

    // One canvas pixel to a CSS pixel on every screen: the squares sit on whole
    // pixels, and CSS keeps them hard-edged on a dense display.
    sharp.width = SIZE;
    sharp.height = SIZE;
    soft.width = Math.round(SIZE / SOFT_SCALE);
    soft.height = Math.round(SIZE / SOFT_SCALE);

    const squareFill = context.createRadialGradient(SIZE, 0, 0, SIZE, 0, REACH);

    squareFill.addColorStop(0.12, colors.tint);
    squareFill.addColorStop(0.48, colors.light);
    squareFill.addColorStop(0.8, colors.primary);

    // The glow never changes, so it is painted once and copied.
    const glow = document.createElement("canvas");
    const glowContext = glow.getContext("2d")!;
    const glowFill = glowContext.createRadialGradient(SIZE, 0, 0, SIZE, 0, REACH);

    glow.width = SIZE;
    glow.height = SIZE;
    glowFill.addColorStop(0, colors.ink);
    glowFill.addColorStop(0.18, colors.navy);
    glowFill.addColorStop(0.38, colors.deep);
    // Hex alpha: 72%, 30% and none.
    glowFill.addColorStop(0.62, `${colors.primary}b8`);
    glowFill.addColorStop(0.82, `${colors.tint}4d`);
    glowFill.addColorStop(1, `${colors.tint}00`);
    glowContext.fillStyle = glowFill;
    glowContext.fillRect(0, 0, SIZE, SIZE);

    // Most of the canvas hangs outside its box, so those squares are never drawn.
    let shown = squares;
    const box = sharp.parentElement!;

    function measure() {
      const left = SIZE - box.clientWidth - BLUR_MARGIN;
      const bottom = box.clientHeight + BLUR_MARGIN;

      shown = squares.filter(({ x, y }) => x + CELL > left && y < bottom);
    }

    function draw(seconds: number) {
      context!.clearRect(0, 0, SIZE, SIZE);
      context!.drawImage(glow, 0, 0);

      const paths = Array.from({ length: STEPS + 1 }, () => new Path2D());

      for (const { density, jitter, x, y } of shown) {
        // Lit once the light passes its own threshold, and brighter the further it
        // passes, so each square fades up and down instead of blinking.
        const level = density * (0.2 + 0.95 * lightAt(x, y, seconds)) - jitter;
        const step = Math.ceil(level * FADE * STEPS);

        paths[Math.min(STEPS, Math.max(0, step))].rect(x, y, CELL, CELL);
      }

      context!.fillStyle = squareFill;
      paths.forEach((path, step) => {
        // The lowest step is every square that is out, barely lit as in an unlit
        // display.
        context!.globalAlpha = step === 0 ? 0.08 : 0.2 + (0.8 * step) / STEPS;
        context!.fill(path);
      });
      context!.globalAlpha = 1;
    }

    function drawSoft() {
      softContext!.clearRect(0, 0, soft!.width, soft!.height);
      softContext!.drawImage(sharp!, 0, 0, soft!.width, soft!.height);
    }

    measure();
    draw(0);
    drawSoft();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let animation = 0;
    let previous = 0;
    let frames = 0;
    // Continues where it stopped after a pause, rather than jumping ahead.
    let seconds = 0;

    function tick(now: number) {
      animation = requestAnimationFrame(tick);

      const elapsed = now - previous;

      if (elapsed < FRAME_MS) {
        return;
      }

      seconds += Math.min(elapsed, FRAME_MS * 2) / 1000;
      previous = now;
      draw(seconds);
      frames += 1;

      if (frames % SOFT_EVERY === 0) {
        drawSoft();
      }
    }

    // Runs only while it can be seen, which also rules out where CSS hides it.
    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(animation);

      if (entry.isIntersecting) {
        previous = performance.now();
        animation = requestAnimationFrame(tick);
      }
    });

    const resizeObserver = new ResizeObserver(measure);

    observer.observe(sharp);
    resizeObserver.observe(box);

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      cancelAnimationFrame(animation);
    };
  }, []);

  return (
    <div aria-hidden="true" className="home-corner">
      <canvas className="home-corner-soft" ref={softRef} />
      <canvas className="home-corner-sharp" ref={sharpRef} />
    </div>
  );
}
