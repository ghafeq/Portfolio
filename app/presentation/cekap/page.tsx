import type { Metadata } from "next";
import {
  CEKAP_SCREENS,
  Deck,
  DeviceMockups,
  Heading,
  Meta,
  Panel,
  Shot,
  Slide,
  SlideTitle,
  Text,
  projectAsset,
  u,
} from "../../components";

export const metadata: Metadata = {
  title: "CEKAP — Shafiq Efféndy",
  robots: { index: false, follow: false },
};

const ux = (file: string) => projectAsset("Cekap/UX", file);
const call = (file: string) => projectAsset("Cekap/Calls", file);

// Two design decisions, each a screenshot over its claim on a dark card.
const decisions = [
  {
    title: "Manual checkpoints over sensing",
    body: "GPS is unreliable inside terminals. Manual confirmation survives a dead network",
    image: call("Manual Checkpoints.png"),
    alt: "A CEKAP live activity on a phone lock screen: on track, step 1 of 8, next check in online, with a Mark as Complete button.",
  },
  {
    title: "Offline is a connection state, not a truth state",
    body: "Automatically download the flight information after created new journey",
    image: call("Offline State.png"),
    alt: "Two CEKAP screens while offline. One flags a delayed flight under a You're offline banner. The other explains the saved journey is available but flight and gate changes cannot be confirmed.",
  },
];

export default function CekapDeck() {
  return (
    <Deck
      backHref="/presentation/projects"
      nextHref="/presentation/vstecs-billing"
      previousHref="/presentation/projects"
    >
      <Slide label="CEKAP" style={{ justifyContent: "center" }}>
        <SlideTitle as="h1" hero>
          CEKAP
        </SlideTitle>
        {/* Empty in Figma; it carries the CEKAP mockup, as the cover does. */}
        <div className="deck-art">
          <div className="deck-fan">
            <DeviceMockups images={CEKAP_SCREENS} sizes="22vw" />
          </div>
        </div>
        <Meta
          items={[
            ["Role", "Sole Designer & Front End Build"],
            ["Stack", "Figma, Expo React Native"],
            ["Year", "Started in May 2026"],
          ]}
        />
      </Slide>

      <Slide label="Where it starts">
        <div className="deck-row">
          <div className="deck-col deck-ink" style={{ gap: u(24), padding: u(42) }}>
            <h2 className="deck-statement">Where it starts. The closed gate was not the hard part.</h2>
            <Text size={24}>
              March 2025. Weeks after surgery for a herniated disc, I flew from KLIA2 with my
              sister. We dropped bags upstairs, went down to sit because sitting was the whole
              point of my recovery, then misjudged the walk back. We hit security ten minutes past
              the line. The flight left without us.
            </Text>
          </div>
          <Shot
            alt="Weeks after the surgery: a patient in a hospital gown sits on the edge of a ward bed while a back brace is fitted."
            sizes="50vw"
            src="Cekap Recovery.png"
            style={{ alignSelf: "stretch" }}
          />
        </div>
      </Slide>

      <Slide label="There is no average traveller">
        <SlideTitle lead="Airport journeys are planned around an average person: average pace, attention, confidence and ability to stand and walk.">
          There is no “average” traveller
        </SlideTitle>
        <div className="deck-body">
          <Shot
            alt="A grid of four abilities, move, hear, see and focus, across permanent, temporary and situational limits, running from few people affected to more. About 1.3 billion people live with significant disability, 1 in 6 worldwide (WHO, 2023)."
            sizes="94vw"
            src={ux("Inclusive_Design.png")}
            style={{ height: u(698), width: u(1344.19) }}
          />
        </div>
      </Slide>

      <Slide label="What the existing ecosystem already does well">
        <SlideTitle lead="Information is everywhere. The gap opens after the information arrives.">
          What the existing ecosystem already does well
        </SlideTitle>
        <div className="deck-body">
          <Shot
            alt="A heatmap of seven airport and airline products across seven capabilities, from flight information to shared journey awareness. Every product supports flight information well, and support falls away towards recovery and shared awareness."
            sizes="94vw"
            src={ux("Landscape_Gap_Heatmap.png")}
            style={{ aspectRatio: "3840 / 1265", width: "100%" }}
          />
        </div>
      </Slide>

      {decisions.map(({ title, body, image, alt }) => (
        <Slide key={title} label={`Key Design Decisions: ${title}`} style={{ justifyContent: "space-between" }}>
          <SlideTitle>Key Design Decisions</SlideTitle>
          <div className="deck-feature-stage">
            <div className="deck-feature">
              <Shot alt={alt} sizes="62vw" src={image} style={{ flex: "1 0 0" }} />
              <div className="deck-feature-caption">
                <Heading size={36}>{title}</Heading>
                <Text size={32}>{body}</Text>
              </div>
            </div>
          </div>
        </Slide>
      ))}

      <Slide label="Design System">
        <SlideTitle>Design System</SlideTitle>
        <div className="deck-body" style={{ alignItems: "flex-start" }}>
          <Shot
            alt="The Gōshi design system, consumer edition, version 1."
            sizes="94vw"
            src="Cekap Design System.png"
            style={{ aspectRatio: "1080 / 608", width: "100%" }}
          />
        </div>
      </Slide>

      <Slide height={1066} label="Wireframe">
        <SlideTitle>Wireframe</SlideTitle>
        <div className="deck-body" style={{ alignItems: "stretch", gap: u(24) }}>
          <Shot sizes="31vw" src="Cekap Wireframe 1.png" style={{ flex: "1 0 0" }} />
          {/* Cropped to its right-hand side, as framed in Figma. */}
          <Shot position="right" sizes="31vw" src="Cekap Wireframe 2.png" style={{ flex: "1 0 0" }} />
          <Shot sizes="31vw" src="Cekap Wireframe 3.png" style={{ flex: "1 0 0" }} />
        </div>
      </Slide>

      <Slide height={1066} label="Refine">
        <SlideTitle>Refine</SlideTitle>
        <div className="deck-body" style={{ alignItems: "stretch", gap: 0 }}>
          <figure className="deck-col deck-compare">
            <Shot
              alt="The first concept: scattered early screens and colour studies."
              sizes="47vw"
              src="Cekap First Concept.png"
              style={{ aspectRatio: "1442 / 1284", width: "100%" }}
            />
            <figcaption className="deck-caption">First Concept</figcaption>
          </figure>
          <figure className="deck-col deck-compare">
            <Shot
              alt="The final flows, organised step by step from login to completing checkpoints."
              sizes="47vw"
              src="Cekap Final.png"
              style={{ height: u(792), width: "100%" }}
            />
            <figcaption className="deck-caption">Final</figcaption>
          </figure>
        </div>
      </Slide>

      {/* The frame below the title is empty in Figma. */}
      <Slide height={1066} label="Prototype in Expo React">
        <SlideTitle>Prototype in Expo React</SlideTitle>
      </Slide>

      <Slide label="What I’ve learned" style={{ justifyContent: "center" }}>
        <SlideTitle>What I’ve learned</SlideTitle>
        <div className="deck-body" style={{ alignItems: "stretch" }}>
          <Shot sizes="46vw" src="Cekap Learned.png" style={{ flex: "1 0 0" }} />
          <div className="deck-col" style={{ gap: u(42) }}>
            <Panel layout="spread" style={{ flex: "1 0 0" }}>
              <Heading size={40}>Cekap was a deliberate attempt to strengthen</Heading>
              <Text size={24}>
                My research practice is still developing, while staying honest about what the
                evidence supports.
              </Text>
            </Panel>
            <Panel layout="spread" style={{ flex: "1 0 0" }}>
              <Heading size={40}>Next is observation session at the terminal</Heading>
              <Text size={24}>
                entrance through bag drop, security, airside and the gate. Behaviour and context
                only, no interviews and no identifying anyone.
              </Text>
            </Panel>
          </div>
        </div>
      </Slide>
    </Deck>
  );
}
