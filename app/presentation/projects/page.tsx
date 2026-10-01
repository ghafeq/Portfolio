import type { Metadata } from "next";
import NextLink from "next/link";
import { Deck, Shot, Slide, SlideTitle, projectAsset } from "../../components";

export const metadata: Metadata = {
  title: "Projects — Shafiq Efféndy",
  robots: { index: false, follow: false },
};

// Each tile opens that project's deck.
const projects = [
  {
    href: "/presentation/cekap",
    title: "CEKAP, Smart Flight Companion",
    image: projectAsset("Cekap", "Cover.png"),
  },
  {
    href: "/presentation/vstecs-billing",
    title: "VSTECS Billing",
    image: "Vstecs Tile.png",
  },
];

export default function ProjectsPage() {
  return (
    <Deck backHref="/presentation" nextHref="/presentation/cekap" previousHref="/presentation">
      <Slide label="Projects" style={{ justifyContent: "space-between" }}>
        <SlideTitle as="h1" hero>
          Projects
        </SlideTitle>
        <nav aria-label="Projects" className="deck-projects">
          {projects.map(({ href, title, image }) => (
            <NextLink className="deck-project" href={href} key={href}>
              <Shot className="deck-project-art" eager sizes="50vw" src={image} />
              <span className="deck-project-title">{title}</span>
            </NextLink>
          ))}
        </nav>
      </Slide>
    </Deck>
  );
}
