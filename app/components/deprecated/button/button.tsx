"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "medium",
  loading = false,
  disabled = false,
  leadingIcon,
  trailingIcon,
  type = "button",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const classes = ["button", `button-${variant}`, `button-${size}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      {...props}
      aria-busy={loading || undefined}
      className={classes}
      data-state={loading ? "loading" : isDisabled ? "disabled" : "idle"}
      disabled={isDisabled}
      type={type}
    >
      {loading ? <span aria-hidden="true" className="button-spinner" /> : leadingIcon}
      {children}
      {!loading && trailingIcon}
    </button>
  );
}
