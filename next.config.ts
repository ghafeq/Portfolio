import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 75 suits photographs. Case study illustrations are mostly small text,
    // hairlines and flat colour, which break up into visible blocks at 75, so
    // they ask for 90. Next 16 serves only listed qualities.
    qualities: [75, 90],
  },
};

export default nextConfig;
