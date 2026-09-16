import type { Metadata } from "next";
import {
  CaseStudyFeature,
  CaseStudyHero,
  CaseStudyIndex,
  CaseStudyMeta,
  CaseStudySection,
  CaseStudyStat,
  ImageLightbox,
  ScrollReveal,
  projectAsset,
} from "../components";

export const metadata: Metadata = {
  title: "CEKAP — Shafiq Efféndy",
};

const ux = (file: string) => projectAsset("Cekap/UX", file);

const meta: [string, string][] = [
  ["Role", "Research, UX, design system, front end"],
  ["Timeline", "May 2026 - Present"],
  ["Team", "Self-Initiated Project"],
  ["Status", "v1 built, not yet tested with travellers"],
  ["Design", "Figma"],
  ["Build", "Expo React Native, Claude Code"],
];

const call = (file: string) => projectAsset("Cekap/Calls", file);

// Every call screenshot is exported at the same size.
const CALL_SCREEN = { width: 4096, height: 2304 };

const calls = [
  {
    title: "Manual checkpoints over sensing",
    body: "GPS is unreliable around large terminal buildings, and continuous location creates a trail I would have to secure and explain. Manual confirmation survives a dead network and hands back a small win at each step. The flaw is obvious, a stressed person forgets to tap, so confirmation sits on the lock screen with fallback to the last confirmed point.",
    image: {
      ...CALL_SCREEN,
      src: call("Manual Checkpoints.png"),
      alt: "A phone lock screen showing a CEKAP live activity: on track, step 1 of 8, next check in online, with a Mark as Complete button.",
    },
  },
  {
    title: "Offline is a connection state, not a truth state",
    body: "Losing signal does not make saved information wrong. It means the app cannot see what changed. Five states carry that distinction: confirmed, live, likely, last known, unconfirmed. Advice turns conservative as data ages, and on reconnect a change is announced rather than quietly swapped.",
    image: {
      ...CALL_SCREEN,
      src: call("Offline State.png"),
      alt: "Two CEKAP screens while offline. One flags a delayed flight under a You're offline banner. The other explains the saved journey is available but flight and gate changes cannot be confirmed, last updated at 8:15 AM.",
    },
  },
  {
    title: "A Rest Window after every completed checkpoint",
    body: "Clearing a checkpoint is the moment a tired traveller most wants to sit down and least knows whether they can. So every completed step returns a Rest Window: how long you can safely pause before the next deadline bites, calculated from your own pace rather than an average walker. It answers the question my own missed flight failed on, without the traveller having to ask.",
    image: {
      ...CALL_SCREEN,
      src: call("Rest Window.png"),
      alt: "Three Rest Window screens counting 5, 16 and 9 minutes. The centre one confirms arrival at KLIA Terminal 1 and lists nearby surau, toilets and seating.",
    },
  },
];

const metrics = [
  {
    value: "3",
    title: "Tasks in the test plan",
    body: "Decide whether resting is safe. Read a departure change after reconnecting. Find the way forward after a missed flight.",
  },
  {
    value: "4",
    title: "Signals I would track",
    body: "Correct rest-or-move calls, whether saved data reads as current, skipped confirmations, plus SUS and AttrakDiff because calm is part of the claim.",
  },
  {
    value: "3",
    title: "Predictions logged before session one",
    body: "I made it too calm and someone misses the urgency. Saved information reads as current. Someone opens the airline app first.",
  },
  {
    value: "0",
    title: "Travellers tested so far",
    body: "Recruitment fell through twice. There are no results here and I am not going to imply otherwise.",
    // The number the other three are waiting on.
    emphasis: true,
  },
];

/** An illustration sized from its own pixels, so nothing is cropped. Runs edge
    to edge; click to open it full screen. */
function Figure({
  alt,
  height,
  src,
  width,
}: {
  alt: string;
  height: number;
  src: string;
  width: number;
}) {
  return (
    <ScrollReveal className="case-study-media">
      <figure className="case-study-media-figure">
        <div className="case-study-media-frame">
          <ImageLightbox
            alt={alt}
            height={height}
            sizes="100vw"
            src={src}
            width={width}
          />
        </div>
      </figure>
    </ScrollReveal>
  );
}

export default function CekapPage() {
  return (
    <main className="case-study flex-1 bg-(--white) text-(--text-primary)">
      <div className="wrapper px-6 pt-16 pb-16 sm:px-10">
        <CaseStudyHero
          lede="Airport guidance for the day you have the least capacity to think."
          title="CEKAP"
        />

        <ScrollReveal className="case-study-figure case-study-cover mt-6">
          <ImageLightbox
            alt="CEKAP flight companion screens"
            height={2304}
            preload
            sizes="(max-width: 660px) 100vw, 600px"
            src={projectAsset("Cekap", "Cover.png")}
            width={4096}
          />
        </ScrollReveal>

        <CaseStudyMeta items={meta} />

        <CaseStudySection
          copy="March 2025. Weeks after surgery for a herniated disc, I flew from KLIA2 with my sister. We dropped bags upstairs, went down to sit because sitting was the whole point of my recovery, then misjudged the walk back. We hit security ten minutes past the line. The flight left without us."
          title="Where it starts. The closed gate was not the hard part."
        />

        <CaseStudySection
          copy="Airport journeys are planned around an average person: average pace, attention, confidence and ability to stand and walk. Real capacity moves. It can be permanent, like a mobility or sensory condition. Temporary, like recovering from surgery. Or situational, like rushing through an unfamiliar terminal with bags on both arms. The design has to serve reduced capacity without asking anyone to diagnose themselves first."
          title="There is no “average” traveller"
        >
          <Figure
            alt="A grid of four abilities, move, hear, see and focus, across permanent, temporary and situational limits, running from few people affected to more. Move: wheelchair user, recovering from knee surgery, pushing a trolley with two cases. Hear: deaf traveller, ear infection, missing a gate announcement in a noisy hall. See: low vision, forgot glasses at home, glare on a phone screen near terminal windows. Focus: low vision, exhaustion after a red-eye flight, running late in a crowded, unfamiliar terminal. About 1.3 billion people live with significant disability, 1 in 6 worldwide (WHO, 2023)."
            height={2127}
            src={ux("Inclusive_Design.png")}
            width={4096}
          />
        </CaseStudySection>

        <CaseStudySection
          copy={[
            "I mapped seven products across nine capabilities: MYairports, Malaysia Airlines, AirAsia MOVE, Batik Air and Firefly.",
            "Information is everywhere. Flight status, check-in, maps and boarding details are covered several times over. The gap opens after the information arrives. A traveller can know the gate and the departure time and still not know whether they can sit down, whether the queue is turning risky, or which task matters first.",
            "That moved the concept away from another airport app and towards a thin layer that interprets what already exists.",
          ]}
          title="What the existing ecosystem already does well"
        >
          <Figure
            alt="A heatmap of seven airport and airline products across nine capabilities. Every product covers information well, and coverage falls away for cognitive load, recovery and shared awareness."
            height={1349}
            src={ux("Landscape_Gap_Heatmap.png")}
            width={4096}
          />
        </CaseStudySection>

        <CaseStudySection
          copy={[
            "Interviews fell through twice. Rather than let one bad day stand in for research, I ran a structured desk pass and graded every source by what it could actually support. Official pages establish timing rules. News reports document specific incidents. Reviews and forums show failure patterns but never how often they happen.",
            "Five things held up. Walking distances are long enough that Malaysia Airports added buggies and travelators. Terminal 1 and Terminal 2 are separate journeys, and booking platforms often show only Kuala Lumpur International. A single failure cascades, as in the 2023 Aerotrain breakdown that stranded 114 passengers, ten of whom reportedly missed flights. Queues resist estimation, with a 2025 autogate failure producing reported two-hour waits. And the timing rules live in separate systems: Malaysia Airlines closes counters at 60 minutes and gates at 30, AirAsia closes bag drop at 60 and gates at 20, and combining those with security, immigration and the walk is left entirely to the traveller.",
            "What this cannot tell me is how often any of it happens, which problem causes the most stress, or whether anyone would install a companion app. That needs people, not better sourcing.",
          ]}
          title="What reported experiences suggest"
        />

        <CaseStudySection
          copy="Airline deadline, chosen pace, last confirmed checkpoint, and how stale the data has gone. Those four produce one prioritised next step, and every screen answers the same three questions: where am I, what now, is stopping safe. It is built for a single capability, reading a status and acting on it while moving, which is what makes the permanent case, the post-surgery case and the four-percent-battery case the same design problem."
          title="The solution. Four inputs resolve to one next action."
        />

        <CaseStudySection title="Three calls I would defend in a review.">
          <div className="grid gap-4">
            {calls.map(({ title, body, image }) => (
              <CaseStudyFeature image={image} key={title} title={title}>
                {body}
              </CaseStudyFeature>
            ))}
          </div>
        </CaseStudySection>

        <CaseStudySection
          copy="The prototype is built in Figma and Expo. It is not yet tested with travellers, but it is ready for user testing and iteration."
          title="The prototype, in Figma and in code."
        />

        <CaseStudySection title="Metrics. What I would measure, and what I have.">
          <div className="grid gap-4 sm:grid-cols-2">
            {metrics.map(({ value, title, body, emphasis }) => (
              <CaseStudyStat emphasis={emphasis} key={title} title={title} value={value}>
                {body}
              </CaseStudyStat>
            ))}
          </div>
        </CaseStudySection>

        <CaseStudySection
          copy={[
            "Desk research suggests the problem exists. It cannot show how often, or how people behave under stress. Travellers already carry an airline app, a wallet pass and their own checklist, so the open question is whether Cekap earns a place beside them.",
            "Shared Awareness, letting someone trusted follow the journey, is the feature people react to most and the one I cut. It carries the highest infrastructure cost, the highest privacy risk and my weakest evidence, so it waits until the manual journey is proven.",
            "Next, I’ll validate the concept through five think aloud sessions, targeted re tests, and a core task comparison with an existing airline product. I’ll also test offline recovery, finalise the key flows in Figma and code, complete the POUR review, and revisit the problem definition based on what I learn.",
          ]}
          title="What is next, and what could sink it."
        />
      </div>
      <CaseStudyIndex />
    </main>
  );
}
