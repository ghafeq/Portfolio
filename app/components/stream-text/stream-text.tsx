"use client";

import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";

// useLayoutEffect warns when a client component is server-rendered.
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export interface StreamTextProps {
  children: ReactNode;
  /** Change this to replay the stream without remounting. */
  replayKey?: string | number;
  className?: string;
}

export function StreamText({ children, replayKey, className }: StreamTextProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;

    // StrictMode invokes effects twice; wrapping already-wrapped words would nest them.
    if (
      !root ||
      root.querySelector(".stream-w") ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const gap = Number.parseFloat(getComputedStyle(root).getPropertyValue("--stream-gap")) || 0;
    // Anything inside .stream-atom resolves as a single unit, so it neither
    // splits into words nor consumes slots in the stagger.
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue?.trim() || node.parentElement?.closest(".stream-atom")) {
          return NodeFilter.FILTER_REJECT;
        }

        return NodeFilter.FILTER_ACCEPT;
      },
    });
    const textNodes: Text[] = [];

    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      textNodes.push(node as Text);
    }

    let wordIndex = 0;

    textNodes.forEach((textNode) => {
      const fragment = document.createDocumentFragment();

      textNode.nodeValue?.split(/(\s+)/).forEach((part) => {
        if (!part) {
          return;
        }

        if (/^\s+$/.test(part)) {
          fragment.appendChild(document.createTextNode(part));
          return;
        }

        const word = document.createElement("span");
        word.className = "stream-w";
        word.textContent = part;
        word.style.transitionDelay = `${wordIndex * gap}ms`;
        wordIndex += 1;
        fragment.appendChild(word);
      });

      textNode.parentNode?.replaceChild(fragment, textNode);
    });

    // Commit the hidden state before releasing the words.
    void root.offsetWidth;
    root.classList.add("is-streaming");
  }, [replayKey]);

  return (
    <div className={["stream", className].filter(Boolean).join(" ")} ref={rootRef}>
      {children}
    </div>
  );
}
