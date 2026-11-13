import type { Metadata } from "next";
import {
  CaseStudyCard,
  CaseStudyFeature,
  CaseStudyHero,
  CaseStudyIndex,
  CaseStudyNext,
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

const delivered = [
  {
    title: "3 registers on 1 pattern",
    body: "Vehicles, drivers and points, each with the same create, update and disable actions behind one toolbar. Learn one register and the other two work the same way.",
  },
  {
    title: "Vehicle records with compliance dates",
    body: "Plate, sector, type, quota, road tax expiry and SKDS expiry on every vehicle. Each date shows one of 3 states, so a lapsing vehicle stands out in the list.",
  },
  {
    title: "Driver records that survive offboarding",
    body: "Drivers are disabled, not deleted. Their transaction history stays in the ledger after they leave.",
  },
];

const struggles = [
  {
    title: "Internal: one pooled balance, no control",
    body: "The subsidy lands as a single corporate balance, so one truck could spend what the whole fleet was given. I put a quota on each vehicle record, editable by the fleet admin. Spending is capped per vehicle, not per fleet.",
    image: {
      ...SCREEN,
      src: asset("Update Vehicle.png"),
      alt: "The vehicle register in the fleet portal, with a vehicle record open to edit its details and quota.",
    },
  },
  {
    title: "External: points expire without warning",
    body: "Unspent subsidy is lost at expiry, and the old view showed only a total. The expiry date now sits on the balance card and links to a dated breakdown next to transfers out, so admins can see what lapses and when.",
    image: {
      ...SCREEN,
      src: asset("Points Account.png"),
      alt: "The points ledger, with the corporate balance, its expiry breakdown, and transfers out to drivers.",
    },
  },
  {
    title: "External: two products, two identities",
    body: "Drivers buy fuel in the Five mobile app, but admins assign vehicles and points in the portal. I used the driver’s mobile number as the shared key. Points transfer to that number, and the driver sees them in the app with no second account.",
    image: {
      ...SCREEN,
      src: asset("Points Account.png"),
      alt: "The corporate points ledger, where each transfer out to a driver is recorded against their mobile number.",
    },
  },
];

const results = [
  {
    value: "3",
    title: "Registers, 1 interaction pattern",
    body: "Vehicles, drivers and points share the same toolbar and actions.",
  },
  {
    value: "1",
    title: "Quota per vehicle",
    body: "No single vehicle can draw down the fleet’s whole allocation.",
  },
  {
    value: "3",
    title: "Expiry dates tracked",
    body: "Road tax and SKDS on every vehicle, plus the expiry on the points balance.",
  },
  {
    value: "1",
    title: "Identity across 2 products",
    body: "The mobile number links the portal and the app, so assignment and purchase share one account.",
  },
];

export default function FiveFleetPortalPage() {
  return (
    <main className="case-study flex-1 bg-(--app-layer-background) text-(--text-primary)">
      <div className="wrapper px-6 pt-16 pb-16 sm:px-10">
        <CaseStudyHero
          lede="A web portal for fleet operators in Malaysia’s subsidised diesel scheme. Register vehicles under the programme, keep them compliant, hold subsidy points, and assign vehicles to the drivers who buy the fuel."
          logo={{ src: projectAsset("Five", "Logo.png"), alt: "FIVE", width: 803, height: 438 }}
          title="SKDS & SKPS at Five Petroleum"
        />

        <CaseStudyMeta items={meta} />

        <CaseStudySection copy="A web portal for fleet operators in Malaysia’s subsidised diesel scheme (SKDS and SKPS). I designed it in Figma and built the front end in ASP.NET on Azure. Live since 2025." title="What I delivered">
          <div className="grid gap-6">
            {delivered.map(({ title, body }) => (
              <CaseStudyCard key={title} title={title}>
                {body}
              </CaseStudyCard>
            ))}
          </div>
        </CaseStudySection>

        <CaseStudySection copy="The subsidy arrives as one corporate points balance, is spent at the pump by individual drivers in individual vehicles, and expires while it sits unused." title="Struggles and solutions">
          <div className="grid gap-4">
            {struggles.map(({ title, body, image }) => (
              <CaseStudyFeature image={image} key={title} title={title}>
                {body}
              </CaseStudyFeature>
            ))}
          </div>
        </CaseStudySection>

        <CaseStudySection title="Results">
          <div className="grid gap-4 sm:grid-cols-2">
            {results.map(({ value, title, body }) => (
              <CaseStudyStat key={title} title={title} value={value}>
                {body}
              </CaseStudyStat>
            ))}
          </div>
        </CaseStudySection>
      </div>
      <CaseStudyNext current="/five-fleet-portal" />
      <CaseStudyIndex />
    </main>
  );
}
