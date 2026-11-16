// Kept apart from theme.ts, a client module, so the server layout can inline
// this string rather than receive a client reference.
export const STORAGE_KEY = "theme";

/**
 * Runs in the page's head before anything paints, so a visitor who chose dark
 * never sees a flash of the light page. Their choice wins; otherwise the
 * system's setting does.
 */
export const themeScript = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){}})()`;
