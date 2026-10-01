import type { Metadata } from "next";
import { PresentationCover } from "../components";

export const metadata: Metadata = {
  title: "Portfolio presentation — Shafiq Efféndy",
  // Opened by its address when presenting. Nothing links here, and search
  // engines are asked to leave it out.
  robots: { index: false, follow: false },
};

export default function PresentationPage() {
  return <PresentationCover />;
}
