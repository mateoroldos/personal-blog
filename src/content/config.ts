import { defineCollection, z } from "astro:content";
import { rssSchema } from "@astrojs/rss";

const blogCollection = defineCollection({
  type: "content",
  schema: rssSchema.extend({
    isDraft: z.boolean().optional().default(false),
    title: z.string(),
    description: z.string(),
    date: z.string().transform(str => new Date(str)),
    tags: z.array(z.string()),
    heroImage: z.string().optional(),
  }),
});

export const collections = { blog: blogCollection };
