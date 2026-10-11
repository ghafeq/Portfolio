// The only source the assistant answers from. Everything here is public
// already, on this site or the resume; nothing private belongs in it, because
// a determined visitor can get the model to repeat it back word for word.
// Anything not written here, the assistant says it does not know rather than
// guessing, so add to it to unlock more answers.
export const PROFILE = `
# Shafiq Efféndy

## Basics
- Design Engineer: designs user interfaces in Figma and builds them in code. The site and resume also use the title Product Designer. Self-taught designer with a Diploma in Information Technology from SEGi College Kota Damansara, Petaling Jaya (graduated 2021).
- Four years of experience shipping production UI on enterprise platforms, and more broadly designing and building responsive web and mobile products across enterprise, operations, distribution, event technology and consumer platforms.
- Grew up in Sibu, Sarawak. Moved to Kuala Lumpur in 2023, partly because there were few design and tech meetups back home, and meetups are where Shafiq learned both design and code.
- Based in Kuala Lumpur, Malaysia.
- Contact: ghafeq@gmail.com, LinkedIn linkedin.com/in/shafiq-effendy/. The resume PDF is linked as "Resume" in the site's top navigation.
- Pronouns: he/him.

## How Shafiq works
- One person, whole pipeline: sketches in Figma, codes it, ships it, and watches people use it.
- Works by Dieter Rams' rule, "less, but better". People reach for the one feature they need and ignore everything else, so whatever is added beyond that lands on them.
- AI makes that rule harder to keep: anyone can ship a screen in a minute and feature creep costs nothing, so most of the time goes into what gets taken out. On the most recent design system that meant one component covering five cases instead of five components covering one each. Deleting is slower than adding, and Shafiq still thinks it is the better use of time.
- Uses Double Diamond thinking early on and clean code at the end, so what is approved in Figma is what ships.
- Lives in Figma Auto Layout and translates Auto Layout decisions directly into CSS.
- Designs with code in mind: ASP.NET, React, TypeScript strict mode, monorepos with CI gates.
- Builds prototypes and translates designs to code early and often. That tests how faithful the design is and exposes friction before it gets expensive. He treats design-to-code translation as a way to keep design intent intact, not as a handoff.
- Builds accessibility in from the start: checks contrast, keyboard navigation, touch targets, semantic HTML, non-colour cues and reduced motion during the build.
- Works as part of a team and describes results as team outcomes. He can speak to his own role in detail when asked.
- Discovery and user research are not the daily focus of his current work, because client requirements drive most decisions. He is working to develop this area further.
- Principles Shafiq ships by:
  - Design to production: design isn't done until it ships the way it was intended.
  - End-to-end ownership: UX, UI and code, carried all the way.
  - Consistency is a feature: systematic UI builds user trust and team speed.
  - Tools in service of quality: AI workflows raise the standard of execution, never replace it.

## Career
- Gain Secure Sdn Bhd, Kuala Lumpur. August 2023 to present. Title on the resume: UX Designer; in practice the sole design engineer, at a technology-focused vendor company. Owns product delivery from start to finish across several client-led products: gathers client requirements, shapes the system design, builds UI storyboards in Figma, and turns those designs into front-end code with the engineering team on Azure DevOps. Maintains the company's Figma component library, including semantic tokens, multi-mode theming and Code Connect mappings for engineer handoff. Builds Figma designs in HTML, CSS, JavaScript, Razor, ASP.NET MVC and Blazor. Standardised reusable components and patterns for forms, tables, filters, alerts, modals, navigation and responsive states. Works with developers and stakeholders on APIs, data structures, application logic and responsive behaviour. Most client products are under NDA.
- UI/UX Designer, Intelliware Solutions Sdn Bhd, remote. April 2022 to January 2023.
- Front End Developer (internship), AIME Healthcare, Kuala Lumpur. October 2020 to April 2021.

## Client projects (through Gain Secure)
- Four production platforms shipped: the VSTECS CSP Reseller Billing portal (ASP.NET MVC and React), the FIVE Petroleum Fleet Portal (ASP.NET), the FIVE mobile app (ASP.NET and React) and a Daikin Indoor Air Quality Monitoring dashboard. All are built and deployed on Azure DevOps.
- VSTECS distribution platforms, April 2025 to August 2025. Designed and built a payment experience from 0 to 1, and redesigned and built the existing Developer, Internal and Reseller portals for consistency.
- FIVE Petroleum operations platform, April 2024 to December 2024. Designed and built the FIVE Subsidised Portal from 0 to 1, the SKDS/SKPS integration across the FIVE Back Office and app, and payment flows.
- Daikin indoor air quality monitoring, February 2024 to March 2024. Designed and built a real-time indoor air-quality monitoring experience from 0 to 1.
- Konfx event technology platform (under NDA). Built the front end revamp of existing Konfx apps, from event management and operations through consumer-facing experiences.

## Case studies on this site
Each has its own page; the path is given so visitors can open it.

### CEKAP, smart flight companion (/cekap)
- A checkpoint-aware airport guidance app for KLIA, also documented as Smart Flight Companion. Built as a self-initiated project to demonstrate his design thinking; it is his main public portfolio piece.
- Process: mapped the airport journey and the points where travellers lose time and confidence; built UI storyboards in Figma for the key screens; tested the flows in code early to see how the design behaved in real use; then removed features that did not earn their place.
- Personal, self-initiated project. May 2026 to present. Role: research, UX, design system, front end. Designed in Figma, built in Expo React Native with Claude Code. Status: v1 built, not yet tested with travellers.
- Airport guidance for the day you have the least capacity to think: a calm, checkpoint-based support layer for stressed travellers at KLIA.
- Origin: in March 2025, weeks after surgery for a herniated disc, Shafiq flew from KLIA2 with a sister, sat down to rest, misjudged the walk back, reached security ten minutes too late and missed the flight.
- Built on inclusive design: capacity can be permanent, temporary or situational. Mapped seven airport and airline products across nine capabilities; information is well covered, but cognitive load, recovery and shared awareness are not.
- Interviews fell through twice, so Shafiq ran a graded desk research pass instead, and is clear it cannot show how often problems happen.
- Four inputs (airline deadline, chosen pace, last confirmed checkpoint, data staleness) resolve to one next action. Every screen answers: where am I, what now, is stopping safe.
- Key calls: manual checkpoints over GPS sensing; offline treated as a connection state, not a truth state, with five data states (confirmed, live, likely, last known, unconfirmed); a Rest Window after every checkpoint showing how long you can safely pause, based on your own pace.
- Cut Shared Awareness (letting someone trusted follow the journey) until the manual journey is proven, because of cost, privacy risk and weak evidence.
- Next: five think-aloud sessions, re-tests, a comparison with an existing airline app, offline recovery testing and a POUR accessibility review. Zero travellers tested so far, and the case study says so plainly.

### Gōshi Design System (/goshi-design-system)
- Personal, self-initiated project, sole designer, started 6 September 2025, in progress. Figma and Iconoir, with a code framework and markdown specs.
- A component library and UI framework meant to span enterprise, consumer and physical products (kiosks, handheld terminals, home appliances). Enterprise is the first tier.
- Exists because three parallel client projects at work had no shared design layer, so patterns kept being redrawn.
- Three artefacts: the Figma library, the code framework, and written markdown specs (naming dictionary, vocabulary, rules that cannot be breached, implementation notes) readable by people and coding agents.
- Rules: foundations version separately from components; icons are borrowed, not drawn; each platform gets its own package (kiosk targets of 48 to 64px and 7:1 contrast, enterprise targets of 24px and 4.5:1 text).
- Honest gap: it has not yet carried a product end to end. Enterprise components are going into development alongside the design work.

### Gain Secure corporate identity (/gain-secure)
- Professional. Sole graphic designer and lead, in Adobe Illustrator, in use since 2025.
- The mark is built on "://", the part of a web address everyone recognises, signifying the bridge between human insight and machine intelligence.
- Palette: Pantone 2727 C bright blue, 368 C lime green, 532 C deep navy, 419 C near black. Typeface: Plus Jakarta Sans.

### Company Mode on the Five Petroleum app (/five-company-mode)
- Professional. UI/UX Designer, Figma and prototyping, in production since 2025.
- Fleet drivers buy subsidised diesel against a company-held quota in seven steps: select vehicle, verify with the vehicle's PIN, check quota, enter details, choose payment, authorise, receive a digital invoice.
- Quota is shown before the amount field. Two ways to pay: Five Wallet, or Pay at Counter where the cashier enters their own credentials on the driver's phone.
- Pump-side failure states were designed but none shipped.

### SKDS & SKPS fleet portal at Five Petroleum (/five-fleet-portal)
- Professional. Sole designer and front end build, Figma, ASP.NET and Azure, in production since 2025.
- A web portal for fleet operators in Malaysia's subsidised diesel scheme: three registers (vehicles, drivers, points) sharing one create, update and disable pattern.
- Quota is capped per vehicle, so one truck cannot drain the fleet's allocation. Points expiry is shown on the balance. The driver's mobile number links the portal to the mobile app.

### CSP reseller billing at VSTECS (/vstecs-billing)
- Professional. Sole designer and front end build, Figma and ASP.NET MVC, in production since 2025.
- Monthly cloud subscription billing for VSTECS and its reseller network. Resellers see exact overdue amounts and settle chosen invoices; internal ops sort every account by days overdue.
- Decisions: email plus TOTP MFA instead of passwords on shared finance workstations; FPX payment redirects so no card data touches the app; one shared ASP.NET MVC partial view powering both the Invoices and Activity pages.

## Skills
- Tech stack in short: HTML5, CSS3, JavaScript and TypeScript for front end; React, ASP.NET MVC and Core, Razor and Blazor for frameworks; Figma with variables, multi-mode theming, responsive component APIs and Code Connect for design; Azure DevOps for building and deploying every platform.
- Product design: user flows, wireframing and prototyping, interaction and responsive design, information hierarchy, UX writing, design process documentation.
- Design systems: foundation libraries, Figma variables and Code Connect, multi-mode theming, semantic and component tokens, component APIs, anatomy and props.
- Front end: HTML, CSS, JavaScript, TypeScript, ASP.NET MVC, Core, Blazor and Razor, React, Vue, Vite, pnpm, Turborepo, Git.
- Accessibility: colour contrast auditing, touch targets and reduced motion, inclusive design, keyboard focus navigation, non-colour validation cues.
- Research: research planning, journey and affinity mapping, usability testing, secondary research, heuristic evaluation.
- Tools: Figma and FigJam, VS Code and GitHub, Visual Studio and Azure DevOps, Notion, Claude Code and Codex.

## This portfolio
- Designed and built by Shafiq with Next.js, TypeScript and Tailwind CSS. Source code is MIT licensed; the content and branding are not.
- The About page photo was taken in Shirakawa, Gifu, Japan.

## Hobbies and life outside work
- Originally from Sibu, Sarawak; moved to Kuala Lumpur in 2023.
- Outside work, he runs self-initiated projects to test his design thinking (listed below).
- No other hobbies have been shared yet. For anything beyond this, suggest emailing.

## Other personal projects
- CEKAP and the Gōshi Design System, above.
- An audit of the AirBorneo booking flow. No further details shared yet.
- An analysis of e-payment pain points. No further details shared yet.

## Availability and work preferences
- Based in Malaysia and targeting senior Design Engineer roles in Singapore and the wider APAC region.
- Start dates, relocation, visas and salary are not covered here; those go to email.
`.trim();
