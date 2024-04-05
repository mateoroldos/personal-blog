import { z } from "astro:content";

const projectSchema = z.object({
  name: z.string(),
  user: z.string(),
  repo: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
});

export type Project = z.infer<typeof projectSchema>;
export type ProjectWithStars = Project & { stars: number };

export const projects: Project[] = [
  {
    name: "project-toucans-v2",
    repo: "project-toucans",
    user: "emerald-dao",
    description: "Create and manage DAOs on the Flow Blockchain.",
    tags: ["Svelte", "TypeScript", "Flow"],
  },
  {
    name: "tokenbase",
    repo: "tokenbase",
    user: "mateoroldos",
    description: "Create, manage and export design tokens.",
    tags: ["Svelte", "TypeScript", "Tailwind CSS"],
  },
  {
    name: "floats",
    repo: "float",
    user: "emerald-dao/float",
    description: "Flow proof of attendance dapp.",
    tags: ["Svelte", "TypeScript", "Flow"],
  },
  {
    name: "personal-blog",
    repo: "personal-blog",
    user: "mateoroldos",
    description: "Cool personal site.",
    tags: ["Astro", "Svelte", "TypeScript", "Tailwind"],
  },
  {
    name: "emerald-academy",
    repo: "emerald-academy-v2",
    user: "emerald-dao",
    description: "A platform for learning about the Flow Blockchain ecosystem.",
    tags: ["Svelte", "TypeScript", "Flow"],
  },
];
