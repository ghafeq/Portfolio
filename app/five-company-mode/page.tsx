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
  ImageLightbox,
  projectAsset,
  ScrollReveal,
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

const delivered = [
  {
    title: "7-step purchase flow",
    body: "Select vehicle, verify, check quota, enter details, choose payment, authorise, receive invoice. Each step is one screen with one decision on it.",
  },
  {
    title: "2 payment paths",
    body: "Five Wallet pays on the phone. Pay at Counter hands the sale to the cashier. Both end with a digital invoice on the driver’s phone.",
  },
];

const struggles = [
  {
    title: "External: the driver doesn’t own the vehicle",
    body: "Drivers swap trucks, so a personal login can’t prove which vehicle is being fuelled. Verification is tied to the vehicle instead: pick a registered plate, enter its PIN. One PIN per vehicle works for any driver on any shift.",
    image: {
      ...SCREEN,
      src: asset("Vehicle Verification.png"),
      alt: "Phone screens for choosing a registered vehicle from a list and entering its PIN.",
    },
  },
  {
    title: "External: a limit the driver couldn’t see",
    body: "Drivers only learned they were over the company quota when a purchase was refused. Quota, balance and company details now sit above the amount field, so the limit shows before they type a number.",
    image: {
      ...SCREEN,
      src: asset("Quota Check.png"),
      alt: "Phone screen showing the available quota in litres, the balance, and company information above the purchase details.",
    },
  },
  {
    title: "Internal: drivers without a wallet balance",
    body: "Not every driver has a funded Five Wallet. With Pay at Counter, the cashier enters their name and station PIN on the driver’s phone, so the station signs off and the record carries both names.",
    image: {
      ...SCREEN,
      src: asset("Payment Options.png"),
      alt: "Phone screens for the payment summary, cashier authorisation at the counter, and the digital invoice.",
    },
  },
];

const results = [
  {
    value: "7",
    title: "Steps from app to pump",
    body: "The whole Company mode purchase, verification and payment included.",
  },
  {
    value: "0",
    title: "Numbers typed before quota is shown",
    body: "Quota loads first, so a driver can’t enter an amount the company can’t cover without seeing it.",
  },
  {
    value: "2",
    title: "Ways to pay",
    body: "Five Wallet or Pay at Counter, both ending in the same digital invoice.",
  },
  {
    value: "0",
    title: "Failure states shipped",
    body: "Denied purchase, exhausted quota, lost connection and forgotten PIN were designed but left out of the release. This is the gap I’d close next.",
  },
];

export default function FiveCompanyModePage() {
  return (
    <main className="case-study flex-1 bg-(--white) text-(--text-primary)">
      <div className="wrapper px-6 pt-16 pb-16 sm:px-10">
        <CaseStudyHero
          hideTitle
          logo={{ src: projectAsset("Five", "Logo.png"), alt: "FIVE", width: 803, height: 438 }}
          title="Company Mode on Five Petroleum App"
        />

        {/* Between the title and the lede, as on VSTECS. Shown at its own
            2000 × 988, uncropped. The title is hidden since the banner carries it. */}
        <ScrollReveal className="case-study-header-banner mt-6">
          <ImageLightbox
            alt="Three Five Petroleum app screens stacked: a station map in Company mode, a purchase summary for 50 litres of UltraMaxx Diesel, and a company quota balance of 500.67 litres. Beside them: Company Mode on Five Petroleum App."
            height={988}
            preload
            sizes="(max-width: 880px) 100vw, 880px"
            src={asset("Banner.webp")}
            width={2000}
          />
        </ScrollReveal>

        <p className="case-study-copy mt-6">
          A mobile app for buying diesel at government-subsidised rates. This case study covers Company mode, where a fleet driver selects a vehicle, verifies it, checks a company-held quota, and pays, in seven steps.
        </p>

        <CaseStudyMeta items={meta} />

        <CaseStudySection copy="Company mode for the Five Petroleum app, designed in Figma: the screens a fleet driver uses to buy subsidised diesel on a company quota. Live since 2025." title="What I delivered">
          <div className="grid gap-6">
            {delivered.map(({ title, body }) => (
              <CaseStudyCard key={title} title={title}>
                {body}
              </CaseStudyCard>
            ))}
          </div>
        </CaseStudySection>

        <CaseStudySection copy="A fleet driver at the pump spends company money, in a vehicle they may not own, against a limit they can’t see. Each problem below came from one of those three facts." title="Struggles and solutions">
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
      <CaseStudyNext current="/five-company-mode" />
      <CaseStudyIndex />
    </main>
  );
}
