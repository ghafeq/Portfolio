"use client";

import { useEffect, useRef } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import { setTheme, useTheme } from "../theme";

// The drawing's own units. The lamp is drawn once at this size and scaled by CSS.
const WIDTH = 200;
const HEIGHT = 320;
// Where the cord leaves the shade, and where its handle rests.
const ANCHOR_X = 136;
const ANCHOR_Y = 170;
const REST_Y = 256;
// How far the handle can be dragged, before the cord stops giving.
const MAX_PULL = 110;
const MAX_SWAY = 60;
// Pulled past this, letting go flips the light.
const THRESHOLD = 38;
// A press that moves less than this is a tap, which tugs the cord by itself.
const TAP = 4;
// Spring back to rest: stiffness and damping, per second.
const STIFFNESS = 260;
const DAMPING = 9;
// The spring's time step, in seconds, and the longest it may take to come to rest.
const STEP = 1 / 240;
const SETTLE_MS = 2500;

interface Motion {
  vx: number;
  vy: number;
  x: number;
  y: number;
}

/** Gives less the further it is pulled, so the cord feels like it stretches. */
function rubber(distance: number, limit: number) {
  const sign = Math.sign(distance);

  return sign * limit * (1 - Math.exp(-Math.abs(distance) / limit));
}

/**
 * A hanging lamp in the home page's corner. Its light is the site's theme: pull
 * the cord to switch it off and the page goes dark.
 */
export function PullCord() {
  const lit = useTheme() === "light";
  const svgRef = useRef<SVGSVGElement>(null);
  const cordRef = useRef<SVGLineElement>(null);
  const handleRef = useRef<SVGGElement>(null);
  const motion = useRef<Motion>({ vx: 0, vy: 0, x: 0, y: 0 });
  const drag = useRef<{ id: number; moved: number; startX: number; startY: number } | null>(null);
  const frame = useRef(0);
  const deadline = useRef(0);

  // Draws the cord and handle where the motion has them.
  function paint() {
    const { x, y } = motion.current;
    const endX = ANCHOR_X + x;
    const endY = REST_Y + y;
    // The handle leans along the cord, so a swing reads as one piece.
    const angle = (-Math.atan2(x, endY - ANCHOR_Y) * 180) / Math.PI;

    cordRef.current?.setAttribute("x2", `${endX}`);
    cordRef.current?.setAttribute("y2", `${endY}`);
    handleRef.current?.setAttribute("transform", `translate(${endX} ${endY}) rotate(${angle})`);
  }

  function rest() {
    cancelAnimationFrame(frame.current);
    window.clearTimeout(deadline.current);
    motion.current = { vx: 0, vy: 0, x: 0, y: 0 };
    paint();
  }

  // Springs the handle back to rest once it is let go.
  function settle() {
    cancelAnimationFrame(frame.current);
    window.clearTimeout(deadline.current);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      rest();

      return;
    }

    // However slowly frames arrive (a busy page, a background tab), the cord is
    // back at rest by then.
    deadline.current = window.setTimeout(rest, SETTLE_MS);

    let previous = performance.now();

    function tick(now: number) {
      const state = motion.current;
      // Follows real time in small fixed steps, so a slow frame moves the spring
      // further rather than slowing it down, and a long one cannot blow it up.
      let remaining = Math.min(now - previous, 250) / 1000;

      previous = now;

      while (remaining > 0) {
        const seconds = Math.min(remaining, STEP);

        state.vx += (-STIFFNESS * state.x - DAMPING * state.vx) * seconds;
        state.vy += (-STIFFNESS * state.y - DAMPING * state.vy) * seconds;
        state.x += state.vx * seconds;
        state.y += state.vy * seconds;
        remaining -= seconds;
      }

      paint();

      const resting =
        Math.abs(state.x) < 0.05 &&
        Math.abs(state.y) < 0.05 &&
        Math.abs(state.vx) < 0.5 &&
        Math.abs(state.vy) < 0.5;

      if (resting) {
        rest();
      } else {
        frame.current = requestAnimationFrame(tick);
      }
    }

    frame.current = requestAnimationFrame(tick);
  }

  function toggle() {
    setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
  }

  // A tug without a drag: from a tap or the keyboard.
  function tug() {
    toggle();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    motion.current.vy += 420;
    motion.current.vx += (Math.random() - 0.5) * 120;
    settle();
  }

  useEffect(
    () => () => {
      cancelAnimationFrame(frame.current);
      window.clearTimeout(deadline.current);
    },
    [],
  );

  /** Pointer travel in the drawing's units. */
  function toUnits(pixels: number) {
    const width = svgRef.current?.getBoundingClientRect().width || WIDTH;

    return (pixels * WIDTH) / width;
  }

  function onPointerDown(event: PointerEvent<SVGGElement>) {
    cancelAnimationFrame(frame.current);
    window.clearTimeout(deadline.current);
    event.currentTarget.setPointerCapture(event.pointerId);
    motion.current = { vx: 0, vy: 0, x: 0, y: 0 };
    drag.current = { id: event.pointerId, moved: 0, startX: event.clientX, startY: event.clientY };
  }

  function onPointerMove(event: PointerEvent<SVGGElement>) {
    const current = drag.current;

    if (!current || current.id !== event.pointerId) {
      return;
    }

    // The button came up somewhere the release never reached, such as outside
    // the window: treat it as let go.
    if (event.pointerType === "mouse" && event.buttons === 0) {
      release(event.pointerId);

      return;
    }

    const dx = toUnits(event.clientX - current.startX);
    const dy = toUnits(event.clientY - current.startY);

    current.moved = Math.max(current.moved, Math.hypot(dx, dy));
    // It only pulls down; pushed up, it barely moves.
    motion.current.x = rubber(dx, MAX_SWAY);
    motion.current.y = dy > 0 ? rubber(dy, MAX_PULL) : rubber(dy, 8);
    paint();
  }

  function onPointerUp(event: PointerEvent<SVGGElement>) {
    release(event.pointerId);
  }

  function release(pointerId: number) {
    const current = drag.current;

    if (!current || current.id !== pointerId) {
      return;
    }

    drag.current = null;

    if (current.moved < TAP) {
      tug();

      return;
    }

    if (motion.current.y > THRESHOLD) {
      toggle();
    }

    settle();
  }

  function onKeyDown(event: KeyboardEvent<SVGGElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      tug();
    }
  }

  return (
    <div className="pull-cord">
      <svg
        className="pull-cord-lamp"
        ref={svgRef}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Fades out inside its own ellipse, so no edge ever shows. */}
          <radialGradient cx="50%" cy="50%" id="pull-cord-glow" r="50%">
            <stop offset="0%" stopColor="var(--yellow-20)" stopOpacity="0.6" />
            <stop offset="40%" stopColor="var(--yellow-20)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--yellow-20)" stopOpacity="0" />
          </radialGradient>
          {/* The shade blocks the light above it. */}
          <clipPath id="pull-cord-below">
            <rect height={HEIGHT} width={WIDTH * 3} x={-WIDTH} y={176} />
          </clipPath>
        </defs>

        <ellipse
          className="pull-cord-glow"
          clipPath="url(#pull-cord-below)"
          cx={100}
          cy={180}
          fill="url(#pull-cord-glow)"
          rx={140}
          ry={160}
        />

        {/* The wire runs up past the top of the page. */}
        <line className="pull-cord-wire" x1={100} x2={100} y1={-40} y2={112} />
        <rect className="pull-cord-cap" height={20} rx={4} width={22} x={89} y={104} />

        <circle className="pull-cord-bulb" cx={100} cy={180} r={20} />
        {/* Drawn before the shade, so the cord comes out from behind it. */}
        <line
          className="pull-cord-string"
          ref={cordRef}
          x1={ANCHOR_X}
          x2={ANCHOR_X}
          y1={ANCHOR_Y}
          y2={REST_Y}
        />

        <path
          className="pull-cord-shade"
          d="M 36 172 A 64 56 0 0 1 164 172 L 164 172 Q 164 182 154 182 L 46 182 Q 36 182 36 172 Z"
        />
        <g
          aria-label={lit ? "Switch to dark mode" : "Switch to light mode"}
          className="pull-cord-handle"
          onKeyDown={onKeyDown}
          onLostPointerCapture={onPointerUp}
          onPointerCancel={onPointerUp}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          ref={handleRef}
          role="button"
          tabIndex={0}
          transform={`translate(${ANCHOR_X} ${REST_Y})`}
        >
          {/* A bigger, invisible target than the handle itself. */}
          <rect fill="transparent" height={60} width={44} x={-22} y={-14} />
          <rect className="pull-cord-knob" height={32} rx={8} width={16} x={-8} y={0} />
        </g>
      </svg>
    </div>
  );
}
