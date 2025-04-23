import { Rss } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="mt-auto flex flex-col items-center border-t bg-card py-6 gap-2.5 text-secondary-foreground text-center">
      <div className="flex flex-row gap-2">
        <p>&copy; 2025 Yan Fernandes</p>
        <Link href="/api/rss.xml">
          <Rss />
        </Link>
      </div>
    </footer>
  );
};
