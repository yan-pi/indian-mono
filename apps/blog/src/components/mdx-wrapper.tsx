"use client";

import { ReactNode } from "react";

export function ClientMDXWrapper({
  children,
  post,
}: {
  children: ReactNode;
  post: any;
}) {
  // This component is a client component that can safely use client hooks
  // while allowing the parent to be server rendered for SEO
  return <div className="mdx-wrapper">{children}</div>;
}
