"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// Ported from the Cursor Pet browser extension (github.com/DixitRam/Cursor-Pet):
// the sprite table and timings are the original's, the extension plumbing is not.
const SPEED = 1.75;
const REACH_THRESHOLD = 10;
const TICK_MS = 1000 / 12;
const IDLE_STILL_MS = 2000;
const IDLE_TRANSITION_MS = 200;

// Only the home and about pages get the pet; case studies stay distraction-free.
const PET_PATHS = new Set(["/", "/about"]);

type Direction =
  | "Right"
  | "BottomRight"
  | "Down"
  | "BottomLeft"
  | "Left"
  | "TopLeft"
  | "Up"
  | "TopRight";

interface SpriteEntry {
  size: [number, number];
  frames: [[number, number], [number, number]];
}

const SPRITE_DATA: Record<Direction, SpriteEntry> = {
  Left: { size: [32, 28], frames: [[129, 64], [128, 99]] },
  Right: { size: [32, 28], frames: [[95, 0], [96, 33]] },
  Up: { size: [32, 32], frames: [[32, 64], [32, 96]] },
  Down: { size: [32, 32], frames: [[193, 96], [224, 63]] },
  TopLeft: { size: [32, 32], frames: [[34, 0], [33, 30]] },
  TopRight: { size: [32, 32], frames: [[0, 64], [0, 96]] },
  BottomLeft: { size: [32, 32], frames: [[160, 96], [128, 96]] },
  BottomRight: { size: [32, 32], frames: [[160, 33], [162, 62]] },
};

function directionFor(degrees: number): Direction {
  if (degrees > -22.5 && degrees <= 22.5) return "Right";
  if (degrees > 22.5 && degrees <= 67.5) return "BottomRight";
  if (degrees > 67.5 && degrees <= 112.5) return "Down";
  if (degrees > 112.5 && degrees <= 157.5) return "BottomLeft";
  if (degrees > 157.5 || degrees <= -157.5) return "Left";
  if (degrees > -157.5 && degrees <= -112.5) return "TopLeft";
  if (degrees > -112.5 && degrees <= -67.5) return "Up";
  return "TopRight";
}

export function CursorPet() {
  const pathname = usePathname();

  return PET_PATHS.has(pathname) ? <Pet /> : null;
}

function Pet() {
  const petRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pet = petRef.current;

    // Pointless without a real cursor, and unwelcome if motion is reduced.
    if (
      !pet ||
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let petX = mouseX;
    let petY = mouseY;
    let direction: Direction = "Right";
    let frameIndex = 0;
    let lastFrameTime = 0;
    let isIdle = false;
    let reachTime = 0;
    let renderWidth = 32;
    let renderHeight = 32;
    let frame = 0;

    function handleMouseMove(event: MouseEvent) {
      mouseX = event.clientX;
      mouseY = event.clientY;
      pet?.setAttribute("data-active", "true");
    }

    function update(timestamp: number) {
      const dx = mouseX - petX;
      const dy = mouseY - petY;
      const running = Math.hypot(dx, dy) > REACH_THRESHOLD;

      if (running) {
        const radians = Math.atan2(dy, dx);
        petX += Math.cos(radians) * SPEED;
        petY += Math.sin(radians) * SPEED;
        direction = directionFor(radians * (180 / Math.PI));
      }

      if (timestamp - lastFrameTime > TICK_MS) {
        lastFrameTime = timestamp;

        let posX: number;
        let posY: number;

        if (running) {
          isIdle = false;
          const sprite = SPRITE_DATA[direction];
          [posX, posY] = sprite.frames[frameIndex % 2];
          frameIndex += 1;
          [renderWidth, renderHeight] = sprite.size;
        } else {
          if (!isIdle) {
            isIdle = true;
            reachTime = timestamp;
            frameIndex = 0;
          }

          renderWidth = 32;
          renderHeight = 32;
          const sinceReach = timestamp - reachTime;

          if (sinceReach < IDLE_STILL_MS) {
            posX = 96;
            posY = 96;
          } else if (sinceReach - IDLE_STILL_MS < IDLE_TRANSITION_MS) {
            posX = 96;
            posY = 63;
          } else {
            const loopTime = sinceReach - IDLE_STILL_MS - IDLE_TRANSITION_MS;
            posX = 64;
            posY = Math.floor(loopTime / 200) % 2 === 0 ? 0 : 32;
          }
        }

        pet!.style.width = `${renderWidth}px`;
        pet!.style.height = `${renderHeight}px`;
        pet!.style.backgroundPosition = `-${posX}px -${posY}px`;
      }

      pet!.style.left = `${petX - renderWidth / 2}px`;
      pet!.style.top = `${petY - renderHeight / 2}px`;

      frame = requestAnimationFrame(update);
    }

    window.addEventListener("mousemove", handleMouseMove);
    frame = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div aria-hidden="true" className="cursor-pet" ref={petRef} />;
}
