import { z } from "astro:content";

const projectSchema = z.object({
  repo: z.string(),
  link: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
});

export type Project = z.infer<typeof projectSchema>;

const projects: Project[] = [
  {
    repo: "project-toucans",
    link: "/emerald-dao/project-toucans-v2",
    description: "Create and manage DAOs on the Flow Blockchain.",
    tags: ["Svelte", "TypeScript", "Flow"],
  },
  {
    repo: "tokenbase",
    link: "/mateoroldos/tokenbase",
    description: "Create, manage and export design tokens.",
    tags: ["Svelte", "TypeScript", "Tailwind CSS"],
  },
  {
    repo: "floats",
    link: "/emerald-dao/float",
    description: "Flow proof of attendance dapp.",
    tags: ["Svelte", "TypeScript", "Flow"],
  },
  {
    repo: "personal-blog",
    link: "/mateoroldos/personal-blog",
    description: "Cool personal site.",
    tags: ["Astro", "Svelte", "TypeScript", "Tailwind"],
  },
  {
    repo: "emerald-academy",
    link: "/emerald-dao/emerald-academy-v2",
    description: "A platform for learning about the Flow Blockchain ecosystem.",
    tags: ["Svelte", "TypeScript", "Flow"],
  },
];

export async function getProjects(): Promise<Project[]> {
  return projects;
}
