import type { Metadata } from "next";
import {
  Deck,
  Heading,
  Meta,
  Panel,
  ScreenStack,
  Shot,
  Slide,
  SlideTitle,
  Text,
  u,
  type StackedScreen,
} from "../../components";

export const metadata: Metadata = {
  title: "VSTECS Billing — Shafiq Efféndy",
  robots: { index: false, follow: false },
};

const SUCCESS = "Vstecs Payment Success.png";
const DETAILS = "Vstecs Payment Details.png";
const INVOICES = "Vstecs Invoices.png";

// The payment flow back to front: invoices, then details, then success.
const openingScreens: StackedScreen[] = [
  { file: SUCCESS, dx: 0, top: 0, width: 654, height: 369 },
  { file: DETAILS, dx: 0.5, top: 136, width: 745, height: 421 },
  { file: INVOICES, dx: 0, top: 324, width: 836, height: 470 },
];

const outcomeScreens: StackedScreen[] = [
  { file: SUCCESS, dx: -0.5, top: 85, width: 514, height: 290 },
  { file: DETAILS, dx: 0.5, top: 192, width: 586, height: 330 },
  { file: INVOICES, dx: 0, top: 339, width: 657, height: 370 },
];

// One decision per slide, its screen on the left. The first runs larger than
// its half and is cut off at the middle; the second fits inside it.
const decisions = [
  {
    title: "1. Turn the billing warning into a self-service workflow",
    body: "contained useful information such as credit limits, utilisation and aging buckets.",
    screen: {
      file: "Vstecs Invoices Account.png",
      alt: "The reseller's Invoices page: open, paid and cancelled invoices, with a searchable list of invoice numbers, dates and customers.",
      align: "flex-start",
      style: { flexShrink: 0, height: u(600), width: u(1067) },
    },
  },
  {
    title: "2. Separate reseller and finance needs",
    body: "the experience focused on Reseller account, outstanding invoices and payment actions.",
    screen: {
      file: "Vstecs Account Statement.png",
      alt: "The reseller's Account Statement: approved and available credit, credit status, outstanding credit by aging bucket, and the invoices to pay.",
      align: "center",
      style: { aspectRatio: "1920 / 1080", width: "100%" },
    },
  },
];

// Who owned each stage, as a band of colour: teal is mine, deep blue is shared
// with collaborators, pale blue is work I was not part of. The gradients mark
// the hand-offs between them.
const phases = [
  ["Discovery & requirements", "var(--blue-70)"],
  ["Workflow", "linear-gradient(to right, var(--blue-70), var(--teal-60))"],
  ["UX/UI Design", "linear-gradient(to left, var(--teal-50), var(--teal-60))"],
  ["Design System", "var(--teal-50)"],
  ["Prototype", "linear-gradient(to right, var(--teal-50), var(--teal-60))"],
  ["Front-end Development", "linear-gradient(to left, var(--blue-70), var(--teal-60))"],
  ["Integration", "linear-gradient(to right, var(--blue-70), var(--blue-20))"],
  ["QA", "var(--blue-20)"],
  ["Production", "var(--blue-20)"],
] as const;

const legend = [
  ["My contributions", "var(--teal-50)"],
  ["Collaborators", "var(--blue-70)"],
  ["Not Involved", "var(--blue-20)"],
] as const;

export default function VstecsBillingDeck() {
  return (
    <Deck
      backHref="/presentation/projects"
      // The end of the show returns to the projects it started from.
      nextHref="/presentation/projects"
      previousHref="/presentation/cekap#last"
    >
      <Slide label="VSTECS Billing" style={{ justifyContent: "center" }}>
        <SlideTitle as="h1" hero>
          VSTECS Billing
        </SlideTitle>
        <div className="deck-art">
          <ScreenStack screens={openingScreens} sizes="60vw" />
        </div>
        <Meta
          items={[
            ["Role", "Sole Designer & Front End Build"],
            ["Stack", "Figma & ASP.NET MVC"],
            ["Year", "In Production since 2025"],
          ]}
        />
      </Slide>

      <Slide label="Problems" style={{ justifyContent: "space-between" }}>
        <SlideTitle>Problems</SlideTitle>
        <div className="deck-body deck-ink">
          <Shot
            alt="The billing warning email resellers received: an urgent notice that their account is at critical level, with credit limit, utilisation and aging buckets from current to above 60 days, and bank details to pay into."
            sizes="46vw"
            src="Vstecs Billing Warning.png"
            style={{ flex: "1 0 0", height: u(779) }}
          />
          <div className="deck-col" style={{ gap: u(42), justifyContent: "center" }}>
            <div className="deck-col" style={{ gap: u(24) }}>
              <Heading size={32}>For Reseller</Heading>
              <Text size={24}>
                A warning flagged the issue, but not which invoices needed attention or how to
                resolve them without Finance.
              </Text>
            </div>
            <div className="deck-col" style={{ gap: u(12) }}>
              <Heading size={32}>For Finance</Heading>
              <Text size={24}>
                The workflow supported account and CSP management, but overdue collection still
                relied on manual reseller follow-ups.
              </Text>
            </div>
          </div>
        </div>
      </Slide>

      <Slide label="Design Approach" style={{ justifyContent: "space-between" }}>
        <SlideTitle>Design Approach</SlideTitle>
        <div className="deck-panels">
          <Panel layout="centred">
            <Heading size={32}>Resellers needed to answer:</Heading>
            <Text size={40}>What do I owe, which invoices are overdue, and what can I pay?</Text>
          </Panel>
          <Panel layout="centred">
            <Heading size={32}>Finance needed to answer:</Heading>
            <Text size={40}>Which reseller accounts need attention, and how overdue are they?</Text>
          </Panel>
        </div>
      </Slide>

      {decisions.map(({ title, body, screen }) => (
        <Slide
          key={title}
          label={`Key Design Decisions: ${title}`}
          style={{ justifyContent: "space-between" }}
        >
          <SlideTitle>Key Design Decisions</SlideTitle>
          <div className="deck-decision">
            <div className="deck-decision-media" style={{ alignItems: screen.align }}>
              <Shot
                alt={screen.alt}
                className="deck-decision-screen"
                sizes="74vw"
                src={screen.file}
                style={screen.style}
              />
            </div>
            <div className="deck-col" style={{ gap: u(24), padding: u(42) }}>
              <Heading size={40}>{title}</Heading>
              <Text size={32}>{body}</Text>
            </div>
          </div>
        </Slide>
      ))}

      <Slide label="Context and what I owned" style={{ justifyContent: "center" }}>
        <SlideTitle>Context and what I owned</SlideTitle>
        <div className="deck-body deck-ink" style={{ flexDirection: "column" }}>
          <ul className="deck-legend">
            {legend.map(([label, colour]) => (
              <li className="deck-legend-item" key={label}>
                <span className="deck-swatch" style={{ background: colour }} />
                <span className="deck-label">{label}</span>
              </li>
            ))}
          </ul>
          <ol className="deck-phases">
            {phases.map(([label, fill]) => (
              <li className="deck-phase" key={label}>
                <span className="deck-phase-bar" style={{ background: fill }} />
                <span className="deck-label">{label}</span>
              </li>
            ))}
          </ol>
        </div>
      </Slide>

      <Slide label="Outcome" style={{ justifyContent: "center" }}>
        <SlideTitle>Outcome</SlideTitle>
        <div className="deck-body" style={{ alignItems: "stretch" }}>
          <div className="deck-col" style={{ position: "relative" }}>
            <ScreenStack screens={outcomeScreens} sizes="46vw" />
          </div>
          <div className="deck-col" style={{ gap: u(42) }}>
            <Panel layout="spread" style={{ flex: "1 0 0" }}>
              <Heading size={40}>For Reseller,</Heading>
              <ul className="deck-list" style={{ fontSize: u(24) }}>
                <li>gained self-service visibility into outstanding invoices and aging,</li>
                <li>select specific invoices and proceed directly to payment</li>
              </ul>
            </Panel>
            <Panel layout="spread" style={{ flex: "1 0 0" }}>
              <Heading size={40}>The billing experience</Heading>
              <Text size={24}>
                complemented the existing internal portal for reseller and CSP management.
              </Text>
            </Panel>
          </div>
        </div>
      </Slide>
    </Deck>
  );
}
