"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

// Matches --motion-duration-normal, the length of the closing transition.
const CLOSE_MS = 180;

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

/**
 * An image that opens full screen when clicked. Built on <dialog>, so focus is
 * trapped, the page behind is inert, and Escape closes it without extra code.
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
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  const open = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    window.clearTimeout(closeTimer.current);
    dialog.classList.remove("is-closing");
    dialog.showModal();
    // Commit the starting state before adding the class, so the dialog scales
    // in rather than appearing.
    void dialog.offsetWidth;
    dialog.classList.add("is-open");
  };

  const close = () => {
    const dialog = dialogRef.current;
    if (!dialog?.open || dialog.classList.contains("is-closing")) return;

    dialog.classList.remove("is-open");
    dialog.classList.add("is-closing");
    closeTimer.current = window.setTimeout(() => {
      dialog.classList.remove("is-closing");
      dialog.close();
    }, CLOSE_MS);
  };

  return (
    <>
      <button
        aria-haspopup="dialog"
        aria-label={`View full screen: ${alt}`}
        className="image-lightbox-trigger"
        onClick={open}
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

      <dialog
        aria-label={alt}
        className="image-lightbox"
        // There is nothing to interact with on the image, so a click anywhere,
        // the close button included, dismisses it.
        onClick={close}
        // Escape is caught on keydown, since not every browser turns it into a
        // cancel event; cancel still covers other close requests, such as the
        // Android back gesture. Both hold the native close so the transition
        // can run.
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onKeyDown={(event) => {
          if (event.key !== "Escape") return;
          event.preventDefault();
          close();
        }}
        ref={dialogRef}
      >
        <Image
          alt=""
          className="image-lightbox-image"
          height={height}
          quality={QUALITY}
          sizes="100vw"
          src={src}
          width={width}
        />
        <button aria-label="Close full screen image" className="image-lightbox-close" type="button">
          <X aria-hidden="true" size={20} />
        </button>
      </dialog>
    </>
  );
}
