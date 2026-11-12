/**
 * The selected work, in the order the landing page shows it. Case studies read
 * it too, so "Next project" always follows the landing page's order.
 */
export const work = [
  {
    href: "/cekap",
    year: 2026,
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
    href: "/vstecs-billing",
    year: 2025,
    title: "CSP Reseller Billing at VSTECS",
    description:
      "Monthly cloud subscription billing for VSTECS and its reseller network, designed and built front end in ASP.NET MVC",
    cover: "/projects/Vstecs/Shared%20Partial%20View.png",
    info: "Professional" as const,
    aspect: 4096 / 2023,
  },
    {
    href: "https://goshi-nu.vercel.app/",
    year: 2026,
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
    href: "/five-company-mode",
    year: 2025,
    title: "Company Mode on Five Petroleum App",
    description:
      "Buying subsidised diesel against a company-held quota, from vehicle to invoice in seven steps",
    // The phones from the portrait cover, set smaller on a widened background.
    cover: "/projects/Five-App/Cover-wide.jpg",
    info: "Professional" as const,
    aspect: 8 / 5,
  },
  {
    href: "/five-fleet-portal",
    year: 2025,
    title: "SKDS & SKPS at Five Petroleum",
    description:
      "A web portal for fleet operators in Malaysia’s subsidised diesel scheme. Vehicles, drivers and subsidy points in one place",
    cover: "/projects/Five-Portal/Update%20Vehicle.png",
    info: "Professional" as const,
    aspect: 4096 / 2023,
  },
  {
    href: "/gain-secure",
    year: 2025,
    title: "Gain Secure Corporate Identity",
    description:
      "A mark for an AI-driven company, built on the “://” every web address shares, with its colour and type system",
    cover: "/projects/Gain-Secure/Cover.png",
    info: "Professional" as const,
    aspect: 1440 / 758,
  },
];

/**
 * The project after `href` among the on-site case studies, wrapping round to
 * the first. Pages not in the list (or external links) also lead to the first.
 */
export function nextProject(href: string) {
  const onSite = work.filter((item) => item.href.startsWith("/"));
  const index = onSite.findIndex((item) => item.href === href);

  return onSite[(index + 1) % onSite.length];
}
