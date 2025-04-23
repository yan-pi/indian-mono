import { Header } from "@/components/header";
import { InlineLink } from "@/components/inline-link";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { getLinks } from "fumadocs-ui/layouts/shared";
import Image from "next/image";
import { baseOptions, linkItems } from "./layout.config";

const NotFound = () => {
  return (
    <HomeLayout
      {...baseOptions}
      links={linkItems}
      nav={{
        component: (
          <Header
            finalLinks={getLinks(linkItems, baseOptions.githubUrl)}
            {...baseOptions}
          />
        ),
      }}
    >
      <div className="my-12 space-y-8 text-center">
        <p className="text-4xl font-bold">404 - The Quest for the Lost Page</p>
        <p className="text-lg">
          <span className="block md:inline">
            You find yourself in an unfamiliar land. The page you seek seems to
            have vanished into the void.
          </span>
          <span className="block md:inline">
            Fear not, brave adventurer! Visit the <br />
            <InlineLink href="/list">Article Index</InlineLink> to continue your
            journey.
          </span>
        </p>
        <div className="space-y-4">
          <Image
            src="/cat.jpg"
            width={800}
            height={600}
            alt="yoshimueraya"
            className="mx-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </HomeLayout>
  );
};

export default NotFound;
