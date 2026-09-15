import { ArrowLeft, ClockFading, Diamond, MonitorPlay, WifiOff, Workflow } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import { Link, ScrollReveal, Tag } from "../components";

// Written out plainly and encoded here, rather than hand-encoding the URLs: the
// spaces still need escaping for hosts that do not normalise them, but the
// names stay readable and can be checked against the files on disk at a glance.
const UX_DIRECTORY = "/projects/Cekap/UX";
const ux = (file: string) => `${UX_DIRECTORY}/${encodeURIComponent(file)}`;

const HEATMAP = ux("Competitive Landscape Heatmap.png");
const PERSONA_SPECTRUM = ux("Inclusive Design.png");

const meta = [
  ["Role", "Research, UX, Design System & Front-end"],
  ["Team", "Self-Initiated Project"],
  ["Timeline", "May 2026 - Present"],
  ["Status", "v1 built, not yet tested with travellers"],
  ["Design", "Figma, EPDS tokens"],
  ["Build", "Expo React Native, Claude Code"]
];

// Weight is carried by the tag tone as well as the word, so a claim's strength
// survives a skim.
const claims = [
  {
    claim: "Guidance is the thin layer.",
    weight: "High confidence",
    tone: "success" as const,
    source: "from the landscape review",
  },
  {
    claim: "Stress degrades the ability to use these systems.",
    weight: "Medium",
    tone: "warning" as const,
    source: "from literature and one very specific Tuesday",
  },
  {
    claim: "Family wants permission-based visibility.",
    weight: "Low",
    tone: "danger" as const,
    source: "my own experience wearing a costume",
  },
];

const barriers = [
  ["Permanent", "low vision, one-handed use"],
  ["Temporary", "post-surgery pain, a baby on one arm"],
  ["Situational", "late, unfamiliar terminal, four percent battery"],
];

// figure is only set on the call that has screens to show, so the type is
// declared rather than inferred from the mixed literal.
const calls: { title: string; body: string; figure?: ReactNode }[] = [
  {
    title: "Manual checkpoints over sensing.",
    body: "I looked at GPS, beacons and continuous location, then left all three out. Manual confirmation survives a dead network and a stale feed, avoids a location trail I would have to secure and explain, and hands back a small win at each step. The flaw is obvious: a stressed person forgets to tap. So confirmation sits on the lock screen, with fallback to the last confirmed point. Sensing earns v2 only if testing proves the tap is a real barrier.",
  },
  {
    title: "Offline is a connection state, not a truth state.",
    body: "Losing signal does not make saved information wrong. It means the app cannot see what changed. Five confidence states carry that: confirmed, live, likely, last known, unconfirmed. Advice turns conservative as data ages. On reconnect, a change gets announced, never quietly swapped.",
    // The one call with screens to show, so the placeholder belongs here rather
    // than after the group.
    figure: (
      <Placeholder
        icon={<WifiOff height={20} width={20} />}
        label="Offline and reconnect screens"
        note="Illustration in progress"
        ratio="2 / 1"
      />
    ),
  },
  {
    title: "Shared Awareness stays out.",
    body: "The emotionally obvious feature carries the highest infrastructure cost, the highest privacy risk and my weakest evidence. Better a narrow v1 I understand.",
  },
];

const predictions = [
  "I made it too calm and someone misses the urgency.",
  "Saved information reads as current unless the timestamp is unmissable.",
  "Someone opens the airline app first.",
];

/** A finished illustration, sized from its own pixels so nothing is cropped. */
function Figure({
  alt,
  caption,
  height,
  scrollable = false,
  src,
  width,
}: {
  alt: string;
  caption: string;
  height: number;
  /** Lets a dense illustration pan sideways on phones instead of shrinking
      below the point where its labels can be read. */
  scrollable?: boolean;
  src: string;
  width: number;
}) {
  return (
    <ScrollReveal
      className={`case-study-media${scrollable ? " case-study-media-scroll" : ""}`}
    >
      <figure className="case-study-media-figure">
        <div className="case-study-media-frame">
          <Image
            alt={alt}
            height={height}
            sizes="(max-width: 1128px) 100vw, 1080px"
            src={src}
            width={width}
          />
        </div>
        <figcaption className="case-study-media-caption">{caption}</figcaption>
      </figure>
    </ScrollReveal>
  );
}

/** A slot held open for work that is still in progress, labelled as such so a
    reader can tell a missing illustration from one that looks unfinished. */
function Placeholder({
  caption,
  icon,
  label,
  measure = false,
  note,
  ratio,
}: {
  caption?: string;
  icon: ReactNode;
  label: string;
  /** Holds the slot to the reading measure instead of breaking out wider. */
  measure?: boolean;
  note: string;
  /** CSS aspect-ratio for the slot. Defaults to 16 / 9. */
  ratio?: string;
}) {
  return (
    <ScrollReveal
      className={`case-study-media${measure ? " case-study-media-measure" : ""}`}
    >
      <figure className="case-study-media-figure">
        <div className="case-study-placeholder" style={ratio ? { aspectRatio: ratio } : undefined}>
          <span aria-hidden="true" className="case-study-placeholder-icon">
            {icon}
          </span>
          <span className="case-study-placeholder-label">{label}</span>
          <span className="caption">{note}</span>
        </div>
        {caption && <figcaption className="case-study-media-caption">{caption}</figcaption>}
      </figure>
    </ScrollReveal>
  );
}

export default function CekapPage() {
  return (
    // The wrapper moves onto each section so the banner between them can run
    // the full width of the viewport.
    <main className="case-study flex-1 bg-(--white) text-(--text-primary)">
      <section className="wrapper px-6 pt-16 pb-12 sm:px-10">
        {/* <Link href="/" leadingIcon={<ArrowLeft size={16} />} type="standalone">
          Back home
        </Link> */}
          <div>
              <div className="flex flex-wrap gap-1 items-center gap-3">
                <h1 className="display">CEKAP</h1>
                <Tag icon={<ClockFading height={15} width={15} />} size="medium" tone="warning">
                  On Going
                </Tag>    
              </div>
              <p className="m-0 body-01">
                Airport guidance for the day you have the least capacity to think
              </p>
          </div>
      </section>

      <ScrollReveal className="case-study-banner">
        <Image
          alt="CEKAP flight companion screens"
          fill
          priority
          sizes="100vw"
          src="/projects/Cekap/Cover.png"
        />
      </ScrollReveal>

      <section className="wrapper px-6 pt-12 pb-16 sm:px-10">
        <ScrollReveal>
          <dl className="grid gap-6 sm:grid-cols-3">
            {meta.map(([term, value]) => (
              <div key={term}>
                <dt className="label-02 text-(--text-secondary)">{term}</dt>
                <dd className="body-02 mt-1">{value}</dd>
              </div>
            ))}
          </dl>
        </ScrollReveal>

        <article className="case-study-section">
          <ScrollReveal>
            <h2 className="title-02">Try it first</h2>
          </ScrollReveal>
          <Placeholder
            caption="Set the pace, then take it offline. That is where the decisions live."
            icon={<MonitorPlay height={20} width={20} />}
            label="Live demo"
            measure
            note="Coded slice in progress"
            ratio="16 / 10"
          />
        </article>

        <article className="case-study-section">
          <ScrollReveal>
            <h2 className="title-02">Why I built it</h2>
            <p className="case-study-copy mt-4">
              March 2025. Weeks after surgery for a herniated disc, I flew from KLIA2 with my
              sister. We dropped bags upstairs, went down to sit because sitting was the whole
              point of my recovery, then misjudged the walk back. We hit security ten minutes past
              the line. The flight left without us.
            </p>
            <p className="case-study-quote mt-6">
              The closed gate was not the hard part. Not knowing what to do next was.
            </p>
            <p className="case-study-copy mt-6">
              One bad day is a question, not a problem. So I went looking for evidence against my
              own story.
            </p>
          </ScrollReveal>
        </article>

        <article className="case-study-section">
          <ScrollReveal>
            <h2 className="title-02">What held up, and what did not</h2>
            <p className="case-study-copy mt-4">
              I mapped seven products across nine capabilities: both KLIA terminals, MYairports,
              Malaysia Airlines, AirAsia MOVE, Batik Air, Firefly.
            </p>
            <p className="case-study-copy mt-6">
              Information is everywhere. Guidance is not. Nothing tells you whether to sit down or
              start walking. Timing rules also sit in separate systems. Malaysia Airlines closes
              counters at 60 minutes and gates at 30. AirAsia closes bag drop at 60 and gates at
              20. Combining those with security, immigration and the walk is left to the traveller.
            </p>
          </ScrollReveal>

          <Figure
            alt="Heatmap scoring existing systems against traveller capabilities. Rows are airport gate updates, the MYairports app, Malaysia Airlines, AirAsia MOVE, Batik Air Malaysia and Firefly. Columns run from flight information and check-in through terminal navigation, mobility and assistance, cognitive load support, recovery guidance and shared journey awareness. Flight information and check-in are green across almost every system; cognitive load support, recovery guidance and shared journey awareness are orange to red across all of them."
            caption="Every system is strong on information and weak in the same place. The columns that matter on a bad day — cognitive load, recovery, shared awareness — are red almost the whole way down."
            height={998}
            scrollable
            src={HEATMAP}
            width={2800}
          />

          <ScrollReveal>
            <p className="case-study-copy mt-8">My claims, labelled by weight:</p>
            <ul className="case-study-list mt-4">
              {claims.map(({ claim, weight, tone, source }) => (
                <li className="case-study-claim" key={claim}>
                  <Tag showIcon={false} size="small" tone={tone}>
                    {weight}
                  </Tag>
                  <span className="case-study-copy">
                    {claim} <span className="text-(--text-secondary)">{source}</span>.
                  </span>
                </li>
              ))}
            </ul>
            <p className="case-study-copy mt-6">
              That last one is why Shared Awareness is not in v1.
            </p>
          </ScrollReveal>
        </article>

        <article className="case-study-section">
          <ScrollReveal>
            <h2 className="title-02">The decision the product rests on</h2>
            <p className="case-study-copy mt-4">
              Airline deadline, your pace, your last confirmed checkpoint, and how stale the data
              has gone. Those four resolve to one next action.
            </p>
            <p className="case-study-copy mt-6">
              Every screen answers three questions. Where am I. What now. Is stopping safe.
            </p>
          </ScrollReveal>
          <Placeholder
            icon={<Workflow height={20} width={20} />}
            label="Core mechanism"
            note="Illustration in progress"
            ratio="5 / 2"
          />
        </article>

        <article className="case-study-section">
          <ScrollReveal>
            <h2 className="title-02">Three calls I would defend in a review</h2>
          </ScrollReveal>
          {calls.map(({ title, body, figure }) => (
            <div key={title}>
              <ScrollReveal className="mt-8">
                <h3 className="case-study-subhead">{title}</h3>
                <p className="case-study-copy mt-3">{body}</p>
              </ScrollReveal>
              {figure}
            </div>
          ))}
        </article>

        <article className="case-study-section">
          <ScrollReveal>
            <h2 className="title-02">Designing for the day people are least capable</h2>
            <p className="case-study-copy mt-4">
              One capability: reading a status and acting on it while moving.
            </p>
            <ul className="case-study-list mt-4">
              {barriers.map(([kind, examples]) => (
                <li className="case-study-claim" key={kind}>
                  {/* A plain label rather than a Tag: these three are a
                      vocabulary, not a rating, and tag-neutral is the same grey
                      as the page behind it. */}
                  <span className="case-study-claim-label">{kind}</span>
                  <span className="case-study-copy">{examples}</span>
                </li>
              ))}
            </ul>
            <p className="case-study-copy mt-6">
              One design covers all three. One message at a time. Status in colour, icon and words
              together. 4.5:1 body text, 3:1 components. Thumb reach, reduced motion, screen-reader
              labels in the code. WCAG 2.2 AA through POUR.
            </p>
            <p className="case-study-copy mt-6">
              I did not arrive here from a checklist. I arrived as the temporary case.
            </p>
          </ScrollReveal>

          <Figure
            alt="A spectrum from narrowed to broader across three groups. Long-term conditions covers mobility limitations and sensory impairments, tagged permanent. Short-term challenges covers recovery after surgery and physical tiredness, tagged temporary. Context-dependent needs covers time pressure, unfamiliar surroundings and ADHD-related distraction and overload, tagged situational."
            caption="The same capability, reached three ways. Designing for the permanent case is what makes the temporary and situational ones work."
            height={995}
            src={PERSONA_SPECTRUM}
            width={2400}
          />
        </article>

        <article className="case-study-section">
          <ScrollReveal>
            <h2 className="title-02">What I built</h2>
            <p className="case-study-copy mt-4">
              The v1 spine: flight import and masking, pace and privacy setup, a nine-checkpoint
              timeline, Rest Windows, priority alerts, offline save with refresh on reconnect,
              recovery from last-known and unknown states, widget and lock-screen views.
            </p>
            <p className="case-study-copy mt-6">
              The design system grew out of what repeated rather than getting drawn up front. A
              pattern here carries content rules and state changes, not a saved layout.
            </p>
            <p className="case-study-copy mt-6">
              I took the timeline into code against EPDS tokens instead of stopping at Figma. Focus
              behaviour, real contrast and interaction timing surface problems a static frame
              hides.
            </p>
          </ScrollReveal>
        </article>

        <article className="case-study-section">
          <ScrollReveal>
            <h2 className="title-02">The strongest argument against building it</h2>
            <p className="case-study-copy mt-4">
              Adoption. People already carry an airline app, an email, a wallet pass and airport
              screens. Cekap asks for setup ahead of a journey that usually goes fine. A tool built
              for the worst day gets ignored on the ordinary ones.
            </p>
            <p className="case-study-copy mt-6">
              The honest read: this belongs to an airport operator or an airline, close to the
              operational data. Built independently, it has a ceiling I cannot design past.
            </p>
            <p className="case-study-copy mt-6">
              The bet is short setup and a product that lives on the lock screen. If testing shows
              people reach for the airline app first, the concept changes.
            </p>
          </ScrollReveal>
        </article>

        <article className="case-study-section">
          <ScrollReveal>
            <h2 className="title-02">How I would know it works</h2>
            <p className="case-study-copy mt-4">
              Three moderated think-aloud tasks: decide whether resting is safe, interpret a
              departure change after reconnecting, find the way forward after a missed flight. I
              track whether rest-or-move calls are correct, whether saved information reads as
              current, and how often confirmations get skipped. SUS, plus AttrakDiff because calm
              is part of the claim.
            </p>
            <p className="case-study-copy mt-6">Predictions logged before session one:</p>
            <ul className="case-study-list case-study-list-bulleted mt-4">
              {predictions.map((prediction) => (
                <li className="case-study-copy" key={prediction}>
                  {prediction}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </article>

        <article className="case-study-section">
          <ScrollReveal>
            <h2 className="title-02">Where this stands</h2>
          </ScrollReveal>
          <Placeholder
            icon={<Diamond height={20} width={20} />}
            label="Double diamond status"
            note="Illustration in progress"
            ratio="5 / 2"
          />
          <ScrollReveal>
            <p className="case-study-copy mt-8">
              Two kinds of unfinished, kept apart. Interviews, the diary study and JTBD sessions
              are on hold because recruitment fell through twice. Sensing, focus support and Shared
              Awareness are deferred on purpose, to keep v1 provable.
            </p>
            <p className="case-study-copy mt-6">
              What I would change: I tied evaluative testing to the same hard-to-reach sample as
              the generative work and stalled both. Splitting them let the prototype move.
            </p>
            <p className="case-study-copy mt-6">
              Desk research shows the problem exists. Real behaviour still needs people.
            </p>
          </ScrollReveal>
        </article>
      </section>
    </main>
  );
}
