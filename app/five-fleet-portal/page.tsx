import type { Metadata } from "next";
import {
  CaseStudyCard,
  CaseStudyFeature,
  CaseStudyHero,
  CaseStudyIndex,
  CaseStudyMeta,
  CaseStudySection,
  CaseStudyStat,
  projectAsset,
} from "../components";

export const metadata: Metadata = {
  title: "SKDS & SKPS at Five Petroleum — Shafiq Efféndy",
};

const asset = (file: string) => projectAsset("Five-Portal", file);

// Every screenshot is exported at the same size.
const SCREEN = { width: 4096, height: 2023 };

const meta: [string, string][] = [
  ["Role", "Sole Designer and front end build"],
  ["Users", "Fleet administrators, plus Five admins who approve each vehicle"],
  ["Stack", "Figma, ASP.NET, Azure"],
  ["Status", "In production since 2025"],
];

const registers = [
  {
    title: "Vehicles",
    body: "Plate, sector, type, two expiry dates, status, and the quota that caps how much fuel the vehicle can draw. Added, updated and inspected from one toolbar.",
  },
  {
    title: "Drivers",
    body: "Added, updated, disabled, and checked against the vehicles they hold. Disabling is a first-class action rather than a delete, because the transaction history has to survive the person leaving.",
  },
  {
    title: "Points",
    body: "The corporate balance, its expiry date, and every transfer out to a driver held in one ledger, filterable by transaction type.",
  },
];

const shipped = [
  {
    title: "Usage capped on the vehicle",
    body: "Every vehicle carries its own quota, editable from the vehicle record. A pooled balance with no per-vehicle ceiling gives an administrator nothing to control with.",
    image: {
      ...SCREEN,
      src: asset("Update Vehicle.png"),
      alt: "The vehicle register in the fleet portal, with a vehicle record open to edit its details and quota.",
    },
  },
  {
    title: "Points expire, so the portal shows the clock",
    body: "Expiry sits on the balance card as a link into the dated breakdown, next to transfers out. Unspent subsidy is a loss, and a ledger that only shows a total hides it.",
    image: {
      ...SCREEN,
      src: asset("Points Account.png"),
      alt: "The points ledger, with the corporate balance, its expiry breakdown, and transfers out to drivers.",
    },
  },
  {
    title: "Mobile number as the identity key",
    body: "Drivers link to their FIVE mobile app account by phone number, and corporate points transfer to that number. One person, one identity, two products.",
    // The ledger is the proof: each transfer out is addressed to a mobile number.
    image: {
      ...SCREEN,
      src: asset("Points Account.png"),
      alt: "The corporate points ledger, where each transfer out to a driver is recorded against their mobile number.",
    },
  },
];

const numbers = [
  {
    value: "3",
    title: "Registers in one portal",
    body: "Vehicles, drivers and points, each with the same create, update and disable pattern behind one toolbar.",
  },
  {
    value: "Per vehicle",
    title: "Where usage is capped",
    body: "Quota lives on the vehicle record rather than the fleet, so one truck cannot spend what everything else was allocated.",
  },
  {
    value: "2",
    title: "Expiry clocks to watch",
    body: "Road tax and SKDS on every vehicle, each in three states, plus the expiry date sitting on the points balance itself.",
  },
  {
    value: "1",
    title: "Identity across two products",
    body: "The driver’s mobile number links portal to mobile app, so assignment and purchase share one account rather than two.",
  },
];

export default function FiveFleetPortalPage() {
  return (
    <main className="case-study flex-1 bg-(--white) text-(--text-primary)">
      <div className="wrapper px-6 pt-16 pb-16 sm:px-10">
        <CaseStudyHero
          lede="A web portal for fleet operators in Malaysia’s subsidised diesel scheme. Register vehicles under the programme, keep them compliant, hold subsidy points, and assign vehicles to the drivers who buy the fuel."
          logo={{ src: projectAsset("Five", "Logo.png"), alt: "FIVE", width: 803, height: 438 }}
          title="SKDS & SKPS at Five Petroleum"
        />

        <CaseStudyMeta items={meta} />

        <CaseStudySection
          copy="The subsidy arrives as a corporate points balance. It gets spent at a pump by individual drivers in individual vehicles, and it expires while it sits there. Without a limit on the vehicle itself, one truck can drain what the whole fleet was allocated."
          title="A pooled quota, spent one vehicle at a time."
        />

        <CaseStudySection title="Three registers, one pattern.">
          <div className="grid gap-6">
            {registers.map(({ title, body }) => (
              <CaseStudyCard key={title} title={title}>
                {body}
              </CaseStudyCard>
            ))}
          </div>
        </CaseStudySection>

        <CaseStudySection title="What shipped, and why it matters.">
          <div className="grid gap-4">
            {shipped.map(({ title, body, image }) => (
              <CaseStudyFeature image={image} key={title} title={title}>
                {body}
              </CaseStudyFeature>
            ))}
          </div>
        </CaseStudySection>

        <CaseStudySection title="The numbers that shaped it." wide>
          <div className="grid gap-4 sm:grid-cols-2">
            {numbers.map(({ value, title, body }) => (
              <CaseStudyStat key={title} title={title} value={value}>
                {body}
              </CaseStudyStat>
            ))}
          </div>
        </CaseStudySection>
      </div>
      <CaseStudyIndex />
    </main>
  );
}
