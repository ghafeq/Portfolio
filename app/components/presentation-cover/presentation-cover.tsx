"use client";

import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { DeviceMockups } from "../device-mockups";
import { CEKAP_SCREENS, presentationAsset as asset } from "../presentation-deck/assets";

/**
 * One slot per wireframe, in playing order, summing to the five seconds the
 * cover gets. Each scene's choreography is written as fractions of its own
 * slot, so retiming the reel is a matter of changing these numbers only.
 * CEKAP always opens.
 */
const SCENES = [
  { id: "cekap", duration: 1000 },
  { id: "daikin", duration: 700 },
  { id: "vstecs", duration: 900 },
  // The longest slot: its scroll passes four screens and then has to hold.
  { id: "portal", duration: 1400 },
  { id: "five-app", duration: 1000 },
] as const;

type SceneId = (typeof SCENES)[number]["id"];

// PixelSplash wipes across every page load in two 667ms phases. The reel waits
// for it to clear rather than playing its opening underneath.
const SPLASH_MS = 1400;

// The first visit has to fetch every screen. Past this the reel starts anyway
// and late images simply arrive in place.
const IMAGE_WAIT_MS = 4000;

// The whole reel, which the reduced-motion cover holds still for instead.
const REEL_MS = SCENES.reduce((total, scene) => total + scene.duration, 0);

// Where the cover goes once the reel ends, or sooner on a click anywhere or a
// clicker.
const NEXT_HREF = "/presentation/projects";
const NEXT_KEYS = new Set(["ArrowRight", "ArrowDown", "PageDown", "Enter", " "]);

// Back to front, each placed by its Figma frame coordinates.
const VSTECS_SCREENS = [
  { file: "Vstecs Payment Success.png", x: 156.52, y: 0, width: 1126.78, height: 635.58 },
  { file: "Vstecs Payment Details.png", x: 77.63, y: 234.78, width: 1284.75, height: 724.68 },
  { file: "Vstecs Invoices.png", x: 0, y: 558.94, width: 1440, height: 810 },
];

// Left to right. Only the first sits fully in frame; the rest run off the edge.
const PORTAL_SCREENS = [
  { file: "Five Portal 1.png", x: 74, width: 1089.89 },
  { file: "Five Portal 2.png", x: 1205.89, width: 1086.76 },
  { file: "Five Portal 3.png", x: 2334.65, width: 1089.89 },
  { file: "Five Portal 4.png", x: 3466.54, width: 1087.55 },
];

// The five variants of the Five App Prototype component, in flow order.
const FIVE_APP_SCREENS = [1, 2, 3, 4, 5].map((step) => `Five App ${step}.png`);

const sleep = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));

/** Custom properties a scene's CSS reads its geometry and timing from. */
const vars = (values: Record<string, string | number>) => values as CSSProperties;

function Scene({
  id,
  active,
  children,
}: {
  id: SceneId;
  active: SceneId | null;
  children: ReactNode;
}) {
  const { duration } = SCENES.find((scene) => scene.id === id)!;

  return (
    <div
      className={`cover-scene cover-${id}${active === id ? " is-active" : ""}`}
      style={vars({ "--scene": `${duration}ms` })}
    >
      {children}
    </div>
  );
}

/**
 * The presentation cover: every project as a wireframe, one after another, in
 * five seconds, then on to the projects. With reduced motion it rests on CEKAP
 * for those five seconds instead.
 */
export function PresentationCover() {
  const rootRef = useRef<HTMLElement>(null);
  const router = useRouter();
  const [active, setActive] = useState<SceneId | null>(null);

  useEffect(() => {
    router.prefetch(NEXT_HREF);

    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) {
        return;
      }

      // Enter on the focused link already follows it.
      if (event.key === "Enter" && event.target instanceof HTMLAnchorElement) {
        return;
      }

      if (NEXT_KEYS.has(event.key)) {
        event.preventDefault();
        router.push(NEXT_HREF);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router]);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cancelled = false;
    let timer = 0;
    let index = -1;

    // Plays the reel once, then opens the projects. With motion reduced it
    // holds on CEKAP for the reel's length instead of playing it.
    function advance() {
      index += 1;

      if (index >= SCENES.length || (reduceMotion && index > 0)) {
        router.push(NEXT_HREF);
        return;
      }

      setActive(SCENES[index].id);
      timer = window.setTimeout(advance, reduceMotion ? REEL_MS : SCENES[index].duration);
    }

    // decode() rejects for an image that fails to load; the reel plays regardless.
    const decoded = Promise.all(
      Array.from(root.querySelectorAll("img"), (image) => image.decode().catch(() => {})),
    );

    Promise.all([
      Promise.race([decoded, sleep(IMAGE_WAIT_MS)]),
      // No splash plays with motion reduced, so there is nothing to wait out.
      sleep(reduceMotion ? 0 : SPLASH_MS),
    ]).then(() => {
      if (!cancelled) {
        advance();
      }
    });

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [router]);

  return (
    // .stagger lends the reel the site's reveal vocabulary: its ease, blur and rise.
    <main className="cover stagger" ref={rootRef}>
      <div
        aria-label="Selected work: CEKAP, Daikin Home, VSTECS reseller billing, Five fleet portal and the Five Petroleum app."
        className="cover-stage"
        role="img"
      >
        <Scene active={active} id="cekap">
          <div className="cover-cekap-fan">
            <DeviceMockups eager images={CEKAP_SCREENS} sizes="36vw" />
          </div>
        </Scene>

        <Scene active={active} id="daikin">
          <Image
            alt=""
            className="cover-daikin-device"
            height={1440}
            loading="eager"
            sizes="70vw"
            src={asset("Daikin Home.png")}
            width={1440}
          />
        </Scene>

        <Scene active={active} id="vstecs">
          {VSTECS_SCREENS.map(({ file, x, y, width, height }, order) => (
            <span
              className="cover-flip-card"
              key={file}
              style={vars({ "--x": x, "--y": y, "--w": width, "--h": height, "--i": order })}
            >
              <Image
                alt=""
                fill
                loading="eager"
                quality={90}
                // Each card's share of the 1440-wide frame.
                sizes={`${Math.ceil(width / 14.4)}vw`}
                src={asset(file)}
              />
            </span>
          ))}
        </Scene>

        <Scene active={active} id="portal">
          {PORTAL_SCREENS.map(({ file, x, width }) => (
            <span
              className="cover-scroll-screen"
              key={file}
              style={vars({ "--x": x, "--w": width })}
            >
              <Image alt="" fill loading="eager" quality={90} sizes="76vw" src={asset(file)} />
            </span>
          ))}
        </Scene>

        <Scene active={active} id="five-app">
          <div className="cover-story-phone">
            <div className="cover-story-screen">
              <div className="cover-story-track">
                {FIVE_APP_SCREENS.map((file) => (
                  <Image
                    alt=""
                    height={852}
                    key={file}
                    loading="eager"
                    quality={90}
                    sizes="27vw"
                    src={asset(file)}
                    width={393}
                  />
                ))}
              </div>
            </div>
            <Image
              alt=""
              className="cover-story-bezel"
              height={2760}
              loading="eager"
              sizes="30vw"
              src={asset("iPhone Bezel.png")}
              width={1350}
            />
          </div>
        </Scene>
      </div>
      <NextLink aria-label="Continue to projects" className="cover-continue" href={NEXT_HREF} />
    </main>
  );
}
