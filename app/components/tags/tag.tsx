"use client";

import { X } from "lucide-react";
import type { ReactNode } from "react";

export type TagTone = "neutral" | "info" | "success" | "warning" | "danger";
export type TagSize = "small" | "medium";

export interface TagProps {
  children: ReactNode;
  icon?: ReactNode;
  showIcon?: boolean;
  tone?: TagTone;
  size?: TagSize;
  onRemove?: () => void;
  className?: string;
}

export function Tag({
  children,
  icon,
  showIcon = true,
  tone = "info",
  size = "medium",
  onRemove,
  className,
}: TagProps) {
  const classes = ["tag", `tag-${tone}`, `tag-${size}`, className]
    .filter(Boolean)
    .join(" ");
  const hasIcon = Boolean(icon) && showIcon;

  return (
    <span className={classes}>
      {hasIcon && <span aria-hidden="true" className="tag-icon">{icon}</span>}
      <span>{children}</span>
      {onRemove && (
        <button
          aria-label={`Remove ${typeof children === "string" ? children : "tag"}`}
          className="tag-remove"
          onClick={onRemove}
          type="button"
        >
          <X aria-hidden="true" height={14} width={14} />
        </button>
      )}
    </span>
  );
}
