// DEPRECATED: the story-layout CEKAP case study, parked 2026-11-12 so the
// original page can be shown. Lives in a private (_) folder, so it is not
// routed. To bring it back, move it over app/cekap/page.tsx and fix the
// "../../components" import paths to "../components".

import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  CaseStudyChapter,
  CaseStudyFacts,
  CaseStudyIndex,
  CaseStudyPoints,
  CaseStudyPullQuote,
  CaseStudyRow,
  CaseStudyStatement,
  CaseStudyStoryFigure,
  CaseStudyTable,
  CaseStudyTopic,
  ImageLightbox,
  ScrollReveal,
  Tag,
  projectAsset,
} from "../../components";
import type { TagTone } from "../../components";

export const metadata: Metadata = {
  title: "CEKAP — Shafiq Efféndy",
};

const ux = (file: string) => projectAsset("Cekap/UX", file);
const call = (file: string) => projectAsset("Cekap/Calls", file);

// Every phone screen is exported at the same size.
const SCREEN = { width: 4096, height: 2304 };

const facts: [string, ReactNode][] = [
  ["Role", "Solo UX and product designer, researcher, front end"],
  ["Timeline", "May 2026 – Present"],
  ["Context", "KLIA Terminals 1 and 2"],
  ["Type", "Self-initiated concept"],
  ["Built with", "Figma, Expo React Native, Claude Code"],
  [
    "Files",
    <>
      <a href="https://www.figma.com/design/BZzWi7AIm9Ac9SekhqBd6Y/Cekap---The-v1-Spine?node-id=77-2658">
        Figma design
      </a>
      {" · "}
      <a href="https://github.com/ghafeq/goshi">Design system</a>
    </>,
  ],
];

const source = (href: string, label: string) => (
  <a href={href} rel="noreferrer" target="_blank">
    {label}
  </a>
);

const findings = [
  {
    title: "The walk is long enough to be a known problem",
    body: (
      <>
        Terminal 2 has several piers and a 300-metre Skybridge. Malaysia Airports added free buggies
        and more travelators in response to walking-distance complaints.{" "}
        {source("https://www.malaymail.com/news/travel/2014/10/13/klia-2-receives-further-upgrades/762881", "Malay Mail, 2014")}
      </>
    ),
  },
  {
    title: "Two terminals, one airport name",
    body: (
      <>
        Terminal 1 and 2 are separate journeys by train, shuttle or road, while booking platforms
        often show only “Kuala Lumpur International”.{" "}
        {source("https://www.fcmtravel.com/en-my/travel-insights/travel-hub/insights/klia-vs-klia2-avoid-common-kuala-lumpur-business-travel-mistake", "FCM Travel")}
      </>
    ),
  },
  {
    title: "One failure cascades",
    body: (
      <>
        A 2023 Aerotrain breakdown stranded 114 passengers between buildings; ten reportedly missed
        their flights.{" "}
        {source("https://theedgemalaysia.com/node/695227", "The Edge, 2023")}
      </>
    ),
  },
  {
    title: "Queues resist a timetable",
    body: (
      <>
        A 2025 autogate failure produced reported two-hour waits at Terminal 1. A reasonable-looking
        buffer can disappear quickly.{" "}
        {source("https://www.nst.com.my/news/nation/2025/07/1247220/foreign-travellers-caught-guard-autogate-glitch-causes-long-queues-klia", "NST, 2025")}
      </>
    ),
  },
  {
    title: "The traveller does the maths",
    body: (
      <>
        Malaysia Airlines closes counters at 60 minutes and gates at 30. AirAsia closes bag drop at
        60 and gates at 20. Adding security, immigration and the walk is left to the traveller.{" "}
        {source("https://www.malaysiaairlines.com/hq/en/travel-info/check-in.html", "Malaysia Airlines")}
      </>
    ),
  },
  {
    title: "Apps fail with the systems behind them",
    body: (
      <>
        MYairports was unserviceable in the 2019 systems disruption, and the 2024 global outage
        pushed Terminal 2 back to manual check-in.{" "}
        {source("https://www.nst.com.my/news/nation/2024/07/1079067/klia2-faces-chaos-amid-global-it-outage-watch", "NST, 2024")}
      </>
    ),
  },
];

type Confidence = "High" | "Medium" | "Low";

const CONFIDENCE_TONE: Record<Confidence, TagTone> = {
  High: "success",
  Medium: "warning",
  Low: "neutral",
};

const confidence = (level: Confidence) => (
  <Tag size="small" tone={CONFIDENCE_TONE[level]}>
    {level}
  </Tag>
);

export default function CekapPage() {
  return (
    <main className="case-study case-study-story flex-1 bg-(--app-layer-background) text-(--text-primary)">
      <div className="case-study-story-wrapper pt-6 pb-16">
        <ScrollReveal className="case-study-story-cover">
          <div className="case-study-story-frame">
            <ImageLightbox
              alt="CEKAP flight companion screens fanned out: the lock screen, a checklist before leaving, the next checkpoint to confirm arrival at KLIA Terminal 1, and a 16-minute Rest Window."
              height={2304}
              preload
              sizes="(max-width: 1024px) 100vw, 923px"
              src={projectAsset("Cekap", "Cover.png")}
              width={4096}
            />
          </div>
        </ScrollReveal>

        <CaseStudyStatement
          name="CEKAP"
          title="Airport guidance for the day you have the least capacity to think."
        />

        <CaseStudyFacts items={facts} />

        <CaseStudyChapter
          copy={[
            "An airport gives you plenty of information. On a bad day you still cannot answer the one thing that matters: what do I do next?",
            "CEKAP is a calm, checkpoint-based layer that sits beside KLIA’s existing systems rather than replacing them. It starts the night before a flight and runs to the gate, including the untidy parts: poor signal, a delay, a gate change, a missed flight.",
          ]}
          label="Overview"
          title="What should a stressed traveller do next?"
        >
          <CaseStudyPoints
            items={[
              {
                title: "Lived experience",
                body: "My own missed flight. The spark for the project, not the proof. Complete.",
              },
              {
                title: "Landscape review",
                body: "Seven products across nine capabilities. Is there a gap across the system? Complete.",
              },
              {
                title: "Desk research",
                body: "Official rules, news reports and reviews, each graded by what it can support. Complete.",
              },
            ]}
          />

          <CaseStudyTopic
            copy={[
              "March 2025, weeks after surgery for a herniated disc, I flew from KLIA2 with my sister. We dropped our bags on Level 3, then went down to Level 1 to rest, because sitting was the whole point of my recovery.",
              "We stayed too long, underestimated the security queue and arrived about ten minutes late. The flight left without us. What I remember is not the closed gate. It is what came after: exhausted, embarrassed, and no clear idea what to do next.",
            ]}
            title="Problem: the closed gate was not the hard part."
          />

          <CaseStudyTopic
            copy="One person having one difficult day is not a product case, even when that person is me. So I wrote a hypothesis to test rather than a story to dress up."
            title="Opportunity: the information exists. Turning it into action does not."
          >
            <CaseStudyPullQuote>
              Airport stress is not always caused by missing information. Sometimes the information
              exists, but a tired traveller cannot turn it into the right action quickly enough.
            </CaseStudyPullQuote>
          </CaseStudyTopic>
        </CaseStudyChapter>

        <CaseStudyChapter
          copy="Airline deadline, chosen pace, last confirmed checkpoint, and how stale the data has gone. Those four produce one prioritised next step, and every screen answers the same three questions: where am I, what now, is stopping safe."
          label="Solution"
          title="Four inputs resolve to one safe next action."
        >
          <CaseStudyStoryFigure
            image={{
              ...SCREEN,
              src: call("Checkpoint Journey.png"),
              alt: "Three CEKAP screens: a checklist of what to keep ready before leaving, the next step to confirm arrival at KLIA Terminal 1 above the flight card, and the timeline marking the current checkpoint between what is done and what is next.",
            }}
          />

          <CaseStudyPoints
            columns={2}
            items={[
              {
                title: "Airline deadline",
                body: "Works back from the real cut-off on the booking, not a generic airport rule.",
              },
              {
                title: "Selected pace",
                body: "How much margin the traveller wants. Changeable, and never framed as a medical category.",
              },
              {
                title: "Confirmed checkpoint",
                body: "Checked in, bag dropped, security cleared. A simple, manual position signal.",
              },
              {
                title: "Data confidence",
                body: "How fresh the flight data is. Offline does not make saved data wrong, only unverified.",
              },
            ]}
          />

          <CaseStudyPullQuote>
            A calm interface that confidently gives stale advice would be worse than no advice at
            all.
          </CaseStudyPullQuote>
        </CaseStudyChapter>

        <CaseStudyChapter
          copy="The interface follows from three decisions. Each one gives something up, and I would defend each in a review."
          label="Key decisions"
          title="Three calls that shape the product."
        >
          <CaseStudyRow
            image={{
              ...SCREEN,
              src: call("Manual Checkpoints.png"),
              alt: "A phone lock screen showing a CEKAP live activity: on track, step 1 of 8, next check in online, with a Mark as Complete button.",
            }}
            title="Manual checkpoints over sensing"
          >
            <p>
              GPS is unreliable around large terminal buildings, and continuous location creates a
              trail I would have to secure and explain. A tap survives a dead network and hands back
              a small win at each step.
            </p>
            <p>
              The flaw is obvious: a stressed person forgets. So confirmation sits on the lock
              screen, and a missed step falls back to the last confirmed point.
            </p>
          </CaseStudyRow>

          <CaseStudyRow
            image={{
              ...SCREEN,
              src: call("Rest Window.png"),
              alt: "Three Rest Window screens counting 5, 16 and 9 minutes. The centre one confirms arrival at KLIA Terminal 1 and lists nearby surau, toilets and seating.",
            }}
            title="A Rest Window after every checkpoint"
          >
            <p>
              Clearing a step is when a tired traveller most wants to sit down and least knows
              whether they can. Each completed checkpoint returns how long you can safely pause,
              from your own pace rather than an average walker’s.
            </p>
            <p>It answers the question my own missed flight failed on, without having to ask.</p>
          </CaseStudyRow>

          <CaseStudyRow
            image={{
              ...SCREEN,
              src: call("Offline State.png"),
              alt: "Two CEKAP screens while offline. One flags a delayed flight under a You're offline banner. The other explains the saved journey is available but flight and gate changes cannot be confirmed, last updated at 8:15 AM.",
            }}
            title="Offline is a connection state, not a truth state"
          >
            <p>
              The essential journey saves itself after setup. Losing signal means the app cannot see
              what changed, so it shows the last known time with a timestamp and points back to
              airport screens and staff.
            </p>
            <p>As the data ages, the advice turns more conservative.</p>
          </CaseStudyRow>

          <CaseStudyRow
            image={{
              ...SCREEN,
              src: call("Departure Update.png"),
              alt: "A CEKAP flight card for KL to SBW now showing 08:55 with 08:45 struck through and a Delayed tag, beside an update reading: Departure changed from 8:45 AM to 8:55 AM.",
            }}
            title="A change is announced, never swapped"
          >
            <p>
              On reconnect the app compares fresh data with what was saved. A delay never silently
              overwrites the old time; it says what happened, then recalculates the next checkpoint
              and any Rest Window it affects.
            </p>
          </CaseStudyRow>
        </CaseStudyChapter>

        <CaseStudyChapter
          copy="Airport journeys are planned around an average person: average pace, attention, confidence and ability to stand and walk. Real capacity moves. It can be permanent, like a mobility or sensory condition; temporary, like recovering from surgery; or situational, like rushing through an unfamiliar terminal with bags on both arms."
          label="Research"
          title="There is no “average” traveller."
        >
          <CaseStudyStoryFigure
            caption="Microsoft’s Persona Spectrum: design for reduced capacity without asking anyone to diagnose themselves first."
            image={{
              src: ux("Inclusive_Design.png"),
              width: 4096,
              height: 2127,
              alt: "A grid of four abilities, move, hear, see and focus, across permanent, temporary and situational limits. Move: wheelchair user, recovering from knee surgery, pushing a trolley with two cases. Hear: deaf traveller, ear infection, missing a gate announcement in a noisy hall. See: low vision, forgot glasses at home, glare on a phone screen. Focus: exhaustion after a red-eye flight, running late in a crowded, unfamiliar terminal. About 1.3 billion people live with significant disability, 1 in 6 worldwide (WHO, 2023).",
            }}
          />
          <CaseStudyStoryFigure
            image={{
              src: ux("Cognitive_Load_Analysis.png"),
              width: 4420,
              height: 1220,
              alt: "Four stages of cognitive load: full capacity with stable attention, then environmental demands such as crowds, long walks, heavy bags, time pressure and fatigue, then reduced resources with fragmented attention, ending in navigation breakdown where information is missed and the gate is missed.",
            }}
          />

          <CaseStudyTopic
            copy={[
              "I mapped KLIA Terminals 1 and 2, MYairports, Malaysia Airlines, AirAsia MOVE, Batik Air and Firefly across flight information, check-in, navigation, assistance, disruption recovery and sharing progress.",
              "The ecosystem is not short of information. The gap opens after it arrives: a traveller can know the gate and the time and still not know whether they can sit down, whether the queue is turning risky, or which task comes first. That moved the concept away from another airport app, towards a thin layer that interprets what already exists.",
            ]}
            title="What the existing ecosystem already does well"
          >
            <CaseStudyStoryFigure
              image={{
                src: ux("Landscape_Gap_Heatmap.png"),
                width: 4096,
                height: 1349,
                alt: "A heatmap of seven airport and airline products across nine capabilities. Every product covers information well, and coverage falls away for cognitive load, recovery and shared awareness.",
              }}
            />
          </CaseStudyTopic>

          <CaseStudyTopic
            copy="Interviews fell through twice. Rather than let one bad day stand in for research, I ran a structured desk pass and graded every source by what it could support. Official pages establish rules, news documents incidents, and reviews show failure patterns but never how often they happen."
            title="What reported experiences suggest"
          >
            <CaseStudyPoints columns={2} items={findings} />
            <CaseStudyPullQuote>
              None of this tells me how often it happens, which problem causes the most stress, or
              whether anyone would install a companion app. That needs people, not better sourcing.
            </CaseStudyPullQuote>
          </CaseStudyTopic>
        </CaseStudyChapter>

        <CaseStudyChapter
          copy="I did not find one clean failure. The problems piled up: fatigue slowed walking, stress narrowed attention, a delay made every estimate less certain. Once the plan broke, even obvious next steps got harder to see."
          label="Reframe"
          title="Airport systems are hardest to use at the moment you can least use them."
        >
          <CaseStudyTable
            head={["Insight", "Strongest current source", "Confidence"]}
            rows={[
              [
                "The ecosystem handles information better than next-step guidance",
                "Landscape analysis, app reviews, forums",
                confidence("High"),
              ],
              [
                "Stress and fatigue reduce the ability to process information",
                "Lived experience, secondary literature",
                confidence("Medium"),
              ],
              [
                "Travellers need reassurance as well as raw information",
                "Lived experience, disruption reports",
                confidence("Medium"),
              ],
              [
                "A trusted person wants a permission-based way to follow progress",
                "Lived experience, forum reports",
                confidence("Low"),
              ],
            ]}
          />

          <CaseStudyTopic title="Three points of view">
            <CaseStudyPoints
              items={[
                {
                  title: "The recovering traveller",
                  body: "Needs to know whether to stop for a few minutes or move now, because one wrong call turns into panic.",
                },
                {
                  title: "The low-focus traveller",
                  body: "Needs one clear action without disclosing a diagnosis or holding several tasks in mind.",
                },
                {
                  title: "The trusted companion",
                  body: "Needs limited, permission-based visibility without care turning into surveillance.",
                },
              ]}
            />
          </CaseStudyTopic>

          <CaseStudyTopic
            copy="I first wrote six How Might We questions and treated them as equals. It looked thorough and decided nothing. I replaced them with one that can challenge the whole product:"
            title="One question instead of six"
          >
            <CaseStudyPullQuote>
              How might we help a stressed traveller identify the safest next step without demanding
              attention, disclosure or connectivity they may not have?
            </CaseStudyPullQuote>
            <CaseStudyTable
              head={["Supporting question", "Product response"]}
              rows={[
                ["Can a tired traveller judge whether to rest or move?", "Pace-aware guidance and the Rest Window"],
                ["Can it reduce complexity without hiding what matters?", "Checkpoint timeline and a glanceable current state"],
                ["Can it adapt without asking for a diagnosis?", "Private pace and support settings"],
                ["Can it help someone recover when the plan breaks?", "Recovery across live, stale and offline states"],
                ["Can it involve someone trusted without surveillance?", "Shared Awareness, held back until validated"],
              ]}
            />
          </CaseStudyTopic>
        </CaseStudyChapter>

        <CaseStudyChapter
          copy="Priority is not about how impressive a feature looks. It is whether the feature proves the core mechanism, and whether its technical or privacy cost is justified."
          label="Scope"
          title="Prove the manual journey before adding anything clever."
        >
          <CaseStudyPoints
            items={[
              {
                title: "v1 spine",
                body: "Flight import, privacy and pace setup, manual checkpoints, Rest Windows, calm alerts, automatic offline save, and recovery across last-known states.",
              },
              {
                title: "v2, if v1 holds",
                body: "Opt-in sensing through beacons, gate feeds or location. Now, Next, Later focus support.",
              },
              {
                title: "Deferred bets",
                body: "Travel Group and Shared Awareness. A Journey History Log, which helps retention but not the hard moment.",
              },
            ]}
          />

          <CaseStudyTopic
            copy="Shared Awareness, letting someone trusted follow the journey, is the feature people react to most and the one I cut. It carries the highest infrastructure cost, the highest privacy risk and my weakest evidence. Product risk and engineering risk landed on the same feature."
            title="The feature I cut"
          />

          <CaseStudyTopic
            copy="For the most uncertain decision, is it safe to rest or time to move, I will compare three treatments at the same fidelity, rather than ask people to pick a favourite."
            title="Exploring before committing"
          >
            <CaseStudyPoints
              items={[
                {
                  title: "Timeline-led",
                  body: "The current step inside the whole journey. Does context reassure, or add more to process?",
                },
                {
                  title: "Action-led",
                  body: "One dominant card with the safest next move. Does stronger priority improve clarity?",
                },
                {
                  title: "Rest-Window-led",
                  body: "The safe pause becomes the focus. Does visible time build confidence, or pressure?",
                },
              ]}
            />
          </CaseStudyTopic>
        </CaseStudyChapter>

        <CaseStudyChapter
          copy="Travellers already carry an airline app, an email, a wallet pass and airport screens. CEKAP asks them to set up and trust one more thing for a journey that usually goes fine without it. A tool built for the worst day of a trip may be ignored on every ordinary one."
          label="Risks"
          title="The biggest risk is not technical. It is whether anyone would bother."
        >
          <CaseStudyTopic
            copy="Keep setup brief, import the flight with one scan, and let the product live on the lock screen. It has to add what the airline app does not: pacing, priority and recovery. The same flight data in a calmer layout would not be enough."
            title="The current answer"
          />
          <CaseStudyPullQuote>
            If people consistently say they would open the airline app first, I need to change the
            concept, not explain their behaviour away.
          </CaseStudyPullQuote>
        </CaseStudyChapter>

        <CaseStudyChapter
          copy="CEKAP has not been tested with travellers yet. Recruitment fell through twice, so there are no results here, only the plan I will run and what I expect it to show."
          label="Test plan"
          title="How I plan to test it."
        >
          <CaseStudyTopic
            copy="Five moderated think-aloud sessions, each built around the three moments the concept has to get right. Which version helps someone make the right call matters more than which screen they say they prefer."
            title="Three tasks, five sessions"
          >
            <CaseStudyPoints
              items={[
                {
                  title: "Rest or move",
                  body: "Can you tell whether it is safe to rest before moving on?",
                },
                {
                  title: "Offline change",
                  body: "Your saved departure is 9:15 AM. You reconnect and it is now 10:40 AM. What changed, and what do you do?",
                },
                {
                  title: "Recovery",
                  body: "You have missed the flight. Where would you look for the next safe action?",
                },
              ]}
            />
          </CaseStudyTopic>

          <CaseStudyTopic
            copy="Alongside the sessions: the same task tried in an existing airline app and then in CEKAP, to see what each makes easy or unclear. A cognitive walkthrough and a heuristic review against Nielsen’s ten principles. Targeted re-tests after each important change, with every round kept as its own sample."
            title="Around the sessions"
          />

          <CaseStudyTopic title="What I will measure">
            <CaseStudyPoints
              columns={2}
              items={[
                {
                  title: "Decisions",
                  body: "Task completion and time, and whether people choose rest or move correctly and can explain why.",
                },
                {
                  title: "Understanding",
                  body: "Whether live, last-known and offline states read differently, and whether a changed departure is noticed.",
                },
                {
                  title: "Effort",
                  body: "How often checkpoint confirmations are missed, and whether the lock screen helps.",
                },
                {
                  title: "Feel and access",
                  body: "SEQ, SUS and AttrakDiff, because calm is part of the claim. A POUR review against WCAG 2.2 AA with axe, WAVE and Stark.",
                },
              ]}
            />
          </CaseStudyTopic>

          <CaseStudyTopic title="Predictions, written before the first session">
            <CaseStudyPoints
              columns={2}
              items={[
                {
                  title: "Too calm",
                  body: "Someone misses the urgency because I made the interface too calm.",
                },
                {
                  title: "Recovery wins",
                  body: "The recovery path feels more useful than the normal journey.",
                },
                {
                  title: "Saved reads as current",
                  body: "Unless the last-updated time is hard to miss, saved information is read as live.",
                },
                {
                  title: "Airline app first",
                  body: "At least one person opens the airline app first, exposing the adoption problem directly.",
                },
              ]}
            />
          </CaseStudyTopic>
        </CaseStudyChapter>

        <CaseStudyChapter label="Reflection" title="What I learned">
          <CaseStudyPoints
            columns={2}
            items={[
              {
                title: "Lived experience is a spark, not evidence.",
                body: "It gave the project urgency. It was dangerous whenever I let it feel like proof.",
              },
              {
                title: "The strongest decision is not exciting.",
                body: "Manual checkpoints give the journey a fallback and avoid tracking nobody asked for.",
              },
              {
                title: "One question beats six.",
                body: "A single North Star lets me challenge a feature instead of finding somewhere to justify it.",
              },
              {
                title: "Scope is believable once you show the cuts.",
                body: "Naming v2 and the deferred bets made the case for v1 stronger.",
              },
              {
                title: "Offline support is not live awareness.",
                body: "Saving the journey makes it resilient, but the screen still has to admit what may have changed.",
              },
              {
                title: "Recovery may matter more than the ideal path.",
                body: "The product has to work when the traveller is already tired, late or confused.",
              },
            ]}
          />

          <CaseStudyTopic
            copy="Run the test plan, then recruit the screened sample for generative interviews. After that I revisit the problem definition based on what I learn, instead of protecting the current concept."
            title="What is next"
          />
        </CaseStudyChapter>
      </div>
      <CaseStudyIndex variant="sidebar" />
    </main>
  );
}
