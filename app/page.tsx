import { ArrowRight, ClockFading, FolderGit2, Layers, PackageCheck, Sparkle } from "lucide-react";
import Image from "next/image";
import type { CSSProperties } from "react";
import {
  Card,
  CardDeck,
  DeviceMockups,
  HomeCorner,
  Link,
  ScrollReveal,
  Tabs,
  Tag,
  Tile,
} from "./components";

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
    href: "/cekap",
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
    // The fanned mockups are laid out for a wide banner.
    aspect: 8 / 5,
  },
    {
    href: "https://goshi-nu.vercel.app/",
    title: "Gōshi",
    description:
      "Interactive blocks and micro-interactions from the Gōshi Design System, built as working code",
    // A snapshot of the live block grid, captured at twice the banner's size.
    cover: "/projects/Goshi/Cover.png",
    info: "Concept" as const,
    inProgress: true,
    aspect: 2640 / 1156,
  },
    {
    href: "/gain-secure",
    title: "Gain Secure Corporate Identity",
    description:
      "A mark for an AI-driven company, built on the “://” every web address shares, with its colour and type system",
    cover: "/projects/Gain-Secure/Cover.png",
    info: "Professional" as const,
    aspect: 1440 / 758,
  },
    {
    href: "/five-company-mode",
    title: "Company Mode on Five Petroleum App",
    description:
      "Buying subsidised diesel against a company-held quota, from vehicle to invoice in seven steps",
    // Portrait, with the phones stacked top to bottom.
    cover: "/projects/Five-App/Cover.png",
    info: "Professional" as const,
    aspect: 1212 / 1575,
  },
  {
    href: "/vstecs-billing",
    title: "CSP Reseller Billing at VSTECS",
    description:
      "Monthly cloud subscription billing for VSTECS and its reseller network, designed and built front end in ASP.NET MVC",
    cover: "/projects/Vstecs/Shared%20Partial%20View.png",
    info: "Professional" as const,
    aspect: 4096 / 2023,
  },
  {
    href: "/five-fleet-portal",
    title: "SKDS & SKPS at Five Petroleum",
    description:
      "A web portal for fleet operators in Malaysia’s subsidised diesel scheme. Vehicles, drivers and subsidy points in one place",
    cover: "/projects/Five-Portal/Update%20Vehicle.png",
    info: "Professional" as const,
    aspect: 4096 / 2023,
  },
];

const categories = [
  { value: "all", label: "All" },
  { value: "Concept", label: "Concept" },
  { value: "Professional", label: "Professional" },
];

// A tile's caption, as a share of its width. Only used to balance the columns.
const CAPTION_HEIGHT = 0.3;

/**
 * Deals work into two columns, each to whichever is shorter, keeping each item's
 * place in the list so one column can read in that order on a phone.
 */
function toColumns(items: typeof work) {
  const columns: { item: (typeof work)[number]; order: number }[][] = [[], []];
  const heights = [0, 0];

  items.forEach((item, order) => {
    const column = heights[1] < heights[0] ? 1 : 0;

    columns[column].push({ item, order });
    heights[column] += 1 / item.aspect + CAPTION_HEIGHT;
  });

  return columns;
}

const principles = [
  [PackageCheck, "Design to production", "Design isn't done until it ships the way it was intended."],
  [FolderGit2, "End-to-end ownership", "UX, UI, and code. I carry the work all the way."],
  [Layers, "Consistency is a feature", "Systematic UI builds user trust and team speed."],
  [Sparkle, "Tools in service of quality", "AI workflows raise my standard of execution, never replace it."],
] as const;

export default function HomePage() {
  return (
    <main className="flex-1 wrapper bg-(--app-layer-background) px-6 py-16 text-(--text-primary) sm:px-10">
      <HomeCorner />
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
        <CardDeck className="mt-3 grid gap-6 sm:grid-cols-2">
          {principles.map(([Icon, title, description]) => (
            <Card
              className="card-quiet"
              description={description}
              icon={<Icon height={22} width={22} />}
              key={title}
              title={title}
            />
          ))}
        </CardDeck>
      </section>

      <Tabs
        className="work-index"
        heading={<h2 className="title-02">Selected work</h2>}
        items={categories.map(({ value, label }) => ({
          value,
          label,
          content: (
            <div className="work-index-grid">
              {toColumns(work.filter(({ info }) => value === "all" || info === value)).map(
                (column, index) => (
                  <div className="work-index-column" key={index}>
                    {column.map(({ item, order }) => (
                      <div
                        className="work-index-item"
                        key={item.href}
                        style={{ "--work-aspect": item.aspect, order } as CSSProperties}
                      >
                        <Tile
                          banner={
                            item.mockups ? (
                              <DeviceMockups images={item.mockups} />
                            ) : item.cover ? (
                              <Image
                                alt=""
                                fill
                                sizes="(max-width: 640px) 100vw, 560px"
                                src={item.cover}
                              />
                            ) : undefined
                          }
                          description={item.description}
                          href={item.href}
                          info={item.info}
                          tag={
                            item.inProgress ? (
                              <Tag
                                icon={<ClockFading height={15} width={15} />}
                                size="medium"
                                tone="warning"
                              >
                                On Going
                              </Tag>
                            ) : undefined
                          }
                          title={item.title}
                        />
                      </div>
                    ))}
                  </div>
                ),
              )}
            </div>
          ),
        }))}
        size="small"
        stream={false}
      />
    </main>
  );
}