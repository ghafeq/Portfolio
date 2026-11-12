import Image from "next/image";
import { Link, ScrollReveal, StaggerReveal } from "../components";

const heading =
  "Hi there. I’m a Design Engineer living in Kuala Lumpur. By day I turn messy data into clean, friendly screens. By weekend you’ll find me somewhere with trees.";
const story = [
  "I was born in Klang and moved to Sibu, Sarawak, at 9. My childhood was main mercun, street soccer on the road and evening bike rides around the kampung, usually with a stray dog chasing me. I still pedal faster when I hear barking.",
  "Those years made me a kampung boy for life. Give me a quiet trail over a packed mall any day. The city pays the bills, but nature is where I feel like myself.",
  "Hiking is my reset button. I pack light, leave the laptop behind and walk until my head goes quiet. The worst problem from the week looks tiny from the top of a hill.",
  "I’m also a proud fan of Godzilla and Ultraman. I grew up watching giant monsters nuke cities and a silver hero fly in to stop them before his colour timer ran out. I still line up for every new film and series. My bet always goes to Ultraman Tiga.",
  "And yes, I support Tottenham Hotspur. Street soccer started the love, and Spurs taught me heartbreak. Being a fan means hoping big, losing in creative ways and coming back next week anyway.",
  "If you love hiking, giant monsters or want to talk about Spurs’ next heartbreak, say hello. I’m always up for a chat.",
];
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
              alt="Shafiq Efféndy traveling in Shirakawa, Gifu, Japan"
              fill
              priority
              sizes="(max-width: 720px) 100vw, 660px"
              src="/Profile.jpg"
            />
          </div>
        </StaggerReveal>

        <ScrollReveal className="m-0">
          <span className="caption">
            from Shirakawa, Gifu, Japan
          </span>

          <h1 className="intro mt-12">{heading}</h1>
          {story.map((paragraph) => (
            <p className="body-01 mt-6" key={paragraph}>
              {paragraph}
            </p>
          ))}
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
