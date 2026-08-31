"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useRef, type ReactNode } from "react";

export interface TopNavigationLink {
  label: string;
  href: string;
  /** Opens the link in a new browser tab. */
  newTab?: boolean;
}

export interface TopNavigationProps {
  links?: TopNavigationLink[];
  logo?: ReactNode;
  logoHref?: string;
  className?: string;
}

const isInternalRoute = (href: string) => href.startsWith("/") && !href.startsWith("//");

// Written out plainly and encoded here, rather than hand-encoding the URL: the
// spaces still need escaping for hosts that do not normalise them, but the name
// stays readable and can be checked against the file on disk at a glance.
const RESUME_FILE = "Shafiq Effendy - Product Designer.pdf";
const RESUME_HREF = `/resume/${encodeURIComponent(RESUME_FILE)}`;

const defaultLinks: TopNavigationLink[] = [
  { label: "Resume", href: RESUME_HREF, newTab: true },
  { label: "About", href: "/about" },
];

export function TopNavigation({
  links = defaultLinks,
  logo,
  logoHref = "/",
  className,
}: TopNavigationProps) {
  const pathname = usePathname();
  const logoVideoRef = useRef<HTMLVideoElement>(null);

  // The logo holds a still frame until it is deliberately hovered or focused.
  function playLogo() {
    // play() rejects if the browser blocks it; nothing to recover from.
    void logoVideoRef.current?.play().catch(() => {});
  }

  function stopLogo() {
    const video = logoVideoRef.current;

    if (!video) {
      return;
    }

    video.pause();
    // Back to the first frame, so the resting logo always looks the same.
    video.currentTime = 0;
  }

  const classes = ["top-navigation", "wrapper", "px-6", "sm:px-10", className]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={classes}>
      <NextLink
        aria-label="Home"
        className="top-navigation-logo"
        href={logoHref}
        onBlur={stopLogo}
        onFocus={playLogo}
        onMouseEnter={playLogo}
        onMouseLeave={stopLogo}
      >
        {logo ?? (
          <video
            aria-hidden="true"
            loop
            muted
            playsInline
            // Shown until the first play, so the logo is never a blank box.
            poster="/Cat.svg"
            preload="auto"
            ref={logoVideoRef}
            src="/Cat.mp4"
          />
        )}
      </NextLink>
      <nav aria-label="Main">
        <ul className="top-navigation-links">
          {links.map(({ label, href, newTab }) => {
            // Links that leave the site are never "the current page".
            const isCurrent =
              !newTab && (pathname === href || pathname.startsWith(`${href}/`));

            return (
              <li key={href}>
                {/* newTab covers the resume PDF, which is a file rather than a
                    route and must not be client-side navigated. */}
                {!newTab && isInternalRoute(href) ? (
                  <NextLink
                    aria-current={isCurrent ? "page" : undefined}
                    className="top-navigation-link"
                    href={href}
                  >
                    {label}
                  </NextLink>
                ) : (
                  <a
                    className="top-navigation-link"
                    href={href}
                    rel={newTab ? "noopener noreferrer" : undefined}
                    target={newTab ? "_blank" : undefined}
                  >
                    {label}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
