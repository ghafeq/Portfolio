import Image from "next/image";
import { Link, ScrollReveal, StaggerReveal } from "../components";

const heading =
  "I design and ship interfaces end to end, from the first Figma frame to production code. Meetups taught me both. Not many back in the kampung, so I moved from Sibu, Sarawak to KL in 2023.";
// const bio =
//   "I moved to Kuala Lumpur from Sibu, Sarawak in 2023 and currently work at Gain Secure, where I work on design systems and build interfaces for vendor led projects.";
const bio2 =
  "Dieter Rams gave me the rule I work by: less, but better. People reach for the one feature they need and ignore everything else, so whatever I add beyond that lands on them.";
const bio3 =
  "AI made that rule harder to keep. Anyone ships a screen in a minute now and feature creep costs nothing, so most of my time goes to what I take out. On my last design system, that meant one component covering five cases instead of five components covering one each.";
const bio4 =
  "Deleting is slower than adding. I still think it's the better use of my time.";
const elsewhere = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/shafiq-effendy/" },
  { label: "ghafeq@gmail.com", href: "mailto:ghafeq@gmail.com" },
];

export default function AboutPage() {
  return (
    <main className="flex-1 wrapper bg-(--app-layer-background) px-6 py-16 text-(--text-primary) sm:px-10">
      <section>
        {/* <Link href="/" leadingIcon={<ArrowLeft size={16} />} type="standalone">
          Back home
        </Link> */}

        <StaggerReveal className="m-0">
          <div className="about-banner stagger-line stagger-line--1">
            <Image
              alt="Shafiq Efféndy working on a laptop at a Google developer event"
              fill
              priority
              sizes="(max-width: 720px) 100vw, 660px"
              src="/profile.jpg"
            />
          </div>
        </StaggerReveal>

        <ScrollReveal className="m-0">
          <span className="caption">
            from Shirakawa, Gifu, Japan
          </span>

          <h1 className="intro mt-12">{heading}</h1>
          {/* <p className="body-01 mt-5">{bio}</p> */}
          <br />
          <p className="body-01">{bio2}</p>
          <br />
          <p className="body-01">{bio3}</p>
          <br />
          <p className="body-01">{bio4}</p>
        </ScrollReveal>

        <div className="about-elsewhere mt-12">
          <span className="label">More of me, elsewhere</span>
          <ul className="about-elsewhere-links">
            {elsewhere.map(({ label, href }) => (
              <li key={href}>
                <Link target="_blank" href={href}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
