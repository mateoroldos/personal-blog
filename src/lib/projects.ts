import { z } from "astro:content";

const projectSchema = z.object({
  name: z.string(),
  user: z.string(),
  repo: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  stars: z.number().optional(),
});

export type Project = z.infer<typeof projectSchema>;

export const projects: Project[] = [
  {
    name: "Tokenbase",
    repo: "tokenbase",
    user: "mateoroldos",
    description: "Create, manage and export design tokens.",
    tags: ["Svelte", "TypeScript", "Tailwind CSS"],
    stars: undefined,
  },
  {
    name: "Floats",
    repo: "float",
    user: "emerald-dao",
    description: "Proof of attendance on the Flow Blockchain.",
    tags: ["Svelte", "TypeScript", "Flow"],
    stars: undefined,
  },
  {
    name: "Project Toucans",
    repo: "project-toucans-v2",
    user: "emerald-dao",
    description: "Create and manage DAOs on the Flow Blockchain. ",
    tags: ["Svelte", "TypeScript", "Flow"],
    stars: undefined,
  },
  {
    name: "Personal Blog",
    repo: "personal-blog",
    user: "mateoroldos",
    description: "Cool personal site.",
    tags: ["Astro", "Svelte", "TypeScript", "Tailwind"],
    stars: undefined,
  },
  {
    name: "Emerald Academy",
    repo: "emerald-academy-v2",
    user: "emerald-dao",
    description: "A platform for learning about the Flow Blockchain ecosystem.",
    tags: ["Svelte", "TypeScript", "Flow"],
    stars: undefined,
  },
  {
    name: "CryptoKitties Arcade",
    repo: "cryptokitties-arcade",
    user: "emerald-dao",
    description:
      "Learn the Cadence programming languuage while saving kitties. Such a fun project!",
    tags: ["Svelte", "TypeScript", "Flow"],
    stars: undefined,
  },
];
