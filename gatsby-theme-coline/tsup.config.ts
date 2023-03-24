import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/gatsby-node.ts", "src/gatsby-config.ts"],
  splitting: true,
  clean: true,
  dts: true,
  format: ["cjs"],
});
