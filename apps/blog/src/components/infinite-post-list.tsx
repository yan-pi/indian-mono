"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { postsPerPage } from "@/app/layout.config";
import { PostCard } from "@/components/post-card";

export interface Post {
  url: string;
  data: {
    title: string;
    description?: string;
    date: string;
    tags?: string[];
  };
}

interface InfinitePostsListProps {
  initialPosts: Post[];
  allPosts: Post[];
  title?: string;
}

export function InfinitePostsList({
  initialPosts,
  allPosts,
  title = "Collections",
}: InfinitePostsListProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialPosts.length < allPosts.length);
  const [isLoading, setIsLoading] = useState(false);

  // const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const loadPosts = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const startIndex = page * postsPerPage;
      const endIndex = startIndex + postsPerPage;
      const newPosts = allPosts.slice(startIndex, endIndex);

      setPosts((prev) => [...prev, ...newPosts]);
      setPage((prev) => prev + 1);

      if (endIndex >= allPosts.length) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to load posts:", error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, page, allPosts]);

  // Setup intersection observer
  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadPosts();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px 200px 0px" },
    );

    observer.observe(loadMoreRef.current);

    return () => {
      observer.disconnect();
    };
  }, [loadPosts, hasMore, isLoading]);

  // Reset state when props change (important for navigation between tags)
  useEffect(() => {
    setPosts(initialPosts);
    setPage(1);
    setHasMore(initialPosts.length < allPosts.length);
  }, [initialPosts, allPosts]);

  return (
    <div>
      {title && (
        <h1 className="text-3xl font-serif font-bold mb-4">
          {title} ({allPosts.length})
        </h1>
      )}
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.url}>
            <PostCard
              title={post.data.title}
              description={post.data.description ?? ""}
              url={post.url}
              date={new Date(post.data.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            />
          </li>
        ))}
      </ul>
      <div ref={loadMoreRef} className="mt-6 py-4">
        {isLoading && <p className="text-center">Loading more content...</p>}
        {!hasMore && posts.length > 0 && (
          <p className="text-center">🧙‍♂️ You've reached the end</p>
        )}
      </div>
    </div>
  );
}
