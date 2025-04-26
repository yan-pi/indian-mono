import { getSortedByDatePosts, getPostsByTag, getTags } from "@/lib/source";
import { InfinitePostsList, type Post } from "@/components/infinite-post-list";
import { TagFilter } from "@/components/tag-filter";
import { TagJsonLd } from "@/components/json-ld";
import { Suspense } from "react";
import { postsPerPage } from "@/app/layout.config";
import { notFound } from "next/navigation";

// Serialize the post data to ensure only plain objects are passed to client
function serializePost(post: any): Post {
  return {
    url: post.url,
    data: {
      title: post.data.title || "",
      description: post.data.description || undefined,
      date: post.data.date || "",
      tags: post.data.tags ? [...post.data.tags] : undefined,
    },
  };
}

export const dynamicParams = false;

// Match the PageProps constraint by making both params and searchParams Promises
export default async function UnifiedPostsPage(props: {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await props.params;
  const resolvedSearchParams = await props.searchParams;
  const slug = resolvedParams.slug;

  // Access the tags parameter from resolved search params
  const tagsParam = resolvedSearchParams.tags
    ? typeof resolvedSearchParams.tags === "string"
      ? resolvedSearchParams.tags
      : undefined
    : undefined;

  const isTagView = slug && slug.length > 0;

  let pageTitle = "All Posts";
  let allPosts = [];
  let selectedTags: string[] = [];

  if (isTagView) {
    // Tag view - get posts for this specific tag from path
    const tag = decodeURIComponent(slug[0]);
    pageTitle = tag;
    allPosts = getPostsByTag(tag);
    selectedTags = [tag];

    // If no posts found for this tag, return 404
    if (allPosts.length === 0) notFound();
  } else {
    // All posts view
    pageTitle = "Collections";

    // If we have tags parameter in the URL, filter posts by these tags
    if (tagsParam) {
      selectedTags = tagsParam.split(",");

      // Get all posts first
      let filteredPosts = getSortedByDatePosts();

      // Filter posts to only include those that have ALL selected tags
      selectedTags.forEach((tag) => {
        const tagPosts = getPostsByTag(tag);
        const tagPostUrls = new Set(tagPosts.map((post) => post.url));
        filteredPosts = filteredPosts.filter((post) =>
          tagPostUrls.has(post.url),
        );
      });

      allPosts = filteredPosts;

      // Update page title to show selected tags
      if (selectedTags.length === 1) {
        pageTitle = selectedTags[0];
      } else {
        pageTitle = `${selectedTags.length} Tags Selected`;
      }
    } else {
      // No tag filter, show all posts
      allPosts = getSortedByDatePosts();
    }
  }

  // Obter todas as tags disponíveis para o filtro
  const allTags = getTags();

  // Serialize the data to ensure only plain objects are passed to the client component
  const serializedPosts = allPosts.map(serializePost);
  const initialPosts = serializedPosts.slice(0, postsPerPage);

  return (
    <>
      {/* Componente de filtro de tags */}
      <TagFilter tags={allTags} selectedTag={selectedTags} />

      <Suspense fallback={<div>Loading posts...</div>}>
        {/* Lista de posts */}
        <InfinitePostsList
          allPosts={serializedPosts}
          initialPosts={initialPosts}
          title={pageTitle}
        />
      </Suspense>
      {/* JSON-LD para SEO */}
      {isTagView && <TagJsonLd tag={pageTitle} />}
    </>
  );
}
