import { defineConfig, envField } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import svelte from "@astrojs/svelte";
import cloudflare from "@astrojs/cloudflare";
import partytown from "@astrojs/partytown";
import solidJs from "@astrojs/solid-js";
import ayuMirage from "@shikijs/themes/ayu-dark";

export default defineConfig({
  site: "https://mr19.xyz",
  output: "static",
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
      theme: ayuMirage,
      wrap: true,
    },
  },
  adapter: cloudflare({
    imageService: "compile",
  }),
  env: {
    schema: {
      RESEND_API_KEY: envField.string({
        context: "server",
        access: "secret",
      }),
      MAILERLITE_API_KEY: envField.string({
        context: "server",
        access: "secret",
      }),
    },
  },
});
