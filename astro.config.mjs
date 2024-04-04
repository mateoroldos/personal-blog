import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vesper from "./src/lib/vesper.json";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import svelte from "@astrojs/svelte";
import cloudflare from "@astrojs/cloudflare";
import partytown from "@astrojs/partytown";
import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  site: "https://mateor.xyz",
  output: "hybrid",
  integrations: [
    mdx(),
    sitemap(),
    tailwind(),
    icon(),
    svelte(),
    solidJs(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
  markdown: {
    shikiConfig: {
      theme: vesper,
      wrap: true,
    },
  },
  adapter: cloudflare(),
});
