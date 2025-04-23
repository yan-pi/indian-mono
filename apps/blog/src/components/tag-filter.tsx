"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TagCard } from "@/components/tag-card";
import { useCallback, useEffect, useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";

interface TagFilterProps {
  tags: string[];
  selectedTag?: string | string[];
}

export function TagFilter({ tags, selectedTag }: TagFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  // Initialize active tags from props or URL
  useEffect(() => {
    if (typeof selectedTag === "string" && selectedTag) {
      setActiveTags([selectedTag]);
    } else if (Array.isArray(selectedTag) && selectedTag.length > 0) {
      setActiveTags(selectedTag);
    } else {
      setActiveTags([]);
    }
  }, [selectedTag]);

  const handleTagClick = useCallback(
    (tag: string) => {
      let newActiveTags: string[];

      // Toggle tag selection
      if (activeTags.includes(tag)) {
        newActiveTags = activeTags.filter((t) => t !== tag);
      } else {
        newActiveTags = [...activeTags, tag];
      }

      setActiveTags(newActiveTags);

      // Update URL
      const params = new URLSearchParams(searchParams);
      if (newActiveTags.length > 0) {
        params.set("tags", newActiveTags.join(","));
      } else {
        params.delete("tags");
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [activeTags, pathname, router, searchParams],
  );

  const clearFilter = useCallback(() => {
    setActiveTags([]);

    // Update URL
    const params = new URLSearchParams(searchParams);
    params.delete("tags");
    router.push(`${pathname}?${params.toString()}`);
  }, [pathname, router, searchParams]);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h2
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xl font-serif font-bold flex items-center cursor-pointer"
        >
          Filter by Tag{" "}
          {isExpanded ? (
            <ChevronUp size={20} className="ml-2" />
          ) : (
            <ChevronDown size={20} className="ml-2" />
          )}
        </h2>
        {activeTags.length > 0 && (
          <button
            onClick={clearFilter}
            className="flex items-center gap-1 text-fd-muted-foreground"
          >
            <X size={16} />
            <span>Clear filters</span>
          </button>
        )}
      </div>
      {isExpanded && (
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className="p-0 bg-transparent border-none"
            >
              <TagCard
                name={tag}
                displayCount={true}
                isActive={activeTags.includes(tag)}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
