"use client";

import { ArrowUp, MessageCircle, RotateCcw, Square, X } from "lucide-react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { flushSync } from "react-dom";

type Turn = { role: "user" | "assistant"; content: string };

// Matches the route's own limit, so the field stops where the server would refuse.
const MAX_QUESTION_CHARS = 1000;

// The full-screen sheet takes over below this width; must match the CSS.
const COMPACT_QUERY = "(max-width: 767px)";

// The suggested questions carry answers Shafiq wrote, so the questions most
// visitors tap are answered in his words, instantly, without an API call.
// Follow-ups go to the model, which reads these back from the history. Keep
// the facts here in step with app/api/ask/profile.ts.
const STARTERS = [
  {
    question: "What does Shafiq do?",
    answer: `Shafiq is a Design Engineer. He designs user interfaces in Figma and builds them in code. He has four years of experience shipping production UI on enterprise platforms.

Since August 2023, he has been the sole design engineer at Gain Secure Sdn Bhd in Kuala Lumpur. He owns product delivery from start to finish. He gathers client requirements, shapes the system design, builds UI storyboards in Figma and turns those designs into front-end code with the engineering team on Azure DevOps. He also maintains the company's Figma component library, including semantic tokens, multi-mode theming and Code Connect mappings for engineer handoff.

He is based in Malaysia and is targeting senior Design Engineer roles in Singapore and the wider APAC region.`,
  },
  {
    question: "Walk me through CEKAP",
    answer: `CEKAP is a checkpoint-aware airport guidance app for KLIA. It is also documented as Smart Flight Companion. Shafiq built it as a self-initiated project to demonstrate his design thinking, and it is his main public portfolio piece.

He started by mapping the airport journey and the points where travelers lose time and confidence. He then built UI storyboards in Figma for the key screens. He tested the flows in code early to see how the design behaved in real use. Finally, he removed features that did not earn their place.`,
  },
  {
    question: "What’s the tech stack?",
    answer: `For front end work, Shafiq uses HTML5, CSS3, JavaScript and TypeScript. His framework work covers React, ASP.NET MVC and Core, Razor and Blazor. In design, he works in Figma with variables, multi-mode theming, responsive component APIs and Code Connect. All his platforms are built and deployed on Azure DevOps.

He has shipped four production platforms: the VSTECS CSP Reseller Billing portal (ASP.NET MVC and React), the FIVE Petroleum Fleet Portal (ASP.NET), the FIVE mobile app (ASP.NET and React) and a Daikin Indoor Air Quality Monitoring dashboard.`,
  },
  {
    question: "How does Shafiq like to work?",
    answer: `He builds prototypes and translates designs to code early and often. This tests how faithful the design is and exposes friction before it gets expensive. He treats design-to-code translation as a way to keep design intent intact, not as a handoff.

He builds accessibility in from the start. He checks contrast, keyboard navigation, touch targets, semantic HTML, non-colour cues and reduced motion during the build.

He works as part of a team and describes results as team outcomes. He can speak to his own role in detail when asked.

Discovery and user research are not the daily focus of his current work, since client requirements drive most decisions. He is working to develop this area further.`,
  },
  {
    question: "What about life outside work?",
    answer: `Shafiq is originally from Sibu, Sarawak, and moved to Kuala Lumpur in 2023. He is a self-taught product designer who also holds a Diploma in Information Technology from SEGi College Kota Damansara.

Outside work, he runs self-initiated projects to test his design thinking. These include the CEKAP airport app, an audit of the AirBorneo booking flow and an analysis of e-payment pain points.`,
  },
];

// Case study paths the model is told to cite. Only these become links, so a
// made-up path in an answer stays plain text instead of leading to a 404.
const SITE_PATHS = [
  "/cekap",
  "/goshi-design-system/case-study",
  "/gain-secure",
  "/five-company-mode",
  "/five-fleet-portal",
  "/vstecs-billing",
  "/about",
];

const LINK_PATTERN = new RegExp(
  `(${SITE_PATHS.join("|")})(?![\\w-])|(ghafeq@gmail\\.com)|((?:https?://)?(?:www\\.)?linkedin\\.com/in/shafiq-effendy/?)`,
  "g",
);

// The CSS build minifies 150ms to .15s, so a bare parseFloat would read the
// close duration as 0.15ms and hide the panel before it has moved.
function durationMs(value: string, fallback: number) {
  const amount = Number.parseFloat(value);
  if (Number.isNaN(amount)) return fallback;
  return value.trim().endsWith("ms") ? amount : amount * 1000;
}

// The presentation fills the screen on its own, as in TopNavigation.
const isBare = (pathname: string) =>
  pathname === "/presentation" || pathname.startsWith("/presentation/");

/**
 * "Ask about Shafiq": a side panel that answers visitor questions through
 * /api/ask. It sits in the root layout, so the conversation survives
 * navigation and resets on reload. Non-modal on wide screens; a full-screen
 * sheet on phones.
 */
export function AskAssistant() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<AbortController | null>(null);

  useEffect(() => () => requestRef.current?.abort(), []);

  // Texts reveal: the greeting and suggested questions rise in on every open,
  // and again after a reset. is-shown is toggled directly, after a reflow, as
  // the library does. It is dropped while the panel is closed, under the
  // morph's own fade, so the next open rises from the hidden offset instead of
  // replaying from where the lines already are.
  const introVisible = open && turns.length === 0;

  useEffect(() => {
    const intro = introRef.current;
    if (!intro) return;

    if (!introVisible) {
      intro.classList.remove("is-shown");
      return;
    }

    void intro.offsetHeight;
    intro.classList.add("is-shown");
  }, [introVisible]);

  // Follow the answer as it streams in.
  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [turns, error]);

  if (isBare(pathname)) {
    return null;
  }

  // Plus to menu morph: CSS owns the whole open and close from data-open, so
  // there is no timing to coordinate here, only focus.
  function openPanel() {
    flushSync(() => setOpen(true));
    // preventScroll, because the field is still sliding in when it takes focus.
    inputRef.current?.focus({ preventScroll: true });
  }

  function closePanel({ returnFocus = true } = {}) {
    if (!open) return;

    // The launcher is inert while the panel is open, so it has to be released
    // before it can take focus.
    flushSync(() => setOpen(false));
    if (returnFocus) launcherRef.current?.focus({ preventScroll: true });
  }

  async function ask(history: Turn[]) {
    requestRef.current?.abort();
    const controller = new AbortController();
    requestRef.current = controller;

    setError(null);
    setPending(true);
    setTurns([...history, { role: "assistant", content: "" }]);

    try {
      const response = await fetch("/api/ask", {
        body: JSON.stringify({ messages: history }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        const { error: message } = await response.json().catch(() => ({ error: null }));
        throw new Error(message ?? "The assistant couldn’t answer just now. Try again in a moment.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";

      for (let chunk = await reader.read(); !chunk.done; chunk = await reader.read()) {
        answer += decoder.decode(chunk.value, { stream: true });
        const text = answer;
        setTurns([...history, { role: "assistant", content: text }]);
      }

      if (!answer.trim()) {
        throw new Error("The answer came back empty. Try asking again.");
      }
    } catch (caught) {
      if (controller.signal.aborted) return;

      // Drop the half-written answer; the question stays so Try again can resend it.
      setTurns(history);
      setError(
        caught instanceof TypeError
          ? "The connection dropped. Check your network and try again."
          : caught instanceof Error
            ? caught.message
            : "Something went wrong. Try again.",
      );
    } finally {
      if (requestRef.current === controller) {
        requestRef.current = null;
        setPending(false);
      }
    }
  }

  function answerStarter({ question, answer }: (typeof STARTERS)[number]) {
    if (pending) return;

    setError(null);
    setTurns([...turns, { role: "user", content: question }, { role: "assistant", content: answer }]);
  }

  function send(question: string) {
    const content = question.trim();
    if (!content || pending) return;

    setDraft("");
    void ask([...turns, { role: "user", content }]);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    send(draft);
  }

  // Keeps whatever has streamed in so far. An answer that had not started is
  // dropped, since the route refuses an empty turn in the history.
  function stop() {
    requestRef.current?.abort();
    requestRef.current = null;
    setPending(false);
    setTurns((current) => {
      const last = current.at(-1);
      return last?.role === "assistant" && !last.content ? current.slice(0, -1) : current;
    });
  }

  function reset() {
    stop();
    setTurns([]);
    setError(null);
    inputRef.current?.focus();
  }

  // On a phone the sheet covers the page the link opens, so it gets out of the
  // way. Focus stays with the navigation rather than jumping to the launcher.
  function onLinkFollow() {
    if (window.matchMedia(COMPACT_QUERY).matches) {
      closePanel({ returnFocus: false });
    }
  }

  const last = turns.at(-1);
  const thinking = pending && last?.role === "assistant" && last.content === "";

  return (
    <>
      {/* One container, two faces: the launcher pill and the panel. The
          transitions.dev plus to menu morph grows it from one into the other
          out of the bottom-right corner. */}
      <div className="ask-morph t-morph" data-open={String(open)}>
        <aside
          aria-labelledby="ask-title"
          className="ask-panel t-morph-menu"
          id="ask-panel"
          // Closed, the panel is still in the page, only clipped to nothing;
          // inert keeps focus and assistive tech out of it.
          inert={!open}
          onKeyDown={(event) => {
            if (event.key !== "Escape") return;
            event.preventDefault();
            closePanel();
          }}
        >
        <header className="ask-header">
          <div>
            <h2 className="title-02" id="ask-title">
              Ask about Shafiq
            </h2>
            <p className="ask-note">Answers come from Shafiq’s own notes. Claude can still get things wrong.</p>
          </div>
          <div className="ask-header-actions">
            {turns.length > 0 && (
              <button aria-label="Start a new conversation" className="ask-icon-button" onClick={reset} type="button">
                <RotateCcw aria-hidden="true" size={18} />
              </button>
            )}
            <button aria-label="Close" className="ask-icon-button" onClick={() => closePanel()} type="button">
              <X aria-hidden="true" size={20} />
            </button>
          </div>
        </header>

        {/* data-lenis-prevent hands the wheel back to the log, which smooth
            scrolling would otherwise spend on the page behind it. */}
        <div
          aria-busy={pending}
          aria-live="polite"
          className="ask-log"
          data-lenis-prevent
          ref={logRef}
          role="log"
        >
          {turns.length === 0 ? (
            <div className="ask-intro t-stagger" ref={introRef}>
              <p className="body-02 t-stagger-line t-stagger-line--1">
                Hi. Ask anything about Shafiq’s career, projects, way of working or life outside work.
              </p>
              <ul aria-label="Suggested questions" className="ask-chips">
                {STARTERS.map((starter, index) => (
                  <li className={`t-stagger-line t-stagger-line--${index + 2}`} key={starter.question}>
                    <button className="ask-chip" onClick={() => answerStarter(starter)} type="button">
                      {starter.question}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            turns.map((turn, index) =>
              turn.role === "user" ? (
                <p className="ask-question body-02" key={index}>
                  {turn.content}
                </p>
              ) : turn.content ? (
                <Answer
                  className="ask-answer body-02"
                  key={index}
                  onLinkFollow={onLinkFollow}
                  stream
                  text={turn.content}
                />
              ) : null,
            )
          )}

          {thinking && (
            <p className="ask-thinking label-02">
              <span className="sr-only">Thinking</span>
              <ThinkingLine />
            </p>
          )}

          {error && (
            <div className="ask-error body-02" role="alert">
              <Answer className="ask-error-text" onLinkFollow={onLinkFollow} text={error} />
              {last?.role === "user" && (
                <button className="ask-chip" onClick={() => void ask(turns)} type="button">
                  Try again
                </button>
              )}
            </div>
          )}
        </div>

        <form className="ask-form" onSubmit={onSubmit}>
          <label className="sr-only" htmlFor="ask-input">
            Your question
          </label>
          <input
            autoComplete="off"
            className="ask-input"
            id="ask-input"
            maxLength={MAX_QUESTION_CHARS}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Ask a question"
            ref={inputRef}
            type="text"
            value={draft}
          />
          {/* One slot, two jobs: send, and stop while an answer streams in.
              The icons cross-fade with the transitions.dev icon swap. Enter
              in the field still submits while it is a stop button, and send
              ignores that while an answer is pending. */}
          <button
            aria-label={pending ? "Stop answering" : "Send"}
            className="ask-send"
            disabled={!pending && !draft.trim()}
            onClick={pending ? stop : undefined}
            type={pending ? "button" : "submit"}
          >
            <span className="t-icon-swap" data-state={pending ? "b" : "a"}>
              <span className="t-icon" data-icon="a">
                <ArrowUp aria-hidden="true" size={18} />
              </span>
              <span className="t-icon" data-icon="b">
                <Square aria-hidden="true" fill="currentColor" size={12} />
              </span>
            </span>
          </button>
        </form>
        </aside>

        <button
          aria-controls="ask-panel"
          aria-expanded={open}
          className="ask-launcher t-morph-plus"
          inert={open}
          onClick={openPanel}
          ref={launcherRef}
          type="button"
        >
          <MessageCircle aria-hidden="true" size={18} />
          <span>Ask about Shafiq</span>
        </button>
      </div>
    </>
  );
}

// The model writes plain text: blank lines between paragraphs and "- " for
// list items. Links are recognised rather than trusted from markup, so an
// answer can never inject an arbitrary URL.
//
// With stream set, words resolve one at a time through the transitions.dev
// streaming text, each getting is-in one --stream-gap after the last. The
// counter only moves forward, so words that arrive later are already in the
// page, hidden, by the time their turn comes, and their transition runs.
function Answer({
  text,
  onLinkFollow,
  stream = false,
  className,
}: {
  text: string;
  onLinkFollow: () => void;
  stream?: boolean;
  className?: string;
}) {
  const [revealed, setRevealed] = useState(stream ? 0 : Number.POSITIVE_INFINITY);
  const rootRef = useRef<HTMLDivElement>(null);

  // No dependency list on purpose: every render re-checks, so the reveal picks
  // back up whenever more of the answer streams in.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || revealed >= root.querySelectorAll(".t-stream-w").length) return;

    // Read from the answer, not :root, so the panel's own tuning applies.
    const gap = durationMs(getComputedStyle(root).getPropertyValue("--stream-gap"), 60);
    const timer = window.setTimeout(() => setRevealed((count) => count + 1), gap);
    return () => window.clearTimeout(timer);
  });

  let wordCount = 0;
  const words = (parts: ReactNode[]): ReactNode[] =>
    stream
      ? parts.flatMap((part) => {
          if (typeof part !== "string") return [word(part)];
          return part
            .split(/(\s+)/)
            .filter(Boolean)
            .map((piece) => (/^\s+$/.test(piece) ? piece : word(piece)));
        })
      : parts;
  const word = (content: ReactNode) => {
    const index = wordCount++;
    return (
      <span className={index < revealed ? "t-stream-w is-in" : "t-stream-w"} key={`w${index}`}>
        {content}
      </span>
    );
  };

  // Runs of list lines become one list and runs of other lines one paragraph,
  // so "Recent work:" directly above its items still reads as a lead-in.
  const runs: { list: boolean; lines: string[] }[] = [];

  for (const block of text.trim().split(/\n{2,}/)) {
    let current: (typeof runs)[number] | undefined;

    for (const line of block.split("\n").filter((line) => line.trim())) {
      const list = LIST_ITEM.test(line);

      if (current?.list !== list) {
        current = { list, lines: [] };
        runs.push(current);
      }

      current.lines.push(list ? line.replace(LIST_ITEM, "") : line);
    }
  }

  return (
    <div className={className} ref={rootRef}>
      {runs.map(({ list, lines }, runIndex) =>
        list ? (
          <ul key={runIndex}>
            {lines.map((line, lineIndex) => (
              <li key={lineIndex}>{words(linkify(line, onLinkFollow))}</li>
            ))}
          </ul>
        ) : (
          <p key={runIndex}>
            {lines.map((line, lineIndex) => (
              <Fragment key={lineIndex}>
                {lineIndex > 0 && <br />}
                {words(linkify(line, onLinkFollow))}
              </Fragment>
            ))}
          </p>
        ),
      )}
    </div>
  );
}

const THINKING_STATES = ["Reading Shafiq’s notes", "Finding the right details", "Writing an answer"];

// The sizer holds the widest state so the box never resizes mid-swap.
const THINKING_SIZER = THINKING_STATES.reduce((widest, state) => (state.length > widest.length ? state : widest));

// Thinking states from transitions.dev: the line shimmers while it holds, then
// swaps to the next. The text spans are made here, as in the library's
// orchestration, rather than rendered, so React never reconciles nodes the
// cycle has already removed. It stops on the last state instead of looping:
// going back to "Reading" after "Writing" would read as starting over.
function ThinkingLine() {
  const boxRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    const timers = new Set<number>();
    const later = (run: () => void, delay: number) => {
      const timer = window.setTimeout(() => {
        timers.delete(timer);
        run();
      }, delay);
      timers.add(timer);
    };
    const ms = (name: string, fallback: number) =>
      durationMs(getComputedStyle(document.documentElement).getPropertyValue(name), fallback);
    const line = (text: string, entering: boolean) => {
      const span = document.createElement("span");
      span.className = entering ? "t-think-text is-enter-start" : "t-think-text";
      span.textContent = text;
      span.setAttribute("data-text", text);
      box.appendChild(span);
      return span;
    };

    let index = 0;
    let live = line(THINKING_STATES[0], false);

    const cycle = () =>
      later(() => {
        if (index === THINKING_STATES.length - 1) return;

        const swap = ms("--think-swap", 150);
        const gap = ms("--think-gap", 50);
        const leaving = live;
        index += 1;

        leaving.classList.add("is-exit");
        const next = line(THINKING_STATES[index], true);
        live = next;

        const release = () => {
          void next.offsetWidth; // flush the enter-start rest state
          next.classList.remove("is-enter-start");
        };
        if (gap > 0) later(release, gap);
        else release();

        later(() => {
          leaving.remove();
          cycle();
        }, swap + gap);
      }, ms("--think-hold", 2000));

    cycle();

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      box.querySelectorAll(".t-think-text").forEach((span) => span.remove());
    };
  }, []);

  return (
    <span aria-hidden="true" className="t-think" ref={boxRef}>
      <span className="t-think-sizer">{THINKING_SIZER}</span>
    </span>
  );
}

const LIST_ITEM = /^\s*[-•*]\s+/;

function linkify(line: string, onLinkFollow: () => void): ReactNode[] {
  const parts: ReactNode[] = [];
  let cursor = 0;

  for (const match of line.matchAll(LINK_PATTERN)) {
    const [whole, path, email, linkedin] = match;
    const start = match.index;

    parts.push(line.slice(cursor, start));

    if (path) {
      parts.push(
        <NextLink href={path} key={start} onClick={onLinkFollow}>
          {whole}
        </NextLink>,
      );
    } else if (email) {
      parts.push(
        <a href={`mailto:${email}`} key={start}>
          {whole}
        </a>,
      );
    } else if (linkedin) {
      parts.push(
        <a href="https://www.linkedin.com/in/shafiq-effendy/" key={start} rel="noreferrer" target="_blank">
          {whole}
        </a>,
      );
    }

    cursor = start + whole.length;
  }

  parts.push(line.slice(cursor));
  return parts;
}
