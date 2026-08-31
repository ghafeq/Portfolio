"use client";

import { useId, type ReactNode } from "react";

export type TooltipPlacement = "above" | "below" | "below-start" | "center";

export interface TooltipProps {
  /** The text shown on hover or keyboard focus. */
  label: string;
  children: ReactNode;
  placement?: TooltipPlacement;
  className?: string;
}

/**
 * Pure-CSS tooltip. The wrapper (not the trigger) is the hover target, so the
 * pointer can drift onto the tooltip without it flickering out.
 */
export function Tooltip({ label, children, placement = "above", className }: TooltipProps) {
  const id = useId();
  const classes = ["tooltip-wrap", `tooltip-${placement}`, className].filter(Boolean).join(" ");

  return (
    <span className={classes}>
      <span aria-describedby={id} className="tooltip-trigger">
        {children}
      </span>
      <span className="tooltip" id={id} role="tooltip">
        {label}
      </span>
    </span>
  );
}
