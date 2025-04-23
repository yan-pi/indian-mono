"use client";

import { getPostsByTag } from "@/lib/source";
import { TagIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";

export const TagCard = ({
  name,
  displayCount = false,
  isActive = false,
  onClick,
}: {
  name: string;
  displayCount?: boolean;
  isActive?: boolean;
  onClick?: () => void;
}) => {
  const numOfPosts = getPostsByTag(name);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const baseClasses = clsx(
    "rounded-md border shadow-md transition-colors text-lg px-2 py-0.5 flex gap-1 no-underline",
    isActive
      ? "bg-fd-accent text-fd-accent-foreground hover:bg-fd-accent/90"
      : "bg-fd-card text-fd-card-foreground hover:bg-fd-accent/10",
  );

  const iconClasses = clsx(
    "my-auto",
    isActive ? "text-fd-accent-foreground" : "text-fd-muted-foreground",
  );

  const textClasses = clsx(isActive && "font-medium");

  if (onClick) {
    return (
      <div className={clsx(baseClasses, "cursor-pointer")} onClick={onClick}>
        <TagIcon size={18} className={iconClasses} />
        <span className={textClasses}>{name}</span>
        {displayCount && (
          <span className="text-fd-muted-foreground">
            ({numOfPosts.length})
          </span>
        )}
      </div>
    );
  }

  const params = new URLSearchParams(searchParams);
  const currentTags = params.get("tags")?.split(",") || [];
  const updatedTags = [...currentTags, name].filter((t) => t !== "");
  params.set("tags", updatedTags.join(","));
  const href = pathname.includes("/list")
    ? `${pathname}?${params.toString()}`
    : `/list?tags=${name}`;

  return (
    <Link href={href} className={baseClasses}>
      <TagIcon size={18} className={iconClasses} />
      <span className={textClasses}>{name}</span>
      {displayCount && (
        <span className="text-fd-muted-foreground">({numOfPosts.length})</span>
      )}
    </Link>
  );
};
