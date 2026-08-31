

import { ArrowRight, Boxes, CheckCircle, CircleX, ClockFading, Info, TriangleAlert } from "lucide-react";
import { Card, Link, Tabs, Tag, Tile } from ".";

export default function Page() {
  return (
    <main className="flex-1 wrapper bg-(--app-layer-background) px-6 py-16 text-(--text-primary) sm:px-10">
      <section className="mx-auto max-w-5xl">
        <span className="mb-3 label">
          Component foundation
        </span>
        <h1 className="intro">
          A small system for clear, expressive interaction.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-(--text-secondary)">
          Token-driven components for actions, navigation, and feedback.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <section className="">
            <h2 className="text-lg font-bold">Link states</h2>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link href="#tabs" trailingIcon={<ArrowRight height={18} width={18} />}>Enabled</Link>
              <Link href="#tabs">Hover and focus</Link>
              <Link href="#tabs" type="standalone">Standalone enabled</Link>
              <Link href="#tabs" type="standalone" loading>Standalone loading</Link>
              <Link href="#tabs" type="standalone" disabled>Standalone disabled</Link>
              <Link href="#tabs" loading>Loading</Link>
              <Link href="#tabs" disabled>Disabled</Link>
            </div>
          </section>
        </div>

        <section className="mt-8 " id="tabs">
          <h2 className="text-lg font-bold">Tabs and tags</h2>
          <div className="mt-6 grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(14rem,0.7fr)] md:items-start">
            <Tabs
              items={[
                {
                  value: "overview",
                  label: "Overview",
                  content: <p className="leading-7 text-(--text-secondary)">Keep related content together without losing the user&apos;s place.</p>,
                },
                {
                  value: "activity",
                  label: "Activity",
                  content: <p className="leading-7 text-(--text-secondary)">A second panel demonstrates the active tab state and content swap.</p>,
                },
                {
                  value: "archived",
                  label: "Archived",
                  content: <p className="leading-7 text-(--text-secondary)">Disabled tabs are supported when a section is unavailable.</p>,
                  disabled: true,
                },
              ]}
            />
            <div className="flex flex-wrap gap-2">
              <Tag icon={<Info height={15} width={15} />} tone="neutral">Neutral</Tag>
              <Tag icon={<ArrowRight height={15} width={15} />} showIcon={false} tone="info">No icon</Tag>
              <Tag icon={<CheckCircle height={15} width={15} />} tone="success">Complete</Tag>
              <Tag icon={<TriangleAlert height={15} width={15} />} tone="warning" size="small">Review</Tag>
              <Tag icon={<CircleX height={15} width={15} />} tone="danger" size="small">Blocked</Tag>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-bold">Card</h2>
          <div className="mt-6">
            <Card
              description="A unified design system for products"
              href="#card"
              icon={<Boxes height={22} width={22} />}
              title="Carbon"
            />
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-bold">Tile</h2>
          <div className="mt-6">
            <Tile
              description="Built a token-based design system in Figma and React. Used Claude to handle the repetitive code parts while I focused on the design decisions and architecture."
              href="#tile"
              tag={
                <Tag icon={<ClockFading height={15} width={15} />} tone="warning" size="small">
                  In Progress
                </Tag>
              }
              title="Goshi - Engineering, Product and Design System (v1.0.0)"
            />
          </div>
        </section>

      </section>
    </main>
  );
}
