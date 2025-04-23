import type { LinkItemType } from "fumadocs-ui/layouts/links";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { Newspaper } from "lucide-react";

export const title = "Yan's Digital Glade";
export const description = "This is my portfolio.";

export const baseOptions: BaseLayoutProps = {
  nav: {
    title,
  },
};

export const linkItems: LinkItemType[] = [
  {
    icon: <Newspaper />,
    text: "Posts",
    url: "/list",
    active: "url",
  },
];

export const postsPerPage = 5;
