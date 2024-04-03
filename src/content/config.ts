import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    isDraft: z.boolean().optional().default(false),
    title: z.string(),
    description: z.string(),
    date: z.string().transform(str => new Date(str)),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { blog: blogCollection };
