import type { Metadata } from "next";
import {
  CaseStudyCard,
  CaseStudyFeature,
  CaseStudyHero,
  CaseStudyMeta,
  CaseStudySection,
  CaseStudyStat,
  projectAsset,
} from "../components";

export const metadata: Metadata = {
  title: "CSP Reseller Billing at VSTECS — Shafiq Efféndy",
};

const asset = (file: string) => projectAsset("Vstecs", file);

// Every screenshot is exported at the same size.
const SCREEN = { width: 4096, height: 2023 };

const meta: [string, string][] = [
  ["Role", "Sole Designer and front end build"],
  ["Users", "Resellers who pay, internal ops who collect"],
  ["Stack", "Figma, ASP.NET MVC"],
  ["Status", "In production since 2025"],
];

const workflows = [
  {
    title: "For Resellers",
    body: "Displays a single account view that pinpoints exact overdue amounts and enables users to select and settle specific invoices on demand.",
  },
  {
    title: "For Internal Ops",
    body: "Provides macro-level visibility across every reseller account, sorting by days overdue to shift the team from reactive chasing to prioritised collecting.",
  },
];

const decisions = [
  {
    title: "MFA Authentication",
    body: "Finance staff share physical workstations. Removing traditional passwords eliminated credential leaks and password-reset support overhead.",
    image: {
      ...SCREEN,
      src: asset("MFA Authentication.png"),
      alt: "Sign-in screens: an authenticator QR code for setup, the email sign-in form, and the one-time code prompt.",
    },
  },
  {
    title: "FPX Payment Redirects",
    body: "Offloaded payment processing to FPX redirects instead of capturing card details, keeping the application entirely out of PCI compliance scope.",
    image: {
      ...SCREEN,
      src: asset("FPX Payment Redirects.png"),
      alt: "Invoice payment screens, from selecting invoices in the portal to the FPX redirect that handles the payment.",
    },
  },
  {
    title: "DRY Code Base",
    body: "Rendered both Invoices and Activity pages from a single ASP.NET MVC partial view, allowing sorting, filtering, and paging updates to ship across both pages in a single deployment.",
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
    title: "Self-Serve Visibility",
    body: "Transformed reactive manual chasing into full transparency across all aging buckets for both resellers and internal ops teams.",
  },
  {
    value: "0",
    title: "Password Liability with MFA",
    body: "Zero stored passwords to leak and zero password-reset support tickets generated across shared workstations by enforcing Email + TOTP MFA.",
  },
  {
    value: "0",
    title: "PCI Scope Overhead",
    body: "Zero cardholder data touches the codebase by leveraging FPX payment redirects.",
  },
  {
    value: "2-for-1",
    title: "Front-End Maintenance",
    body: "1 shared partial view powers 2 core application pages, cutting UI table maintenance in half.",
  },
];

export default function VstecsBillingPage() {
  return (
    <main className="case-study flex-1 bg-(--white) text-(--text-primary)">
      <div className="wrapper px-6 pt-16 pb-16 sm:px-10">
        <CaseStudyHero
          lede="Monthly cloud subscription billing for VSTECS and its reseller network. I designed the product, then built the front end in ASP.NET MVC."
          logo={{ src: asset("Logo.png"), alt: "VSTECS", width: 748, height: 350 }}
          title="CSP Reseller Billing at VSTECS"
        />

        <CaseStudyMeta items={meta} />

        <CaseStudySection
          copy="Outstanding credit sat in aging buckets, but neither resellers nor internal finance teams had visibility into where specific funds belonged. As a result, overdue balances went unnoticed until an internal team member manually chased them."
          title="Nobody could see what was overdue."
        />

        <CaseStudySection title="Tailored Role-Based Workflows">
          <div className="grid gap-6">
            {workflows.map(({ title, body }) => (
              <CaseStudyCard key={title} title={title}>
                {body}
              </CaseStudyCard>
            ))}
          </div>
        </CaseStudySection>

        <CaseStudySection title="Key Product & Architectural Decisions">
          <div className="grid gap-4">
            {decisions.map(({ title, body, image }) => (
              <CaseStudyFeature image={image} key={title} title={title}>
                {body}
              </CaseStudyFeature>
            ))}
          </div>
        </CaseStudySection>

        <CaseStudySection title="The Impact & Results" wide>
          <div className="grid gap-4 sm:grid-cols-2">
            {results.map(({ value, title, body }) => (
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
