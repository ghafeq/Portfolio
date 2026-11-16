"use client";

import { themeScript } from "./theme-script";

/**
 * The theme script, run from the server's HTML before the page paints. A client
 * component so the copy React renders in the browser can be inert text, which
 * keeps it from warning about rendering a script.
 */
export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{ __html: themeScript }}
      suppressHydrationWarning
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
    />
  );
}
