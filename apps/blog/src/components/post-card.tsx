import Link from "next/link";

export const PostCard = ({
  title,
  description,
  url,
  date,
}: {
  title: string;
  description: string;
  url: string;
  date: string;
}) => {
  return (
    <article className="w-full py-6 border-b border-neutral-800">
      <Link href={url} className="flex justify-between items-start group">
        <div className="space-y-1">
          <h2 className="text-lg font-serif  transition-colors font-medium">
            {title}
          </h2>
          <p className="text-sm text-neutral-400">{description}</p>
        </div>
        <p className="text-sm text-neutral-400 whitespace-nowrap">{date}</p>
      </Link>
    </article>
  );
};
