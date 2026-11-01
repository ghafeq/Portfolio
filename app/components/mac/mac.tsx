"use client";

import { useEffect, useRef, useState } from "react";
import { MacHardware, MacStart } from "./mac-hardware";
import { MacLanding } from "./mac-landing";

/**
 * The Mac as a page of its own. "Click" on the screen zooms in and opens a small
 * landing page inside it; the window's close box zooms back out.
 */
export function Mac() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const startRef = useRef<HTMLButtonElement>(null);
  // Focus only follows a close. On first load it stays where the browser put it.
  const returnFocusRef = useRef(false);

  useEffect(() => {
    if (!isOpen && returnFocusRef.current) {
      returnFocusRef.current = false;
      startRef.current?.focus({ preventScroll: true });
    }
  }, [isOpen]);

  function open() {
    setIsOpen(true);
    setHasOpened(true);
  }

  function close() {
    returnFocusRef.current = true;
    setIsOpen(false);
  }

  return (
    <main className="mac-stage" data-open={isOpen}>
      <h1 className="sr-only">Shafiq Efféndy, Product Designer</h1>
      <MacHardware>
        {isOpen ? (
          <MacLanding onClose={close} />
        ) : (
          <MacStart onClick={open} ref={startRef} skipHello={hasOpened} />
        )}
      </MacHardware>
    </main>
  );
}
