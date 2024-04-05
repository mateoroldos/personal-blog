import { projects } from "../../lib/projects";

export const GET = async () => {
  const getProjectsWithStars = () =>
    projects.map(async project => {
      const response = await fetch(
        `https://api.github.com/repos/${project.user}/${project.repo}`
      );
      const data = await response.json();

      return {
        ...project,
        stars: data.stargazers_count ?? 0,
      };
    });

  const projectsWithStars = await Promise.all(getProjectsWithStars());

  return new Response(JSON.stringify(projectsWithStars));
};
