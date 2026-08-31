import { ArrowLeft, ClockFading } from "lucide-react";
import Image from "next/image";
import { Link, ScrollReveal, Tag } from "../components";

const meta = [
  ["Role", "Your role here"],
  ["Timeline", "Year — Year"],
  ["Team", "Who you worked with"],
];

const sections = [
  ["Overview", "Set the scene in a few sentences: what the product is, who it serves, and why this work mattered."],
  ["The problem", "Describe the constraint or friction you set out to resolve, and how you knew it was worth solving."],
  ["Process", "Walk through the approach — research, explorations, the decisions you made and what you traded off."],
  ["Outcome", "Close with what shipped and what changed, with whatever evidence you have."],
];

export default function CaseStudyOnePage() {
  return (
    // The wrapper moves onto each section so the banner between them can run
    // the full width of the viewport.
    <main className="flex-1 bg-(--app-layer-background) text-(--text-primary)">
      <section className="wrapper px-6 pt-16 pb-12 sm:px-10">
        <Link href="/" leadingIcon={<ArrowLeft size={16} />} type="standalone">
          Back home
        </Link>

        <div className="mt-16 flex flex-wrap items-center gap-3">
          <p className="label">Case study 01</p>
          <Tag icon={<ClockFading height={15} width={15} />} size="small" tone="warning">
            In Progress
          </Tag>
        </div>
        <h1 className="title-01 mt-3">Case Study 1</h1>
        <p className="mt-5 body-01">
          A one-line summary of the project that gives the reader a reason to keep going.
        </p>
      </section>

      <ScrollReveal className="case-study-banner">
        <Image
          alt="CEKAP flight companion screens"
          fill
          priority
          sizes="100vw"
          src="/projects/Cekap/Cover.png"
        />
      </ScrollReveal>

      <section className="wrapper px-6 pt-12 pb-16 sm:px-10">
        <ScrollReveal>
        <dl className="grid gap-6 sm:grid-cols-3">
          {meta.map(([term, value]) => (
            <div key={term}>
              <dt className="label text-(--text-secondary)">{term}</dt>
              <dd className="body-02 mt-1">{value}</dd>
            </div>
          ))}
        </dl>
        </ScrollReveal>

        <ScrollReveal className="case-study-figure mt-12">
          <Image
            alt="CEKAP checkpoint flow"
            fill
            sizes="(max-width: 720px) 100vw, 660px"
            src="/projects/Cekap/Cover.png"
          />
        </ScrollReveal>

        <div className="mt-12 space-y-8">
          {sections.map(([title, body]) => (
            <ScrollReveal key={title}>
            <article>
              <h2 className="title-02">{title}</h2>
              <p className="body-02 mt-2 text-(--text-secondary)">{body}</p>
            </article>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </main>
  );
}
