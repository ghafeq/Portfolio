import { projectAsset } from "../case-study";

/** A file under /public/projects/Presentation. */
export const presentationAsset = (file: string) => projectAsset("Presentation", file);

// The home page's CEKAP mockup: five Rest Window screens, left to right, for
// the fan DeviceMockups draws. Shared by the cover and the CEKAP deck.
export const CEKAP_SCREENS = [
  "Rest Window - Move now 1.png",
  "Rest Window - Narrowing 1.png",
  "Rest Window - Comfortable 1.png",
  "Rest Window - Narrowing 2.png",
  "Rest Window - Move now 2.png",
].map((file) => `/mobile-mockups/${encodeURIComponent(file)}`);
