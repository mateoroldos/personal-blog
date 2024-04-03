import { z } from 'astro:content';

const projectSchema = z.object({
  repo: z.string(),
  link: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
});

export type Project = z.infer<typeof projectSchema>;

const projects: Project[] = [
  {
    repo: 'project-toucans',
    link: 'https://github.com/emerald-dao/project-toucans-v2',
    description: 'Create and manage DAOs on the Flow Blockchain.',
    tags: ['Svelte', 'TypeScript', 'Flow'],
  },
  {
    repo: 'tokenbase',
    link: 'https://github.com/mateoroldos/tokenbase',
    description: 'Create, manage and export design tokens.',
    tags: ['Svelte', 'TypeScript', 'Tailwind CSS'],
  },
  {
    repo: 'floats',
    link: 'https://github.com/emerald-dao/float',
    description: 'Flow proof of attendance dapp.',
    tags: ['Svelte', 'TypeScript', 'Flow'],
  },
  {
    repo: 'personal-blog',
    link: 'https://github.com/mateoroldos/obsidian-blog',
    description: 'Astro template to create a blog from Obsidian notes.',
    tags: ['Astro', 'React', 'TypeScript', 'Tailwind'],
  },
  {
    repo: 'emerald-academy',
    link: 'https://github.com/emerald-dao/emerald-academy-v2',
    description: 'A platform for learning about the Flow Blockchain ecosystem.',
    tags: ['Svelte', 'TypeScript', 'Flow'],
  },
];

export async function getProjects(): Promise<Project[]> {
  return projects;
}
