import type { NextConfig } from "next";

// The Gōshi gallery is its own Vercel project (ghafeq/goshi), built with the
// base path /goshi-design-system/. Set GOSHI_ORIGIN to that deployment, e.g.
// https://goshi-xxxx.vercel.app, before building; rewrites are fixed at build.
const goshiOrigin = process.env.GOSHI_ORIGIN?.replace(/\/$/, "");

const nextConfig: NextConfig = {
  images: {
    // 75 suits photographs. Case study illustrations are mostly small text,
    // hairlines and flat colour, which break up into visible blocks at 75, so
    // they ask for 90. Next 16 serves only listed qualities.
    qualities: [75, 90],
  },
  // A plain array runs after the app's own pages, so the case study at
  // /goshi-design-system/case-study is still served from here.
  async rewrites() {
    if (!goshiOrigin) return [];
    return [
      { source: "/goshi-design-system", destination: `${goshiOrigin}/` },
      { source: "/goshi-design-system/:path*", destination: `${goshiOrigin}/:path*` },
    ];
  },
};

export default nextConfig;
