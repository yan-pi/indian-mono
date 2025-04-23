import { getTags, getSortedByDatePosts } from "@/lib/source";

export default async function sitemap() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.runfunrun.dev";
  const posts = getSortedByDatePosts();
  const tags = getTags();

  // Generate entry for each post
  const postEntries = posts.map((post) => ({
    url: `${baseUrl}${post.url}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Generate entry for each tag
  const tagEntries = tags.map((tag) => ({
    url: `${baseUrl}/tags/${tag}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Main pages
  const mainPages = ["", "/list", "/tags"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.9,
  }));

  return [...mainPages, ...postEntries, ...tagEntries];
}
