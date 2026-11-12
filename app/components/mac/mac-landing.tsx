"use client";

import NextLink from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  DiskIcon,
  DocumentIcon,
  FolderIcon,
  MacApple,
  ScrollArrow,
  TrashIcon,
} from "./mac-icons";

type Folder = "disk" | "work" | "about" | "trash";
type View = "icon" | "name";

const DISK_NAME = "Shafiq's HD";
const RESUME_HREF = `/resume/${encodeURIComponent("Shafiq Effendy - Senior Product Designer.pdf")}`;
// One press of a scroll arrow, in lines of the window's text.
const SCROLL_STEP_EM = 3;

const FOLDER_TITLES: Record<Folder, string> = {
  disk: DISK_NAME,
  work: "Work",
  about: "About me",
  trash: "Trash",
};

const WORK = [
  { href: "/cekap", title: "CEKAP", kind: "Concept" },
  { href: "https://goshi-nu.vercel.app/", title: "Gōshi", kind: "Concept" },
  { href: "/gain-secure", title: "Gain Secure Corporate Identity", kind: "Professional" },
  { href: "/five-company-mode", title: "Company Mode on Five Petroleum App", kind: "Professional" },
  { href: "/vstecs-billing", title: "CSP Reseller Billing at VSTECS", kind: "Professional" },
  { href: "/five-fleet-portal", title: "SKDS & SKPS at Five Petroleum", kind: "Professional" },
];

const PRINCIPLES = [
  ["Design to production", "Design isn't done until it ships the way it was intended."],
  ["End-to-end ownership", "UX, UI, and code. I carry the work all the way."],
  ["Consistency is a feature", "Systematic UI builds user trust and team speed."],
  ["Tools in service of quality", "AI workflows raise my standard of execution, never replace it."],
];

const isExternal = (href: string) => href.startsWith("http") || href.startsWith("/resume/");

interface MacLinkProps {
  children: ReactNode;
  className: string;
  href: string;
  onClick?: () => void;
}

function MacLink({ children, className, href, onClick }: MacLinkProps) {
  const external = isExternal(href);

  return (
    <NextLink
      className={className}
      href={href}
      onClick={onClick}
      rel={external ? "noreferrer" : undefined}
      target={external ? "_blank" : undefined}
    >
      {children}
    </NextLink>
  );
}

interface MenuProps {
  children: ReactNode;
  id: string;
  label: ReactNode;
  name: string;
  openMenu: string | null;
  setOpenMenu: (menu: string | null) => void;
}

/** A pull-down from the menu bar. Once one is open, the others open on hover. */
function Menu({ children, id, label, name, openMenu, setOpenMenu }: MenuProps) {
  const isOpen = openMenu === id;

  return (
    <div className="mac-menu">
      <button
        aria-expanded={isOpen}
        aria-label={name}
        className="mac-menu-title"
        onClick={() => setOpenMenu(isOpen ? null : id)}
        onPointerEnter={() => openMenu && setOpenMenu(id)}
        type="button"
      >
        {label}
      </button>
      {isOpen && <div className="mac-menu-list">{children}</div>}
    </div>
  );
}

interface MacLandingProps {
  onClose: () => void;
}

/** What the Mac's screen shows once it is open: a desktop and one Finder window. */
export function MacLanding({ onClose }: MacLandingProps) {
  const [folder, setFolder] = useState<Folder>("disk");
  const [view, setView] = useState<View>("icon");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const windowRef = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const menubarRef = useRef<HTMLElement>(null);

  const isAtDisk = folder === "disk";
  const itemCount = { disk: 4, work: WORK.length, about: 1, trash: 0 }[folder];

  useEffect(() => {
    windowRef.current?.focus({ preventScroll: true });
  }, []);

  function closeWindow() {
    if (isAtDisk) {
      onClose();
    } else {
      setFolder("disk");
    }
  }

  // Written straight to the element, so scrolling does not re-render the window.
  function syncScrollbar() {
    const body = bodyRef.current;
    const scrollbar = scrollbarRef.current;

    if (!body || !scrollbar) {
      return;
    }

    const range = body.scrollHeight - body.clientHeight;

    scrollbar.dataset.scrollable = String(range > 0);
    scrollbar.style.setProperty("--mac-thumb", String(range > 0 ? body.scrollTop / range : 0));
  }

  useEffect(() => {
    const body = bodyRef.current;

    if (!body) {
      return;
    }

    const observer = new ResizeObserver(syncScrollbar);

    observer.observe(body);

    return () => observer.disconnect();
  }, [folder, view]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") {
        return;
      }

      if (openMenu) {
        setOpenMenu(null);
      } else if (folder === "disk") {
        onClose();
      } else {
        setFolder("disk");
      }
    }

    function handlePointerDown(event: PointerEvent) {
      if (!menubarRef.current?.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("pointerdown", handlePointerDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [folder, onClose, openMenu]);

  function scrollBy(direction: 1 | -1) {
    const body = bodyRef.current;

    if (body) {
      const step = SCROLL_STEP_EM * Number.parseFloat(getComputedStyle(body).fontSize);

      body.scrollBy({ top: direction * step });
    }
  }

  function menuAction(action: () => void) {
    return () => {
      action();
      setOpenMenu(null);
    };
  }

  const menuProps = { openMenu, setOpenMenu };

  return (
    <div className="mac-desktop">
      <nav aria-label="Menu bar" className="mac-menubar" ref={menubarRef}>
        <Menu {...menuProps} id="apple" label={<MacApple className="mac-menu-apple" />} name="Apple">
          <button className="mac-menu-item" onClick={menuAction(() => setFolder("about"))} type="button">
            About Shafiq…
          </button>
        </Menu>
        <Menu {...menuProps} id="file" label="File" name="File">
          <button className="mac-menu-item" onClick={menuAction(() => setFolder("work"))} type="button">
            Open Work
          </button>
          <button className="mac-menu-item" onClick={menuAction(() => setFolder("about"))} type="button">
            Open About
          </button>
          <MacLink className="mac-menu-item" href={RESUME_HREF} onClick={() => setOpenMenu(null)}>
            Open Resume
          </MacLink>
          <button className="mac-menu-item" onClick={menuAction(closeWindow)} type="button">
            Close Window
          </button>
        </Menu>
        <button className="mac-menu-title" disabled type="button">
          Edit
        </button>
        <Menu {...menuProps} id="view" label="View" name="View">
          {(["icon", "name"] as const).map((option) => (
            <button
              aria-pressed={view === option}
              className="mac-menu-item"
              key={option}
              onClick={menuAction(() => setView(option))}
              type="button"
            >
              by {option === "icon" ? "Icon" : "Name"}
            </button>
          ))}
        </Menu>
        <Menu {...menuProps} id="special" label="Special" name="Special">
          <MacLink className="mac-menu-item" href="/" onClick={() => setOpenMenu(null)}>
            Full Site
          </MacLink>
          <button className="mac-menu-item" onClick={menuAction(onClose)} type="button">
            Shut Down
          </button>
        </Menu>
      </nav>

      <div className="mac-finder">
        <button className="mac-desktop-icon mac-desktop-disk" onClick={() => setFolder("disk")} type="button">
          <DiskIcon />
          <span className="mac-item-label">{DISK_NAME}</span>
        </button>
        <button className="mac-desktop-icon mac-desktop-trash" onClick={() => setFolder("trash")} type="button">
          <TrashIcon />
          <span className="mac-item-label">Trash</span>
        </button>

        <section
          aria-labelledby="mac-window-title"
          className="mac-window"
          data-zoomed={isZoomed}
          ref={windowRef}
          tabIndex={-1}
        >
          <header className="mac-window-bar">
            <button
              aria-label={isAtDisk ? "Close the window" : `Back to ${DISK_NAME}`}
              className="mac-window-box"
              onClick={closeWindow}
              type="button"
            />
            <h2 className="mac-window-title" id="mac-window-title">
              {FOLDER_TITLES[folder]}
            </h2>
            <button
              aria-label={isZoomed ? "Shrink the window" : "Zoom the window"}
              aria-pressed={isZoomed}
              className="mac-window-box mac-window-zoom"
              onClick={() => setIsZoomed(!isZoomed)}
              type="button"
            />
          </header>

          <p className="mac-window-info">
            <span>{itemCount === 1 ? "1 item" : `${itemCount} items`}</span>
            <span>Product Designer</span>
            <span className="mac-window-info-end">Figma to code</span>
          </p>

          <div className="mac-window-main">
            {/* Keyed so each folder starts at the top instead of the last scroll. */}
            <div
              className="mac-window-body"
              key={`${folder}-${view}`}
              onScroll={syncScrollbar}
              ref={bodyRef}
            >
              {isAtDisk && (
                <>
                  <h3 className="mac-heading">Hi, I&apos;m Shafiq Efféndy</h3>
                  <p>
                    A self-taught Product Designer. For three years, I&apos;ve done it all. Sketch in
                    Figma, code it, ship it, watch users use it. One person, whole pipeline.
                  </p>
                  <div className="mac-items" data-view={view}>
                    <button className="mac-item" onClick={() => setFolder("work")} type="button">
                      <FolderIcon />
                      <span className="mac-item-label">Work</span>
                    </button>
                    <button className="mac-item" onClick={() => setFolder("about")} type="button">
                      <FolderIcon />
                      <span className="mac-item-label">About</span>
                    </button>
                    <MacLink className="mac-item" href={RESUME_HREF}>
                      <DocumentIcon />
                      <span className="mac-item-label">Resume</span>
                    </MacLink>
                    <MacLink className="mac-item" href="/">
                      <DocumentIcon />
                      <span className="mac-item-label">Full Site</span>
                    </MacLink>
                  </div>
                </>
              )}

              {folder === "work" && (
                <div className="mac-items" data-columns="3" data-view={view}>
                  {WORK.map(({ href, title, kind }) => (
                    <MacLink className="mac-item" href={href} key={href}>
                      <DocumentIcon />
                      <span className="mac-item-label">{title}</span>
                      {view === "name" && <span className="mac-item-kind">{kind}</span>}
                    </MacLink>
                  ))}
                </div>
              )}

              {folder === "about" && (
                <>
                  <h3 className="mac-heading">Principles I ship by</h3>
                  <dl className="mac-principles">
                    {PRINCIPLES.map(([title, body]) => (
                      <div key={title}>
                        <dt>{title}</dt>
                        <dd>{body}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mac-actions">
                    <NextLink className="mac-button mac-button-default" href="/about">
                      Read more
                    </NextLink>
                    <NextLink className="mac-button" href="/">
                      Full site
                    </NextLink>
                  </div>
                </>
              )}

              {folder === "trash" && <p className="mac-empty">The Trash is empty.</p>}
            </div>

            <div aria-hidden="true" className="mac-scrollbar" ref={scrollbarRef}>
              <button className="mac-scroll-button" onClick={() => scrollBy(-1)} tabIndex={-1} type="button">
                <ScrollArrow />
              </button>
              <span className="mac-scroll-track">
                <span className="mac-scroll-thumb" />
              </span>
              <button
                className="mac-scroll-button mac-scroll-down"
                onClick={() => scrollBy(1)}
                tabIndex={-1}
                type="button"
              >
                <ScrollArrow />
              </button>
            </div>
          </div>

          <div aria-hidden="true" className="mac-window-foot">
            <span className="mac-scroll-end mac-scroll-left">
              <ScrollArrow />
            </span>
            <span className="mac-scroll-track" />
            <span className="mac-scroll-end mac-scroll-right">
              <ScrollArrow />
            </span>
            <span className="mac-grow-box" />
          </div>
        </section>
      </div>
    </div>
  );
}
