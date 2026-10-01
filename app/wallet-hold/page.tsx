import type { Metadata } from "next";
import {
  CaseStudyClip,
  CaseStudyHero,
  CaseStudyIndex,
  CaseStudyMeta,
  CaseStudySection,
  CaseStudyStat,
  ImageLightbox,
  ScrollReveal,
  projectAsset,
} from "../components";

export const metadata: Metadata = {
  title: "Super App Wallet — Shafiq Efféndy",
};

const clip = (file: string) => projectAsset("Wallet-Hold/Clips", file);

// Every recording is exported from the same device at the same size.
const CLIP_SCREEN = { width: 440, height: 960 };

const meta: [string, string][] = [
  ["Role", "UX, UI, prototype build"],
  ["Timeline", "September 2026"],
  ["Team", "Solo, take-home assessment"],
  ["Status", "Prototype built, not tested with users"],
  ["Design", "Figma"],
  ["Build", "Expo React Native, Claude Code"],
];

const moments = [
  {
    title: "A hold with a timeline, not a locked door",
    body: "“Check your account status” sits where the shortcuts end, so nobody has to hunt for it. The status page opens on what they can still spend, RM20 of a RM50 allowance, then walks the review step by step with a time on each: hold placed, documents received, someone reviewing it now, a decision by Tuesday. It says how long reviews usually take and how the answer will arrive, before anyone thinks to ask.",
    video: {
      ...CLIP_SCREEN,
      src: clip("Account Status.mp4"),
      poster: clip("Account Status.jpg"),
      label:
        "Screen recording. The home screen hides the balance behind an On Hold tag. Check your account status opens a page showing RM20 of a RM50 allowance and a review timeline ending in a decision by Tuesday, then Open QR Payment pays RM12.45 to Pakopi@TamanDesa.",
    },
  },
  {
    title: "Lunch still gets paid for",
    body: "A frozen wallet at a hawker stall is the moment someone decides never to top it up again. So Scan & Pay stays open under a hold, with the allowance balance printed above the keypad before a single digit goes in. A known merchant under the cap goes straight through. A new shop, a transfer, a reload or anything past RM50 a day goes to review instead, which keeps the exposure small if the flag turns out to be right.",
    video: {
      ...CLIP_SCREEN,
      src: clip("Scan and Pay.mp4"),
      poster: clip("Scan and Pay.jpg"),
      label:
        "Screen recording. From the home screen, Scan & Pay shows an allowance balance of RM20 under the amount. RM12.00 is entered and paid to Pakopi@TamanDesa over DuitNow, ending on a transfer confirmation and back at home, still on hold.",
    },
  },
  {
    title: "The rest of the app keeps its promise",
    body: "A hold on the wallet is not a hold on the person. Rides, deals and rewards stay where they were, and the balance is masked rather than zeroed, so the account never looks emptied. When they book a ride, a tip recalls that 72% of last month’s ride spending already went through the wallet. It is the quiet reminder of why they trusted it, at the point they are most likely to stop.",
    video: {
      ...CLIP_SCREEN,
      src: clip("Ride Spending.mp4"),
      poster: clip("Ride Spending.jpg"),
      label:
        "Screen recording. From the home screen, still on hold, e-hailing opens a route to Mid Valley Megamall with ride options. A Monthly Ride Spending tip says 72% of last month’s ride spending was already paid with the wallet, and Choose Standard books the ride.",
    },
  },
];

const numbers = [
  {
    value: "RM50",
    title: "Daily allowance while held",
    body: "Enough for meals and a ride home. Small enough that a real fraudster gains little from it.",
  },
  {
    value: "5",
    title: "Steps on the status timeline",
    body: "Each one timestamped, with the decision date and the three channels it will arrive through stated up front.",
  },
  {
    value: "3",
    title: "Flows recorded on device",
    body: "Checking the hold, paying a merchant and booking a ride, all under the same restricted account.",
  },
  {
    value: "0",
    title: "Users tested so far",
    body: "This was a take-home. Everything above is a design position, not a result, and I am not going to present it as one.",
    // The number the other three are waiting on.
    emphasis: true,
  },
];

export default function WalletHoldPage() {
  return (
    <main className="case-study flex-1 bg-(--white) text-(--text-primary)">
      <div className="wrapper px-6 pt-16 pb-16 sm:px-10">
        <CaseStudyHero
          lede="What a wallet owes you after it freezes your money by mistake."
          title="Super App Wallet"
        />

        <ScrollReveal className="case-study-figure case-study-cover mt-6">
          <ImageLightbox
            alt="Three phone screens from the wallet: a ride booking with a monthly ride spending tip, the home screen with the balance on hold, and the account status timeline with the review in progress."
            height={758}
            preload
            sizes="(max-width: 660px) 100vw, 600px"
            src={projectAsset("Wallet-Hold", "Cover.png")}
            width={1440}
          />
        </ScrollReveal>

        <CaseStudyMeta items={meta} />

        <CaseStudySection
          copy={[
            "The brief was a super app wallet, the kind that carries rides, groceries, deals, insurance and loans on top of a balance. I narrowed it to the one state that decides whether anyone keeps using it: the account a risk check has put on hold.",
            "Fraud checks are tuned to miss as little fraud as possible, which means they also stop people who did nothing wrong. For those people the product has already made a mistake. What it does next is the whole relationship.",
          ]}
          title="Where it starts. The flag is not the failure."
        />

        <CaseStudySection
          copy={[
            "The usual hold hides the balance, locks every payment and offers a support link. There is no reason given, no sense of how long it lasts and no way to buy lunch in the meantime. Each gap sends the same message, that the user is the suspect.",
            "So they take the money out the moment they can, and the false positive quietly becomes a lost customer.",
          ]}
          title="A frozen account reads as an accusation"
        />

        <CaseStudySection
          copy="Tell them it is a check, not a verdict. Show where the review is and when it ends. Leave a capped allowance so daily life does not stop. Keep everything that is not money moving exactly as it was. Each of those can be shipped without changing the risk model, which is what makes them worth doing first."
          title="The solution. Four promises the hold has to keep."
        />

        <CaseStudySection title="Three moments, recorded on device.">
          <div className="grid gap-4">
            {moments.map(({ title, body, video }) => (
              <CaseStudyClip key={title} title={title} video={video}>
                {body}
              </CaseStudyClip>
            ))}
          </div>
        </CaseStudySection>

        <CaseStudySection title="Numbers. What the design commits to, and what I have.">
          <div className="grid gap-4 sm:grid-cols-2">
            {numbers.map(({ value, title, body, emphasis }) => (
              <CaseStudyStat emphasis={emphasis} key={title} title={title} value={value}>
                {body}
              </CaseStudyStat>
            ))}
          </div>
        </CaseStudySection>

        <CaseStudySection
          copy={[
            "The allowance is the riskiest call. If the flag was right, RM50 a day is money a fraudster gets to keep, and the exclusions for new shops, transfers and reloads are my guess at where that money would go. That limit belongs to the risk team, not to me.",
            "The timeline is only as honest as operations. “By Tuesday” builds trust when it holds and destroys it when it slips, so the date has to come from real review queues rather than a hopeful default.",
            "Next, I would test the status page with people who have had an account held, compare how long they keep their balance in against today’s hold, and work with risk on an allowance that both sides can defend.",
          ]}
          title="What is next, and what could sink it."
        />
      </div>
      <CaseStudyIndex />
    </main>
  );
}
