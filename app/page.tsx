import { ArrowRight, ClockFading, FolderGit2, Layers, PackageCheck, Sparkle } from "lucide-react";
import Image from "next/image";
import { Card, DeviceMockups, Link, ScrollReveal, Tabs, Tag, Tile } from "./components";

const introduction = [
  {
    value: "anyone",
    label: "For anyone",
    body: "Hi, I'm Shafiq Efféndy, a self-taught Product Designer. For three years, I've done it all. Sketch in Figma, code it, ship it, watch users use it. One person, whole pipeline.",
  },
  {
    value: "directors",
    label: "Design Directors",
    body: "I structure the whole process. Double Diamond thinking early on, clean code at the end. What you approve in Figma is what ships to users. Not because I handed it to someone else, but because I built it myself.",
  },
  {
    value: "designers",
    label: "Product Designers",
    body: "I live in Figma Auto Layout. But I don't stop at mockups. I translate Auto Layout decisions directly into CSS. So the design you see in Figma and the product users see are literally the same thing.",
  },
  {
    value: "engineers",
    label: "Engineers",
    body: "I design with code in mind. ASP.NET, React, TypeScript strict mode, monorepo with CI gates. I build on that stack, so my design system ships as real components, not Figma mockups.",
  },
];

const work = [
  {
    href: "/case-study-1",
    title: "CEKAP",
    description:
      "Smart Flight Companion. A calm, checkpoint-based support layer for stressed travellers at KLIA",
    cover: "/projects/Cekap/Cover.png",
    info: "Concept" as const,
    // Spaces in the filenames are percent-encoded so the URLs survive hosts
    // that do not normalise them.
    mockups: [
      
      "/mobile-mockups/Rest%20Window%20-%20Move%20now%201.png",
      "/mobile-mockups/Rest%20Window%20-%20Narrowing%201.png",
      "/mobile-mockups/Rest%20Window%20-%20Comfortable%201.png",
      "/mobile-mockups/Rest%20Window%20-%20Narrowing%202.png",
      "/mobile-mockups/Rest%20Window%20-%20Move%20now%202.png",
      
    ],
    inProgress: true,
  },
];

const principles = [
  [PackageCheck, "Design to production", "Design isn't done until it ships the way it was intended."],
  [FolderGit2, "End-to-end ownership", "UX, UI, and code. I carry the work all the way."],
  [Layers, "Consistency is a feature", "Systematic UI builds user trust and team speed."],
  [Sparkle, "Tools in service of quality", "AI workflows raise my standard of execution, never replace it."],
] as const;

export default function HomePage() {
  return (
    <main className="flex-1 wrapper bg-(--app-layer-background) px-6 py-16 text-(--text-primary) sm:px-10">
      <section>
        <Tabs
          className="mt-6"
          items={introduction.map(({ value, label, body }) => ({
            value,
            label,
            content: <p className="intro">{body}</p>,
          }))}
        />

        {/* <div className="mt-8 flex flex-wrap items-center gap-6">
          <Link href="/about" trailingIcon={<ArrowRight height={16} width={16} />} type="standalone">
            About me
          </Link>
          <Link href="/components" type="standalone">
            Component library
          </Link>
        </div> */}
      </section>

      <section className="mt-16">
        <ScrollReveal>
          <h2 className="title-02">Principles I ship by</h2>
        </ScrollReveal>
        <div className="card-deck mt-3 grid gap-6 sm:grid-cols-2">
          {principles.map(([Icon, title, description]) => (
            <Card
              className="card-quiet"
              description={description}
              icon={<Icon height={22} width={22} />}
              key={title}
              title={title}
            />
          ))}
        </div>
      </section>

      <section className="mt-16">
        <ScrollReveal>
          <h2 className="title-02">Selected work</h2>
        </ScrollReveal>
        <div className="mt-3 grid gap-6">
          {work.map(({ href, title, description, cover, mockups, info, inProgress }) => (
            <Tile
              banner={
                mockups ? (
                  <DeviceMockups images={mockups} />
                ) : cover ? (
                  <Image alt="" fill sizes="(max-width: 720px) 100vw, 660px" src={cover} />
                ) : undefined
              }
              description={description}
              href={href}
              info={info}
              key={href}
              tag={
                inProgress ? (
                  <Tag icon={<ClockFading height={15} width={15} />} size="medium" tone="warning">
                    On Going
                  </Tag>
                ) : undefined
              }
              title={title}
            />
          ))}
        </div>
      </section>
    </main>
  );
}