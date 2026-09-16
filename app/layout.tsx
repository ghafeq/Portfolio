import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { ClickSound, CursorPet, PixelSplash, SmoothScroll, TopNavigation } from "./components";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

// Only code illustrations use it, so it is not preloaded on every page; the
// file is fetched the first time a page actually sets text in it.
const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Shafiq Efféndy — Product Designer",
  description: "Self-taught Product Designer. Figma to shipped code, one person, whole pipeline.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakartaSans.variable} ${robotoMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TopNavigation />
        {children}
        <CursorPet />
        <ClickSound />
        <PixelSplash />
        <SmoothScroll />
      </body>
    </html>
  );
}
