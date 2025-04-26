import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { formatDate } from "../lib/date";

export async function GET(context) {
  const blogPosts = await getCollection("blog");

  const publishedPosts = blogPosts.filter(post => !post.data.isDraft);

  return rss({
    title: "mr19 blog",
    description:
      "Sharing knowledge about local first and collaborative software",
    site: context.site,
    items: publishedPosts.map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.slug}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
