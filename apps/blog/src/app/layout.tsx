import { Footer } from "@/components/footer";
import { RootProvider } from "fumadocs-ui/provider";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { instrumentSerif } from "./fonts";
import type { ReactNode } from "react";
import { description, title } from "./layout.config";
import "./global.css";
import "katex/dist/katex.css";

const geist = Geist({
  subsets: ["latin"],
});

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html
      lang="en"
      className={`${geist.className} ${instrumentSerif.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        <RootProvider>
          {children}
          <Footer />
        </RootProvider>
      </body>
    </html>
  );
};

export default RootLayout;

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Yan's Digital Glade",
    template: "%s | Yan's Digital Glade",
  },
  description: "This is my portfolio.",
  openGraph: {
    title,
    description,
    images: "/api/og",
  },
  twitter: {
    title,
    description,
    images: "/api/og",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
