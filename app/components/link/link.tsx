"use client";

import NextLink from "next/link";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

// Same-origin routes navigate client-side, so the page is not torn down mid
// interaction (which would cut off the click sound).
const isInternalRoute = (href: string) => href.startsWith("/") && !href.startsWith("//");

export type LinkState = "enabled" | "loading" | "disabled";
export type LinkType = "inline" | "standalone";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  type?: LinkType;
  loading?: boolean;
  disabled?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

export function Link({
  children,
  type = "inline",
  className,
  loading = false,
  disabled = false,
  leadingIcon,
  trailingIcon,
  href,
  onClick,
  ...props
}: LinkProps) {
  const state: LinkState = loading ? "loading" : disabled ? "disabled" : "enabled";
  const isUnavailable = loading || disabled;
  const classes = ["link-component", `link-component-${type}`, className]
    .filter((className) => className !== undefined)
    .join(" ");

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (isUnavailable) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  }

  const inner = (
    <>
      {loading ? <span aria-hidden="true" className="link-spinner" /> : leadingIcon}
      <span>{children}</span>
      {!loading && trailingIcon}
    </>
  );

  const shared = {
    ...props,
    "aria-busy": loading || undefined,
    "aria-disabled": disabled || undefined,
    className: classes,
    "data-state": state,
    onClick: handleClick,
    tabIndex: disabled ? -1 : props.tabIndex,
  };

  // A route only routes client-side when it is same-origin, still available,
  // and not asked to open elsewhere.
  if (href && !isUnavailable && !props.target && isInternalRoute(href)) {
    return (
      <NextLink {...shared} href={href}>
        {inner}
      </NextLink>
    );
  }

  return (
    <a {...shared} href={isUnavailable ? undefined : href}>
      {inner}
    </a>
  );
}
