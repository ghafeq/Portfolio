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
  title: "VSTECS Reseller Billing — Shafiq Efféndy",
};

const asset = (file: string) => projectAsset("Vstecs", file);

// Every screenshot is exported at the same size.
const SCREEN = { width: 4096, height: 2023 };

const meta: [string, string][] = [
  ["Role", "Sole designer and front end build"],
  ["I owned", "Workflow, UI, design system, prototype, front end"],
  ["Team owned", "Discovery, integration, QA, release"],
  ["Users", "VSTECS resellers settling their own invoices"],
  ["Stack", "Figma, ASP.NET MVC"],
  ["Status", "In production since 2025"],
];

const BEFORE = {
  src: asset("Billing Warning Redacted.png"),
  width: 862,
  height: 931,
  alt: "The billing warning email: an urgent notice that the account is at critical level, with credit limit, utilisation, aging buckets from current to over 60 days, and bank details to pay into.",
};

const delivered = [
  {
    title: "Reseller account view",
    body: "One screen per reseller showing the balance owed, split by aging bucket. Resellers tick the invoices they want to clear and pay them in one checkout.",
  },
  {
    title: "Invoices and Activity pages",
    body: "Resellers search, sort and filter every open, paid and cancelled invoice, and see each payment they made. Finance keeps managing accounts in the existing internal portal.",
  },
];

const struggles = [
  {
    title: "External: one screen trying to serve two audiences",
    body: "Resellers only need their own balance, not Finance’s view of every account. I gave them an Account Statement with credit, status, aging and invoices to pay.",
    image: {
      src: asset("Account Statement.webp"),
      width: 2000,
      height: 988,
      alt: "The reseller's Account Statement: approved and available credit, credit status, outstanding credit by aging bucket, and the invoices to pay.",
    },
  },
  {
    title: "Internal: shared workstations, shared passwords",
    body: "Staff share workstations, so passwords leaked and needed resets. Email plus an authenticator code left 0 passwords to store.",
    image: {
      ...SCREEN,
      src: asset("MFA Authentication.png"),
      alt: "Sign-in screens: an authenticator QR code for setup, the email sign-in form, and the one-time code prompt.",
    },
  },
  {
    title: "External: taking payment without holding card data",
    body: "Holding card details would bring PCI DSS audits. FPX redirects take the payment, so 0 card data reaches our database.",
    image: {
      ...SCREEN,
      src: asset("FPX Payment Redirects.png"),
      alt: "Invoice payment screens, from selecting invoices in the portal to the FPX redirect that handles the payment.",
    },
  },
  {
    title: "External: two tables drifting apart",
    body: "Invoices and Activity had the same table logic but drifted apart. One shared partial view now means 1 edit and 1 deploy for both.",
    image: {
      ...SCREEN,
      src: asset("Shared Partial View.png"),
      alt: "Invoices table with sorting, filtering and paging controls, the view shared with the Activity page.",
    },
  },
];

const results = [
  {
    value: "100%",
    title: "Of aging buckets visible",
    body: "Resellers see their balance in every aging bucket themselves. Before launch, they had to ask Finance.",
  },
  {
    value: "0",
    title: "Stored passwords",
    body: "Email and TOTP sign-in left nothing to leak on shared machines and nothing to reset.",
  },
  {
    value: "0",
    title: "Card fields in the codebase",
    body: "FPX handles the payment, which keeps the app out of PCI DSS scope.",
  },
  {
    value: "1 → 2",
    title: "Partial view, pages served",
    body: "One table component renders both Invoices and Activity, halving the table code to maintain.",
  },
];

export default function VstecsBillingPage() {
  return (
    <main className="case-study flex-1 bg-(--app-layer-background) text-(--text-primary)">
      <div className="wrapper px-6 pt-16 pb-16 sm:px-10">
        <CaseStudyHero
          logo={{ src: asset("Logo.png"), alt: "VSTECS", width: 748, height: 350 }}
          hideTitle
          title="VSTECS Payment"
        />

        {/* Between the title and the lede. Shown at its own 2000 × 988,
            uncropped, so the corner footnote stays. */}
        <ScrollReveal className="case-study-header-banner mt-6">
          <ImageLightbox
            alt="The VSTECS account statement: approved and available credit, outstanding credit by aging window, and a list of invoices to select and pay. Beside it: CSP resellers see and settle invoices in one view."
            height={988}
            preload
            sizes="(max-width: 880px) 100vw, 880px"
            src={asset("Banner.webp")}
            width={2000}
          />
        </ScrollReveal>

        <p className="case-study-copy mt-6">
          Before this, Finance wrote each reseller a billing warning email with their credit limit, utilisation and aging window, from current to over 60 days, plus bank details to pay into. The email didn’t say which invoices were overdue, so resellers had to go back to Finance to settle.
        </p>

        <CaseStudyMeta items={meta} />

        <CaseStudySection
          copy="A self-service billing app for VSTECS resellers, designed in Figma and built by me in ASP.NET MVC. Live in production since 2025."
          title="What I delivered"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {delivered.map(({ title, body }) => (
              <CaseStudyCard key={title} title={title}>
                {body}
              </CaseStudyCard>
            ))}
          </div>
        </CaseStudySection>

        <CaseStudySection
          copy="Resellers needed to know what they owed, which invoices were overdue and what they could pay. Finance needed to know which accounts needed attention and how overdue they were. The warning email answered neither."
          title="Before: a warning email and a bank transfer"
        >
          <CaseStudyFeature image={BEFORE} side title="The billing warning resellers received">
            It showed the totals in each aging bucket, from current to over 60 days, but no invoice
            numbers and no way to pay. Every payment was a manual bank transfer that Finance then
            had to match to invoices.
          </CaseStudyFeature>
        </CaseStudySection>

        <CaseStudySection
          copy="Overdue credit sat in aging buckets that no reseller and no one in finance could see. A balance was only noticed when someone on the team chased it by hand. These are the problems I hit while fixing that, inside the team and outside it."
          title="Struggles and solutions"
        >
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
      <CaseStudyNext current="/vstecs-billing" />
      <CaseStudyIndex />
    </main>
  );
}
