import { type Project } from "./projects";
import { slugifyStr } from "./slugify";
import type { CollectionEntry } from "astro:content";

const getBlogUniqueTags = (posts: CollectionEntry<"blog">[]) => {
  const tags: string[] = posts
    .filter(({ data }: CollectionEntry<"blog">) => {
      return !data.isDraft;
    })
    .flatMap(post => post.data.tags)
    .map(tag => slugifyStr(tag))
    .filter(
      (value, index, self) => self.findIndex(tag => tag === value) === index
    )
    .sort((tagA, tagB) => tagA.localeCompare(tagB));
  return tags;
};

export const getProjectUniqueTags = (projects: Project[]) => {
  const tags = projects
    .flatMap(project => project.tags)
    .map(tag => slugifyStr(tag))
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort((tagA, tagB) => tagA.localeCompare(tagB));
  return tags;
};

const getUniqueTags = (
  posts: CollectionEntry<"blog">[],
  projects: Project[]
) => {
  const projectTags = getProjectUniqueTags(projects);
  const blogTags = getBlogUniqueTags(posts);

  const tags = [...projectTags, ...blogTags].filter(
    (value, index, self) => self.indexOf(value) === index
  );

  return tags;
};

export const getPostsByTag = (
  posts: CollectionEntry<"blog">[],
  tag: string
) => {
  return posts.filter(post => {
    return post.data.tags.map(tag => slugifyStr(tag)).includes(tag);
  });
};

export const getProjectsByTag = (projects: Project[], tag: string) => {
  return projects.filter(project => {
    return project.tags.map(tag => slugifyStr(tag)).includes(tag);
  });
};

export default getUniqueTags;
