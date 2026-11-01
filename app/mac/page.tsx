import type { Metadata } from "next";
import { Mac } from "../components";

export const metadata: Metadata = {
  title: "Macintosh — Shafiq Efféndy",
  description: "Shafiq Efféndy's portfolio, on a classic Macintosh. Click the screen to open it.",
};

export default function MacPage() {
  return <Mac />;
}
