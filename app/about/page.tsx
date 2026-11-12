import Image from "next/image";
import { Link, ScrollReveal, StaggerReveal } from "../components";

const heading =
  "Hey! I’m a Designer who codes based in KL. Weekdays, I turn messy data into screens people enjoy reading. Weekends, I’m usually somewhere with trees.";
const story = [
  "I was born in Klang, and my family moved to Sibu when I was 9. My childhood was pure kampung. Main mercun, street soccer on the road, and evening bike rides around the neighbourhood with stray dogs chasing me half the time. To this day, I pedal faster the moment I hear barking.",
  "So yeah, I’m a kampung boy for life. Crowded malls on a Saturday? Hard pass. KL is where I work, but nature is where I feel most like myself.",
  "Hiking is how I recharge. I pack light, leave the laptop at home and walk until my head goes quiet. Whatever stressed me out during the week feels pretty small from the top of a hill.",
  "I’m also a massive Godzilla fan. I grew up watching monsters nuke cities on TV, and I never miss a new movie. I caught Godzilla Minus Zero recently, and the first 10 minutes still give me goosebumps. Every time I play the soundtrack, I start running like King Ghidorah is right behind me.",
  "And yes, I support Tottenham Hotspur. Street soccer got me into football, and Spurs taught me heartbreak. Every season I get my hopes up, we lose in the most creative ways, and I’m back the next week anyway.",
  "Into hiking, giant monsters, or want to talk about Spurs’ latest heartbreak? Say hi. I’m always up for a chat.",
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
