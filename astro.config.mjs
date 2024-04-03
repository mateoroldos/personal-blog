import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vesper from "./src/lib/vesper.json";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import svelte from "@astrojs/svelte";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://mateor.xyz",
  output: "hybrid",
  integrations: [react(), mdx(), sitemap(), tailwind(), icon(), svelte()],
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport"
  },
  markdown: {
    shikiConfig: {
      theme: vesper,
      wrap: true
    }
  },
  adapter: cloudflare()
});