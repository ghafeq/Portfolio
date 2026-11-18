"use client";

import { X } from "lucide-react";
import Image from "next/image";
import {
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type MouseEvent,
  type PointerEvent,
} from "react";
import { createPortal } from "react-dom";

// A short settle with no overshoot, so the image glides out of the page and
// lands rather than bouncing.
const EASE = "cubic-bezier(0.32, 0.72, 0, 1)";
const OPEN_MS = 560;
// Shorter than the open, so dismissing never feels like waiting.
const CLOSE_MS = 420;

// Illustrations carry small text and hard colour edges that blur at the default
// of 75. Must stay in images.qualities in next.config.ts.
const QUALITY = 90;

export interface ImageLightboxProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Passed to the inline image only; the full-screen copy always asks for the
      viewport width. */
  sizes: string;
  /** Set on the image that is the page's largest paint. */
  preload?: boolean;
  /** Applied to the inline image, not the full-screen copy. */
  className?: string;
}

type Phase = "closed" | "opening" | "open" | "closing";

const noSubscription = () => () => {};

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function radius(element: Element) {
  return parseFloat(getComputedStyle(element).borderTopLeftRadius) || 0;
}

/**
 * Keyframes that carry the full-screen image from where the inline one shows
 * on the page to where it rests. A cropped inline image (object-fit: cover) is
 * matched by scaling the full image to cover the same box and clipping it to
 * that box, so the hand-off is seamless either way.
 */
function flight(inline: HTMLElement, full: HTMLElement): Keyframe[] {
  const from = inline.getBoundingClientRect();
  const to = full.getBoundingClientRect();
  const fit = getComputedStyle(inline).objectFit;
  const scale = (fit === "contain" ? Math.min : Math.max)(
    from.width / to.width,
    from.height / to.height,
  );
  // The part of the full image the inline box shows, in its own unscaled size.
  const insetX = Math.max(0, (to.width - from.width / scale) / 2);
  const insetY = Math.max(0, (to.height - from.height / scale) / 2);
  const dx = from.left + from.width / 2 - (to.left + to.width / 2);
  const dy = from.top + from.height / 2 - (to.top + to.height / 2);

  return [
    {
      transform: `translate(${dx}px, ${dy}px) scale(${scale})`,
      // Scaled down with the image, so it starts at the inline image's radius.
      clipPath: `inset(${insetY}px ${insetX}px round ${radius(inline) / scale}px)`,
    },
    { transform: "none", clipPath: `inset(0px 0px round ${radius(full)}px)` },
  ];
}

/**
 * An image that opens full screen when clicked, growing out of its place on
 * the page and flying back into it on close. With a mouse, a "View" label
 * follows the pointer over the image and a "Close" label while it is open; a
 * click anywhere closes it.
 *
 * Built on <dialog>, so focus is trapped, the page behind is inert, and Escape
 * closes it without extra code.
 */
export function ImageLightbox({
  src,
  alt,
  width,
  height,
  sizes,
  preload,
  className,
}: ImageLightboxProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const fullRef = useRef<HTMLImageElement>(null);
  const viewRef = useRef<HTMLSpanElement>(null);
  const closeRef = useRef<HTMLSpanElement>(null);
  const phase = useRef<Phase>("closed");
  const motion = useRef<Animation | null>(null);
  // The "View" label is portalled to <body>, out of any transformed ancestor
  // that would otherwise pin a fixed element to itself instead of the window.
  // There is no <body> to portal to on the server.
  const inBrowser = useSyncExternalStore(
    noSubscription,
    () => true,
    () => false,
  );
  // The full-size file loads once a visit looks likely (hover, focus or a
  // press), not with the page.
  const [warm, setWarm] = useState(false);

  const place = (label: HTMLElement | null, x: number, y: number) => {
    if (label) label.style.translate = `${x}px ${y}px`;
  };

  const showView = (event: PointerEvent) => {
    setWarm(true);
    if (event.pointerType !== "mouse") return;
    place(viewRef.current, event.clientX, event.clientY);
    viewRef.current?.classList.toggle("is-visible", phase.current === "closed");
  };

  const open = (event: MouseEvent) => {
    const trigger = triggerRef.current;
    const inline = trigger?.querySelector("img");
    const dialog = dialogRef.current;
    const full = fullRef.current;
    if (!trigger || !inline || !dialog || !full || phase.current !== "closed") return;

    viewRef.current?.classList.remove("is-visible");
    // Until the full-size file arrives, the copy shows the inline image's file
    // behind it, so it never flies in blank.
    full.style.backgroundImage = `url("${inline.currentSrc}")`;
    // A keyboard press reports no pointer, so it gets the close button instead.
    if (event.detail > 0) {
      place(closeRef.current, event.clientX, event.clientY);
      closeRef.current?.classList.add("is-visible");
    }

    dialog.showModal();
    const frames = flight(inline, full);

    // flight() has laid the dialog out, so the backdrop has a starting opacity
    // to fade up from.
    dialog.classList.add("is-open");
    trigger.classList.add("is-lifted");
    phase.current = "opening";

    const animation = full.animate(frames, {
      duration: reducedMotion() ? 0 : OPEN_MS,
      easing: EASE,
      // Holds the page position if a close reverses it before it lands.
      fill: "both",
    });
    motion.current = animation;
    animation.onfinish = () => {
      phase.current = "open";
      motion.current = null;
      animation.cancel();
    };
  };

  const close = () => {
    const trigger = triggerRef.current;
    const inline = trigger?.querySelector("img");
    const dialog = dialogRef.current;
    const full = fullRef.current;
    if (!dialog?.open || !trigger || !inline || !full || phase.current === "closing") return;

    phase.current = "closing";
    dialog.classList.remove("is-open");
    closeRef.current?.classList.remove("is-visible");

    const finish = (animation: Animation) => {
      trigger.classList.remove("is-lifted");
      dialog.close();
      animation.cancel();
      motion.current = null;
      phase.current = "closed";
    };

    // Closed before it finished opening: run the same flight backwards from
    // wherever it has got to.
    const running = motion.current;
    if (running && running.playState === "running") {
      running.onfinish = () => finish(running);
      running.reverse();
      return;
    }

    const animation = full.animate(flight(inline, full).reverse(), {
      duration: reducedMotion() ? 0 : CLOSE_MS,
      easing: EASE,
      fill: "forwards",
    });
    motion.current = animation;
    animation.onfinish = () => finish(animation);
  };

  return (
    <>
      <button
        aria-haspopup="dialog"
        aria-label={`View full screen: ${alt}`}
        className="image-lightbox-trigger"
        onClick={open}
        onFocus={() => setWarm(true)}
        onPointerDown={() => setWarm(true)}
        onPointerEnter={showView}
        onPointerLeave={() => viewRef.current?.classList.remove("is-visible")}
        onPointerMove={showView}
        ref={triggerRef}
        type="button"
      >
        <Image
          alt={alt}
          className={className}
          height={height}
          preload={preload}
          quality={QUALITY}
          sizes={sizes}
          src={src}
          width={width}
        />
      </button>

      {inBrowser &&
        createPortal(
          <span aria-hidden="true" className="lightbox-cursor" ref={viewRef}>
            <span className="lightbox-cursor-label">View</span>
          </span>,
          document.body,
        )}

      <dialog
        aria-label={alt}
        className="image-lightbox"
        // There is nothing to interact with on the image, so a click anywhere,
        // the close button included, dismisses it.
        onClick={close}
        // Escape is caught on keydown, since not every browser turns it into a
        // cancel event; cancel still covers other close requests, such as the
        // Android back gesture. Both hold the native close so the image can
        // fly back to the page first.
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onKeyDown={(event) => {
          if (event.key !== "Escape") return;
          event.preventDefault();
          close();
        }}
        onPointerMove={(event) => {
          if (event.pointerType !== "mouse" || phase.current === "closing") return;
          place(closeRef.current, event.clientX, event.clientY);
          closeRef.current?.classList.add("is-visible");
        }}
        ref={dialogRef}
        style={{ "--lightbox-aspect": `${width} / ${height}` } as CSSProperties}
      >
        <Image
          alt=""
          className="image-lightbox-image"
          height={height}
          loading={warm ? "eager" : "lazy"}
          quality={QUALITY}
          ref={fullRef}
          sizes="100vw"
          src={src}
          width={width}
        />
        {/* For touch and keyboard. A mouse gets the "Close" label instead. */}
        <button aria-label="Close full screen image" className="image-lightbox-close" type="button">
          <X aria-hidden="true" size={20} />
        </button>
        {/* Inside the dialog, because nothing outside the top layer can be
            drawn above its backdrop. */}
        <span aria-hidden="true" className="lightbox-cursor is-close" ref={closeRef}>
          <span className="lightbox-cursor-label">Close</span>
        </span>
      </dialog>
    </>
  );
}
