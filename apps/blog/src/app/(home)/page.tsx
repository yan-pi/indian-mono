import { InlineLink } from "@/components/inline-link";
import { PostCard } from "@/components/post-card";
import { getSortedByDatePosts } from "@/lib/source";
import Link from "next/link";

const HomePage = () => {
  const posts = getSortedByDatePosts().slice(0, 3);

  return (
    <div className="space-y-12">
      <section>
        <h1 className="mb-8  text-2xl font-serif font-semibold tracking-tigh">
          Yan Fernandes (Aka{" "}
          <Link
            className="text-fd-primary underline"
            href={"https://x.com/yamigake"}
            target="_blank"
          >
            indianboy
          </Link>
          )
        </h1>
        <p className="mb-4">
          Software Engineer with an unhealthy obsession for Linux and Neovim.
          Former front‑end lead at FESF/SUS, now technical staff at Sats Capital
          while crafting open-source projects in my spare time, when I'm not
          being distracted by my cat.
        </p>

        <p className="mb-4">
          Coding from the most beautiful city in Brazil{" "}
          <Link
            href="https://pt.wikipedia.org/wiki/Salvador"
            className="underline text-fd-primary"
            target="_blank"
          >
            Salvador – Bahia
          </Link>
          ,{" "}
          <span className="italic text-fd-muted-foreground">
            <br />
            where the beaches are as hot as my deployment servers.
          </span>
        </p>
        {/* <p className="mb-4"> */}
        {/*   I specialize in full-stack solutions with Node.js and TypeScript, */}
        {/*   architecting robust systems that don't fall over when you look at */}
        {/*   them. Spending my days with my gf and solving complex problems, */}
        {/*   like rebuilding my neovim setup or building a split keyboard from */}
        {/*   scratch with fewer keys than most people need for "Hello World". */}
        {/* </p> */}
        <p className="mb-4">
          This blog is my digital playground—where I share insights,
          experiments, and occasional rants about technology that might just
          save your next project (or at least make you chuckle).
        </p>
      </section>
      <div className="space-y-4">
        <p className="text-xl font-serif font-semibold text-fd-muted-foreground tracking-tight">
          <InlineLink href="/list">Check all posts</InlineLink>
        </p>
        <div className="flex flex-col gap-4 text-left">
          {posts.map((post) => {
            const date = new Date(post.data.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
            return (
              <PostCard
                title={post.data.title}
                description={post.data.description ?? ""}
                url={post.url}
                date={date}
                key={post.url}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
