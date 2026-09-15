import type { Metadata } from "next";
import {
  CaseStudyFeature,
  CaseStudyHero,
  CaseStudyMeta,
  CaseStudySection,
  CaseStudyStat,
  projectAsset,
} from "../components";

export const metadata: Metadata = {
  title: "Company Mode on Five Petroleum App — Shafiq Efféndy",
};

const asset = (file: string) => projectAsset("Five-App", file);

// Every screenshot is exported at the same size.
const SCREEN = { width: 4096, height: 2023 };

const meta: [string, string][] = [
  ["Role", "UI/UX Designer"],
  ["Users", "Fleet drivers in Company mode"],
  ["Stack", "Figma, prototyping"],
  ["Status", "In production since 2025"],
];

const steps = [
  {
    title: "Pick the vehicle, then prove it",
    body: "The driver selects a registered plate, then enters that vehicle’s PIN. Verification is scoped to the vehicle rather than the person, so it holds for whoever is driving it that day.",
    image: {
      ...SCREEN,
      src: asset("Vehicle Verification.png"),
      alt: "Phone screens for choosing a registered vehicle from a list and entering its PIN.",
    },
  },
  {
    title: "Quota on screen before the amount field",
    body: "Available quota, balance and company details load before the driver enters an odometer reading or a fuel amount, so the decision happens with the numbers already visible rather than after a rejection.",
    image: {
      ...SCREEN,
      src: asset("Quota Check.png"),
      alt: "Phone screen showing the available quota in litres, the balance, and company information above the purchase details.",
    },
  },
  {
    title: "Two ways to pay, one with a person in it",
    body: "Five Wallet settles on the phone. Pay at Counter hands authorisation to the cashier, who enters their own name and station PIN into the driver’s device. Either way the driver leaves with a digital invoice.",
    image: {
      ...SCREEN,
      src: asset("Payment Options.png"),
      alt: "Phone screens for the payment summary, cashier authorisation at the counter, and the digital invoice.",
    },
  },
];

const numbers = [
  {
    value: "7",
    title: "Steps in the purchase flow",
    body: "Select vehicle, verify, check quota, enter details, choose payment, authorise, receive invoice.",
  },
  {
    value: "2",
    title: "Ways to pay",
    body: "Five Wallet or Pay at Counter, chosen after quota is confirmed.",
  },
  {
    value: "1",
    title: "Person authorising on someone else’s phone",
    body: "At the counter, a cashier enters their own credentials into the driver’s device to complete the sale.",
  },
  {
    value: "0",
    title: "Pump-side failure states designed",
    body: "Denied purchase, exhausted quota, dead connection, forgotten PIN. None shipped.",
  },
];

export default function FiveCompanyModePage() {
  return (
    <main className="case-study flex-1 bg-(--white) text-(--text-primary)">
      <div className="wrapper px-6 pt-16 pb-16 sm:px-10">
        <CaseStudyHero
          lede="A mobile app for buying diesel at government-subsidised rates. This case study covers Company mode, where a fleet driver selects a vehicle, verifies it, checks a company-held quota, and pays, in seven steps."
          logo={{ src: projectAsset("Five", "Logo.png"), alt: "FIVE", width: 803, height: 438 }}
          title="Company Mode on Five Petroleum App"
        />

        <CaseStudyMeta items={meta} />

        <CaseStudySection
          copy="A fleet driver at a pump is spending a company quota, against a vehicle they may not own, with a limit they cannot see. Seven steps sit between opening the app and fuel in the tank, and most of them exist to make that safe without making it slow."
          title="Buying fuel you do not pay for."
        />

        <CaseStudySection title="How a purchase actually works.">
          <div className="grid gap-4">
            {steps.map(({ title, body, image }) => (
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
    </main>
  );
}
