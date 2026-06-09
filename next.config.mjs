import createBundleAnalyzer from "@next/bundle-analyzer";
import createPwaPlugin from "next-pwa";
import { COLINE_ANALYZE, IS_DEV } from "./src/env/private.mjs";

const withPwa = createPwaPlugin({ dest: "public" });
const withBundleAnalyzer = createBundleAnalyzer({ enabled: !IS_DEV && COLINE_ANALYZE === "true" });

/** @type {import("next").NextConfig} */
const config = {
  output: "standalone",
  serverExternalPackages: ["shikiji"],
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

// @types/next-pwa targets Next.js 12/13, while this project uses Next.js 16.
// noinspection JSCheckFunctionSignatures
export default withPwa(withBundleAnalyzer(config));
